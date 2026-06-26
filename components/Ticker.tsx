'use client'
import { Hexagon } from 'lucide-react'

const sectors = [
  'Industrial Engineering','IT & Telecom','Banking & Finance',
  'Supply Chain & Logistics','Textiles & Garments','ITeS / BPO',
  'Human Resources & IR','Education','Chemical Industry',
  'Packaging Industry','Pharma & Life Sciences',
]

export default function Ticker() {
  const doubled = [...sectors, ...sectors]
  return (
    <div className="overflow-hidden sticky top-[74px] z-[998]"
      style={{ background:'var(--bg2)', borderBottom:'1px solid var(--bdr)', padding:'10px 0' }}>
      <div className="flex whitespace-nowrap ticker-run items-center">
        {doubled.map((s, i) => (
          <span key={i} className="inline-flex items-center text-[11px] font-bold text-white uppercase tracking-widest px-10 opacity-90">
            <Hexagon size={12} className="text-[#D4A017] mr-3 fill-[#D4A017]/20" />
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}
