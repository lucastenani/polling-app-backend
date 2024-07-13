import express from 'express'

import { appRoutes } from './http/routes'

export const app = express()
app.use(express.json())

appRoutes(app)
