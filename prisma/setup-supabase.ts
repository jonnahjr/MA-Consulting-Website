import { supabase } from '../apps/api/src/lib/supabase'

async function setupDatabase() {
  console.log('Setting up Supabase database...')
  console.log('')
  console.log('📋 MANUAL SETUP REQUIRED:')
  console.log('Please run the following SQL in your Supabase SQL Editor:')
  console.log('')
  console.log(`
-- Create custom types
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('user', 'editor', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Users table
CREATE TABLE IF NOT EXISTS "User" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role user_role DEFAULT 'user',
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services table
CREATE TABLE IF NOT EXISTS "Service" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT,
    metrics JSONB,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team Members table
CREATE TABLE IF NOT EXISTS "TeamMember" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    bio TEXT,
    image TEXT,
    socials JSONB,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS "Testimonial" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "clientName" TEXT NOT NULL,
    feedback TEXT NOT NULL,
    "videoUrl" TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog Posts table
CREATE TABLE IF NOT EXISTS "BlogPost" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    tags TEXT NOT NULL,
    "publishedAt" TIMESTAMP WITH TIME ZONE,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Applications table
CREATE TABLE IF NOT EXISTS "Application" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    "resumeUrl" TEXT,
    "jobId" TEXT,
    status TEXT DEFAULT 'pending',
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leads table
CREATE TABLE IF NOT EXISTS "Lead" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Service" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "TeamMember" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Testimonial" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "BlogPost" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Application" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Lead" ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all operations for now)
DROP POLICY IF EXISTS "Allow all operations on User" ON "User";
CREATE POLICY "Allow all operations on User" ON "User" FOR ALL USING (true);
DROP POLICY IF EXISTS "Allow all operations on Service" ON "Service";
CREATE POLICY "Allow all operations on Service" ON "Service" FOR ALL USING (true);
DROP POLICY IF EXISTS "Allow all operations on TeamMember" ON "TeamMember";
CREATE POLICY "Allow all operations on TeamMember" ON "TeamMember" FOR ALL USING (true);
DROP POLICY IF EXISTS "Allow all operations on Testimonial" ON "Testimonial";
CREATE POLICY "Allow all operations on Testimonial" ON "Testimonial" FOR ALL USING (true);
DROP POLICY IF EXISTS "Allow all operations on BlogPost" ON "BlogPost";
CREATE POLICY "Allow all operations on BlogPost" ON "BlogPost" FOR ALL USING (true);
DROP POLICY IF EXISTS "Allow all operations on Application" ON "Application";
CREATE POLICY "Allow all operations on Application" ON "Application" FOR ALL USING (true);
DROP POLICY IF EXISTS "Allow all operations on Lead" ON "Lead";
CREATE POLICY "Allow all operations on Lead" ON "Lead" FOR ALL USING (true);
  `)
  console.log('')
  console.log('After running the SQL above, run this command to seed data:')
  console.log('npm run db:seed')
  console.log('')
  console.log('Then test the API:')
  console.log('curl http://localhost:5000/api/blog')
}

