import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Meta from '../components/Meta'
import JobApplicationForm from '../components/JobApplicationForm'

interface Job {
  id: string
  title: string
  department: string
  location: string
  type: 'full-time' | 'part-time' | 'contract' | 'internship'
  description: string
  requirements: string
  responsibilities: string
  salary?: string
  benefits?: string
  applicationDeadline?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  views?: number
  applications?: number
  category?: string
}

export function Careers() {
  const location = useLocation()
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [selectedJob, setSelectedJob] = useState<{title: string, department: string} | null>(null)
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedJob, setExpandedJob] = useState<string | null>(null)

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  useEffect(() => {
    loadJobs()
    // Auto-refresh jobs every 10 seconds to update view/application counts
    const interval = setInterval(() => {
      loadJobs()
    }, 10000) // 10 seconds

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    filterAndSortJobs()
  }, [jobs])

  // Handle hash navigation for direct links to job positions
  useEffect(() => {
    if (location.hash === '#jobs') {
      setTimeout(() => {
        const jobsSection = document.getElementById('jobs')
        if (jobsSection) jobsSection.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [location])

  const loadJobs = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/jobs/active`)
      if (response.ok) {
        const data = await response.json()
        // Add category for styling purposes
        const enhancedData = data.map((job: Job) => ({
          ...job,
          views: job.views || 0,
          applications: job.applications || 0,
          category: job.department.toLowerCase().includes('business') ? 'business' :
                    job.department.toLowerCase().includes('tech') ? 'technology' :
                    job.department.toLowerCase().includes('finance') ? 'finance' : 'consulting'
        }))
        setJobs(enhancedData)
      }
    } catch (error) {
      console.error('Failed to load jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortJobs = () => {
    setFilteredJobs([...jobs])
  }

  const handleApplyClick = (jobTitle: string, department: string) => {
    setSelectedJob({ title: jobTitle, department })
    setShowApplicationForm(true)
  }

  const handleCloseForm = () => {
    setShowApplicationForm(false)
    setSelectedJob(null)
  }

  const toggleJobExpansion = async (jobId: string) => {
    const isExpanding = expandedJob !== jobId

    // If expanding (not collapsing), increment view count
    if (isExpanding) {
      try {
        const response = await fetch(`${apiUrl}/api/jobs/${jobId}/view`, {
          method: 'POST'
        })
        if (response.ok) {
          // Update local state to reflect new view count
          setJobs(prevJobs =>
            prevJobs.map(job =>
              job.id === jobId
                ? { ...job, views: (job.views || 0) + 1 }
                : job
            )
          )
        }
      } catch (error) {
        console.error('Failed to track job view:', error)
      }
    }

    setExpandedJob(expandedJob === jobId ? null : jobId)
  }

  const shareJob = (job: Job) => {
    const url = window.location.href
    const text = `Check out this ${job.title} position at Ma Services Solution: ${url}`

    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: text,
        url: url
      })
    } else {
      navigator.clipboard.writeText(`${text}\n\n${job.description.substring(0, 200)}...`)
      alert('Job link copied to clipboard!')
    }
  }

  return (
    <>
      <Meta title="Careers at Ma Services Solution - Join Our Professional Team" description="Discover exciting career opportunities at Ma Services Solution. Join Ethiopia's premier consulting firm and work on transformative projects with industry experts." />

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
              Join Ma Services Solution and become part of Ethiopia's most respected consulting firm.
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

      {/* WHY WORK AT Ma Services Solution */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">Why Choose Ma Services Solution?</h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join a firm that values excellence, innovation, and professional growth.
              Here's what makes Ma Services Solution the perfect place to advance your career.
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
            <h3 className="text-4xl font-bold text-center mb-12 text-gray-900">Career Success at Ma Services Solution</h3>
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

      {/* PROFESSIONAL JOB BOARD */}
      <section id="jobs" className="py-24 bg-gradient-to-br from-slate-50 via-white to-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-amber-800 to-gray-900 bg-clip-text text-transparent">
                Current Opportunities
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Join our growing team. We're looking for talented professionals ready to make an impact
                in the consulting industry and contribute to our clients' success.
              </p>
            </div>
          </div>

          {/* Job Display */}

          {/* Job Cards */}
          <div className="space-y-6">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-500"></div>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <span className="text-4xl">🔍</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">No Matching Positions</h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                  We couldn't find any positions matching your criteria. Try adjusting your filters or check back later for new opportunities.
                </p>
                <div className="text-center py-8">
                  <p className="text-gray-600">No job opportunities available at the moment.</p>
                  <p className="text-sm text-gray-500 mt-2">Please check back later for new openings.</p>
                </div>
              </div>
            ) : (
              filteredJobs.map((job, index) => (
                <div
                  key={job.id}
                  className="group relative"
                >
                    <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/30 overflow-hidden">
                      {/* Job Header */}
                      <div className="p-8 border-b border-gray-100">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                          <div className="flex-1">
                            <div className="flex items-start gap-4 mb-3">
                              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <span className="text-2xl text-white">💼</span>
                              </div>
                              <div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors duration-300">
                                  {job.title}
                                </h3>
                                <p className="text-amber-600 font-semibold text-xl">{job.department}</p>
                              </div>
                            </div>

                            {/* Job Meta Info */}
                            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <span className="text-amber-500">📍</span>
                                <span>{job.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-blue-500">💼</span>
                                <span>{job.type ? job.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Not specified'}</span>
                              </div>
                              {job.salary && (
                                <div className="flex items-center gap-2">
                                  <span className="text-green-500">💰</span>
                                  <span>{job.salary}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-2">
                                <span className="text-purple-500">👁️</span>
                                <span>{job.views} views</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-indigo-500">📋</span>
                                <span>{job.applications} applications</span>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-col sm:flex-row gap-3">
                            <button
                              onClick={() => toggleJobExpansion(job.id)}
                              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                            >
                              <span>{expandedJob === job.id ? '🔽' : '🔼'}</span>
                              {expandedJob === job.id ? 'Less Details' : 'More Details'}
                            </button>

                            <button
                              onClick={() => shareJob(job)}
                              className="px-6 py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                            >
                              <span>📤</span>
                              Share
                            </button>

                            <button
                              onClick={() => handleApplyClick(job.title, job.department)}
                              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                            >
                              <span>🚀</span>
                              Apply Now
                            </button>
                          </div>
                        </div>

                        {/* Status Tags */}
                        <div className="flex flex-wrap gap-2 mt-4">
                          <span className="px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-full text-sm font-medium border border-green-200">
                            🆕 New Position
                          </span>
                          {job.category && (
                            <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200">
                              {job.category.charAt(0).toUpperCase() + job.category.slice(1)}
                            </span>
                          )}
                          {job.applicationDeadline && (
                            <span className="px-3 py-1 bg-gradient-to-r from-red-100 to-pink-100 text-red-800 rounded-full text-sm font-medium border border-red-200">
                              ⏰ Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Expandable Content */}
                      {expandedJob === job.id && (
                        <div className="overflow-hidden">
                          <div className="p-8 bg-gradient-to-br from-gray-50 to-amber-50">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                              {/* Job Description */}
                              <div className="space-y-6">
                                <div>
                                  <h4 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-white">💡</span>
                                    About This Role
                                  </h4>
                                  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-white/30 shadow-sm">
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.description}</p>
                                  </div>
                                </div>

                                {/* Requirements */}
                                <div>
                                  <h4 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-white">🎯</span>
                                    Requirements
                                  </h4>
                                  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-white/30 shadow-sm">
                                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">{job.requirements}</div>
                                  </div>
                                </div>
                              </div>

                              {/* Responsibilities & Benefits */}
                              <div className="space-y-6">
                                {/* Responsibilities */}
                                <div>
                                  <h4 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white">⚡</span>
                                    Responsibilities
                                  </h4>
                                  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-white/30 shadow-sm">
                                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">{job.responsibilities}</div>
                                  </div>
                                </div>

                                {/* Benefits */}
                                {job.benefits && (
                                  <div>
                                    <h4 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                      <span className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white">🎁</span>
                                      What We Offer
                                    </h4>
                                    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-white/30 shadow-sm">
                                      <div className="text-gray-700 leading-relaxed whitespace-pre-line">{job.benefits}</div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Apply CTA */}
                            <div className="mt-8 text-center">
                              <button
                                onClick={() => handleApplyClick(job.title, job.department)}
                                className="px-12 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white font-bold text-xl rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-3xl"
                              >
                                🚀 Apply for This Position
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination (if needed) */}
          {filteredJobs.length > 10 && (
            <div className="mt-12 text-center">
              <div className="flex justify-center items-center gap-2">
                <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Previous</button>
                <span className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg font-semibold">1</span>
                <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Next</button>
              </div>
            </div>
          )}

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
      <section id="apply" className="py-24 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">Ready to Join Our Team?</h2>
          <p className="text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
            Take the next step in your career with Ma Services Solution. We're looking for talented,
            passionate professionals ready to make a difference. Apply today and be part of
            Ethiopia's leading consulting firm.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => {
                const jobsSection = document.getElementById('jobs')
                if (jobsSection) jobsSection.scrollIntoView({ behavior: 'smooth' })
              }}
              className="bg-white text-gray-900 px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Apply for Open Positions
            </button>
            <button
              onClick={() => handleApplyClick('General Application', 'General')}
              className="border-2 border-white/50 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/10 hover:border-white transition-all duration-300"
            >
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

      {/* Job Application Modal */}
      {showApplicationForm && selectedJob && (
        <JobApplicationForm
          jobTitle={selectedJob.title}
          jobDepartment={selectedJob.department}
          onClose={handleCloseForm}
          onSuccess={() => loadJobs()} // Refresh job list immediately after application
        />
      )}
    </>
  )
}
