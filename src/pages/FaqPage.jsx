import { useRef, useState } from 'react'
import { CalendarCheck, ClipboardCheck, FileText, House, MessageCircle, RefreshCw, SearchCheck, WalletCards } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Seo from '../components/seo/Seo'
import PageHeader from '../components/ui/PageHeader'
import FaqAccordion from '../components/ui/FaqAccordion'
import CtaBannerSection from '../components/sections/home/CtaBannerSection'
import { asset } from '../config/site'
import './FaqPage.css'

const LINE_URL = 'https://line.me/R/ti/p/@301thssm'

const CATEGORIES = [
  {
    id: 'process', label: '驗屋流程',
    items: [
      { q: '驗屋大概需要多久時間？', a: '依物件大小不同，一般新成屋約需 2 至 4 小時；中古屋與透天則依屋況、坪數及樓層調整。' },
      { q: '驗屋應安排在交屋前還是交屋後？', a: '新成屋建議在正式點交前安排，發現缺失後仍保有較完整的修繕溝通空間。' },
      { q: '驗屋當天屋主需要在場嗎？', a: '建議在場，能直接了解發現與檢測方式；若無法到場，也會透過報告說明重點。' },
    ],
  },
  {
    id: 'booking', label: '預約準備',
    items: [
      { q: '預約前需要準備哪些資料？', a: '請提供物件地址、房型、權狀坪數、預計交屋日期與可安排時段。若有客變圖或建商通知，也可一併提供。' },
      { q: '建議提前多久預約驗屋？', a: '建議在預計驗屋日前 1 至 2 週聯繫。熱門交屋月份排程較滿，可在建商通知後先詢問。' },
      { q: '驗屋當天需要請建商準備什麼？', a: '請確認現場已供水、供電，並可操作門窗、設備與排水；若社區有進場規範，也請提前告知。' },
    ],
  },
  {
    id: 'inspection', label: '檢測內容',
    items: [
      { q: '驗屋主要會檢查哪些項目？', a: '包含防水滲漏、給排水、用電與弱電、牆地面與磁磚、門窗設備，以及儀器輔助檢測與照片紀錄。' },
      { q: '熱顯像可以直接判定漏水嗎？', a: '熱顯像用來觀察表面溫差，需要搭配現場痕跡、含水狀況與其他檢測結果綜合判讀。' },
      { q: '封閉在牆內的管線也能檢查嗎？', a: '驗屋以現場可觀察、可操作與可檢測範圍為主；未開孔的隱蔽管線會清楚說明檢測限制。' },
    ],
  },
  {
    id: 'fee', label: '費用時程',
    items: [
      { q: '驗屋費用怎麼計算？', a: '報價依物件類型、坪數、樓層與地區個別評估。透過 LINE 提供物件資訊後即可取得報價。' },
      { q: '交屋時程很趕，來得及安排嗎？', a: '請盡早告知交屋時程，我們會確認可配合的日期；建議至少預留 1 至 2 週。' },
      { q: '社區團購有專屬方案嗎？', a: '社區團購可統一協調排程。提供社區名稱、戶數與交屋時程後，我們會依需求提出方案。' },
    ],
  },
  {
    id: 'report', label: '報告依據',
    items: [
      { q: '報告會在驗屋後多久提供？', a: '一般在驗屋完成後 1 至 3 個工作日內提供 PDF 報告。' },
      { q: '驗屋報告可以拿來做什麼？', a: '報告完整保留缺失位置、照片與說明，可作為通知建商修繕及後續複驗的依據。' },
      { q: '宅心會代替屋主和建商交涉嗎？', a: '我們協助找出問題、整理報告並說明重點；實際修繕協調仍由屋主與建商進行。' },
    ],
  },
  {
    id: 'recheck', label: '複驗修繕',
    items: [
      { q: '初驗完成後一定需要複驗嗎？', a: '若初驗有需要建商修繕的項目，建議安排複驗，逐項確認完成狀況。' },
      { q: '複驗會重新檢查全部項目嗎？', a: '複驗以初驗報告中的缺失為主要核對範圍，也會留意修繕周邊是否出現新狀況。' },
      { q: '建商修繕結果要怎麼確認？', a: '依報告中的位置、照片與項目逐一核對，確認已處理、仍待改善或需要持續觀察。' },
    ],
  },
  {
    id: 'service', label: '房型服務',
    items: [
      { q: '哪些房型可以驗屋？', a: '新成屋、中古屋、透天別墅與社區團購皆可安排，並依房型調整檢測重點。' },
      { q: '中古屋能保證找出所有問題嗎？', a: '服務以可觀察與可檢測的屋況為主；藏在牆內或地板下的隱蔽問題無法保證判斷。' },
      { q: '除了驗屋，還提供哪些服務？', a: '另有裝潢細清與全屋整裝服務，可依入住需求透過 LINE 詢問。' },
    ],
  },
]

const CATEGORY_ICONS = {
  process: ClipboardCheck,
  booking: CalendarCheck,
  inspection: SearchCheck,
  fee: WalletCards,
  report: FileText,
  recheck: RefreshCw,
  service: House,
}

export default function FaqPage() {
  const pageRef = useRef(null)
  useScrollReveal(pageRef)
  const [active, setActive] = useState(0)
  const current = CATEGORIES[active] ?? CATEGORIES[0]
  const numberedItems = current.items.map((item, index) => ({
    q: `Q${active + 1}-${index + 1}. ${item.q}`,
    a: item.a,
  }))

  return (
    <div ref={pageRef}>
      <Seo routeKey="faq" fallback={{
        title: '常見問題 FAQ — 宅心驗屋專業驗屋公司',
        description: '整理驗屋流程、預約準備、檢測內容、費用、報告與複驗等常見問題。',
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
            <div className="faq-page__topics">
              <p className="text-label">常見問題分類</p>
              <h2 className="text-h2">先選擇想了解的主題</h2>
              <p>從預約、檢測到報告與複驗，快速找到需要的答案。</p>
            </div>

            <div className="faq-page__tabs" role="tablist" aria-label="問題分類">
              {CATEGORIES.map((category, index) => {
                const Icon = CATEGORY_ICONS[category.id]
                return (
                  <button
                    key={category.id}
                    role="tab"
                    aria-selected={active === index}
                    className={`faq-page__tab${active === index ? ' is-active' : ''}`}
                    onClick={() => setActive(index)}
                  >
                    <Icon size={20} strokeWidth={1.8} />
                    <span className="faq-page__tab-copy">
                      <strong>{category.label}</strong>
                      <small>{category.items.length} 個問題</small>
                    </span>
                  </button>
                )
              })}
            </div>

            <div key={current.id} className="faq-page__list">
              <FaqAccordion items={numberedItems} />
            </div>

            <div className="faq-page__cta">
              <p>還有其他問題嗎？</p>
              <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <MessageCircle size={18} />LINE 直接詢問
              </a>
            </div>
          </div>
        </div>
      </section>

      <CtaBannerSection />
    </div>
  )
}