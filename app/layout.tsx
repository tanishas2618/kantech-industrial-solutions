import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import Ticker from '@/components/Ticker'

export const metadata: Metadata = {
  title: 'KANTECH INDUSTRIAL SOLUTIONS | Premium Recruitment Consultancy',
  description: 'KANTECH INDUSTRIAL SOLUTIONS — We Serve Quality, Not Quantity. Premium recruitment & staffing consultancy serving 11 industrial sectors since 2012. Hosur, Tamil Nadu.',
  keywords: 'recruitment consultancy, staffing solutions, industrial recruitment, Hosur, Tamil Nadu, manufacturing, IT, pharma, chemical, packaging recruitment',
  openGraph: {
    title: 'KANTECH INDUSTRIAL SOLUTIONS',
    description: 'We Serve Quality, Not Quantity — Premium Recruitment Consultancy Since 2012',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body>
        <Navbar />
        <Ticker />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  )
}
