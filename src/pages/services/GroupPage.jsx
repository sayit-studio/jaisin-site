import { useRef } from 'react'
import { BadgePercent, CalendarCheck, CarFront, FileCheck2, MapPinned, SearchCheck, UsersRound } from 'lucide-react'
import Seo from '../../components/seo/Seo'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import PageHeader from '../../components/ui/PageHeader'
import FaqAccordion from '../../components/ui/FaqAccordion'
import CtaBannerSection from '../../components/sections/home/CtaBannerSection'
import './NewHomePage.css'
import './GroupPage.css'
import { asset } from '../../config/site'

const ADVANTAGES = [
  {
    icon: UsersRound,
    title: '社區一起把關',
    desc: '住戶彼此分享驗屋重點，讓大家掌握同一社區常見的施工狀況。',
  },
  {
    icon: SearchCheck,
    title: '同樣問題同步留意',
    desc: '同棟、同戶型或相同工法，可能出現相似問題；一戶發現，鄰居也能同步注意。',
  },
  {
    icon: FileCheck2,
    title: '每戶獨立完整報告',
    desc: '每間房屋仍獨立檢測、獨立紀錄，保留各戶交屋與修繕溝通依據。',
  },
  {
    icon: CalendarCheck,
    title: '集中安排更有效率',
    desc: '由社區統整需求與時程，減少住戶各自詢問，安排驗屋更清楚。',
  },
]

const OFFERS = [
  { icon: MapPinned, title: '全台都可驗', desc: '不受縣市限制，提供全台驗屋服務。' },
  { icon: BadgePercent, title: '一戶即享團購價', desc: '同社區住戶詢問，即可享有團購方案。' },
  { icon: CarFront, title: '台中免車馬費', desc: '台中地區安排驗屋，不另收車馬費。' },
]

const FAQS = [
  {
    q: '最少幾戶才能享有社區團購價？',
    a: '一戶即可享有團購價。若社區有更多住戶一起預約，也能集中協調需求與時程。',
  },
  {
    q: '鄰居發現的問題，我家也會有嗎？',
    a: '同棟、同戶型或採用相同工法時，確實可能出現類似狀況。我們仍會逐戶獨立檢測，不會直接以其他住戶的結果判定。',
  },
  {
    q: '各戶的驗屋報告會公開嗎？',
    a: '不會。每戶報告獨立製作並交付該戶屋主；住戶可自行決定是否在社區內分享問題。',
  },
  {
    q: '全台都能安排社區團購驗屋嗎？',
    a: '可以，全台皆可安排。台中地區免收車馬費，其他縣市會依地點與排程提供方案。',
  },
]

export default function GroupPage() {
  const pageRef = useRef(null)
  useScrollReveal(pageRef)

  return (
    <div ref={pageRef}>
      <Seo routeKey="service-group" fallback={{
        title: '社區驗屋｜社區團購驗屋服務 — 宅心驗屋',
        description: '宅心驗屋提供全台社區團購驗屋，一戶即享團購價，台中免車馬費。住戶共同掌握社區常見問題，每戶仍有獨立完整報告。',
        keywords: '社區驗屋, 社區團購驗屋, 全台驗屋, 台中驗屋, 宅心驗屋',
        ogTitle: '社區驗屋｜宅心驗屋社區團購方案',
        ogDescription: '一戶即享團購價，社區一起把關，每戶獨立驗屋報告。',
        ogImage: asset('assets/og/og-group.jpg'),
      }} />

      <PageHeader
        title="家的社區大家來守護"
        desc="一戶即享團購價，結合社區力量一起把關"
        image={asset('assets/banners/group-desktop-v2.webp')}
        mobileImage={asset('assets/banners/group-mobile-v2.webp')}
      />

      <section className="group-benefits bg-base section">
        <div className="container">
          <div className="group-section-heading">
            <h2 className="text-h2">社區一起驗，把關更完整</h2>
            <p>同一社區常有相同工法與設備，彼此分享發現，也能提醒鄰居留意相似問題。</p>
          </div>
          <div className="group-advantages" data-stagger>
            {ADVANTAGES.map(({ icon: Icon, title, desc }) => (
              <article key={title} className="advantage-card">
                <div className="advantage-card__icon"><Icon size={26} strokeWidth={1.6} /></div>
                <h3 className="advantage-card__title">{title}</h3>
                <p className="advantage-card__desc">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="group-offers bg-warm section">
        <div className="container">
          <div className="group-section-heading">
            <h2 className="text-h2">團購優惠</h2>
            <p>不用等待湊足戶數，先詢問就能開始安排。</p>
          </div>
          <div className="group-offer-grid" data-stagger>
            {OFFERS.map(({ icon: Icon, title, desc }) => (
              <article key={title} className="group-offer-card">
                <div className="group-offer-card__icon"><Icon size={28} strokeWidth={1.6} /></div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-base section">
        <div className="container">
          <div className="service-faq-inner">
            <div className="service-faq-header">
              <h2 className="text-h2">社區團購常見問題</h2>
            </div>
            <div className="service-faq-accordion">
              <FaqAccordion items={FAQS} />
            </div>
          </div>
        </div>
      </section>

      <CtaBannerSection />
    </div>
  )
}