import { useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useCmsData } from '../hooks/useCmsData'
import Seo from '../components/seo/Seo'
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  MapPin,
  MessageCircle,
  Users,
} from 'lucide-react'
import { seminars as localSeminars, filterActiveSeminars } from '../data/seminars'
import { GA_EVENTS, trackEvent } from '../utils/analytics'
import './SeminarPage.css'
import { asset } from '../config/site'

const LINE_URL = 'https://line.me/R/ti/p/@301thssm'
const WEEK_DAYS = ['日', '一', '二', '三', '四', '五', '六']

const TAKEAWAYS = [
  '知道交屋前哪些地方最容易出問題',
  '看懂驗屋流程、儀器與報告重點',
  '面對建商時，知道問題該怎麼問',
  '建立自己的交屋檢查與溝通清單',
]


const SEMINAR_NOTES = [
  { icon: Clock, text: '說明會時長約 60 分鐘' },
  { icon: MapPin, text: '採實體場次，可現場提問與互動' },
  { icon: Users, text: '每場限額 20 人，小班教學' },
]

const STATUS_LABEL = {
  full: '已額滿',
  postponed: '場次調整中',
}

function formatDate(dateStr) {
  const date = new Date(`${dateStr}T00:00:00`)
  return {
    month: date.getMonth() + 1,
    day: date.getDate(),
    weekday: WEEK_DAYS[date.getDay()],
  }
}

// 場次卡片：純資訊展示，報名一律由 LINE 完成。
function SeminarCard({ seminar }) {
  const { month, day, weekday } = formatDate(seminar.date)
  const unavailable = seminar.status === 'full' || seminar.status === 'postponed'

  return (
    <div className="seminar-card">
      <span className="seminar-card__date">
        <span>{month} 月</span>
        <strong className="text-number">{day}</strong>
        <span>週{weekday}</span>
      </span>

      <span className="seminar-card__content">
        <span className="seminar-card__meta">
          <span><Clock size={15} />{seminar.time} – {seminar.endTime}</span>
          <span><MapPin size={15} />{seminar.address}</span>
        </span>
        <span className={`badge ${unavailable ? 'badge-error' : 'badge-success'}`}>
          {STATUS_LABEL[seminar.status] ?? '開放報名'}
        </span>
      </span>
    </div>
  )
}

export default function SeminarPage() {
  // CMS 場次 ?? 本機；套用相同「有效場次」篩選
  const cmsSeminars = useCmsData('/api/content/seminars')
  const seminars = filterActiveSeminars(cmsSeminars ?? localSeminars)
  const pageRef = useRef(null)
  useScrollReveal(pageRef)

  const handleLineClick = () => {
    trackEvent(GA_EVENTS.CTA_LINE_CLICK, { location: 'seminar' })
  }

  return (
    <div ref={pageRef}>
      <Seo routeKey="seminar" fallback={{
        title: '驗屋說明會｜交屋前先把問題弄懂 — 宅心驗屋',
        description: '宅心驗屋說明會，帶你辨識常見缺失、了解驗屋流程、看懂檢測報告，並掌握與建商溝通的重點。',
        ogImage: asset('assets/og/og-seminar.jpg'),
      }} />

      {/* ── HERO ── */}
      <section
        className="seminar-hero"
        style={{ '--seminar-hero-image': `url('${asset('assets/hero/hero-seminar.jpg')}')` }}
      >
        <div className="container seminar-hero__inner">
          <div className="seminar-hero__content">
            <p className="text-label seminar-hero__eyebrow">宅心驗屋說明會</p>
            <h1 className="seminar-hero__title">交屋前，先懂驗屋</h1>
            <p className="seminar-hero__desc">一次了解流程、報告與交屋溝通重點。</p>
            <a href="#seminar-sessions" className="btn btn-primary seminar-hero__button">
              <CalendarDays size={18} />
              查看近期場次
            </a>
          </div>
        </div>
      </section>

      {/* ── TAKEAWAYS ── */}
      <section className="seminar-takeaways-section bg-warm section">
        <div className="container">
          <div className="seminar-takeaways-section__heading">
            <h2 className="text-h2">說明會三大收穫</h2>
            <p>帶走交屋前真正用得到的判斷方法</p>
          </div>
          <div className="seminar-takeaways-section__grid" data-stagger>
            {TAKEAWAYS.map((item) => (
              <div key={item} className="seminar-takeaway-item">
                <CheckCircle2 size={22} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SESSIONS ── */}
      <section id="seminar-sessions" className="seminar-sessions bg-base section">
        <div className="container">
          <div className="seminar-section-heading">
            <h2 className="text-h2">近期驗屋說明會</h2>
            <ul className="seminar-sessions__notes">
              {SEMINAR_NOTES.map(({ icon: Icon, text }) => (
                <li key={text}>
                  <Icon size={15} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="seminar-sessions__layout">
            <div className="seminar-cards">
              {seminars.length > 0 ? (
                seminars.map((seminar) => (
                  <SeminarCard key={seminar.id} seminar={seminar} />
                ))
              ) : (
                <p className="seminar-cards__empty">
                  近期場次安排中，加入 LINE 就能在開放報名時收到通知。
                </p>
              )}
            </div>

            <aside className="seminar-signup">
              <p className="text-label seminar-signup__label">報名方式</p>
              <p className="seminar-signup__title">說明會採 LINE 報名</p>
              <p className="seminar-signup__desc">
                加入宅心驗屋官方 LINE，就能報名說明會、也能直接預約驗屋。
                我們會在 LINE 上與你確認場次與名額。
              </p>
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary seminar-signup__button"
                onClick={handleLineClick}
              >
                <MessageCircle size={16} />
                前往 LINE 報名
              </a>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
