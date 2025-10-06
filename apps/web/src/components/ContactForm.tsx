import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  phone: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type FormData = z.infer<typeof schema>

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors, isValid }, reset, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const watchedService = watch('service')

  const services = [
    'Investment Consulting',
    'Business Development',
    'Tax & Customs',
    'Marketing Strategies',
    'Development Works',
    'Dedicated Support',
    'General Inquiry'
  ]

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitMessage('')
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: data.service,
          message: `Company: ${data.company || 'Not provided'}\nPhone: ${data.phone || 'Not provided'}\n\n${data.message}`
        }),
      })

      const json = await response.json()

      if (response.ok) {
        setSubmitMessage('🎉 Message sent successfully! We\'ll get back to you within 2 hours.')
        setSubmitStatus('success')
        reset()
      } else {
        setSubmitMessage(json?.error || '❌ Failed to send message. Please try again.')
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitMessage('❌ Network error. Please check your connection and try again.')
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Clear success message after 5 seconds
  useEffect(() => {
    if (submitStatus === 'success') {
      const timer = setTimeout(() => {
        setSubmitMessage('')
        setSubmitStatus(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [submitStatus])

  return (
    <div className="bg-gray-200 p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-400 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-500 to-pink-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-2">Let's Start a Conversation</h3>
        <p className="text-gray-600 text-lg">Tell us about your business needs and we'll craft the perfect solution</p>
      </div>

      {/* Success/Error Message */}
      {submitMessage && (
        <div className={`mb-6 p-4 rounded-2xl border-2 transition-all duration-300 ${
          submitStatus === 'success'
            ? 'bg-green-50 border-green-200 text-green-800'
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <div className="flex items-center">
            <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
              submitStatus === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}>
              {submitStatus === 'success' ? (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <p className="font-medium">{submitMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 space-y-6">
        {/* Name and Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <span className="mr-2">👤</span>
              Full Name *
            </label>
            <div className={`relative transition-all duration-300 ${
              focusedField === 'name' ? 'transform scale-105' : ''
            }`}>
              <input
                {...register('name')}
                id="name"
                type="text"
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 transition-all duration-300 text-gray-900 font-medium ${
                  errors.name
                    ? 'border-red-300 focus:ring-red-100 focus:border-red-500'
                    : 'border-gray-200 focus:ring-blue-100 focus:border-blue-500'
                }`}
                placeholder="Your full name"
              />
              {errors.name && (
                <div className="absolute -bottom-1 left-4 bg-red-500 text-white text-xs px-2 py-1 rounded-md transform translate-y-full">
                  {errors.name.message}
                </div>
              )}
            </div>
          </div>

          <div className="group">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <span className="mr-2">📧</span>
              Email Address *
            </label>
            <div className={`relative transition-all duration-300 ${
              focusedField === 'email' ? 'transform scale-105' : ''
            }`}>
              <input
                {...register('email')}
                id="email"
                type="email"
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 transition-all duration-300 text-gray-900 font-medium ${
                  errors.email
                    ? 'border-red-300 focus:ring-red-100 focus:border-red-500'
                    : 'border-gray-200 focus:ring-blue-100 focus:border-blue-500'
                }`}
                placeholder="your.email@company.com"
              />
              {errors.email && (
                <div className="absolute -bottom-1 left-4 bg-red-500 text-white text-xs px-2 py-1 rounded-md transform translate-y-full">
                  {errors.email.message}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Company and Phone Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group">
            <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <span className="mr-2">🏢</span>
              Company (Optional)
            </label>
            <div className={`relative transition-all duration-300 ${
              focusedField === 'company' ? 'transform scale-105' : ''
            }`}>
              <input
                {...register('company')}
                id="company"
                type="text"
                onFocus={() => setFocusedField('company')}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 text-gray-900 font-medium"
                placeholder="Your company name"
              />
            </div>
          </div>

          <div className="group">
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <span className="mr-2">📱</span>
              Phone Number (Optional)
            </label>
            <div className={`relative transition-all duration-300 ${
              focusedField === 'phone' ? 'transform scale-105' : ''
            }`}>
              <input
                {...register('phone')}
                id="phone"
                type="tel"
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 text-gray-900 font-medium"
                placeholder="+251 XXX XXX XXX"
              />
            </div>
          </div>
        </div>

        {/* Service Selection */}
        <div className="group">
          <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
            <span className="mr-2">🎯</span>
            Service Interest *
          </label>
          <div className={`relative transition-all duration-300 ${
            focusedField === 'service' ? 'transform scale-105' : ''
          }`}>
            <select
              {...register('service')}
              id="service"
              onFocus={() => setFocusedField('service')}
              onBlur={() => setFocusedField(null)}
              className={`w-full px-4 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 transition-all duration-300 text-gray-900 font-medium appearance-none bg-white ${
                errors.service
                  ? 'border-red-300 focus:ring-red-100 focus:border-red-500'
                  : 'border-gray-200 focus:ring-blue-100 focus:border-blue-500'
              }`}
            >
              <option value="">Select a service...</option>
              {services.map((service) => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {errors.service && (
              <div className="absolute -bottom-1 left-4 bg-red-500 text-white text-xs px-2 py-1 rounded-md transform translate-y-full">
                {errors.service.message}
              </div>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="group">
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
            <span className="mr-2">💬</span>
            Your Message *
          </label>
          <div className={`relative transition-all duration-300 ${
            focusedField === 'message' ? 'transform scale-105' : ''
          }`}>
            <textarea
              {...register('message')}
              id="message"
              rows={6}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              className={`w-full px-4 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 transition-all duration-300 text-gray-900 font-medium resize-none ${
                errors.message
                  ? 'border-red-300 focus:ring-red-100 focus:border-red-500'
                  : 'border-gray-200 focus:ring-blue-100 focus:border-blue-500'
              }`}
              placeholder="Tell us about your business challenges, goals, and how we can help you succeed..."
            />
            {errors.message && (
              <div className="absolute -bottom-1 left-4 bg-red-500 text-white text-xs px-2 py-1 rounded-md transform translate-y-full">
                {errors.message.message}
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className={`w-full py-5 px-8 rounded-2xl font-bold text-lg transition-all duration-300 transform relative overflow-hidden ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : isValid
                  ? 'bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 text-white hover:shadow-2xl hover:shadow-red-500/50 hover:scale-105 animate-pulse-glow'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span className="relative z-10 flex items-center justify-center">
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending Your Message...
                </>
              ) : (
                <>
                  <span className="mr-3">🚀</span>
                  Send Message
                  <span className="ml-3">✨</span>
                </>
              )}
            </span>

            {/* Animated background effect */}
            {!isSubmitting && isValid && (
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
            )}
          </button>

          {/* Form validation indicator */}
          <div className="mt-4 text-center">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
              isValid
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {isValid ? (
                <>
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Ready to send!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Please complete all required fields
                </>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ContactForm