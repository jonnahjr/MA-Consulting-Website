import { useState, useEffect } from 'react'

interface LikeButtonProps {
  postId: string
  size?: 'sm' | 'md' | 'lg'
  showCount?: boolean
}

export const LikeButton = ({ postId, size = 'md', showCount = false }: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Load like status from localStorage
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]')
    const likedCounts = JSON.parse(localStorage.getItem('likedCounts') || '{}')

    setIsLiked(likedPosts.includes(postId))
    setLikeCount(likedCounts[postId] || 0)
  }, [postId])

  const handleLike = () => {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]')
    const likedCounts = JSON.parse(localStorage.getItem('likedCounts') || '{}')

    if (!isLiked) {
      // Like the post
      likedPosts.push(postId)
      likedCounts[postId] = (likedCounts[postId] || 0) + 1
      setIsAnimating(true)

      // Reset animation after it completes
      setTimeout(() => setIsAnimating(false), 600)
    } else {
      // Unlike the post
      const index = likedPosts.indexOf(postId)
      if (index > -1) {
        likedPosts.splice(index, 1)
        likedCounts[postId] = Math.max((likedCounts[postId] || 0) - 1, 0)
      }
    }

    localStorage.setItem('likedPosts', JSON.stringify(likedPosts))
    localStorage.setItem('likedCounts', JSON.stringify(likedCounts))

    setIsLiked(!isLiked)
    setLikeCount(likedCounts[postId] || 0)
  }

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  return (
    <div className="relative flex items-center space-x-2">
      <button
        onClick={handleLike}
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center transition-all duration-300 relative overflow-hidden transform hover:scale-110 active:scale-95 ${
          isLiked
            ? 'bg-red-100 shadow-lg shadow-red-200'
            : 'bg-gray-100 hover:bg-red-50'
        } ${isAnimating ? 'animate-pulse' : ''}`}
      >
        {/* Heart Icon */}
        <svg
          className={`${iconSizes[size]} transition-all duration-300 ${
            isLiked ? 'text-red-600 scale-110' : 'text-gray-600'
          } ${isAnimating ? 'animate-bounce' : ''}`}
          fill={isLiked ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>

        {/* Particle Effects */}
        {isAnimating && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-red-400 rounded-full animate-ping"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-15px)`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '0.6s'
                }}
              />
            ))}
          </div>
        )}

        {/* Ripple Effect */}
        {isAnimating && (
          <div className="absolute inset-0 rounded-full bg-red-200 animate-ping opacity-75" />
        )}
      </button>

      {showCount && (
        <span
          className={`text-sm font-medium transition-all duration-300 ${
            isLiked ? 'text-red-600' : 'text-gray-600'
          } ${isAnimating ? 'scale-125' : ''}`}
        >
          {likeCount}
        </span>
      )}
    </div>
  )
}