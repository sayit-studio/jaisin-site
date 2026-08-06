import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from '../../utils/gsap'
import './PageTransition.css'

// ── 品牌方替換區：將下方 null 換成你的 SVG 或 <img> ──
// 範例：<img src={asset('assets/brand/transition-icon.png')} width="80" alt="" />
// 範例：<YourLogoSVG className="page-transition__icon" />
const BrandIcon = () => null

export default function PageTransition() {
  const { pathname } = useLocation()
  const overlayRef = useRef(null)
  const iconRef = useRef(null)
  const isFirst = useRef(true)

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      return
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const overlay = overlayRef.current
    const icon = iconRef.current

    gsap.timeline()
      .set(overlay, { visibility: 'visible', yPercent: 100 })
      .set(icon,    { opacity: 0, scale: 0.85 })
      .to(overlay, { yPercent: 0, duration: 0.28, ease: 'power3.inOut' })
      .to(icon,    { opacity: 1, scale: 1, duration: 0.18, ease: 'power2.out' }, '-=0.05')
      .to(icon,    { opacity: 0, scale: 0.9, duration: 0.15, ease: 'power2.in' }, '+=0.06')
      .to(overlay, { yPercent: -100, duration: 0.28, ease: 'power3.inOut' }, '-=0.08')
      .set(overlay, { visibility: 'hidden' })
  }, [pathname])

  return (
    <div ref={overlayRef} className="page-transition" aria-hidden="true">
      <div ref={iconRef}>
        <BrandIcon />
      </div>
    </div>
  )
}
