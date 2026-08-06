import { useRef } from 'react'
import { CalendarDays, CheckCircle2, MessageCircle } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Seo from '../components/seo/Seo'
import { seminars as localSeminars, filterActiveSeminars } from '../data/seminars'
import { GA_EVENTS, trackEvent } from '../utils/analytics'
import { asset } from '../config/site'
import './SeminarPage.css'

const LINE_URL = 'https://line.me/R/ti/p/@301thssm'
const WEEK_DAYS = ['日', '一', '二', '三', '四', '五', '六']

const TAKEAWAYS = [
  '知道交屋前哪些地方最容易出問題',
  '看懂驗屋流程、儀器與報告重點',
  '面對建商時，知道問題該怎麼問',
  '建立自己的交屋檢查與溝通清單',
]

function formatDate(dateStr) {
  const date = new Date(`${dateStr}T00:00:00`)
  return {
    month: date.getMonth() + 1,
    day: date.getDate(),
    weekday: WEEK_DAYS[date.getDay()],
  }
}

function groupSeminarsByMonth(list) {
  return list.reduce((groups, seminar) => {
    const { month } = formatDate(seminar.date)
    const key = `${seminar.date.slice(0, 4)}-${String(month).padStart(2, '0')}`
    if (!groups[key]) groups[key] = { month, seminars: [] }
    groups[key].seminars.push(seminar)
    return groups
  }, {})
}

function SeminarDate({ seminar }) {
  const { month, day, weekday } = formatDate(seminar.date)
  return (
    <div className="seminar-date">
      <span>{month} 月</span>
      <strong className="text-number">{day}</strong>
      <span>週{weekday}</span>
    </div>
  )
}

export default function SeminarPage() {
  const seminars = filterActiveSeminars(localSeminars)
  const seminarGroups = Object.values(groupSeminarsByMonth(seminars))
  const pageRef = useRef(null)
  useScrollReveal(pageRef)

  const handleLineClick = () => {
    trackEvent(GA_EVENTS.CTA_LINE_CLICK, { location: 'seminar' })
  }

  return (
    <div ref={pageRef}>
      <Seo routeKey="seminar" fallback={{
        title: '驗屋說明會｜交屋前先把問題弄懂 — 宅心驗屋',
        description: '宅心驗屋說明會，帶你了解驗屋流程、報告與交屋溝通重點。',
        ogImage: asset('assets/og/og-seminar.jpg'),
      }} />

      <section
        className="seminar-hero"
        style={{ '--seminar-hero-image': `url('${asset('assets/hero/hero-seminar.jpg')}')` }}
      >
        <div className="container seminar-hero__inner">
          <div className="seminar-hero__content">
            <p className="text-label seminar-hero__eyebrow">宅心驗屋說明會</p>
            <h1 className="seminar-hero__title">認識驗屋從這邊開始</h1>
            <p className="seminar-hero__desc">40分鐘掌握驗屋流程、報告與溝通重點</p>
            <a href="#seminar-sessions" className="btn btn-primary seminar-hero__button">
              <CalendarDays size={18} />查看近期場次
            </a>
          </div>
        </div>
      </section>

      <section className="seminar-takeaways-section bg-warm section">
        <div className="container">
          <div className="seminar-takeaways-section__heading">
            <h2 className="text-h2">說明會三大收穫</h2>
            <p>帶走交屋前真正用得到的判斷方法</p>
          </div>
          <div className="seminar-takeaways-section__grid" data-stagger>
            {TAKEAWAYS.map((item) => (
              <div key={item} className="seminar-takeaway-item">
                <CheckCircle2 size={22} /><span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="seminar-sessions" className="seminar-sessions bg-base section">
        <div className="container">
          <div className="seminar-section-heading">
            <h2 className="text-h2">近期驗屋說明會</h2>
            <p>選擇日期後，前往 LINE 完成預約。</p>
          </div>

          <div className="seminar-sessions__layout">
            <div className="seminar-months">
              {seminarGroups.length > 0 ? seminarGroups.map((group) => (
                <section className="seminar-month" key={group.month}>
                  <h3>{group.month} 月場次</h3>
                  <div className="seminar-dates">
                    {group.seminars.map((seminar) => (
                      <SeminarDate key={seminar.id} seminar={seminar} />
                    ))}
                  </div>
                </section>
              )) : (
                <p className="seminar-cards__empty">近期場次安排中，加入 LINE 即可詢問。</p>
              )}
            </div>

            <aside className="seminar-signup">
              <p className="text-label seminar-signup__label">報名方式</p>
              <p className="seminar-signup__title">前往 LINE 預約場次</p>
              <p className="seminar-signup__desc">告訴我們想參加的日期，由專人協助確認。</p>
              <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary seminar-signup__button" onClick={handleLineClick}>
                <MessageCircle size={16} />前往 LINE 預約
              </a>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}