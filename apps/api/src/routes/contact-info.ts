import express from 'express'
import prisma from '../lib/prisma'

const router = express.Router()

// GET all contact info
router.get('/', async (req, res) => {
  try {
    const contacts = await prisma.contactInfo.findMany({
      where: { isActive: true },
      orderBy: [
        { type: 'asc' },
        { sortOrder: 'asc' }
      ]
    })
    res.json(contacts)
  } catch (error) {
    console.error('Contact info fetch error:', error)
    res.status(500).json({ error: 'Failed to fetch contact information' })
  }
})

// GET contact info by type
router.get('/:type', async (req, res) => {
  try {
    const { type } = req.params
    const contacts = await prisma.contactInfo.findMany({
      where: {
        type,
        isActive: true
      },
      orderBy: { sortOrder: 'asc' }
    })
    res.json(contacts)
  } catch (error) {
    console.error('Contact info fetch error:', error)
    res.status(500).json({ error: 'Failed to fetch contact information' })
  }
})

// POST create new contact info
router.post('/', async (req, res) => {
  try {
    const { type, label, value, platform, icon, isActive, sortOrder } = req.body

    const contact = await prisma.contactInfo.create({
      data: {
        type,
        label,
        value,
        platform,
        icon,
        isActive: isActive !== undefined ? isActive : true,
        sortOrder: sortOrder || 0
      }
    })

    res.json(contact)
  } catch (error) {
    console.error('Contact info creation error:', error)
    res.status(500).json({ error: 'Failed to create contact information' })
  }
})

// PUT update contact info
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { type, label, value, platform, icon, isActive, sortOrder } = req.body

    const contact = await prisma.contactInfo.update({
      where: { id },
      data: {
        type,
        label,
        value,
        platform,
        icon,
        isActive,
        sortOrder
      }
    })

    res.json(contact)
  } catch (error) {
    console.error('Contact info update error:', error)
    res.status(500).json({ error: 'Failed to update contact information' })
  }
})

// DELETE contact info
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    await prisma.contactInfo.delete({
      where: { id }
    })

    res.json({ message: 'Contact information deleted successfully' })
  } catch (error) {
    console.error('Contact info deletion error:', error)
    res.status(500).json({ error: 'Failed to delete contact information' })
  }
})

// PUT bulk update sort order
router.put('/bulk/sort', async (req, res) => {
  try {
    const { updates } = req.body // Array of { id, sortOrder }

    const updatePromises = updates.map((update: { id: string; sortOrder: number }) =>
      prisma.contactInfo.update({
        where: { id: update.id },
        data: { sortOrder: update.sortOrder }
      })
    )

    await Promise.all(updatePromises)
    res.json({ message: 'Sort order updated successfully' })
  } catch (error) {
    console.error('Bulk sort update error:', error)
    res.status(500).json({ error: 'Failed to update sort order' })
  }
})

export { router as contactInfoRouter }