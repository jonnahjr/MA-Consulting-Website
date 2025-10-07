import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        publishedAt: {
          not: null,
        },
      },
      orderBy: {
        publishedAt: 'desc',
      },
    })
    res.json(posts)
  } catch (error) {
    console.error('Blog fetch error:', error)
    res.status(500).json({ error: 'Failed to fetch blog posts' })
  }
})

export { router as blogRouter }
