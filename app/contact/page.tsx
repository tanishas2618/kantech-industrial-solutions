'use client'
import { useState } from 'react'
import {
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Facebook,
  Linkedin,
  MessageCircle,
  Send,
  Loader2
} from 'lucide-react'

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', message:'' })
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.email) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setSuccess(true)
    setLoading(false)
  }

  return (
    <section className="py-24" style={{ background: 'var(--bg)' }}>
      <div className="max-w-[1360px] mx-auto px-6">
        <div className="text-center mb-12 max-w-[580px] mx-auto">
          <div className="sec-tag sec-tag-teal">Contact Us</div>
          <h1 className="text-4xl lg:text-5xl font-black mb-3">Let&apos;s <span className="grad-text">Connect</span></h1>
          <p className="text-[1.05rem] leading-relaxed" style={{ color: 'var(--ts)' }}>Have a hiring requirement or looking for career opportunities? We&apos;re ready to assist you.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT */}
          <div className="flex flex-col gap-5">
            {/* contact items */}
            {[
              { ico:<Phone size={20} style={{color:'var(--teal3)'}}/>, lbl:'Mobile & Office', val:<><a href="tel:9789680187" className="block hover:text-[#D4A017] transition-colors">+91 97896 80187</a><a href="tel:9677333184" className="block hover:text-[#D4A017] transition-colors">+91 96773 33184</a></> },
              { ico:<Mail size={20} style={{color:'var(--teal3)'}}/>, lbl:'Email', val:<a href="mailto:premkkantech@yahoo.com" className="hover:text-[#D4A017] transition-colors">premkkantech@yahoo.com</a> },
              { ico:<MapPin size={20} style={{color:'var(--teal3)'}}/>, lbl:'Office Address', val:<span className="leading-relaxed">#58/A, 18, 2nd Floor, K.P Complex,<br/>Near Agarwal Hospital,<br/>Bangalore Bye-Pass Road,<br/>Hosur – 635109</span> },
            ].map((c,i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-xl border transition-all duration-300 hover:border-[#D4A017] hover:shadow-[0_8px_20px_rgba(212,160,23,0.06)]" style={{background:'var(--bg2)',borderColor:'var(--bdr)'}}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border" style={{background:'rgba(14,116,144,.12)',borderColor:'rgba(14,116,144,.2)'}}>{c.ico}</div>
                <div>
                  <div className="text-[10.5px] uppercase tracking-[1.2px] mb-1" style={{color:'var(--tm)'}}>{c.lbl}</div>
                  <div className="font-semibold text-[14.5px]" style={{color:'var(--white)'}}>{c.val}</div>
                </div>
              </div>
            ))}

            {/* WhatsApp */}
            <a href="https://api.whatsapp.com/send?phone=919789680187&text=Hello%20KANTECH%20INDUSTRIAL%20SOLUTIONS"
              target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-[14.5px] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(37,211,102,.4)]"
              style={{background:'#25D366',boxShadow:'0 4px 20px rgba(37,211,102,.3)'}}>
              <MessageCircle size={18} /> Chat on WhatsApp · +91 97896 80187
            </a>

            {/* Social */}
            <div className="flex gap-3">
              <a href="https://www.facebook.com/surendar.nair" target="_blank" rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl border font-bold text-[13.5px] transition-all duration-300 hover:border-[#D4A017] hover:text-[#D4A017] hover:shadow-[0_4px_12px_rgba(212,160,23,0.1)]"
                style={{background:'rgba(255,255,255,.04)',borderColor:'var(--bdr)',color:'var(--ts)'}}>
                <Facebook size={16} /> Facebook
              </a>
              <a href="https://www.linkedin.com/company/kantech-industrial-solutions/" target="_blank" rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl border font-bold text-[13.5px] transition-all duration-300 hover:border-[#D4A017] hover:text-[#D4A017] hover:shadow-[0_4px_12px_rgba(212,160,23,0.1)]"
                style={{background:'rgba(255,255,255,.04)',borderColor:'var(--bdr)',color:'var(--ts)'}}>
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border" style={{borderColor:'var(--bdr)'}}>
              <iframe
                src="https://maps.google.com/maps?q=Hosur,Tamil+Nadu,India&z=13&output=embed"
                width="100%" height="260" style={{border:0,display:'block'}}
                allowFullScreen loading="lazy" title="KANTECH Office Location" />
            </div>
          </div>

          {/* RIGHT - form */}
          <div className="rounded-2xl border p-8" style={{background:'var(--bg2)',borderColor:'var(--bdr)'}}>
            <h3 className="font-bold text-[1.2rem] mb-7 pb-5" style={{borderBottom:'1px solid var(--bdr)'}}>Send Us a Message</h3>
            {success ? (
              <div className="text-center py-12">
                <CheckCircle size={56} className="mx-auto mb-4" style={{color:'#4ade80'}}/>
                <div className="text-[1.2rem] font-bold mb-2 grad-text">Message Sent!</div>
                <div className="text-[14px]" style={{color:'var(--ts)'}}>We&apos;ll respond within 24 hours.</div>
                <button onClick={() => { setSuccess(false); setForm({name:'',email:'',phone:'',message:''}) }}
                  className="mt-5 px-6 py-2 rounded-lg border text-[13.5px] font-semibold transition-all hover:border-teal-400"
                  style={{borderColor:'var(--bdr)',color:'var(--ts)'}}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-5">
                {[['name','Name *','Full Name','text'],['email','Email *','email@example.com','email'],['phone','Phone','+ 91 XXXXX XXXXX','tel']].map(([k,l,p,t]) => (
                  <div key={k} className="flex flex-col gap-2">
                    <label className="text-[11.5px] font-bold uppercase tracking-[0.8px]" style={{color:'var(--ts)'}}>{l}</label>
                    <input type={t} placeholder={p} value={(form as Record<string,string>)[k]}
                      onChange={e => set(k, e.target.value)} className="form-input" />
                  </div>
                ))}
                <div className="flex flex-col gap-2">
                  <label className="text-[11.5px] font-bold uppercase tracking-[0.8px]" style={{color:'var(--ts)'}}>Message</label>
                  <textarea placeholder="How can we help you?" value={form.message} onChange={e => set('message', e.target.value)} rows={5} className="form-input" style={{resize:'vertical'}}/>
                </div>
                <button type="submit" disabled={loading}
                  className="w-full py-4 rounded-xl font-bold text-[15px] text-white transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 flex items-center justify-center gap-2"
                  style={{background:'linear-gradient(135deg,#0E7490,#1565C0)',boxShadow:'0 6px 24px rgba(14,116,144,.35)'}}>
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
