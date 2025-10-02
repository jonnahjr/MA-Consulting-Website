import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  try {
    const team = await prisma.teamMember.findMany()
    res.json(team)
  } catch (error) {
    console.error('Team fetch error:', error)
    res.status(500).json({ error: 'Failed to fetch team' })
  }
})

export { router as teamRouter }