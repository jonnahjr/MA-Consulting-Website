import Meta from '../components/Meta'

export function About() {
  return (
    <>
      <Meta title="About Ma Services Solution - Ethiopia's Premier Business Consulting Firm" description="Learn about Ma Services Solution's 13+ years of excellence in investment consulting, business development, tax services, and strategic transformation. Meet our expert team and discover our mission." />

      {/* HERO SECTION - Large and Professional */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-amber-900 to-orange-900 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-600/20 to-orange-600/20"></div>
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
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-3 rounded-full text-lg font-semibold uppercase tracking-wider shadow-lg">
                About MA Consulting
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-amber-100 to-orange-100 bg-clip-text text-transparent leading-tight">
              Ethiopia's Premier
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Consulting Firm
              </span>
            </h1>

            <p className="text-2xl md:text-3xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto">
              Since 2010, MA Consulting has been Ethiopia's trusted partner for business transformation.
              We combine deep local expertise with global best practices to deliver exceptional results
              that drive sustainable growth and competitive advantage.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 transform hover:scale-105 animate-pulse-glow">
                Our Services
              </button>
              <button className="border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm">
                Meet Our Team
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

      {/* OUR STORY SECTION */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">Our Story</h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From humble beginnings to becoming Ethiopia's most trusted consulting partner
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
              <div>
                <h3 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">Founded with a Vision</h3>
                <p className="text-xl text-gray-700 leading-relaxed mb-6">
                  MA Consulting was founded in 2010 by industry veterans Alebachew Sitotaw Yimer and Melsew Hailemariam Yassin,
                  who recognized a critical gap in Ethiopia's business consulting landscape. With extensive experience in
                  international consulting firms, they saw an opportunity to bring world-class expertise to Ethiopian businesses.
                </p>
                <p className="text-xl text-gray-700 leading-relaxed mb-6">
                  What began as a small advisory practice has evolved into Ethiopia's premier consulting firm, serving over
                  200 clients across diverse industries including manufacturing, finance, technology, healthcare, and agriculture.
                </p>
                <p className="text-xl text-gray-700 leading-relaxed">
                  Our journey has been marked by continuous innovation, unwavering commitment to excellence, and a deep
                  understanding of the Ethiopian business environment. We've successfully guided our clients through economic
                  challenges, regulatory changes, and market transformations, emerging stronger and more capable with each milestone.
                </p>
              </div>

              <div className="relative">
                {/* Animated establishment showcase */}
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

            {/* Timeline of growth */}
            <div className="bg-white p-12 rounded-3xl shadow-2xl">
              <h3 className="text-4xl font-bold text-center mb-12 text-gray-900">Our Growth Journey</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform">
                    2010
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-gray-900">Foundation</h4>
                  <p className="text-gray-600 leading-relaxed">
                    MA Consulting established with a vision to transform Ethiopian businesses through expert consulting services.
                  </p>
                </div>

                <div className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform">
                    2015
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-gray-900">Expansion</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Reached 100+ clients and expanded service offerings to include comprehensive business transformation solutions.
                  </p>
                </div>

                <div className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform">
                    2020
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-gray-900">Excellence</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Achieved 95% client satisfaction rate and recognized as Ethiopia's premier consulting firm.
                  </p>
                </div>

                <div className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform">
                    2024
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-gray-900">Leadership</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Leading Ethiopia's business consulting industry with 500+ completed projects and regional expansion plans.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION, VISION & VALUES */}
      <section className="py-24 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">Our Guiding Principles</h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The foundation of our success and the principles that guide every decision we make
            </p>
          </div>

          <div className="max-w-7xl mx-auto space-y-16">
            {/* Mission */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-12 rounded-3xl border border-amber-100">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-1">
                  <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center mb-6 shadow-2xl">
                    <span className="text-5xl text-white">🎯</span>
                  </div>
                  <h3 className="text-4xl font-bold text-gray-900">Our Mission</h3>
                </div>
                <div className="lg:col-span-2">
                  <p className="text-2xl text-gray-700 leading-relaxed mb-8">
                    To empower Ethiopian businesses and organizations with world-class consulting solutions that drive
                    sustainable growth, operational excellence, and competitive advantage. We are committed to delivering
                    unparalleled expertise across investment consulting, business development, tax optimization, marketing
                    strategies, customs regulations, and comprehensive business transformation services.
                  </p>
                  <div className="bg-white/80 p-6 rounded-2xl border border-amber-200">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Our mission extends beyond service delivery; we aim to be catalysts for positive change in Ethiopia's
                      business ecosystem. Through our work, we contribute to economic development, job creation, and the
                      establishment of sustainable business practices that benefit communities and stakeholders at large.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-12 rounded-3xl border border-slate-200">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-1">
                  <div className="w-24 h-24 bg-gradient-to-br from-slate-600 to-gray-600 rounded-3xl flex items-center justify-center mb-6 shadow-2xl">
                    <span className="text-5xl text-white">🔭</span>
                  </div>
                  <h3 className="text-4xl font-bold text-gray-900">Our Vision</h3>
                </div>
                <div className="lg:col-span-2">
                  <p className="text-2xl text-gray-700 leading-relaxed mb-8">
                    To be Ethiopia's most trusted and innovative consulting partner, recognized regionally and globally
                    for excellence in business transformation and client success. We envision a future where Ethiopian
                    businesses compete effectively on the world stage, leveraging strategic consulting to achieve
                    sustainable growth and market leadership.
                  </p>
                  <div className="bg-white/80 p-6 rounded-2xl border border-slate-200">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      By 2025, MA Consulting aims to expand its impact across East Africa, establishing itself as the
                      regional leader in comprehensive business consulting while maintaining our core values of integrity,
                      innovation, and client-centric service delivery. We are committed to developing the next generation
                      of business leaders through mentorship, knowledge sharing, and industry collaboration.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Values */}
            <div className="bg-white p-12 rounded-3xl shadow-2xl border border-gray-100">
              <h3 className="text-4xl font-bold text-center mb-12 text-gray-900">Our Core Values</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="text-center group">
                  <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-8 text-4xl shadow-2xl group-hover:scale-110 transition-transform">
                    🤝
                  </div>
                  <h4 className="text-3xl font-bold mb-6 text-gray-900">Integrity</h4>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    We conduct all our business affairs with the highest standards of honesty, transparency, and ethical behavior.
                    Trust is the foundation of every client relationship we build.
                  </p>
                </div>

                <div className="text-center group">
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8 text-4xl shadow-2xl group-hover:scale-110 transition-transform">
                    🚀
                  </div>
                  <h4 className="text-3xl font-bold mb-6 text-gray-900">Innovation</h4>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    We continuously seek new approaches and technologies to deliver cutting-edge solutions for our clients.
                    Innovation drives our ability to stay ahead of industry trends.
                  </p>
                </div>

                <div className="text-center group">
                  <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-8 text-4xl shadow-2xl group-hover:scale-110 transition-transform">
                    👥
                  </div>
                  <h4 className="text-3xl font-bold mb-6 text-gray-900">Excellence</h4>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    We strive for perfection in everything we do, delivering exceptional results that exceed expectations.
                    Excellence is not optional—it's our standard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS & IMPACT */}
      <section className="py-24 bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Our Impact & Achievements</h2>
            <p className="text-2xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
              Measurable results that demonstrate our commitment to client success and industry leadership
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center group">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl backdrop-blur-sm group-hover:scale-110 transition-transform">
                📊
              </div>
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-xl font-semibold text-orange-200 mb-2">Projects Completed</div>
              <div className="text-orange-300">Across 15+ industries</div>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl backdrop-blur-sm group-hover:scale-110 transition-transform">
                😊
              </div>
              <div className="text-5xl font-bold mb-2">95%</div>
              <div className="text-xl font-semibold text-orange-200 mb-2">Client Satisfaction</div>
              <div className="text-orange-300">Based on feedback surveys</div>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl backdrop-blur-sm group-hover:scale-110 transition-transform">
                👥
              </div>
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-xl font-semibold text-orange-200 mb-2">Expert Consultants</div>
              <div className="text-orange-300">Certified professionals</div>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl backdrop-blur-sm group-hover:scale-110 transition-transform">
                💰
              </div>
              <div className="text-5xl font-bold mb-2">$50M+</div>
              <div className="text-xl font-semibold text-orange-200 mb-2">Client Savings</div>
              <div className="text-orange-300">Through our solutions</div>
            </div>
          </div>

          {/* Industry Impact */}
          <div className="bg-white/10 backdrop-blur-sm p-12 rounded-3xl border border-white/20">
            <h3 className="text-4xl font-bold text-center mb-12">Industry Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h4 className="text-2xl font-bold mb-4">Economic Development</h4>
                <p className="text-lg text-orange-100 leading-relaxed">
                  Our consulting work has contributed to job creation and economic growth across Ethiopia,
                  supporting the development of sustainable business practices.
                </p>
              </div>

              <div className="text-center">
                <h4 className="text-2xl font-bold mb-4">Industry Standards</h4>
                <p className="text-lg text-orange-100 leading-relaxed">
                  We have helped establish higher standards of business excellence in Ethiopia,
                  influencing industry practices and professional standards.
                </p>
              </div>

              <div className="text-center">
                <h4 className="text-2xl font-bold mb-4">Knowledge Transfer</h4>
                <p className="text-lg text-orange-100 leading-relaxed">
                  Through training and mentorship programs, we have developed the next generation
                  of Ethiopian business leaders and consultants.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP TEAM PREVIEW */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">Meet Our Leadership Team</h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Get to know the experienced professionals who drive MA Consulting's success and client satisfaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* CEO */}
            <div className="group bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
                  <span className="text-4xl text-white">👨‍💼</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Alebachew Sitotaw Yimer</h3>
                <p className="text-amber-600 font-semibold">CEO & Founder</p>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Visionary leader with 15+ years of consulting excellence, driving innovation and client success across diverse industries.
              </p>
              <div className="flex justify-center">
                <button className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>

            {/* Deputy CEO */}
            <div className="group bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
                  <span className="text-4xl text-white">👩‍💼</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Melsew Hailemariam Yassin</h3>
                <p className="text-orange-600 font-semibold">Deputy CEO & Founder</p>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Strategic operations expert ensuring seamless client experiences and organizational excellence in consulting delivery.
              </p>
              <div className="flex justify-center">
                <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>

            {/* Head of Business Development */}
            <div className="group bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
                  <span className="text-4xl text-white">👨‍💼</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Tiruwork Tizazu Liyew</h3>
                <p className="text-red-600 font-semibold">Head of Business Development</p>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Driving strategic partnerships and fostering long-term client relationships through innovative business development solutions.
              </p>
              <div className="flex justify-center">
                <button className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 transform hover:scale-105 animate-pulse-glow">
              View Full Team
            </button>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-24 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">Ready to Partner with Ethiopia's Premier Consulting Firm?</h2>
          <p className="text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
            Join the hundreds of Ethiopian businesses that have transformed their operations and achieved
            sustainable growth with MA Consulting's expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-gray-900 px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              Start Your Transformation
            </button>
            <button className="border-2 border-white/50 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/10 hover:border-white transition-all duration-300">
              Explore Our Services
            </button>
          </div>
        </div>
      </section>
    </>
  )
}