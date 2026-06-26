const industries = [
  { ico:'⚙️', l:'Industrial Engineering & Manufacturing', img:'photo-1565043589221-1a6fd9ae45c7', d:'Plant managers, engineers, quality professionals across automotive, pharma & heavy industries.' },
  { ico:'💻', l:'Information Technology & Telecommunications', img:'photo-1518770660439-4636190af475', d:'Software developers, architects, network engineers & cybersecurity professionals.' },
  { ico:'📞', l:'IT Enabled Services (ITeS / BPO)', img:'photo-1555421689-d68471e189f2', d:'Customer service, process operations, quality assurance & BPO management roles.' },
  { ico:'🏦', l:'Banking & Financial Services', img:'photo-1611974789855-9c2a0a7236a3', d:'Credit, risk management, wealth management & banking operations professionals.' },
  { ico:'🧵', l:'Textiles & Garments', img:'photo-1558618666-fcd25c85cd64', d:'Production, merchandising, quality control, export documentation & apparel design.' },
  { ico:'👤', l:'Human Resources & Industrial Relations', img:'photo-1553877522-43269d4ea984', d:'CHROs, HR Business Partners, IR Managers & talent management professionals.' },
  { ico:'🚚', l:'Supply Chain & Logistics', img:'photo-1578575437130-527eed3abbec', d:'Warehouse management, procurement, fleet management & distribution operations.' },
  { ico:'🎓', l:'Education Institutions', img:'photo-1580582932707-520aed937b7b', d:'Faculty, principals, academic coordinators & education management professionals.' },
  { ico:'🧪', l:'Chemical Industry', img:'photo-1532187863486-abf9dbad1b69', d:'Chemical engineers, R&D specialists, process technicians & plant safety professionals.' },
  { ico:'📦', l:'Packaging Industry', img:'photo-1586528116311-ad8dd3c8310d', d:'Packaging engineers, line supervisors, quality inspectors & operations managers.' },
  { ico:'💊', l:'Pharma & Life Sciences', img:'photo-1576086213369-97a306d36557', d:'Pharmaceutical researchers, regulatory affairs, quality assurance & medical science roles.' },
]

export default function Industries() {
  return (
    <section className="py-24" style={{background:'var(--bg)'}}>
      <div className="max-w-[1360px] mx-auto px-6">
        <div className="text-center mb-14 max-w-[640px] mx-auto">
          <div className="sec-tag sec-tag-teal">Industries</div>
          <h1 className="text-4xl lg:text-5xl font-black mb-3">Serving <span className="grad-text">11 Core Sectors</span></h1>
          <p className="text-[1.05rem] leading-relaxed" style={{color:'var(--ts)'}}>Deep industry expertise and specialized talent networks enabling precision hiring across key industrial verticals in India.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind,i) => (
            <div key={i} className="relative h-64 rounded-2xl overflow-hidden border cursor-pointer group transition-all duration-300 hover:-translate-y-1" style={{borderColor:'var(--bdr)'}}>
              <img src={`https://images.unsplash.com/${ind.img}?w=700&q=80`} alt={ind.l} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy"/>
              <div className="absolute inset-0 transition-all duration-300 group-hover:opacity-0" style={{background:'linear-gradient(to top,rgba(10,25,47,.93) 0%,rgba(10,25,47,.2) 100%)'}}/>
              <div className="absolute inset-0 opacity-0 transition-all duration-300 group-hover:opacity-100" style={{background:'linear-gradient(to top,rgba(14,116,144,.88) 0%,rgba(10,25,47,.35) 100%)'}}/>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="text-[1.8rem] mb-1">{ind.ico}</div>
                <div className="font-bold text-[14.5px] text-white mb-1">{ind.l}</div>
                <div className="text-[12px] leading-relaxed opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0" style={{color:'rgba(203,213,225,.85)'}}>{ind.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
