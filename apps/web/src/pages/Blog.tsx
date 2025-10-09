import { useEffect, useState } from 'react'
import Meta from '../components/Meta'

interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  tags: string
  publishedAt: string
}

export function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        setPosts(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching blog posts:', error)
        setLoading(false)
      })
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const categories = ['All', 'Investment', 'Business Development', 'Tax & Customs', 'Marketing', 'Strategy', 'Industry Insights']

  const filteredPosts = selectedCategory === 'All'
    ? posts
    : posts.filter(post => {
        const tagsArray = post.tags ? post.tags.split(',').map(tag => tag.trim()) : []
        return tagsArray.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase()))
      })

  return (
    <>
      <Meta title="Business Insights & Consulting Blog - Ma Services Solution" description="Stay informed with expert insights on investment consulting, business development, tax strategies, and industry trends from Ma Services Solution's thought leaders." />

      {/* HERO SECTION - Large and Professional */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600/20 to-blue-600/20"></div>
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
              <span className="bg-gradient-to-r from-purple-400 to-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold uppercase tracking-wider shadow-lg">
                Business Insights
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent leading-tight">
              Expert Knowledge
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              & Industry Wisdom
              </span>
            </h1>

            <p className="text-2xl md:text-3xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto">
              Discover actionable insights from Ma Services Solution's thought leaders. Our blog covers the latest
              trends in investment consulting, business development strategies, tax optimization, and industry
              best practices that drive business success.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 animate-pulse-glow">
                Explore Latest Articles
              </button>
              <button className="border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm">
                Subscribe to Newsletter
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

      {/* BLOG CONTENT SECTION */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Article */}
          {filteredPosts.length > 0 && (
            <div className="mb-20">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-12 rounded-3xl text-white shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="flex items-center mb-6">
                      <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold mr-4">Featured Article</span>
                      <span className="text-purple-200">{formatDate(filteredPosts[0].publishedAt)}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{filteredPosts[0].title}</h2>
                    <p className="text-xl text-purple-100 mb-8 leading-relaxed">
                      {filteredPosts[0].content.length > 200
                        ? `${filteredPosts[0].content.substring(0, 200)}...`
                        : filteredPosts[0].content
                      }
                    </p>
                    <div className="flex flex-wrap gap-3 mb-8">
                      {(filteredPosts[0].tags ? filteredPosts[0].tags.split(',').map(tag => tag.trim()) : []).map((tag, index) => (
                        <span key={index} className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                      Read Full Article
                    </button>
                  </div>
                  <div className="text-center">
                    <div className="w-64 h-64 bg-gradient-to-br from-white/20 to-white/10 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
                      <div className="text-8xl animate-float">📈</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Blog Posts Grid */}
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600"></div>
              <p className="mt-6 text-2xl text-gray-600">Loading expert insights...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-300 to-gray-400 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <span className="text-6xl text-white">📝</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">No Articles Found</h3>
              <p className="text-xl text-gray-600">Try selecting a different category or check back later for new content.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.slice(1).map((post, index) => (
                <article
                  key={post.id}
                  className="group bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Article Image/Visual */}
                  <div className="h-56 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
                    <div className="text-white text-center z-10">
                      <div className="text-5xl mb-3 animate-float">📊</div>
                      <p className="text-sm opacity-90 font-semibold">Business Insights</p>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full animate-pulse group-hover:scale-110 transition-transform"></div>
                  </div>

                  <div className="p-8">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(post.tags ? post.tags.split(',').map(tag => tag.trim()).slice(0, 2) : []).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Date */}
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(post.publishedAt)}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2 leading-tight">
                      {post.title}
                    </h3>

                    {/* Content Preview */}
                    <p className="text-gray-600 text-lg leading-relaxed line-clamp-3 mb-6">
                      {post.content.length > 180
                        ? `${post.content.substring(0, 180)}...`
                        : post.content
                      }
                    </p>

                    {/* Read More */}
                    <div className="flex items-center justify-between">
                      <button className="text-purple-600 hover:text-purple-800 font-bold text-lg flex items-center group/btn transition-colors">
                        Read Full Article
                        <svg className="w-5 h-5 ml-2 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>

                      {/* Social Share */}
                      <div className="flex space-x-3">
                        <button className="w-10 h-10 bg-gray-100 hover:bg-purple-100 rounded-full flex items-center justify-center transition-colors group">
                          <svg className="w-5 h-5 text-gray-600 group-hover:text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                        <button className="w-10 h-10 bg-gray-100 hover:bg-blue-100 rounded-full flex items-center justify-center transition-colors group">
                          <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Newsletter Signup */}
          <div className="mt-20 bg-gradient-to-r from-purple-600 to-blue-600 p-12 rounded-3xl text-white text-center">
            <h3 className="text-4xl font-bold mb-6">Stay Updated with Industry Insights</h3>
            <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              Subscribe to our newsletter and get the latest business consulting insights,
              market trends, and expert analysis delivered directly to your inbox.
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-2xl text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-purple-200 mt-4">No spam, unsubscribe at any time.</p>
          </div>
        </div>
      </section>

      {/* WHY READ OUR BLOG SECTION */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Why Read Ma Services Solution Insights?</h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our blog combines deep industry expertise with practical business advice,
              helping you make informed decisions that drive success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 text-4xl shadow-2xl group-hover:scale-110 transition-transform">
                🎯
              </div>
              <h3 className="text-3xl font-bold mb-6">Expert Analysis</h3>
              <p className="text-xl text-gray-300 leading-relaxed">
                Benefit from 13+ years of consulting experience and deep industry knowledge.
                Our insights are backed by real-world experience and proven results.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 text-4xl shadow-2xl group-hover:scale-110 transition-transform">
                📈
              </div>
              <h3 className="text-3xl font-bold mb-6">Actionable Strategies</h3>
              <p className="text-xl text-gray-300 leading-relaxed">
                Get practical, implementable strategies that you can apply immediately to
                improve your business performance and competitive advantage.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-8 text-4xl shadow-2xl group-hover:scale-110 transition-transform">
                🌍
              </div>
              <h3 className="text-3xl font-bold mb-6">Ethiopian Market Focus</h3>
              <p className="text-xl text-gray-300 leading-relaxed">
                Specialized insights for the Ethiopian business landscape, including local
                market dynamics, regulatory considerations, and growth opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-24 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
            Put our expert insights into action. Contact Ma Services Solution today for personalized
            consulting services that drive measurable business results.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-gray-900 px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              Schedule Free Consultation
            </button>
            <button className="border-2 border-white/50 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/10 hover:border-white transition-all duration-300">
              Browse All Articles
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
