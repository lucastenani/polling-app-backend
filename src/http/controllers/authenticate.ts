import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { z } from 'zod'

import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const authenticate = asyncHandler(
  async (request: Request, response: Response) => {
    const { email, password } = authenticateBodySchema.parse(request.body)

    try {
      const authenticateUserCase = makeAuthenticateUseCase()

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
