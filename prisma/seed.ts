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
        image: '/team/alebachew.jpg',
        socials: JSON.stringify({ linkedin: 'https://linkedin.com/in/alebachew', twitter: '@alebachew' }),
      },
      {
        name: 'Melsew Hailemariam Yassin',
        role: 'Deputy CEO',
        bio: 'Deputy CEO focused on operational excellence and strategic partnerships, ensuring seamless client experiences.',
        image: '/team/melsew.jpg',
        socials: JSON.stringify({ linkedin: 'https://linkedin.com/in/melsew' }),
      },
      {
        name: 'Tiruwork Tizazu Liyew',
        role: 'Head of Business Development',
        bio: 'Leading business development initiatives and fostering long-term client relationships through innovative solutions.',
        image: '/team/tiruwork.jpg',
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

  // Seed blog posts
  await prisma.blogPost.createMany({
    data: [
      {
        title: 'The Future of Investment Consulting in 2024',
        slug: 'future-investment-consulting-2024',
        content: 'As we navigate through 2024, the investment consulting landscape is undergoing significant transformation driven by technological advancements, regulatory changes, and evolving market dynamics. At Ma Services Solution, we\'ve observed several key trends that are reshaping how investment professionals approach client relationships and portfolio management.\n\nDigital transformation continues to be a dominant force, with AI and machine learning algorithms becoming integral to investment analysis and risk assessment. Our team has successfully integrated these technologies to provide more accurate market predictions and personalized investment strategies.\n\nRegulatory compliance remains paramount, with increasing focus on ESG (Environmental, Social, and Governance) factors. We help our clients navigate these complex requirements while maximizing their investment potential.\n\nThe rise of sustainable investing represents another major shift. Investors are increasingly seeking opportunities that align with their values while delivering competitive returns. Our sustainable investment consulting services have helped numerous clients achieve both financial and impact goals.',
        tags: ['investment', 'consulting', 'trends', 'technology'].join(','),
        publishedAt: new Date('2024-01-15'),
      },
      {
        title: 'Tax Optimization Strategies for Businesses',
        slug: 'tax-optimization-strategies-businesses',
        content: 'In today\'s complex business environment, effective tax planning is not just about compliance—it\'s about strategic optimization that enhances your bottom line. Our tax consulting experts at Ma Services Solution have developed comprehensive strategies that help businesses minimize tax liabilities while maintaining full regulatory compliance.\n\nOne of our most successful approaches involves the strategic use of tax-advantaged investment vehicles and retirement planning. By carefully structuring investments and retirement contributions, businesses can significantly reduce their taxable income while building long-term wealth.\n\nInternational tax planning has become increasingly important for businesses with global operations. We specialize in navigating complex cross-border tax regulations, transfer pricing, and international tax treaties to ensure optimal tax efficiency.\n\nOur proactive tax planning approach includes regular reviews of tax laws and regulations, ensuring our clients always benefit from the latest tax-saving opportunities. This forward-thinking strategy has helped our clients save millions in tax liabilities over the years.',
        tags: ['tax', 'business', 'optimization', 'planning'].join(','),
        publishedAt: new Date('2024-02-01'),
      },
      {
        title: 'Building Sustainable Business Development Plans',
        slug: 'sustainable-business-development-plans',
        content: 'Sustainable business development is no longer optional—it\'s essential for long-term success in today\'s market. At Ma Services Solution, we help businesses create comprehensive development plans that balance growth objectives with environmental and social responsibility.\n\nOur approach begins with a thorough assessment of your current business model, market position, and growth potential. We then develop customized strategies that incorporate sustainable practices across all business functions.\n\nKey components of our sustainable business development plans include:\n\n1. Market expansion strategies that consider environmental impact\n2. Supply chain optimization for sustainability\n3. Employee development programs that promote long-term growth\n4. Technology integration for operational efficiency\n5. Stakeholder engagement and community relations\n\nWe\'ve helped numerous clients achieve remarkable growth while maintaining strong ESG credentials. Our sustainable development approach has resulted in improved brand reputation, increased investor interest, and enhanced operational efficiency.',
        tags: ['business', 'development', 'sustainability', 'growth'].join(','),
        publishedAt: new Date('2024-02-15'),
      },
      {
        title: 'Digital Marketing Strategies for Professional Services',
        slug: 'digital-marketing-professional-services',
        content: 'In the professional services industry, effective digital marketing can be the difference between attracting high-quality clients and struggling to maintain visibility. Ma Services Solution\'s digital marketing experts have developed proven strategies that help professional service firms establish thought leadership and generate qualified leads.\n\nContent marketing plays a crucial role in our approach. By creating valuable, educational content that addresses client pain points, we help our clients position themselves as industry experts. This includes whitepapers, case studies, blog posts, and educational webinars.\n\nSocial media engagement is another key component. We develop targeted social media strategies that build community, share insights, and drive engagement with potential clients. Our approach focuses on platforms where decision-makers are most active.\n\nSearch engine optimization (SEO) ensures that when potential clients search for professional services, our clients appear at the top of search results. Our technical SEO expertise combined with content optimization has dramatically improved search visibility for our clients.',
        tags: ['marketing', 'digital', 'professional-services', 'strategy'].join(','),
        publishedAt: new Date('2024-03-01'),
      },
      {
        title: 'Navigating Customs Regulations in International Trade',
        slug: 'customs-regulations-international-trade',
        content: 'International trade presents tremendous opportunities for businesses, but navigating complex customs regulations can be challenging. Ma Services Solution\'s customs and trade experts provide comprehensive support to ensure smooth international operations.\n\nOur customs consulting services cover the entire spectrum of international trade compliance, from classification and valuation to documentation and duty optimization. We help businesses understand and comply with regulations from major trading partners including the US, EU, China, and emerging markets.\n\nOne of our key services is customs duty optimization. By properly classifying goods and utilizing available trade agreements, we help clients significantly reduce their customs costs. Our expertise in free trade agreements has saved clients substantial amounts in import duties.\n\nWe also provide ongoing compliance monitoring and training to ensure businesses stay current with changing regulations. Our proactive approach helps prevent costly penalties and delays at customs checkpoints.\n\nRisk management is another critical area we address. We help businesses identify and mitigate customs-related risks, ensuring uninterrupted supply chains and compliance with all relevant regulations.',
        tags: ['customs', 'trade', 'international', 'compliance'].join(','),
        publishedAt: new Date('2024-03-15'),
      },
      {
        title: 'Technology Integration for Business Growth',
        slug: 'technology-integration-business-growth',
        content: 'Technology integration has become a critical driver of business growth and competitive advantage. Ma Services Solution helps businesses leverage technology to streamline operations, enhance customer experiences, and drive innovation.\n\nOur technology integration approach begins with a comprehensive assessment of your current technology landscape and business objectives. We then develop customized integration strategies that align technology with your growth goals.\n\nKey areas we focus on include:\n\n1. Digital transformation initiatives\n2. Cloud migration and optimization\n3. Data analytics and business intelligence\n4. Automation and workflow optimization\n5. Cybersecurity and data protection\n6. Customer relationship management systems\n\nWe\'ve successfully helped clients integrate cutting-edge technologies that have resulted in improved operational efficiency, enhanced decision-making, and accelerated growth. Our technology experts work closely with your team to ensure smooth implementation and adoption.\n\nChange management is a critical component of our technology integration services. We provide comprehensive training and support to ensure your team can effectively leverage new technologies.',
        tags: ['technology', 'integration', 'growth', 'digital-transformation'].join(','),
        publishedAt: new Date('2024-04-01'),
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
