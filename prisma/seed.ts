import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding MySQL database...')

  try {
    // Clear existing data first
    console.log('Clearing existing data...')

    // Delete in reverse order to avoid foreign key constraints
    await prisma.blogPost.deleteMany()
    await prisma.testimonial.deleteMany()
    await prisma.teamMember.deleteMany()
    await prisma.service.deleteMany()
    await prisma.user.deleteMany()
    await prisma.application.deleteMany()
    await prisma.lead.deleteMany()
    await prisma.contactInfo.deleteMany()

    console.log('Seeding new data...')

    // Seed admin user
    try {
      await prisma.user.upsert({
        where: { id: 'admin-user' },
        update: {},
        create: {
          id: 'admin-user',
          name: 'Administrator',
          email: 'jonasjjonas14@gmail.com',
          role: 'admin'
        }
      })
      console.log('✓ Admin user created')
    } catch (error) {
      console.error('User seed error:', error)
    }

    // Seed services
    try {
      await prisma.service.createMany({
        data: [
          {
            id: 'service-1',
            title: 'Investment Consulting',
            description: 'Professional investment advice and portfolio management services tailored to your financial goals.',
            icon: 'investment',
            metrics: { projects: 150, satisfaction: '98%' }
          },
          {
            id: 'service-2',
            title: 'Business Development',
            description: 'Strategic business growth and development solutions to expand your market presence.',
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
            description: 'Comprehensive tax planning, compliance, and customs regulations expertise.',
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
        ]
      })
      console.log('✓ Services seeded')
    } catch (error) {
      console.error('Service seed error:', error)
    }

    // Seed team members
    try {
      await prisma.teamMember.createMany({
        data: [
          {
            id: 'team-1',
            name: 'Alebachew Sitotaw Yimer',
            role: 'CEO',
            bio: 'Experienced CEO with over 15 years in consulting, leading Ma Services Solution to deliver exceptional value to clients worldwide.',
            image: '/team/Ale-360x280-modified.png',
            socials: { linkedin: 'https://linkedin.com/in/alebachew', twitter: '@alebachew' }
          },
          {
            id: 'team-2',
            name: 'Melsew Hailemariam Yassin',
            role: 'Deputy CEO',
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
        ]
      })
      console.log('✓ Team members seeded')
    } catch (error) {
      console.error('Team seed error:', error)
    }

    // Seed testimonials
    try {
      await prisma.testimonial.createMany({
        data: [
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
          },
          {
            id: 'testimonial-4',
            clientName: 'Ethio Manufacturing PLC',
            feedback: 'As a leading manufacturing company in Ethiopia, we partnered with Ma Services Solution for our business expansion. Their strategic consulting helped us optimize our operations and increase production efficiency by 35%. Their deep understanding of the Ethiopian market was invaluable.',
            videoUrl: null
          },
          {
            id: 'testimonial-5',
            clientName: 'Addis Ababa Bank',
            feedback: 'Ma Services Solution provided exceptional investment consulting services that helped us diversify our portfolio and achieve sustainable growth. Their expertise in financial markets and risk management is unmatched.',
            videoUrl: null
          },
          {
            id: 'testimonial-6',
            clientName: 'Green Valley Agriculture',
            feedback: 'The tax and customs consultancy from Ma Services Solution saved us significant costs and ensured full compliance with Ethiopian regulations. Their team is professional, knowledgeable, and always available when needed.',
            videoUrl: null
          },
          {
            id: 'testimonial-7',
            clientName: 'TechHub Ethiopia',
            feedback: 'Working with Ma Services Solution on our business development strategy was transformative. They helped us secure partnerships and expand our market reach. Their marketing consultancy drove our brand awareness significantly.',
            videoUrl: null
          },
          {
            id: 'testimonial-8',
            clientName: 'Ethio Construction Group',
            feedback: 'Ma Services Solution\'s development works consultancy helped us streamline our project management processes. Their expertise in operational efficiency led to a 25% reduction in project timelines and improved profitability.',
            videoUrl: null
          },
          {
            id: 'testimonial-9',
            clientName: 'Lion Insurance Company',
            feedback: 'The dedicated support and ongoing consultancy from Ma Services Solution has been crucial for our continued success. Their team provides reliable guidance and helps us navigate complex business challenges.',
            videoUrl: null
          }
        ]
      })
      console.log('✓ Testimonials seeded')
    } catch (error) {
      console.error('Testimonial seed error:', error)
    }

    // Seed blog posts (scraped from original website)
    try {
      await prisma.blogPost.createMany({
        data: [
          {
            id: 'blog-1',
            title: 'Alebachew Sitotaw Yimer',
            slug: 'alebachew-sitotaw-yimer',
            content: 'CEO/Founder\nMa Services Solution PLC',
            tags: 'team,leadership,ceo',
            publishedAt: new Date('2024-01-15')
          },
          {
            id: 'blog-2',
            title: 'Melsew Hailemariam Yassin',
            slug: 'melsew-hailemariam-yassin',
            content: 'D/CEO and Founder\nMa Services Solution PLC',
            tags: 'team,leadership,deputy-ceo',
            publishedAt: new Date('2024-01-20')
          },
          {
            id: 'blog-3',
            title: 'Tiruwork Tizazu Liyew',
            slug: 'tiruwork-tizazu-liyew',
            content: 'Head, Business Development\nMa Services Solution PLC',
            tags: 'team,business-development,leadership',
            publishedAt: new Date('2024-01-25')
          },
          {
            id: 'blog-4',
            title: 'Dedicated Support',
            slug: 'dedicated-support',
            content: 'Our team is dedicated to providing you with the best possible experience. We offer a wide range of services, including software development, web design, and digital marketing. We work closely with our clients to understand their needs and provide them with tailored solutions that meet their unique requirements.',
            tags: 'services,support,client-service',
            publishedAt: new Date('2024-02-01')
          },
          {
            id: 'blog-5',
            title: 'Development Works and Other services',
            slug: 'development-works-and-other-services',
            content: 'Are you looking for a reliable partner to help you with your development works and other services? Look no further than our company! We are a team of experts who are passionate about delivering high-quality services to our clients. Our development works include software development, web development, mobile app development, and more.',
            tags: 'services,development,software',
            publishedAt: new Date('2024-02-05')
          },
          {
            id: 'blog-6',
            title: 'Tax and Customs Consultancy',
            slug: 'tax-and-customs-consultancy',
            content: 'The Ethiopian tax and finance system may be described as frequently changing, updating and a loose agglomeration of proclamations, regulations, directives and rules. Ministry of Revenue (MoR) proclamations, regulations, directives and rules are sensitive and bounded by penalties. Our tax and customs consultancy services help businesses navigate these complex regulations and ensure compliance.',
            tags: 'services,tax,customs,compliance',
            publishedAt: new Date('2024-02-10')
          },
          {
            id: 'blog-7',
            title: 'Marketing Consultancy',
            slug: 'marketing-consultancy',
            content: 'Marketing isn\'t simply an important part of business success – it is the business. Everything else in the business depends upon marketing. To create an effective business strategy and ensure you\'re not wasting time or money and maximizing your sales, you need professional marketing consultancy services.',
            tags: 'services,marketing,strategy',
            publishedAt: new Date('2024-02-15')
          },
          {
            id: 'blog-8',
            title: 'Business Consultancy',
            slug: 'business-consultancy',
            content: 'We offer strategic business consulting services to help businesses optimize operations, improve performance, and maximize profitability. Are you on the way to own a successful and profitable business and feeling it is not clear how to get there? Ma will guide you through every step of the process.',
            tags: 'services,business,consulting,strategy',
            publishedAt: new Date('2024-02-20')
          },
          {
            id: 'blog-9',
            title: 'Investment Consultancy',
            slug: 'investment-consultancy',
            content: 'Are you looking to invest your hard-earned money but don\'t know where to start? Look no further than Ma Services Solutions. Our investment consultancy team of experts has years of experience in the industry and can help you make informed investment decisions that align with your financial goals.',
            tags: 'services,investment,finance',
            publishedAt: new Date('2024-02-25')
          }
        ]
      })
      console.log('✓ Blog posts seeded')
    } catch (error) {
      console.error('Blog seed error:', error)
    }

    // Seed contact information
    try {
      await prisma.contactInfo.createMany({
        data: [
          // Social Media
          {
            id: 'social-linkedin',
            type: 'social',
            label: 'LinkedIn',
            value: 'https://linkedin.com/company/ma-consulting-ethiopia',
            platform: 'linkedin',
            icon: 'linkedin',
            isActive: true,
            sortOrder: 1
          },
          {
            id: 'social-twitter',
            type: 'social',
            label: 'Twitter',
            value: 'https://twitter.com/MAConsultingET',
            platform: 'twitter',
            icon: 'twitter',
            isActive: true,
            sortOrder: 2
          },
          {
            id: 'social-facebook',
            type: 'social',
            label: 'Facebook',
            value: 'https://facebook.com/MAConsultingEthiopia',
            platform: 'facebook',
            icon: 'facebook',
            isActive: true,
            sortOrder: 3
          },
          {
            id: 'social-instagram',
            type: 'social',
            label: 'Instagram',
            value: 'https://instagram.com/ma_consulting_et',
            platform: 'instagram',
            icon: 'instagram',
            isActive: true,
            sortOrder: 4
          },
          {
            id: 'social-tiktok',
            type: 'social',
            label: 'TikTok',
            value: 'https://tiktok.com/@ma_consulting_et',
            platform: 'tiktok',
            icon: 'tiktok',
            isActive: true,
            sortOrder: 5
          },
          {
            id: 'social-telegram',
            type: 'social',
            label: 'Telegram',
            value: 'https://t.me/ma_consulting_et',
            platform: 'telegram',
            icon: 'telegram',
            isActive: true,
            sortOrder: 6
          },
          // Website
          {
            id: 'website-main',
            type: 'website',
            label: 'Official Website',
            value: 'https://www.maservicessolution.com',
            isActive: true,
            sortOrder: 1
          },
          // Phone Numbers
          {
            id: 'phone-primary',
            type: 'phone',
            label: 'Primary Phone',
            value: '(+251) 912 058 982',
            isActive: true,
            sortOrder: 1
          },
          {
            id: 'phone-secondary',
            type: 'phone',
            label: 'Secondary Phone',
            value: '(+251) 704 673 350',
            isActive: true,
            sortOrder: 2
          },
          // Email Addresses
          {
            id: 'email-primary',
            type: 'email',
            label: 'Primary Email',
            value: 'info@maservicessolution.com',
            isActive: true,
            sortOrder: 1
          },
          {
            id: 'email-secondary',
            type: 'email',
            label: 'Secondary Email',
            value: 'maservicessolution24@gmail.com',
            isActive: true,
            sortOrder: 2
          },
          // Address
          {
            id: 'address-main',
            type: 'address',
            label: 'Main Office',
            value: 'Hayahulet, Equatorial Guinea Street\nAddis Ababa, Ethiopia\nP.O. Box: 7782/1000',
            isActive: true,
            sortOrder: 1
          }
        ]
      })
      console.log('✓ Contact information seeded')
    } catch (error) {
      console.error('Contact info seed error:', error)
    }

    console.log('🎉 MySQL database seeded successfully!')

  } catch (error) {
    console.error('Seeding error:', error)
    process.exit(1)
  }
}

main()
