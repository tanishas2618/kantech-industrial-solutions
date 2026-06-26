import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = { title: 'Admin Dashboard | KANTECH INDUSTRIAL SOLUTIONS' }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body style={{ fontFamily: 'Inter, sans-serif', background: 'var(--bg)', color: '#fff' }}>
        {children}
      </body>
    </html>
  )
}
