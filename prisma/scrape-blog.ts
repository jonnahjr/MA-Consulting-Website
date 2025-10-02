import axios from 'axios'
import * as cheerio from 'cheerio'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface BlogPost {
  title: string
  slug: string
  content: string
  tags: string[]
  publishedAt?: Date
}

async function scrapeBlogPosts(): Promise<BlogPost[]> {
  const baseUrl = 'https://maservicessolution.com'
  const blogUrl = `${baseUrl}/blog`

  try {
    console.log('Fetching blog page...')
    const response = await axios.get(blogUrl)
    const $ = cheerio.load(response.data)

    const posts: BlogPost[] = []

    // This is a generic selector - may need adjustment based on actual site structure
    $('.blog-post, .post, article').each((index, element) => {
      const $el = $(element)

      const title = $el.find('h1, h2, .title').first().text().trim()
      const link = $el.find('a').first().attr('href')
      const excerpt = $el.find('.excerpt, .summary, p').first().text().trim()

      if (title) {
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

        posts.push({
          title,
          slug: slug || `post-${index}`,
          content: excerpt || 'Content to be fetched from individual post page',
          tags: ['blog'],
          publishedAt: new Date()
        })
      }
    })

    console.log(`Found ${posts.length} blog posts`)
    return posts
  } catch (error) {
    console.error('Error scraping blog:', error)
    return []
  }
}

async function saveBlogPosts(posts: BlogPost[]) {
  for (const post of posts) {
    try {
      await prisma.blogPost.upsert({
        where: { slug: post.slug },
        update: post,
        create: post
      })
      console.log(`Saved blog post: ${post.title}`)
    } catch (error) {
      console.error(`Error saving post ${post.title}:`, error)
    }
  }
}

async function main() {
  console.log('Starting blog scraping...')

  const posts = await scrapeBlogPosts()

  if (posts.length > 0) {
    console.log('Scraped blog posts:')
    posts.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title}`)
    })

    // Try to save if DB is available
    try {
      await saveBlogPosts(posts)
      console.log('Blog posts saved to database!')
    } catch (error) {
      console.log('Database not configured. Scraped posts are ready to be saved once DATABASE_URL is set.')
      // Optionally save to JSON file
      const fs = require('fs')
      fs.writeFileSync('scraped-blog-posts.json', JSON.stringify(posts, null, 2))
      console.log('Scraped posts saved to scraped-blog-posts.json')
    }
  } else {
    console.log('No blog posts found. You may need to adjust the scraping selectors.')
  }

  await prisma.$disconnect()
}

main().catch(console.error)