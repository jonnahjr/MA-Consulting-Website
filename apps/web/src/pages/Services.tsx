import Meta from '../components/Meta'

export function Services() {
  return (
    <>
      <Meta title="Professional Consulting Services - MA Consulting" description="Comprehensive business consulting services including investment consulting, business development, tax & customs, marketing strategies, development works, and dedicated support." />

      {/* HERO SECTION - Large and Impactful */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
          {/* Animated background elements */}
          {[...Array(20)].map((_, i) => (
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
              <div className="w-16 h-16 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-xl"></div>
            </div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="text-center max-w-6xl mx-auto">
            <div className="inline-block mb-8">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-6 py-3 rounded-full text-lg font-semibold uppercase tracking-wider shadow-lg">
                Professional Services
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
              Comprehensive
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Consulting Solutions
              </span>
            </h1>

            <p className="text-2xl md:text-3xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto">
              Transform your business with our expert consulting services. From strategic investment planning to operational excellence,
              we deliver measurable results that drive sustainable growth and competitive advantage.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 animate-pulse-glow">
                Get Started Today
              </button>
              <button className="border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm">
                Learn More
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

      {/* SERVICES OVERVIEW SECTION */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">Our Core Services</h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Each service is designed to address specific business challenges and deliver tangible results.
              Our experienced consultants work closely with you to understand your unique needs.
            </p>
          </div>

          {/* Service 1: Investment Consulting */}
          <div className="mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
                  <span className="text-5xl text-white">📈</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Investment Consulting</h3>
                <p className="text-xl text-gray-700 leading-relaxed mb-8">
                  Maximize your financial potential with our comprehensive investment consulting services.
                  We provide expert guidance on portfolio management, risk assessment, and strategic investment planning
                  tailored to your financial goals and risk tolerance.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <h4 className="text-xl font-bold mb-3 text-blue-600">Portfolio Optimization</h4>
                    <p className="text-gray-600">Strategic asset allocation and diversification strategies</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <h4 className="text-xl font-bold mb-3 text-blue-600">Risk Management</h4>
                    <p className="text-gray-600">Comprehensive risk assessment and mitigation plans</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <h4 className="text-xl font-bold mb-3 text-blue-600">Market Analysis</h4>
                    <p className="text-gray-600">In-depth market research and investment opportunities</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <h4 className="text-xl font-bold mb-3 text-blue-600">Performance Tracking</h4>
                    <p className="text-gray-600">Regular portfolio reviews and performance optimization</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-3xl border border-blue-100">
                  <h4 className="text-2xl font-bold mb-4 text-gray-900">Why Choose Our Investment Services?</h4>
                  <ul className="space-y-3 text-lg text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-3 text-xl">✓</span>
                      <span>13+ years of investment expertise in Ethiopian market</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-3 text-xl">✓</span>
                      <span>Personalized strategies based on your risk profile</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-3 text-xl">✓</span>
                      <span>Access to exclusive investment opportunities</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-3 text-xl">✓</span>
                      <span>Continuous monitoring and portfolio rebalancing</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-200 p-12 rounded-3xl shadow-2xl">
                  <div className="text-center">
                    <div className="text-6xl mb-6">💰</div>
                    <h4 className="text-3xl font-bold mb-4 text-gray-900">Investment Success Stories</h4>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-white/80 p-6 rounded-2xl">
                        <div className="text-3xl font-bold text-blue-600 mb-2">$2.5B+</div>
                        <div className="text-gray-700 font-semibold">Assets Under Management</div>
                      </div>
                      <div className="bg-white/80 p-6 rounded-2xl">
                        <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
                        <div className="text-gray-700 font-semibold">Client Satisfaction</div>
                      </div>
                      <div className="bg-white/80 p-6 rounded-2xl">
                        <div className="text-3xl font-bold text-purple-600 mb-2">15+</div>
                        <div className="text-gray-700 font-semibold">Years Experience</div>
                      </div>
                      <div className="bg-white/80 p-6 rounded-2xl">
                        <div className="text-3xl font-bold text-orange-600 mb-2">200+</div>
                        <div className="text-gray-700 font-semibold">Successful Investments</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service 2: Business Development */}
          <div className="mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
                  <span className="text-5xl text-white">🚀</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Business Development</h3>
                <p className="text-xl text-gray-700 leading-relaxed mb-8">
                  Accelerate your business growth with our strategic business development solutions.
                  We help you identify new opportunities, expand market presence, and build competitive advantages
                  that drive long-term success.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <h4 className="text-xl font-bold mb-3 text-green-600">Market Expansion</h4>
                    <p className="text-gray-600">Strategic market entry and expansion planning</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <h4 className="text-xl font-bold mb-3 text-green-600">Partnership Development</h4>
                    <p className="text-gray-600">Building strategic alliances and partnerships</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <h4 className="text-xl font-bold mb-3 text-green-600">Growth Strategy</h4>
                    <p className="text-gray-600">Comprehensive business growth planning</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <h4 className="text-xl font-bold mb-3 text-green-600">Competitive Analysis</h4>
                    <p className="text-gray-600">Market positioning and competitive strategy</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-3xl border border-green-100">
                  <h4 className="text-2xl font-bold mb-4 text-gray-900">Business Development Benefits</h4>
                  <ul className="space-y-3 text-lg text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3 text-xl">✓</span>
                      <span>Increase revenue by 30-50% within 12-18 months</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3 text-xl">✓</span>
                      <span>Expand into new markets and customer segments</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3 text-xl">✓</span>
                      <span>Build strategic partnerships for mutual growth</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3 text-xl">✓</span>
                      <span>Develop sustainable competitive advantages</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <div className="bg-gradient-to-br from-green-100 to-emerald-200 p-12 rounded-3xl shadow-2xl">
                  <div className="text-center">
                    <div className="text-6xl mb-6">📊</div>
                    <h4 className="text-3xl font-bold mb-4 text-gray-900">Growth Achievements</h4>
                    <div className="space-y-6">
                      <div className="bg-white/80 p-6 rounded-2xl">
                        <div className="text-3xl font-bold text-green-600 mb-2">200+</div>
                        <div className="text-gray-700 font-semibold">Businesses Transformed</div>
                        <div className="text-sm text-gray-600 mt-2">Across various industries</div>
                      </div>
                      <div className="bg-white/80 p-6 rounded-2xl">
                        <div className="text-3xl font-bold text-blue-600 mb-2">45%</div>
                        <div className="text-gray-700 font-semibold">Average Revenue Growth</div>
                        <div className="text-sm text-gray-600 mt-2">Within first year</div>
                      </div>
                      <div className="bg-white/80 p-6 rounded-2xl">
                        <div className="text-3xl font-bold text-purple-600 mb-2">85%</div>
                        <div className="text-gray-700 font-semibold">Market Expansion Success</div>
                        <div className="text-sm text-gray-600 mt-2">New market entries</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service 3: Tax & Customs */}
          <div className="mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
                  <span className="text-5xl text-white">📋</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Tax & Customs Consulting</h3>
                <p className="text-xl text-gray-700 leading-relaxed mb-8">
                  Navigate complex tax regulations and customs procedures with confidence.
                  Our expert team ensures compliance while optimizing your tax position and minimizing liabilities
                  through strategic planning and expert guidance.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <h4 className="text-xl font-bold mb-3 text-orange-600">Tax Planning</h4>
                    <p className="text-gray-600">Strategic tax optimization and planning</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <h4 className="text-xl font-bold mb-3 text-orange-600">Compliance Management</h4>
                    <p className="text-gray-600">Full compliance with tax regulations</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <h4 className="text-xl font-bold mb-3 text-orange-600">Customs Procedures</h4>
                    <p className="text-gray-600">Import/export customs expertise</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <h4 className="text-xl font-bold mb-3 text-orange-600">Audit Support</h4>
                    <p className="text-gray-600">Tax audit preparation and representation</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-3xl border border-orange-100">
                  <h4 className="text-2xl font-bold mb-4 text-gray-900">Tax & Customs Advantages</h4>
                  <ul className="space-y-3 text-lg text-gray-700">
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-3 text-xl">✓</span>
                      <span>Save up to 30% on tax liabilities through legal optimization</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-3 text-xl">✓</span>
                      <span>100% compliance with Ethiopian tax laws and regulations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-3 text-xl">✓</span>
                      <span>Streamlined customs procedures for import/export activities</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-3 text-xl">✓</span>
                      <span>Expert representation during tax audits and investigations</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="bg-gradient-to-br from-orange-100 to-red-200 p-12 rounded-3xl shadow-2xl">
                  <div className="text-center">
                    <div className="text-6xl mb-6">💼</div>
                    <h4 className="text-3xl font-bold mb-4 text-gray-900">Tax Savings Impact</h4>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-white/80 p-6 rounded-2xl">
                        <div className="text-3xl font-bold text-orange-600 mb-2">$50M+</div>
                        <div className="text-gray-700 font-semibold">Tax Savings Generated</div>
                      </div>
                      <div className="bg-white/80 p-6 rounded-2xl">
                        <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                        <div className="text-gray-700 font-semibold">Compliance Rate</div>
                      </div>
                      <div className="bg-white/80 p-6 rounded-2xl">
                        <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                        <div className="text-gray-700 font-semibold">Tax Returns Filed</div>
                      </div>
                      <div className="bg-white/80 p-6 rounded-2xl">
                        <div className="text-3xl font-bold text-purple-600 mb-2">15+</div>
                        <div className="text-gray-700 font-semibold">Years Experience</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Services Overview */}
          <div className="bg-gradient-to-r from-gray-100 to-blue-100 p-12 rounded-3xl">
            <h3 className="text-4xl font-bold text-center mb-12 text-gray-900">Additional Specialized Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-200">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-3xl text-white">🎨</span>
                </div>
                <h4 className="text-2xl font-bold mb-4 text-gray-900">Marketing Strategies</h4>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Comprehensive marketing solutions including brand development, digital marketing campaigns,
                  market research, and customer engagement strategies.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Brand positioning and identity</li>
                  <li>• Digital marketing campaigns</li>
                  <li>• Market research and analysis</li>
                  <li>• Customer experience optimization</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-200">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-3xl text-white">🏗️</span>
                </div>
                <h4 className="text-2xl font-bold mb-4 text-gray-900">Development Works</h4>
                <p className="text-gray-600 leading-relaxed mb-6">
                  End-to-end project development and implementation services. From concept to completion,
                  we manage complex projects with expertise and precision.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Project planning and management</li>
                  <li>• Resource allocation and optimization</li>
                  <li>• Quality assurance and control</li>
                  <li>• Timeline and budget management</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-200">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-3xl text-white">🛠️</span>
                </div>
                <h4 className="text-2xl font-bold mb-4 text-gray-900">Dedicated Support</h4>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Ongoing support and maintenance services to ensure your business operations run smoothly.
                  Our dedicated team provides continuous assistance and optimization.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• 24/7 technical support</li>
                  <li>• System maintenance and updates</li>
                  <li>• Performance monitoring</li>
                  <li>• Continuous improvement</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Our Consulting Process</h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
              A proven methodology that delivers results. We follow a structured approach to ensure
              your success at every stage of our engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-2xl group-hover:scale-110 transition-transform">
                1
              </div>
              <h3 className="text-2xl font-bold mb-4">Discovery & Analysis</h3>
              <p className="text-gray-300 leading-relaxed">
                Comprehensive assessment of your current situation, challenges, and opportunities.
                We gather data and insights to understand your business deeply.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-2xl group-hover:scale-110 transition-transform">
                2
              </div>
              <h3 className="text-2xl font-bold mb-4">Strategy Development</h3>
              <p className="text-gray-300 leading-relaxed">
                Creating customized solutions and strategies based on our analysis.
                We develop actionable plans that align with your goals and objectives.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-2xl group-hover:scale-110 transition-transform">
                3
              </div>
              <h3 className="text-2xl font-bold mb-4">Implementation</h3>
              <p className="text-gray-300 leading-relaxed">
                Executing the strategies with precision and expertise. We manage the implementation
                process while minimizing disruption to your operations.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-2xl group-hover:scale-110 transition-transform">
                4
              </div>
              <h3 className="text-2xl font-bold mb-4">Monitoring & Optimization</h3>
              <p className="text-gray-300 leading-relaxed">
                Continuous monitoring of results and ongoing optimization. We ensure sustained
                success through regular reviews and adjustments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
            Let's discuss how our consulting services can help you achieve your goals.
            Contact us today for a free consultation and discover the MA Consulting difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-gray-900 px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              Schedule Free Consultation
            </button>
            <button className="border-2 border-white/50 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/10 hover:border-white transition-all duration-300">
              Download Service Brochure
            </button>
          </div>
        </div>
      </section>
    </>
  )
}