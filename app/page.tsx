'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Briefcase,
  Upload,
  Target,
  CheckCircle,
  Calendar,
  Grid,
  Building2,
  Users,
  Crown,
  Building,
  UserCheck,
  Settings,
  Laptop,
  Landmark,
  Truck,
  Award,
  Zap,
  ShieldCheck,
  Factory,
  SearchCode,
  Handshake,
  ClipboardList,
  Search,
  FileCheck,
  ChevronRight,
  FileText
} from 'lucide-react'

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

function Counter({
  target,
  suffix = '',
  label,
  icon: Icon
}: {
  target: number
  suffix?: string
  label: string
  icon: React.ElementType
}) {
  const { count, ref } = useCounter(target)

  return (
    <div ref={ref} className="glass-card text-center py-10 px-6 flex flex-col items-center">
      <Icon className="text-[#D4A017] mb-4 w-8 h-8" />
      <div className="font-serif font-black text-5xl leading-none grad-text mb-3">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-[11.5px] uppercase tracking-widest font-bold" style={{ color: 'var(--tm)' }}>
        {label}
      </div>
    </div>
  )
}

const services = [
  { icon: Crown, title: 'Executive Search', img: 'photo-1521737711867-e3b97375f902', desc: 'Identifying experienced professionals for key managerial and leadership positions across industries.' },
  { icon: UserCheck, title: 'Permanent Placement', img: 'photo-1600880292203-757bb62b4baf', desc: 'End-to-end recruitment for long-term positions with thorough candidate evaluation and onboarding.' },
  { icon: Users, title: 'Staffing Solutions', img: 'photo-1552664730-d307ca884978', desc: 'Providing businesses with skilled professionals for contract, project, and seasonal staffing needs.' },
]

const industries = [
  { icon: Settings, label: 'Industrial Engineering & Manufacturing', img: 'photo-1565043589221-1a6fd9ae45c7' },
  { icon: Laptop, label: 'Information Technology & Telecom', img: 'photo-1518770660439-4636190af475' },
  { icon: Landmark, label: 'Banking & Financial Services', img: 'photo-1611974789855-9c2a0a7236a3' },
  { icon: Truck, label: 'Supply Chain & Logistics', img: 'photo-1578575437130-527eed3abbec' },
]

const whyUs = [
  { icon: Award, title: 'Established Since 2012', desc: 'Over a decade of deep recruitment expertise across 11 industrial sectors with proven results.' },
  { icon: Zap, title: '7-Day Candidate Delivery', desc: 'Qualified candidate profiles delivered within seven working days of receiving your requirement.' },
  { icon: ShieldCheck, title: '3-Month Replacement Support', desc: 'Replacement support provided during the agreed replacement period at no additional cost.' },
  { icon: Factory, title: 'Industry Expertise', desc: 'Specialized hiring solutions across 11 sectors — manufacturing, IT, pharma, chemical, banking and more.' },
  { icon: SearchCode, title: 'Quality-Focused Recruitment', desc: 'We focus on finding the right talent, not simply filling vacancies. Every placement is precision-matched.' },
  { icon: Handshake, title: 'Long-Term Partnerships', desc: 'We build lasting relationships with clients and candidates grounded in trust, integrity, and results.' },
]

