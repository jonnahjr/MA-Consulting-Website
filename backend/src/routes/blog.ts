import { Router } from 'express'
import prisma from '../prismaClient'

const router = Router();

router.post('/', async (req, res) => {
  const post = await prisma.blog.create({ data: req.body as any });
  res.status(201).json(post);
});

router.get('/', async (req, res) => {
  const posts = await prisma.blog.findMany({ orderBy: { createdAt: 'desc' }, take: 50 });
  res.json(posts);
});

router.get('/:slug', async (req, res) => {
  const post = await prisma.blog.findUnique({ where: { slug: req.params.slug } });
  if (!post) return res.status(404).json({ error: 'Not found' });
  res.json(post);
});

export default router;
