import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.example.com',
  port: Number(process.env.SMTP_PORT) || 587,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || ''
  }
})

export async function sendMail(to: string, subject: string, html: string){
  try {
    const info = await transporter.sendMail({ from: process.env.SMTP_USER || 'no-reply@example.com', to, subject, html })
    return info
  } catch (err){
    console.warn('Mailer error (placeholder)', err)
    return null
  }
}
