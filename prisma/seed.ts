import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Clear existing data
  await prisma.blogPost.deleteMany()
  await prisma.testimonial.deleteMany()
  await prisma.teamMember.deleteMany()
  await prisma.service.deleteMany()
  await prisma.lead.deleteMany()
  await prisma.application.deleteMany()

  // Seed admin user
  await prisma.user.upsert({
    where: { email: 'admin@maservicessolution.com' },
    update: {
      name: 'Administrator',
      role: 'admin',
    },
    create: {
      name: 'Administrator',
      email: 'admin@maservicessolution.com',
      role: 'admin',
    },
  })

  // Seed services
  await prisma.service.createMany({
    data: [
      {
        title: 'Investment Consulting',
        description: 'Professional investment advice and portfolio management services tailored to your financial goals.',
        icon: 'investment',
        metrics: JSON.stringify({ projects: 150, satisfaction: '98%' }),
      },
      {
        title: 'Business Development',
        description: 'Strategic business growth and development solutions to expand your market presence.',
        icon: 'business',
        metrics: JSON.stringify({ clients: 200, growth: '45%' }),
      },
      {
        title: 'Marketing Strategies',
        description: 'Effective marketing campaigns and brand development to increase your visibility and engagement.',
        icon: 'marketing',
        metrics: JSON.stringify({ campaigns: 300, roi: '250%' }),
      },
      {
        title: 'Tax & Customs',
        description: 'Comprehensive tax planning, compliance, and customs regulations expertise.',
        icon: 'tax',
        metrics: JSON.stringify({ savings: '$2M', compliance: '100%' }),
      },
      {
        title: 'Development Works',
        description: 'Project development and implementation services for sustainable growth.',
        icon: 'development',
        metrics: JSON.stringify({ projects: 80, success: '95%' }),
      },
      {
        title: 'Dedicated Support',
        description: 'Ongoing support and maintenance services to ensure your operations run smoothly.',
        icon: 'support',
        metrics: JSON.stringify({ uptime: '99.9%', response: '<2hrs' }),
      },
    ],
  })

  // Seed team
  await prisma.teamMember.createMany({
    data: [
      {
        name: 'Alebachew Sitotaw Yimer',
        role: 'CEO',
        bio: 'Experienced CEO with over 15 years in consulting, leading Ma Services Solution to deliver exceptional value to clients worldwide.',
        image: '/src/assets/images/team/Ale-360x280-modified.png',
        socials: JSON.stringify({ linkedin: 'https://linkedin.com/in/alebachew', twitter: '@alebachew' }),
      },
      {
        name: 'Melsew Hailemariam Yassin',
        role: 'Deputy CEO',
        bio: 'Deputy CEO focused on operational excellence and strategic partnerships, ensuring seamless client experiences.',
        image: '/src/assets/images/team/Mele1-360x280-photoaidcom-cropped.jpg',
        socials: JSON.stringify({ linkedin: 'https://linkedin.com/in/melsew' }),
      },
      {
        name: 'Tiruwork Tizazu Liyew',
        role: 'Head of Business Development',
        bio: 'Leading business development initiatives and fostering long-term client relationships through innovative solutions.',
        image: '/src/assets/images/team/Tiru-360x280-photoaidcom-cropped.jpg',
        socials: JSON.stringify({ linkedin: 'https://linkedin.com/in/tiruwork' }),
      },
    ],
  })

  // Seed testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        clientName: 'John Smith',
        feedback: 'Ma Services Solution transformed our business operations. Their expertise in investment consulting helped us achieve 40% growth in just one year.',
        videoUrl: null,
      },
      {
        clientName: 'Sarah Johnson',
        feedback: 'Outstanding service and dedication. The team went above and beyond to ensure our tax compliance needs were met perfectly.',
        videoUrl: null,
      },
      {
        clientName: 'Michael Brown',
        feedback: 'Professional, reliable, and results-driven. Ma Services Solution is our go-to partner for all business development needs.',
        videoUrl: null,
      },
    ],
  })

  // Seed blog posts (scraped from original website)
  await prisma.blogPost.createMany({
    data: [
      {
        title: 'Alebachew Sitotaw Yimer',
        slug: 'alebachew-sitotaw-yimer',
        content: 'CEO/Founder\nMa Services Solution PLC',
        tags: 'team,leadership,ceo',
        publishedAt: new Date('2024-01-15'),
      },
      {
        title: 'Melsew Hailemariam Yassin',
        slug: 'melsew-hailemariam-yassin',
        content: 'D/CEO and Founder\nMa Services Solution PLC',
        tags: 'team,leadership,deputy-ceo',
        publishedAt: new Date('2024-01-20'),
      },
      {
        title: 'Tiruwork Tizazu Liyew',
        slug: 'tiruwork-tizazu-liyew',
        content: 'Head, Business Development\nMa Services Solution PLC',
        tags: 'team,business-development,leadership',
        publishedAt: new Date('2024-01-25'),
      },
      {
        title: 'Dedicated Support',
        slug: 'dedicated-support',
        content: 'Our team is dedicated to providing you with the best possible experience. We offer a wide range of services, including software development, web design, and digital marketing. We work closely with our clients to understand their needs and provide them with tailored solutions that meet their unique requirements.',
        tags: 'services,support,client-service',
        publishedAt: new Date('2024-02-01'),
      },
      {
        title: 'Development Works and Other services',
        slug: 'development-works-and-other-services',
        content: 'Are you looking for a reliable partner to help you with your development works and other services? Look no further than our company! We are a team of experts who are passionate about delivering high-quality services to our clients. Our development works include software development, web development, mobile app development, and more.',
        tags: 'services,development,software',
        publishedAt: new Date('2024-02-05'),
      },
      {
        title: 'Tax and Customs Consultancy',
        slug: 'tax-and-customs-consultancy',
        content: 'The Ethiopian tax and finance system may be described as frequently changing, updating and a loose agglomeration of proclamations, regulations, directives and rules. Ministry of Revenue (MoR) proclamations, regulations, directives and rules are sensitive and bounded by penalties. Our tax and customs consultancy services help businesses navigate these complex regulations and ensure compliance.',
        tags: 'services,tax,customs,compliance',
        publishedAt: new Date('2024-02-10'),
      },
      {
        title: 'Marketing Consultancy',
        slug: 'marketing-consultancy',
        content: 'Marketing isn\'t simply an important part of business success – it is the business. Everything else in the business depends upon marketing. To create an effective business strategy and ensure you\'re not wasting time or money and maximizing your sales, you need professional marketing consultancy services.',
        tags: 'services,marketing,strategy',
        publishedAt: new Date('2024-02-15'),
      },
      {
        title: 'Business Consultancy',
        slug: 'business-consultancy',
        content: 'We offer strategic business consulting services to help businesses optimize operations, improve performance, and maximize profitability. Are you on the way to own a successful and profitable business and feeling it is not clear how to get there? Ma will guide you through every step of the process.',
        tags: 'services,business,consulting,strategy',
        publishedAt: new Date('2024-02-20'),
      },
      {
        title: 'Investment Consultancy',
        slug: 'investment-consultancy',
        content: 'Are you looking to invest your hard-earned money but don\'t know where to start? Look no further than Ma Services Solutions. Our investment consultancy team of experts has years of experience in the industry and can help you make informed investment decisions that align with your financial goals.',
        tags: 'services,investment,finance',
        publishedAt: new Date('2024-02-25'),
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
