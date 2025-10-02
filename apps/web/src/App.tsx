import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/Hero'
import ContactForm from './components/ContactForm'
import Meta from './components/Meta'
import { useEffect } from 'react'

export function Home({ initialSection }: { initialSection?: string }) {
  useEffect(() => {
    const id = initialSection || (window.location.hash ? window.location.hash.replace('#', '') : undefined)
    if (id) {
      // Wait for layout to be ready
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 50)
    }
  }, [initialSection])

  return (
    <>
      <Meta title="Home" description="Affordable Professional Services with top quality support - MA Consulting" />
      <Hero />

      <section id="about" className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">About MA Consulting</h1>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg mb-6">
              MA Consulting is dedicated to providing affordable professional services with top quality support.
              Our team of experts delivers exceptional results across investment, business development, marketing,
              tax & customs, development works, and dedicated support services.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
                <p>To empower businesses with innovative solutions and unparalleled expertise.</p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
                <p>To be the leading consulting firm known for excellence and client satisfaction.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Investment Consulting</h3>
              <p>Professional investment advice and portfolio management.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Business Development</h3>
              <p>Strategic business growth and development solutions.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Tax & Customs</h3>
              <p>Comprehensive tax planning and customs compliance.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">About MA Consulting</h1>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg mb-6">
              MA Consulting is dedicated to providing affordable professional services with top quality support.
              Our team of experts delivers exceptional results across investment, business development, marketing,
              tax & customs, development works, and dedicated support services.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
                <p>To empower businesses with innovative solutions and unparalleled expertise.</p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
                <p>To be the leading consulting firm known for excellence and client satisfaction.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">Our Team</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Alebachew Sitotaw Yimer</h3>
              <p className="text-gray-600">CEO</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Melsew Hailemariam Yassin</h3>
              <p className="text-gray-600">Deputy CEO</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Tiruwork Tizazu Liyew</h3>
              <p className="text-gray-600">Head of Business Development</p>
            </div>
          </div>
        </div>
      </section>

      <section id="blog" className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>
          <p className="text-center text-gray-600">Coming soon - Our latest insights and industry news.</p>
        </div>
      </section>

      <section id="careers" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">Careers</h1>
          <p className="text-center text-gray-600">Current job openings will be posted here.</p>
        </div>
      </section>

      <section id="contact" className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
          <div className="max-w-md mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}

export function About() {
  return (
    <>
      <Meta title="About Us" description="Learn about MA Consulting's mission and vision" />
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">About MA Consulting</h1>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg mb-6">
              MA Consulting is dedicated to providing affordable professional services with top quality support.
              Our team of experts delivers exceptional results across investment, business development, marketing,
              tax & customs, development works, and dedicated support services.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
                <p>To empower businesses with innovative solutions and unparalleled expertise.</p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
                <p>To be the leading consulting firm known for excellence and client satisfaction.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export function Services() {
  return (
    <>
      <Meta title="Services" description="Explore our comprehensive consulting services" />
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">Our Services</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Investment Consulting</h3>
              <p>Detailed investment strategies and portfolio optimization.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Business Development</h3>
              <p>Strategic planning and business growth initiatives.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Marketing Strategies</h3>
              <p>Effective marketing campaigns and brand development.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Tax & Customs</h3>
              <p>Tax planning, compliance, and customs regulations.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Development Works</h3>
              <p>Project development and implementation services.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Dedicated Support</h3>
              <p>Ongoing support and maintenance services.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export function Team() {
  return (
    <>
      <Meta title="Our Team" description="Meet the MA Consulting team" />
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">Our Team</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Alebachew Sitotaw Yimer</h3>
              <p className="text-gray-600">CEO</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Melsew Hailemariam Yassin</h3>
              <p className="text-gray-600">Deputy CEO</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Tiruwork Tizazu Liyew</h3>
              <p className="text-gray-600">Head of Business Development</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export function Blog() {
  return (
    <>
      <Meta title="Blog" description="Latest insights and news from MA Consulting" />
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>
          <p className="text-center text-gray-600">Coming soon - Our latest insights and industry news.</p>
        </div>
      </div>
    </>
  )
}

export function Careers() {
  return (
    <>
      <Meta title="Careers" description="Join the MA Consulting team" />
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">Careers</h1>
          <p className="text-center text-gray-600">Current job openings will be posted here.</p>
        </div>
      </div>
    </>
  )
}

export function Contact() {
  return (
    <>
      <Meta title="Contact Us" description="Get in touch with MA Consulting" />
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
          <div className="max-w-md mx-auto">
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  )
}

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App