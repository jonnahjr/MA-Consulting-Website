import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Meta from '../components/Meta'
import { LikeButton } from '../components/LikeButton'

interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  tags: string
  publishedAt: string
}

interface BlogEngagement {
  likes: number
  shares: number
  userLiked: boolean
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [engagement, setEngagement] = useState<BlogEngagement>({
    likes: 0,
    shares: 0,
    userLiked: false
  })

  useEffect(() => {
    // Fetch the specific blog post
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        const foundPost = data.find((p: BlogPost) => p.slug === slug)
        setPost(foundPost || null)
        setLoading(false)

        // Load engagement data from localStorage
        if (foundPost) {
          const storedEngagement = localStorage.getItem(`blog_${foundPost.id}_engagement`)
          if (storedEngagement) {
            setEngagement(JSON.parse(storedEngagement))
          }
        }
      })
      .catch(error => {
        console.error('Error fetching blog post:', error)
        setLoading(false)
      })
  }, [slug])

  const handleLike = () => {
    if (!post) return

    const newEngagement = {
      ...engagement,
      likes: engagement.userLiked ? engagement.likes - 1 : engagement.likes + 1,
      userLiked: !engagement.userLiked
    }

    setEngagement(newEngagement)
    localStorage.setItem(`blog_${post.id}_engagement`, JSON.stringify(newEngagement))
  }

  const handleShare = async () => {
    if (!post) return

    const url = window.location.href
    const title = post.title

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Check out this article: ${title}`,
          url
        })
        setEngagement(prev => ({ ...prev, shares: prev.shares + 1 }))
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(url)
        alert('Link copied to clipboard!')
        setEngagement(prev => ({ ...prev, shares: prev.shares + 1 }))
      } catch (error) {
        console.log('Error copying to clipboard:', error)
      }
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatContent = (content: string) => {
    // Simple content formatting - split by paragraphs and add basic styling
    return content.split('\n\n').map((paragraph, index) => (
      <p key={index} className="text-lg text-gray-700 leading-relaxed mb-6">
        {paragraph}
      </p>
    ))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mb-4"></div>
          <p className="text-2xl text-gray-600">Loading article...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="w-32 h-32 bg-gradient-to-br from-gray-300 to-gray-400 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <span className="text-6xl text-white">📝</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">The article you're looking for doesn't exist or has been removed.</p>
          <Link to="/blog">
            <button className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Back to Blog
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Meta
        title={`${post.title} - Ma Services Solution Blog`}
        description={post.content.substring(0, 160) + '...'}
      />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600/20 to-blue-600/20"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold mr-4 text-white">
                Article
              </span>
              <span className="text-purple-200">{formatDate(post.publishedAt)}</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {(post.tags ? post.tags.split(',').map(tag => tag.trim()) : []).map((tag, index) => (
                <span key={index} className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold text-white">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">MS</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Ma Services Solution</h3>
                    <p className="text-sm text-gray-500">Business Consulting Experts</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {formatDate(post.publishedAt)}
                </div>
              </div>

              {/* Engagement Buttons */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                <div className="flex items-center space-x-6">
                  <LikeButton postId={post.id} showCount={true} />

                  <button
                    onClick={handleShare}
                    className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    <span className="font-medium">{engagement.shares}</span>
                  </button>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                    className="w-10 h-10 bg-blue-400 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                    className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                    className="w-10 h-10 bg-blue-700 hover:bg-blue-800 rounded-full flex items-center justify-center transition-colors"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="prose prose-lg max-w-none">
                  {formatContent(post.content)}
                </div>
              </motion.div>
            </div>

            {/* Article Footer */}
            <div className="mt-8 bg-white rounded-3xl shadow-lg p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">MS</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Ma Services Solution</h4>
                    <p className="text-gray-600">Expert Business Consulting</p>
                  </div>
                </div>
                <Link to="/blog">
                  <button className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    ← Back to Blog
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}