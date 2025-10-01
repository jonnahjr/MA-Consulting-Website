import mongoose from 'mongoose'

const JobSchema = new mongoose.Schema({
  title: String,
  location: String,
  type: String,
  description: String,
  requirements: [String],
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Job', JobSchema)
