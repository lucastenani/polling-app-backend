import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { z } from 'zod'

import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { RegisterUseCase } from '@/use-cases/register'

const registerBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

export const register = asyncHandler(
  async (request: Request, response: Response) => {
    const { name, email, password } = registerBodySchema.parse(request.body)

    try {
      const usersRepository = new PrismaUsersRepository()
      const registerUseCase = new RegisterUseCase(usersRepository)

      await registerUseCase.execute({
        name,
        email,
        password,
      })
    } catch (err) {
      if (err instanceof UserAlreadyExistsError) {
        response.status(409).send({ message: err.message })
        return
      }

      throw err
    }

    response.status(201).send()
  },
)
