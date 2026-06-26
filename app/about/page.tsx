import Image from 'next/image'
import Link from 'next/link'
import {
  Eye,
  Target,
  Calendar,
  MapPin,
  Building2,
  Users,
  Zap,
  Award
} from 'lucide-react'

const values = [
  { n:'01', t:'Quality Over Quantity', d:'We never compromise on standards. Every shortlisted candidate is carefully evaluated and matched to the role.' },
  { n:'02', t:'Integrity', d:'Honest, transparent dealings with every client and candidate. Trust is the foundation of all our relationships.' },
  { n:'03', t:'Transparency', d:'Open communication throughout the recruitment process — no surprises, no hidden agendas.' },
  { n:'04', t:'Professional Excellence', d:'We uphold the highest standards of professional conduct in every interaction and placement decision.' },
  { n:'05', t:'Client Commitment', d:'Your business goals are our recruitment objectives. We align our entire process to your organizational needs.' },
  { n:'06', t:'Long-Term Partnerships', d:'We build enduring relationships that go far beyond individual placements — we are your strategic talent partner.' },
]

const timeline = [
  { yr:'2012', t:'Founded in Hosur, Tamil Nadu', d:'KANTECH INDUSTRIAL SOLUTIONS established with a vision to serve the industrial belt of Tamil Nadu with quality-first recruitment.' },
  { yr:'2014', t:'Manufacturing Sector Leadership', d:'Became the preferred recruitment partner for major manufacturing and engineering companies in the Hosur–Krishnagiri industrial corridor.' },
  { yr:'2016', t:'IT & Telecom Division Launched', d:'Extended services into Information Technology and Telecommunications, significantly expanding our professional network.' },
  { yr:'2018', t:'500+ Placements Milestone', d:'Celebrated 500 successful placements and onboarded 100+ corporate clients across South India.' },
  { yr:'2020', t:'Multi-Sector Expansion', d:'Diversified into Banking, Logistics, Textiles, Education, Chemical, Packaging, and Pharma — becoming a full-spectrum consultancy.' },
  { yr:'2025', t:'5,000+ Placements & Growing', d:'Surpassed 5,000 successful placements with 500+ corporate clients across 11 industrial sectors Pan-India.' },
]

const highlights = [
  { text: 'Est. 2012', icon: Calendar },
  { text: 'Hosur, Tamil Nadu', icon: MapPin },
  { text: '11 Industry Sectors', icon: Building2 },
  { text: '5000+ Placements', icon: Target },
  { text: '500+ Clients', icon: Users },
  { text: '7-Day Delivery', icon: Zap },
]

