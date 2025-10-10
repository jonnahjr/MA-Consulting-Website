import express from 'express'
import supabase from '../lib/supabase'

const router = express.Router()

// GET all leads
router.get('/leads', async (req, res) => {
  try {
    const { data: leads, error } = await supabase
      .from('Lead')
      .select('*')
      .order('createdAt', { ascending: false })

    if (error) throw error
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

    const { data: lead, error } = await supabase
      .from('Lead')
      .insert({ name, email, subject, message })
      .select()
      .single()

    if (error) throw error

    // TODO: Send email notification
    res.json({ success: true, id: lead.id })
  } catch (error) {
    console.error('Contact form error:', error)
    res.status(500).json({ error: 'Failed to submit contact form' })
  }
})

export { router as contactRouter }
