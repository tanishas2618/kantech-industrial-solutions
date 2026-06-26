'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

function useCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true) }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  useEffect(() => {
    if (!started) return
    let start = 0
    const step = Math.ceil(target / (duration / 16))
    const timer = setInterval(() => {
      start = Math.min(start + step, target)
      setCount(start)
      if (start >= target) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [started, target, duration])
  return { count, ref }
}

function Counter({ target, suffix = '', label }: { target: number; suffix?: string; label: string }) {
  const { count, ref } = useCounter(target)
  return (
    <div ref={ref} className="text-center py-8 px-4 border-r last:border-r-0" style={{ borderColor: 'var(--bdr)', background: 'var(--bg2)' }}>
      <div className="font-serif font-black text-5xl leading-none grad-text mb-2">{count.toLocaleString()}{suffix}</div>
      <div className="text-[11.5px] uppercase tracking-widest" style={{ color: 'var(--tm)' }}>{label}</div>
    </div>
  )
}

const services = [
  { icon: '👑', title: 'Executive Search', img: 'photo-1521737711867-e3b97375f902', desc: 'Identifying experienced professionals for key managerial and leadership positions across industries.' },
  { icon: '🏢', title: 'Permanent Placement', img: 'photo-1600880292203-757bb62b4baf', desc: 'End-to-end recruitment for long-term positions with thorough candidate evaluation and onboarding.' },
  { icon: '👥', title: 'Staffing Solutions', img: 'photo-1552664730-d307ca884978', desc: 'Providing businesses with skilled professionals for contract, project, and seasonal staffing needs.' },
]

const industries = [
  { icon: '⚙️', label: 'Industrial Engineering & Manufacturing', img: 'photo-1565043589221-1a6fd9ae45c7' },
  { icon: '💻', label: 'Information Technology & Telecom', img: 'photo-1518770660439-4636190af475' },
  { icon: '🏦', label: 'Banking & Financial Services', img: 'photo-1611974789855-9c2a0a7236a3' },
  { icon: '🚚', label: 'Supply Chain & Logistics', img: 'photo-1578575437130-527eed3abbec' },
]

const whyUs = [
  { icon: '🎖️', title: 'Established Since 2012', desc: 'Over a decade of deep recruitment expertise across 11 industrial sectors with proven results.' },
  { icon: '⚡', title: '7-Day Candidate Delivery', desc: 'Qualified candidate profiles delivered within seven working days of receiving your requirement.' },
  { icon: '🔄', title: '3-Month Replacement Support', desc: 'Replacement support provided during the agreed replacement period at no additional cost.' },
  { icon: '🏭', title: 'Industry Expertise', desc: 'Specialized hiring solutions across 11 sectors — manufacturing, IT, pharma, chemical, banking and more.' },
  { icon: '🔍', title: 'Quality-Focused Recruitment', desc: 'We focus on finding the right talent, not simply filling vacancies. Every placement is precision-matched.' },
  { icon: '🤝', title: 'Long-Term Partnerships', desc: 'We build lasting relationships with clients and candidates grounded in trust, integrity, and results.' },
]

const process = [
  { n: '01', ico: '📋', label: 'Understand\nRequirement' },
  { n: '02', ico: '🔍', label: 'Talent\nSearch' },
  { n: '03', ico: '✅', label: 'Screening' },
  { n: '04', ico: '📑', label: 'Shortlisting' },
  { n: '05', ico: '🤝', label: 'Interview' },
  { n: '06', ico: '🎯', label: 'Placement' },
]

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[calc(100vh-82px)] flex items-center overflow-hidden" style={{ background: 'var(--bg)' }}>
        {/* grid bg */}
        <div className="absolute inset-0 grid-drift pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(14,116,144,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(14,116,144,.15) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        {/* glows */}
        <div className="absolute pointer-events-none" style={{ width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle,rgba(14,116,144,.1) 0%,transparent 70%)', top: -150, right: -150 }} />
        <div className="absolute pointer-events-none" style={{ width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(21,101,192,.08) 0%,transparent 70%)', bottom: -100, left: -100 }} />

        <div className="relative z-10 max-w-[1360px] mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-[11.5px] font-bold uppercase tracking-[1.5px] text-cyan-300"
              style={{ background: 'rgba(14,116,144,.12)', border: '1px solid rgba(14,116,144,.3)' }}>
              <span className="w-2 h-2 rounded-full pulse-dot" style={{ background: 'var(--teal3)' }} />
              Premium Recruitment Consultancy · Hosur, India
            </div>
            <h1 className="text-4xl lg:text-[3.5rem] font-black leading-[1.08] mb-3">
              Connecting <span className="grad-text font-serif italic">Elite Talent</span><br />With Industry Leaders
            </h1>
            <p className="text-xl font-bold mb-3" style={{ color: 'var(--gold)' }}>"We Serve Quality, Not Quantity"</p>
            <p className="text-[1.05rem] leading-[1.78] mb-8 max-w-[510px]" style={{ color: 'var(--ts)' }}>
              KANTECH INDUSTRIAL SOLUTIONS delivers precision recruitment and staffing solutions across 11 industrial sectors since 2012. Trusted by 500+ organizations across India.
            </p>
            <div className="flex gap-3 flex-wrap mb-10">
              <Link href="/employers"
                className="px-8 py-3.5 rounded-[9px] text-white font-bold text-[14.5px] transition-all duration-300 hover:-translate-y-1"
                style={{ background: 'linear-gradient(135deg,#0E7490,#1565C0)', boxShadow: '0 6px 24px rgba(14,116,144,.35)' }}>
                🏢 &nbsp;Hire Talent
              </Link>
              <Link href="/candidates"
                className="px-8 py-3.5 rounded-[9px] font-semibold text-[14.5px] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:text-cyan-300"
                style={{ background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,.2)' }}>
                📄 &nbsp;Submit Resume
              </Link>
            </div>
            {/* mini stats */}
            <div className="grid grid-cols-4 rounded-xl overflow-hidden border" style={{ borderColor: 'var(--bdr)', background: 'var(--bdr)' }}>
              {[['14+','Years Experience'],['11','Industry Sectors'],['7','Day Delivery'],['3mo','Replacement']].map(([n,l],i) => (
                <div key={i} className="text-center py-4 px-2" style={{ background: 'var(--bg2)' }}>
                  <div className="font-serif font-black text-[1.8rem] leading-none grad-text">{n}</div>
                  <div className="text-[10.5px] uppercase tracking-widest mt-1" style={{ color: 'var(--tm)' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — orbital */}
          <div className="hidden lg:block relative h-[540px]">
            {[['rot-cw','450px'],['rot-ccw','310px'],['rot-cw3','190px']].map(([cls,sz],i) => (
              <div key={i} className={`${cls} absolute rounded-full`} style={{ width: sz, height: sz, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', border: `1px solid rgba(14,116,144,${0.18-i*0.04})` }} />
            ))}
            <div className="absolute rounded-full flex items-center justify-center" style={{ width: 140, height: 140, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'rgba(10,25,47,0.9)', border: '2px solid rgba(14,116,144,0.4)', boxShadow: '0 0 60px rgba(14,116,144,0.25)' }}>
              <Image src="/logo.png" alt="KanTech" width={110} height={110} className="object-contain" />
            </div>
            {[['od1 w-3 h-3','#22D3EE'],['od2 w-2.5 h-2.5','var(--gold)'],['od3 w-2 h-2','#4ade80']].map(([cls,bg],i) => (
              <div key={i} className={`${cls} absolute rounded-full`} style={{ top: '50%', left: '50%', background: bg, boxShadow: `0 0 12px ${bg}` }} />
            ))}
            {/* float card 1 */}
            <div className="el-float absolute rounded-2xl p-5" style={{ top: 25, right: 10, minWidth: 185, background: 'var(--bg3)', border: '1px solid var(--bdr2)' }}>
              <div className="text-2xl mb-2">🎯</div>
              <div className="text-[10px] uppercase tracking-[1.5px] mb-1" style={{ color: 'var(--tm)' }}>Placements Made</div>
              <div className="text-2xl font-black">5,000+</div>
              <div className="text-[11px] mt-1 grad-text">Across 11 Industries</div>
            </div>
            {/* float card 2 */}
            <div className="el-float2 absolute rounded-2xl p-5" style={{ bottom: 55, left: 5, minWidth: 175, background: 'var(--bg3)', border: '1px solid var(--bdr2)' }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ background: 'rgba(74,222,128,.1)' }}>✅</div>
                <div>
                  <div className="text-[10px]" style={{ color: 'var(--tm)' }}>Latest Match</div>
                  <div className="text-[13px] font-bold">Sr. Engineer · ₹16L</div>
                </div>
              </div>
              <div className="text-[11px]" style={{ color: 'var(--tm)' }}>Industrial Manufacturing</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-b" style={{ borderColor: 'var(--bdr)', background: 'var(--bg2)' }}>
        <Counter target={14} suffix="+" label="Years of Excellence" />
        <Counter target={11} label="Industry Sectors" />
        <Counter target={500} suffix="+" label="Corporate Clients" />
        <Counter target={5000} suffix="+" label="Successful Placements" />
      </div>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-24" style={{ background: 'var(--bg2)' }}>
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="text-center mb-12">
            <div className="sec-tag sec-tag-teal">Why Choose Us</div>
            <h2 className="text-4xl font-black mb-3">What Sets <span className="grad-text">KANTECH</span> Apart</h2>
            <p className="text-[1.05rem] max-w-[560px] mx-auto" style={{ color: 'var(--ts)' }}>
              We go beyond conventional recruitment — delivering talent intelligence, strategic workforce solutions, and measurable outcomes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((w, i) => (
              <div key={i} className="flex gap-4 p-7 rounded-2xl border card-hover" style={{ background: 'var(--bg)', borderColor: 'var(--bdr)' }}>
                <div className="w-13 h-13 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 border" style={{ background: 'rgba(14,116,144,.12)', borderColor: 'rgba(14,116,144,.2)', width: 52, height: 52 }}>{w.icon}</div>
                <div>
                  <div className="font-bold text-white mb-1">{w.title}</div>
                  <div className="text-[13px] leading-relaxed" style={{ color: 'var(--ts)' }}>{w.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES PREVIEW ── */}
      <section className="py-24" style={{ background: 'var(--bg)' }}>
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <div className="sec-tag sec-tag-teal">Our Services</div>
              <h2 className="text-4xl font-black">Comprehensive <span className="grad-text">Talent Solutions</span></h2>
            </div>
            <Link href="/services" className="px-6 py-2.5 rounded-lg font-semibold text-[13.5px] transition-all hover:border-cyan-400 hover:text-cyan-300"
              style={{ border: '2px solid rgba(255,255,255,.2)', color: '#fff' }}>View All Services →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={i} className="rounded-2xl border card-hover" style={{ background: 'var(--bg2)', borderColor: 'var(--bdr)' }}>
                <div className="h-44 rounded-t-2xl overflow-hidden relative">
                  <img src={`https://images.unsplash.com/${s.img}?w=600&q=80`} alt={s.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0" style={{ background: 'rgba(10,25,47,.35)' }} />
                </div>
                <div className="p-7">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4 border" style={{ background: 'rgba(14,116,144,.12)', borderColor: 'rgba(14,116,144,.2)' }}>{s.icon}</div>
                  <div className="font-bold text-[1.05rem] mb-2">{s.title}</div>
                  <div className="text-[13.5px] leading-relaxed" style={{ color: 'var(--ts)' }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES PREVIEW ── */}
      <section className="py-24" style={{ background: 'var(--bg2)' }}>
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="text-center mb-12">
            <div className="sec-tag sec-tag-teal">Industries We Serve</div>
            <h2 className="text-4xl font-black">Expertise Across <span className="grad-text">11 Sectors</span></h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {industries.map((ind, i) => (
              <div key={i} className="relative h-52 rounded-2xl overflow-hidden border cursor-pointer group transition-all duration-300 hover:-translate-y-1"
                style={{ borderColor: 'var(--bdr)', boxShadow: '0 0 0 0 transparent' }}>
                <img src={`https://images.unsplash.com/${ind.img}?w=500&q=80`} alt={ind.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 transition-all duration-300" style={{ background: 'linear-gradient(to top,rgba(10,25,47,.93) 0%,rgba(10,25,47,.2) 100%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-2xl mb-1">{ind.icon}</div>
                  <div className="font-bold text-[13px] text-white">{ind.label}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/industries"
              className="inline-block px-8 py-3.5 rounded-[9px] text-white font-bold transition-all hover:-translate-y-1"
              style={{ background: 'linear-gradient(135deg,#0E7490,#1565C0)' }}>
              Explore All 11 Industries →
            </Link>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-24" style={{ background: 'var(--bg)' }}>
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="text-center mb-14">
            <div className="sec-tag sec-tag-teal">Our Process</div>
            <h2 className="text-4xl font-black">How We <span className="grad-text">Deliver Excellence</span></h2>
            <p className="text-[1.05rem] max-w-[520px] mx-auto mt-2" style={{ color: 'var(--ts)' }}>A proven 6-step methodology ensuring perfect candidate–role alignment every time.</p>
          </div>
          <div className="relative process-line grid grid-cols-3 lg:grid-cols-6 gap-4">
            {process.map((p, i) => (
              <div key={i} className="text-center relative z-10 group">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center font-serif font-black text-[1.4rem] transition-all duration-300 group-hover:scale-110 cursor-default"
                  style={{ background: 'var(--bg2)', border: '2px solid var(--teal)', color: 'var(--teal3)' }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.background = 'linear-gradient(135deg,#0E7490,#1565C0)'; el.style.color = '#fff'; el.style.borderColor = 'transparent'; }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'var(--bg2)'; el.style.color = 'var(--teal3)'; el.style.borderColor = 'var(--teal)'; }}>
                  {p.n}
                </div>
                <div className="text-2xl mb-1">{p.ico}</div>
                <div className="text-[12.5px] font-semibold whitespace-pre-line" style={{ color: 'var(--ts)' }}>{p.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DUAL CTA ── */}
      <section className="py-24" style={{ background: 'var(--bg2)' }}>
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'For Employers', desc: 'Share your hiring requirement and receive qualified candidate profiles within 7 working days.', cta: 'Request Recruitment Support', href: '/employers', bg: 'linear-gradient(135deg,#0E7490,#1565C0)' },
              { title: 'For Candidates', desc: 'Submit your resume and let us connect you with the right career opportunity in your industry.', cta: 'Submit Your Resume', href: '/candidates', bg: 'linear-gradient(135deg,#1A237E,#1565C0)' },
            ].map((c, i) => (
              <div key={i} className="relative rounded-2xl p-14 text-center overflow-hidden" style={{ background: c.bg }}>
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#fff 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
                <h2 className="text-[1.7rem] font-black text-white mb-3 relative">{c.title}</h2>
                <p className="text-[14.5px] mb-6 relative" style={{ color: 'rgba(255,255,255,.82)' }}>{c.desc}</p>
                <Link href={c.href}
                  className="relative inline-block bg-white font-bold text-[14.5px] px-8 py-3.5 rounded-[9px] transition-all hover:-translate-y-1"
                  style={{ color: '#0E7490' }}>
                  {c.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
