-- Supabase Migration for MA Consulting Website
-- Run this SQL in your Supabase SQL Editor

-- Drop existing tables if they exist (to avoid conflicts)
DROP TABLE IF EXISTS "ContactInfo" CASCADE;
DROP TABLE IF EXISTS "Lead" CASCADE;
DROP TABLE IF EXISTS "Application" CASCADE;
DROP TABLE IF EXISTS "Job" CASCADE;
DROP TABLE IF EXISTS "BlogPost" CASCADE;
DROP TABLE IF EXISTS "Testimonial" CASCADE;
DROP TABLE IF EXISTS "TeamMember" CASCADE;
DROP TABLE IF EXISTS "Service" CASCADE;
DROP TABLE IF EXISTS "User" CASCADE;

-- Drop existing types if they exist
DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS job_type CASCADE;

-- Create custom types
CREATE TYPE user_role AS ENUM ('user', 'editor', 'admin');
CREATE TYPE job_type AS ENUM ('full-time', 'part-time', 'contract', 'internship');

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

-- Jobs table
CREATE TABLE IF NOT EXISTS "Job" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    location TEXT NOT NULL,
    type job_type DEFAULT 'full-time',
    description TEXT NOT NULL,
    requirements TEXT NOT NULL,
    responsibilities TEXT NOT NULL,
    salary TEXT,
    benefits TEXT,
    "applicationDeadline" DATE,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Applications table
CREATE TABLE IF NOT EXISTS "Application" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "fullName" TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    position TEXT NOT NULL,
    department TEXT NOT NULL,
    experience TEXT,
    education TEXT,
    skills TEXT,
    "coverLetter" TEXT,
    "resumeUrl" TEXT,
    "educationDocumentsUrl" TEXT,
    "certificationsUrl" TEXT,
    "portfolioUrl" TEXT,
    availability TEXT,
    salary TEXT,
    status TEXT DEFAULT 'pending',
    "applicationId" TEXT UNIQUE,
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

-- Contact Info table
CREATE TABLE IF NOT EXISTS "ContactInfo" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    type TEXT NOT NULL,
    label TEXT NOT NULL,
    value TEXT NOT NULL,
    platform TEXT,
    icon TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "sortOrder" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Service" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "TeamMember" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Testimonial" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "BlogPost" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Job" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Application" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Lead" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ContactInfo" ENABLE ROW LEVEL SECURITY;

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
DROP POLICY IF EXISTS "Allow all operations on Job" ON "Job";
CREATE POLICY "Allow all operations on Job" ON "Job" FOR ALL USING (true);
DROP POLICY IF EXISTS "Allow all operations on Application" ON "Application";
CREATE POLICY "Allow all operations on Application" ON "Application" FOR ALL USING (true);
DROP POLICY IF EXISTS "Allow all operations on Lead" ON "Lead";
CREATE POLICY "Allow all operations on Lead" ON "Lead" FOR ALL USING (true);
DROP POLICY IF EXISTS "Allow all operations on ContactInfo" ON "ContactInfo";
CREATE POLICY "Allow all operations on ContactInfo" ON "ContactInfo" FOR ALL USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_job_is_active ON "Job"("isActive");
CREATE INDEX IF NOT EXISTS idx_job_type ON "Job"(type);
CREATE INDEX IF NOT EXISTS idx_application_status ON "Application"(status);
CREATE INDEX IF NOT EXISTS idx_application_position ON "Application"(position);
CREATE INDEX IF NOT EXISTS idx_contact_info_type ON "ContactInfo"(type);
CREATE INDEX IF NOT EXISTS idx_contact_info_is_active ON "ContactInfo"("isActive");
CREATE INDEX IF NOT EXISTS idx_contact_info_sort_order ON "ContactInfo"("sortOrder");
CREATE INDEX IF NOT EXISTS idx_blog_post_slug ON "BlogPost"(slug);

-- Insert comprehensive initial contact information
INSERT INTO "ContactInfo" ("type", "label", "value", "platform", "icon", "isActive", "sortOrder") VALUES
-- Social Media Platforms
('social', 'LinkedIn Company Page', 'https://linkedin.com/company/ma-consulting-ethiopia', 'linkedin', 'linkedin', true, 1),
('social', 'Twitter Official', 'https://twitter.com/MAConsultingET', 'twitter', 'twitter', true, 2),
('social', 'Facebook Business Page', 'https://facebook.com/MAConsultingEthiopia', 'facebook', 'facebook', true, 3),
('social', 'Instagram Business', 'https://instagram.com/ma_consulting_et', 'instagram', 'instagram', true, 4),
('social', 'TikTok Business', 'https://tiktok.com/@ma_consulting_et', 'tiktok', 'tiktok', true, 5),
('social', 'Telegram Channel', 'https://t.me/ma_consulting_et', 'telegram', 'telegram', true, 6),
('social', 'YouTube Channel', 'https://youtube.com/@MAConsultingEthiopia', 'youtube', 'youtube', true, 7),
('social', 'WhatsApp Business', 'https://wa.me/251912058982', 'whatsapp', 'whatsapp', true, 8),

