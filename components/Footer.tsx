'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ background:'var(--bg2)', borderTop:'1px solid var(--bdr)' }} className="pt-16 pb-8">
      <div className="max-w-[1360px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo.png" alt="KANTECH" width={48} height={48} className="object-contain" />
              <div>
                <div className="font-black text-[13px] tracking-wide uppercase text-white">KANTECH INDUSTRIAL SOLUTIONS</div>
                <div className="text-[9px] font-bold tracking-[2px] uppercase grad-text mt-0.5">Est. 2012 · Quality, Not Quantity</div>
              </div>
            </div>
            <p className="text-[13.5px] leading-relaxed mb-5" style={{color:'var(--tm)'}}>
              Premium recruitment consultancy serving 11 industrial sectors with 14+ years of expertise.
              Delivering qualified candidate profiles within 7 working days.
            </p>
            <div className="flex gap-2">
              {[
                { href:'https://www.facebook.com/surendar.nair', label:'📘' },
                { href:'https://www.linkedin.com/company/kantech-industrial-solutions/', label:'💼' },
                { href:'https://api.whatsapp.com/send?phone=919789680187', label:'💬' },
                { href:'mailto:premkkantech@yahoo.com', label:'✉️' },
              ].map((s,i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-lg border text-base transition-all duration-200 hover:border-teal-400"
                  style={{background:'rgba(255,255,255,0.04)',borderColor:'var(--bdr)'}}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-white font-bold text-[12px] uppercase tracking-[1.5px] mb-4">Quick Links</h4>
            <ul className="flex flex-col gap-2">
              {[['/',  'Home'],[ '/about','About Us'],['/services','Services'],['/industries','Industries'],
                ['/employers','For Employers'],['/candidates','For Candidates'],['/contact','Contact']
              ].map(([href,label]) => (
                <li key={href}><Link href={href} className="text-[13.5px] hover:text-cyan-400 transition-colors" style={{color:'var(--tm)'}}>{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h4 className="text-white font-bold text-[12px] uppercase tracking-[1.5px] mb-4">Our Services</h4>
            <ul className="flex flex-col gap-2">
              {['Executive Search','Permanent Placement','Staffing Solutions','Talent Acquisition','Leadership Hiring','Workforce Planning','Career Placement'].map(s => (
                <li key={s}><Link href="/services" className="text-[13.5px] hover:text-cyan-400 transition-colors" style={{color:'var(--tm)'}}>{s}</Link></li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-white font-bold text-[12px] uppercase tracking-[1.5px] mb-4">Contact Us</h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2">
                <Phone size={14} className="mt-0.5 flex-shrink-0" style={{color:'var(--teal3)'}} />
                <div>
                  <a href="tel:9789680187" className="block text-[13.5px] hover:text-cyan-400 transition-colors" style={{color:'var(--tm)'}}>+91 97896 80187</a>
                  <a href="tel:9677333184" className="block text-[13.5px] hover:text-cyan-400 transition-colors" style={{color:'var(--tm)'}}>+91 96773 33184</a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={14} className="mt-0.5 flex-shrink-0" style={{color:'var(--teal3)'}} />
                <a href="mailto:premkkantech@yahoo.com" className="text-[13.5px] hover:text-cyan-400 transition-colors break-all" style={{color:'var(--tm)'}}>premkkantech@yahoo.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" style={{color:'var(--teal3)'}} />
                <span className="text-[13px] leading-relaxed" style={{color:'var(--tm)'}}>
                  #58/A, 18, 2nd Floor, K.P Complex,<br/>Near Agarwal Hospital,<br/>Bangalore Bye-Pass Road,<br/>Hosur – 635109
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8" style={{borderTop:'1px solid var(--bdr)'}}>
          <p className="text-[12.5px]" style={{color:'var(--tm)'}}>© 2025 KANTECH INDUSTRIAL SOLUTIONS. All rights reserved.</p>
          <p className="text-[12.5px] italic" style={{color:'var(--tm)'}}>"We Serve Quality, Not Quantity"</p>
        </div>
      </div>
    </footer>
  )
}
