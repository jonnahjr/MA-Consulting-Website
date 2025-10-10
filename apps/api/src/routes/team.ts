import express from 'express'
import supabase from '../lib/supabase'

const router = express.Router()

// GET all team members
router.get('/', async (req, res) => {
  try {
    const { data: team, error } = await supabase
      .from('TeamMember')
      .select('*')
      .order('createdAt', { ascending: false })

    if (error) throw error
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

    const { data: member, error } = await supabase
      .from('TeamMember')
      .insert({
        name,
        role,
        bio,
        image,
        socials
      })
      .select()
      .single()

    if (error) throw error
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

    const { data: member, error } = await supabase
      .from('TeamMember')
      .update({
        name,
        role,
        bio,
        image,
        socials
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
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

    const { error } = await supabase
      .from('TeamMember')
      .delete()
      .eq('id', id)

    if (error) throw error
    res.json({ message: 'Team member deleted successfully' })
  } catch (error) {
    console.error('Team member deletion error:', error)
    res.status(500).json({ error: 'Failed to delete team member' })
  }
})

export { router as teamRouter }
