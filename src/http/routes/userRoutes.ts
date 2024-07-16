import express from 'express'

import { authenticate } from '../controllers/authenticate'
import { profile } from '../controllers/profile'
import { register } from '../controllers/register'

export const userRoutes = express.Router()

userRoutes.post('/sign-up', register)
userRoutes.post('/sign-in', authenticate)

// Authenticated
userRoutes.get('/me', profile)
