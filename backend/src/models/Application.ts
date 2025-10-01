import mongoose from 'mongoose'

const ApplicationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  position: String,
  resumePath: String,
  coverLetter: String,
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Application', ApplicationSchema)
