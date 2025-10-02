import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  try {
    const testimonials = await prisma.testimonial.findMany()
    res.json(testimonials)
  } catch (error) {
    console.error('Testimonials fetch error:', error)
    res.status(500).json({ error: 'Failed to fetch testimonials' })
  }
})

export { router as testimonialsRouter }