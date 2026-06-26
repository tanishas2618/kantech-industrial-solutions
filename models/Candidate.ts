import mongoose, { Schema, Document } from 'mongoose'

export interface ICandidate extends Document {
  name: string
  email: string
  phone: string
  qualification: string
  experience: string
  location: string
  skills: string
  resumeFileName: string
  resumeData?: Buffer
  resumeMimeType: string
  status: 'new' | 'shortlisted' | 'placed' | 'rejected'
  createdAt: Date
  updatedAt: Date
}

const CandidateSchema = new Schema<ICandidate>(
  {
    name:            { type: String, required: true, trim: true },
    email:           { type: String, required: true, trim: true, lowercase: true },
    phone:           { type: String, required: true, trim: true },
    qualification:   { type: String, required: true, trim: true },
    experience:      { type: String, default: '', trim: true },
    location:        { type: String, default: '', trim: true },
    skills:          { type: String, required: true, trim: true },
    resumeFileName:  { type: String, default: '' },
    resumeData:      { type: Buffer },
    resumeMimeType:  { type: String, default: '' },
    status:          { type: String, enum: ['new','shortlisted','placed','rejected'], default: 'new' },
  },
  { timestamps: true }
)

export default mongoose.models.Candidate || mongoose.model<ICandidate>('Candidate', CandidateSchema)