async function seedData() {
  console.log('Seeding database...')

  try {
    // Seed admin user
    const { error: userError } = await supabase
      .from('User')
      .upsert({
        id: 'admin-user',
        name: 'Administrator',
        email: 'admin@maconsulting.com',
        role: 'admin'
      })

    if (userError) console.error('User seed error:', userError)

    // Seed services
    const { error: serviceError } = await supabase
      .from('Service')
      .upsert([
        {
          id: 'service-1',
          title: 'Investment Consulting',
          description: 'Strategic investment advice and portfolio management tailored to maximize returns while managing risk effectively.',
          icon: 'investment',
          metrics: { projects: 150, satisfaction: '98%' }
        },
        {
          id: 'service-2',
          title: 'Business Development',
          description: 'Accelerate growth with strategic business development solutions that expand market presence and competitive advantage.',
          icon: 'business',
          metrics: { clients: 200, growth: '45%' }
        },
        {
          id: 'service-3',
          title: 'Marketing Strategies',
          description: 'Effective marketing campaigns and brand development to increase your visibility and engagement.',
          icon: 'marketing',
          metrics: { campaigns: 300, roi: '250%' }
        },
        {
          id: 'service-4',
          title: 'Tax & Customs',
          description: 'Expert tax planning, compliance, and customs regulations to optimize financial efficiency and minimize liabilities.',
          icon: 'tax',
          metrics: { savings: '$2M', compliance: '100%' }
        },
        {
          id: 'service-5',
          title: 'Development Works',
          description: 'Project development and implementation services for sustainable growth.',
          icon: 'development',
          metrics: { projects: 80, success: '95%' }
        },
        {
          id: 'service-6',
          title: 'Dedicated Support',
          description: 'Ongoing support and maintenance services to ensure your operations run smoothly.',
          icon: 'support',
          metrics: { uptime: '99.9%', response: '<2hrs' }
        }
      ])

    if (serviceError) console.error('Service seed error:', serviceError)

    // Seed team members
    const { error: teamError } = await supabase
      .from('TeamMember')
      .upsert([
        {
          id: 'team-1',
          name: 'Alebachew Sitotaw Yimer',
          role: 'CEO & Founder',
          bio: 'Experienced CEO with over 15 years in consulting, leading Ma Services Solution to deliver exceptional value to clients worldwide.',
          image: '/team/Ale-360x280-modified.png',
          socials: { linkedin: 'https://linkedin.com/in/alebachew', twitter: '@alebachew' }
        },
        {
          id: 'team-2',
          name: 'Melsew Hailemariam Yassin',
          role: 'Deputy CEO & Founder',
          bio: 'Deputy CEO focused on operational excellence and strategic partnerships, ensuring seamless client experiences.',
          image: '/team/Mele1-360x280-photoaidcom-cropped.jpg',
          socials: { linkedin: 'https://linkedin.com/in/melsew' }
        },
        {
          id: 'team-3',
          name: 'Tiruwork Tizazu Liyew',
          role: 'Head of Business Development',
          bio: 'Leading business development initiatives and fostering long-term client relationships through innovative solutions.',
          image: '/team/Tiru-360x280-photoaidcom-cropped.jpg',
          socials: { linkedin: 'https://linkedin.com/in/tiruwork' }
        }
      ])

    if (teamError) console.error('Team seed error:', teamError)

    // Seed testimonials
    const { error: testimonialError } = await supabase
      .from('Testimonial')
      .upsert([
        {
          id: 'testimonial-1',
          clientName: 'John Smith',
          feedback: 'Ma Services Solution transformed our business operations. Their expertise in investment consulting helped us achieve 40% growth in just one year.',
          videoUrl: null
        },
        {
          id: 'testimonial-2',
          clientName: 'Sarah Johnson',
          feedback: 'Outstanding service and dedication. The team went above and beyond to ensure our tax compliance needs were met perfectly.',
          videoUrl: null
        },
        {
          id: 'testimonial-3',
          clientName: 'Michael Brown',
          feedback: 'Professional, reliable, and results-driven. Ma Services Solution is our go-to partner for all business development needs.',
          videoUrl: null
        }
      ])

    if (testimonialError) console.error('Testimonial seed error:', testimonialError)

    // Seed blog posts
    const { error: blogError } = await supabase
      .from('BlogPost')
      .upsert([
        {
          id: 'blog-1',
          title: 'Alebachew Sitotaw Yimer',
          slug: 'alebachew-sitotaw-yimer',
          content: 'CEO/Founder\nMa Services Solution PLC',
          tags: 'team,leadership,ceo',
          publishedAt: new Date('2024-01-15').toISOString()
        },
        {
          id: 'blog-2',
          title: 'Melsew Hailemariam Yassin',
          slug: 'melsew-hailemariam-yassin',
          content: 'D/CEO and Founder\nMa Services Solution PLC',
          tags: 'team,leadership,deputy-ceo',
          publishedAt: new Date('2024-01-20').toISOString()
        },
        {
          id: 'blog-3',
          title: 'Tiruwork Tizazu Liyew',
          slug: 'tiruwork-tizazu-liyew',
          content: 'Head, Business Development\nMa Services Solution PLC',
          tags: 'team,business-development,leadership',
          publishedAt: new Date('2024-01-25').toISOString()
        },
        {
          id: 'blog-4',
          title: 'Dedicated Support',
          slug: 'dedicated-support',
          content: 'Our team is dedicated to providing you with the best possible experience. We offer a wide range of services, including software development, web design, and digital marketing. We work closely with our clients to understand their needs and provide them with tailored solutions that meet their unique requirements.',
          tags: 'services,support,client-service',
          publishedAt: new Date('2024-02-01').toISOString()
        },
        {
          id: 'blog-5',
          title: 'Development Works and Other services',
          slug: 'development-works-and-other-services',
          content: 'Are you looking for a reliable partner to help you with your development works and other services? Look no further than our company! We are a team of experts who are passionate about delivering high-quality services to our clients. Our development works include software development, web development, mobile app development, and more.',
          tags: 'services,development,software',
          publishedAt: new Date('2024-02-05').toISOString()
        },
        {
          id: 'blog-6',
          title: 'Tax and Customs Consultancy',
          slug: 'tax-and-customs-consultancy',
          content: 'The Ethiopian tax and finance system may be described as frequently changing, updating and a loose agglomeration of proclamations, regulations, directives and rules. Ministry of Revenue (MoR) proclamations, regulations, directives and rules are sensitive and bounded by penalties. Our tax and customs consultancy services help businesses navigate these complex regulations and ensure compliance.',
          tags: 'services,tax,customs,compliance',
          publishedAt: new Date('2024-02-10').toISOString()
        },
        {
          id: 'blog-7',
          title: 'Marketing Consultancy',
          slug: 'marketing-consultancy',
          content: 'Marketing isn\'t simply an important part of business success – it is the business. Everything else in the business depends upon marketing. To create an effective business strategy and ensure you\'re not wasting time or money and maximizing your sales, you need professional marketing consultancy services.',
          tags: 'services,marketing,strategy',
          publishedAt: new Date('2024-02-15').toISOString()
        },
        {
          id: 'blog-8',
          title: 'Business Consultancy',
          slug: 'business-consultancy',
          content: 'We offer strategic business consulting services to help businesses optimize operations, improve performance, and maximize profitability. Are you on the way to own a successful and profitable business and feeling it is not clear how to get there? Ma will guide you through every step of the process.',
          tags: 'services,business,consulting,strategy',
          publishedAt: new Date('2024-02-20').toISOString()
        },
        {
          id: 'blog-9',
          title: 'Investment Consultancy',
          slug: 'investment-consultancy',
          content: 'Are you looking to invest your hard-earned money but don\'t know where to start? Look no further than Ma Services Solutions. Our investment consultancy team of experts has years of experience in the industry and can help you make informed investment decisions that align with your financial goals.',
          tags: 'services,investment,finance',
          publishedAt: new Date('2024-02-25').toISOString()
        }
      ])

    if (blogError) console.error('Blog seed error:', blogError)

    console.log('Database seeded successfully!')

  } catch (error) {
    console.error('Seeding error:', error)
  }
}

setupDatabase().catch(console.error)