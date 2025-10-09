import React, { useState, useEffect } from 'react'
import RichTextEditor from './RichTextEditor'

interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  tags: string
  publishedAt: string
  createdAt: string
}

interface BlogModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (blogPost: { title: string; slug: string; content: string; tags: string; publishedAt: string }) => void
  editingPost: BlogPost | null
}

const BlogModal: React.FC<BlogModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingPost
}) => {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [publishedAt, setPublishedAt] = useState('')

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title)
      setSlug(editingPost.slug)
      setContent(editingPost.content)
      setTags(editingPost.tags)
      setPublishedAt(editingPost.publishedAt ? editingPost.publishedAt.split('T')[0] : '')
    } else {
      // Reset form for new post
      setTitle('')
      setSlug('')
      setContent('')
      setTags('')
      setPublishedAt(new Date().toISOString().split('T')[0])
    }
  }, [editingPost, isOpen])

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    if (!editingPost || !slug) {
      setSlug(generateSlug(newTitle))
    }
  }

  const handleSave = () => {
    if (!title.trim()) {
      alert('Title is required')
      return
    }

    if (!content.trim()) {
      alert('Content is required')
      return
    }

    const blogPost = {
      title: title.trim(),
      slug: slug.trim() || generateSlug(title),
      content,
      tags: tags.trim(),
      publishedAt: publishedAt || ''
    }

    onSave(blogPost)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Enter blog post title"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug (URL)
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="url-friendly-slug"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                This will be used in the URL: /blog/{slug}
              </p>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="tag1, tag2, tag3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Publish Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Publish Date
              </label>
              <input
                type="date"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Leave empty for draft. Set a date to publish.
              </p>
            </div>

            {/* Content Editor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <RichTextEditor
                value={content}
                onChange={setContent}
                placeholder="Write your blog post content here..."
                className="min-h-[400px]"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-4 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {editingPost ? 'Update Post' : 'Create Post'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default BlogModal