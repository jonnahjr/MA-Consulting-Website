import { Router } from 'express'
import { upload } from '../middleware/upload'
import prisma from '../prismaClient'
import { sendMail } from '../utils/mailer'

const router = Router();

router.post('/', upload.single('resume'), async (req, res) => {
  const { name, email, phone, position, coverLetter } = req.body as any;
  const resumePath = req.file ? req.file.path : undefined;

  if (!name || !email || !position) return res.status(400).json({ error: 'Missing required fields' });

  await prisma.application.create({ data: { name, email, phone, position, coverLetter, resumePath } });

  await sendMail(process.env.SMTP_USER || 'hr@example.com', `New application for ${position}`, `<p>${name} applied for ${position}. Resume: ${resumePath}</p>`)

  res.status(201).json({ message: 'Application submitted' });
});

router.get('/', async (req, res) => {
  const items = await prisma.application.findMany({ orderBy: { createdAt: 'desc' }, take: 100 });
  res.json(items);
});

export default router;
