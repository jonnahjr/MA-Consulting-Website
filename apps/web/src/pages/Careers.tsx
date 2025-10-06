import Meta from '../components/Meta'

export function Careers() {
  return (
    <>
      <Meta title="Careers at MA Consulting - Join Our Professional Team" description="Discover exciting career opportunities at MA Consulting. Join Ethiopia's premier consulting firm and work on transformative projects with industry experts." />

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
                Join Our Team
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-amber-100 to-orange-100 bg-clip-text text-transparent leading-tight">
              Shape the Future of
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Business Consulting
              </span>
            </h1>

            <p className="text-2xl md:text-3xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto">
              Join MA Consulting and become part of Ethiopia's most respected consulting firm.
              Work on transformative projects, develop your expertise, and make a real impact
              on businesses across diverse industries.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 transform hover:scale-105 animate-pulse-glow">
                View Open Positions
              </button>
              <button className="border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm">
                Learn About Us
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

      {/* WHY WORK AT MA CONSULTING */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">Why Choose MA Consulting?</h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join a firm that values excellence, innovation, and professional growth.
              Here's what makes MA Consulting the perfect place to advance your career.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Innovation */}
            <div className="group">
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl group-hover:shadow-blue-500/50 transition-all">
                  <span className="text-4xl text-white">🎯</span>
                </div>
                <h3 className="text-3xl font-bold mb-6 text-gray-900">Cutting-Edge Innovation</h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Work on the latest consulting methodologies and technologies. Our team stays ahead
                  of industry trends, ensuring you work on innovative projects that drive real business transformation.
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 text-xl">✓</span>
                    <span>Access to latest consulting tools and software</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 text-xl">✓</span>
                    <span>Participation in industry-leading research projects</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 text-xl">✓</span>
                    <span>Opportunity to develop innovative solutions</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Growth */}
            <div className="group">
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl group-hover:shadow-green-500/50 transition-all">
                  <span className="text-4xl text-white">📈</span>
                </div>
                <h3 className="text-3xl font-bold mb-6 text-gray-900">Professional Growth</h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Your development is our priority. We invest in your career through continuous learning,
                  mentorship programs, and opportunities to advance your skills and expertise.
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 text-xl">✓</span>
                    <span>Annual professional development budget</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 text-xl">✓</span>
                    <span>Mentorship from industry experts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 text-xl">✓</span>
                    <span>Clear career progression paths</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Collaboration */}
            <div className="group">
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl group-hover:shadow-purple-500/50 transition-all">
                  <span className="text-4xl text-white">🤝</span>
                </div>
                <h3 className="text-3xl font-bold mb-6 text-gray-900">Collaborative Environment</h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Work alongside industry leaders and build lasting relationships with clients.
                  Our collaborative culture fosters teamwork, knowledge sharing, and mutual success.
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-3 text-xl">✓</span>
                    <span>Work with experienced consultants and partners</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-3 text-xl">✓</span>
                    <span>Build relationships with diverse client portfolio</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-3 text-xl">✓</span>
                    <span>Participate in team-based project delivery</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Career Statistics */}
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-12 rounded-3xl">
            <h3 className="text-4xl font-bold text-center mb-12 text-gray-900">Career Success at MA Consulting</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-amber-600 mb-2">95%</div>
                <div className="text-xl font-semibold text-gray-900 mb-2">Employee Satisfaction</div>
                <div className="text-gray-600">Based on annual surveys</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-orange-600 mb-2">3.2</div>
                <div className="text-xl font-semibold text-gray-900 mb-2">Years Avg Tenure</div>
                <div className="text-gray-600">Long-term commitment</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-red-600 mb-2">40+</div>
                <div className="text-xl font-semibold text-gray-900 mb-2">Training Hours</div>
                <div className="text-gray-600">Annual professional development</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-purple-600 mb-2">85%</div>
                <div className="text-xl font-semibold text-gray-900 mb-2">Promotion Rate</div>
                <div className="text-gray-600">Internal career advancement</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CURRENT OPENINGS */}
      <section className="py-24 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">Current Opportunities</h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join our growing team. We're looking for talented professionals ready to make an impact
              in the consulting industry and contribute to our clients' success.
            </p>
          </div>

          {/* Job Openings */}
          <div className="space-y-8 mb-16">
            {/* Senior Investment Consultant */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
                <div>
                  <h3 className="text-3xl font-bold mb-2 text-gray-900">Senior Investment Consultant</h3>
                  <p className="text-lg text-amber-600 font-semibold mb-2">Investment Consulting Department</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Addis Ababa, Ethiopia
                    </span>
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Full-time
                    </span>
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                      Competitive Salary
                    </span>
                  </div>
                </div>
                <div className="mt-4 lg:mt-0">
                  <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Urgent Hiring
                  </span>
                </div>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Lead investment consulting projects for high-profile clients. Provide strategic investment advice,
                portfolio management, and risk assessment services. Work directly with C-level executives to
                develop comprehensive investment strategies.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-xl font-bold mb-3 text-gray-900">Requirements</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• MBA or equivalent advanced degree</li>
                    <li>• 5+ years investment consulting experience</li>
                    <li>• CFA certification preferred</li>
                    <li>• Strong analytical and communication skills</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-3 text-gray-900">What We Offer</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Competitive salary + performance bonuses</li>
                    <li>• Professional development opportunities</li>
                    <li>• Health insurance and retirement plan</li>
                    <li>• Flexible work arrangements</li>
                  </ul>
                </div>
              </div>

              <button className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Apply for This Position
              </button>
            </div>

            {/* Business Development Manager */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
                <div>
                  <h3 className="text-3xl font-bold mb-2 text-gray-900">Business Development Manager</h3>
                  <p className="text-lg text-green-600 font-semibold mb-2">Business Development Department</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Addis Ababa, Ethiopia
                    </span>
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Full-time
                    </span>
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                      Competitive Salary + Commission
                    </span>
                  </div>
                </div>
                <div className="mt-4 lg:mt-0">
                  <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    New Position
                  </span>
                </div>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Drive business growth initiatives and develop strategic partnerships. Identify new market opportunities,
                build client relationships, and lead business development projects that expand MA Consulting's market presence.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-xl font-bold mb-3 text-gray-900">Requirements</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Bachelor's degree in Business or related field</li>
                    <li>• 3+ years business development experience</li>
                    <li>• Proven track record of generating revenue</li>
                    <li>• Excellent networking and presentation skills</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-3 text-gray-900">What We Offer</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Base salary + uncapped commission</li>
                    <li>• Lead generation support</li>
                    <li>• Marketing and business development budget</li>
                    <li>• Career growth opportunities</li>
                  </ul>
                </div>
              </div>

              <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Apply for This Position
              </button>
            </div>

            {/* Tax Consultant */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
                <div>
                  <h3 className="text-3xl font-bold mb-2 text-gray-900">Tax Consultant</h3>
                  <p className="text-lg text-orange-600 font-semibold mb-2">Tax & Customs Department</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Addis Ababa, Ethiopia
                    </span>
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Full-time
                    </span>
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                      Competitive Salary
                    </span>
                  </div>
                </div>
                <div className="mt-4 lg:mt-0">
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Immediate Start
                  </span>
                </div>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Provide expert tax consulting services to clients. Conduct tax planning, ensure compliance
                with Ethiopian tax regulations, and optimize clients' tax positions through strategic advice
                and implementation support.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-xl font-bold mb-3 text-gray-900">Requirements</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Accounting or Finance degree</li>
                    <li>• Tax certification (ACCA, CPA preferred)</li>
                    <li>• 2+ years tax consulting experience</li>
                    <li>• Knowledge of Ethiopian tax laws</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-3 text-gray-900">What We Offer</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Competitive salary package</li>
                    <li>• Professional tax certifications support</li>
                    <li>• Continuous learning opportunities</li>
                    <li>• Work-life balance initiatives</li>
                  </ul>
                </div>
              </div>

              <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Apply for This Position
              </button>
            </div>
          </div>

          {/* Application Process */}
          <div className="bg-gradient-to-r from-slate-100 to-gray-200 p-12 rounded-3xl">
            <h3 className="text-4xl font-bold text-center mb-12 text-gray-900">Our Application Process</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl text-white font-bold shadow-lg">
                  1
                </div>
                <h4 className="text-xl font-bold mb-3 text-gray-900">Submit Application</h4>
                <p className="text-gray-600 leading-relaxed">
                  Send your resume and cover letter through our application form. Include relevant experience and achievements.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl text-white font-bold shadow-lg">
                  2
                </div>
                <h4 className="text-xl font-bold mb-3 text-gray-900">Initial Screening</h4>
                <p className="text-gray-600 leading-relaxed">
                  Our HR team reviews applications within 3-5 business days and conducts initial phone screenings.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl text-white font-bold shadow-lg">
                  3
                </div>
                <h4 className="text-xl font-bold mb-3 text-gray-900">Interviews</h4>
                <p className="text-gray-600 leading-relaxed">
                  Multiple interview rounds including technical assessments and meetings with team leaders and partners.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl text-white font-bold shadow-lg">
                  4
                </div>
                <h4 className="text-xl font-bold mb-3 text-gray-900">Offer & Onboarding</h4>
                <p className="text-gray-600 leading-relaxed">
                  Successful candidates receive competitive offers and begin comprehensive onboarding within 2 weeks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EMPLOYEE BENEFITS */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Comprehensive Benefits Package</h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We value our employees and offer competitive benefits to support your professional and personal well-being.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                🏥
              </div>
              <h3 className="text-2xl font-bold mb-4">Health & Wellness</h3>
              <ul className="space-y-3 text-lg">
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>Comprehensive health insurance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>Dental and vision coverage</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>Mental health support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>Annual health check-ups</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                📚
              </div>
              <h3 className="text-2xl font-bold mb-4">Professional Development</h3>
              <ul className="space-y-3 text-lg">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">✓</span>
                  <span>Annual training budget ($2,000+)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">✓</span>
                  <span>Certification reimbursement</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">✓</span>
                  <span>Conference attendance support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">✓</span>
                  <span>Mentorship programs</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                ⚖️
              </div>
              <h3 className="text-2xl font-bold mb-4">Work-Life Balance</h3>
              <ul className="space-y-3 text-lg">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3">✓</span>
                  <span>Flexible working hours</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3">✓</span>
                  <span>Remote work options</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3">✓</span>
                  <span>30+ days annual leave</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3">✓</span>
                  <span>Parental leave support</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                💰
              </div>
              <h3 className="text-2xl font-bold mb-4">Financial Benefits</h3>
              <ul className="space-y-3 text-lg">
                <li className="flex items-start">
                  <span className="text-orange-400 mr-3">✓</span>
                  <span>Competitive salary packages</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-3">✓</span>
                  <span>Performance-based bonuses</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-3">✓</span>
                  <span>Retirement savings plan</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-3">✓</span>
                  <span>Employee stock options</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-500 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                🎉
              </div>
              <h3 className="text-2xl font-bold mb-4">Company Culture</h3>
              <ul className="space-y-3 text-lg">
                <li className="flex items-start">
                  <span className="text-red-400 mr-3">✓</span>
                  <span>Team building events</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-3">✓</span>
                  <span>Recognition programs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-3">✓</span>
                  <span>Casual dress code</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-3">✓</span>
                  <span>Open communication</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-500 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                🚀
              </div>
              <h3 className="text-2xl font-bold mb-4">Career Growth</h3>
              <ul className="space-y-3 text-lg">
                <li className="flex items-start">
                  <span className="text-teal-400 mr-3">✓</span>
                  <span>Clear promotion paths</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-400 mr-3">✓</span>
                  <span>Internal job opportunities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-400 mr-3">✓</span>
                  <span>Leadership development</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-400 mr-3">✓</span>
                  <span>International exposure</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-24 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">Ready to Join Our Team?</h2>
          <p className="text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
            Take the next step in your career with MA Consulting. We're looking for talented,
            passionate professionals ready to make a difference. Apply today and be part of
            Ethiopia's leading consulting firm.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-gray-900 px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              Apply for Open Positions
            </button>
            <button className="border-2 border-white/50 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/10 hover:border-white transition-all duration-300">
              Send Us Your Resume
            </button>
          </div>

          <div className="mt-12 text-center">
            <p className="text-xl text-orange-200 mb-4">Don't see a perfect match?</p>
            <p className="text-lg text-orange-100">
              Send us your resume anyway. We're always interested in meeting talented professionals
              who share our passion for business excellence.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}