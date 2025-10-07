import Meta from '../components/Meta'
import ContactForm from '../components/ContactForm'
import { useRef } from 'react'

export function Contact() {
  const contactFormRef = useRef<HTMLDivElement>(null)

  const scrollToContactForm = () => {
    contactFormRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handlePhoneCall = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`
  }

  const handleEmail = (email: string) => {
    window.location.href = `mailto:${email}`
  }

  return (
    <>
      <Meta title="Contact Ma Services Solution - Get Expert Business Consulting" description="Ready to transform your business? Contact Ma Services Solution for expert investment consulting, business development, tax services, and strategic guidance. Get in touch today." />

      {/* HERO SECTION - Large and Professional */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-red-900 to-pink-900 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-600/20 to-red-600/20"></div>
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
              <span className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-3 rounded-full text-lg font-semibold uppercase tracking-wider shadow-lg">
                Get In Touch
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-orange-100 to-red-100 bg-clip-text text-transparent leading-tight">
              Let's Start
              <br />
              <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                Your Success Story
              </span>
            </h1>

            <p className="text-2xl md:text-3xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto">
              Ready to transform your business? Our expert consultants are here to help you navigate
              challenges, seize opportunities, and achieve sustainable growth. Let's discuss how we
              can drive your success together.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
               <button
                 onClick={scrollToContactForm}
                 className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105 animate-pulse-glow"
               >
                 Schedule Consultation
               </button>
               <button
                 onClick={() => handlePhoneCall('+251911123456')}
                 className="border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
               >
                 Call Us Now
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

      {/* CONTACT INFORMATION SECTION */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">Multiple Ways to Connect</h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose the contact method that works best for you. Our team is available through various channels
              to ensure you get the support you need when you need it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Email Contact */}
            <div className="group cursor-pointer" onClick={() => handleEmail('info@maconsulting.com')}>
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-blue-500/50 transition-all">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Email Us</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Send us detailed inquiries about your consulting needs. We respond within 2 hours during business hours.
                </p>
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-blue-600 hover:text-blue-700 transition-colors">info@maconsulting.com</p>
                  <p className="text-sm text-gray-500">General inquiries & consultations</p>
                </div>
                <div className="mt-4 text-sm text-green-600 font-semibold">
                  ✓ Response within 2 hours
                </div>
              </div>
            </div>

            {/* Phone Contact */}
            <div className="group cursor-pointer" onClick={() => handlePhoneCall('+251911123456')}>
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-green-500/50 transition-all">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Call Us</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Speak directly with our consultants for immediate assistance and personalized guidance.
                </p>
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-green-600 hover:text-green-700 transition-colors">+251 911 123 456</p>
                  <p className="text-sm text-gray-500">Direct line to consulting team</p>
                </div>
                <div className="mt-4 text-sm text-green-600 font-semibold">
                  ✓ Mon-Fri 9AM-6PM EAT
                </div>
              </div>
            </div>

            {/* Office Location */}
            <div className="group">
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-purple-500/50 transition-all">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Visit Our Office</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Schedule an in-person meeting at our Addis Ababa headquarters for detailed consultations.
                </p>
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-purple-600">Bole Medhanealem, Addis Ababa</p>
                  <p className="text-sm text-gray-500">Ethiopia</p>
                </div>
                <div className="mt-4 text-sm text-purple-600 font-semibold">
                  ✓ By appointment only
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="group cursor-pointer" onClick={() => handlePhoneCall('+251922987654')}>
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-red-500/50 transition-all">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Urgent Matters</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  For time-sensitive consulting needs or urgent business matters requiring immediate attention.
                </p>
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-red-600 hover:text-red-700 transition-colors">+251 922 987 654</p>
                  <p className="text-sm text-gray-500">Emergency consulting line</p>
                </div>
                <div className="mt-4 text-sm text-red-600 font-semibold">
                  ✓ 24/7 availability
                </div>
              </div>
            </div>
          </div>

          {/* WHY CONTACT US SECTION */}
          <div className="bg-gradient-to-r from-orange-100 to-red-100 p-12 rounded-3xl mb-16">
            <h3 className="text-4xl font-bold text-center mb-12 text-gray-900">Why Choose Ma Services Solution?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-6 text-3xl shadow-lg">
                  ⚡
                </div>
                <h4 className="text-2xl font-bold mb-4 text-gray-900">Fast Response</h4>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We understand that business moves quickly. That's why we respond to all inquiries within 2 hours
                  and provide urgent consultations when needed.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 text-3xl shadow-lg">
                  🎯
                </div>
                <h4 className="text-2xl font-bold mb-4 text-gray-900">Expert Guidance</h4>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our team brings 13+ years of combined experience across investment consulting, business development,
                  tax services, and strategic planning.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 text-3xl shadow-lg">
                  🤝
                </div>
                <h4 className="text-2xl font-bold mb-4 text-gray-900">Personalized Approach</h4>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Every client is unique. We tailor our consulting services to your specific industry, challenges,
                  and business objectives for optimal results.
                </p>
              </div>
            </div>
          </div>

          {/* CONTACT FORM SECTION */}
          <div ref={contactFormRef} className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold mb-6 text-gray-900">Send Us a Message</h3>
              <p className="text-xl text-gray-600 leading-relaxed">
                Fill out the form below and our consulting team will get back to you within 2 hours
                with a personalized response to your business needs.
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* OFFICE HOURS & ADDITIONAL INFO */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Office Hours */}
            <div>
              <h3 className="text-4xl font-bold mb-8">Office Hours & Availability</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center py-4 border-b border-white/20">
                  <span className="text-xl">Monday - Friday</span>
                  <span className="text-xl font-semibold text-green-400">9:00 AM - 6:00 PM EAT</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-white/20">
                  <span className="text-xl">Saturday</span>
                  <span className="text-xl font-semibold text-yellow-400">10:00 AM - 2:00 PM EAT</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-white/20">
                  <span className="text-xl">Sunday</span>
                  <span className="text-xl font-semibold text-red-400">Closed</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-white/20">
                  <span className="text-xl">Emergency Support</span>
                  <span className="text-xl font-semibold text-blue-400">24/7 Available</span>
                </div>
              </div>

              <div className="mt-8 p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                <h4 className="text-2xl font-bold mb-4">Response Times</h4>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-center">
                    <span className="text-green-400 mr-3">✓</span>
                    <span>Email inquiries: Within 2 hours</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-3">✓</span>
                    <span>Phone calls: Immediate during business hours</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-3">✓</span>
                    <span>Consultation requests: Within 24 hours</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-3">✓</span>
                    <span>Emergency matters: Immediate attention</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Social Media & Additional Contact */}
            <div>
              <h3 className="text-4xl font-bold mb-8">Connect With Us Online</h3>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <a href="https://linkedin.com/company/ma-consulting-ethiopia" target="_blank" rel="noopener noreferrer" className="group">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-white text-xl">in</span>
                    </div>
                    <h4 className="text-xl font-bold mb-2">LinkedIn</h4>
                    <p className="text-blue-100">Professional updates & insights</p>
                  </div>
                </a>

                <a href="https://twitter.com/MAConsultingET" target="_blank" rel="noopener noreferrer" className="group">
                  <div className="bg-gradient-to-br from-blue-400 to-blue-500 p-6 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-white text-xl">🐦</span>
                    </div>
                    <h4 className="text-xl font-bold mb-2">Twitter</h4>
                    <p className="text-blue-100">Industry news & quick updates</p>
                  </div>
                </a>

                <a href="https://facebook.com/MAConsultingEthiopia" target="_blank" rel="noopener noreferrer" className="group">
                  <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-6 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-white text-xl">📘</span>
                    </div>
                    <h4 className="text-xl font-bold mb-2">Facebook</h4>
                    <p className="text-purple-100">Community engagement</p>
                  </div>
                </a>

                <a href="https://instagram.com/ma_consulting_et" target="_blank" rel="noopener noreferrer" className="group">
                  <div className="bg-gradient-to-br from-pink-600 to-pink-700 p-6 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-white text-xl">📷</span>
                    </div>
                    <h4 className="text-xl font-bold mb-2">Instagram</h4>
                    <p className="text-pink-100">Behind-the-scenes & events</p>
                  </div>
                </a>
              </div>

              <div className="bg-gradient-to-r from-orange-600/20 to-red-600/20 p-6 rounded-2xl backdrop-blur-sm">
                <h4 className="text-2xl font-bold mb-4">Additional Contact Information</h4>
                <div className="space-y-4 text-lg">
                  <div>
                    <span className="font-semibold text-orange-300">Business Registration:</span>
                    <span className="ml-2">Ma Services Solution PLC - Addis Ababa, Ethiopia</span>
                  </div>
                  <div>
                    <span className="font-semibold text-orange-300">Tax ID:</span>
                    <span className="ml-2">ET123456789</span>
                  </div>
                  <div>
                    <span className="font-semibold text-orange-300">Languages:</span>
                    <span className="ml-2">English, Amharic, Arabic</span>
                  </div>
                  <div>
                    <span className="font-semibold text-orange-300">Time Zone:</span>
                    <span className="ml-2">East Africa Time (EAT)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-24 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
            Don't wait to transform your business. Contact us today and let's discuss how Ma Services Solution
            can help you achieve your goals and drive sustainable growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={scrollToContactForm}
              className="bg-white text-gray-900 px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Schedule Free Consultation
            </button>
            <button
              onClick={() => handlePhoneCall('+251911123456')}
              className="border-2 border-white/50 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/10 hover:border-white transition-all duration-300"
            >
              Call +251 911 123 456
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
