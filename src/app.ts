import { PrismaClient } from '@prisma/client'
import express from 'express'

export const app = express()

const prisma = new PrismaClient()

prisma.user.create({
  data: {
    email: 'jOhn doe',
    name: 'John Doe',
  },
})
