import { useRef, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useCmsData } from '../hooks/useCmsData'
import Seo from '../components/seo/Seo'
import PageHeader from '../components/ui/PageHeader'
import FaqAccordion from '../components/ui/FaqAccordion'
import CtaBannerSection from '../components/sections/home/CtaBannerSection'
import './FaqPage.css'
import { asset } from '../config/site'

const LINE_URL = 'https://line.me/R/ti/p/@301thssm'

const CATEGORIES_FALLBACK = [
  {
    id: 'process',
    label: '驗屋流程',
    items: [
      { q: '驗屋大概需要多久時間？', a: '依物件大小不同，一般新成屋約需 2 至 4 小時，中古屋視屋況與坪數可能需要 3 至 5 小時，透天別墅因樓層多通常需要半天以上。社區團購則依戶數另行排程。' },
      { q: '驗屋是交屋前還是交屋後來？', a: '新成屋建議在正式交屋點交前安排，發現缺失可在點交當下與建商確認，保有較完整的交涉空間。若已完成點交，也仍可安排驗屋，協助釐清保固責任範圍。' },
      { q: '可以在點交當天才叫驗屋嗎？', a: '點交當天時間緊迫且建商代表在場，現場壓力較大。建議提前安排，讓你在點交前已有完整缺失清單，當天只需確認修繕承諾即可。' },
      { q: '驗屋當天我需要在場嗎？', a: '建議在場。驗屋師會一邊檢測一邊說明發現，現場提問能讓你更了解屋況。若無法到場，我們也會在報告說明階段完整解說。' },
    ],
  },
  {
    id: 'fee',
    label: '費用與時程',
    items: [
      { q: '驗屋費用是怎麼計算的？', a: '驗屋報價依物件條件、坪數與地區個別估算。請透過 LINE 提供物件資訊，我們會盡快回覆報價參考。' },
      { q: '交屋時程很趕，來得及安排嗎？', a: '請盡早透過 LINE 告知交屋時程，我們會盡力配合排程。建議在點交日前 1–2 週聯繫，預留檢測與後續溝通時間。' },
      { q: '社區團購有比較優惠嗎？', a: '社區團購採統一排程、批次檢測，協調效益較高。實際方案與報價請透過 LINE 提供社區名稱、大約戶數與交屋時程，我們提供建議。' },
    ],
  },
  {
    id: 'report',
    label: '報告與保固',
    items: [
      { q: '報告會在驗屋後多久提供？', a: '一般情況下，驗屋完成後 1 至 3 個工作日內提供完整報告。報告為電子檔（PDF），視需求可加印紙本。' },
      { q: '建商說有保固期，還需要額外驗屋嗎？', a: '保固的前提是「缺失有被記錄」。交屋時若沒有完整缺失清單，後續申請保固修繕可能面臨建商質疑。驗屋報告可作為保固申請的依據，讓交涉更有說服力。' },
      { q: '驗屋後建商不願意修繕怎麼辦？', a: '宅心的報告提供明確缺失位置、照片與說明，是溝通最有力的書面依據。實際交涉由屋主主導，我們在報告說明階段協助你理解哪些屬於建商應修繕範圍。' },
      { q: '宅心會幫忙跟建商交涉嗎？', a: '宅心協助找出問題與建立交涉依據，不承擔修繕責任，也不代為交涉。但我們會在報告說明時，協助你掌握重點與溝通方向。' },
    ],
  },
  {
    id: 'service',
    label: '房型與服務',
    items: [
      { q: '哪些房型可以驗屋？', a: '新成屋、中古屋、透天別墅與社區團購皆可安排。不同房型的檢測重點不同，我們會依屋況調整。' },
      { q: '中古屋驗屋能保證找出所有問題嗎？', a: '宅心的服務範圍為可觀察與可檢測的屋況線索。對於藏在牆內、夾層或地板下未開挖的管線，無法做保證性判斷，相關限制會在報告中如實說明。' },
      { q: '除了驗屋，還有提供其他服務嗎？', a: '有。我們也提供裝潢細清與全屋整裝服務，協助你從檢測、清潔到整裝一站式完成。詳情可參考服務項目頁或透過 LINE 洽詢。' },
    ],
  },
]

export default function FaqPage() {
  const pageRef = useRef(null)
  useScrollReveal(pageRef)
  const CATEGORIES = useCmsData('/api/content/faqs?locale=zh') ?? CATEGORIES_FALLBACK
  const [active, setActive] = useState(0)
  const current = CATEGORIES[active] ?? CATEGORIES[0]

  // Q 編號：Q{分類序}-{題序}
  const numberedItems = current.items.map((it, i) => ({
    q: `Q${active + 1}-${i + 1}. ${it.q}`,
    a: it.a,
  }))

  return (
    <div ref={pageRef}>
      <Seo routeKey="faq" fallback={{
        title: '常見問題 FAQ — 宅心驗屋專業驗屋公司',
        description: '宅心驗屋常見問題：驗屋流程、費用時程、報告保固、房型與服務。交屋前最常被問的疑問，一次解答。',
        ogImage: asset('assets/og/og-faq.webp'),
      }} />

      <PageHeader
        eyebrow="常見問題 / FAQ"
        title="屋主最常問的問題"
        desc="快速找到驗屋、費用與報告相關答案。"
        image={asset('assets/banners/faq-desktop.webp')}
        mobileImage={asset('assets/banners/faq-mobile.webp')}
      />

      <section className="faq-page bg-base section">
        <div className="container">
          <div className="faq-page__inner" data-reveal>
            {/* Category tabs */}
            <div className="faq-page__tabs" role="tablist" aria-label="問題分類">
              {CATEGORIES.map((c, i) => (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={active === i}
                  className={`faq-page__tab${active === i ? ' is-active' : ''}`}
                  onClick={() => setActive(i)}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Accordion */}
            <div key={current.id} className="faq-page__list">
              <FaqAccordion items={numberedItems} />
            </div>

            <div className="faq-page__cta">
              <p>還有其他問題嗎？</p>
              <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <MessageCircle size={18} /> LINE 直接詢問
              </a>
            </div>
          </div>
        </div>
      </section>

      <CtaBannerSection />
    </div>
  )
}
