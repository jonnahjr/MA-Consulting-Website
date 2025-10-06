import Meta from '../components/Meta'

export function Team() {
  return (
    <>
      <Meta title="Our Expert Team - MA Consulting" description="Meet the leadership team at MA Consulting - experienced professionals dedicated to delivering exceptional business consulting solutions." />

      {/* HERO SECTION - Large and Professional */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
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
                Leadership Team
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
              Meet Our
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Expert Team
              </span>
            </h1>

            <p className="text-2xl md:text-3xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto">
              Our leadership team brings together decades of combined experience in business consulting,
              strategic planning, and client success. Each member is committed to delivering exceptional
              results that drive your business forward.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 transform hover:scale-105 animate-pulse-glow">
                Connect With Us
              </button>
              <button className="border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm">
                Our Expertise
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

      {/* TEAM MEMBERS DETAILED SECTION */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">Leadership & Expertise</h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Get to know the professionals who drive MA Consulting's success and client satisfaction.
            </p>
          </div>

          {/* CEO & Founder */}
          <div className="mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="w-32 h-32 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
                  <span className="text-6xl text-white">👨‍💼</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Alebachew Sitotaw Yimer</h3>
                <h4 className="text-2xl text-amber-600 font-bold mb-6">CEO & Founder</h4>
                <p className="text-xl text-gray-700 leading-relaxed mb-8">
                  As the visionary founder of MA Consulting, Alebachew brings over 15 years of strategic consulting experience
                  to every client engagement. His expertise spans investment consulting, business development, and organizational
                  transformation across multiple industries.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <h5 className="text-xl font-bold mb-3 text-amber-600">15+ Years Experience</h5>
                    <p className="text-gray-600">Strategic consulting and business leadership</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <h5 className="text-xl font-bold mb-3 text-amber-600">200+ Projects</h5>
                    <p className="text-gray-600">Successfully completed client engagements</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <h5 className="text-xl font-bold mb-3 text-amber-600">MBA Graduate</h5>
                    <p className="text-gray-600">Business administration and strategic management</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <h5 className="text-xl font-bold mb-3 text-amber-600">Industry Recognition</h5>
                    <p className="text-gray-600">Award-winning consultant and speaker</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-3xl border border-amber-100">
                  <h5 className="text-2xl font-bold mb-4 text-gray-900">Key Achievements</h5>
                  <ul className="space-y-3 text-lg text-gray-700">
                    <li className="flex items-start">
                      <span className="text-amber-500 mr-3 text-xl">✓</span>
                      <span>Founded MA Consulting in 2010, growing it to Ethiopia's premier consulting firm</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-500 mr-3 text-xl">✓</span>
                      <span>Led 200+ successful business transformation projects across 15+ industries</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-500 mr-3 text-xl">✓</span>
                      <span>Achieved 98% client satisfaction rate through innovative consulting approaches</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-500 mr-3 text-xl">✓</span>
                      <span>Generated $50M+ in client savings through strategic recommendations</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <div className="bg-gradient-to-br from-amber-100 to-orange-200 p-12 rounded-3xl shadow-2xl">
                  <div className="text-center">
                    <div className="text-6xl mb-6">🏆</div>
                    <h4 className="text-3xl font-bold mb-4 text-gray-900">Leadership Philosophy</h4>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      "Success in consulting comes from understanding that every business is unique.
                      Our approach combines deep industry knowledge with innovative thinking to deliver
                      solutions that not only solve today's challenges but position our clients for
                      long-term sustainable growth."
                    </p>
                    <div className="bg-white/80 p-6 rounded-2xl">
                      <div className="text-2xl font-bold text-amber-600 mb-2">Vision</div>
                      <div className="text-gray-700">To be Ethiopia's most trusted business transformation partner</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Deputy CEO & Founder */}
          <div className="mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
                  <span className="text-6xl text-white">👩‍💼</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Melsew Hailemariam Yassin</h3>
                <h4 className="text-2xl text-orange-600 font-bold mb-6">Deputy CEO & Founder</h4>
                <p className="text-xl text-gray-700 leading-relaxed mb-8">
                  Melsew serves as the operational backbone of MA Consulting, ensuring that our strategic vision
                  translates into seamless client experiences. With extensive experience in business operations,
                  project management, and client relationship management, she drives organizational excellence.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <h5 className="text-xl font-bold mb-3 text-orange-600">Operations Excellence</h5>
                    <p className="text-gray-600">Streamlining business processes and operations</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <h5 className="text-xl font-bold mb-3 text-orange-600">Client Relations</h5>
                    <p className="text-gray-600">Building and maintaining strong client partnerships</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <h5 className="text-xl font-bold mb-3 text-orange-600">Project Management</h5>
                    <p className="text-gray-600">Leading complex consulting projects to success</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <h5 className="text-xl font-bold mb-3 text-orange-600">Team Leadership</h5>
                    <p className="text-gray-600">Mentoring and developing consulting professionals</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-3xl border border-orange-100">
                  <h5 className="text-2xl font-bold mb-4 text-gray-900">Professional Impact</h5>
                  <ul className="space-y-3 text-lg text-gray-700">
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-3 text-xl">✓</span>
                      <span>Managed 500+ client projects with 100% on-time delivery record</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-3 text-xl">✓</span>
                      <span>Developed comprehensive operational frameworks adopted across the firm</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-3 text-xl">✓</span>
                      <span>Built lasting client relationships resulting in 95% repeat business rate</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-3 text-xl">✓</span>
                      <span>Led team development initiatives resulting in 40% productivity improvement</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="bg-gradient-to-br from-orange-100 to-red-200 p-12 rounded-3xl shadow-2xl">
                  <div className="text-center">
                    <div className="text-6xl mb-6">🎯</div>
                    <h4 className="text-3xl font-bold mb-4 text-gray-900">Operational Excellence</h4>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      "Every client interaction is an opportunity to exceed expectations. Our commitment
                      to operational excellence ensures that our strategic recommendations are not just
                      theoretically sound, but practically implementable and sustainable."
                    </p>
                    <div className="bg-white/80 p-6 rounded-2xl">
                      <div className="text-2xl font-bold text-orange-600 mb-2">Mission</div>
                      <div className="text-gray-700">To deliver flawless execution of strategic consulting solutions</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Head of Business Development */}
          <div className="mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="w-32 h-32 bg-gradient-to-br from-red-400 to-pink-500 rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
                  <span className="text-6xl text-white">👨‍💼</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Tiruwork Tizazu Liyew</h3>
                <h4 className="text-2xl text-red-600 font-bold mb-6">Head of Business Development</h4>
                <p className="text-xl text-gray-700 leading-relaxed mb-8">
                  Tiruwork leads our business development initiatives, focusing on strategic partnerships,
                  market expansion, and long-term client relationships. His expertise in identifying growth
                  opportunities and building strategic alliances has been instrumental in MA Consulting's expansion.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <h5 className="text-xl font-bold mb-3 text-red-600">Strategic Partnerships</h5>
                    <p className="text-gray-600">Building valuable business alliances and networks</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <h5 className="text-xl font-bold mb-3 text-red-600">Market Intelligence</h5>
                    <p className="text-gray-600">Analyzing market trends and opportunities</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <h5 className="text-xl font-bold mb-3 text-red-600">Client Acquisition</h5>
                    <p className="text-gray-600">Developing strategies for new client relationships</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <h5 className="text-xl font-bold mb-3 text-red-600">Relationship Management</h5>
                    <p className="text-gray-600">Maintaining and growing client partnerships</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-pink-50 p-8 rounded-3xl border border-red-100">
                  <h5 className="text-2xl font-bold mb-4 text-gray-900">Business Development Success</h5>
                  <ul className="space-y-3 text-lg text-gray-700">
                    <li className="flex items-start">
                      <span className="text-red-500 mr-3 text-xl">✓</span>
                      <span>Expanded MA Consulting's client base by 300% through strategic partnerships</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-3 text-xl">✓</span>
                      <span>Established 50+ strategic alliances with industry leaders and organizations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-3 text-xl">✓</span>
                      <span>Developed market entry strategies that opened 5 new industry verticals</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-3 text-xl">✓</span>
                      <span>Achieved 95% client retention rate through relationship excellence</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <div className="bg-gradient-to-br from-red-100 to-pink-200 p-12 rounded-3xl shadow-2xl">
                  <div className="text-center">
                    <div className="text-6xl mb-6">🤝</div>
                    <h4 className="text-3xl font-bold mb-4 text-gray-900">Partnership Approach</h4>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      "Business development is about creating win-win relationships. We don't just find clients -
                      we build partnerships that create long-term value for both sides. Every relationship we
                      cultivate becomes a testament to our commitment to mutual success."
                    </p>
                    <div className="bg-white/80 p-6 rounded-2xl">
                      <div className="text-2xl font-bold text-red-600 mb-2">Focus</div>
                      <div className="text-gray-700">Building lasting partnerships that drive sustainable growth</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TEAM CULTURE SECTION */}
          <div className="bg-gradient-to-r from-slate-100 to-gray-200 p-12 rounded-3xl">
            <h3 className="text-4xl font-bold text-center mb-12 text-gray-900">Our Team Culture</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">
                  🎯
                </div>
                <h4 className="text-2xl font-bold mb-4 text-gray-900">Excellence</h4>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We strive for excellence in everything we do, from research and analysis to implementation and results.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">
                  🤝
                </div>
                <h4 className="text-2xl font-bold mb-4 text-gray-900">Collaboration</h4>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We believe in the power of teamwork and collaboration, both within our firm and with our clients.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">
                  🚀
                </div>
                <h4 className="text-2xl font-bold mb-4 text-gray-900">Innovation</h4>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We continuously innovate our approaches and solutions to stay ahead of industry trends and challenges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-24 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">Join Our Team</h2>
          <p className="text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
            Ready to work with industry leaders who are passionate about driving business success?
            Let's discuss how we can collaborate on your next project.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-gray-900 px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              Start a Conversation
            </button>
            <button className="border-2 border-white/50 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/10 hover:border-white transition-all duration-300">
              View Our Services
            </button>
          </div>
        </div>
      </section>
    </>
  )
}