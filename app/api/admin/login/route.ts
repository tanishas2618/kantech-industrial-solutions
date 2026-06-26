import { NextRequest, NextResponse } from 'next/server'
import { signToken } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()
    const adminUser = process.env.ADMIN_USERNAME || 'admin'
    const adminPass = process.env.ADMIN_PASSWORD || 'kantech2024'

    if (username !== adminUser) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // In production, store hashed password in DB. For simplicity, compare directly.
    const valid = password === adminPass
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = signToken({ username, role: 'admin' })
    const res = NextResponse.json({ success: true })
    res.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8, // 8 hours
      path: '/',
    })
    return res
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
