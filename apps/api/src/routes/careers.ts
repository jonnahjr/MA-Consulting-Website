import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

router.post('/', async (req, res) => {
  try {
    const { name, email, resumeUrl, jobId } = req.body

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' })
    }

    const application = await prisma.application.create({
      data: {
        name,
        email,
        resumeUrl,
        jobId,
      },
    })

    res.json({ success: true, id: application.id })
  } catch (error) {
    console.error('Careers application error:', error)
    res.status(500).json({ error: 'Failed to submit application' })
  }
})

export { router as careersRouter }