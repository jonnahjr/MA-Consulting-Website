const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 text-white relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Animated geometric shapes */}
        {[...Array(15)].map((_, i) => (
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
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-sm"></div>
          </div>
        ))}

        {/* Gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/10 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-purple-900/10 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Company Branding & Description */}
          <div className="lg:col-span-4 animate-fade-in-up">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-2xl text-white font-bold">MA</span>
              </div>
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  MA Consulting
                </h3>
                <p className="text-sm text-gray-400 font-medium">Professional Business Solutions</p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed mb-8 text-lg">
              Ethiopia's premier consulting firm, delivering world-class expertise in investment consulting,
              business development, tax services, and strategic planning since 2010. Your trusted partner
              for sustainable business growth and success.
            </p>

            {/* Company Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">13+</div>
                <div className="text-sm text-gray-400">Years</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">500+</div>
                <div className="text-sm text-gray-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">200+</div>
                <div className="text-sm text-gray-400">Clients</div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a href="#" className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-110">
                <span className="text-white text-lg">in</span>
              </a>
              <a href="#" className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-110">
                <span className="text-white text-lg">🐦</span>
              </a>
              <a href="#" className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-110">
                <span className="text-white text-lg">📘</span>
              </a>
              <a href="#" className="w-12 h-12 bg-gradient-to-br from-pink-600 to-pink-700 rounded-2xl flex items-center justify-center hover:shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-110">
                <span className="text-white text-lg">📷</span>
              </a>
            </div>
          </div>

          {/* Services Section */}
          <div className="lg:col-span-2 animate-fade-in-up delay-100">
            <h4 className="text-2xl font-bold mb-8 text-white">Our Services</h4>
            <ul className="space-y-4">
              <li>
                <a href="/services" className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 group-hover:bg-blue-400 transition-colors"></span>
                  <span className="text-lg">Investment Consulting</span>
                </a>
              </li>
              <li>
                <a href="/services" className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3 group-hover:bg-green-400 transition-colors"></span>
                  <span className="text-lg">Business Development</span>
                </a>
              </li>
              <li>
                <a href="/services" className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 group-hover:bg-purple-400 transition-colors"></span>
                  <span className="text-lg">Marketing Strategies</span>
                </a>
              </li>
              <li>
                <a href="/services" className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 group-hover:bg-orange-400 transition-colors"></span>
                  <span className="text-lg">Tax & Customs</span>
                </a>
              </li>
              <li>
                <a href="/services" className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2">
                  <span className="w-2 h-2 bg-teal-500 rounded-full mr-3 group-hover:bg-teal-400 transition-colors"></span>
                  <span className="text-lg">Development Works</span>
                </a>
              </li>
              <li>
                <a href="/services" className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3 group-hover:bg-pink-400 transition-colors"></span>
                  <span className="text-lg">Dedicated Support</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 animate-fade-in-up delay-200">
            <h4 className="text-2xl font-bold mb-8 text-white">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <a href="/" className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2">
                  <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3"></span>
                  <span className="text-lg">Home</span>
                </a>
              </li>
              <li>
                <a href="/about" className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2">
                  <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-3"></span>
                  <span className="text-lg">About Us</span>
                </a>
              </li>
              <li>
                <a href="/team" className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2">
                  <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3"></span>
                  <span className="text-lg">Our Team</span>
                </a>
              </li>
              <li>
                <a href="/blog" className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2">
                  <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mr-3"></span>
                  <span className="text-lg">Blog & Insights</span>
                </a>
              </li>
              <li>
                <a href="/careers" className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2">
                  <span className="w-2 h-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mr-3"></span>
                  <span className="text-lg">Careers</span>
                </a>
              </li>
              <li>
                <a href="/contact" className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2">
                  <span className="w-2 h-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full mr-3"></span>
                  <span className="text-lg">Contact Us</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-2 animate-fade-in-up delay-300">
            <h4 className="text-2xl font-bold mb-8 text-white">Get In Touch</h4>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl">📞</span>
                </div>
                <div>
                  <h5 className="text-lg font-semibold text-white mb-1">Phone</h5>
                  <p className="text-gray-300">+251 911 123 456</p>
                  <p className="text-sm text-gray-400">Mon-Fri 9AM-6PM EAT</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl">✉</span>
                </div>
                <div>
                  <h5 className="text-lg font-semibold text-white mb-1">Email</h5>
                  <p className="text-gray-300">info@maconsulting.com</p>
                  <p className="text-sm text-gray-400">Response within 2 hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl">📍</span>
                </div>
                <div>
                  <h5 className="text-lg font-semibold text-white mb-1">Office</h5>
                  <p className="text-gray-300">Bole Medhanealem<br />Addis Ababa, Ethiopia</p>
                  <p className="text-sm text-gray-400">By appointment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications & Accreditations */}
          <div className="lg:col-span-2 animate-fade-in-up delay-400">
            <h4 className="text-2xl font-bold mb-8 text-white">Certifications</h4>
            <div className="space-y-4">
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-lg">🏆</span>
                  </div>
                  <div>
                    <h5 className="text-lg font-semibold text-white">ISO 9001 Certified</h5>
                    <p className="text-sm text-gray-400">Quality Management Systems</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-lg">📋</span>
                  </div>
                  <div>
                    <h5 className="text-lg font-semibold text-white">Licensed Consultants</h5>
                    <p className="text-sm text-gray-400">Ethiopian Business Law</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-lg">🎓</span>
                  </div>
                  <div>
                    <h5 className="text-lg font-semibold text-white">Certified Professionals</h5>
                    <p className="text-sm text-gray-400">MBA & Industry Certifications</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-12 animate-fade-in-up">
          <div className="text-center max-w-4xl mx-auto">
            <h4 className="text-3xl font-bold mb-4 text-white">Stay Updated with Industry Insights</h4>
            <p className="text-xl text-gray-300 mb-8">
              Subscribe to our newsletter for exclusive business insights, market trends, and strategic advice
              delivered directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
              />
              <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700/50 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Copyright & Legal */}
            <div className="space-y-4">
              <p className="text-gray-400 text-lg">
                &copy; 2024 MA Consulting PLC. All rights reserved.
              </p>
              <div className="flex flex-wrap gap-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-lg hover:underline">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-lg hover:underline">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-lg hover:underline">
                  Cookie Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-lg hover:underline">
                  Accessibility
                </a>
              </div>
            </div>

            {/* Company Info & Accreditation */}
            <div className="text-right space-y-4">
              <div className="text-gray-300">
                <p className="text-lg font-semibold">MA Consulting PLC</p>
                <p className="text-sm">Business Registration: ET123456789</p>
                <p className="text-sm">Addis Ababa, Ethiopia</p>
              </div>
              <div className="flex justify-end space-x-4">
                <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Licensed
                </span>
                <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Certified
                </span>
                <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Accredited
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer