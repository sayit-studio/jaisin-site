import { Building2, HousePlus, Landmark, MessageCircle } from 'lucide-react'
import Seo from '../components/seo/Seo'
import PageHeader from '../components/ui/PageHeader'
import { asset } from '../config/site'
import './EnterpriseContactPage.css'

const LINE_URL = 'https://line.me/R/ti/p/@301thssm'

const COOPERATION_TYPES = [
  {
    icon: Building2,
    title: '建商與代銷合作',
    desc: '交屋前批量檢測、客戶驗屋安排與報告交付，可依建案戶數與交屋時程共同規劃。',
  },
  {
    icon: HousePlus,
    title: '老屋與社區屋況',
    desc: '老屋、中古屋或社區共同需求，協助釐清現況，留下修繕與後續改善的參考依據。',
  },
  {
    icon: Landmark,
    title: '補助資訊協助',
    desc: '依案件需求協助整理檢測與修繕資訊，並提供可查詢的補助方向；實際資格以主管機關公告為準。',
  },
]

export default function EnterpriseContactPage() {
  return (
    <main className="cooperation-page">
      <Seo routeKey="contact-enterprise" fallback={{
        title: '合作洽詢 — 宅心驗屋',
        description: '建商代銷、老屋驗屋、社區批量服務與補助資訊協助，歡迎透過 LINE 與宅心驗屋洽詢。',
      }} />

      <PageHeader
        title="合作洽詢"
        desc="從建案、社區到老屋需求，讓專業檢測成為合作的可靠基礎"
        image={asset('assets/banners/about-desktop.webp')}
        mobileImage={asset('assets/banners/about-mobile.webp')}
      />

      <section className="cooperation-content section bg-base">
        <div className="container">
          <div className="cooperation-heading">
            <h2 className="text-h2">我們可以一起完成</h2>
            <p>先透過 LINE 告訴我們合作對象、物件地點、預計戶數與時程，我們會協助評估適合的方式。</p>
          </div>

          <div className="cooperation-types" data-stagger>
            {COOPERATION_TYPES.map(({ icon: Icon, title, desc }) => (
              <article key={title} className="cooperation-type-card">
                <span><Icon size={26} strokeWidth={1.6} /></span>
                <h2>{title}</h2>
                <p>{desc}</p>
              </article>
            ))}
          </div>

          <div className="cooperation-line">
            <h2>說明需求，我們一起評估</h2>
            <p>加入 LINE 後提供合作類型、物件位置與預計時程即可。</p>
            <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <MessageCircle size={19} /> LINE 合作洽詢
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}