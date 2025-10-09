import express from 'express'
import prisma from '../lib/prisma'

const router = express.Router()

// GET all services
router.get('/', async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: 'desc' }
    })
    res.json(services)
  } catch (error) {
    console.error('Services fetch error:', error)
    res.status(500).json({ error: 'Failed to fetch services' })
  }
})

// POST create new service
router.post('/', async (req, res) => {
  try {
    const { title, description, icon, metrics } = req.body

    const service = await prisma.service.create({
      data: {
        title,
        description,
        icon,
        metrics
      }
    })

    res.json(service)
  } catch (error) {
    console.error('Service creation error:', error)
    res.status(500).json({ error: 'Failed to create service' })
  }
})

// PUT update service
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, icon, metrics } = req.body

    const service = await prisma.service.update({
      where: { id },
      data: {
        title,
        description,
        icon,
        metrics
      }
    })

    res.json(service)
  } catch (error) {
    console.error('Service update error:', error)
    res.status(500).json({ error: 'Failed to update service' })
  }
})

// DELETE service
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    await prisma.service.delete({
      where: { id }
    })

    res.json({ message: 'Service deleted successfully' })
  } catch (error) {
    console.error('Service deletion error:', error)
    res.status(500).json({ error: 'Failed to delete service' })
  }
})

export { router as servicesRouter }
