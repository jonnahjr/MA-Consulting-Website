import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import maLogo from '../assets/images/team/ma.png?url'

const Header = () => {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const navItems = [
    { path: '/', label: 'Home', description: 'Welcome & Overview' },
    { path: '/about', label: 'About', description: 'Our Story & Mission' },
    { path: '/services', label: 'Services', description: 'Expert Consulting' },
    { path: '/team', label: 'Team', description: 'Leadership & Experts' },
    { path: '/blog', label: 'Blog', description: 'Insights & News' },
    { path: '/careers', label: 'Careers', description: 'Join Our Team' },
    { path: '/contact', label: 'Contact', description: 'Get In Touch' },
  ]

  const handleGetConsultation = () => {
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
    setOpen(false) // Close mobile menu if open
  }

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
  <nav className="container mx-auto px-4 py-4">
    <div className="flex justify-between items-center">
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300"
      >
        {/* Use image instead of gradient box */}
        <img
          src={maLogo}
          alt="MA Consulting Logo"
          className="w-12 h-12 object-contain rounded-md shadow-lg"
          onError={(e) => {
            // Fallback to text logo if image fails to load
            const parent = e.currentTarget.parentElement!;
            parent.innerHTML = '<div class="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg"><span class="text-lg text-white font-bold">MA</span></div>';
          }}
        />
        <div className="hidden sm:block">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            MA Consulting
          </h1>
        </div>
      </Link>

      {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-colors duration-300 hover:text-blue-600 ${
                  location.pathname === item.path
                    ? 'text-blue-600'
                    : 'text-gray-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={handleGetConsultation}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Get Consultation
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center"
            aria-label="Toggle menu"
            onClick={() => setOpen(v => !v)}
          >
            <span className="text-lg font-semibold text-gray-700">{open ? '✕' : '☰'}</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={`block py-3 px-4 rounded-lg transition-colors duration-300 ${
                    location.pathname === item.path
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={handleGetConsultation}
                  className="block w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-lg font-semibold text-center hover:shadow-lg transition-all duration-300"
                >
                  Get Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header