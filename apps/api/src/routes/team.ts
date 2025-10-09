import express from 'express'
import prisma from '../lib/prisma'

const router = express.Router()

// GET all team members
router.get('/', async (req, res) => {
  try {
    const team = await prisma.teamMember.findMany({
      orderBy: { createdAt: 'desc' }
    })
    res.json(team)
  } catch (error) {
    console.error('Team fetch error:', error)
    res.status(500).json({ error: 'Failed to fetch team' })
  }
})

// POST create new team member
router.post('/', async (req, res) => {
  try {
    const { name, role, bio, image, socials } = req.body

    const member = await prisma.teamMember.create({
      data: {
        name,
        role,
        bio,
        image,
        socials
      }
    })

    res.json(member)
  } catch (error) {
    console.error('Team member creation error:', error)
    res.status(500).json({ error: 'Failed to create team member' })
  }
})

// PUT update team member
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { name, role, bio, image, socials } = req.body

    const member = await prisma.teamMember.update({
      where: { id },
      data: {
        name,
        role,
        bio,
        image,
        socials
      }
    })

    res.json(member)
  } catch (error) {
    console.error('Team member update error:', error)
    res.status(500).json({ error: 'Failed to update team member' })
  }
})

// DELETE team member
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    await prisma.teamMember.delete({
      where: { id }
    })

    res.json({ message: 'Team member deleted successfully' })
  } catch (error) {
    console.error('Team member deletion error:', error)
    res.status(500).json({ error: 'Failed to delete team member' })
  }
})

export { router as teamRouter }
