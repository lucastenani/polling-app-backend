import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { z } from 'zod'

import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'

const registerBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

export const register = asyncHandler(
  async (request: Request, response: Response) => {
    const { name, email, password } = registerBodySchema.parse(request.body)

    try {
      const registerUseCase = makeRegisterUseCase()

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
