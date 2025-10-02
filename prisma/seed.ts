import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Seed services
  await prisma.service.createMany({
    data: [
      {
        title: 'Investment Consulting',
        description: 'Professional investment advice and portfolio management services tailored to your financial goals.',
        icon: 'investment',
        metrics: { projects: 150, satisfaction: '98%' },
      },
      {
        title: 'Business Development',
        description: 'Strategic business growth and development solutions to expand your market presence.',
        icon: 'business',
        metrics: { clients: 200, growth: '45%' },
      },
      {
        title: 'Marketing Strategies',
        description: 'Effective marketing campaigns and brand development to increase your visibility and engagement.',
        icon: 'marketing',
        metrics: { campaigns: 300, roi: '250%' },
      },
      {
        title: 'Tax & Customs',
        description: 'Comprehensive tax planning, compliance, and customs regulations expertise.',
        icon: 'tax',
        metrics: { savings: '$2M', compliance: '100%' },
      },
      {
        title: 'Development Works',
        description: 'Project development and implementation services for sustainable growth.',
        icon: 'development',
        metrics: { projects: 80, success: '95%' },
      },
      {
        title: 'Dedicated Support',
        description: 'Ongoing support and maintenance services to ensure your operations run smoothly.',
        icon: 'support',
        metrics: { uptime: '99.9%', response: '<2hrs' },
      },
    ],
  })

  // Seed team
  await prisma.teamMember.createMany({
    data: [
      {
        name: 'Alebachew Sitotaw Yimer',
        role: 'CEO',
        bio: 'Experienced CEO with over 15 years in consulting, leading MA Consulting to deliver exceptional value to clients worldwide.',
        image: '/team/alebachew.jpg',
        socials: { linkedin: 'https://linkedin.com/in/alebachew', twitter: '@alebachew' },
      },
      {
        name: 'Melsew Hailemariam Yassin',
        role: 'Deputy CEO',
        bio: 'Deputy CEO focused on operational excellence and strategic partnerships, ensuring seamless client experiences.',
        image: '/team/melsew.jpg',
        socials: { linkedin: 'https://linkedin.com/in/melsew' },
      },
      {
        name: 'Tiruwork Tizazu Liyew',
        role: 'Head of Business Development',
        bio: 'Leading business development initiatives and fostering long-term client relationships through innovative solutions.',
        image: '/team/tiruwork.jpg',
        socials: { linkedin: 'https://linkedin.com/in/tiruwork' },
      },
    ],
  })

  // Seed testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        clientName: 'John Smith',
        feedback: 'MA Consulting transformed our business operations. Their expertise in investment consulting helped us achieve 40% growth in just one year.',
        videoUrl: null,
      },
      {
        clientName: 'Sarah Johnson',
        feedback: 'Outstanding service and dedication. The team went above and beyond to ensure our tax compliance needs were met perfectly.',
        videoUrl: null,
      },
      {
        clientName: 'Michael Brown',
        feedback: 'Professional, reliable, and results-driven. MA Consulting is our go-to partner for all business development needs.',
        videoUrl: null,
      },
    ],
  })

  // Seed blog posts
  await prisma.blogPost.createMany({
    data: [
      {
        title: 'The Future of Investment Consulting in 2024',
        slug: 'future-investment-consulting-2024',
        content: 'Exploring emerging trends and technologies shaping the investment consulting landscape...',
        tags: ['investment', 'consulting', 'trends'],
        publishedAt: new Date('2024-01-15'),
      },
      {
        title: 'Tax Optimization Strategies for Businesses',
        slug: 'tax-optimization-strategies-businesses',
        content: 'Learn effective tax planning strategies to minimize liabilities and maximize savings...',
        tags: ['tax', 'business', 'optimization'],
        publishedAt: new Date('2024-02-01'),
      },
      {
        title: 'Building Sustainable Business Development Plans',
        slug: 'sustainable-business-development-plans',
        content: 'How to create long-term business development strategies that drive consistent growth...',
        tags: ['business', 'development', 'sustainability'],
        publishedAt: new Date('2024-02-15'),
      },
    ],
  })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })