import cors from 'cors'
import express from 'express'

import { appRoutes } from './http/routes'

export const app = express()
app.use(cors())
app.use(express.json())

appRoutes(app)
