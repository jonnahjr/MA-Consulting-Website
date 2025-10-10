import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Meta from '../components/Meta'

interface Testimonial {
  id: string
  name: string
  position: string
  company: string
  content: string
  rating: number
  service: string
  image?: string
}

export function Testimonials() {
  const navigate = useNavigate()
  const location = useLocation()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedService, setSelectedService] = useState('All')

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => {
        setTestimonials(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching testimonials:', error)
        setLoading(false)
      })
  }, [])

  const handleReadSuccessStories = () => {
    // Scroll to testimonials section
    const testimonialsSection = document.querySelector('section:nth-of-type(3)') // The testimonials grid section
    if (testimonialsSection) {
      testimonialsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleBecomeNextSuccess = () => {
    if (location.pathname === '/') {
      // If on home page, scroll to contact section
      const contactSection = document.getElementById('contact')
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // If on other pages, navigate to home with contact section
      navigate('/#contact')
    }
  }

  const handleStartSuccessStory = () => {
    if (location.pathname === '/') {
      // If on home page, scroll to contact section
      const contactSection = document.getElementById('contact')
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // If on other pages, navigate to home with contact section
      navigate('/#contact')
    }
  }

  const handleScheduleConsultation = () => {
    if (location.pathname === '/') {
      // If on home page, scroll to contact section
      const contactSection = document.getElementById('contact')
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // If on other pages, navigate to home with contact section
      navigate('/#contact')
    }
  }

  const services = ['All', 'Investment Consulting', 'Business Development', 'Tax & Customs', 'Marketing Strategies', 'Development Works', 'Dedicated Support']

  const filteredTestimonials = selectedService === 'All'
    ? testimonials
    : testimonials.filter(testimonial => testimonial.service === selectedService)

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={`text-2xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ))
  }

  return (
    <>
      <Meta title="Client Testimonials - Ma Services Solution Success Stories" description="Read what our clients say about Ma Services Solution's investment consulting, business development, and tax services. Real success stories from satisfied Ethiopian businesses." />

      {/* HERO SECTION - Large and Professional */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-600/20 to-emerald-600/20"></div>
          {/* Animated background elements */}
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float opacity-10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
              }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-xl"></div>
            </div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="text-center max-w-6xl mx-auto">
            <div className="inline-block mb-8">
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-3 rounded-full text-lg font-semibold uppercase tracking-wider shadow-lg">
                Client Success Stories
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-green-100 to-emerald-100 bg-clip-text text-transparent leading-tight">
              What Our Clients
              <br />
              <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                Say About Us
              </span>
            </h1>

            <p className="text-2xl md:text-3xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto">
              Don't just take our word for it. Discover how Ma Services Solution has transformed businesses
              across Ethiopia through our expert consulting services. These are real stories from
              real clients who achieved extraordinary results.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={handleReadSuccessStories}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105 animate-pulse-glow"
              >
                Read Success Stories
              </button>
              <button
                onClick={handleBecomeNextSuccess}
                className="border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
              >
                Become Our Next Success
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* SUCCESS STATISTICS SECTION */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">Our Track Record Speaks</h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Numbers don't lie. Here's what our clients have achieved working with Ma Services Solution.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 text-3xl shadow-2xl">
                🏆
              </div>
              <div className="text-5xl font-bold text-green-600 mb-2">200+</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">Happy Clients</div>
              <div className="text-gray-600">Across various industries</div>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-6 text-3xl shadow-2xl">
                📈
              </div>
              <div className="text-5xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">Satisfaction Rate</div>
              <div className="text-gray-600">Based on client feedback</div>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 text-3xl shadow-2xl">
                💰
              </div>
              <div className="text-5xl font-bold text-purple-600 mb-2">$50M+</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">Client Savings</div>
              <div className="text-gray-600">Through our solutions</div>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6 text-3xl shadow-2xl">
                ⭐
              </div>
              <div className="text-5xl font-bold text-orange-600 mb-2">4.9/5</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">Average Rating</div>
              <div className="text-gray-600">From client testimonials</div>
            </div>
          </div>

          {/* Service Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {services.map((service) => (
              <button
                key={service}
                onClick={() => setSelectedService(service)}
                className={`px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 ${
                  selectedService === service
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {service}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS GRID */}
      <section className="py-24 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-green-600"></div>
              <p className="mt-6 text-2xl text-gray-600">Loading client success stories...</p>
            </div>
          ) : filteredTestimonials.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-300 to-gray-400 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <span className="text-6xl text-white">💬</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">No Testimonials Found</h3>
              <p className="text-xl text-gray-600">Try selecting a different service category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTestimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Rating */}
                  <div className="flex items-center mb-6">
                    <div className="flex mr-4">
                      {renderStars(testimonial.rating)}
                    </div>
                    <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {testimonial.service}
                    </span>
                  </div>

                  {/* Quote */}
                  <blockquote className="text-lg text-gray-700 leading-relaxed mb-8 italic">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Client Info */}
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                      <span className="text-2xl text-white font-bold">
                        {testimonial.name ? testimonial.name.charAt(0) : 'U'}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">{testimonial.name || 'Anonymous Client'}</h4>
                      <p className="text-green-600 font-semibold">{testimonial.position || 'Client'}</p>
                      <p className="text-gray-600">{testimonial.company || 'Company'}</p>
                    </div>
                  </div>

                  {/* Decorative quote mark */}
                  <div className="absolute top-4 right-4 text-6xl text-green-100 font-serif leading-none">
                    "
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FEATURED SUCCESS STORIES */}
      <section className="py-24 bg-gradient-to-br from-green-600 to-emerald-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">Featured Success Stories</h2>
              <p className="text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
                Remarkable transformations that showcase the power of strategic consulting across Ethiopian businesses.
              </p>
            </div>

            {/* Featured Stories Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              {/* Ethio Manufacturing PLC */}
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mr-4">
                    <span className="text-3xl">🏢</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Ethio Manufacturing PLC</h3>
                    <p className="text-green-200">Manufacturing Company</p>
                  </div>
                </div>

                <h4 className="text-3xl font-bold mb-6">From Struggle to Market Leader</h4>

                <div className="space-y-4 text-lg">
                  <p>
                    "Ma Services Solution transformed our business from a struggling manufacturer to Ethiopia's leading
                    producer in our industry. Their strategic guidance helped us optimize operations, expand our
                    market reach, and achieve sustainable growth."
                  </p>
                  <p>
                    "Within 18 months of working with them, we increased our revenue by 300%, expanded to 5 new
                    regional markets, and became the preferred supplier for major retailers across Ethiopia."
                  </p>
                </div>

                <div className="mt-8 p-6 bg-white/10 rounded-2xl">
                  <h5 className="text-xl font-bold mb-4">Key Achievements:</h5>
                  <ul className="space-y-2 text-green-100">
                    <li>• 300% revenue increase in 18 months</li>
                    <li>• Expanded to 5 regional markets</li>
                    <li>• Became preferred supplier for major retailers</li>
                    <li>• Improved operational efficiency by 40%</li>
                    <li>• Enhanced product quality and customer satisfaction</li>
                  </ul>
                </div>

                <div className="mt-6 text-center">
                  <div className="inline-block bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-2">
                        <span className="text-xl">👨‍💼</span>
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-white text-sm">Abebe Tadesse</div>
                        <div className="text-green-200 text-xs">CEO, Ethio Manufacturing PLC</div>
                      </div>
                    </div>
                    <p className="text-green-100 italic text-sm">
                      "Ma Services Solution didn't just consult—they became our partners in success."
                    </p>
                  </div>
                </div>
              </div>

              {/* Addis Ababa Bank */}
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mr-4">
                    <span className="text-3xl">🏦</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Addis Ababa Bank</h3>
                    <p className="text-green-200">Financial Services</p>
                  </div>
                </div>

                <h4 className="text-3xl font-bold mb-6">Digital Transformation Success</h4>

                <div className="space-y-4 text-lg">
                  <p>
                    "Ma Services Solution revolutionized our digital banking infrastructure and investment portfolio management.
                    Their expertise in fintech and regulatory compliance helped us modernize our operations while maintaining
                    the highest standards of security and customer service."
                  </p>
                  <p>
                    "Their investment consulting services helped us achieve a 250% return on our diversified portfolio
                    within 24 months, setting new industry benchmarks for Ethiopian financial institutions."
                  </p>
                </div>

                <div className="mt-8 p-6 bg-white/10 rounded-2xl">
                  <h5 className="text-xl font-bold mb-4">Key Achievements:</h5>
                  <ul className="space-y-2 text-green-100">
                    <li>• 250% portfolio return in 24 months</li>
                    <li>• Complete digital banking transformation</li>
                    <li>• Enhanced cybersecurity and compliance</li>
                    <li>• 40% increase in customer satisfaction</li>
                    <li>• Industry-leading fintech innovation</li>
                  </ul>
                </div>

                <div className="mt-6 text-center">
                  <div className="inline-block bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-2">
                        <span className="text-xl">👩‍💼</span>
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-white text-sm">Sarah Mengistu</div>
                        <div className="text-green-200 text-xs">CTO, Addis Ababa Bank</div>
                      </div>
                    </div>
                    <p className="text-green-100 italic text-sm">
                      "Their fintech expertise positioned us as Ethiopia's most innovative bank."
                    </p>
                  </div>
                </div>
              </div>

              {/* Green Valley Agriculture */}
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mr-4">
                    <span className="text-3xl">🌾</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Green Valley Agriculture</h3>
                    <p className="text-green-200">Agricultural Company</p>
                  </div>
                </div>

                <h4 className="text-3xl font-bold mb-6">Sustainable Growth Revolution</h4>

                <div className="space-y-4 text-lg">
                  <p>
                    "Ma Services Solution helped us transition from traditional farming to a modern, sustainable agricultural
                    enterprise. Their business development strategies and tax optimization services enabled us to scale
                    operations while maintaining environmental responsibility."
                  </p>
                  <p>
                    "Through their guidance, we secured international export contracts and implemented cutting-edge
                    farming technologies, resulting in a 180% increase in productivity and market value."
                  </p>
                </div>

                <div className="mt-8 p-6 bg-white/10 rounded-2xl">
                  <h5 className="text-xl font-bold mb-4">Key Achievements:</h5>
                  <ul className="space-y-2 text-green-100">
                    <li>• 180% productivity increase</li>
                    <li>• International export market entry</li>
                    <li>• Sustainable farming certification</li>
                    <li>• $2M in tax savings and incentives</li>
                    <li>• Carbon-neutral operations achieved</li>
                  </ul>
                </div>

                <div className="mt-6 text-center">
                  <div className="inline-block bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-2">
                        <span className="text-xl">👨‍🌾</span>
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-white text-sm">Dawit Kebede</div>
                        <div className="text-green-200 text-xs">Founder, Green Valley Agriculture</div>
                      </div>
                    </div>
                    <p className="text-green-100 italic text-sm">
                      "They transformed our farm into a sustainable, profitable enterprise."
                    </p>
                  </div>
                </div>
              </div>

              {/* TechHub Ethiopia */}
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mr-4">
                    <span className="text-3xl">💻</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">TechHub Ethiopia</h3>
                    <p className="text-green-200">Technology Company</p>
                  </div>
                </div>

                <h4 className="text-3xl font-bold mb-6">From Startup to Industry Leader</h4>

                <div className="space-y-4 text-lg">
                  <p>
                    "Ma Services Solution was instrumental in our journey from a small tech startup to Ethiopia's leading
                    software development company. Their marketing consultancy and business development strategies helped
                    us secure major government contracts and expand our service offerings."
                  </p>
                  <p>
                    "Their dedicated support services ensured seamless project delivery and client satisfaction,
                    enabling us to grow from 5 employees to over 150 in just 3 years."
                  </p>
                </div>

                <div className="mt-8 p-6 bg-white/10 rounded-2xl">
                  <h5 className="text-xl font-bold mb-4">Key Achievements:</h5>
                  <ul className="space-y-2 text-green-100">
                    <li>• 30x employee growth in 3 years</li>
                    <li>• Major government contract wins</li>
                    <li>• 95% project success rate</li>
                    <li>• International client acquisition</li>
                    <li>• Industry recognition and awards</li>
                  </ul>
                </div>

                <div className="mt-6 text-center">
                  <div className="inline-block bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-2">
                        <span className="text-xl">👨‍💻</span>
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-white text-sm">Helen Tesfaye</div>
                        <div className="text-green-200 text-xs">CEO, TechHub Ethiopia</div>
                      </div>
                    </div>
                    <p className="text-green-100 italic text-sm">
                      "Ma Services Solution scaled our vision into a thriving technology enterprise."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className="inline-block bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20">
                <h3 className="text-3xl font-bold mb-4">Your Success Story Awaits</h3>
                <p className="text-xl text-green-100 mb-6 max-w-2xl">
                  Join these remarkable Ethiopian businesses that have achieved extraordinary results with Ma Services Solution.
                  Your transformation could be the next featured success story.
                </p>
                <button
                  onClick={handleBecomeNextSuccess}
                  className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  Become Our Next Success Story
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CLIENTS CHOOSE US */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Why Clients Choose Ma Services Solution</h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our commitment to excellence and proven track record set us apart from other consulting firms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-8 text-4xl shadow-2xl group-hover:scale-110 transition-transform">
                🎯
              </div>
              <h3 className="text-3xl font-bold mb-6">Results-Driven Approach</h3>
              <p className="text-xl text-gray-300 leading-relaxed">
                We focus on delivering measurable results that directly impact your bottom line.
                Every recommendation is backed by data and designed for real-world implementation.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 text-4xl shadow-2xl group-hover:scale-110 transition-transform">
                🤝
              </div>
              <h3 className="text-3xl font-bold mb-6">Partnership Mentality</h3>
              <p className="text-xl text-gray-300 leading-relaxed">
                We don't just provide advice—we become your strategic partner. Our success is
                measured by your success, creating long-term relationships built on trust.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 text-4xl shadow-2xl group-hover:scale-110 transition-transform">
                🌟
              </div>
              <h3 className="text-3xl font-bold mb-6">Local Expertise</h3>
              <p className="text-xl text-gray-300 leading-relaxed">
                Deep understanding of the Ethiopian business landscape, regulatory environment,
                and market dynamics ensures our solutions are practical and effective.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-24 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">Ready to Join Our Success Stories?</h2>
          <p className="text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
            Don't let your business potential go untapped. Contact Ma Services Solution today and discover
            how we can help you achieve extraordinary results like our satisfied clients.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={handleStartSuccessStory}
              className="bg-white text-gray-900 px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Start Your Success Story
            </button>
            <button
              onClick={handleScheduleConsultation}
              className="border-2 border-white/50 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/10 hover:border-white transition-all duration-300"
            >
              Schedule Free Consultation
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
