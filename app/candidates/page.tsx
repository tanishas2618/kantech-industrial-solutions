'use client'
import { useState, useRef } from 'react'
import { FileText, CheckCircle } from 'lucide-react'

const qualifications = ['10th / SSLC','12th / HSC','Diploma / ITI','B.E. / B.Tech','B.Sc','BCA / BBA / B.Com','MBA / PGDM','M.E. / M.Tech','M.Sc / MCA','B.Pharm / M.Pharm','Ph.D','Other']

export default function Candidates() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', qualification:'', experience:'', location:'', skills:'' })
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [drag, setDrag] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  function handleFile(f: File | null) {
    if (!f) return
    if (f.size > 5 * 1024 * 1024) { setError('File must be under 5MB'); return }
    const ok = ['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!ok.includes(f.type)) { setError('Only PDF, DOC, DOCX allowed'); return }
    setError('')
    setFile(f)
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!form.name || !form.email || !form.phone || !form.qualification || !form.skills) {
      setError('Please fill all required fields.')
      return
    }
    setLoading(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k,v]) => fd.append(k,v))
      if (file) fd.append('resume', file)
      const res = await fetch('/api/candidates', { method:'POST', body: fd })
      const data = await res.json()
      if (res.ok) setSuccess(true)
      else setError(data.error || 'Submission failed.')
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
          <div className="sec-tag sec-tag-teal">For Candidates</div>
          <h1 className="text-4xl lg:text-5xl font-black mb-3">
            Submit Your <span className="grad-text">Resume</span>
          </h1>
          <p className="text-[1.05rem] leading-relaxed" style={{ color: 'var(--ts)' }}>
            Take the next step in your career. Share your profile and we will match you with the best opportunities across 11 industry sectors.
          </p>
        </div>

        <div className="max-w-[760px] mx-auto">
          {/* NOTICE */}
          <div className="flex gap-3 items-start p-5 rounded-xl mb-8" style={{background:'rgba(212,160,23,.07)',border:'1px solid rgba(212,160,23,.25)'}}>
            <span className="text-2xl flex-shrink-0">📢</span>
            <p className="text-[13.5px] leading-relaxed" style={{color:'var(--ts)'}}>
              Please upload your resume through the form below and also send a copy to{' '}
              <a href="mailto:premkkantech@yahoo.com" className="font-bold hover:underline" style={{color:'var(--gold)'}}>premkkantech@yahoo.com</a>{' '}
              for faster processing.
            </p>
          </div>

          <div className="rounded-2xl border p-10" style={{ background: 'var(--bg2)', borderColor: 'var(--bdr)' }}>
            <div className="flex items-center gap-4 mb-8 pb-7" style={{ borderBottom: '1px solid var(--bdr)' }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center border" style={{ background: 'rgba(14,116,144,.12)', borderColor: 'rgba(14,116,144,.2)' }}>
                <FileText size={26} style={{ color: 'var(--teal3)' }} />
              </div>
              <div>
                <div className="font-bold text-[1.2rem]">Candidate Registration</div>
                <div className="text-[12.5px] mt-1" style={{ color: 'var(--tm)' }}>Your information is completely confidential</div>
              </div>
            </div>

            {success ? (
              <div className="text-center py-12">
                <CheckCircle size={64} className="mx-auto mb-4" style={{ color: '#4ade80' }} />
                <div className="text-[1.3rem] font-bold mb-2 grad-text">Profile Submitted Successfully!</div>
                <div className="text-[14.5px]" style={{ color: 'var(--ts)' }}>
                  Don&apos;t forget to also email your resume to{' '}
                  <a href="mailto:premkkantech@yahoo.com" className="hover:underline" style={{color:'var(--gold)'}}>premkkantech@yahoo.com</a>{' '}
                  for faster processing.
                </div>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  {[['name','Full Name *','Your Full Name','text'],['email','Email Address *','your@email.com','email'],['phone','Phone Number *','+91 XXXXX XXXXX','tel'],['location','Current Location','City, State','text'],['experience','Total Experience','e.g. 5 Years 3 Months / Fresher','text']].map(([k,l,p,t]) => (
                    <div key={k} className={`flex flex-col gap-2 ${k==='name' ? 'md:col-span-2' : ''}`}>
                      <label className="text-[11.5px] font-bold uppercase tracking-[0.8px]" style={{color:'var(--ts)'}}>{l}</label>
                      <input type={t} placeholder={p} value={(form as Record<string,string>)[k]}
                        onChange={e => set(k, e.target.value)} className="form-input" />
                    </div>
                  ))}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11.5px] font-bold uppercase tracking-[0.8px]" style={{color:'var(--ts)'}}>Highest Qualification *</label>
                    <select value={form.qualification} onChange={e => set('qualification', e.target.value)} className="form-input" required>
                      <option value="">Select Qualification</option>
                      {qualifications.map(q => <option key={q}>{q}</option>)}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mb-5">
                  <label className="text-[11.5px] font-bold uppercase tracking-[0.8px]" style={{color:'var(--ts)'}}>Key Skills *</label>
                  <input type="text" placeholder="e.g. AutoCAD, SAP, Python, Lean Manufacturing, HPLC, GMP..." value={form.skills} onChange={e => set('skills', e.target.value)} className="form-input" required />
                </div>

                {/* DRAG & DROP ZONE */}
                <div className="flex flex-col gap-2 mb-6">
                  <label className="text-[11.5px] font-bold uppercase tracking-[0.8px]" style={{color:'var(--ts)'}}>Resume Upload *</label>
                  <div
                    className="rounded-xl p-8 text-center cursor-pointer transition-all duration-200"
                    style={{ border: `2px dashed ${drag ? 'var(--teal2)' : 'var(--bdr)'}`, background: drag ? 'rgba(14,116,144,.06)' : 'transparent' }}
                    onClick={() => fileRef.current?.click()}
                    onDragOver={e => { e.preventDefault(); setDrag(true) }}
                    onDragLeave={() => setDrag(false)}
                    onDrop={e => { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files[0]) }}>
                    <div className="text-4xl mb-2">📎</div>
                    {file ? (
                      <div className="font-semibold" style={{color:'var(--teal3)'}}>✅ &nbsp;{file.name}</div>
                    ) : (
                      <>
                        <div className="font-medium mb-1" style={{color:'var(--ts)'}}>Click to upload or drag & drop your resume</div>
                        <div className="text-[12px]" style={{color:'var(--tm)'}}>PDF, DOC, DOCX · Maximum 5MB</div>
                      </>
                    )}
                    <input ref={fileRef} type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={e => handleFile(e.target.files?.[0] ?? null)} />
                  </div>
                </div>

                {error && <div className="mb-4 p-3 rounded-lg text-[13.5px]" style={{background:'rgba(248,113,113,.08)',border:'1px solid rgba(248,113,113,.2)',color:'#f87171'}}>{error}</div>}
                <button type="submit" disabled={loading}
                  className="w-full py-4 rounded-xl font-bold text-[15px] text-white transition-all hover:-translate-y-1 disabled:opacity-60"
                  style={{background:'linear-gradient(135deg,#0E7490,#1565C0)',boxShadow:'0 6px 24px rgba(14,116,144,.35)'}}>
                  {loading ? '⏳  Submitting...' : '🚀  Submit My Profile'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
