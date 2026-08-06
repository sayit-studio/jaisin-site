import { Link } from 'react-router-dom'
import { MessageCircle, Building2, Home, Users, CalendarDays, Landmark } from 'lucide-react'
import './QuickAccessSection.css'

const LINE_URL = 'https://line.me/R/ti/p/@301thssm'
const ITEMS = [
  { icon: MessageCircle, label: '我要驗屋', sub: 'LINE 諮詢', href: LINE_URL, external: true, accent: true },
  { icon: Home, label: '新成屋驗屋', sub: '交屋把關', to: '/services/new-home' },
  { icon: Building2, label: '中古屋驗屋', sub: '屋況確認', to: '/services/used-home' },
  { icon: Landmark, label: '透天別墅', sub: '逐層檢測', to: '/services/townhouse' },
  { icon: Users, label: '社區團購', sub: '集體驗屋', to: '/services/group' },
  { icon: CalendarDays, label: '驗屋說明會', sub: '近期場次', to: '/seminar' },
]

export default function QuickAccessSection() {
  return (
    <section id="quick-access" className="quick-access bg-base home-section home-section--immersive" aria-label="服務入口">
      <div className="container">
        <div className="quick-access__header" data-reveal>
          <h2 className="text-h2">接下來，選擇適合你的驗屋方式</h2>
          <p className="quick-access__intro">查看各類型的詳細服務；若還不確定，也可以先把房屋資訊傳給我們評估。</p>
        </div>
        <div className="quick-access__grid" data-stagger>
          {ITEMS.map((item) => {
            const Icon = item.icon
            const content = (
              <>
                <span className="quick-access__icon">
                  <Icon size={24} strokeWidth={1.6} />
                </span>
                <span className="quick-access__text">
                  <span className="quick-access__label">{item.label}</span>
                  <span className="quick-access__sub">{item.sub}</span>
                </span>
              </>
            )
            const cls = `quick-access__item${item.accent ? ' quick-access__item--accent' : ''}`
            return item.external ? (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>
                {content}
              </a>
            ) : (
              <Link key={item.label} to={item.to} className={cls}>
                {content}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
