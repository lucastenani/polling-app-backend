import express from 'express'

import { userRoutes } from './userRoutes'

export function appRoutes(app: express.Application): void {
  app.use('/users', userRoutes)
}
