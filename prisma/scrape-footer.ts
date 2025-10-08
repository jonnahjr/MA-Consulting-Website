import axios from 'axios'
import * as cheerio from 'cheerio'

interface FooterData {
  companyDescription?: string
  contactInfo?: {
    phone?: string
    email?: string
    address?: string
  }
  socialLinks?: {
    linkedin?: string
    twitter?: string
    facebook?: string
    instagram?: string
  }
  services?: string[]
  quickLinks?: string[]
}

async function scrapeFooter(): Promise<FooterData> {
  const baseUrl = 'https://maservicessolution.com'
  const footerData: FooterData = {}

  try {
    console.log('Fetching website for footer data...')
    const response = await axios.get(baseUrl)
    const $ = cheerio.load(response.data)

    // Debug: Log the entire page structure
    console.log('Page title:', $('title').text())
    console.log('Footer elements found:', $('footer').length)
    console.log('All links found:', $('a').length)

    // Try multiple selectors for footer
    const footer = $('footer, #footer, .footer, .site-footer').first()

    if (footer.length > 0) {
      console.log('Footer found, extracting data...')

      // Get all text content from footer
      const footerText = footer.text()
      console.log('Footer text content:', footerText.substring(0, 500) + '...')

      // Company description - look for any paragraph or div with description-like content
      const description = footer.find('p').first().text().trim() ||
                         footer.find('.description, .about').first().text().trim()
      if (description && description.length > 20) {
        footerData.companyDescription = description
      }

      // Contact information
      const contactInfo: any = {}

      // Phone - look for tel: links or phone patterns
      const phoneLink = $('a[href^="tel:"]').first()
      if (phoneLink.length > 0) {
        contactInfo.phone = phoneLink.attr('href')?.replace('tel:', '')
      }

      // Email - look for mailto: links
      const emailLink = $('a[href^="mailto:"]').first()
      if (emailLink.length > 0) {
        contactInfo.email = emailLink.attr('href')?.replace('mailto:', '')
      }

      // Address - look for address patterns in footer
      const addressText = footer.find('*').filter((_, el) => {
        const text = $(el).text().trim()
        return text.includes('Addis Ababa') || text.includes('Ethiopia') || text.includes('Bole')
      }).first().text().trim()
      if (addressText) {
        contactInfo.address = addressText
      }

      if (Object.keys(contactInfo).length > 0) {
        footerData.contactInfo = contactInfo
      }

      // Social media links - search entire page
      const socialLinks: any = {}
      $('a').each((_, element) => {
        const href = $(element).attr('href')
        if (href) {
          if (href.includes('linkedin.com')) socialLinks.linkedin = href
          if (href.includes('twitter.com') || href.includes('x.com')) socialLinks.twitter = href
          if (href.includes('facebook.com')) socialLinks.facebook = href
          if (href.includes('instagram.com')) socialLinks.instagram = href
        }
      })

      if (Object.keys(socialLinks).length > 0) {
        footerData.socialLinks = socialLinks
      }

      // Services - look for service-related links
      const services: string[] = []
      $('a').each((_, element) => {
        const text = $(element).text().trim()
        const href = $(element).attr('href')
        if (text && href && (
          text.toLowerCase().includes('service') ||
          text.toLowerCase().includes('consulting') ||
          text.toLowerCase().includes('development') ||
          text.toLowerCase().includes('investment') ||
          text.toLowerCase().includes('marketing') ||
          text.toLowerCase().includes('tax')
        )) {
          if (!services.includes(text) && text.length < 50) {
            services.push(text)
          }
        }
      })
      if (services.length > 0) {
        footerData.services = services.slice(0, 6) // Limit to 6 services
      }

      // Quick links - navigation links
      const quickLinks: string[] = []
      $('nav a, .menu a, .navigation a').each((_, element) => {
        const text = $(element).text().trim()
        if (text && !quickLinks.includes(text) && text.length < 30 &&
            ['home', 'about', 'services', 'team', 'blog', 'contact', 'careers'].some(keyword =>
              text.toLowerCase().includes(keyword)
            )) {
          quickLinks.push(text)
        }
      })
      if (quickLinks.length > 0) {
        footerData.quickLinks = quickLinks.slice(0, 6) // Limit to 6 links
      }
    } else {
      console.log('No footer element found, trying to extract from entire page...')

      // Fallback: search entire page for contact info
      const contactInfo: any = {}

      const phoneLink = $('a[href^="tel:"]').first()
      if (phoneLink.length > 0) {
        contactInfo.phone = phoneLink.attr('href')?.replace('tel:', '')
      }

      const emailLink = $('a[href^="mailto:"]').first()
      if (emailLink.length > 0) {
        contactInfo.email = emailLink.attr('href')?.replace('mailto:', '')
      }

      if (Object.keys(contactInfo).length > 0) {
        footerData.contactInfo = contactInfo
      }

      // Social media from entire page
      const socialLinks: any = {}
      $('a').each((_, element) => {
        const href = $(element).attr('href')
        if (href) {
          if (href.includes('linkedin.com')) socialLinks.linkedin = href
          if (href.includes('twitter.com') || href.includes('x.com')) socialLinks.twitter = href
          if (href.includes('facebook.com')) socialLinks.facebook = href
          if (href.includes('instagram.com')) socialLinks.instagram = href
        }
      })

      if (Object.keys(socialLinks).length > 0) {
        footerData.socialLinks = socialLinks
      }
    }

    console.log('Footer scraping completed')
    return footerData
  } catch (error) {
    console.error('Error scraping footer:', error)
    return {}
  }
}

async function main() {
  console.log('Starting footer scraping...')

  const footerData = await scrapeFooter()

  console.log('Scraped Footer Data:')
  console.log(JSON.stringify(footerData, null, 2))

  // Save to file
  const fs = require('fs')
  fs.writeFileSync('scraped-footer-data.json', JSON.stringify(footerData, null, 2))
  console.log('Footer data saved to scraped-footer-data.json')
}

main().catch(console.error)