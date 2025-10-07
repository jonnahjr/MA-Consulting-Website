import { useState } from 'react'
import maLogo from '../assets/images/team/ma.png'

const Footer = () => {
  const [logoError, setLogoError] = useState(false)
  return (
    <footer className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white py-8 border-t-4 border-orange-500">
      <div className="w-full px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 mb-8">
          {/* Company Branding & Description */}
          <div className="lg:col-span-4">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-slate-600 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
                {logoError ? (
                  <span className="text-2xl text-white font-bold">MA</span>
                ) : (
                  <img
                    src={maLogo}
                    alt="MA Consulting Logo"
                    className="w-full h-full object-cover"
                    onError={() => setLogoError(true)}
                  />
                )}
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">
                  MA Consulting
                </h3>
                <p className="text-sm text-gray-400 font-medium">Professional Business Solutions</p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed mb-6 text-base">
              Ethiopia's premier consulting firm delivering expertise in investment, business development, tax services, and strategic planning since 2010.
            </p>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com/company/ma-consulting-ethiopia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              <a
                href="https://twitter.com/MAConsultingET"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              <a
                href="https://facebook.com/MAConsultingEthiopia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              <a
                href="https://instagram.com/ma_consulting_et"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C8.396 0 7.609.035 6.298.129c-1.31.094-2.207.447-2.996.95a5.942 5.942 0 00-2.144 2.144c-.503.789-.856 1.686-.95 2.996C.035 7.609 0 8.396 0 12.017s.035 4.408.129 5.719c.094 1.31.447 2.207.95 2.996a5.942 5.942 0 002.144 2.144c.789.503 1.686.856 2.996.95 1.31.094 2.098.129 5.719.129s4.408-.035 5.719-.129c1.31-.094 2.207-.447 2.996-.95a5.942 5.942 0 002.144-2.144c.503-.789.856-1.686.95-2.996.094-1.31.129-2.098.129-5.719s-.035-4.408-.129-5.719c-.094-1.31-.447-2.207-.95-2.996a5.942 5.942 0 00-2.144-2.144c-.789-.503-1.686-.856-2.996-.95C16.425.035 15.638 0 12.017 0zm0 2.281c3.567 0 3.99.014 5.397.078 1.285.059 1.976.27 2.434.45.596.234 1.022.516 1.469.963.447.447.729.873.963 1.469.18.458.391 1.149.45 2.434.064 1.407.078 1.83.078 5.397s-.014 3.99-.078 5.397c-.059 1.285-.27 1.976-.45 2.434-.234.596-.516 1.022-.963 1.469-.447.447-.873.729-1.469.963-.458.18-1.149.391-2.434.45-1.407.064-1.83.078-5.397.078s-3.99-.014-5.397-.078c-1.285-.059-1.976-.27-2.434-.45-.596-.234-1.022-.516-1.469-.963-.447-.447-.729-.873-.963-1.469-.18-.458-.391-1.149-.45-2.434-.064-1.407-.078-1.83-.078-5.397s.014-3.99.078-5.397c.059-1.285.27-1.976.45-2.434.234-.596.516-1.022.963-1.469.447-.447.873-.729 1.469-.963.458-.18 1.149-.391 2.434-.45 1.407-.064 1.83-.078 5.397-.078zm0 17.734c-3.681 0-6.656-2.975-6.656-6.656s2.975-6.656 6.656-6.656 6.656 2.975 6.656 6.656-2.975 6.656-6.656 6.656zm0-11.063c-2.42 0-4.375 1.955-4.375 4.375s1.955 4.375 4.375 4.375 4.375-1.955 4.375-4.375-1.955-4.375-4.375-4.375zm8.531-2.344c0 .812-.656 1.469-1.469 1.469s-1.469-.656-1.469-1.469.656-1.469 1.469-1.469 1.469.656 1.469 1.469z"/>
                </svg>
              </a>

              <a
                href="mailto:info@maconsulting.com"
                className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                aria-label="Email"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services Section */}
          <div className="lg:col-span-2">
            <h4 className="text-xl font-bold mb-6 text-white">Our Services</h4>
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
          <div className="lg:col-span-2">
            <h4 className="text-xl font-bold mb-6 text-white">Quick Links</h4>
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
          <div className="lg:col-span-2">
            <h4 className="text-xl font-bold mb-6 text-white">Get In Touch</h4>
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

        </div>



        {/* Bottom Footer */}
        <div className="border-t border-gray-700/50 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; 2024 MA Consulting PLC. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm hover:underline">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm hover:underline">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm hover:underline">
                Cookie Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm hover:underline">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer