import { useEffect, useState } from 'react'
import { MessageCircle, ArrowUp } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import './FloatingCta.css'

const LINE_URL = 'https://line.me/R/ti/p/@301thssm'

export default function FloatingCta() {
  const [visible, setVisible] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const revealAfter = pathname === '/' ? 4.5 : 0.6
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * revealAfter)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <div className={`floating-cta${visible ? ' is-visible' : ''}`} aria-hidden={!visible}>
      <a
        href={LINE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-cta__line"
        aria-label="LINE 立即諮詢"
      >
        <MessageCircle size={22} />
        <span className="floating-cta__line-text">LINE 諮詢</span>
      </a>
      <button type="button" className="floating-cta__top" onClick={toTop} aria-label="回到頂部">
        <ArrowUp size={20} />
      </button>
    </div>
  )
}