-- Website URLs
('website', 'Official Website', 'https://www.maservicessolution.com', NULL, 'globe', true, 1),
('website', 'Blog Website', 'https://blog.maservicessolution.com', NULL, 'blog', true, 2),
('website', 'Careers Portal', 'https://careers.maservicessolution.com', NULL, 'briefcase', true, 3),

-- Phone Numbers (Multiple for different purposes)
('phone', 'Primary Business Line', '(+251) 912 058 982', NULL, 'phone', true, 1),
('phone', 'Secondary Business Line', '(+251) 704 673 350', NULL, 'phone', true, 2),
('phone', 'Main Office', '+251 911 123 456', NULL, 'phone', true, 3),
('phone', 'Business Development', '+251 922 654 321', NULL, 'phone', true, 4),
('phone', 'Customer Support Hotline', '(+251) 911 123 456', NULL, 'headphones', true, 5),
('phone', 'Emergency Contact', '(+251) 922 987 654', NULL, 'exclamation-triangle', true, 6),
('phone', 'International Inquiries', '+1 (555) 123-4567', NULL, 'globe', true, 7),

-- Email Addresses (Multiple departments)
('email', 'General Information', 'info@maservicessolution.com', NULL, 'envelope', true, 1),
('email', 'General Inquiries', 'info@maconsulting.com', NULL, 'envelope', true, 2),
('email', 'Business Inquiries', 'business@maservicessolution.com', NULL, 'briefcase', true, 3),
('email', 'Customer Support', 'support@maservicessolution.com', NULL, 'headphones', true, 4),
('email', 'Partnerships', 'partnerships@maservicessolution.com', NULL, 'handshake', true, 5),
('email', 'Careers & HR', 'careers@maservicessolution.com', NULL, 'user-plus', true, 6),
('email', 'Media & Press', 'media@maservicessolution.com', NULL, 'newspaper', true, 7),
('email', 'Technical Support', 'tech@maservicessolution.com', NULL, 'cogs', true, 8),
('email', 'Legal Department', 'legal@maservices.com', NULL, 'gavel', true, 9),
('email', 'Privacy & Compliance', 'privacy@maservices.com', NULL, 'shield-alt', true, 10),
('email', 'Accessibility Support', 'accessibility@maservices.com', NULL, 'universal-access', true, 11),
('email', 'Secondary Contact', 'maservicessolution24@gmail.com', NULL, 'envelope', true, 12),

-- Office Addresses (Multiple locations)
('address', 'Main Headquarters', 'Hayahulet, Equatorial Guinea Street\nAddis Ababa, Ethiopia\nP.O. Box: 7782/1000', NULL, 'building', true, 1),
('address', 'Branch Office - Bole', 'Bole Medhanealem, Africa Avenue\nAddis Ababa, Ethiopia\nP.O. Box: 1234/5678', NULL, 'building', true, 2),
('address', 'Regional Office - Hawassa', 'Hawassa Industrial Park\nHawassa, Sidama Region\nEthiopia', NULL, 'building', true, 3),
('address', 'International Office', '123 Business District\nLondon, UK\nEC1A 1BB', NULL, 'globe', true, 4),

-- Additional Contact Methods
('phone', 'Fax Number', '(+251) 11 123 4567', NULL, 'fax', true, 8),
('phone', 'Toll-Free Number', '0800-123-456', NULL, 'phone', true, 9),

-- Professional Networks
('social', 'Xing Professional Network', 'https://xing.com/company/ma-consulting-ethiopia', 'xing', 'xing', true, 9),
('social', 'ResearchGate', 'https://researchgate.net/institution/ma-consulting-ethiopia', 'researchgate', 'research', true, 10),

-- Industry Platforms
('social', 'Crunchbase Profile', 'https://crunchbase.com/organization/ma-consulting-ethiopia', 'crunchbase', 'database', true, 11),
('social', 'AngelList Profile', 'https://angel.co/company/ma-consulting-ethiopia', 'angellist', 'users', true, 12),

-- Communication Platforms
('social', 'Discord Community', 'https://discord.gg/ma-consulting-et', 'discord', 'discord', true, 13),
('social', 'Slack Workspace', 'https://ma-consulting-et.slack.com', 'slack', 'slack', true, 14),

-- Additional Websites
('website', 'Client Portal', 'https://portal.maservicessolution.com', NULL, 'user-shield', true, 4),
('website', 'Knowledge Base', 'https://help.maservicessolution.com', NULL, 'book', true, 5),
('website', 'API Documentation', 'https://api.maservicessolution.com', NULL, 'code', true, 6),

-- Emergency Contacts
('phone', '24/7 Emergency Line', '(+251) 933 000 000', NULL, 'ambulance', true, 10),
('email', 'Emergency Contact Email', 'emergency@maservicessolution.com', NULL, 'exclamation-triangle', true, 13)

ON CONFLICT DO NOTHING;

-- Create trigger to update updatedAt timestamp for ContactInfo
CREATE OR REPLACE FUNCTION update_contact_info_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contact_info_updated_at
    BEFORE UPDATE ON "ContactInfo"
    FOR EACH ROW
    EXECUTE FUNCTION update_contact_info_updated_at_column();