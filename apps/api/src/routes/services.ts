import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  try {
    const services = await prisma.service.findMany()
    res.json(services)
  } catch (error) {
    console.error('Services fetch error:', error)
    res.status(500).json({ error: 'Failed to fetch services' })
  }
})

export { router as servicesRouter }