import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

const SECRET = process.env.JWT_SECRET as string

export function signToken(payload: Record<string, unknown>): string {
  return jwt.sign(payload, SECRET, { expiresIn: '8h' })
}

export function verifyToken(token: string): jwt.JwtPayload | null {
  try {
    return jwt.verify(token, SECRET) as jwt.JwtPayload
  } catch {
    return null
  }
}

export function isAuthenticated(req: NextRequest): boolean {
  const cookie = req.cookies.get('admin_token')?.value
  if (!cookie) return false
  return !!verifyToken(cookie)
}
