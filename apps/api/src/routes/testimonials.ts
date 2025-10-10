import express from 'express'
import supabase from '../lib/supabase'

const router = express.Router()

// GET all testimonials
router.get('/', async (req, res) => {
  try {
    const { data: testimonials, error } = await supabase
      .from('Testimonial')
      .select('*')
      .order('createdAt', { ascending: false })

    if (error) throw error
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

    const { data: testimonial, error } = await supabase
      .from('Testimonial')
      .insert({
        clientName,
        feedback,
        videoUrl
      })
      .select()
      .single()

    if (error) throw error
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

    const { data: testimonial, error } = await supabase
      .from('Testimonial')
      .update({
        clientName,
        feedback,
        videoUrl
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
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

    const { error } = await supabase
      .from('Testimonial')
      .delete()
      .eq('id', id)

    if (error) throw error
    res.json({ message: 'Testimonial deleted successfully' })
  } catch (error) {
    console.error('Testimonial deletion error:', error)
    res.status(500).json({ error: 'Failed to delete testimonial' })
  }
})

export { router as testimonialsRouter }
