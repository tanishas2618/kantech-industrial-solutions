'use client'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { LogOut, Search, Download, RefreshCw, X } from 'lucide-react'

type Employer = { _id: string; name: string; company: string; email: string; phone: string; industry: string; requirements: string; status: string; createdAt: string }
type Candidate = { _id: string; name: string; email: string; phone: string; qualification: string; experience: string; skills: string; resumeFileName: string; status: string; createdAt: string }

const STATUS_COLORS: Record<string, string> = {
  new:'badge-new', reviewed:'badge-reviewed', contacted:'badge-contacted',
  shortlisted:'badge-shortlisted', placed:'badge-placed', rejected:'badge-rejected', closed:'badge-closed',
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const [loginErr, setLoginErr] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  const [tab, setTab] = useState<'overview'|'employers'|'candidates'>('overview')
  const [employers, setEmployers] = useState<Employer[]>([])
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [empTotal, setEmpTotal] = useState(0)
  const [candTotal, setCandTotal] = useState(0)
  const [empSearch, setEmpSearch] = useState('')
  const [candSearch, setCandSearch] = useState('')
  const [empStatus, setEmpStatus] = useState('')
  const [candStatus, setCandStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [detailEmp, setDetailEmp] = useState<Employer | null>(null)
  const [detailCand, setDetailCand] = useState<Candidate | null>(null)

  // Check auth on load
  useEffect(() => {
    fetch('/api/admin/employers?limit=1')
      .then(r => { setAuthed(r.status !== 401); setChecking(false) })
      .catch(() => setChecking(false))
  }, [])

  const fetchEmployers = useCallback(async () => {
    setLoading(true)
    const q = new URLSearchParams({ search: empSearch, status: empStatus, limit: '50' })
    const r = await fetch(`/api/admin/employers?${q}`)
    if (r.ok) { const d = await r.json(); setEmployers(d.employers); setEmpTotal(d.total) }
    setLoading(false)
  }, [empSearch, empStatus])

  const fetchCandidates = useCallback(async () => {
    setLoading(true)
    const q = new URLSearchParams({ search: candSearch, status: candStatus, limit: '50' })
    const r = await fetch(`/api/admin/candidates?${q}`)
    if (r.ok) { const d = await r.json(); setCandidates(d.candidates); setCandTotal(d.total) }
    setLoading(false)
  }, [candSearch, candStatus])

  useEffect(() => { if (authed && tab === 'employers') fetchEmployers() }, [authed, tab, fetchEmployers])
  useEffect(() => { if (authed && tab === 'candidates') fetchCandidates() }, [authed, tab, fetchCandidates])

  async function login(e: React.FormEvent) {
    e.preventDefault()
    setLoginErr('')
    setLoginLoading(true)
    try {
      const r = await fetch('/api/admin/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(loginForm) })
      if (r.ok) { setAuthed(true) }
      else { const d = await r.json(); setLoginErr(d.error || 'Invalid credentials') }
    } catch { setLoginErr('Network error') }
    setLoginLoading(false)
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    setAuthed(false)
    setTab('overview')
  }

  async function updateStatus(type: 'employer'|'candidate', id: string, status: string) {
    const url = type === 'employer' ? '/api/admin/employers' : '/api/admin/candidates'
    await fetch(url, { method:'PATCH', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ id, status }) })
    if (type === 'employer') fetchEmployers()
    else fetchCandidates()
  }

  function downloadResume(id: string, name: string) {
    const a = document.createElement('a')
    a.href = `/api/admin/candidates?download=${id}`
    a.download = name || 'resume'
    a.click()
  }

  if (checking) return (
    <div className="min-h-screen flex items-center justify-center" style={{background:'var(--bg)'}}>
      <div className="text-center">
        <Image src="/logo.png" alt="KanTech" width={80} height={80} className="mx-auto mb-4 object-contain" />
        <div className="text-[14px]" style={{color:'var(--tm)'}}>Loading...</div>
      </div>
    </div>
  )

  // ── LOGIN ──
  if (!authed) return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{background:'var(--bg)'}}>
      <div className="w-full max-w-[420px] rounded-2xl border p-10" style={{background:'var(--bg2)',borderColor:'var(--bdr)'}}>
        <div className="text-center mb-8">
          <Image src="/logo.png" alt="KanTech" width={72} height={72} className="mx-auto mb-3 object-contain" />
          <div className="font-black text-[1.3rem] uppercase tracking-wide">Admin Portal</div>
          <div className="text-[12.5px] mt-1" style={{color:'var(--tm)'}}>KANTECH INDUSTRIAL SOLUTIONS</div>
        </div>
        <form onSubmit={login} className="flex flex-col gap-5">
          {[['username','Username','admin','text'],['password','Password','••••••••','password']].map(([k,l,p,t]) => (
            <div key={k} className="flex flex-col gap-2">
              <label className="text-[11.5px] font-bold uppercase tracking-[0.8px]" style={{color:'var(--ts)'}}>{l}</label>
              <input type={t} placeholder={p} value={(loginForm as Record<string,string>)[k]}
                onChange={e => setLoginForm(f => ({...f,[k]:e.target.value}))}
                className="form-input" autoComplete={k==='password'?'current-password':'username'} required />
            </div>
          ))}
          {loginErr && <div className="p-3 rounded-lg text-[13px]" style={{background:'rgba(248,113,113,.08)',border:'1px solid rgba(248,113,113,.2)',color:'#f87171'}}>{loginErr}</div>}
          <button type="submit" disabled={loginLoading}
            className="py-3.5 rounded-xl font-bold text-[15px] text-white transition-all hover:-translate-y-1 disabled:opacity-60"
            style={{background:'linear-gradient(135deg,#0E7490,#1565C0)'}}>
            {loginLoading ? '⏳ Logging in...' : '🔐  Login to Dashboard'}
          </button>
          <div className="text-center text-[12px]" style={{color:'var(--tm)'}}>Default: admin / kantech2024</div>
        </form>
      </div>
    </div>
  )

  // ── DASHBOARD ──
  const navItems: { id: typeof tab; label: string; ico: string }[] = [
    { id:'overview',  label:'Overview',            ico:'📊' },
    { id:'employers', label:'Employer Inquiries',  ico:'🏢' },
    { id:'candidates',label:'Candidate Profiles',  ico:'👤' },
  ]

  return (
    <div className="min-h-screen flex" style={{background:'var(--bg)'}}>
      {/* SIDEBAR */}
      <aside className="w-[240px] flex-shrink-0 border-r flex flex-col" style={{background:'var(--bg2)',borderColor:'var(--bdr)'}}>
        <div className="p-5 border-b flex items-center gap-3" style={{borderColor:'var(--bdr)'}}>
          <Image src="/logo.png" alt="KanTech" width={36} height={36} className="object-contain" />
          <div>
            <div className="font-black text-[12px] uppercase tracking-wide">KanTech Admin</div>
            <div className="text-[10px]" style={{color:'var(--tm)'}}>Dashboard</div>
          </div>
        </div>
        <nav className="flex-1 p-3">
          {navItems.map(n => (
            <button key={n.id} onClick={() => setTab(n.id)}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-[13.5px] mb-1 text-left transition-all duration-200 border-none bg-transparent cursor-pointer font-medium
                ${tab===n.id ? 'text-cyan-300' : 'text-slate-400 hover:text-white'}`}
              style={tab===n.id ? {background:'rgba(14,116,144,.12)'} : {}}>
              {n.ico} &nbsp;{n.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t" style={{borderColor:'var(--bdr)'}}>
          <a href="/" className="flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] text-slate-400 hover:text-white transition-colors mb-1 no-underline cursor-pointer">← Back to Website</a>
          <button onClick={logout} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] text-slate-400 hover:text-red-400 transition-colors bg-transparent border-none cursor-pointer">
            <LogOut size={14}/> Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-8 overflow-auto">

        {/* OVERVIEW */}
        {tab === 'overview' && (
          <div>
            <h2 className="text-[1.5rem] font-black mb-6">Dashboard Overview</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[['🏢',String(empTotal),'Employer Inquiries'],['👤',String(candTotal),'Candidate Profiles'],['🏆','500+','Total Clients'],['🎯','5000+','Total Placements']].map(([ico,val,lbl],i) => (
                <div key={i} className="p-5 rounded-xl border" style={{background:'var(--bg2)',borderColor:'var(--bdr)'}}>
                  <div className="text-2xl mb-2">{ico}</div>
                  <div className="text-[2rem] font-black grad-text mb-1">{val}</div>
                  <div className="text-[12px] uppercase tracking-wider" style={{color:'var(--tm)'}}>{lbl}</div>
                </div>
              ))}
            </div>
            <div className="rounded-xl border p-5" style={{background:'var(--bg2)',borderColor:'var(--bdr)'}}>
              <div className="font-bold mb-2">Getting Started</div>
              <p className="text-[13.5px]" style={{color:'var(--ts)'}}>Use the sidebar to view Employer Inquiries and Candidate Profiles submitted through the website. All data is stored in MongoDB Atlas.</p>
            </div>
          </div>
        )}

        {/* EMPLOYERS TAB */}
        {tab === 'employers' && (
          <div>
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <h2 className="text-[1.5rem] font-black">Employer Inquiries <span className="text-[1rem] font-normal" style={{color:'var(--tm)'}}>({empTotal})</span></h2>
              <div className="flex gap-3 flex-wrap">
                <div className="flex items-center gap-2 rounded-lg border px-3" style={{background:'rgba(255,255,255,.04)',borderColor:'var(--bdr)'}}>
                  <Search size={14} style={{color:'var(--tm)'}}/>
                  <input value={empSearch} onChange={e=>setEmpSearch(e.target.value)} placeholder="Search..." className="bg-transparent outline-none text-[13.5px] py-2 w-[180px]" style={{color:'#fff'}}/>
                  {empSearch && <button onClick={()=>setEmpSearch('')}><X size={13} style={{color:'var(--tm)'}}/></button>}
                </div>
                <select value={empStatus} onChange={e=>setEmpStatus(e.target.value)} className="form-input" style={{width:'auto',padding:'8px 12px',fontSize:13}}>
                  <option value="">All Status</option>
                  {['new','reviewed','contacted','closed'].map(s=><option key={s}>{s}</option>)}
                </select>
                <button onClick={fetchEmployers} className="flex items-center gap-2 px-3 py-2 rounded-lg border text-[13px] transition-all hover:border-teal-400" style={{background:'rgba(255,255,255,.04)',borderColor:'var(--bdr)',color:'var(--ts)'}}>
                  <RefreshCw size={13}/> Refresh
                </button>
              </div>
            </div>
            <div className="rounded-xl border overflow-x-auto" style={{background:'var(--bg2)',borderColor:'var(--bdr)'}}>
              {loading ? (
                <div className="p-8 text-center" style={{color:'var(--tm)'}}>Loading...</div>
              ) : employers.length === 0 ? (
                <div className="p-8 text-center" style={{color:'var(--tm)'}}>No employer inquiries yet. They appear here after submission.</div>
              ) : (
                <table className="admin-table">
                  <thead><tr><th>#</th><th>Name</th><th>Company</th><th>Email</th><th>Phone</th><th>Industry</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
                  <tbody>
                    {employers.map((e,i) => (
                      <tr key={e._id}>
                        <td>{i+1}</td>
                        <td><button onClick={()=>setDetailEmp(e)} className="hover:text-cyan-400 transition-colors bg-transparent border-none cursor-pointer text-left font-semibold" style={{color:'inherit'}}>{e.name}</button></td>
                        <td>{e.company}</td>
                        <td><a href={`mailto:${e.email}`} className="hover:text-cyan-400 transition-colors">{e.email}</a></td>
                        <td><a href={`tel:${e.phone}`} className="hover:text-cyan-400 transition-colors">{e.phone}</a></td>
                        <td className="max-w-[160px] truncate">{e.industry}</td>
                        <td>{new Date(e.createdAt).toLocaleDateString('en-IN')}</td>
                        <td><span className={`badge ${STATUS_COLORS[e.status]||'badge-new'}`}>{e.status}</span></td>
                        <td>
                          <select value={e.status} onChange={ev=>updateStatus('employer',e._id,ev.target.value)}
                            className="text-[12px] rounded px-2 py-1 border outline-none" style={{background:'var(--bg)',borderColor:'var(--bdr)',color:'var(--ts)'}}>
                            {['new','reviewed','contacted','closed'].map(s=><option key={s}>{s}</option>)}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* CANDIDATES TAB */}
        {tab === 'candidates' && (
          <div>
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <h2 className="text-[1.5rem] font-black">Candidate Profiles <span className="text-[1rem] font-normal" style={{color:'var(--tm)'}}>({candTotal})</span></h2>
              <div className="flex gap-3 flex-wrap">
                <div className="flex items-center gap-2 rounded-lg border px-3" style={{background:'rgba(255,255,255,.04)',borderColor:'var(--bdr)'}}>
                  <Search size={14} style={{color:'var(--tm)'}}/>
                  <input value={candSearch} onChange={e=>setCandSearch(e.target.value)} placeholder="Search name / skills..." className="bg-transparent outline-none text-[13.5px] py-2 w-[200px]" style={{color:'#fff'}}/>
                  {candSearch && <button onClick={()=>setCandSearch('')}><X size={13} style={{color:'var(--tm)'}}/></button>}
                </div>
                <select value={candStatus} onChange={e=>setCandStatus(e.target.value)} className="form-input" style={{width:'auto',padding:'8px 12px',fontSize:13}}>
                  <option value="">All Status</option>
                  {['new','shortlisted','placed','rejected'].map(s=><option key={s}>{s}</option>)}
                </select>
                <button onClick={fetchCandidates} className="flex items-center gap-2 px-3 py-2 rounded-lg border text-[13px] transition-all hover:border-teal-400" style={{background:'rgba(255,255,255,.04)',borderColor:'var(--bdr)',color:'var(--ts)'}}>
                  <RefreshCw size={13}/> Refresh
                </button>
              </div>
            </div>
            <div className="rounded-xl border overflow-x-auto" style={{background:'var(--bg2)',borderColor:'var(--bdr)'}}>
              {loading ? (
                <div className="p-8 text-center" style={{color:'var(--tm)'}}>Loading...</div>
              ) : candidates.length === 0 ? (
                <div className="p-8 text-center" style={{color:'var(--tm)'}}>No candidate profiles yet. They appear here after submission.</div>
              ) : (
                <table className="admin-table">
                  <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>Qualification</th><th>Experience</th><th>Skills</th><th>Resume</th><th>Date</th><th>Status</th></tr></thead>
                  <tbody>
                    {candidates.map((c,i) => (
                      <tr key={c._id}>
                        <td>{i+1}</td>
                        <td><button onClick={()=>setDetailCand(c)} className="hover:text-cyan-400 transition-colors bg-transparent border-none cursor-pointer text-left font-semibold" style={{color:'inherit'}}>{c.name}</button></td>
                        <td><a href={`mailto:${c.email}`} className="hover:text-cyan-400 transition-colors">{c.email}</a></td>
                        <td><a href={`tel:${c.phone}`} className="hover:text-cyan-400 transition-colors">{c.phone}</a></td>
                        <td>{c.qualification}</td>
                        <td>{c.experience || '—'}</td>
                        <td className="max-w-[150px] truncate" title={c.skills}>{c.skills}</td>
                        <td>
                          {c.resumeFileName ? (
                            <button onClick={()=>downloadResume(c._id,c.resumeFileName)}
                              className="flex items-center gap-1 px-2 py-1 rounded text-[12px] font-semibold border transition-all hover:border-teal-400 bg-transparent cursor-pointer"
                              style={{background:'rgba(14,116,144,.12)',borderColor:'rgba(14,116,144,.2)',color:'var(--teal3)'}}>
                              <Download size={11}/> Download
                            </button>
                          ) : '—'}
                        </td>
                        <td>{new Date(c.createdAt).toLocaleDateString('en-IN')}</td>
                        <td>
                          <select value={c.status} onChange={ev=>updateStatus('candidate',c._id,ev.target.value)}
                            className="text-[12px] rounded px-2 py-1 border outline-none" style={{background:'var(--bg)',borderColor:'var(--bdr)',color:'var(--ts)'}}>
                            {['new','shortlisted','placed','rejected'].map(s=><option key={s}>{s}</option>)}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </main>

      {/* EMPLOYER DETAIL MODAL */}
      {detailEmp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{background:'rgba(0,0,0,.7)'}}>
          <div className="rounded-2xl border p-8 max-w-[560px] w-full max-h-[80vh] overflow-y-auto" style={{background:'var(--bg2)',borderColor:'var(--bdr)'}}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-[1.2rem]">Employer Details</h3>
              <button onClick={()=>setDetailEmp(null)} className="p-1 rounded-lg hover:bg-white/10 transition-colors bg-transparent border-none cursor-pointer"><X size={18}/></button>
            </div>
            {[['Name',detailEmp.name],['Company',detailEmp.company],['Email',detailEmp.email],['Phone',detailEmp.phone],['Industry',detailEmp.industry],['Status',detailEmp.status],['Date',new Date(detailEmp.createdAt).toLocaleString('en-IN')]].map(([l,v]) => (
              <div key={l} className="mb-4">
                <div className="text-[11px] uppercase tracking-wider mb-1" style={{color:'var(--tm)'}}>{l}</div>
                <div className="text-[14px]" style={{color:'var(--ts)'}}>{v}</div>
              </div>
            ))}
            <div className="mb-4">
              <div className="text-[11px] uppercase tracking-wider mb-1" style={{color:'var(--tm)'}}>Requirements</div>
              <div className="text-[14px] leading-relaxed p-4 rounded-lg" style={{background:'rgba(255,255,255,.04)',color:'var(--ts)'}}>{detailEmp.requirements}</div>
            </div>
          </div>
        </div>
      )}

      {/* CANDIDATE DETAIL MODAL */}
      {detailCand && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{background:'rgba(0,0,0,.7)'}}>
          <div className="rounded-2xl border p-8 max-w-[560px] w-full max-h-[80vh] overflow-y-auto" style={{background:'var(--bg2)',borderColor:'var(--bdr)'}}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-[1.2rem]">Candidate Details</h3>
              <button onClick={()=>setDetailCand(null)} className="p-1 rounded-lg hover:bg-white/10 transition-colors bg-transparent border-none cursor-pointer"><X size={18}/></button>
            </div>
            {[['Name',detailCand.name],['Email',detailCand.email],['Phone',detailCand.phone],['Qualification',detailCand.qualification],['Experience',detailCand.experience||'—'],['Status',detailCand.status],['Date',new Date(detailCand.createdAt).toLocaleString('en-IN')]].map(([l,v]) => (
              <div key={l} className="mb-4">
                <div className="text-[11px] uppercase tracking-wider mb-1" style={{color:'var(--tm)'}}>{l}</div>
                <div className="text-[14px]" style={{color:'var(--ts)'}}>{v}</div>
              </div>
            ))}
            <div className="mb-4">
              <div className="text-[11px] uppercase tracking-wider mb-1" style={{color:'var(--tm)'}}>Skills</div>
              <div className="text-[14px] leading-relaxed p-4 rounded-lg" style={{background:'rgba(255,255,255,.04)',color:'var(--ts)'}}>{detailCand.skills}</div>
            </div>
            {detailCand.resumeFileName && (
              <button onClick={()=>downloadResume(detailCand._id,detailCand.resumeFileName)}
                className="flex items-center gap-2 w-full justify-center py-3 rounded-xl font-bold text-[14px] text-white transition-all hover:-translate-y-1 border-none cursor-pointer"
                style={{background:'linear-gradient(135deg,#0E7490,#1565C0)'}}>
                <Download size={16}/> Download Resume ({detailCand.resumeFileName})
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
