# 🚀 MA Services Solution - Professional Consulting Website

<div align="center">

![MA Consulting](https://img.shields.io/badge/MA-Services_Solution-4285F4?style=for-the-badge&logo=google&logoColor=white)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-4.18.0-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-5.0.0-2D3748?style=for-the-badge&logo=prisma&logoColor=white)

*A modern, full-stack consulting website with MySQL database, phpMyAdmin management, and professional UI*

[🌐 Live Demo](https://ma-consulting-website-jr.vercel.app) • [📖 Documentation](#-documentation) • [🚀 Quick Start](#-getting-started)

</div>

---

## ✨ Overview

MA Services Solution is a comprehensive full-stack web application built for a professional consulting firm. This monorepo project features a modern React frontend, robust Express.js backend, MySQL database with Prisma ORM, and phpMyAdmin for database management.

### 🎯 Key Highlights

- **🏢 Professional Consulting Website** - Complete business website for consulting services
- **📱 Fully Responsive** - Mobile-first design that works on all devices
- **🤖 Interactive AI Chat** - Built-in chat assistant with consulting expertise
- **🗄️ MySQL Database** - Robust data management with phpMyAdmin interface
- **⚡ Modern Tech Stack** - Latest React, TypeScript, and Node.js technologies
- **🔒 Type Safe** - Full TypeScript implementation for reliability
- **📧 Email Integration** - Automated notifications for forms and applications
- **📁 File Uploads** - Resume and document handling for job applications

---

## 🏗️ Project Architecture

```
MA-Consulting Website/
├── 📁 apps/
│   ├── 🌐 web/              # React Frontend (Vite + TypeScript)
│   │   ├── 📄 src/
│   │   │   ├── 🏠 pages/     # Page Components
│   │   │   ├── 🧩 components/# Reusable Components
│   │   │   ├── 🎨 assets/    # Images & Static Files
│   │   │   └── 🔧 lib/       # Utilities & API calls
│   │   └── 📦 package.json
│   │
│   └── ⚙️ api/               # Express Backend (Node.js + TypeScript)
│       ├── 📄 src/
│       │   ├── 🚪 routes/    # API Route Handlers
│       │   ├── 🔧 lib/       # Database & Utilities
│       │   └── ⚡ server.ts   # Main Server File
│       └── 📦 package.json
│
├── 🗄️ prisma/                # Database Schema & Migrations
│   ├── 📋 schema.prisma      # Database Models
│   ├── 🌱 seed.ts           # Database Seeding
│   └── 🔄 migrations/       # Migration Files
│
├── ⚙️ package.json           # Root Configuration
├── 📖 README.md             # This File
└── 🔐 .env                  # Environment Variables
```

---

## 🛠️ Technology Stack

### 🎨 Frontend (React Application)

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.2.0 | UI Framework |
| **Vite** | 5.4.20 | Build Tool & Dev Server |
| **TypeScript** | 5.0.0 | Type Safety |
| **Tailwind CSS** | 3.4.0 | Styling Framework |
| **React Router** | 6.8.0 | Client-side Routing |
| **React Helmet** | Latest | SEO & Meta Management |

### ⚙️ Backend (Express API)

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18+ | Runtime Environment |
| **Express.js** | 4.18.0 | Web Framework |
| **TypeScript** | 5.0.0 | Type Safety |
| **Prisma** | 5.0.0 | Database ORM |
| **MySQL2** | Latest | Database Driver |
| **Multer** | 1.4.5 | File Upload Handling |
| **Nodemailer** | 6.9.0 | Email Service |
| **Helmet** | 7.0.0 | Security Middleware |
| **CORS** | 2.8.5 | Cross-origin Requests |

### 🗄️ Database & Tools

| Technology | Version | Purpose |
|------------|---------|---------|
| **MySQL** | 8.0+ | Relational Database |
| **phpMyAdmin** | Latest | Database Management UI |
| **Prisma Studio** | Built-in | Database GUI |
| **XAMPP** | 8.2+ | Local Development Stack |

---

## 📊 Database Schema

The application uses 7 main database models:

### 👥 User Management
```sql
User {
  id: String (CUID)
  name: String
  email: String (Unique)
  role: String (Default: "user")
  createdAt: DateTime
  updatedAt: DateTime
}
```

### 🏢 Business Data
```sql
Service {
  id: String
  title: String
  description: String
  icon: String?
  metrics: Json?
  createdAt: DateTime
  updatedAt: DateTime
}

TeamMember {
  id: String
  name: String
  role: String
  bio: String?
  image: String?
  socials: Json?
  createdAt: DateTime
  updatedAt: DateTime
}

Testimonial {
  id: String
  clientName: String
  feedback: String
  videoUrl: String?
  createdAt: DateTime
  updatedAt: DateTime
}
```

### 📝 Content Management
```sql
BlogPost {
  id: String
  title: String
  slug: String (Unique)
  content: String
  tags: String
  publishedAt: DateTime?
  createdAt: DateTime
  updatedAt: DateTime
}
```

### 📋 Business Operations
```sql
Application {  // Job Applications
  id: String
  fullName: String
  email: String
  phone: String
  position: String
  department: String
  experience: String?
  education: String?
  skills: String?
  coverLetter: String?
  resumeUrl: String?
  educationDocumentsUrl: String?
  certificationsUrl: String?
  portfolioUrl: String?
  availability: String?
  salary: String?
  status: String (Default: "pending")
  applicationId: String? (Unique)
  createdAt: DateTime
  updatedAt: DateTime
}

Lead {  // Contact Form Submissions
  id: String
  name: String
  email: String
  subject: String
  message: String
  createdAt: DateTime
}
```

---

## 🔌 API Endpoints

### 📚 Blog Management
```
GET    /api/blog              # List all blog posts
POST   /api/blog              # Create new blog post
PUT    /api/blog/:id          # Update blog post
DELETE /api/blog/:id          # Delete blog post
```

### 🏢 Services Management
```
GET    /api/services          # List all services
POST   /api/services          # Create new service
PUT    /api/services/:id      # Update service
DELETE /api/services/:id      # Delete service
```

### 👥 Team Management
```
GET    /api/team              # List team members
POST   /api/team              # Add team member
PUT    /api/team/:id          # Update team member
DELETE /api/team/:id          # Remove team member
```

### 💬 Testimonials
```
GET    /api/testimonials       # List testimonials
POST   /api/testimonials       # Add testimonial
PUT    /api/testimonials/:id   # Update testimonial
DELETE /api/testimonials/:id   # Delete testimonial
```

### 📞 Contact & Leads
```
GET    /api/contact/leads     # List contact submissions
POST   /api/contact           # Submit contact form
```

### 💼 Careers & Applications
```
POST   /api/careers/apply     # Submit job application
GET    /api/careers/applications    # List applications (admin)
PUT    /api/careers/applications/:id # Update application status
```

### 🏥 Health Check
```
GET    /health                # Server health status
```

---

## 🚀 Getting Started

### 📋 Prerequisites

- **Node.js** 18.0 or higher
- **MySQL** 8.0+ (via XAMPP for local development)
- **npm** or **yarn** package manager
- **Git** for version control

### ⚡ Quick Setup (5 minutes)

1. **📥 Clone the Repository**
   ```bash
   git clone <repository-url>
   cd ma-consulting-website
   ```

2. **📦 Install Dependencies**
   ```bash
   npm install
   ```

3. **🗄️ Setup Database**
   ```bash
   # Start MySQL via XAMPP Control Panel
   # Or via command line:
   # "C:\xampp\mysql_start.bat"

   # Create database
   mysql -u root -e "CREATE DATABASE ma_consulting"
   ```

4. **⚙️ Configure Environment**
   ```bash
   cp env.example .env
   # Edit .env with your settings
   ```

5. **🚀 Start Development**
   ```bash
   # Start both frontend and backend
   npm run dev
   ```

   **Access Points:**
   - 🌐 **Frontend:** http://localhost:3002
   - ⚙️ **Backend API:** http://localhost:5000
   - 🗄️ **phpMyAdmin:** http://localhost/phpmyadmin

### 🔧 Full Development Setup

1. **Database Migration**
   ```bash
   npm run db:push    # Apply schema to database
   npm run db:seed    # Populate with sample data
   ```

2. **Environment Configuration**
   ```env
   # Database
   DATABASE_URL="mysql://root:@localhost:3306/ma_consulting"

   # Email Configuration
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT=587
   SMTP_USER="your-email@gmail.com"
   SMTP_PASS="your-app-password"

   # Server
   PORT=5000

   # Frontend
   VITE_API_URL="http://localhost:5000/api"
   ```

---

## 📜 Available Scripts

### 🎯 Root Level Scripts
```bash
npm run dev          # Start frontend + backend (development)
npm run build        # Build both apps for production
npm run start        # Start production backend
npm run db:push      # Apply database schema changes
npm run db:seed      # Populate database with sample data
npm run db:generate  # Generate Prisma client
```

### 🌐 Frontend Scripts (`apps/web`)
```bash
cd apps/web
npm run dev          # Start Vite dev server
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### ⚙️ Backend Scripts (`apps/api`)
```bash
cd apps/api
npm run dev          # Start Express dev server
npm run build        # Compile TypeScript
npm run start        # Production server
npm run lint         # Run ESLint
```

---

## 🌟 Key Features

### 🎨 Frontend Features
- **📱 Responsive Design** - Mobile-first approach with Tailwind CSS
- **⚡ Fast Loading** - Vite build tool for optimal performance
- **🔍 SEO Optimized** - React Helmet for meta tag management
- **🎯 Interactive UI** - Smooth animations and transitions
- **🤖 AI Chat Widget** - Consulting assistant with contextual responses
- **📝 Form Validation** - Client-side validation with error handling
- **🧭 Intuitive Navigation** - Clean routing with React Router

### ⚙️ Backend Features
- **🔒 Type Safety** - Full TypeScript implementation
- **📁 File Uploads** - Multer for handling resumes and documents
- **📧 Email Integration** - Automated notifications via Nodemailer
- **🛡️ Security** - Helmet for security headers, CORS configuration
- **📊 Database ORM** - Prisma for type-safe database operations
- **🔄 Hot Reload** - Development with automatic restarts
- **📋 Input Validation** - Zod schemas for API validation

### 🗄️ Database Features
- **🎯 phpMyAdmin Integration** - Web-based database management
- **🔄 Automated Migrations** - Prisma schema synchronization
- **🌱 Data Seeding** - Sample data for development
- **📈 Scalable Schema** - Normalized database design
- **🔍 Query Optimization** - Efficient data retrieval

---

## 📱 Application Pages

| Page | Description | Features |
|------|-------------|----------|
| **🏠 Home** | Landing page with hero section | Services overview, company highlights, CTA |
| **📖 About** | Company story and mission | Achievements, values, company culture |
| **🛠️ Services** | Consulting service offerings | Investment, Business Dev, Tax, Development |
| **👥 Team** | Leadership team profiles | Photos, bios, expertise areas, social links |
| **📝 Blog** | Business insights & articles | Industry news, company updates, SEO content |
| **💬 Testimonials** | Client success stories | Reviews, case studies, social proof |
| **💼 Careers** | Job opportunities | Application forms, file uploads, email notifications |
| **📞 Contact** | Contact information & forms | Multiple contact methods, lead capture |

---

## 🚀 Deployment

### ⚡ Quick Demo Deployment (Vercel)

1. **🍴 Fork Repository** on GitHub
2. **🔗 Connect to Vercel** at [vercel.com](https://vercel.com)
3. **📥 Import Repository** - Vercel auto-detects Vite
4. **🚀 Deploy** - Live in minutes!
5. **🌐 Access** your demo at generated URL

### 🏗️ Full Production Deployment

#### Frontend Deployment
- **Vercel** (Recommended) - `apps/web` directory
- **Netlify** - Drag & drop `dist` folder
- **Railway** - Full-stack deployment

#### Backend Deployment
- **Railway** - `apps/api` directory
- **Render** - Docker or native Node.js
- **Heroku** - Git-based deployment

#### Database Deployment
- **PlanetScale** - MySQL-compatible, serverless
- **AWS RDS** - Managed MySQL instances
- **DigitalOcean** - Managed databases
- **Local MySQL** - For development only

### 📋 Production Checklist

- [ ] Environment variables configured
- [ ] Database connection tested
- [ ] Email service configured
- [ ] SSL certificates applied
- [ ] Domain configured
- [ ] CDN setup for assets
- [ ] Monitoring tools configured
- [ ] Backup strategy implemented

---

## 🔧 Development Guidelines

### 🏗️ Code Structure

**Frontend (`apps/web`):**
```
src/
├── components/     # Reusable UI components
├── pages/         # Page-level components
├── lib/           # Utilities, API clients, hooks
├── assets/        # Images, icons, static files
├── router.tsx     # Route configuration
└── main.tsx       # App entry point
```

**Backend (`apps/api`):**
```
src/
├── routes/        # API route handlers
├── lib/           # Database clients, utilities
├── middleware/    # Express middleware
└── server.ts      # Server configuration
```

### 🎯 Best Practices

- **🔒 TypeScript** - Strict typing for all code
- **📝 ESLint** - Code quality and consistency
- **🧪 Testing** - Unit tests for critical functions
- **📚 Documentation** - JSDoc comments for APIs
- **🔄 Git Flow** - Feature branches and PR reviews
- **🚀 CI/CD** - Automated testing and deployment

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **🍴 Fork** the repository
2. **🌿 Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **💻 Make** your changes with proper TypeScript types
4. **✅ Test** your changes thoroughly
5. **📝 Update** documentation if needed
6. **🔄 Commit** with clear messages: `git commit -m 'Add amazing feature'`
7. **📤 Push** to your branch: `git push origin feature/amazing-feature`
8. **🔀 Open** a Pull Request

### 📋 Contribution Guidelines

- Follow existing code style and TypeScript conventions
- Add tests for new features
- Update documentation for API changes
- Ensure responsive design for all components
- Test across different browsers and devices

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support & Contact

### 🆘 Getting Help

- **📧 Email:** info@maconsulting.com
- **🐛 Issues:** [GitHub Issues](https://github.com/jonnahjr/MA-Consulting-Website/issues)
- **💬 Discussions:** [GitHub Discussions](https://github.com/jonnahjr/MA-Consulting-Website/discussions)

### 📚 Resources

- **📖 Documentation:** This README and inline code comments
- **🎯 API Docs:** Auto-generated from TypeScript types
- **🗄️ Database Docs:** Prisma schema and migration files
- **🚀 Deployment Guide:** Vercel and Railway documentation

---

<div align="center">

**Built with ❤️ by MA Services Solution Team**

*Transforming businesses through innovative consulting solutions*

[![GitHub stars](https://img.shields.io/github/stars/jonnahjr/MA-Consulting-Website?style=social)](https://github.com/jonnahjr/MA-Consulting-Website)
[![GitHub forks](https://img.shields.io/github/forks/jonnahjr/MA-Consulting-Website?style=social)](https://github.com/jonnahjr/MA-Consulting-Website)

</div>






