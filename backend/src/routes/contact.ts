import { Router } from 'express'
import prisma from '../prismaClient'

const router = Router();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body as any;
  if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });

  await prisma.contact.create({ data: { name, email, message } });

  res.status(201).json({ message: 'Contact saved' });
});

router.get('/', async (req, res) => {
  const items = await prisma.contact.findMany({ orderBy: { createdAt: 'desc' }, take: 50 });
  res.json(items);
});

export default router;
