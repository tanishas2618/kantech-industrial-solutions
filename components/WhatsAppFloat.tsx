'use client'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppFloat() {
  return (
    <a href="https://api.whatsapp.com/send?phone=919789680187&text=Hello%20KANTECH%20INDUSTRIAL%20SOLUTIONS"
      target="_blank" rel="noreferrer"
      className="wa-bounce fixed bottom-7 right-7 z-[9998] w-[58px] h-[58px] rounded-full flex items-center justify-center no-underline transition-all duration-300 hover:scale-110"
      style={{background:'#25D366', boxShadow:'0 4px 24px rgba(37,211,102,0.45)'}}
      title="Chat on WhatsApp">
      <MessageCircle size={28} className="text-white" />
    </a>
  )
}
