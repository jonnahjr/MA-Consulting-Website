import express from 'express'
import supabase from '../lib/supabase'

const router = express.Router()

// GET all contact info
router.get('/', async (req, res) => {
  try {
    const { data: contacts, error } = await supabase
      .from('ContactInfo')
      .select('*')
      .eq('isActive', true)
      .order('type', { ascending: true })
      .order('sortOrder', { ascending: true })

    if (error) throw error
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
    const { data: contacts, error } = await supabase
      .from('ContactInfo')
      .select('*')
      .eq('type', type)
      .eq('isActive', true)
      .order('sortOrder', { ascending: true })

    if (error) throw error
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

    const { data: contact, error } = await supabase
      .from('ContactInfo')
      .insert({
        type,
        label,
        value,
        platform,
        icon,
        isActive: isActive !== undefined ? isActive : true,
        sortOrder: sortOrder || 0
      })
      .select()
      .single()

    if (error) throw error
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

    const { data: contact, error } = await supabase
      .from('ContactInfo')
      .update({
        type,
        label,
        value,
        platform,
        icon,
        isActive,
        sortOrder
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
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

    const { error } = await supabase
      .from('ContactInfo')
      .delete()
      .eq('id', id)

    if (error) throw error
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
      supabase
        .from('ContactInfo')
        .update({ sortOrder: update.sortOrder })
        .eq('id', update.id)
    )

    const results = await Promise.all(updatePromises)
    const errors = results.filter(result => result.error)
    if (errors.length > 0) throw errors[0].error

    res.json({ message: 'Sort order updated successfully' })
  } catch (error) {
    console.error('Bulk sort update error:', error)
    res.status(500).json({ error: 'Failed to update sort order' })
  }
})

export { router as contactInfoRouter }