# MA Consulting Website

A modern, professional consulting website built with React, Vite, Express, and PostgreSQL. This project showcases MA Consulting's services with a clean, responsive design and interactive AI chat assistant.

## ✨ Live Demo & Repository

🚀 **[View Repository on GitHub](https://github.com/jonnahjr/MA-Consulting-Website)**

🌐 **[View Live Demo](https://ma-consulting-website.vercel.app)** (deployed on Vercel)

This is a fully functional demo website featuring:
- Professional consulting website design
- Interactive AI chat assistant
- Responsive mobile-first design
- Modern React + TypeScript architecture
- Clean, maintainable code structure

## 🚀 Features

- **Modern Frontend**: React + Vite + TypeScript + Tailwind CSS
- **Responsive Design**: Mobile-first approach with professional styling
- **Interactive AI Chat**: Built-in chat bot with consulting expertise
- **Dynamic Content**: REST API backend with database integration
- **SEO Optimized**: React Helmet Async for meta management
- **Professional UI**: Clean, modern design with smooth animations
- **Contact Forms**: Validated forms with email integration
- **Multi-page Layout**: Home, About, Services, Team, Blog, Contact, Careers, Testimonials

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
- React 18
- Vite
- TypeScript
- Tailwind CSS
- React Router DOM
- React Hook Form + Zod validation
- Zustand (state management)
- Framer Motion (animations)
- React Helmet Async (SEO)
- TanStack Query (data fetching)

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- CORS
- Helmet
- Multer (file uploads)
- Nodemailer (email)
- Cheerio (web scraping)

### Database
- PostgreSQL
- Prisma ORM

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL (optional - demo can run without database)

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

3. **Start the development server**
    ```bash
    npm run dev
    ```

    The website will be available at http://localhost:5173

### Optional: Full Backend Setup

If you want to run the full backend with database:

1. **Set up PostgreSQL database**
2. **Configure environment variables**
    ```bash
    cp env.example .env
    # Edit .env with your database URL
    ```
3. **Set up the database**
    ```bash
    npm run db:push
    npm run db:seed
    ```
4. **Start both frontend and backend**
    ```bash
    npm run dev
    ```

    Frontend: http://localhost:5173, Backend: http://localhost:5000

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

## 🎯 Demo Features

This website showcases:

- **Professional Design**: Clean, modern consulting website design
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Interactive AI Chat**: Click the chat bubble in the bottom-right to talk to MA's AI assistant
- **Multi-page Navigation**: Explore different sections of the consulting firm
- **Contact Integration**: Working contact forms and information
- **SEO Optimized**: Proper meta tags and page structure

## 📱 Pages

- **Home**: Hero section with services overview and company highlights
- **About**: Company story, achievements, and team culture
- **Services**: Investment consulting, business development, tax & customs
- **Team**: Leadership team profiles with expertise areas
- **Blog**: Business insights and industry articles
- **Testimonials**: Client success stories and feedback
- **Careers**: Career opportunities (coming soon)
- **Contact**: Contact forms and company information

## 🧪 Testing

```bash
# Frontend unit tests
cd apps/web
npm run test

# E2E tests (requires Playwright setup)
npx playwright test
```

## 🚀 Deployment

### Quick Demo Deployment (Vercel)
1. Fork this repository on GitHub
2. Connect to Vercel: https://vercel.com
3. Import your forked repo
4. Vercel will auto-detect the Vite project and deploy
5. Your demo site will be live in minutes!

### Full Stack Deployment
- **Frontend**: Deploy `apps/web` to Vercel/Netlify
- **Backend**: Deploy `apps/api` to Render/Railway
- **Database**: Use Supabase or PlanetScale for PostgreSQL

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






