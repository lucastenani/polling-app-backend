import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

import { env } from '@/env'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

const secret = env.JWT_SECRET

export const authenticate = asyncHandler(
  async (request: Request, response: Response) => {
    const { email, password } = authenticateBodySchema.parse(request.body)

    try {
      const authenticateUserCase = makeAuthenticateUseCase()

      const { user } = await authenticateUserCase.execute({
        email,
        password,
      })

      const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' })

      response.status(200).send({ token })
    } catch (err) {
      if (err instanceof InvalidCredentialsError) {
        response.status(400).send({ message: err.message })
        return
      }

      throw err
    }
  },
)