const processSteps = [
  { n: '01', ico: ClipboardList, label: 'Understand\nRequirement' },
  { n: '02', ico: Search, label: 'Talent\nSearch' },
  { n: '03', ico: UserCheck, label: 'Screening' },
  { n: '04', ico: FileCheck, label: 'Shortlisting' },
  { n: '05', ico: Users, label: 'Interview' },
  { n: '06', ico: Target, label: 'Placement' },
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
        <div className="absolute pointer-events-none" style={{ width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle,rgba(212,160,23,.06) 0%,transparent 70%)', top: -150, right: -150 }} />
        <div className="absolute pointer-events-none" style={{ width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(14,116,144,.08) 0%,transparent 70%)', bottom: -100, left: -100 }} />

        <div className="relative z-10 max-w-[1360px] mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-[11px] font-bold uppercase tracking-[1.5px] text-cyan-300"
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
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-[14.5px] transition-all duration-300 hover:-translate-y-1"
                style={{ background: 'linear-gradient(135deg,#0E7490,#1565C0)', boxShadow: '0 6px 24px rgba(14,116,144,.35)' }}>
                <Briefcase size={16} /> Hire Talent
              </Link>
              <Link href="/candidates"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-[14.5px] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:text-cyan-300"
                style={{ background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,.2)' }}>
                <Upload size={16} /> Submit Resume
              </Link>
            </div>
            {/* mini stats */}
            <div className="grid grid-cols-4 rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--bdr)', background: 'var(--bdr)' }}>
              {[['14+','Years Exp'],['11','Sectors'],['7','Day Delivery'],['3mo','Replacement']].map(([n,l],i) => (
                <div key={i} className="text-center py-4 px-2" style={{ background: 'var(--bg2)' }}>
                  <div className="font-serif font-black text-[1.8rem] leading-none grad-text">{n}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest mt-1.5" style={{ color: 'var(--tm)' }}>{l}</div>
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
            <div className="el-float absolute rounded-2xl p-5" style={{ top: 25, right: 10, minWidth: 185, background: 'var(--bg3)', border: '1px solid var(--bdr)' }}>
              <div className="text-xl mb-2 text-[#D4A017]"><Target size={22} /></div>
              <div className="text-[10px] uppercase tracking-[1.5px] mb-1" style={{ color: 'var(--tm)' }}>Placements Made</div>
              <div className="text-2xl font-black">5,000+</div>
              <div className="text-[11px] mt-1 grad-text font-bold">Across 11 Industries</div>
            </div>
            {/* float card 2 */}
            <div className="el-float2 absolute rounded-2xl p-5" style={{ bottom: 55, left: 5, minWidth: 175, background: 'var(--bg3)', border: '1px solid var(--bdr)' }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(74,222,128,.1)' }}>
                  <CheckCircle size={16} className="text-[#4ade80]" />
                </div>
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
      <section className="py-16 relative border-t border-b" style={{ borderColor: 'var(--bdr)', background: 'var(--bg2)' }}>
        <div className="max-w-[1360px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Counter target={14} suffix="+" label="Years of Excellence" icon={Calendar} />
          <Counter target={11} label="Industry Sectors" icon={Grid} />
          <Counter target={500} suffix="+" label="Corporate Clients" icon={Building2} />
          <Counter target={5000} suffix="+" label="Successful Placements" icon={Users} />
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-24" style={{ background: 'var(--bg2)' }}>
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="text-center mb-16">
            <div className="sec-tag sec-tag-teal">Why Choose Us</div>
            <h2 className="text-4xl font-black mb-3">What Sets <span className="grad-text">KANTECH</span> Apart</h2>
            <p className="text-[1.05rem] max-w-[560px] mx-auto" style={{ color: 'var(--ts)' }}>
              We go beyond conventional recruitment — delivering talent intelligence, strategic workforce solutions, and measurable outcomes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((w, i) => {
              const Icon = w.icon
              return (
                <div key={i} className="flex gap-5 p-8 rounded-2xl border transition-all duration-300 hover:border-[#D4A017] hover:shadow-[0_10px_25px_rgba(212,160,23,0.08)]" style={{ background: 'var(--bg)', borderColor: 'var(--bdr)' }}>
                  <div className="w-13 h-13 rounded-xl flex items-center justify-center flex-shrink-0 border bg-secondary/80 border-[rgba(14,116,144,0.25)] shadow-[0_0_15px_rgba(14,116,144,0.08)]" style={{ width: 52, height: 52 }}>
                    <Icon size={24} className="text-[#D4A017]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1.5 text-[16px]">{w.title}</h3>
                    <p className="text-[13px] leading-relaxed" style={{ color: 'var(--ts)' }}>{w.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── SERVICES PREVIEW ── */}
      <section className="py-24" style={{ background: 'var(--bg)' }}>
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
            <div>
              <div className="sec-tag sec-tag-teal">Our Services</div>
              <h2 className="text-4xl font-black">Comprehensive <span className="grad-text">Talent Solutions</span></h2>
            </div>
            <Link href="/services" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-[13.5px] transition-all hover:border-cyan-400 hover:text-cyan-300"
              style={{ border: '2px solid rgba(255,255,255,.2)', color: '#fff' }}>
              View All Services <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s, i) => {
              const Icon = s.icon
              return (
                <div key={i} className="rounded-2xl border card-hover flex flex-col" style={{ background: 'var(--bg2)', borderColor: 'var(--bdr)' }}>
                  <div className="h-48 rounded-t-2xl overflow-hidden relative group">
                    <img src={`https://images.unsplash.com/${s.img}?w=600&q=80`} alt={s.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0" style={{ background: 'rgba(10,25,47,.35)' }} />
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border" style={{ background: 'rgba(14,116,144,.12)', borderColor: 'rgba(14,116,144,.2)' }}>
                      <Icon size={26} className="text-[#D4A017]" />
                    </div>
                    <h3 className="font-bold text-[1.1rem] mb-2.5 text-white">{s.title}</h3>
                    <p className="text-[13.5px] leading-relaxed text-slate-300 flex-1">{s.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES PREVIEW ── */}
      <section className="py-24" style={{ background: 'var(--bg2)' }}>
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="text-center mb-16">
            <div className="sec-tag sec-tag-teal">Industries We Serve</div>
            <h2 className="text-4xl font-black">Expertise Across <span className="grad-text">11 Sectors</span></h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((ind, i) => {
              const Icon = ind.icon
              return (
                <div key={i} className="relative h-60 rounded-2xl overflow-hidden border cursor-pointer group transition-all duration-300 hover:-translate-y-2 hover:border-[#D4A017] hover:shadow-[0_15px_30px_rgba(212,160,23,0.15)]"
                  style={{ borderColor: 'var(--bdr)' }}>
                  <img src={`https://images.unsplash.com/${ind.img}?w=500&q=80`} alt={ind.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 transition-all duration-300" style={{ background: 'linear-gradient(to top,rgba(10,25,47,.93) 0%,rgba(10,25,47,.2) 100%)' }} />
                  <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-secondary/90 border border-[rgba(14,116,144,0.35)] shadow-md transition-transform duration-300 group-hover:scale-110">
                      <Icon size={18} className="text-[#D4A017]" />
                    </div>
                    <div className="font-bold text-[13px] text-white leading-snug">{ind.label}</div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="text-center mt-12">
            <Link href="/industries"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold transition-all hover:-translate-y-1"
              style={{ background: 'linear-gradient(135deg,#0E7490,#1565C0)' }}>
              Explore All 11 Industries <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-24" style={{ background: 'var(--bg)' }}>
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="text-center mb-16">
            <div className="sec-tag sec-tag-teal">Our Process</div>
            <h2 className="text-4xl font-black">How We <span className="grad-text">Deliver Excellence</span></h2>
            <p className="text-[1.05rem] max-w-[520px] mx-auto mt-2" style={{ color: 'var(--ts)' }}>A proven 6-step methodology ensuring perfect candidate–role alignment every time.</p>
          </div>
          
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 py-6">
            {/* desktop connection line */}
            <div className="hidden lg:block absolute top-[52px] left-[8%] right-[8%] h-[2px] bg-gradient-to-r from-teal-700 via-amber-500 to-teal-900 pointer-events-none z-0" />
            
            {processSteps.map((p, i) => {
              const Icon = p.ico
              return (
                <div key={i} className="text-center relative z-10 group flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center font-serif font-black text-[1.3rem] transition-all duration-300 group-hover:scale-115 group-hover:shadow-[0_0_20px_rgba(212,160,23,0.35)] cursor-default border-2"
                    style={{ background: 'var(--bg2)', borderColor: 'var(--bdr)', color: 'var(--teal3)' }}>
                    <span className="group-hover:text-white transition-colors">{p.n}</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 bg-secondary/80 border border-[rgba(255,255,255,0.06)] shadow-md transition-transform duration-300 group-hover:rotate-12 group-hover:border-[#D4A017]">
                    <Icon size={20} className="text-[#D4A017]" />
                  </div>
                  <div className="text-[13px] font-semibold whitespace-pre-line leading-snug" style={{ color: 'var(--ts)' }}>{p.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── DUAL CTA ── */}
      <section className="py-24" style={{ background: 'var(--bg2)' }}>
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'For Employers', desc: 'Share your hiring requirement and receive qualified candidate profiles within 7 working days.', cta: 'Request Recruitment Support', href: '/employers', bg: 'linear-gradient(135deg,#0A192F,#1E3A5F)', btnBg: 'var(--gold)', btnText: '#0A192F', icon: Building2, outline: 'border-[#D4A017]/30 hover:border-[#D4A017]' },
              { title: 'For Candidates', desc: 'Submit your resume and let us connect you with the right career opportunity in your industry.', cta: 'Submit Your Resume', href: '/candidates', bg: 'linear-gradient(135deg,#112240,#1A2C4C)', btnBg: 'transparent', btnText: '#FFFFFF', icon: FileText, outline: 'border-slate-500/20 hover:border-slate-400' },
            ].map((c, i) => {
              const Icon = c.icon
              return (
                <div key={i} className={`relative rounded-2xl p-12 text-center overflow-hidden border ${c.outline} transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:-translate-y-1.5`} style={{ background: c.bg }}>
                  <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#fff 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
                  
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-white/5 border border-white/10 shadow-lg transition-transform duration-300 hover:scale-110">
                    <Icon size={28} className="text-[#D4A017]" />
                  </div>
                  
                  <h2 className="text-[1.8rem] font-black text-white mb-4 relative">{c.title}</h2>
                  <p className="text-[14.5px] leading-relaxed mb-8 relative max-w-[420px] mx-auto" style={{ color: 'rgba(255,255,255,.82)' }}>{c.desc}</p>
                  
                  <Link href={c.href}
                    className="relative inline-flex items-center gap-2 font-bold text-[14.5px] px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    style={{ background: c.btnBg === 'transparent' ? 'transparent' : c.btnBg, color: c.btnText, border: c.btnBg === 'transparent' ? '2px solid rgba(255,255,255,0.2)' : 'none' }}>
                    {c.cta}
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
