import express from 'express'
import fs from 'fs'
import path from 'path'
import nodemailer from 'nodemailer'

const router = express.Router()

// File-based storage for subscribers (temporary solution)
const subscribersFile = path.join(process.cwd(), 'subscribers.json')

// Helper function to read subscribers
const readSubscribers = () => {
  try {
    if (fs.existsSync(subscribersFile)) {
      const data = fs.readFileSync(subscribersFile, 'utf8')
      return JSON.parse(data)
    }
    return []
  } catch (error) {
    console.error('Error reading subscribers file:', error)
    return []
  }
}

// Helper function to write subscribers
const writeSubscribers = (subscribers: any[]) => {
  try {
    fs.writeFileSync(subscribersFile, JSON.stringify(subscribers, null, 2))
  } catch (error) {
    console.error('Error writing subscribers file:', error)
  }
}

// Subscribe to newsletter
router.post('/subscribe', async (req, res) => {
  try {
    const { email, name } = req.body

    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    const subscribers = readSubscribers()

    // Check if email is already subscribed
    const existingSubscriber = subscribers.find((sub: any) => sub.email.toLowerCase() === email.toLowerCase())

    if (existingSubscriber) {
      if (existingSubscriber.isActive) {
        return res.status(409).json({ error: 'Email is already subscribed' })
      } else {
        // Reactivate subscription
        existingSubscriber.isActive = true
        existingSubscriber.name = name
        existingSubscriber.updatedAt = new Date().toISOString()
        writeSubscribers(subscribers)
        return res.json({ message: 'Subscription reactivated successfully' })
      }
    }

    // Create new subscriber
    const subscriber = {
      id: Date.now().toString(),
      email: email.toLowerCase(),
      name: name || null,
      isActive: true,
      subscribedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    subscribers.push(subscriber)
    writeSubscribers(subscribers)

    res.status(201).json({
      message: 'Successfully subscribed to newsletter',
      subscriber: {
        id: subscriber.id,
        email: subscriber.email,
        subscribedAt: subscriber.subscribedAt
      }
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get all subscribers (admin only)
router.get('/subscribers', async (req, res) => {
  try {
    const subscribers = readSubscribers()
    // Sort by subscribed date descending
    subscribers.sort((a: any, b: any) => new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime())

    res.json(subscribers)
  } catch (error) {
    console.error('Get subscribers error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Update subscriber
router.put('/subscribers/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { email, name, isActive } = req.body

    const subscribers = readSubscribers()
    const subscriberIndex = subscribers.findIndex((sub: any) => sub.id === id)

    if (subscriberIndex === -1) {
      return res.status(404).json({ error: 'Subscriber not found' })
    }

    subscribers[subscriberIndex].email = email
    subscribers[subscriberIndex].name = name
    subscribers[subscriberIndex].isActive = isActive
    subscribers[subscriberIndex].updatedAt = new Date().toISOString()
    writeSubscribers(subscribers)

    res.json(subscribers[subscriberIndex])
  } catch (error) {
    console.error('Update subscriber error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Delete subscriber
router.delete('/subscribers/:id', async (req, res) => {
  try {
    const { id } = req.params

    const subscribers = readSubscribers()
    const filteredSubscribers = subscribers.filter((sub: any) => sub.id !== id)

    if (filteredSubscribers.length === subscribers.length) {
      return res.status(404).json({ error: 'Subscriber not found' })
    }

    writeSubscribers(filteredSubscribers)

    res.json({ message: 'Subscriber deleted successfully' })
  } catch (error) {
    console.error('Delete subscriber error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Unsubscribe
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    const subscribers = readSubscribers()
    const subscriberIndex = subscribers.findIndex((sub: any) => sub.email.toLowerCase() === email.toLowerCase())

    if (subscriberIndex === -1) {
      return res.status(404).json({ error: 'Subscriber not found' })
    }

    subscribers[subscriberIndex].isActive = false
    subscribers[subscriberIndex].updatedAt = new Date().toISOString()
    writeSubscribers(subscribers)

    res.json({ message: 'Successfully unsubscribed from newsletter' })
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Send newsletter to all active subscribers (admin only)
router.post('/send-newsletter', async (req, res) => {
  try {
    const { subject, content, htmlContent } = req.body

    if (!subject || !content) {
      return res.status(400).json({ error: 'Subject and content are required' })
    }

    const subscribers = readSubscribers()
    const activeSubscribers = subscribers.filter((sub: any) => sub.isActive)

    if (activeSubscribers.length === 0) {
      return res.status(400).json({ error: 'No active subscribers found' })
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    let successCount = 0
    let failureCount = 0

    // Send email to each subscriber
    for (const subscriber of activeSubscribers) {
      try {
        await transporter.sendMail({
          from: `"Ma Services Solution" <${process.env.SMTP_USER}>`,
          to: subscriber.email,
          subject: subject,
          text: content,
          html: htmlContent || content.replace(/\n/g, '<br>'),
        })
        successCount++
      } catch (error) {
        console.error(`Failed to send email to ${subscriber.email}:`, error)
        failureCount++
      }
    }

    res.json({
      message: `Newsletter sent successfully to ${successCount} subscribers`,
      successCount,
      failureCount,
      totalSubscribers: activeSubscribers.length
    })
  } catch (error) {
    console.error('Send newsletter error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get newsletter statistics
router.get('/stats', async (req, res) => {
  try {
    const subscribers = readSubscribers()
    const totalSubscribers = subscribers.length
    const activeSubscribers = subscribers.filter((sub: any) => sub.isActive).length
    const inactiveSubscribers = totalSubscribers - activeSubscribers

    // Get recent subscriptions (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const recentSubscribers = subscribers.filter((sub: any) =>
      new Date(sub.subscribedAt) > thirtyDaysAgo
    ).length

    res.json({
      totalSubscribers,
      activeSubscribers,
      inactiveSubscribers,
      recentSubscribers
    })
  } catch (error) {
    console.error('Get newsletter stats error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export { router as newsletterRouter }