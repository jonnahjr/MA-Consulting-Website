import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import path from 'path'
import { contactRouter } from './routes/contact.js'
import { careersRouter } from './routes/careers.js'
import { servicesRouter } from './routes/services.js'
import { teamRouter } from './routes/team.js'
import { testimonialsRouter } from './routes/testimonials.js'
import { blogRouter } from './routes/blog.js'
import { contactInfoRouter } from './routes/contact-info.js'

// Load .env from project root
dotenv.config({ path: path.resolve(process.cwd(), '../../.env') })

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(helmet())
app.use(cors())
app.use(express.json({ limit: '10mb' })) // For file uploads
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/contact', contactRouter)
app.use('/api/careers', careersRouter)
app.use('/api/services', servicesRouter)
app.use('/api/team', teamRouter)
app.use('/api/testimonials', testimonialsRouter)
app.use('/api/blog', blogRouter)
app.use('/api/contact-info', contactInfoRouter)

// Serve uploaded files
app.use('/uploads', express.static(path.resolve(process.cwd(), 'uploads')))

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
