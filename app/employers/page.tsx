'use client'
import { useState } from 'react'
import { Building2, CheckCircle } from 'lucide-react'

const industries = [
  'Industrial Engineering & Manufacturing',
  'Information Technology & Telecommunications',
  'IT Enabled Services (ITeS / BPO)',
  'Banking & Financial Services',
  'Textiles & Garments',
  'Human Resources & Industrial Relations',
  'Supply Chain & Logistics',
  'Education Institutions',
  'Chemical Industry',
  'Packaging Industry',
  'Pharma & Life Sciences',
  'Other',
]

export default function Employers() {
  const [form, setForm] = useState({ name:'', company:'', email:'', phone:'', industry:'', requirements:'' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!form.name || !form.company || !form.email || !form.phone || !form.industry || !form.requirements) {
      setError('Please fill all required fields.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/employers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) setSuccess(true)
      else setError(data.error || 'Submission failed. Please try again.')
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-24" style={{ background: 'var(--bg)' }}>
      <div className="max-w-[1360px] mx-auto px-6">
        <div className="text-center mb-12 max-w-[620px] mx-auto">
          <div className="sec-tag sec-tag-teal">For Employers</div>
          <h1 className="text-4xl lg:text-5xl font-black mb-3">
            Post Your <span className="grad-text">Talent Requirement</span>
          </h1>
          <p className="text-[1.05rem] leading-relaxed" style={{ color: 'var(--ts)' }}>
            Share your hiring needs and receive qualified candidate profiles within 7 working days. All inquiries are treated with strict confidentiality.
          </p>
        </div>

        {/* WHY US STRIP */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[['⚡','7-Day Delivery','Candidate profiles in 7 working days'],['🔄','3-Month Support','Replacement support included'],['🔒','Confidential','All inquiries strictly confidential'],['✅','Quality Assured','Pre-screened candidates only']].map(([ico,t,d],i) => (
            <div key={i} className="text-center p-5 rounded-xl border" style={{background:'var(--bg2)',borderColor:'var(--bdr)'}}>
              <div className="text-2xl mb-2">{ico}</div>
              <div className="font-bold text-[13.5px] mb-1">{t}</div>
              <div className="text-[12px]" style={{color:'var(--tm)'}}>{d}</div>
            </div>
          ))}
        </div>

        <div className="max-w-[760px] mx-auto rounded-2xl border p-10" style={{ background: 'var(--bg2)', borderColor: 'var(--bdr)' }}>
          <div className="flex items-center gap-4 mb-8 pb-7" style={{ borderBottom: '1px solid var(--bdr)' }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center border" style={{ background: 'rgba(14,116,144,.12)', borderColor: 'rgba(14,116,144,.2)' }}>
              <Building2 size={26} style={{ color: 'var(--teal3)' }} />
            </div>
            <div>
              <div className="font-bold text-[1.2rem]">Employer Inquiry Form</div>
              <div className="text-[12.5px] mt-1" style={{ color: 'var(--tm)' }}>Response within 24 hours · Candidates delivered in 7 working days</div>
            </div>
          </div>

          {success ? (
            <div className="text-center py-12">
              <CheckCircle size={64} className="mx-auto mb-4" style={{ color: 'var(--teal3)' }} />
              <div className="text-[1.3rem] font-bold mb-2 grad-text">Requirement Received!</div>
              <div className="text-[14.5px]" style={{ color: 'var(--ts)' }}>Our consultants will contact you within 24 hours and deliver candidate profiles within 7 working days.</div>
              <button onClick={() => { setSuccess(false); setForm({ name:'',company:'',email:'',phone:'',industry:'',requirements:'' }) }}
                className="mt-6 px-6 py-2.5 rounded-lg font-semibold text-[13.5px] border transition-all hover:border-teal-400 hover:text-cyan-300"
                style={{border:'1px solid var(--bdr)',color:'var(--ts)'}}>Submit Another →</button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                {[['name','Full Name *','Your Full Name','text'],['company','Company Name *','Organization / Company','text'],['email','Email Address *','professional@company.com','email'],['phone','Phone Number *','+91 XXXXX XXXXX','tel']].map(([k,l,p,t]) => (
                  <div key={k} className="flex flex-col gap-2">
                    <label className="text-[11.5px] font-bold uppercase tracking-[0.8px]" style={{color:'var(--ts)'}}>{l}</label>
                    <input type={t} placeholder={p} value={(form as Record<string,string>)[k]}
                      onChange={e => set(k, e.target.value)}
                      className="form-input" required />
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2 mb-5">
                <label className="text-[11.5px] font-bold uppercase tracking-[0.8px]" style={{color:'var(--ts)'}}>Industry Sector *</label>
                <select value={form.industry} onChange={e => set('industry', e.target.value)} className="form-input" required>
                  <option value="">Select Industry Sector</option>
                  {industries.map(ind => <option key={ind}>{ind}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-2 mb-6">
                <label className="text-[11.5px] font-bold uppercase tracking-[0.8px]" style={{color:'var(--ts)'}}>Requirement Details *</label>
                <textarea placeholder="Describe the role(s), experience required, location, number of positions, and any specific requirements..." value={form.requirements} onChange={e => set('requirements', e.target.value)} rows={5} className="form-input" style={{resize:'vertical'}} required />
              </div>
              {error && <div className="mb-4 p-3 rounded-lg text-[13.5px]" style={{background:'rgba(248,113,113,.08)',border:'1px solid rgba(248,113,113,.2)',color:'#f87171'}}>{error}</div>}
              <button type="submit" disabled={loading}
                className="w-full py-4 rounded-xl font-bold text-[15px] text-white transition-all hover:-translate-y-1 disabled:opacity-60"
                style={{background:'linear-gradient(135deg,#0E7490,#1565C0)',boxShadow:'0 6px 24px rgba(14,116,144,.35)'}}>
                {loading ? '⏳  Submitting...' : '📤  Request Recruitment Support'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
