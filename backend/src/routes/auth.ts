import { Router } from 'express'
import prisma from '../prismaClient'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body as any;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '8h' });
  res.json({ token });
});

export default router;
