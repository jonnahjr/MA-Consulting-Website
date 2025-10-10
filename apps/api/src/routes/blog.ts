import express from 'express'
import supabase from '../lib/supabase'

const router = express.Router()

// GET all blog posts
router.get('/', async (req, res) => {
  try {
    const { data: posts, error } = await supabase
      .from('BlogPost')
      .select('*')
      .order('publishedAt', { ascending: false, nullsFirst: false })
      .order('createdAt', { ascending: false })

    if (error) throw error
    res.json(posts)
  } catch (error) {
    console.error('Blog fetch error:', error)
    res.status(500).json({ error: 'Failed to fetch blog posts' })
  }
})

// POST create new blog post
router.post('/', async (req, res) => {
  try {
    const { title, slug, content, tags, publishedAt } = req.body

    const { data: post, error } = await supabase
      .from('BlogPost')
      .insert({
        title,
        slug,
        content,
        tags,
        publishedAt: publishedAt || null
      })
      .select()
      .single()

    if (error) throw error
    res.json(post)
  } catch (error) {
    console.error('Blog creation error:', error)
    res.status(500).json({ error: 'Failed to create blog post' })
  }
})

// PUT update blog post
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { title, slug, content, tags, publishedAt } = req.body

    const { data: post, error } = await supabase
      .from('BlogPost')
      .update({
        title,
        slug,
        content,
        tags,
        publishedAt: publishedAt || null
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    res.json(post)
  } catch (error) {
    console.error('Blog update error:', error)
    res.status(500).json({ error: 'Failed to update blog post' })
  }
})

// DELETE blog post
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const { error } = await supabase
      .from('BlogPost')
      .delete()
      .eq('id', id)

    if (error) throw error
    res.json({ message: 'Blog post deleted successfully' })
  } catch (error) {
    console.error('Blog deletion error:', error)
    res.status(500).json({ error: 'Failed to delete blog post' })
  }
})

export { router as blogRouter }
