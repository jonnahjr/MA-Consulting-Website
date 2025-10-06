# MA Consulting Website

A modern, premium full-stack consulting website built with React 19, Vite, Express, and PostgreSQL. This project clones and enhances the content from [maservicessolution.com](https://maservicessolution.com/) with a dynamic backend and professional UI.

## 🚀 Features

- **Modern Frontend**: React 19 + Vite + TypeScript + Tailwind CSS
- **Animations**: Framer Motion + React Spring with 3D hover physics
- **UI Components**: ShadCN UI with glassmorphism design
- **Forms**: React Hook Form + Zod validation
- **State Management**: Zustand
- **SEO**: React Helmet Async + prerendering
- **Backend**: Node.js + Express REST API
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: Role-based with Supabase (magic link + OAuth)
- **CMS**: Supabase Studio for content management
- **Testing**: Vitest + React Testing Library + Playwright
- **Deployment**: Vercel (frontend) + Supabase/Render (backend & DB)

## 🏗️ Project Structure

```
/
├── apps/
│   ├── web/          # React frontend
│   └── api/          # Express backend
├── prisma/           # Database schema & migrations
├── README.md
└── env.example
```

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- TypeScript
- Tailwind CSS
- ShadCN UI
- Framer Motion
- React Spring
- React Router DOM
- React Hook Form
- Zod
- Zustand
- React Helmet Async

### Backend
- Node.js
- Express
- TypeScript
- Prisma
- Supabase
- CORS
- Helmet
- Multer
- Nodemailer

### Database
- PostgreSQL
- Prisma ORM

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL
- Supabase account (optional, for auth & CMS)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ma-consulting-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   npm run db:seed
   ```

5. **Start development servers**
   ```bash
   npm run dev
   ```

   This will start both the frontend (http://localhost:3000) and backend (http://localhost:5000) servers.

## 📜 Available Scripts

### Root Scripts
- `npm run dev` - Start both frontend and backend in development
- `npm run build` - Build both frontend and backend
- `npm run start` - Start production backend
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:seed` - Seed database with initial data

### Frontend Scripts (apps/web)
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run Vitest

### Backend Scripts (apps/api)
- `npm run dev` - Start Express dev server with tsx
- `npm run build` - Compile TypeScript
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/ma_consulting"

# Supabase (for auth & CMS)
SUPABASE_URL="your-supabase-url"
SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Email (for contact form notifications)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Backend
PORT=5000
```

## 🗄️ Database Schema

The application uses the following main models:
- `User` - User accounts with roles
- `Service` - Consulting services
- `TeamMember` - Team profiles
- `Testimonial` - Client testimonials
- `BlogPost` - Blog content
- `Application` - Job applications
- `Lead` - Contact form submissions

## 🔐 Authentication

Role-based authentication using Supabase:
- Admin: Full access to CMS
- Editor: Content management
- User: Basic access

## 📱 Pages

- **Home**: Hero section with tagline, services overview
- **About**: Company story, mission, vision
- **Services**: Detailed service pages with case studies
- **Team**: Team member profiles with social links
- **Blog**: CMS-driven blog with search and categories
- **Testimonials**: Client feedback carousel
- **Careers**: Job listings with application forms
- **Contact**: Contact form with validation

## 🧪 Testing

```bash
# Frontend unit tests
cd apps/web
npm run test

# E2E tests (requires Playwright setup)
npx playwright test
```

## 🚀 Deployment

### Frontend (Vercel)
1. Connect GitHub repo to Vercel
2. Set build command: `npm run build --workspace=apps/web`
3. Set output directory: `apps/web/dist`

### Backend (Supabase/Render)
1. Deploy to Supabase Functions or Render
2. Set environment variables
3. Run database migrations

### Database (Supabase)
1. Create Supabase project
2. Run Prisma migrations
3. Set up RLS policies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support, email info@maconsulting.com or create an issue in the repository.






