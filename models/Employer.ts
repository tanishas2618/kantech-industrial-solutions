import mongoose, { Schema, Document } from 'mongoose'

export interface IEmployer extends Document {
  name: string
  company: string
  email: string
  phone: string
  industry: string
  requirements: string
  status: 'new' | 'reviewed' | 'contacted' | 'closed'
  createdAt: Date
  updatedAt: Date
}

const EmployerSchema = new Schema<IEmployer>(
  {
    name:         { type: String, required: true, trim: true },
    company:      { type: String, required: true, trim: true },
    email:        { type: String, required: true, trim: true, lowercase: true },
    phone:        { type: String, required: true, trim: true },
    industry:     { type: String, required: true, trim: true },
    requirements: { type: String, required: true, trim: true },
    status:       { type: String, enum: ['new','reviewed','contacted','closed'], default: 'new' },
  },
  { timestamps: true }
)

export default mongoose.models.Employer || mongoose.model<IEmployer>('Employer', EmployerSchema)
