import { Router } from 'express'
import prisma from '../prismaClient'

const router = Router();

router.post('/', async (req, res) => {
  const t = await prisma.testimonial.create({ data: req.body as any });
  res.status(201).json(t);
});

router.get('/', async (req, res) => {
  const items = await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' }, take: 20 });
  res.json(items);
});

export default router;
