import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
let prisma: any
try {
  // Lazy require PrismaClient to avoid throwing when DATABASE_URL is not set
  const { PrismaClient } = require('@prisma/client')
  prisma = new PrismaClient()
} catch (e) {
  // Prisma may not be available or DATABASE_URL missing; we'll fallback
  prisma = null
}

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    // If Prisma is available (and configured), save to DB
    if (prisma && process.env.DATABASE_URL) {
      const lead = await prisma.lead.create({
        data: { name, email, subject, message },
      })
      // TODO: Send email notification
      return res.json({ success: true, id: lead.id })
    }

    // Fallback: save to local JSON file for development
    const fs = require('fs')
    const path = require('path')
    const file = path.resolve(process.cwd(), 'apps', 'api', 'data', 'leads.json')
    let leads: any[] = []
    try {
      if (fs.existsSync(file)) {
        leads = JSON.parse(fs.readFileSync(file, 'utf-8'))
      } else {
        // ensure directory exists
        fs.mkdirSync(path.dirname(file), { recursive: true })
      }
    } catch (err) {
      console.warn('Could not read leads file, starting fresh:', err)
    }
    const id = Date.now()
    const lead = { id, name, email, subject, message, createdAt: new Date().toISOString() }
    leads.push(lead)
    fs.writeFileSync(file, JSON.stringify(leads, null, 2))

    return res.json({ success: true, id })
  } catch (error) {
    console.error('Contact form error:', error)
    res.status(500).json({ error: 'Failed to submit contact form' })
  }
})

export { router as contactRouter }
