import { useState, useEffect } from 'react'

interface Application {
  id: string
  name?: string
  fullName?: string
  email: string
  phone?: string
  position?: string
  department?: string
  jobId?: string
  experience?: string
  education?: string
  skills?: string
  coverLetter?: string
  resumeUrl?: string
  educationDocumentsUrl?: string
  certificationsUrl?: string
  portfolioUrl?: string
  availability?: string
  salary?: string
  status: string
  applicationId?: string
  createdAt: string
  updatedAt: string
}

interface Interview {
  id: string
  applicationId: string
  scheduledDate: string
  interviewer: string
  location: string
  notes?: string
  status: 'scheduled' | 'completed' | 'cancelled'
}

const ApplicationManager = () => {
  const [applications, setApplications] = useState<Application[]>([])
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [showApplicationModal, setShowApplicationModal] = useState(false)
  const [showInterviewModal, setShowInterviewModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [positionFilter, setPositionFilter] = useState('all')
  const [interviews, setInterviews] = useState<Interview[]>([])
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())
  const [nextRefreshIn, setNextRefreshIn] = useState<number>(5)

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  useEffect(() => {
    loadApplications()
  }, [])

  useEffect(() => {
    filterApplications()
  }, [applications, searchTerm, statusFilter, positionFilter])

  // Auto-refresh applications every 5 seconds with countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setNextRefreshIn(prev => {
        if (prev <= 1) {
          loadApplications()
          return 5 // Reset countdown
        }
        return prev - 1
      })
    }, 1000) // Update countdown every second

    return () => clearInterval(interval)
  }, [])

  const loadApplications = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/careers/applications`)
      if (response.ok) {
        const data = await response.json()
        setApplications(data)
        setLastRefresh(new Date())
      }
    } catch (error) {
      console.error('Failed to load applications:', error)
    } finally {
      setLoading(false)
    }
  }

  const refreshApplications = () => {
    setLoading(true)
    loadApplications()
  }

  // Show loading indicator during refresh
  const isRefreshing = loading && applications.length > 0

  const filterApplications = () => {
    let filtered = [...applications]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(app =>
        ((app.fullName || app.name || '')?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (app.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (app.position?.toLowerCase() || '').includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter)
    }

    // Position filter
    if (positionFilter !== 'all') {
      filtered = filtered.filter(app => (app.position || app.jobId) === positionFilter)
    }

    setFilteredApplications(filtered)
  }

  const updateApplicationStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`${apiUrl}/api/careers/applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })

      if (response.ok) {
        // Immediate refresh after status update
        await loadApplications()
        // Show success message without blocking
        const notification = document.createElement('div')
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50'
        notification.textContent = `✅ Status updated to ${status}`
        document.body.appendChild(notification)
        setTimeout(() => document.body.removeChild(notification), 3000)
      } else {
        alert('Failed to update application status')
      }
    } catch (error) {
      console.error('Failed to update status:', error)
      alert('Error updating application status')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'reviewing': return 'bg-blue-100 text-blue-800'
      case 'interviewed': return 'bg-purple-100 text-purple-800'
      case 'accepted': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return '⏳'
      case 'reviewing': return '👁️'
      case 'interviewed': return '🎯'
      case 'accepted': return '✅'
      case 'rejected': return '❌'
      default: return '📋'
    }
  }

  const downloadDocument = (url: string, filename: string) => {
    const link = document.createElement('a')
    link.href = `${apiUrl}${url}`
    link.download = filename
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const scheduleInterview = (application: Application) => {
    setSelectedApplication(application)
    setShowInterviewModal(true)
  }

  const exportToCSV = () => {
    const headers = ['Full Name', 'Email', 'Phone', 'Position', 'Department', 'Status', 'Applied Date']
    const csvContent = [
      headers.join(','),
      ...filteredApplications.map(app => [
        `"${app.fullName || app.name || ''}"`,
        `"${app.email || ''}"`,
        `"${app.phone || ''}"`,
        `"${app.position || app.jobId || ''}"`,
        `"${app.department || ''}"`,
        `"${app.status || ''}"`,
        `"${app.createdAt ? new Date(app.createdAt).toLocaleDateString() : ''}"`
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `applications_export_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <span className="mr-3">📋</span> Job Applications Management
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Last updated: {lastRefresh.toLocaleTimeString()} • Auto-refresh in {nextRefreshIn}s
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={refreshApplications}
            disabled={isRefreshing}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform ${
              isRefreshing
                ? 'bg-blue-400 text-white cursor-not-allowed scale-95'
                : 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 shadow-lg'
            }`}
            title="Refresh applications list immediately"
          >
            {isRefreshing ? '⏳ Refreshing...' : `🔄 Refresh (${nextRefreshIn}s)`}
          </button>
          <button
            onClick={exportToCSV}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            📊 Export CSV
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
            📧 Send Bulk Email
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-yellow-600">{applications.length}</div>
          <div className="text-sm text-yellow-500">Total Applications</div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-blue-600">
            {applications.filter(app => app.status === 'pending').length}
          </div>
          <div className="text-sm text-blue-500">Pending Review</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-purple-600">
            {applications.filter(app => app.status === 'reviewing').length}
          </div>
          <div className="text-sm text-purple-500">Under Review</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-green-600">
            {applications.filter(app => app.status === 'accepted').length}
          </div>
          <div className="text-sm text-green-500">Accepted</div>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-red-600">
            {applications.filter(app => app.status === 'rejected').length}
          </div>
          <div className="text-sm text-red-500">Rejected</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, or position..."
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending Review</option>
            <option value="reviewing">Under Review</option>
            <option value="interviewed">Interviewed</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
          <select
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Positions</option>
            <option value="CEO">CEO</option>
            <option value="Deputy CEO">Deputy CEO</option>
            <option value="Business Development">Business Development</option>
            <option value="IT Specialist">IT Specialist</option>
            <option value="Marketing Specialist">Marketing Specialist</option>
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplications.map((application) => (
                <tr key={application.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
                          {(application.fullName || application.name || 'Unknown').split(' ').map(n => n[0]).join('').toUpperCase()}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{application.fullName || application.name || 'Unknown'}</div>
                        <div className="text-sm text-gray-500">{application.email || 'No email'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{application.position || application.jobId || 'Not specified'}</div>
                    <div className="text-sm text-gray-500">{application.department || 'Not specified'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(application.status)}`}>
                      {getStatusIcon(application.status)} {application.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-1">
                      {application.resumeUrl && <span className="text-green-600 cursor-pointer" title="Resume" onClick={() => downloadDocument(application.resumeUrl!, 'resume.pdf')}>📄</span>}
                      {application.educationDocumentsUrl && <span className="text-blue-600 cursor-pointer" title="Education" onClick={() => downloadDocument(application.educationDocumentsUrl!, 'education.pdf')}>🎓</span>}
                      {application.certificationsUrl && <span className="text-purple-600 cursor-pointer" title="Certifications" onClick={() => downloadDocument(application.certificationsUrl!, 'certifications.pdf')}>🏆</span>}
                      {application.portfolioUrl && <span className="text-orange-600 cursor-pointer" title="Portfolio" onClick={() => downloadDocument(application.portfolioUrl!, 'portfolio.docx')}>💼</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {application.createdAt ? new Date(application.createdAt).toLocaleDateString() : 'Unknown'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedApplication(application)
                          setShowApplicationModal(true)
                        }}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        👁️
                      </button>
                      <button
                        onClick={() => updateApplicationStatus(application.id, 'reviewing')}
                        className="text-purple-600 hover:text-purple-900"
                        title="Mark as Reviewing"
                      >
                        👁️
                      </button>
                      <button
                        onClick={() => scheduleInterview(application)}
                        className="text-green-600 hover:text-green-900"
                        title="Schedule Interview"
                      >
                        📅
                      </button>
                      <button
                        onClick={() => updateApplicationStatus(application.id, 'accepted')}
                        className="text-green-600 hover:text-green-900"
                        title="Accept"
                      >
                        ✅
                      </button>
                      <button
                        onClick={() => updateApplicationStatus(application.id, 'rejected')}
                        className="text-red-600 hover:text-red-900"
                        title="Reject"
                      >
                        ❌
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredApplications.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No applications found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Application Details Modal */}
      {showApplicationModal && selectedApplication && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Application Details</h3>
                <button
                  onClick={() => setShowApplicationModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800">👤 Personal Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Full Name</label>
                      <p className="text-gray-900">{selectedApplication.fullName || selectedApplication.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="text-gray-900">{selectedApplication.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <p className="text-gray-900">{selectedApplication.phone || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Position Applied</label>
                      <p className="text-gray-900">{selectedApplication.position || selectedApplication.jobId}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Department</label>
                      <p className="text-gray-900">{selectedApplication.department || 'Not specified'}</p>
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800">💼 Professional Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Experience</label>
                      <p className="text-gray-900">{selectedApplication.experience || 'Not specified'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Education</label>
                      <p className="text-gray-900">{selectedApplication.education || 'Not specified'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Availability</label>
                      <p className="text-gray-900">{selectedApplication.availability || 'Not specified'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Salary Expectation</label>
                      <p className="text-gray-900">{selectedApplication.salary || 'Not specified'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              {selectedApplication.skills && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">🎯 Skills & Qualifications</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-900 whitespace-pre-line">{selectedApplication.skills}</p>
                  </div>
                </div>
              )}

              {/* Cover Letter */}
              {selectedApplication.coverLetter && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">📝 Cover Letter</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-900 whitespace-pre-line italic">"{selectedApplication.coverLetter}"</p>
                  </div>
                </div>
              )}

              {/* Documents */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">📎 Documents</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {selectedApplication.resumeUrl && (
                    <button
                      onClick={() => downloadDocument(selectedApplication.resumeUrl!, 'resume.pdf')}
                      className="flex items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">📄</div>
                        <div className="text-sm font-medium text-blue-700">Resume/CV</div>
                      </div>
                    </button>
                  )}
                  {selectedApplication.educationDocumentsUrl && (
                    <button
                      onClick={() => downloadDocument(selectedApplication.educationDocumentsUrl!, 'education.pdf')}
                      className="flex items-center justify-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">🎓</div>
                        <div className="text-sm font-medium text-green-700">Education</div>
                      </div>
                    </button>
                  )}
                  {selectedApplication.certificationsUrl && (
                    <button
                      onClick={() => downloadDocument(selectedApplication.certificationsUrl!, 'certifications.pdf')}
                      className="flex items-center justify-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">🏆</div>
                        <div className="text-sm font-medium text-purple-700">Certifications</div>
                      </div>
                    </button>
                  )}
                  {selectedApplication.portfolioUrl && (
                    <button
                      onClick={() => downloadDocument(selectedApplication.portfolioUrl!, 'portfolio.docx')}
                      className="flex items-center justify-center p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">💼</div>
                        <div className="text-sm font-medium text-orange-700">Portfolio</div>
                      </div>
                    </button>
                  )}
                </div>
              </div>

              {/* Status Update Actions */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">⚡ Quick Actions</h4>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => updateApplicationStatus(selectedApplication.id, 'reviewing')}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    👁️ Mark as Reviewing
                  </button>
                  <button
                    onClick={() => scheduleInterview(selectedApplication)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    📅 Schedule Interview
                  </button>
                  <button
                    onClick={() => updateApplicationStatus(selectedApplication.id, 'accepted')}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    ✅ Accept Application
                  </button>
                  <button
                    onClick={() => updateApplicationStatus(selectedApplication.id, 'rejected')}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    ❌ Reject Application
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interview Scheduling Modal */}
      {showInterviewModal && selectedApplication && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Schedule Interview</h3>
                <button
                  onClick={() => setShowInterviewModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Candidate</label>
                  <p className="text-gray-900 font-medium">{selectedApplication.fullName || selectedApplication.name}</p>
                  <p className="text-gray-600 text-sm">{selectedApplication.position || selectedApplication.jobId}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Interview Date & Time</label>
                  <input
                    type="datetime-local"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Interviewer</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Select Interviewer</option>
                    <option>Alebachew Sitotaw Yimer (CEO)</option>
                    <option>Melsew Hailemariam Yassin (D/CEO)</option>
                    <option>Tiruwork Tizazu Liyew (Business Development)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Interview Type</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>In-Person</option>
                    <option>Video Call (Zoom)</option>
                    <option>Phone Call</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location/Meeting Link</label>
                  <input
                    type="text"
                    placeholder="Office address or Zoom link"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Additional notes for the interview..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setShowInterviewModal(false)}
                  className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-xl font-bold hover:shadow-lg transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('Interview scheduled successfully! Email notification sent to candidate.')
                    setShowInterviewModal(false)
                  }}
                  className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-xl font-bold hover:shadow-lg transition-all duration-300"
                >
                  📅 Schedule Interview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ApplicationManager