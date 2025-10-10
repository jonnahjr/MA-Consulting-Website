import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import maLogo from '../assets/images/team/ma.png'

interface ContactInfo {
  id: string
  type: string
  label: string
  value: string
  platform?: string
  icon?: string
  isActive: boolean
  sortOrder: number
}

const Footer = () => {
  const location = useLocation()
  const [logoError, setLogoError] = useState(false)
  const [contactInfo, setContactInfo] = useState<{
    social: ContactInfo[]
    phones: ContactInfo[]
    emails: ContactInfo[]
    addresses: ContactInfo[]
    websites: ContactInfo[]
  }>({
    social: [],
    phones: [],
    emails: [],
    addresses: [],
    websites: []
  })

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'

        // Fetch all contact info
        const response = await fetch(`${apiUrl}/api/contact-info`)
        if (response.ok) {
          const allContacts: ContactInfo[] = await response.json()

          // Group by type
          const grouped = allContacts.reduce((acc, contact) => {
            if (!acc[contact.type]) acc[contact.type] = []
            acc[contact.type].push(contact)
            return acc
          }, {} as Record<string, ContactInfo[]>)

          setContactInfo({
            social: grouped.social || [],
            phones: grouped.phone || [],
            emails: grouped.email || [],
            addresses: grouped.address || [],
            websites: grouped.website || []
          })
        } else {
          // Use fallback data if API fails
          setContactInfo({
            social: [
              { id: 'fb', type: 'social', label: 'Facebook', value: 'https://facebook.com/ma.services.solution', platform: 'facebook', isActive: true, sortOrder: 1 },
              { id: 'ln', type: 'social', label: 'LinkedIn', value: 'https://linkedin.com/company/ma-services-solution', platform: 'linkedin', isActive: true, sortOrder: 2 },
              { id: 'tw', type: 'social', label: 'Twitter', value: 'https://twitter.com/ma_services', platform: 'twitter', isActive: true, sortOrder: 3 },
              { id: 'ig', type: 'social', label: 'Instagram', value: 'https://instagram.com/ma_services_solution', platform: 'instagram', isActive: true, sortOrder: 4 }
            ],
            phones: [
              { id: 'phone1', type: 'phone', label: 'Main Office', value: '+251 911 123 456', isActive: true, sortOrder: 1 },
              { id: 'phone2', type: 'phone', label: 'Business Development', value: '+251 922 654 321', isActive: true, sortOrder: 2 }
            ],
            emails: [
              { id: 'email1', type: 'email', label: 'General Inquiries', value: 'info@maservices.com', isActive: true, sortOrder: 1 },
              { id: 'email2', type: 'email', label: 'Business Development', value: 'business@maservices.com', isActive: true, sortOrder: 2 }
            ],
            addresses: [
              { id: 'addr1', type: 'address', label: 'Head Office', value: '123 Business District\nAddis Ababa, Ethiopia\nP.O. Box 12345', isActive: true, sortOrder: 1 }
            ],
            websites: [
              { id: 'web1', type: 'website', label: 'Company Website', value: 'https://maservices.com', isActive: true, sortOrder: 1 }
            ]
          })
        }
      } catch (error) {
        console.error('Failed to fetch contact info:', error)
        // Use fallback data if API fails
        setContactInfo({
          social: [
            { id: '1', type: 'social', label: 'LinkedIn', value: 'https://linkedin.com/company/ma-services-solution', platform: 'linkedin', isActive: true, sortOrder: 1 },
            { id: '2', type: 'social', label: 'Twitter', value: 'https://twitter.com/ma_services', platform: 'twitter', isActive: true, sortOrder: 2 },
            { id: '3', type: 'social', label: 'Facebook', value: 'https://facebook.com/ma.services.solution', platform: 'facebook', isActive: true, sortOrder: 3 },
            { id: '4', type: 'social', label: 'Instagram', value: 'https://instagram.com/ma_services_solution', platform: 'instagram', isActive: true, sortOrder: 4 }
          ],
          phones: [
            { id: '5', type: 'phone', label: 'Main Office', value: '+251 911 123 456', isActive: true, sortOrder: 1 },
            { id: '6', type: 'phone', label: 'Business Line', value: '+251 922 654 321', isActive: true, sortOrder: 2 }
          ],
          emails: [
            { id: '7', type: 'email', label: 'General Inquiries', value: 'info@maservices.com', isActive: true, sortOrder: 1 },
            { id: '8', type: 'email', label: 'Business Development', value: 'business@maservices.com', isActive: true, sortOrder: 2 }
          ],
          addresses: [
            { id: '9', type: 'address', label: 'Head Office', value: '123 Business District\nAddis Ababa, Ethiopia\nP.O. Box 12345', isActive: true, sortOrder: 1 }
          ],
          websites: [
            { id: '10', type: 'website', label: 'Company Website', value: 'https://maservices.com', isActive: true, sortOrder: 1 }
          ]
        })
      }
    }

    fetchContactInfo()
  }, [])

  return (
    <>
      <footer className="bg-black/90 backdrop-blur-md text-white py-8 border-t-4 border-orange-500 relative z-10">
        <div className="w-full px-6">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 mb-8">
          {/* Company Branding & Description */}
          <div className="lg:col-span-4">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
                {logoError ? (
                  <span className="text-3xl text-gray-800 font-bold">MS</span>
                ) : (
                  <img
                    src={maLogo}
                    alt="Ma Services Solution Logo"
                    className="w-full h-full object-cover"
                    onError={() => setLogoError(true)}
                  />
                )}
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">
                  Ma Services Solution
                </h3>
                <p className="text-sm text-gray-200 font-medium">Professional Business Solutions</p>
              </div>
            </div>

            <p className="text-gray-200 leading-relaxed mb-6 text-base">
              Maservicessolution your reliable service solution provider in Ethiopia. We are a team of skilled expediters dedicated to assisting businesses with their expediting needs. Whether you require document processing, transportation arrangements, or any other expediting activities, we have the expertise to streamline your operations and save you time and resources.
            </p>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              {contactInfo.social.map((social) => {
                const getIcon = (platform: string) => {
                  switch (platform) {
                    case 'linkedin':
                      return (
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      )
                    case 'twitter':
                      return (
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      )
                    case 'facebook':
                      return (
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      )
                    case 'instagram':
                      return (
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.017 0C8.396 0 7.609.035 6.298.129c-1.31.094-2.207.447-2.996.95a5.942 5.942 0 00-2.144 2.144c-.503.789-.856 1.686-.95 2.996C.035 7.609 0 8.396 0 12.017s.035 4.408.129 5.719c.094 1.31.447 2.207.95 2.996a5.942 5.942 0 002.144 2.144c.789.503 1.686.856 2.996.95 1.31.094 2.098.129 5.719.129s4.408-.035 5.719-.129c1.31-.094 2.207-.447 2.996-.95a5.942 5.942 0 002.144-2.144c.503-.789.856-1.686.95-2.996.094-1.31.129-2.098.129-5.719s-.035-4.408-.129-5.719c-.094-1.31-.447-2.207-.95-2.996a5.942 5.942 0 00-2.144-2.144c-.789-.503-1.686-.856-2.996-.95C16.425.035 15.638 0 12.017 0zm0 2.281c3.567 0 3.99.014 5.397.078 1.285.059 1.976.27 2.434.45.596.234 1.022.516 1.469.963.447.447.729.873.963 1.469.18.458.391 1.149.45 2.434.064 1.407.078 1.83.078 5.397s-.014 3.99-.078 5.397c-.059 1.285-.27 1.976-.45 2.434-.234.596-.516 1.022-.963 1.469-.447.447-.873.729-1.469.963-.458.18-1.149.391-2.434.45-1.407.064-1.83.078-5.397.078s-3.99-.014-5.397-.078c-1.285-.059-1.976-.27-2.434-.45-.596-.234-1.022-.516-1.469-.963-.447-.447-.729-.873-.963-1.469-.18-.458-.391-1.149-.45-2.434-.064-1.407-.078-1.83-.078-5.397s.014-3.99.078-5.397c.059-1.285.27-1.976.45-2.434.234-.596.516-1.022.963-1.469.447-.447.873-.729 1.469-.963.458-.18 1.149-.391 2.434-.45 1.407-.064 1.83-.078 5.397-.078zm0 17.734c-3.681 0-6.656-2.975-6.656-6.656s2.975-6.656 6.656-6.656 6.656 2.975 6.656 6.656-2.975 6.656-6.656 6.656zm0-11.063c-2.42 0-4.375 1.955-4.375 4.375s1.955 4.375 4.375 4.375 4.375-1.955 4.375-4.375-1.955-4.375-4.375-4.375zm8.531-2.344c0 .812-.656 1.469-1.469 1.469s-1.469-.656-1.469-1.469.656-1.469 1.469-1.469 1.469.656 1.469 1.469z"/>
                        </svg>
                      )
                    case 'tiktok':
                      return (
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                        </svg>
                      )
                    case 'telegram':
                      return (
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-1.447-1.238-1.447-1.238s-.155-.097-.446-.096c-.106 0-.242.042-.371.103-.15.072-.333.21-.333.21s-.334.193-.507.274c-.843.403-1.546.724-2.362.727-.604 0-1.114-.342-1.114-.342s-.649-.425-.63-1.339c.02-.913.728-2.06 1.01-2.516.283-.456.548-.689.548-.689s.31-.207.403-.297c.094-.09.19-.192.19-.192s.418-1.37.627-2.058c.21-.687.273-.877.273-.877s.103-.09.103-.09c.093-.09.29-.09.29-.09s1.976-.746 3.482-.746c1.505 0 2.12.746 2.12.746s.187.09.287.09c.1 0 .19-.09.19-.09s.063.19.273.877c.21.687.627 2.058.627 2.058s.096.093.19.192c.094.099.403.297.403.297s.265.233.548.689c.282.456.99 1.603.99 1.603s.21.913-.63 1.339c-.841.426-1.346.727-2.362.727-.604 0-1.114-.342-1.114-.342s-.155-.097-.446-.096c-.106 0-.242.042-.371.103-.15.072-.333.21-.333.21s-.334.193-.507.274c-.843.403-1.546.724-2.362.727-.604 0-1.114-.342-1.114-.342s-.649-.425-.63-1.339c.02-.913.728-2.06 1.01-2.516.283-.456.548-.689.548-.689s.31-.207.403-.297c.094-.09.19-.192.19-.192s.418-1.37.627-2.058c.21-.687.273-.877.273-.877s.103-.09.103-.09c.093-.09.29-.09.29-.09s1.976-.746 3.482-.746c1.505 0 2.12.746 2.12.746s.187.09.287.09c.1 0 .19-.09.19-.09s.063.19.273.877c.21.687.627 2.058.627 2.058s.096.093.19.192c.094.099.403.297.403.297s.265.233.548.689c.282.456.99 1.603.99 1.603s.21.913-.63 1.339z"/>
                        </svg>
                      )
                    default:
                      return (
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      )
                  }
                }

                const getBgColor = (platform: string) => {
                  switch (platform) {
                    case 'linkedin': return 'bg-blue-600 hover:bg-blue-700'
                    case 'twitter': return 'bg-blue-400 hover:bg-blue-500'
                    case 'facebook': return 'bg-blue-600 hover:bg-blue-700'
                    case 'instagram': return 'bg-pink-500 hover:bg-pink-600'
                    case 'tiktok': return 'bg-black hover:bg-gray-800'
                    case 'telegram': return 'bg-blue-500 hover:bg-blue-600'
                    default: return 'bg-gray-600 hover:bg-gray-700'
                  }
                }

                return (
                  <a
                    key={social.id}
                    href={social.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 ${getBgColor(social.platform || '')} rounded-lg flex items-center justify-center transition-colors`}
                    aria-label={social.label}
                  >
                    {getIcon(social.platform || '')}
                  </a>
                )
              })}

              {/* Email link - separate from social media */}
              {contactInfo.emails.length > 0 && (
                <a
                  href={`mailto:${contactInfo.emails[0].value}`}
                  className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                  aria-label="Email"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Services Section */}
          <div className="lg:col-span-2">
            <h4 className="text-xl font-bold mb-6 text-white">Our Services</h4>
            <ul className="space-y-4">
              <li>
                <a href={location.pathname === '/services' ? '#investment-consulting' : '/services#investment-consulting'} className="group flex items-center text-white transition-all duration-300">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 group-hover:bg-blue-400 transition-colors"></span>
                  <span className="text-lg">Investment Consulting</span>
                </a>
              </li>
              <li>
                <a href={location.pathname === '/services' ? '#business-development' : '/services#business-development'} className="group flex items-center text-white transition-all duration-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3 group-hover:bg-green-400 transition-colors"></span>
                  <span className="text-lg">Business Development</span>
                </a>
              </li>
              <li>
                <a href={location.pathname === '/services' ? '#marketing-strategies' : '/services#marketing-strategies'} className="group flex items-center text-white transition-all duration-300">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 group-hover:bg-purple-400 transition-colors"></span>
                  <span className="text-lg">Marketing Strategies</span>
                </a>
              </li>
              <li>
                <a href={location.pathname === '/services' ? '#tax-customs' : '/services#tax-customs'} className="group flex items-center text-white transition-all duration-300">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 group-hover:bg-orange-400 transition-colors"></span>
                  <span className="text-lg">Tax & Customs</span>
                </a>
              </li>
              <li>
                <a href={location.pathname === '/services' ? '#development-works' : '/services#development-works'} className="group flex items-center text-white transition-all duration-300">
                  <span className="w-2 h-2 bg-teal-500 rounded-full mr-3 group-hover:bg-teal-400 transition-colors"></span>
                  <span className="text-lg">Development Works</span>
                </a>
              </li>
              <li>
                <a href={location.pathname === '/services' ? '#dedicated-support' : '/services#dedicated-support'} className="group flex items-center text-white transition-all duration-300">
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
                <a href="/" className="group flex items-center text-white transition-all duration-300">
                  <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3"></span>
                  <span className="text-lg">Home</span>
                </a>
              </li>
              <li>
                <a href="/about" className="group flex items-center text-white transition-all duration-300">
                  <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-3"></span>
                  <span className="text-lg">About Us</span>
                </a>
              </li>
              <li>
                <a href="/team" className="group flex items-center text-white transition-all duration-300">
                  <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3"></span>
                  <span className="text-lg">Our Team</span>
                </a>
              </li>
              <li>
                <a href="/testimonials" className="group flex items-center text-white transition-all duration-300">
                  <span className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mr-3"></span>
                  <span className="text-lg">Testimonials</span>
                </a>
              </li>
              <li>
                <a href="/blog" className="group flex items-center text-white transition-all duration-300">
                  <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mr-3"></span>
                  <span className="text-lg">Blog & Insights</span>
                </a>
              </li>
              <li>
                <a href="/careers" className="group flex items-center text-white transition-all duration-300">
                  <span className="w-2 h-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mr-3"></span>
                  <span className="text-lg">Careers</span>
                </a>
              </li>
              <li>
                <a href="/contact" className="group flex items-center text-white transition-all duration-300">
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
              {/* Phone Numbers */}
              {contactInfo.phones.length > 0 && (
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-xl">📞</span>
                  </div>
                  <div>
                    <h5 className="text-lg font-semibold text-white mb-1">Phone</h5>
                    {contactInfo.phones.map((phone, index) => (
                      <p key={phone.id} className={index === 0 ? "text-gray-200" : "text-sm text-gray-300"}>
                        {phone.value}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Email Addresses */}
              {contactInfo.emails.length > 0 && (
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-xl">✉</span>
                  </div>
                  <div>
                    <h5 className="text-lg font-semibold text-white mb-1">Email</h5>
                    {contactInfo.emails.map((email, index) => (
                      <p key={email.id} className={index === 0 ? "text-gray-200" : "text-sm text-gray-300"}>
                        {email.value}
                      </p>
                    ))}
                    <p className="text-sm text-gray-300">Response within 2 hours</p>
                  </div>
                </div>
              )}


              {/* Office Addresses */}
              {contactInfo.addresses.length > 0 && (
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-xl">📍</span>
                  </div>
                  <div>
                    <h5 className="text-lg font-semibold text-white mb-1">Office</h5>
                    {contactInfo.addresses.map((address) => (
                      <div key={address.id}>
                        <p className="text-gray-200 whitespace-pre-line">{address.value}</p>
                      </div>
                    ))}
                    <p className="text-sm text-gray-300">By appointment</p>
                  </div>
                </div>
              )}
            </div>
          </div>
</div>



{/* Bottom Footer */}
        <div className="border-t border-gray-700/50 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; 2024 Ma Services Solution PLC. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm text-center">
              Developed by Yonas Bogale
            </p>
            <div className="flex flex-wrap gap-6">
              <a href="/admin" className="text-gray-200 transition-colors duration-300 text-sm hover:underline">
                Admin Panel
              </a>
              <a href="/privacy-policy" className="text-gray-200 transition-colors duration-300 text-sm hover:underline">
                Privacy Policy
              </a>
              <a href="/terms-of-service" className="text-gray-200 transition-colors duration-300 text-sm hover:underline">
                Terms of Service
              </a>
              <a href="/cookie-policy" className="text-gray-200 transition-colors duration-300 text-sm hover:underline">
                Cookie Policy
              </a>
              <a href="/accessibility" className="text-gray-200 transition-colors duration-300 text-sm hover:underline">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </>
  )
}

export default Footer
