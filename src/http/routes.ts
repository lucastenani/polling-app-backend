import express from 'express'

import { register } from './controllers/register'

const router = express.Router()

router.post('/users', register)

export function appRoutes(app: express.Application): void {
  app.use('/api', router)
}
