import { useEffect, useRef, useState } from 'react'
import { ListChecks, Send, RefreshCw, Archive, CircleAlert, Wrench, Gauge, ClipboardCheck } from 'lucide-react'
import { asset } from '../../../config/site'
import NextSectionCue from '../../ui/NextSectionCue'
import './ReportValueSection.css'

const OUTCOMES = [
  { icon: ListChecks, title: '完整保留屋況' },
  { icon: Send, title: '清楚溝通修繕' },
  { icon: RefreshCw, title: '持續追蹤進度' },
  { icon: Archive, title: '建立交屋依據' },
]

export default function ReportValueSection() {
  const rootRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const section = rootRef.current
    if (!section) return undefined
    if (!('IntersectionObserver' in window)) {
      const frame = window.requestAnimationFrame(() => setVisible(true))
      return () => window.cancelAnimationFrame(frame)
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.45 },
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={rootRef}
      id="report-value"
      className={`report-value bg-base section home-section home-section--immersive${visible ? ' is-visible' : ''}`}
    >
      <div className="container">
        <div className="report-value__header">
          <h2 className="text-h2 report-value__title">
            真實屋況的延伸<br /><span className="report-value__highlight">「驗屋報告」</span>
          </h2>

        </div>

        <div className="report-map">
          <svg className="report-map__lines report-map__lines--desktop" viewBox="0 0 1000 520" preserveAspectRatio="none" aria-hidden="true">
            <path d="M500 260 C430 185 330 130 210 105" />
            <path d="M500 260 C570 180 680 120 805 105" />
            <path d="M500 260 C425 340 325 390 205 420" />
            <path d="M500 260 C585 340 685 390 805 420" />
          </svg>
          <svg className="report-map__lines report-map__lines--mobile" viewBox="0 0 320 600" preserveAspectRatio="none" aria-hidden="true">
            <path d="M160 100 C160 175 95 185 95 250 S225 330 225 390 S95 475 95 540" />
          </svg>

          <figure className="report-document">
            <span className="report-document__sheet report-document__sheet--back" aria-hidden="true" />
            <span className="report-document__sheet report-document__sheet--middle" aria-hidden="true" />
            <img src={asset('assets/reports/new-home-report-commercial-v2.webp')} alt="宅心驗屋報告內容示意" loading="lazy" />
          </figure>

          <div className="report-details" aria-label="驗屋報告內容示意">
            <article className="report-detail report-detail--issue">
              <span className="report-detail__icon"><CircleAlert size={19} /></span>
              <strong>完整留存屋況</strong>
            </article>
            <article className="report-detail report-detail--advice">
              <span className="report-detail__icon"><Wrench size={19} /></span>
              <strong>清楚交付修繕</strong>
            </article>
            <article className="report-detail report-detail--value">
              <span className="report-detail__icon"><Gauge size={19} /></span>
              <strong>持續追蹤進度</strong>
            </article>
            <article className="report-detail report-detail--confirm">
              <span className="report-detail__icon"><ClipboardCheck size={19} /></span>
              <strong>逐項確認交屋</strong>
            </article>
          </div>

          <ol className="report-map__outcomes">
            {OUTCOMES.map(({ icon: Icon, title }, index) => (
              <li key={title} className={`report-outcome report-outcome--${index + 1}`}>
                <span className="report-outcome__icon"><Icon size={20} strokeWidth={1.6} /></span>
                <strong>{title}</strong>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <NextSectionCue target="home-seminar" label="第一次驗屋先了解" tone="light" />
    </section>
  )
}
