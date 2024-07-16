import { User } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { env } from '@/env'

export interface AuthenticatedRequest extends Request {
  user?: {
    id?: string
  }
}

const secret = env.JWT_SECRET

export const authenticateJWT = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header('Authorization')?.split(' ')[1]

  if (token) {
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.sendStatus(403)
      }
      req.user = user as User
      next()
    })
  } else {
    res.sendStatus(401)
  }
}
