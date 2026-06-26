const services = [
  { ico:'🔎', t:'Recruitment Services', img:'photo-1521737711867-e3b97375f902', d:'Helping organizations identify, attract, and hire qualified professionals through a comprehensive, quality-driven hiring lifecycle.' },
  { ico:'👥', t:'Staffing Solutions', img:'photo-1552664730-d307ca884978', d:'Providing businesses with skilled professionals for temporary, contract, and project-based workforce requirements.' },
  { ico:'🎯', t:'Talent Acquisition', img:'photo-1600880292203-757bb62b4baf', d:'Identifying and sourcing the right talent aligned with your organizational goals to build a future-ready workforce pipeline.' },
  { ico:'🏢', t:'Permanent Placement', img:'photo-1507003211169-0a1dd7228f2d', d:'Recruitment solutions for long-term and full-time positions with comprehensive background verification and reference checks.' },
  { ico:'👑', t:'Executive Search', img:'photo-1519085360753-af0119f7cbe7', d:'Confidential search for C-suite and senior leadership roles. Precision-led methodology to find transformational leaders.' },
  { ico:'🌟', t:'Leadership Hiring', img:'photo-1573496359142-b8d87734a5a2', d:'Specialized recruitment for VP, GM, Director, and Head-of-function roles with competency-based assessment.' },
  { ico:'🏭', t:'Industry-Specific Recruitment', img:'photo-1565043589221-1a6fd9ae45c7', d:'Customized hiring solutions across 11 sectors with deep domain knowledge and specialized talent networks.' },
  { ico:'📊', t:'Candidate Screening & Evaluation', img:'photo-1586281380349-632531db7ed4', d:'Multi-stage screening — technical assessments, behavioral interviews, background verification at every stage.' },
  { ico:'📈', t:'Workforce Planning Support', img:'photo-1543286386-713bdd548da4', d:'Helping organizations plan recruitment requirements effectively — succession planning, manpower forecasting & strategy.' },
  { ico:'🎓', t:'Career Placement Assistance', img:'photo-1499750310107-5fef28a66643', d:'Connecting qualified professionals with suitable career opportunities — resume review, interview coaching, career advisory.' },
]

export default function Services() {
  return (
    <section className="py-24" style={{background:'var(--bg)'}}>
      <div className="max-w-[1360px] mx-auto px-6">
        <div className="text-center mb-14 max-w-[640px] mx-auto">
          <div className="sec-tag sec-tag-teal">Our Services</div>
          <h1 className="text-4xl lg:text-5xl font-black mb-3">End-to-End <span className="grad-text">Talent Solutions</span></h1>
          <p className="text-[1.05rem] leading-relaxed" style={{color:'var(--ts)'}}>The full spectrum of quality-focused recruitment services tailored to your industry and organizational needs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s,i) => (
            <div key={i} className="rounded-2xl border card-hover overflow-hidden" style={{background:'var(--bg2)',borderColor:'var(--bdr)'}}>
              <div className="h-44 overflow-hidden relative">
                <img src={`https://images.unsplash.com/${s.img}?w=600&q=80`} alt={s.t} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" loading="lazy"/>
                <div className="absolute inset-0" style={{background:'rgba(10,25,47,.35)'}}/>
              </div>
              <div className="p-7">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4 border" style={{background:'rgba(14,116,144,.12)',borderColor:'rgba(14,116,144,.2)'}}>{s.ico}</div>
                <div className="font-bold text-[1.05rem] mb-2">{s.t}</div>
                <div className="text-[13.5px] leading-relaxed" style={{color:'var(--ts)'}}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 rounded-2xl p-14 text-center relative overflow-hidden" style={{background:'linear-gradient(135deg,#0E7490,#1565C0)'}}>
          <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage:'radial-gradient(#fff 1px,transparent 1px)',backgroundSize:'28px 28px'}}/>
          <h2 className="text-[2rem] font-black text-white mb-2 relative">Need Specialized Talent?</h2>
          <p className="text-[1.05rem] mb-6 relative" style={{color:'rgba(255,255,255,.82)'}}>Share your requirements and receive qualified profiles within 7 working days.</p>
          <a href="/employers" className="relative inline-block bg-white font-bold text-[14.5px] px-8 py-3.5 rounded-[9px] transition-all hover:-translate-y-1" style={{color:'#0E7490'}}>Post a Requirement →</a>
        </div>
      </div>
    </section>
  )
}
