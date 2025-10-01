import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import 'express-async-errors';

import prisma from './prismaClient'
import contactRoutes from './routes/contact';
import authRoutes from './routes/auth';
import blogRoutes from './routes/blog';
import jobRoutes from './routes/jobs';
import testimonialRoutes from './routes/testimonials';
import careersRoutes from './routes/careers';
import chatbotRoutes from './routes/chatbot';
import { requireAdmin } from './middleware/auth';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.BACKEND_PORT || 5000;

app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/careers', careersRoutes);
app.use('/api/chat', chatbotRoutes);

// protect create endpoints example
app.post('/api/blogs', requireAdmin, (req, res) => res.status(501).json({ error: 'Use /api/blogs route' }));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const start = async () => {
  try {
    // simple DB check
    await prisma.$connect();
    console.log('Connected to Postgres via Prisma');

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
};

start();
