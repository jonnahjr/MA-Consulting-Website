import { Router } from 'express'
import prisma from '../prismaClient'

const router = Router();

router.post('/', async (req, res) => {
  const job = await prisma.job.create({ data: req.body as any });
  res.status(201).json(job);
});

router.get('/', async (req, res) => {
  const jobs = await prisma.job.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(jobs);
});

export default router;
