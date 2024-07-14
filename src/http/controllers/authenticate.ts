import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { z } from 'zod'

import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const authenticate = asyncHandler(
  async (request: Request, response: Response) => {
    const { email, password } = authenticateBodySchema.parse(request.body)

    try {
      const usersRepository = new PrismaUsersRepository()
      const authenticateUserCase = new AuthenticateUseCase(usersRepository)

      await authenticateUserCase.execute({
        email,
        password,
      })
    } catch (err) {
      if (err instanceof InvalidCredentialsError) {
        response.status(400).send({ message: err.message })
        return
      }

      throw err
    }

    response.status(200).send()
  },
)
