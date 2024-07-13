import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

const registerBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

export const register = asyncHandler(
  async (request: Request, response: Response) => {
    const { name, email, password } = registerBodySchema.parse(request.body)

    await prisma.user.create({
      data: {
        name,
        email,
        password_hash: password,
      },
    })

    return response.status(201).send()
  },
)
