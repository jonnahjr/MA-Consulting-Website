import { Outlet, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/Hero'
import ChatWidget from './components/ChatWidget'
import { useEffect, useState } from 'react'

interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  tags: string
  publishedAt: string
}

interface Testimonial {
  id: string
  name: string
  company: string
  position: string
  content: string
  rating: number
  image?: string
}

export function Home({ initialSection }: { initialSection?: string }) {
  const navigate = useNavigate()
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

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

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        setFeaturedPosts(data.slice(0, 3)) // Get first 3 posts
      })
      .catch(error => {
        console.error('Error fetching featured posts:', error)
      })
  }, [])

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => {
        setTestimonials(data.slice(0, 6)) // Get first 6 testimonials
      })
      .catch(error => {
        console.error('Error fetching testimonials:', error)
      })
  }, [])

  // Auto-slide testimonials every 5 seconds
  useEffect(() => {
    if (testimonials.length === 0) return

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <>
      {/* Glassmorphism Background Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20 backdrop-blur-3xl pointer-events-none z-0"></div>

      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
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
            <div className="w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-xl"></div>
          </div>
        ))}
      </div>

      <div className="relative z-10">
        <Hero />

        {/* ABOUT SECTION - Enhanced Professional Design */}
        <section id="about" className="py-24 relative overflow-hidden bg-gradient-to-br from-gray-50 to-amber-50">
          {/* Enhanced Background */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500/5 to-orange-500/5"></div>
            {/* Floating elements */}
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${8 + Math.random() * 4}s`,
                }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-sm"></div>
              </div>
            ))}
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-20 animate-fade-in-up">
              <div className="inline-block mb-6">
                <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-3 rounded-full text-lg font-semibold uppercase tracking-wider shadow-lg">
                  About MA Consulting
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">Ethiopia's Premier Consulting Firm</h2>
              <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Transforming businesses across Ethiopia since 2010 with world-class expertise,
                innovative solutions, and unwavering commitment to client success.
              </p>
            </div>

            <div className="max-w-7xl mx-auto">
              {/* Enhanced Company Story */}
              <div className="bg-white p-12 rounded-3xl shadow-2xl border border-gray-100 mb-16 animate-fade-in-up">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">Our Founding Story</h3>
                    <p className="text-xl text-gray-700 leading-relaxed mb-6">
                      Founded in 2010 by industry veterans Alebachew Sitotaw Yimer and Melsew Hailemariam Yassin,
                      MA Consulting emerged from a bold vision to bridge the gap between traditional Ethiopian business
                      practices and cutting-edge global consulting methodologies.
                    </p>
                    <p className="text-xl text-gray-700 leading-relaxed mb-6">
                      What began as a small advisory practice has evolved into Ethiopia's most trusted consulting partner,
                      serving over 200 clients across diverse industries including manufacturing, finance, technology,
                      healthcare, and agriculture. Our journey has been marked by continuous innovation, unwavering
                      commitment to excellence, and deep understanding of the Ethiopian business landscape.
                    </p>
                    <p className="text-xl text-gray-700 leading-relaxed">
                      We've successfully navigated our clients through economic challenges, regulatory changes, and
                      market transformations, emerging stronger and more capable with each milestone. Today, MA Consulting
                      stands as a beacon of professional excellence in Ethiopian business consulting.
                    </p>

                    <div className="mt-8">
                      <button
                        onClick={() => navigate('/about')}
                        className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 transform hover:scale-105 animate-pulse-glow"
                      >
                        Discover Our Full Story
                      </button>
                    </div>
                  </div>

                  <div className="relative">
                    {/* Enhanced establishment showcase */}
                    <div className="relative bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 p-12 rounded-3xl shadow-2xl">
                      <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl border border-white/30">
                        <div className="text-center">
                          <div className="text-6xl mb-6 animate-bounce">🏢</div>
                          <h4 className="text-3xl font-bold mb-4 text-gray-900">Established 2010</h4>
                          <p className="text-xl text-gray-700 font-semibold mb-6">13+ Years of Excellence</p>

                          {/* Achievement badges */}
                          <div className="flex flex-wrap justify-center gap-3 mb-6">
                            <span className="bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-semibold animate-pulse">🏆 Award Winning</span>
                            <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold animate-pulse delay-100">⭐ Top Rated</span>
                            <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold animate-pulse delay-200">🌟 Trusted Partner</span>
                          </div>

                          {/* Key stats */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-amber-600">500+</div>
                              <div className="text-sm text-gray-600">Projects Completed</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-orange-600">200+</div>
                              <div className="text-sm text-gray-600">Happy Clients</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floating achievement indicators */}
                    <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-blue-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg animate-bounce">
                      500+ Projects
                    </div>
                    <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg animate-bounce animation-delay-1s">
                      95% Satisfaction
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Achievements Section */}
              <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-12 rounded-3xl shadow-2xl text-white animate-fade-in-up">
                <h3 className="text-4xl font-bold text-center mb-12">Our Impact & Achievements</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="text-center group">
                    <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl backdrop-blur-sm group-hover:scale-110 transition-transform">
                      📊
                    </div>
                    <div className="text-5xl font-bold mb-2">500+</div>
                    <div className="text-xl font-semibold text-orange-200 mb-2">Projects Completed</div>
                    <div className="text-orange-300">Across 15+ industries</div>
                  </div>

                  <div className="text-center group">
                    <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl backdrop-blur-sm group-hover:scale-110 transition-transform">
                      😊
                    </div>
                    <div className="text-5xl font-bold mb-2">95%</div>
                    <div className="text-xl font-semibold text-orange-200 mb-2">Client Satisfaction</div>
                    <div className="text-orange-300">Based on feedback surveys</div>
                  </div>

                  <div className="text-center group">
                    <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl backdrop-blur-sm group-hover:scale-110 transition-transform">
                      👥
                    </div>
                    <div className="text-5xl font-bold mb-2">50+</div>
                    <div className="text-xl font-semibold text-orange-200 mb-2">Expert Consultants</div>
                    <div className="text-orange-300">Certified professionals</div>
                  </div>

                  <div className="text-center group">
                    <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl backdrop-blur-sm group-hover:scale-110 transition-transform">
                      💰
                    </div>
                    <div className="text-5xl font-bold mb-2">$50M+</div>
                    <div className="text-xl font-semibold text-orange-200 mb-2">Client Savings</div>
                    <div className="text-orange-300">Through our solutions</div>
                  </div>
                </div>

                {/* Additional achievements */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-center">
                    <div className="text-3xl font-bold text-yellow-300 mb-2">13+</div>
                    <div className="text-orange-200 font-semibold">Years of Excellence</div>
                    <div className="text-sm text-orange-300 mt-1">Continuous innovation</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-center">
                    <div className="text-3xl font-bold text-green-300 mb-2">15+</div>
                    <div className="text-orange-200 font-semibold">Industry Sectors</div>
                    <div className="text-sm text-orange-300 mt-1">Diverse expertise</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-center">
                    <div className="text-3xl font-bold text-blue-300 mb-2">98%</div>
                    <div className="text-orange-200 font-semibold">Project Success Rate</div>
                    <div className="text-sm text-orange-300 mt-1">Measurable results</div>
                  </div>
                </div>
              </div>

              {/* Why Choose MA Consulting */}
              <div className="mt-16 bg-white p-12 rounded-3xl shadow-2xl border border-gray-100 animate-fade-in-up">
                <h3 className="text-4xl font-bold text-center mb-12 text-gray-900">Why Choose MA Consulting?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center group">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-6 text-4xl shadow-2xl group-hover:scale-110 transition-transform">
                      🎯
                    </div>
                    <h4 className="text-2xl font-bold mb-4 text-gray-900">Proven Expertise</h4>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      13+ years of consulting excellence with a track record of delivering measurable results
                      across diverse industries and business challenges.
                    </p>
                  </div>

                  <div className="text-center group">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 text-4xl shadow-2xl group-hover:scale-110 transition-transform">
                      🤝
                    </div>
                    <h4 className="text-2xl font-bold mb-4 text-gray-900">Local Understanding</h4>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Deep knowledge of the Ethiopian business landscape, regulatory environment, and market
                      dynamics ensures practical, implementable solutions.
                    </p>
                  </div>

                  <div className="text-center group">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 text-4xl shadow-2xl group-hover:scale-110 transition-transform">
                      🚀
                    </div>
                    <h4 className="text-2xl font-bold mb-4 text-gray-900">Innovation Focus</h4>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      We continuously adopt cutting-edge methodologies and technologies to deliver
                      forward-thinking solutions that drive competitive advantage.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* SERVICES SECTION - Professional & Interactive */}
      <section id="services" className="py-24 relative overflow-hidden">
        {/* Advanced Glassmorphism Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-indigo-900/95 backdrop-blur-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10"></div>

        {/* Dynamic Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Floating geometric shapes */}
          <div className="absolute top-20 left-10 w-32 h-32 border border-white/10 rounded-full animate-float animation-delay-1s"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg rotate-45 animate-float animation-delay-3s"></div>
          <div className="absolute bottom-32 left-20 w-20 h-20 border-2 border-cyan-400/30 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-32 w-16 h-16 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full animate-float animation-delay-5s"></div>

          {/* Animated particles */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${6 + Math.random() * 4}s`,
              }}
            ></div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-block mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
                Our Expertise
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Professional Services
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Transform your business with our comprehensive consulting solutions, backed by 13+ years of industry excellence and proven results.
            </p>
          </div>

          {/* Main Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="group relative">
              <div className="card-service-pro bg-gradient-to-br from-blue-600/20 to-indigo-600/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 h-full transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 animate-fade-in-up delay-100">
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/10 group-hover:to-indigo-500/10 rounded-3xl transition-all duration-500"></div>

                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
                    <span className="text-3xl text-white">📈</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">Investment Consulting</h3>
                  <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                    Strategic investment advice and portfolio management tailored to maximize returns while managing risk effectively.
                  </p>

                  {/* Service stats */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-300">$2.5B+</div>
                      <div className="text-sm text-gray-400">Assets Managed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-300">98%</div>
                      <div className="text-sm text-gray-400">Success Rate</div>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/services')}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center group/btn"
                  >
                    <span>Explore Investment Services</span>
                    <svg className="w-5 h-5 ml-2 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="card-service-pro bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 h-full transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25 animate-fade-in-up delay-200">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-emerald-500/0 group-hover:from-green-500/10 group-hover:to-emerald-500/10 rounded-3xl transition-all duration-500"></div>

                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-green-500/50 transition-all duration-300">
                    <span className="text-3xl text-white">🚀</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">Business Development</h3>
                  <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                    Accelerate growth with strategic business development solutions that expand market presence and competitive advantage.
                  </p>

                  <div className="flex items-center justify-between mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-300">200+</div>
                      <div className="text-sm text-gray-400">Clients Served</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-300">45%</div>
                      <div className="text-sm text-gray-400">Avg Growth</div>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/services')}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 flex items-center justify-center group/btn"
                  >
                    <span>Explore Business Solutions</span>
                    <svg className="w-5 h-5 ml-2 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="card-service-pro bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 h-full transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 animate-fade-in-up delay-300">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 rounded-3xl transition-all duration-500"></div>

                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300">
                    <span className="text-3xl text-white">📋</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">Tax & Customs</h3>
                  <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                    Expert tax planning, compliance, and customs regulations to optimize financial efficiency and minimize liabilities.
                  </p>

                  <div className="flex items-center justify-between mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-300">$50M+</div>
                      <div className="text-sm text-gray-400">Tax Savings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-300">100%</div>
                      <div className="text-sm text-gray-400">Compliance Rate</div>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/services')}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center group/btn"
                  >
                    <span>Explore Tax Services</span>
                    <svg className="w-5 h-5 ml-2 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Services Showcase */}
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 animate-fade-in-up delay-400">
            <h3 className="text-3xl font-bold text-center mb-8 text-white">Additional Expertise Areas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group flex items-center p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer" onClick={() => navigate('/services')}>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <span className="text-white text-lg">🎨</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Marketing Strategies</h4>
                  <p className="text-sm text-gray-400">Brand development & campaigns</p>
                </div>
              </div>

              <div className="group flex items-center p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer" onClick={() => navigate('/services')}>
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <span className="text-white text-lg">🏗️</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Development Works</h4>
                  <p className="text-sm text-gray-400">Project implementation</p>
                </div>
              </div>

              <div className="group flex items-center p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer" onClick={() => navigate('/services')}>
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <span className="text-white text-lg">🛠️</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Dedicated Support</h4>
                  <p className="text-sm text-gray-400">Ongoing maintenance</p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 animate-fade-in-up delay-500">
            <p className="text-xl text-gray-300 mb-6">Ready to elevate your business?</p>
            <button
              onClick={() => navigate('/services')}
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 animate-pulse-glow"
            >
              View All Services
            </button>
          </div>
        </div>
      </section>


      {/* TEAM SECTION - Enhanced Professional Design */}
      <section id="team" className="py-24 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 relative overflow-hidden">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-600/20 to-orange-600/20"></div>
          {/* Dynamic particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${6 + Math.random() * 4}s`,
              }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400/30 to-orange-400/30 rounded-full blur-sm"></div>
            </div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-block mb-6">
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-3 rounded-full text-lg font-semibold uppercase tracking-wider shadow-lg">
                Leadership Team
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">Meet Our Expert Team</h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Industry leaders with decades of combined experience, dedicated to delivering
              exceptional consulting solutions that drive real business transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* CEO & Founder */}
            <div className="group bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:scale-105">
              <div className="text-center mb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:shadow-amber-500/50 transition-all">
                  <span className="text-5xl text-white">👨‍💼</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Alebachew Sitotaw Yimer</h3>
                <h4 className="text-lg text-amber-300 font-semibold mb-4">CEO & Founder</h4>
                <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                  Visionary leader with 15+ years of consulting excellence, driving innovation and client success
                  across diverse industries and complex business challenges.
                </p>

                {/* Key achievements */}
                <div className="bg-white/10 p-4 rounded-2xl mb-6">
                  <h5 className="text-sm font-bold text-amber-300 mb-2">Key Achievements:</h5>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• 200+ successful client projects</li>
                    <li>• $50M+ in client savings generated</li>
                    <li>• 98% client satisfaction rate</li>
                  </ul>
                </div>

                <div className="flex justify-center space-x-4">
                  <div className="w-10 h-10 bg-amber-600/30 rounded-full flex items-center justify-center hover:bg-amber-500/40 transition-colors cursor-pointer">
                    <span className="text-amber-200 text-sm">in</span>
                  </div>
                  <div className="w-10 h-10 bg-amber-600/30 rounded-full flex items-center justify-center hover:bg-amber-500/40 transition-colors cursor-pointer">
                    <span className="text-amber-200 text-sm">🐦</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Deputy CEO & Founder */}
            <div className="group bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:scale-105">
              <div className="text-center mb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:shadow-orange-500/50 transition-all">
                  <span className="text-5xl text-white">👩‍💼</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Melsew Hailemariam Yassin</h3>
                <h4 className="text-lg text-orange-300 font-semibold mb-4">Deputy CEO & Founder</h4>
                <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                  Strategic operations expert ensuring seamless client experiences and organizational excellence.
                  Leads project delivery and client relationship management with precision.
                </p>

                <div className="bg-white/10 p-4 rounded-2xl mb-6">
                  <h5 className="text-sm font-bold text-orange-300 mb-2">Key Achievements:</h5>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• 500+ projects managed successfully</li>
                    <li>• 100% on-time delivery record</li>
                    <li>• 95% client retention rate</li>
                  </ul>
                </div>

                <div className="flex justify-center space-x-4">
                  <div className="w-10 h-10 bg-orange-600/30 rounded-full flex items-center justify-center hover:bg-orange-500/40 transition-colors cursor-pointer">
                    <span className="text-orange-200 text-sm">in</span>
                  </div>
                  <div className="w-10 h-10 bg-orange-600/30 rounded-full flex items-center justify-center hover:bg-orange-500/40 transition-colors cursor-pointer">
                    <span className="text-orange-200 text-sm">📧</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Head of Business Development */}
            <div className="group bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:scale-105">
              <div className="text-center mb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-red-400 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:shadow-red-500/50 transition-all">
                  <span className="text-5xl text-white">👨‍💼</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Tiruwork Tizazu Liyew</h3>
                <h4 className="text-lg text-red-300 font-semibold mb-4">Head of Business Development</h4>
                <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                  Driving strategic partnerships and fostering long-term client relationships through innovative
                  business development solutions and market expansion initiatives.
                </p>

                <div className="bg-white/10 p-4 rounded-2xl mb-6">
                  <h5 className="text-sm font-bold text-red-300 mb-2">Key Achievements:</h5>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• 300% client base expansion</li>
                    <li>• 50+ strategic partnerships</li>
                    <li>• 5 new market segments opened</li>
                  </ul>
                </div>

                <div className="flex justify-center space-x-4">
                  <div className="w-10 h-10 bg-red-600/30 rounded-full flex items-center justify-center hover:bg-red-500/40 transition-colors cursor-pointer">
                    <span className="text-red-200 text-sm">in</span>
                  </div>
                  <div className="w-10 h-10 bg-red-600/30 rounded-full flex items-center justify-center hover:bg-red-500/40 transition-colors cursor-pointer">
                    <span className="text-red-200 text-sm">💼</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Culture & Values */}
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-12 mb-16">
            <h3 className="text-4xl font-bold text-center mb-12 text-white">Our Team Culture</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl shadow-lg group-hover:scale-110 transition-transform">
                  🎯
                </div>
                <h4 className="text-2xl font-bold mb-4 text-white">Excellence</h4>
                <p className="text-lg text-gray-300 leading-relaxed">
                  We strive for perfection in everything we do, delivering exceptional results that exceed expectations
                  and set new standards in consulting excellence.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl shadow-lg group-hover:scale-110 transition-transform">
                  🤝
                </div>
                <h4 className="text-2xl font-bold mb-4 text-white">Collaboration</h4>
                <p className="text-lg text-gray-300 leading-relaxed">
                  We believe in the power of teamwork and collaboration, both within our firm and with our clients,
                  creating partnerships that drive mutual success.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl shadow-lg group-hover:scale-110 transition-transform">
                  🚀
                </div>
                <h4 className="text-2xl font-bold mb-4 text-white">Innovation</h4>
                <p className="text-lg text-gray-300 leading-relaxed">
                  We continuously seek new approaches and technologies to deliver cutting-edge solutions that keep
                  our clients ahead of industry trends and challenges.
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Call to Action */}
          <div className="text-center animate-fade-in-up">
            <p className="text-2xl text-gray-300 mb-6">Ready to work with industry experts?</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => navigate('/team')}
                className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 transform hover:scale-105 animate-pulse-glow"
              >
                Meet Our Full Team
              </button>
              <button
                onClick={() => navigate('/careers')}
                className="border-2 border-white/50 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm"
              >
                Join Our Team
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION - Carousel Design */}
      <section id="testimonials" className="py-24 bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 relative overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-500/5 to-emerald-500/5"></div>
          {/* Floating elements */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
              }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-200/30 to-emerald-200/30 rounded-full blur-sm"></div>
            </div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-block mb-6">
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full text-lg font-semibold uppercase tracking-wider shadow-lg">
                Client Success Stories
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">What Our Clients Say</h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Real results from real businesses. Discover how MA Consulting has transformed
              operations and driven growth across diverse industries in Ethiopia.
            </p>
          </div>

          {testimonials.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-green-600"></div>
              <p className="mt-6 text-2xl text-gray-600">Loading client testimonials...</p>
            </div>
          ) : (
            <div className="relative max-w-6xl mx-auto">
              {/* Testimonial Carousel */}
              <div className="overflow-hidden relative">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
                >
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                      <div className="bg-white p-12 rounded-3xl shadow-2xl border border-gray-100 text-center animate-fade-in-up">
                        {/* Large quote icon */}
                        <div className="text-6xl text-green-500 mb-8 opacity-20">"</div>

                        {/* Testimonial content */}
                        <blockquote className="text-2xl text-gray-700 leading-relaxed mb-8 italic font-light">
                          {testimonial.content}
                        </blockquote>

                        {/* Rating stars */}
                        <div className="flex items-center justify-center mb-8">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-6 h-6 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>

                        {/* Client info with social links */}
                        <div className="flex items-center justify-center mb-6">
                          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg mr-6">
                            <span className="text-2xl text-white font-bold">
                              {testimonial.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </span>
                          </div>
                          <div className="text-left">
                            <h4 className="text-2xl font-bold text-gray-900 mb-1">{testimonial.name}</h4>
                            <p className="text-green-600 font-semibold text-lg mb-2">{testimonial.company}</p>
                            <p className="text-gray-600 mb-3">{testimonial.position}</p>

                            {/* Social media links */}
                            <div className="flex space-x-3">
                              <a
                                href={`https://linkedin.com/in/${testimonial.name.toLowerCase().replace(' ', '-')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                                title={`Connect with ${testimonial.name} on LinkedIn`}
                              >
                                <span className="text-white text-xs font-bold">in</span>
                              </a>
                              <a
                                href={`https://twitter.com/${testimonial.name.toLowerCase().replace(' ', '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
                                title={`Follow ${testimonial.name} on Twitter`}
                              >
                                <span className="text-white text-xs">🐦</span>
                              </a>
                              <a
                                href={`mailto:${testimonial.name.toLowerCase().replace(' ', '.')}@${testimonial.company.toLowerCase().replace(' ', '')}.com`}
                                className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                                title={`Email ${testimonial.name}`}
                              >
                                <span className="text-white text-xs">✉️</span>
                              </a>
                            </div>
                          </div>
                        </div>

                        {/* Verification badge */}
                        <div className="inline-flex items-center bg-green-100 px-4 py-2 rounded-full">
                          <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-green-800 font-semibold text-sm">Verified MA Consulting Client</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Navigation Dots */}
              <div className="flex justify-center mt-8 space-x-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial ? 'bg-green-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    onClick={() => setCurrentTestimonial(index)}
                  />
                ))}
              </div>

              {/* Carousel Navigation Arrows */}
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {/* Success Statistics */}
          <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-12 rounded-3xl shadow-2xl text-white mb-16 animate-fade-in-up">
            <h3 className="text-4xl font-bold text-center mb-12">Our Impact in Numbers</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl backdrop-blur-sm group-hover:scale-110 transition-transform">
                  😊
                </div>
                <div className="text-5xl font-bold mb-2">95%</div>
                <div className="text-xl font-semibold text-green-200 mb-2">Client Satisfaction</div>
                <div className="text-green-300">Based on feedback surveys</div>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl backdrop-blur-sm group-hover:scale-110 transition-transform">
                  🔄
                </div>
                <div className="text-5xl font-bold mb-2">98%</div>
                <div className="text-xl font-semibold text-green-200 mb-2">Client Retention</div>
                <div className="text-green-300">Long-term partnerships</div>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl backdrop-blur-sm group-hover:scale-110 transition-transform">
                  📈
                </div>
                <div className="text-5xl font-bold mb-2">250%</div>
                <div className="text-xl font-semibold text-green-200 mb-2">Average ROI</div>
                <div className="text-green-300">Client investment returns</div>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl backdrop-blur-sm group-hover:scale-110 transition-transform">
                  🌟
                </div>
                <div className="text-5xl font-bold mb-2">500+</div>
                <div className="text-xl font-semibold text-green-200 mb-2">Success Stories</div>
                <div className="text-green-300">Transformed businesses</div>
              </div>
            </div>
          </div>

          {/* Enhanced Call to Action */}
          <div className="text-center animate-fade-in-up">
            <div className="bg-white p-12 rounded-3xl shadow-2xl border border-gray-100 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold mb-6 text-gray-900">Join Our Success Stories</h3>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Ready to transform your business? Join hundreds of Ethiopian companies that have
                achieved remarkable growth and success with MA Consulting's expert guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button
                  onClick={() => navigate('/contact')}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105 animate-pulse-glow"
                >
                  Start Your Success Story
                </button>
                <button
                  onClick={() => navigate('/testimonials')}
                  className="border-2 border-green-300 text-green-600 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-green-50 transition-all duration-300"
                >
                  Read More Testimonials
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG SECTION - Enhanced Professional Design */}
      <section id="blog" className="py-24 bg-gradient-to-br from-purple-50 via-violet-50 to-purple-50 relative overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/5 to-violet-500/5"></div>
          {/* Floating elements */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
              }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-200/30 to-violet-200/30 rounded-full blur-sm"></div>
            </div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-block mb-6">
              <span className="bg-gradient-to-r from-purple-500 to-violet-500 text-white px-6 py-3 rounded-full text-lg font-semibold uppercase tracking-wider shadow-lg">
                Expert Insights
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">Latest Business Insights</h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Stay ahead of industry trends with our expert analysis on business consulting,
              investment strategies, and market insights that drive sustainable growth.
            </p>
          </div>

          {/* Blog Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <button className="bg-gradient-to-r from-purple-500 to-violet-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              All Topics
            </button>
            <button className="bg-white text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 border border-gray-200 transition-all duration-300">
              Investment Consulting
            </button>
            <button className="bg-white text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 border border-gray-200 transition-all duration-300">
              Business Development
            </button>
            <button className="bg-white text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 border border-gray-200 transition-all duration-300">
              Tax & Compliance
            </button>
            <button className="bg-white text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 border border-gray-200 transition-all duration-300">
              Industry Trends
            </button>
          </div>

          {featuredPosts.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600"></div>
              <p className="mt-6 text-2xl text-gray-600">Loading latest business insights...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {featuredPosts.map((post, index) => (
                <article
                  key={post.id}
                  className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Enhanced header with gradient background */}
                  <div className="h-48 bg-gradient-to-br from-purple-500 via-violet-500 to-purple-600 flex items-center justify-center relative overflow-hidden rounded-2xl mb-6">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="text-white text-center z-10">
                      <div className="text-4xl mb-3 animate-float">📝</div>
                      <p className="text-lg opacity-90 font-semibold">Business Insights</p>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/30 rounded-full animate-pulse animation-delay-1s"></div>
                  </div>

                  <div className="space-y-4">
                    {/* Enhanced metadata */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium">
                          {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      {post.tags && post.tags.length > 0 && (
                        <span className="bg-gradient-to-r from-purple-500 to-violet-500 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg">
                          {post.tags.split(',')[0]}
                        </span>
                      )}
                    </div>

                    {/* Enhanced title */}
                    <h3 className="text-2xl font-bold text-gray-900 hover:text-purple-600 transition-colors leading-tight line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Enhanced excerpt */}
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {post.content.length > 150
                        ? `${post.content.substring(0, 150)}...`
                        : post.content
                      }
                    </p>

                    {/* Enhanced action buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <button
                        onClick={() => navigate('/blog')}
                        className="text-purple-600 hover:text-purple-800 font-semibold flex items-center group transition-all duration-300"
                      >
                        <span className="text-lg">Read Full Article</span>
                        <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>

                      <div className="flex space-x-3">
                        <button className="w-10 h-10 bg-gray-100 hover:bg-purple-100 rounded-full flex items-center justify-center transition-colors group">
                          <svg className="w-5 h-5 text-gray-600 group-hover:text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                        <button className="w-10 h-10 bg-gray-100 hover:bg-purple-100 rounded-full flex items-center justify-center transition-colors group">
                          <svg className="w-5 h-5 text-gray-600 group-hover:text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Enhanced Call to Action */}
          <div className="text-center animate-fade-in-up">
            <div className="bg-white p-12 rounded-3xl shadow-2xl border border-gray-100 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold mb-6 text-gray-900">Stay Informed with Industry Insights</h3>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Subscribe to our newsletter and get exclusive access to in-depth analysis,
                market trends, and strategic insights that drive business success.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button
                  onClick={() => navigate('/blog')}
                  className="bg-gradient-to-r from-purple-500 to-violet-500 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 animate-pulse-glow"
                >
                  Explore All Articles
                </button>
                <button className="border-2 border-purple-300 text-purple-600 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-purple-50 transition-all duration-300">
                  Subscribe to Newsletter
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CONTACT SECTION - Enhanced Professional Design */}
      <section id="contact" className="py-24 bg-gradient-to-br from-red-50 via-pink-50 to-red-50 relative overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/5 to-pink-500/5"></div>
          {/* Floating elements */}
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
              }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-red-200/30 to-pink-200/30 rounded-full blur-sm"></div>
            </div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-block mb-6">
              <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-full text-lg font-semibold uppercase tracking-wider shadow-lg">
                Get In Touch
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">Ready to Transform Your Business?</h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Connect with our expert consultants today. We're here to understand your challenges
              and provide tailored solutions that drive real results.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Contact Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {/* Phone Contact */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 text-center group hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:shadow-red-500/50 transition-all">
                  <span className="text-4xl text-white">📞</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Call Us</h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Speak directly with our consulting experts for immediate assistance and personalized guidance.
                </p>
                <div className="space-y-2">
                  <p className="text-xl font-semibold text-red-600">+251 911 123 456</p>
                  <p className="text-sm text-gray-500">Mon-Fri 9AM-6PM EAT</p>
                </div>
                <button
                  onClick={() => navigate('/contact')}
                  className="mt-6 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Contact Us
                </button>
              </div>

              {/* Email Contact */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 text-center group hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:shadow-orange-500/50 transition-all">
                  <span className="text-4xl text-white">✉️</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Email Us</h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Send us detailed information about your business needs and we'll respond within 2 hours.
                </p>
                <div className="space-y-2">
                  <p className="text-xl font-semibold text-orange-600">info@maconsulting.com</p>
                  <p className="text-sm text-gray-500">24/7 Email Support</p>
                </div>
                <button
                  onClick={() => navigate('/contact')}
                  className="mt-6 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Contact Us
                </button>
              </div>

              {/* Office Visit */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 text-center group hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:shadow-pink-500/50 transition-all">
                  <span className="text-4xl text-white">🏢</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Visit Us</h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Schedule an in-person consultation at our Addis Ababa office for comprehensive business discussions.
                </p>
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-pink-600">Addis Ababa, Ethiopia</p>
                  <p className="text-sm text-gray-500">By appointment only</p>
                </div>
                <button
                  onClick={() => navigate('/contact')}
                  className="mt-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Contact Us
                </button>
              </div>
            </div>


            {/* Additional Contact Info */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-8 rounded-3xl">
                <h4 className="text-2xl font-bold mb-4 text-gray-900">Why Choose MA Consulting?</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-red-600 mb-2">2hrs</div>
                    <div className="text-gray-700 font-semibold">Response Time</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-600 mb-2">13+</div>
                    <div className="text-gray-700 font-semibold">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-pink-600 mb-2">95%</div>
                    <div className="text-gray-700 font-semibold">Client Satisfaction</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                    <div className="text-gray-700 font-semibold">Support Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
      <ChatWidget />
    </div>
  )
}

export default App