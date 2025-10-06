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
  let savedCount = 0
  for (const post of posts) {
    try {
      await prisma.blogPost.upsert({
        where: { slug: post.slug },
        update: post,
        create: post
      })
      savedCount++
      console.log(`Saved blog post: ${post.title}`)
    } catch (error: any) {
      // If Prisma couldn't initialize (missing DATABASE_URL), surface the error
      const msg = error && (error.message || error.toString())
      if (msg && msg.includes('Environment variable not found')) {
        throw error
      }
      console.error(`Error saving post ${post.title}:`, error)
    }
  }
  return savedCount
}

async function main() {
  console.log('Starting blog scraping...')

  const posts = await scrapeBlogPosts()

  if (posts.length > 0) {
    console.log('Scraped blog posts:')
    posts.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title}`)
    })

    // If DATABASE_URL not set, skip DB write and save to JSON
    if (!process.env.DATABASE_URL) {
      console.log('DATABASE_URL not set. Saving scraped posts to JSON instead.')
      const fs = require('fs')
      fs.writeFileSync('scraped-blog-posts.json', JSON.stringify(posts, null, 2))
      console.log('Scraped posts saved to scraped-blog-posts.json')
    } else {
      try {
        const saved = await saveBlogPosts(posts)
        console.log(`Saved ${saved} posts to database.`)
      } catch (error) {
        console.log('Error writing to database. Falling back to JSON file.')
        const fs = require('fs')
        fs.writeFileSync('scraped-blog-posts.json', JSON.stringify(posts, null, 2))
        console.log('Scraped posts saved to scraped-blog-posts.json')
      }
    }
  } else {
    console.log('No blog posts found. You may need to adjust the scraping selectors.')
  }

  await prisma.$disconnect()
}

main().catch(console.error)