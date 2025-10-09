import express from 'express'
import prisma from '../lib/prisma'

const router = express.Router()

// GET all leads
router.get('/leads', async (req, res) => {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' }
    })
    res.json(leads)
  } catch (error) {
    console.error('Leads fetch error:', error)
    res.status(500).json({ error: 'Failed to fetch leads' })
  }
})

// POST create new lead (contact form submission)
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    const lead = await prisma.lead.create({
      data: { name, email, subject, message }
    })

    // TODO: Send email notification
    res.json({ success: true, id: lead.id })
  } catch (error) {
    console.error('Contact form error:', error)
    res.status(500).json({ error: 'Failed to submit contact form' })
  }
})

export { router as contactRouter }
