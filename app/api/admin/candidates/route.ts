import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import Candidate from '@/models/Candidate'

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    await dbConnect()
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || ''
    const page   = parseInt(searchParams.get('page') || '1')
    const limit  = parseInt(searchParams.get('limit') || '20')
    const dlId   = searchParams.get('download')

    // ── Resume download ──
    if (dlId) {
      const candidate = await Candidate.findById(dlId).select('resumeData resumeFileName resumeMimeType')
      if (!candidate?.resumeData) {
        return NextResponse.json({ error: 'No resume found' }, { status: 404 })
      }
      return new NextResponse(candidate.resumeData, {
        headers: {
          'Content-Type': candidate.resumeMimeType || 'application/octet-stream',
          'Content-Disposition': `attachment; filename="${candidate.resumeFileName}"`,
        },
      })
    }

    // ── List ──
    const query: Record<string, unknown> = {}
    if (search) query.$or = [{ name: new RegExp(search,'i') }, { email: new RegExp(search,'i') }, { skills: new RegExp(search,'i') }]
    if (status) query.status = status

    const total = await Candidate.countDocuments(query)
    const candidates = await Candidate.find(query)
      .select('-resumeData -__v')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()

    return NextResponse.json({ candidates, total, page, pages: Math.ceil(total / limit) })
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
    await Candidate.findByIdAndUpdate(id, { status })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
