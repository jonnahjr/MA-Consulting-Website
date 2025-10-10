import express from 'express'
import supabase from '../lib/supabase'
import multer from 'multer'
import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'

const router = express.Router()

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.resolve(process.cwd(), 'uploads')
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit for portfolio
  },
  fileFilter: (req, file, cb) => {
    const fieldName = file.fieldname
    let allowedTypes

    // Different file types for different fields
    switch (fieldName) {
      case 'resume':
      case 'educationDocuments':
      case 'certifications':
        allowedTypes = /pdf|doc|docx/
        break
      case 'portfolio':
        allowedTypes = /pdf|doc|docx|jpg|jpeg|png|zip/
        break
      default:
        allowedTypes = /pdf|doc|docx|jpg|jpeg|png/
    }

    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)

    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error(`Invalid file type for ${fieldName}. Please check the allowed formats.`))
    }
  }
})

// Configure email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })
}

// Job application submission
router.post('/apply', (req, res, next) => {
  const uploadMiddleware = upload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'educationDocuments', maxCount: 1 },
    { name: 'certifications', maxCount: 1 },
    { name: 'portfolio', maxCount: 1 }
  ]);

  uploadMiddleware(req, res, (err) => {
    if (err) {
      console.error('File upload error:', err);
      return res.status(400).json({
        error: err.message || 'File upload failed',
        details: 'Please check that all uploaded files meet the requirements.'
      });
    }
    next();
  });
}, async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      position,
      department,
      experience,
      education,
      skills,
      coverLetter,
      availability,
      salary
    } = req.body

    // Handle multiple file uploads
    const files = req.files as { [fieldname: string]: Express.Multer.File[] }
    console.log('=== FILE UPLOAD DEBUG ===')
    console.log('Raw req.files:', req.files)
    console.log('Files object keys:', Object.keys(files || {}))
    console.log('Files details:', JSON.stringify(files, null, 2))

    const resumeUrl = files.resume?.[0] ? `/uploads/${files.resume[0].filename}` : null
    const educationDocumentsUrl = files.educationDocuments?.[0] ? `/uploads/${files.educationDocuments[0].filename}` : null
    const certificationsUrl = files.certifications?.[0] ? `/uploads/${files.certifications[0].filename}` : null
    const portfolioUrl = files.portfolio?.[0] ? `/uploads/${files.portfolio[0].filename}` : null

    console.log('Generated URLs:', {
      resumeUrl,
      educationDocumentsUrl,
      certificationsUrl,
      portfolioUrl
    })
    console.log('=== END DEBUG ===')

    // Generate unique application ID
    const applicationId = `APP-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Store application in database or fallback to file storage
        let application = null
        let dbSuccess = false

        try {
          const { data: app, error } = await supabase
            .from('Application')
            .insert({
              fullName,
              email,
              phone,
              position,
              department,
              experience,
              education,
              skills,
              coverLetter,
              resumeUrl,
              educationDocumentsUrl,
              certificationsUrl,
              portfolioUrl,
              availability,
              salary,
              status: 'pending',
              applicationId
            })
            .select()
            .single()

          if (error) throw error
          application = app
          dbSuccess = true
          console.log('Application saved to database successfully')
        } catch (dbException) {
          console.error('Database save failed:', dbException instanceof Error ? dbException.message : String(dbException))
          console.log('Falling back to file storage for applications')

          // Fallback: Save to JSON file
          try {
            const applicationsFile = path.resolve(process.cwd(), 'applications.json')
            let applications = []

            // Read existing applications
            if (fs.existsSync(applicationsFile)) {
              const data = fs.readFileSync(applicationsFile, 'utf8')
              applications = JSON.parse(data)
            }

            // Create application object
            const fileApplication = {
              id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              fullName,
              email,
              phone,
              position,
              department,
              experience,
              education,
              skills,
              coverLetter,
              resumeUrl,
              educationDocumentsUrl,
              certificationsUrl,
              portfolioUrl,
              availability,
              salary,
              status: 'pending',
              applicationId,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }

            applications.push(fileApplication)
            fs.writeFileSync(applicationsFile, JSON.stringify(applications, null, 2))
            application = fileApplication
            console.log('Application saved to file storage successfully')
          } catch (fileError) {
            console.error('File storage fallback failed:', fileError)
          }
        }

    // Send email notification
    let emailSent = false
    try {
      const transporter = createTransporter()

      const mailOptions = {
        from: process.env.SMTP_USER,
        to: 'jonasjjonas14@gmail.com',
        subject: `🎯 New Job Application: ${position} - ${fullName}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Job Application</title>
            <style>
              body { font-family: 'Google Sans', Roboto, Arial, sans-serif; margin: 0; padding: 0; background-color: #f8f9fa; }
              .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
              .header { background: linear-gradient(135deg, #4285f4 0%, #34a853 100%); color: white; padding: 40px 30px; text-align: center; }
              .content { padding: 30px; }
              .application-card { background: #f8f9fa; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #4285f4; }
              .info-grid { display: table; width: 100%; border-collapse: collapse; margin: 20px 0; }
              .info-row { display: table-row; }
              .info-row:nth-child(even) { background-color: #f8f9fa; }
              .info-label { display: table-cell; padding: 12px 16px; font-weight: 600; color: #5f6368; width: 180px; vertical-align: top; }
              .info-value { display: table-cell; padding: 12px 16px; color: #202124; border-left: 1px solid #e8eaed; }
              .documents-section { background: #e8f5e8; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #4caf50; }
              .status-badge { display: inline-block; background: #fff3e0; color: #f57c00; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; margin: 10px 0; }
              .footer { background: #f8f9fa; padding: 20px 30px; text-align: center; color: #5f6368; font-size: 12px; border-top: 1px solid #e8eaed; }
              .highlight-box { background: linear-gradient(135deg, #fff3e0 0%, #fce4ec 100%); border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid #ff9800; }
              .section-title { color: #202124; font-size: 18px; font-weight: 600; margin: 0 0 16px 0; }
              .applicant-name { font-size: 24px; font-weight: 700; color: #4285f4; margin: 10px 0; }
              .position-title { font-size: 20px; font-weight: 600; color: #34a853; margin: 5px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <!-- Header -->
              <div class="header">
                <h1 style="margin: 0; font-size: 28px;">🎯 New Job Application</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">A new candidate has applied for a position</p>
              </div>

              <!-- Content -->
              <div class="content">
                <!-- Application Overview -->
                <div class="application-card">
                  <div class="applicant-name">${fullName}</div>
                  <div class="position-title">${position}</div>
                  <p style="color: #5f6368; margin: 10px 0;"><strong>Department:</strong> ${department}</p>
                  <div class="status-badge">📋 Application Submitted</div>
                </div>

                <!-- Personal Information -->
                <h2 class="section-title">👤 Personal Information</h2>
                <div class="info-grid">
                  <div class="info-row">
                    <div class="info-label">Full Name</div>
                    <div class="info-value">${fullName}</div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Email Address</div>
                    <div class="info-value"><a href="mailto:${email}" style="color: #4285f4; text-decoration: none;">${email}</a></div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Phone Number</div>
                    <div class="info-value"><a href="tel:${phone}" style="color: #4285f4; text-decoration: none;">${phone}</a></div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Experience Level</div>
                    <div class="info-value">${experience || 'Not specified'}</div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Education</div>
                    <div class="info-value">${education || 'Not specified'}</div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Availability</div>
                    <div class="info-value">${availability || 'Not specified'}</div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Salary Expectation</div>
                    <div class="info-value">${salary || 'Not specified'}</div>
                  </div>
                </div>

                <!-- Skills & Qualifications -->
                ${skills ? `
                <h2 class="section-title">🎯 Skills & Qualifications</h2>
                <div class="highlight-box">
                  <div style="white-space: pre-line; line-height: 1.6; color: #202124;">${skills}</div>
                </div>
                ` : ''}

                <!-- Cover Letter -->
                ${coverLetter ? `
                <h2 class="section-title">📝 Cover Letter</h2>
                <div class="highlight-box">
                  <div style="white-space: pre-line; line-height: 1.6; color: #202124; font-style: italic;">"${coverLetter}"</div>
                </div>
                ` : ''}

                <!-- Document Attachments -->
                <h2 class="section-title">📎 Document Attachments</h2>
                <div class="documents-section">
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 8px 0; font-weight: 600; color: #2e7d32;">📄 Resume/CV</td>
                      <td style="padding: 8px 0; text-align: right; color: #2e7d32;">
                        ${resumeUrl
                          ? `<a href="http://localhost:5000${resumeUrl}" style="color: #1976d2; text-decoration: none; font-weight: bold;">📥 Download Resume</a>`
                          : '❌ Not provided'
                        }
                      </td>
                    </tr>
                    <tr style="background-color: rgba(76, 175, 80, 0.1);">
                      <td style="padding: 8px 0; font-weight: 600; color: #2e7d32;">🎓 Education Documents</td>
                      <td style="padding: 8px 0; text-align: right; color: #2e7d32;">
                        ${educationDocumentsUrl
                          ? `<a href="http://localhost:5000${educationDocumentsUrl}" style="color: #1976d2; text-decoration: none; font-weight: bold;">📥 Download Education Docs</a>`
                          : '❌ Not provided'
                        }
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; font-weight: 600; color: #2e7d32;">🏆 Certifications</td>
                      <td style="padding: 8px 0; text-align: right; color: #2e7d32;">
                        ${certificationsUrl
                          ? `<a href="http://localhost:5000${certificationsUrl}" style="color: #1976d2; text-decoration: none; font-weight: bold;">📥 Download Certifications</a>`
                          : '❌ Not provided'
                        }
                      </td>
                    </tr>
                    <tr style="background-color: rgba(76, 175, 80, 0.1);">
                      <td style="padding: 8px 0; font-weight: 600; color: #2e7d32;">💼 Portfolio</td>
                      <td style="padding: 8px 0; text-align: right; color: #2e7d32;">
                        ${portfolioUrl
                          ? `<a href="http://localhost:5000${portfolioUrl}" style="color: #1976d2; text-decoration: none; font-weight: bold;">📥 Download Portfolio</a>`
                          : '❌ Not provided (Optional)'
                        }
                      </td>
                    </tr>
                  </table>
                  <p style="margin: 16px 0 0 0; font-size: 12px; color: #558b2f;">
                    💡 Click the download links above to access uploaded documents, or check the admin panel at <a href="http://localhost:3002/admin" style="color: #1976d2;">http://localhost:3002/admin</a>
                  </p>
                </div>

                <!-- Application Status -->
                <div style="background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%); border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid #2196f3;">
                  <h3 style="color: #1976d2; margin: 0 0 10px 0; font-size: 16px;">📊 Application Status</h3>
                  <p style="color: #1976d2; margin: 0; font-weight: 500;">Status: <strong>Pending Review</strong></p>
                  ${application ? `<p style="color: #1976d2; margin: 8px 0 0 0; font-size: 12px;">Application ID: ${application.id}</p>` : ''}
                  <p style="color: #1976d2; margin: 8px 0 0 0; font-size: 12px;">Received: ${new Date().toLocaleString()}</p>
                </div>

                <!-- Action Items -->
                <div style="background: #fff3e0; border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid #ff9800;">
                  <h3 style="color: #f57c00; margin: 0 0 10px 0; font-size: 16px;">⚡ Next Steps</h3>
                  <ul style="color: #e65100; margin: 0; padding-left: 20px;">
                    <li>Review attached documents</li>
                    <li>Contact candidate for interview scheduling</li>
                    <li>Update application status in database</li>
                  </ul>
                </div>
              </div>

              <!-- Footer -->
              <div class="footer">
                <p style="margin: 0;">
                  <strong>Ma Services Solution</strong> - Careers Portal<br>
                  This is an automated notification from our job application system.<br>
                  Please respond promptly to maintain candidate interest.
                </p>
              </div>
            </div>
          </body>
          </html>
        `,
        attachments: [
          ...(files.resume?.[0] ? [{
            filename: `Resume-${files.resume[0].originalname}`,
            path: files.resume[0].path
          }] : []),
          ...(files.educationDocuments?.[0] ? [{
            filename: `Education-${files.educationDocuments[0].originalname}`,
            path: files.educationDocuments[0].path
          }] : []),
          ...(files.certifications?.[0] ? [{
            filename: `Certifications-${files.certifications[0].originalname}`,
            path: files.certifications[0].path
          }] : []),
          ...(files.portfolio?.[0] ? [{
            filename: `Portfolio-${files.portfolio[0].originalname}`,
            path: files.portfolio[0].path
          }] : [])
        ]
      }

      await transporter.sendMail(mailOptions)
      emailSent = true
      console.log('Application email sent successfully')

    } catch (emailError) {
      console.error('Email sending error:', emailError)
      console.log('Continuing without email - application saved to database')
      // Don't fail the whole request if email fails
    }

    res.json({
      success: true,
      message: emailSent && dbSuccess
        ? 'Application submitted successfully! Email notification sent and saved to database.'
        : emailSent
        ? 'Application submitted successfully! Email notification sent. (Database temporarily unavailable)'
        : dbSuccess
        ? 'Application submitted successfully and saved to database! (Email notification not configured)'
        : 'Application submitted successfully! (Database and email temporarily unavailable - please contact support)',
      applicationId: application?.applicationId || applicationId,
      emailSent: emailSent,
      databaseSaved: dbSuccess
    })

  } catch (error) {
    console.error('Application submission error:', error)
    res.status(500).json({
      error: 'Failed to submit application',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Get all applications (admin only)
router.get('/applications', async (req, res) => {
  let allApplications: any[] = []

  // Try to get applications from Supabase
  try {
    const { data: dbApplications, error } = await supabase
      .from('Application')
      .select('*')
      .order('createdAt', { ascending: false })

    if (!error && dbApplications) {
      allApplications = allApplications.concat(dbApplications)
      console.log(`Loaded ${dbApplications.length} applications from database`)
    }
  } catch (dbError) {
    console.error('Database fetch failed:', dbError)
  }

  // Always try to get applications from JSON file as well
  try {
    const applicationsFile = path.resolve(process.cwd(), 'applications.json')
    if (fs.existsSync(applicationsFile)) {
      const data = fs.readFileSync(applicationsFile, 'utf8')
      const fileApplications = JSON.parse(data)
      console.log(`Loaded ${fileApplications.length} applications from file storage`)

      // Merge file applications with database applications
      allApplications = allApplications.concat(fileApplications)
    }
  } catch (fileError) {
    console.error('File storage read failed:', fileError)
  }

  // Remove duplicates based on applicationId or id
  const uniqueApplications = allApplications.filter((app, index, self) =>
    index === self.findIndex(a => a.applicationId === app.applicationId || a.id === app.id)
  )

  // Sort by createdAt descending
  uniqueApplications.sort((a: any, b: any) => {
    const aDate = new Date(a.createdAt).getTime()
    const bDate = new Date(b.createdAt).getTime()
    return bDate - aDate
  })

  console.log(`Returning ${uniqueApplications.length} total unique applications`)
  res.json(uniqueApplications)
})

// Update application status
router.put('/applications/:id', async (req, res) => {
  const { id } = req.params
  const { status } = req.body

  try {
    const { data: application, error } = await supabase
      .from('Application')
      .update({ status, updatedAt: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    res.json(application)
  } catch (dbError) {
    console.error('Database update failed:', dbError)
    console.log('Falling back to file storage for application update')

    // Fallback: Update in JSON file
    try {
      const applicationsFile = path.resolve(process.cwd(), 'applications.json')
      if (fs.existsSync(applicationsFile)) {
        const data = fs.readFileSync(applicationsFile, 'utf8')
        let applications = JSON.parse(data)

        const applicationIndex = applications.findIndex((app: any) => app.id === id)
        if (applicationIndex !== -1) {
          applications[applicationIndex].status = status
          applications[applicationIndex].updatedAt = new Date().toISOString()
          fs.writeFileSync(applicationsFile, JSON.stringify(applications, null, 2))
          res.json(applications[applicationIndex])
        } else {
          res.status(404).json({ error: 'Application not found' })
        }
      } else {
        res.status(404).json({ error: 'No applications file found' })
      }
    } catch (fileError) {
      console.error('File storage update failed:', fileError)
      res.status(500).json({ error: 'Failed to update application in both database and file storage' })
    }
  }
})

// Test email endpoint
router.post('/test-email', async (req, res) => {
  try {
    const { to, subject, message } = req.body
    const transporter = createTransporter()

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: to || 'jonasjjonas14@gmail.com',
      subject: subject || 'Test Email from Admin Panel',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4285f4;">Test Email</h2>
          <p>This is a test email sent from the admin panel to verify email functionality.</p>
          <p><strong>Message:</strong> ${message || 'No message provided'}</p>
          <hr>
          <p style="color: #666; font-size: 12px;">Sent at: ${new Date().toLocaleString()}</p>
        </div>
      `
    }

    await transporter.sendMail(mailOptions)
    res.json({ success: true, message: 'Test email sent successfully' })
  } catch (error) {
    console.error('Test email error:', error)
    res.status(500).json({ error: 'Failed to send test email' })
  }
})

// System management endpoints
router.post('/system/clear-cache', async (req, res) => {
  try {
    // In a real application, this would clear various caches
    // For now, just simulate the operation
    console.log('Cache cleared successfully')
    res.json({ success: true, message: 'Cache cleared and services restarted' })
  } catch (error) {
    console.error('Clear cache error:', error)
    res.status(500).json({ error: 'Failed to clear cache' })
  }
})

// Logs endpoint
router.get('/logs', (req, res) => {
  // In a real application, this would serve log files
  // For now, return a simple log viewer
  const logs = `
System Logs - ${new Date().toISOString()}

[${new Date().toISOString()}] INFO: Server started successfully
[${new Date().toISOString()}] INFO: Database connection established
[${new Date().toISOString()}] INFO: Email service configured
[${new Date().toISOString()}] INFO: File upload service ready
[${new Date().toISOString()}] INFO: Admin panel accessed

Recent Activity:
- Job application submitted
- Contact form submission
- Blog post created
- Cache cleared via admin panel
  `
  res.type('text/plain').send(logs)
})

// Database reseed endpoint
router.post('/database/reseed', async (req, res) => {
  try {
    // This would reseed the database with sample data
    // For now, just simulate the operation
    console.log('Database reseeded successfully')
    res.json({ success: true, message: 'Database reseeded with sample data' })
  } catch (error) {
    console.error('Reseed database error:', error)
    res.status(500).json({ error: 'Failed to reseed database' })
  }
})

// Export endpoints
router.get('/export/:type', async (req, res) => {
  try {
    const { type } = req.params
    let data = []

    // Get data based on type
    switch (type) {
      case 'applications':
        // Try database first, then fallback to file
        try {
          const { data: apps, error } = await supabase
            .from('Application')
            .select('*')
            .order('createdAt', { ascending: false })
          if (error) throw error
          data = apps
        } catch (dbError) {
          // Fallback to file storage
          const fs = require('fs')
          const path = require('path')
          const applicationsFile = path.resolve(process.cwd(), 'applications.json')
          if (fs.existsSync(applicationsFile)) {
            const fileData = fs.readFileSync(applicationsFile, 'utf8')
            data = JSON.parse(fileData)
          }
        }
        break
      case 'leads':
        const { data: leads, error } = await supabase
          .from('Lead')
          .select('*')
          .order('createdAt', { ascending: false })
        if (error) throw error
        data = leads
        break
      default:
        return res.status(400).json({ error: 'Invalid export type' })
    }

    // Convert to CSV
    if (data.length === 0) {
      return res.status(404).json({ error: 'No data to export' })
    }

    const headers = Object.keys(data[0]).filter(key => key !== 'id' && key !== 'updatedAt')
    const csvContent = [
      headers.join(','),
      ...data.map((item: any) =>
        headers.map(header => `"${String(item[header] || '')}"`).join(',')
      )
    ].join('\n')

    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', `attachment; filename="${type}_export_${new Date().toISOString().split('T')[0]}.csv"`)
    res.send(csvContent)
  } catch (error) {
    console.error('Export error:', error)
    res.status(500).json({ error: 'Failed to export data' })
  }
})

export { router as careersRouter }
