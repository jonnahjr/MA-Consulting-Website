import express from 'express'
import supabase from '../lib/supabase'

const router = express.Router()

// GET all services
router.get('/', async (req, res) => {
  try {
    const { data: services, error } = await supabase
      .from('Service')
      .select('*')
      .order('createdAt', { ascending: false })

    if (error) throw error
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

    const { data: service, error } = await supabase
      .from('Service')
      .insert({
        title,
        description,
        icon,
        metrics
      })
      .select()
      .single()

    if (error) throw error
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

    const { data: service, error } = await supabase
      .from('Service')
      .update({
        title,
        description,
        icon,
        metrics
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
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

    const { error } = await supabase
      .from('Service')
      .delete()
      .eq('id', id)

    if (error) throw error
    res.json({ message: 'Service deleted successfully' })
  } catch (error) {
    console.error('Service deletion error:', error)
    res.status(500).json({ error: 'Failed to delete service' })
  }
})

export { router as servicesRouter }
