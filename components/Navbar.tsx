'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Facebook, Linkedin } from 'lucide-react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/industries', label: 'Industries' },
  { href: '/employers', label: 'Employers' },
  { href: '/candidates', label: 'Candidates' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(10,25,47,0.98)' : 'rgba(10,25,47,0.93)',
        backdropFilter: 'blur(18px)',
        borderBottom: '1px solid rgba(14,116,144,0.2)',
        height: '74px',
      }}>
      <div className="max-w-[1360px] mx-auto px-6 h-full flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 no-underline group">
          <Image src="/logo.png" alt="KANTECH INDUSTRIAL SOLUTIONS" width={52} height={52} className="object-contain" priority />
          <div className="flex flex-col leading-tight">
            <span className="font-black text-[13px] tracking-[0.8px] uppercase text-white">
              KANTECH INDUSTRIAL SOLUTIONS
            </span>
            <span className="text-[8.5px] font-bold tracking-[2.5px] uppercase grad-text">
              Est. 2012 · Quality, Not Quantity
            </span>
          </div>
        </Link>

        {/* DESKTOP */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map(({ href, label }) => (
            <Link key={href} href={href}
              className={`relative px-[13px] py-2 text-[13.5px] font-medium rounded-md transition-colors duration-200 group
                ${pathname === href ? 'text-white' : 'text-slate-300 hover:text-white'}`}>
              {label}
              <span className={`absolute bottom-[4px] left-[13px] right-[13px] h-[2px] rounded-full transition-transform duration-300 origin-left
                ${pathname === href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                style={{ background: 'var(--gold)' }} />
            </Link>
          ))}
          <div className="flex items-center gap-2 ml-2">
            <a href="https://www.facebook.com/surendar.nair" target="_blank" rel="noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded border transition-all duration-200 hover:border-[#D4A017] hover:shadow-[0_0_8px_rgba(212,160,23,0.2)]"
              style={{ border:'1px solid var(--bdr)', background:'rgba(255,255,255,0.04)' }}>
              <Facebook size={13} className="text-slate-400 hover:text-[#D4A017] transition-colors" />
            </a>
            <a href="https://www.linkedin.com/company/kantech-industrial-solutions/" target="_blank" rel="noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded border transition-all duration-200 hover:border-[#D4A017] hover:shadow-[0_0_8px_rgba(212,160,23,0.2)]"
              style={{ border:'1px solid var(--bdr)', background:'rgba(255,255,255,0.04)' }}>
              <Linkedin size={13} className="text-slate-400 hover:text-[#D4A017] transition-colors" />
            </a>
          </div>
          <Link href="/admin"
            className="ml-2 px-5 py-[9px] rounded-[7px] text-white text-[13px] font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(212,160,23,0.3)]"
            style={{ background:'linear-gradient(135deg,#0E7490,#1565C0)', border:'1px solid rgba(255,255,255,0.1)' }}>
            Admin ↗
          </Link>
        </div>

        {/* MOBILE */}
        <button className="lg:hidden p-2 text-slate-300" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE DRAWER */}
      {open && (
        <div className="lg:hidden border-t" style={{ background:'rgba(10,25,47,0.99)', borderColor:'#1E3A5F' }}>
          {links.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}
              className={`block px-6 py-3 text-[14px] font-medium border-b transition-colors
                ${pathname === href ? 'text-cyan-400' : 'text-slate-300 hover:text-white'}`}
              style={{ borderColor:'rgba(30,58,95,0.5)' }}>
              {label}
            </Link>
          ))}
          <Link href="/admin" onClick={() => setOpen(false)}
            className="block px-6 py-3 text-cyan-400 font-bold text-[14px]">
            Admin Dashboard ↗
          </Link>
        </div>
      )}
    </nav>
  )
}
