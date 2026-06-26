import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Candidate from '@/models/Candidate'

export const config = { api: { bodyParser: false } }

export async function POST(req: NextRequest) {
  try {
    await dbConnect()
    const formData = await req.formData()

    const name          = formData.get('name') as string
    const email         = formData.get('email') as string
    const phone         = formData.get('phone') as string
    const qualification = formData.get('qualification') as string
    const experience    = formData.get('experience') as string || ''
    const location      = formData.get('location') as string || ''
    const skills        = formData.get('skills') as string

    if (!name || !email || !phone || !qualification || !skills) {
      return NextResponse.json({ error: 'Required fields missing' }, { status: 400 })
    }

    const candidateData: {
      name: string; email: string; phone: string; qualification: string
      experience: string; location: string; skills: string
      resumeFileName?: string; resumeData?: Buffer; resumeMimeType?: string
    } = { name, email, phone, qualification, experience, location, skills }

    const resumeFile = formData.get('resume') as File | null
    if (resumeFile && resumeFile.size > 0) {
      const maxSize = 5 * 1024 * 1024 // 5MB
      if (resumeFile.size > maxSize) {
        return NextResponse.json({ error: 'Resume file must be under 5MB' }, { status: 400 })
      }
      const allowed = ['application/pdf','application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (!allowed.includes(resumeFile.type)) {
        return NextResponse.json({ error: 'Only PDF/DOC/DOCX allowed' }, { status: 400 })
      }
      const bytes = await resumeFile.arrayBuffer()
      candidateData.resumeFileName = resumeFile.name
      candidateData.resumeData     = Buffer.from(bytes)
      candidateData.resumeMimeType = resumeFile.type
    }

    const candidate = await Candidate.create(candidateData)
    return NextResponse.json({ success: true, id: candidate._id }, { status: 201 })
  } catch (err) {
    console.error('Candidate POST error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
