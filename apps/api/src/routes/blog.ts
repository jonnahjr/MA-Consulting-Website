import express from 'express'
import prisma from '../lib/prisma'

const router = express.Router()

// GET all blog posts
router.get('/', async (req, res) => {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: [
        { publishedAt: 'desc' },
        { createdAt: 'desc' }
      ]
    })
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

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        content,
        tags,
        publishedAt: publishedAt ? new Date(publishedAt) : null
      }
    })

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

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        title,
        slug,
        content,
        tags,
        publishedAt: publishedAt ? new Date(publishedAt) : null
      }
    })

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

    await prisma.blogPost.delete({
      where: { id }
    })

    res.json({ message: 'Blog post deleted successfully' })
  } catch (error) {
    console.error('Blog deletion error:', error)
    res.status(500).json({ error: 'Failed to delete blog post' })
  }
})

export { router as blogRouter }
