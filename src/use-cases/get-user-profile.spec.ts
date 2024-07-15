import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserUseCase } from '@/use-cases/get-user-profile'

import { ResourceNotFoundError } from './errors/rosource-not-found-error'

let usersRepository: InMemoryUsersRepository
let sut: GetUserUseCase

describe('Get User use cases', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserUseCase(usersRepository)
  })

  it('Should be able to get user data', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual(expect.any(String))
  })

  it('Should be not able to get user data with wrong id', async () => {
    expect(() =>
      sut.execute({
        userId: '123',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
