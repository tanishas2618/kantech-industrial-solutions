import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Employer from '@/models/Employer'

export async function POST(req: NextRequest) {
  try {
    await dbConnect()
    const body = await req.json()
    const { name, company, email, phone, industry, requirements } = body

    if (!name || !company || !email || !phone || !industry || !requirements) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const employer = await Employer.create({ name, company, email, phone, industry, requirements })
    return NextResponse.json({ success: true, id: employer._id }, { status: 201 })
  } catch (err) {
    console.error('Employer POST error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
