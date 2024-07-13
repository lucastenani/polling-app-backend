import express from 'express'

import { register } from '../controllers/register'

export const userRoutes = express.Router()

userRoutes.post('/', register)
