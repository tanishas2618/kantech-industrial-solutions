import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import Employer from '@/models/Employer'

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    await dbConnect()
    const { searchParams } = new URL(req.url)
    const search   = searchParams.get('search') || ''
    const industry = searchParams.get('industry') || ''
    const status   = searchParams.get('status') || ''
    const page     = parseInt(searchParams.get('page') || '1')
    const limit    = parseInt(searchParams.get('limit') || '20')

    const query: Record<string, unknown> = {}
    if (search)   query.$or = [{ name: new RegExp(search,'i') }, { company: new RegExp(search,'i') }, { email: new RegExp(search,'i') }]
    if (industry) query.industry = new RegExp(industry,'i')
    if (status)   query.status = status

    const total = await Employer.countDocuments(query)
    const employers = await Employer.find(query)
      .select('-__v')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()

    return NextResponse.json({ employers, total, page, pages: Math.ceil(total / limit) })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  if (!isAuthenticated(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    await dbConnect()
    const { id, status } = await req.json()
    await Employer.findByIdAndUpdate(id, { status })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
