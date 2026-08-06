import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../../components/seo/Seo'
import { Building2, Shield, CalendarCheck, ArrowRight } from 'lucide-react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import PageHeader from '../../components/ui/PageHeader'
import FaqAccordion from '../../components/ui/FaqAccordion'
import CtaBannerSection from '../../components/sections/home/CtaBannerSection'
import './NewHomePage.css'
import './GroupPage.css'
import { asset } from '../../config/site'

const ADVANTAGES = [
  {
    icon: Shield,
    title: '集體記錄，建商難以個別逃避',
    desc: '多戶共同記錄缺失，建商面對的是整體問題清單，而非單一屋主的反映，交涉效力明顯提升。',
  },
  {
    icon: Building2,
    title: '公設缺失同步記錄',
    desc: '除了個別戶型，公設區域的缺失也可納入檢測範圍，讓社區整體交涉更完整。',
  },
  {
    icon: CalendarCheck,
    title: '統一排程，效率更高',
    desc: '集中安排多戶排程，減少各自協調的時間成本，整個社區可以在同一時段完成驗屋。',
  },
]

const SITUATIONS = [
  { label: '新社區多戶同時交屋', desc: '最常見的團購場景，交屋時程集中，排程最有效率。' },
  { label: '住戶群組自行召集', desc: '社區 LINE 群自發組成，宅心協助收集需求與統一安排。' },
  { label: '社區管委會籌備階段', desc: '管委籌備期間的屋況確認，為後續保固申請建立基準。' },
  { label: '建商 / 代銷批次安排', desc: '建商主動提供驗屋服務，由宅心負責批量執行與報告交付。' },
]

const GROUP_FLOW = [
  { num: '01', title: '需求收集', desc: '提供社區名稱、大約戶數與交屋時程，我們評估排程可行性。' },
  { num: '02', title: '條件確認', desc: '確認物件地址、戶型數量、公設範圍與各戶排程意願。' },
  { num: '03', title: '統一排程協調', desc: '透過 LINE 群或統一聯絡窗口，安排各戶最適時段。' },
  { num: '04', title: '現場批次檢測', desc: '各戶獨立進行，每戶報告分開保密，不影響彼此資訊。' },
  { num: '05', title: '報告交付與說明', desc: '1–3 個工作日內交付各戶 PDF 報告，視需求安排集體說明。' },
]

const FAQS = [
  {
    q: '最少幾戶才能申請社區團購？',
    a: '目前沒有硬性的最低戶數門檻，但通常 5 戶以上的社區排程協調效益較明顯。戶數較少時，也歡迎透過 LINE 說明情況，我們會提供最適合的方案建議。',
  },
  {
    q: '公設問題也可以一起記錄嗎？',
    a: '可以。社區團購方案中，住戶可以在個別戶型驗屋之外，另外提出公設檢測的需求。公設範圍與收費方式請透過 LINE 另行確認。',
  },
  {
    q: '各戶的缺失報告會讓其他住戶知道嗎？',
    a: '不會。每戶的驗屋報告獨立保密，只交付給該戶屋主。各戶之間的缺失資訊不會互相揭露，請放心。',
  },
  {
    q: '我是社區住戶，但建商已經說有安排驗屋，還需要自己請嗎？',
    a: '建商安排的驗屋與屋主自行委託的驗屋立場不同。建議評估建商所安排的驗屋師是否獨立於建商體系，若不確定，自行委託可確保驗屋師只對屋主負責，報告完全透明。',
  },
]

export default function GroupPage() {
  const pageRef = useRef(null)
  useScrollReveal(pageRef)
  return (
    <div ref={pageRef}>
      <Seo routeKey="service-group" fallback={{
        title: '社區驗屋｜社區團購驗屋服務 — 宅心驗屋專業驗屋公司',
        description: '宅心驗屋提供社區驗屋與社區團購方案，適合新社區住戶群組、管委籌備或交屋前集體需求。統一排程、批次檢測，每戶獨立報告保密交付。',
        keywords: '社區驗屋, 社區團購驗屋, 專業驗屋公司, 宅心驗屋, 集體驗屋, 管委驗屋',
        ogTitle: '社區驗屋｜宅心驗屋社區團購方案',
        ogDescription: '社區驗屋首選。統一排程、批次檢測、每戶獨立報告。LINE 立即諮詢。',
        ogImage: asset('assets/og/og-group.jpg'),
      }} />

      <PageHeader
        eyebrow="社區團購驗屋"
        title="家的社區大家來守護"
        desc="一戶即享團購價，結合社區力量一起把關"
        image={asset('assets/banners/group-desktop.webp')}
        mobileImage={asset('assets/banners/group-mobile.webp')}
      />

      {/* 優勢 */}
      <section className="bg-base section">
        <div className="container">
          <div className="new-home-flow__header">
            <p className="text-label new-home-flow__label">團購優勢</p>
            <h2 className="text-h2">社區驗屋三大優勢</h2>
          </div>
          <div className="group-advantages" data-stagger>
            {ADVANTAGES.map((a) => {
              const Icon = a.icon
              return (
                <div key={a.title} className="advantage-card">
                  <div className="advantage-card__icon"><Icon size={26} strokeWidth={1.5} /></div>
                  <h3 className="advantage-card__title text-h4">{a.title}</h3>
                  <p className="advantage-card__desc">{a.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 適合情境 */}
      <section className="bg-subtle section">
        <div className="container">
          <div className="new-home-defects__header">
            <p className="text-label new-home-defects__label">適合情境</p>
            <h2 className="text-h2">適合社區驗屋的情況</h2>
          </div>
          <div className="group-situations" data-stagger>
            {SITUATIONS.map((s) => (
              <div key={s.label} className="situation-item">
                <span className="situation-item__dot" />
                <div>
                  <p className="situation-item__label">{s.label}</p>
                  <p className="situation-item__desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 流程 */}
      <section className="bg-warm section">
        <div className="container">
          <div className="new-home-flow__header">
            <p className="text-label new-home-flow__label">團購流程</p>
            <h2 className="text-h2">社區驗屋流程</h2>
          </div>
          <div className="group-flow" data-stagger>
            {GROUP_FLOW.map((s) => (
              <div key={s.num} className="service-flow-step">
                <span className="service-flow-step__num text-number">{s.num}</span>
                <h3 className="service-flow-step__title text-h4">{s.title}</h3>
                <p className="service-flow-step__desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-base section">
        <div className="container">
          <div className="service-faq-inner">
            <div className="service-faq-header">
              <p className="text-label new-home-defects__label">常見問題</p>
              <h2 className="text-h2">社區驗屋常見問題</h2>
            </div>
            <div className="service-faq-accordion">
              <FaqAccordion items={FAQS} />
            </div>
          </div>
        </div>
      </section>

      {/* 企業合作入口 */}
      <section className="group-enterprise bg-subtle section">
        <div className="container">
          <div className="group-enterprise__inner">
            <div className="group-enterprise__text">
              <p className="text-label new-home-defects__label">企業合作</p>
              <h2 className="text-h3">您是建商或代銷？</h2>
              <p className="group-enterprise__desc">
                批量驗屋與企業合作，歡迎聯繫。
              </p>
            </div>
            <Link to="/contact-enterprise" className="btn btn-secondary group-enterprise__btn">
              填寫企業合作表單 <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <CtaBannerSection />
    </div>
  )
}
