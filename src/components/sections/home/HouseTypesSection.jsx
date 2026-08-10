import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import './HouseTypesSection.css'
import { asset } from '../../../config/site'

const HOUSE_TYPES = [
  {
    key: 'new',
    tab: '新成屋',
    banner: asset('assets/house-types/new-home-banner.webp'),
    title: '新成屋驗屋',
    hook: '交屋前的最後一道把關',
    desc: '窗框防水、泄水坡度、熱顯像、用電全面檢測，交屋前找出缺失，與建商交涉有憑有據。',
    points: ['六大常見缺失檢測', '熱顯像儀器輔助', '完整圖像化報告'],
    cta: '了解新成屋驗屋',
    to: '/services/new-home',
  },
  {
    key: 'used',
    tab: '中古屋',
    banner: asset('assets/house-types/used-home-banner.webp'),
    title: '中古屋驗屋',
    hook: '買下之前，先看清真實屋況',
    desc: '漏水痕跡、老舊管線、排水異常，在交屋前或裝修入住前掌握屋況，讓你的決策有所依據。',
    points: ['漏水與潮濕痕跡', '管線與用電老化', '最佳驗屋時機建議'],
    cta: '了解中古屋驗屋',
    to: '/services/used-home',
  },
  {
    key: 'townhouse',
    tab: '透天別墅',
    banner: asset('assets/house-types/townhouse-banner.webp'),
    title: '透天別墅驗屋',
    hook: '多樓層多系統，更需逐層把關',
    desc: '頂樓防水、牆面滲水、各層管線與用電，透天獨有的檢測重點，逐層逐區完整確認。',
    points: ['頂樓放水測試', '各層管線排水', '牆面與樓梯檢查'],
    cta: '了解透天別墅驗屋',
    to: '/services/townhouse',
  },
]

export default function HouseTypesSection() {
  const [active, setActive] = useState(0)
  const current = HOUSE_TYPES[active]

  return (
    <section className="house-types bg-base section">
      <div className="container">
        <div className="house-types__header" data-reveal>
          <p className="text-label house-types__label">房屋類型 / House Types</p>
          <h2 className="text-h2 house-types__title">先選你的房型，看專屬驗屋建議</h2>
        </div>

        {/* Tabs */}
        <div className="house-types__tabs" role="tablist" aria-label="房屋類型">
          {HOUSE_TYPES.map((t, i) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={active === i}
              className={`house-types__tab${active === i ? ' is-active' : ''}`}
              onClick={() => setActive(i)}
            >
              {t.tab}
            </button>
          ))}
          <span
            className="house-types__underline"
            style={{
              width: `${100 / HOUSE_TYPES.length}%`,
              transform: `translateX(${active * 100}%)`,
            }}
            aria-hidden="true"
          />
        </div>

        {/* Panel (cross-fade by key) */}
        <div key={current.key} className="house-types__panel">
          <div className="house-types__banner">
            <img
              src={current.banner}
              alt={`${current.title}主視覺`}
              loading="lazy"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
            <span className="house-types__banner-tag">{current.tab}</span>
          </div>

          <div className="house-types__content">
            <h3 className="house-types__content-title text-h3">{current.title}</h3>
            <p className="house-types__hook">{current.hook}</p>
            <p className="house-types__desc">{current.desc}</p>
            <ul className="house-types__points">
              {current.points.map((p) => <li key={p}>{p}</li>)}
            </ul>
            <Link to={current.to} className="btn btn-primary house-types__cta">
              {current.cta} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
