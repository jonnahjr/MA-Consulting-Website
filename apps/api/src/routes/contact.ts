import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    // Save to database
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    })

    // TODO: Send email notification

    res.json({ success: true, id: lead.id })
  } catch (error) {
    console.error('Contact form error:', error)
    res.status(500).json({ error: 'Failed to submit contact form' })
  }
})

export { router as contactRouter }