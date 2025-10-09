import express from 'express'
import prisma from '../lib/prisma'

const router = express.Router()

// GET all testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' }
    })
    res.json(testimonials)
  } catch (error) {
    console.error('Testimonials fetch error:', error)
    res.status(500).json({ error: 'Failed to fetch testimonials' })
  }
})

// POST create new testimonial
router.post('/', async (req, res) => {
  try {
    const { clientName, feedback, videoUrl } = req.body

    const testimonial = await prisma.testimonial.create({
      data: {
        clientName,
        feedback,
        videoUrl
      }
    })

    res.json(testimonial)
  } catch (error) {
    console.error('Testimonial creation error:', error)
    res.status(500).json({ error: 'Failed to create testimonial' })
  }
})

// PUT update testimonial
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { clientName, feedback, videoUrl } = req.body

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        clientName,
        feedback,
        videoUrl
      }
    })

    res.json(testimonial)
  } catch (error) {
    console.error('Testimonial update error:', error)
    res.status(500).json({ error: 'Failed to update testimonial' })
  }
})

// DELETE testimonial
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    await prisma.testimonial.delete({
      where: { id }
    })

    res.json({ message: 'Testimonial deleted successfully' })
  } catch (error) {
    console.error('Testimonial deletion error:', error)
    res.status(500).json({ error: 'Failed to delete testimonial' })
  }
})

export { router as testimonialsRouter }
