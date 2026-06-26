'use client'
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
      style={{ background:'linear-gradient(135deg,#0E7490,#1565C0)', padding:'8px 0' }}>
      <div className="flex whitespace-nowrap ticker-run">
        {doubled.map((s, i) => (
          <span key={i} className="text-[11.5px] font-bold text-white uppercase tracking-widest px-10 opacity-90">
            ⬡ &nbsp;{s}
          </span>
        ))}
      </div>
    </div>
  )
}
