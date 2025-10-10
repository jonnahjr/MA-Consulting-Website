import { useState, useEffect } from 'react'

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
}

const JobManager = () => {
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [showJobModal, setShowJobModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [formData, setFormData] = useState<Partial<Job>>({
    title: '',
    department: '',
    location: '',
    type: 'full-time',
    description: '',
    requirements: '',
    responsibilities: '',
    salary: '',
    benefits: '',
    applicationDeadline: '',
    isActive: true
  })

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  useEffect(() => {
    loadJobs()
  }, [])

  useEffect(() => {
    filterJobs()
  }, [jobs, searchTerm, statusFilter, typeFilter])

  const loadJobs = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/jobs`)
      if (response.ok) {
        const data = await response.json()
        setJobs(data)
      }
    } catch (error) {
      console.error('Failed to load jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterJobs = () => {
    let filtered = [...jobs]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(job =>
        (job.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (job.department?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (job.location?.toLowerCase() || '').includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      const isActive = statusFilter === 'active'
      filtered = filtered.filter(job => job.isActive === isActive)
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(job => job.type === typeFilter)
    }

    setFilteredJobs(filtered)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const method = selectedJob ? 'PUT' : 'POST'
      const url = selectedJob
        ? `${apiUrl}/api/jobs/${selectedJob.id}`
        : `${apiUrl}/api/jobs`

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        await loadJobs()
        setShowCreateModal(false)
        setShowJobModal(false)
        setSelectedJob(null)
        setFormData({
          title: '',
          department: '',
          location: '',
          type: 'full-time',
          description: '',
          requirements: '',
          responsibilities: '',
          salary: '',
          benefits: '',
          applicationDeadline: '',
          isActive: true
        })
        alert(`Job ${selectedJob ? 'updated' : 'created'} successfully!`)
      } else {
        alert('Failed to save job')
      }
    } catch (error) {
      console.error('Save error:', error)
      alert('Error saving job')
    }
  }

  const handleEdit = (job: Job) => {
    setSelectedJob(job)
    setFormData({ ...job })
    setShowCreateModal(true)
  }

  const toggleJobStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`${apiUrl}/api/jobs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus })
      })

      if (response.ok) {
        await loadJobs()
        alert(`Job ${!currentStatus ? 'activated' : 'deactivated'} successfully!`)
      } else {
        alert('Failed to update job status')
      }
    } catch (error) {
      console.error('Status update error:', error)
      alert('Error updating job status')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job posting? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`${apiUrl}/api/jobs/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await loadJobs()
        alert('Job deleted successfully!')
      } else {
        alert('Failed to delete job')
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert('Error deleting job')
    }
  }

  const handleInputChange = (field: keyof Job, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'full-time': return 'bg-blue-100 text-blue-800'
      case 'part-time': return 'bg-green-100 text-green-800'
      case 'contract': return 'bg-purple-100 text-purple-800'
      case 'internship': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const exportToCSV = () => {
    const headers = ['Title', 'Department', 'Location', 'Type', 'Status', 'Created Date']
    const csvContent = [
      headers.join(','),
      ...filteredJobs.map(job => [
        `"${job.title || ''}"`,
        `"${job.department || ''}"`,
        `"${job.location || ''}"`,
        `"${job.type || ''}"`,
        `"${job.isActive ? 'Active' : 'Inactive'}"`,
        `"${job.createdAt ? new Date(job.createdAt).toLocaleDateString() : ''}"`
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `jobs_export_${new Date().toISOString().split('T')[0]}.csv`
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
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="mr-3">💼</span> Job Postings Management
        </h2>
        <div className="flex space-x-3">
          <button
            onClick={exportToCSV}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            📊 Export CSV
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            ➕ Create Job Posting
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-blue-600">{jobs.length}</div>
          <div className="text-sm text-blue-500">Total Jobs</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-green-600">
            {jobs.filter(job => job.isActive).length}
          </div>
          <div className="text-sm text-green-500">Active Jobs</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {jobs.filter(job => !job.isActive).length}
          </div>
          <div className="text-sm text-yellow-500">Inactive Jobs</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-purple-600">
            {jobs.filter(job => job.type === 'full-time').length}
          </div>
          <div className="text-sm text-purple-500">Full-time</div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-orange-600">
            {jobs.filter(job => job.type === 'internship').length}
          </div>
          <div className="text-sm text-orange-500">Internships</div>
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
            placeholder="Search by title, department, or location..."
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
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{job.title || 'Untitled'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{job.department || 'Not specified'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{job.location || 'Not specified'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getJobTypeColor(job.type)}`}>
                      {job.type || 'Unknown'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      job.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {job.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Unknown'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedJob(job)
                          setShowJobModal(true)
                        }}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        👁️
                      </button>
                      <button
                        onClick={() => handleEdit(job)}
                        className="text-purple-600 hover:text-purple-900"
                        title="Edit Job"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => toggleJobStatus(job.id, job.isActive)}
                        className={job.isActive ? "text-yellow-600 hover:text-yellow-900" : "text-green-600 hover:text-green-900"}
                        title={job.isActive ? "Deactivate" : "Activate"}
                      >
                        {job.isActive ? '⏸️' : '▶️'}
                      </button>
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredJobs.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No job postings found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Job Details Modal */}
      {showJobModal && selectedJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Job Details</h3>
                <button
                  onClick={() => setShowJobModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">📋 Job Information</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <p className="text-gray-900 font-medium">{selectedJob.title}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Department</label>
                        <p className="text-gray-900">{selectedJob.department}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <p className="text-gray-900">{selectedJob.location}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Type</label>
                        <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${getJobTypeColor(selectedJob.type)}`}>
                          {selectedJob.type}
                        </span>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${
                          selectedJob.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {selectedJob.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      {selectedJob.salary && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Salary</label>
                          <p className="text-gray-900">{selectedJob.salary}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">📅 Additional Information</h4>
                    <div className="space-y-3">
                      {selectedJob.applicationDeadline && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Application Deadline</label>
                          <p className="text-gray-900">{new Date(selectedJob.applicationDeadline).toLocaleDateString()}</p>
                        </div>
                      )}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Posted Date</label>
                        <p className="text-gray-900">{new Date(selectedJob.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Last Updated</label>
                        <p className="text-gray-900">{new Date(selectedJob.updatedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedJob.description && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">📝 Job Description</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-900 whitespace-pre-line">{selectedJob.description}</p>
                    </div>
                  </div>
                )}

                {selectedJob.requirements && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">🎯 Requirements</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-900 whitespace-pre-line">{selectedJob.requirements}</p>
                    </div>
                  </div>
                )}

                {selectedJob.responsibilities && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">💼 Responsibilities</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-900 whitespace-pre-line">{selectedJob.responsibilities}</p>
                    </div>
                  </div>
                )}

                {selectedJob.benefits && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">🎁 Benefits</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-900 whitespace-pre-line">{selectedJob.benefits}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Job Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedJob ? 'Edit Job Posting' : 'Create New Job Posting'}
                </h3>
                <button
                  onClick={() => {
                    setShowCreateModal(false)
                    setSelectedJob(null)
                    setFormData({
                      title: '',
                      department: '',
                      location: '',
                      type: 'full-time',
                      description: '',
                      requirements: '',
                      responsibilities: '',
                      salary: '',
                      benefits: '',
                      applicationDeadline: '',
                      isActive: true
                    })
                  }}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g. Senior Software Developer"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                      <input
                        type="text"
                        value={formData.department || ''}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g. Information Technology"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                      <input
                        type="text"
                        value={formData.location || ''}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g. Addis Ababa, Ethiopia"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Job Type *</label>
                      <select
                        value={formData.type || 'full-time'}
                        onChange={(e) => handleInputChange('type', e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="contract">Contract</option>
                        <option value="internship">Internship</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Salary (Optional)</label>
                      <input
                        type="text"
                        value={formData.salary || ''}
                        onChange={(e) => handleInputChange('salary', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g. $50,000 - $70,000 per year"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Application Deadline (Optional)</label>
                      <input
                        type="date"
                        value={formData.applicationDeadline || ''}
                        onChange={(e) => handleInputChange('applicationDeadline', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isActive"
                        checked={formData.isActive || false}
                        onChange={(e) => handleInputChange('isActive', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                        Active (visible to applicants)
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Job Description *</label>
                      <textarea
                        value={formData.description || ''}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        required
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Describe the role, team, and company..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Requirements *</label>
                      <textarea
                        value={formData.requirements || ''}
                        onChange={(e) => handleInputChange('requirements', e.target.value)}
                        required
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Required skills, experience, education..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Responsibilities *</label>
                      <textarea
                        value={formData.responsibilities || ''}
                        onChange={(e) => handleInputChange('responsibilities', e.target.value)}
                        required
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Key responsibilities and duties..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Benefits (Optional)</label>
                      <textarea
                        value={formData.benefits || ''}
                        onChange={(e) => handleInputChange('benefits', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Health insurance, paid time off, etc..."
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-xl font-bold hover:shadow-lg transition-all duration-300"
                  >
                    {selectedJob ? 'Update Job Posting' : 'Create Job Posting'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false)
                      setSelectedJob(null)
                      setFormData({
                        title: '',
                        department: '',
                        location: '',
                        type: 'full-time',
                        description: '',
                        requirements: '',
                        responsibilities: '',
                        salary: '',
                        benefits: '',
                        applicationDeadline: '',
                        isActive: true
                      })
                    }}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default JobManager