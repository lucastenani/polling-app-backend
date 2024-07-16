import { Response } from 'express'
import asyncHandler from 'express-async-handler'

import { makeGetUserUseCase } from '@/use-cases/factories/make-get-user-use-case'

import { AuthenticatedRequest } from '../middleware/authenticateJwt'

export const profile = asyncHandler(
  async (request: AuthenticatedRequest, response: Response) => {
    const userId = request.user?.id
    response.status(200).send({ request })

    if (!userId) {
      return response.sendStatus(401)
    }

    const getUserProfile = makeGetUserUseCase()

    const { user } = await getUserProfile.execute({ userId })

    response.status(200).send({ user })
  },
)
