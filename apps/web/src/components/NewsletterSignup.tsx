import { useState } from 'react'
import { motion } from 'framer-motion'

const NewsletterSignup = () => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      setMessage('Please enter your email address')
      setMessageType('error')
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address')
      setMessageType('error')
      return
    }

    setIsSubmitting(true)
    setMessage('')

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
      const response = await fetch(`${apiUrl}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email.trim() })
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Thank you for subscribing! You\'ll receive our latest insights soon.')
        setMessageType('success')
        setEmail('')
      } else {
        setMessage(data.error || 'Failed to subscribe. Please try again.')
        setMessageType('error')
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      setMessage('Network error. Please try again later.')
      setMessageType('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="relative bg-gradient-to-br from-slate-200 via-slate-300 to-gray-300 rounded-2xl shadow-xl border border-slate-400/50 p-4 md:p-6 overflow-hidden max-w-6xl mx-auto">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600/10 to-blue-600/10"></div>
        </div>

        <div className="relative text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl mb-4 shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
            Stay Updated with
            <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Industry Insights
            </span>
          </h3>

          <p className="text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed text-base">
            Subscribe to our newsletter and receive the latest business consulting insights, market trends, and expert analysis delivered directly to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-3 items-center justify-center">
              <div className="flex-1 max-w-md relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 shadow-sm hover:shadow-md"
                  disabled={isSubmitting}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 rounded-lg font-semibold text-base transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap ${
                  isSubmitting
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Subscribe</span>
                  </div>
                ) : (
                  'Subscribe'
                )}
              </button>
            </div>

            <div className="min-h-[3rem] flex items-center justify-center">
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                >
                  <div className={`p-3 rounded-lg border shadow-sm ${
                    messageType === 'success'
                      ? 'bg-green-50 text-green-800 border-green-200'
                      : 'bg-red-50 text-red-800 border-red-200'
                  }`}>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-sm">
                        {messageType === 'success' ? '✓' : '✕'}
                      </span>
                      <span className="font-medium text-sm">{message}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-gray-200/50">
              <div className="text-xs text-gray-600 space-y-1">
                <p className="leading-relaxed">
                  By subscribing, you agree to receive marketing communications from Ma Services Solution.
                  You can unsubscribe at any time.
                </p>
                <div className="flex justify-center space-x-4 pt-1 border-t border-gray-200/50">
                  <a href="/privacy-policy" className="text-purple-600 hover:text-purple-800 font-medium transition-colors text-xs">
                    Privacy Policy
                  </a>
                  <a href="/terms-of-service" className="text-purple-600 hover:text-purple-800 font-medium transition-colors text-xs">
                    Terms of Service
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  )
}

export default NewsletterSignup