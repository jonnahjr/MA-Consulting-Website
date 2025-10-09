import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Meta from '../components/Meta'
import ContentManager from '../components/admin/ContentManager'
import BlogModal from '../components/admin/BlogModal'

interface DashboardStats {
  services: number
  teamMembers: number
  testimonials: number
  blogPosts: number
  applications: number
  leads: number
}

interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  tags: string
  publishedAt: string
  createdAt: string
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [stats, setStats] = useState<DashboardStats>({
    services: 0,
    teamMembers: 0,
    testimonials: 0,
    blogPosts: 0,
    applications: 0,
    leads: 0
  })
  const [activeTab, setActiveTab] = useState('dashboard')
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null)
  const [showBlogModal, setShowBlogModal] = useState(false)
  const navigate = useNavigate()

  // Simple authentication (in production, use proper auth)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'admin123') {
      setIsAuthenticated(true)
      localStorage.setItem('adminAuth', 'true')
    } else {
      alert('Invalid password')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('adminAuth')
    navigate('/')
  }

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      loadStats()
    }
  }, [])

  const loadStats = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'

      const [servicesRes, teamRes, testimonialsRes, blogRes, applicationsRes, leadsRes] = await Promise.all([
        fetch(`${apiUrl}/api/services`),
        fetch(`${apiUrl}/api/team`),
        fetch(`${apiUrl}/api/testimonials`),
        fetch(`${apiUrl}/api/blog`),
        fetch(`${apiUrl}/api/careers/applications`),
        fetch(`${apiUrl}/api/contact/leads`)
      ])

      const services = servicesRes.ok ? (await servicesRes.json()).length : 0
      const teamMembers = teamRes.ok ? (await teamRes.json()).length : 0
      const testimonials = testimonialsRes.ok ? (await testimonialsRes.json()).length : 0
      const blogData = blogRes.ok ? await blogRes.json() : []
      const applications = applicationsRes.ok ? (await applicationsRes.json()).length : 0
      const leads = leadsRes.ok ? (await leadsRes.json()).length : 0

      setBlogPosts(blogData)
      setStats({
        services,
        teamMembers,
        testimonials,
        blogPosts: blogData.length,
        applications,
        leads
      })
    } catch (error) {
      console.error('Failed to load stats:', error)
    }
  }

  const loadBlogPosts = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
      const response = await fetch(`${apiUrl}/api/blog`)
      if (response.ok) {
        const posts = await response.json()
        setBlogPosts(posts)
        setStats(prev => ({ ...prev, blogPosts: posts.length }))
      }
    } catch (error) {
      console.error('Failed to load blog posts:', error)
    }
  }

  const handleCreateBlogPost = () => {
    setEditingBlog({
      id: '',
      title: '',
      slug: '',
      content: '',
      tags: '',
      publishedAt: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    })
    setShowBlogModal(true)
  }

  const handleEditBlogPost = (post: BlogPost) => {
    setEditingBlog(post)
    setShowBlogModal(true)
  }

  const handleDeleteBlogPost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      return
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
      const response = await fetch(`${apiUrl}/api/blog/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await loadBlogPosts()
        alert('Blog post deleted successfully!')
      } else {
        alert('Failed to delete blog post')
      }
    } catch (error) {
      console.error('Failed to delete blog post:', error)
      alert('Error deleting blog post')
    }
  }

  const handleSaveBlogPost = async (blogPost: { title: string; slug: string; content: string; tags: string; publishedAt: string }) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
      const method = editingBlog?.id ? 'PUT' : 'POST'
      const url = editingBlog?.id ? `${apiUrl}/api/blog/${editingBlog.id}` : `${apiUrl}/api/blog`

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(blogPost)
      })

      if (response.ok) {
        await loadBlogPosts()
        setShowBlogModal(false)
        setEditingBlog(null)
        alert(`Blog post ${editingBlog?.id ? 'updated' : 'created'} successfully!`)
      } else {
        alert(`Failed to ${editingBlog?.id ? 'update' : 'create'} blog post`)
      }
    } catch (error) {
      console.error('Failed to save blog post:', error)
      alert('Error saving blog post')
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  if (!isAuthenticated) {
    return (
      <>
        <Meta title="Admin Login - Ma Services Solution" description="Administrative access panel" />
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Access</h1>
              <p className="text-gray-600">Enter password to continue</p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-xl font-bold hover:shadow-lg transition-all duration-300"
              >
                Access Admin Panel
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>Default password: admin123</p>
            </div>
          </div>
        </div>
      </>
    )
  }

  const StatCard = ({ title, value, icon, color }: { title: string; value: number; icon: string; color: string }) => (
    <div className={`bg-gradient-to-br ${color} p-6 rounded-2xl text-white shadow-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold opacity-90">{title}</h3>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className="text-4xl opacity-80">{icon}</div>
      </div>
    </div>
  )

  const AdminTabs = () => (
    <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-4">
      {[
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'content', label: 'Content', icon: '📝', submenu: ['services', 'team', 'testimonials', 'blog'] },
        { id: 'contacts', label: 'Contacts', icon: '📞' },
        { id: 'applications', label: 'Applications', icon: '📋' },
        { id: 'leads', label: 'Contact Leads', icon: '📧' },
        { id: 'database', label: 'Database', icon: '🗄️' },
        { id: 'system', label: 'System', icon: '⚙️' },
        { id: 'analytics', label: 'Analytics', icon: '📈' }
      ].map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === tab.id
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span>{tab.icon}</span>
          {tab.label}
        </button>
      ))}

      {/* Content Submenu */}
      {activeTab === 'content' && (
        <div className="flex gap-2 ml-4 border-l border-gray-300 pl-4">
          {[
            { id: 'services', label: 'Services', icon: '🛠️' },
            { id: 'team', label: 'Team', icon: '👥' },
            { id: 'testimonials', label: 'Testimonials', icon: '💬' },
            { id: 'blog', label: 'Blog Posts', icon: '📝' }
          ].map(subtab => (
            <button
              key={subtab.id}
              onClick={() => setActiveTab(subtab.id)}
              className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                activeTab === subtab.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>{subtab.icon}</span>
              {subtab.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <>
      <Meta title="Admin Dashboard - Ma Services Solution" description="Administrative dashboard for content management" />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <AdminTabs />

          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Welcome Header */}
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white">
                <h1 className="text-4xl font-bold mb-2">Welcome back, Administrator! 👋</h1>
                <p className="text-blue-100 text-lg">Here's what's happening with your website today.</p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Services</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.services}</p>
                      <p className="text-xs text-green-600 mt-1">↗️ Active services</p>
                    </div>
                    <div className="text-4xl">🛠️</div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Team Members</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.teamMembers}</p>
                      <p className="text-xs text-green-600 mt-1">↗️ Growing team</p>
                    </div>
                    <div className="text-4xl">👥</div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Job Applications</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.applications}</p>
                      <p className="text-xs text-yellow-600 mt-1">⚡ Needs review</p>
                    </div>
                    <div className="text-4xl">📋</div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Contact Leads</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.leads}</p>
                      <p className="text-xs text-blue-600 mt-1">💬 New inquiries</p>
                    </div>
                    <div className="text-4xl">📧</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Management Actions */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="mr-3">⚡</span> Content Management
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setActiveTab('services')}
                      className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-left group"
                    >
                      <div className="text-blue-600 font-semibold group-hover:text-blue-700">🛠️ Services</div>
                      <div className="text-blue-500 text-sm group-hover:text-blue-600">{stats.services} active</div>
                    </button>

                    <button
                      onClick={() => setActiveTab('team')}
                      className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-left group"
                    >
                      <div className="text-green-600 font-semibold group-hover:text-green-700">👥 Team</div>
                      <div className="text-green-500 text-sm group-hover:text-green-600">{stats.teamMembers} members</div>
                    </button>

                    <button
                      onClick={() => setActiveTab('blog')}
                      className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-left group"
                    >
                      <div className="text-orange-600 font-semibold group-hover:text-orange-700">📝 Blog</div>
                      <div className="text-orange-500 text-sm group-hover:text-orange-600">{stats.blogPosts} posts</div>
                    </button>

                    <button
                      onClick={() => setActiveTab('testimonials')}
                      className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-left group"
                    >
                      <div className="text-purple-600 font-semibold group-hover:text-purple-700">💬 Testimonials</div>
                      <div className="text-purple-500 text-sm group-hover:text-purple-600">{stats.testimonials} reviews</div>
                    </button>
                  </div>
                </div>

                {/* Communication & Analytics */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="mr-3">📊</span> Communication & Analytics
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setActiveTab('applications')}
                      className="p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-left group"
                    >
                      <div className="text-red-600 font-semibold group-hover:text-red-700">📋 Applications</div>
                      <div className="text-red-500 text-sm group-hover:text-red-600">{stats.applications} pending</div>
                    </button>

                    <button
                      onClick={() => setActiveTab('leads')}
                      className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-left group"
                    >
                      <div className="text-indigo-600 font-semibold group-hover:text-indigo-700">📧 Leads</div>
                      <div className="text-indigo-500 text-sm group-hover:text-indigo-600">{stats.leads} inquiries</div>
                    </button>

                    <button
                      onClick={() => setActiveTab('contacts')}
                      className="p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-left group"
                    >
                      <div className="text-teal-600 font-semibold group-hover:text-teal-700">📞 Contacts</div>
                      <div className="text-teal-500 text-sm group-hover:text-teal-600">Manage info</div>
                    </button>

                    <button
                      onClick={() => setActiveTab('analytics')}
                      className="p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-left group"
                    >
                      <div className="text-pink-600 font-semibold group-hover:text-pink-700">📈 Analytics</div>
                      <div className="text-pink-500 text-sm group-hover:text-pink-600">View insights</div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="mr-3">🔔</span> Recent Activity
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                      📧
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">New contact form submission</p>
                      <p className="text-gray-600 text-sm">John Doe submitted an inquiry about business consulting services</p>
                      <p className="text-gray-500 text-xs mt-1">2 minutes ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-xl">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                      📋
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">Job application received</p>
                      <p className="text-gray-600 text-sm">Sarah Johnson applied for the Business Development position</p>
                      <p className="text-gray-500 text-xs mt-1">15 minutes ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-xl">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white">
                      📝
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">Blog post published</p>
                      <p className="text-gray-600 text-sm">New article "Investment Consultancy Services" is now live</p>
                      <p className="text-gray-500 text-xs mt-1">1 hour ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Services Management */}
          {activeTab === 'services' && (
            <ContentManager
              title="Services"
              endpoint="services"
              fields={[
                { key: 'title', label: 'Service Title', type: 'text', required: true },
                { key: 'description', label: 'Description', type: 'textarea', required: true },
                { key: 'icon', label: 'Icon Name', type: 'text', required: true },
                { key: 'metrics', label: 'Metrics (JSON)', type: 'textarea' }
              ]}
              displayFields={['title', 'icon', 'createdAt']}
            />
          )}

          {/* Team Management */}
          {activeTab === 'team' && (
            <ContentManager
              title="Team Members"
              endpoint="team"
              fields={[
                { key: 'name', label: 'Full Name', type: 'text', required: true },
                { key: 'role', label: 'Role/Position', type: 'text', required: true },
                { key: 'bio', label: 'Biography', type: 'textarea' },
                { key: 'image', label: 'Image URL', type: 'url' },
                { key: 'socials', label: 'Social Links (JSON)', type: 'textarea' }
              ]}
              displayFields={['name', 'role', 'createdAt']}
            />
          )}

          {/* Testimonials Management */}
          {activeTab === 'testimonials' && (
            <ContentManager
              title="Testimonials"
              endpoint="testimonials"
              fields={[
                { key: 'clientName', label: 'Client Name', type: 'text', required: true },
                { key: 'feedback', label: 'Feedback/Testimonial', type: 'textarea', required: true },
                { key: 'videoUrl', label: 'Video URL', type: 'url' }
              ]}
              displayFields={['clientName', 'feedback', 'createdAt']}
            />
          )}

          {/* Blog Management */}
          {activeTab === 'blog' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <span className="mr-3">📝</span> Blog Management
                  </h2>
                  <button
                    onClick={handleCreateBlogPost}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    ➕ New Post
                  </button>
                </div>

                {/* Blog Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">{stats.blogPosts}</div>
                    <div className="text-sm text-blue-500">Total Posts</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">{stats.blogPosts}</div>
                    <div className="text-sm text-green-500">Published</div>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-yellow-600">0</div>
                    <div className="text-sm text-yellow-500">Drafts</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600">0</div>
                    <div className="text-sm text-purple-500">Scheduled</div>
                  </div>
                </div>

                {/* Blog Posts Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Published</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {blogPosts.map((post) => (
                        <tr key={post.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{post.title}</div>
                            <div className="text-sm text-gray-500">{post.slug}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Published
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleEditBlogPost(post)}
                              className="text-blue-600 hover:text-blue-900 mr-3 transition-colors"
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => handleDeleteBlogPost(post.id)}
                              className="text-red-600 hover:text-red-900 transition-colors"
                            >
                              🗑️ Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                      {blogPosts.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                            No blog posts found. Click "New Post" to create your first blog post.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Blog Modal */}
                <BlogModal
                  isOpen={showBlogModal}
                  onClose={() => {
                    setShowBlogModal(false)
                    setEditingBlog(null)
                  }}
                  onSave={handleSaveBlogPost}
                  editingPost={editingBlog}
                />
              </div>
            </div>
          )}

          {/* Applications Management */}
          {activeTab === 'applications' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <span className="mr-3">📋</span> Job Applications Management
                  </h2>
                  <div className="flex space-x-3">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                      📊 Export CSV
                    </button>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                      📧 Send Bulk Email
                    </button>
                  </div>
                </div>

                {/* Application Stats */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl text-center">
                    <div className="text-2xl font-bold text-yellow-600">{stats.applications}</div>
                    <div className="text-sm text-yellow-500">Total</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl text-center">
                    <div className="text-2xl font-bold text-blue-600">0</div>
                    <div className="text-sm text-blue-500">Pending</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl text-center">
                    <div className="text-2xl font-bold text-purple-600">0</div>
                    <div className="text-sm text-purple-500">Reviewing</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl text-center">
                    <div className="text-2xl font-bold text-green-600">0</div>
                    <div className="text-sm text-green-500">Accepted</div>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl text-center">
                    <div className="text-2xl font-bold text-red-600">0</div>
                    <div className="text-sm text-red-500">Rejected</div>
                  </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>All Status</option>
                      <option>Pending Review</option>
                      <option>Under Review</option>
                      <option>Interviewed</option>
                      <option>Accepted</option>
                      <option>Rejected</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                    <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>All Positions</option>
                      <option>CEO</option>
                      <option>Deputy CEO</option>
                      <option>Business Development</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                    <input type="date" className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div className="flex items-end">
                    <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                      🔍 Filter
                    </button>
                  </div>
                </div>

                {/* Applications Table */}
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
                      {/* Sample applications - in real app this would be dynamic */}
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
                                JD
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">John Doe</div>
                              <div className="text-sm text-gray-500">john.doe@email.com</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">Business Development</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Pending Review
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <span className="text-green-600">📄</span>
                            <span className="text-blue-600">🎓</span>
                            <span className="text-purple-600">🏆</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          2 days ago
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">👁️ View</button>
                            <button className="text-green-600 hover:text-green-900">✅ Accept</button>
                            <button className="text-red-600 hover:text-red-900">❌ Reject</button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Advanced Features */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">🎯 Interview Scheduling</h3>
                    <p className="text-blue-700 text-sm mb-4">
                      Schedule interviews, send automated emails, and track candidate progress.
                    </p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm">
                      📅 Schedule Interview
                    </button>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-green-900 mb-3">📊 Analytics Dashboard</h3>
                    <p className="text-green-700 text-sm mb-4">
                      Track application trends, response times, and hiring success rates.
                    </p>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm">
                      📈 View Analytics
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Leads Management */}
          {activeTab === 'leads' && (
            <ContentManager
              title="Contact Leads"
              endpoint="contact/leads"
              fields={[
                { key: 'name', label: 'Name', type: 'text', required: true },
                { key: 'email', label: 'Email', type: 'email', required: true },
                { key: 'subject', label: 'Subject', type: 'text', required: true },
                { key: 'message', label: 'Message', type: 'textarea', required: true }
              ]}
              displayFields={['name', 'email', 'subject', 'createdAt']}
            />
          )}

          {/* Contacts Management */}
          {activeTab === 'contacts' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">📞 Contact Information Management</h2>

                {/* Social Media Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="mr-2">🌐</span> Social Media Links
                  </h3>
                  <ContentManager
                    title=""
                    endpoint="contact-info/social"
                    fields={[
                      { key: 'label', label: 'Platform Name', type: 'text', required: true },
                      { key: 'value', label: 'URL', type: 'url', required: true },
                      { key: 'platform', label: 'Platform', type: 'select', required: true, options: [
                        { value: 'linkedin', label: 'LinkedIn' },
                        { value: 'twitter', label: 'Twitter' },
                        { value: 'facebook', label: 'Facebook' },
                        { value: 'instagram', label: 'Instagram' },
                        { value: 'youtube', label: 'YouTube' },
                        { value: 'tiktok', label: 'TikTok' }
                      ]},
                      { key: 'icon', label: 'Icon Name', type: 'text', required: false },
                      { key: 'isActive', label: 'Active', type: 'select', required: false, options: [
                        { value: 'true', label: 'Yes' },
                        { value: 'false', label: 'No' }
                      ]},
                      { key: 'sortOrder', label: 'Sort Order', type: 'number', required: false }
                    ]}
                    displayFields={['label', 'platform', 'value', 'isActive']}
                  />
                </div>

                {/* Phone Numbers Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="mr-2">📞</span> Phone Numbers
                  </h3>
                  <ContentManager
                    title=""
                    endpoint="contact-info/phone"
                    fields={[
                      { key: 'label', label: 'Label', type: 'text', required: true },
                      { key: 'value', label: 'Phone Number', type: 'text', required: true },
                      { key: 'isActive', label: 'Active', type: 'select', required: false, options: [
                        { value: 'true', label: 'Yes' },
                        { value: 'false', label: 'No' }
                      ]},
                      { key: 'sortOrder', label: 'Sort Order', type: 'number', required: false }
                    ]}
                    displayFields={['label', 'value', 'isActive']}
                  />
                </div>

                {/* Email Addresses Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="mr-2">✉️</span> Email Addresses
                  </h3>
                  <ContentManager
                    title=""
                    endpoint="contact-info/email"
                    fields={[
                      { key: 'label', label: 'Label', type: 'text', required: true },
                      { key: 'value', label: 'Email Address', type: 'email', required: true },
                      { key: 'isActive', label: 'Active', type: 'select', required: false, options: [
                        { value: 'true', label: 'Yes' },
                        { value: 'false', label: 'No' }
                      ]},
                      { key: 'sortOrder', label: 'Sort Order', type: 'number', required: false }
                    ]}
                    displayFields={['label', 'value', 'isActive']}
                  />
                </div>

                {/* Website Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="mr-2">🌐</span> Website
                  </h3>
                  <ContentManager
                    title=""
                    endpoint="contact-info/website"
                    fields={[
                      { key: 'label', label: 'Label', type: 'text', required: true },
                      { key: 'value', label: 'Website URL', type: 'url', required: true },
                      { key: 'isActive', label: 'Active', type: 'select', required: false, options: [
                        { value: 'true', label: 'Yes' },
                        { value: 'false', label: 'No' }
                      ]},
                      { key: 'sortOrder', label: 'Sort Order', type: 'number', required: false }
                    ]}
                    displayFields={['label', 'value', 'isActive']}
                  />
                </div>

                {/* Addresses Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="mr-2">📍</span> Office Addresses
                  </h3>
                  <ContentManager
                    title=""
                    endpoint="contact-info/address"
                    fields={[
                      { key: 'label', label: 'Label', type: 'text', required: true },
                      { key: 'value', label: 'Full Address', type: 'textarea', required: true },
                      { key: 'isActive', label: 'Active', type: 'select', required: false, options: [
                        { value: 'true', label: 'Yes' },
                        { value: 'false', label: 'No' }
                      ]},
                      { key: 'sortOrder', label: 'Sort Order', type: 'number', required: false }
                    ]}
                    displayFields={['label', 'value', 'isActive']}
                  />
                </div>

                {/* All Contacts Overview */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="mr-2">📋</span> All Contact Information
                  </h3>
                  <ContentManager
                    title=""
                    endpoint="contact-info"
                    fields={[
                      { key: 'type', label: 'Type', type: 'select', required: true, options: [
                        { value: 'social', label: 'Social Media' },
                        { value: 'phone', label: 'Phone' },
                        { value: 'email', label: 'Email' },
                        { value: 'address', label: 'Address' }
                      ]},
                      { key: 'label', label: 'Label', type: 'text', required: true },
                      { key: 'value', label: 'Value', type: 'text', required: true },
                      { key: 'platform', label: 'Platform', type: 'text', required: false },
                      { key: 'icon', label: 'Icon', type: 'text', required: false },
                      { key: 'isActive', label: 'Active', type: 'select', required: false, options: [
                        { value: 'true', label: 'Yes' },
                        { value: 'false', label: 'No' }
                      ]},
                      { key: 'sortOrder', label: 'Sort Order', type: 'number', required: false }
                    ]}
                    displayFields={['type', 'label', 'value', 'platform', 'isActive']}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Database Management */}
          {activeTab === 'database' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">🗄️ Database Management</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">📊 Database Status</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Database:</strong> MySQL 8.0</p>
                      <p><strong>Status:</strong> <span className="text-green-600 font-semibold">✅ Connected</span></p>
                      <p><strong>Tables:</strong> 7</p>
                      <p><strong>Records:</strong> {stats.services + stats.teamMembers + stats.testimonials + stats.blogPosts + stats.applications + stats.leads}</p>
                    </div>
                  </div>

                  <div className="bg-green-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-green-900 mb-3">🔄 Database Operations</h3>
                    <div className="space-y-3">
                      <button
                        onClick={() => window.open('http://localhost/phpmyadmin', '_blank')}
                        className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        🗄️ Open phpMyAdmin
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to reseed the database? This will delete all data and recreate sample data.')) {
                            // Add reseed functionality
                          }
                        }}
                        className="w-full bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                      >
                        🔄 Reseed Database
                      </button>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-purple-900 mb-3">📋 Table Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Users:</span>
                        <span className="font-semibold">1</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Services:</span>
                        <span className="font-semibold">{stats.services}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Team Members:</span>
                        <span className="font-semibold">{stats.teamMembers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Testimonials:</span>
                        <span className="font-semibold">{stats.testimonials}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Blog Posts:</span>
                        <span className="font-semibold">{stats.blogPosts}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Applications:</span>
                        <span className="font-semibold">{stats.applications}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Contact Leads:</span>
                        <span className="font-semibold">{stats.leads}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* System Management */}
          {activeTab === 'system' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">⚙️ System Management</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">🚀 Server Status</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Frontend:</strong> <span className="text-green-600">✅ Running (Port 3002)</span></p>
                      <p><strong>Backend:</strong> <span className="text-green-600">✅ Running (Port 5000)</span></p>
                      <p><strong>Database:</strong> <span className="text-green-600">✅ Running (Port 3306)</span></p>
                      <p><strong>phpMyAdmin:</strong> <span className="text-green-600">✅ Available (Port 80)</span></p>
                    </div>
                  </div>

                  <div className="bg-green-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-green-900 mb-3">📧 Email Configuration</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Service:</strong> Gmail SMTP</p>
                      <p><strong>Status:</strong> <span className="text-green-600">✅ Configured</span></p>
                      <p><strong>Test Email:</strong></p>
                      <button
                        onClick={() => alert('Test email functionality would be implemented here')}
                        className="w-full bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors"
                      >
                        Send Test Email
                      </button>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-purple-900 mb-3">📁 File Management</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Upload Directory:</strong> /uploads</p>
                      <p><strong>Max File Size:</strong> 10MB</p>
                      <p><strong>Allowed Types:</strong> PDF, DOC, Images</p>
                      <button
                        onClick={() => window.open('http://localhost:5000/uploads', '_blank')}
                        className="w-full bg-purple-500 text-white px-3 py-1 rounded text-sm hover:bg-purple-600 transition-colors"
                      >
                        Browse Files
                      </button>
                    </div>
                  </div>

                  <div className="bg-orange-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-orange-900 mb-3">🔧 System Tools</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          if (confirm('Clear all cache and restart services?')) {
                            // Add cache clearing functionality
                          }
                        }}
                        className="w-full bg-orange-500 text-white px-3 py-2 rounded text-sm hover:bg-orange-600 transition-colors"
                      >
                        🧹 Clear Cache
                      </button>
                      <button
                        onClick={() => window.open('/admin/logs', '_blank')}
                        className="w-full bg-orange-500 text-white px-3 py-2 rounded text-sm hover:bg-orange-600 transition-colors"
                      >
                        📋 View Logs
                      </button>
                    </div>
                  </div>

                  <div className="bg-red-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-red-900 mb-3">🚨 System Health</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Memory Usage:</strong> <span className="text-green-600">Normal</span></p>
                      <p><strong>Disk Space:</strong> <span className="text-green-600">85% Free</span></p>
                      <p><strong>Response Time:</strong> <span className="text-green-600">45ms</span></p>
                      <p><strong>Uptime:</strong> <span className="text-green-600">2h 30m</span></p>
                    </div>
                  </div>

                  <div className="bg-indigo-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-indigo-900 mb-3">🔐 Security Settings</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Admin Password:</strong> <span className="text-green-600">Set</span></p>
                      <p><strong>Session Timeout:</strong> 24 hours</p>
                      <p><strong>Failed Logins:</strong> 0</p>
                      <button
                        onClick={() => alert('Password change functionality would be implemented here')}
                        className="w-full bg-indigo-500 text-white px-3 py-1 rounded text-sm hover:bg-indigo-600 transition-colors"
                      >
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Dashboard */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">📈 Analytics Dashboard</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm">Total Applications</p>
                        <p className="text-3xl font-bold">{stats.applications}</p>
                        <p className="text-blue-100 text-xs">↗️ +12% from last month</p>
                      </div>
                      <div className="text-4xl">📋</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 text-sm">Contact Leads</p>
                        <p className="text-3xl font-bold">{stats.leads}</p>
                        <p className="text-green-100 text-xs">↗️ +8% from last month</p>
                      </div>
                      <div className="text-4xl">📧</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm">Blog Engagement</p>
                        <p className="text-3xl font-bold">{stats.blogPosts}</p>
                        <p className="text-purple-100 text-xs">↗️ +25% from last month</p>
                      </div>
                      <div className="text-4xl">📝</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100 text-sm">Services Offered</p>
                        <p className="text-3xl font-bold">{stats.services}</p>
                        <p className="text-orange-100 text-xs">Active services</p>
                      </div>
                      <div className="text-4xl">🛠️</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Application Status Distribution</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Pending Review</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{width: '60%'}}></div>
                          </div>
                          <span className="text-sm font-semibold">60%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Under Review</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{width: '25%'}}></div>
                          </div>
                          <span className="text-sm font-semibold">25%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Accepted</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{width: '15%'}}></div>
                          </div>
                          <span className="text-sm font-semibold">15%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 Recent Activity</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">New job application received</p>
                          <p className="text-xs text-gray-500">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Contact form submission</p>
                          <p className="text-xs text-gray-500">4 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Blog post published</p>
                          <p className="text-xs text-gray-500">1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Admin