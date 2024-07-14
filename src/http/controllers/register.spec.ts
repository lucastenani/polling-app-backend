import { hash } from 'bcryptjs'
import { Request, Response } from 'express'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { prisma } from '@/lib/prisma'

import { register } from './register'

// Mocking bcryptjs hash function
vi.mock('bcryptjs', () => ({
  hash: vi.fn().mockResolvedValue('hashed_password'),
}))

beforeEach(async () => {
  // Clear the database before each test
  await prisma.user.deleteMany({})
})

const mockRequest = {
  body: {
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '123456',
  },
} as Request

const mockResponse = {
  status: vi.fn().mockReturnThis(),
  send: vi.fn(),
} as unknown as Response

describe('Register', () => {
  it('should be able to register', async () => {
    await register(mockRequest, mockResponse)

    // Check if the response status is 201
    expect(mockResponse.status).toHaveBeenCalledWith(201)
    expect(mockResponse.send).toHaveBeenCalled()
  })

  it('should hash the user password upon registration', async () => {
    await register(mockRequest, mockResponse)

    // Check if the password was hashed correctly
    expect(hash).toHaveBeenCalledWith('123456', 6)

    // Ensure the user is created with the hashed password
    const createdUser = await prisma.user.findUnique({
      where: { email: 'johndoe@example.com' },
    })

    expect(createdUser).toBeDefined()
    expect(createdUser!.password_hash).toBe('hashed_password')

    // Check if the response status is 201
    expect(mockResponse.status).toHaveBeenCalledWith(201)
    expect(mockResponse.send).toHaveBeenCalled()
  })

  it('should not be able to register with the same email twice', async () => {
    const mockRequest2 = {
      body: {
        name: 'Jane Smith',
        email: 'johndoe@example.com', // Same email as mockRequest1
        password: 'password123',
      },
    } as Request

    const mockResponse2 = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as unknown as Response

    // First registration
    await register(mockRequest, mockResponse)
    expect(mockResponse.status).toHaveBeenCalledWith(201)

    // second
    await register(mockRequest2, mockResponse2)
    expect(mockResponse2.status).toHaveBeenCalledWith(409)
  })
})