export default function About() {
  return (
    <>
      {/* HERO */}
      <section className="py-24" style={{ background:'var(--bg)' }}>
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="sec-tag sec-tag-teal mb-4">About Us</div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-black leading-tight mb-5">
                Trusted Recruitment <span className="grad-text">Partner</span> Since 2012
              </h1>
              <p className="text-[1.05rem] leading-[1.82] mb-4" style={{color:'var(--ts)'}}>
                KANTECH INDUSTRIAL SOLUTIONS is a professional recruitment and staffing consultancy established in 2012. We specialize in connecting organizations with qualified professionals across multiple industries through quality-focused recruitment solutions.
              </p>
              <p className="text-[1.05rem] leading-[1.82] mb-4" style={{color:'var(--ts)'}}>
                We help businesses identify, attract, evaluate, and hire skilled professionals who align with organizational goals and workforce requirements. Our philosophy — <em className="grad-text not-italic font-semibold">"We Serve Quality, Not Quantity"</em> — drives every single engagement.
              </p>
              <p className="text-[1.05rem] leading-[1.82] mb-8" style={{color:'var(--ts)'}}>
                Headquartered in Hosur, Tamil Nadu, we serve clients across South India and beyond — building long-term partnerships grounded in integrity, transparency, and professional excellence.
              </p>
              <div className="flex flex-wrap gap-3">
                {highlights.map((p, i) => {
                  const Icon = p.icon
                  return (
                    <div key={i} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] border transition-all duration-350 hover:border-[#D4A017] hover:shadow-[0_0_10px_rgba(212,160,23,0.1)]" style={{background:'var(--bg2)', border:'1px solid var(--bdr)', color:'var(--ts)'}}>
                      <Icon size={14} className="text-[#D4A017]" />
                      <span>{p.text}</span>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-[500px] border" style={{borderColor:'var(--bdr)'}}>
              <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80" alt="KANTECH Team" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{background:'linear-gradient(to bottom,transparent 40%,rgba(10,25,47,.88) 100%)'}} />
              <div className="absolute bottom-6 left-6 right-6 rounded-xl p-5 backdrop-blur-md" style={{background:'rgba(10,25,47,.88)',border:'1px solid rgba(14,116,144,.3)'}}>
                <div className="flex justify-around">
                  {[['2012','Founded'],['11','Sectors'],['5000+','Placements'],['7 Days','Delivery']].map(([n,l],i) => (
                    <div key={i} className="text-center">
                      <div className="text-[1.6rem] font-black grad-text font-serif">{n}</div>
                      <div className="text-[11px] mt-0.5 font-semibold" style={{color:'var(--tm)'}}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISION MISSION */}
      <section className="py-24" style={{background:'var(--bg2)'}}>
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="text-center mb-12">
            <div className="sec-tag sec-tag-teal">Our Foundation</div>
            <h2 className="text-4xl font-black">Vision, Mission &amp; <span className="grad-text">Values</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[
              { icon: Eye, t:'Our Vision', d:'To become a globally respected human capital solutions provider recognized for excellence, integrity, and long-term value creation for both clients and candidates.' },
              { icon: Target, t:'Our Mission', d:'To deliver reliable, efficient, and quality-focused recruitment solutions that help organizations build strong teams while enabling professionals to achieve meaningful career opportunities.' },
            ].map((c, i) => {
              const Icon = c.icon
              return (
                <div key={i} className="p-8 rounded-2xl border card-hover" style={{background:'var(--bg)',borderColor:'var(--bdr)'}}>
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 border" style={{background:'rgba(14,116,144,.12)',borderColor:'rgba(14,116,144,.2)'}}>
                    <Icon size={24} className="text-[#D4A017]" />
                  </div>
                  <div className="text-[1.1rem] font-bold mb-2 grad-text">{c.t}</div>
                  <div className="text-[14.5px] leading-relaxed" style={{color:'var(--ts)'}}>{c.d}</div>
                </div>
              )
            })}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v,i) => (
              <div key={i} className="p-7 rounded-2xl border transition-all hover:border-[#D4A017] hover:shadow-[0_10px_20px_rgba(212,160,23,0.06)] hover:-translate-y-1" style={{background:'var(--bg)',borderColor:'var(--bdr)'}}>
                <div className="text-[3rem] font-black font-serif leading-none mb-1 animate-pulse" style={{color:'rgba(212,160,23,.05)'}}>{v.n}</div>
                <div className="text-[1.05rem] font-bold mb-2 grad-text">{v.t}</div>
                <div className="text-[13.5px] leading-relaxed" style={{color:'var(--ts)'}}>{v.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-24" style={{background:'var(--bg)'}}>
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="text-center mb-12">
            <div className="sec-tag sec-tag-teal">Our Journey</div>
            <h2 className="text-4xl font-black">A Decade of <span className="grad-text">Growth &amp; Impact</span></h2>
          </div>
          <div className="max-w-[720px] mx-auto relative pl-14"
            style={{borderLeft:'2px solid',borderImage:'linear-gradient(to bottom,var(--teal2),rgba(14,116,144,0.1)) 1'}}>
            {timeline.map((t,i) => (
              <div key={i} className="relative mb-10 group">
                <div className="absolute -left-[3.75rem] top-1.5 w-4 h-4 rounded-full border-[3px] transition-all duration-300 group-hover:border-[#D4A017] group-hover:scale-125"
                  style={{background:'linear-gradient(135deg,#0E7490,#1565C0)',borderColor:'var(--bg)',boxShadow:'0 0 0 4px rgba(14,116,144,.2)'}} />
                <div className="text-[11px] font-bold uppercase tracking-[1.5px] mb-1" style={{color:'var(--teal3)'}}>{t.yr}</div>
                <div className="font-bold text-[1.05rem] mb-1 group-hover:text-white transition-colors">{t.t}</div>
                <div className="text-[13.5px] leading-relaxed" style={{color:'var(--ts)'}}>{t.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
