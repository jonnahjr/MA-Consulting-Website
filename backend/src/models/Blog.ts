import mongoose from 'mongoose'

const BlogSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  content: String,
  excerpt: String,
  tags: [String],
  published: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Blog', BlogSchema)
