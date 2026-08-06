import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react'
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
      { q: '驗屋完成後，下一步怎麼進行？', a: '收到報告後可依缺失項目通知建商修繕，待修繕完成再逐項確認或安排複驗。' },
      { q: '驗屋人員會現場說明嗎？', a: '會。檢測過程中會說明重要發現，結束前也會整理主要問題與後續處理方向。' },
    ],
  },
  {
    id: 'booking', label: '預約準備',
    items: [
      { q: '預約前需要準備哪些資料？', a: '請提供物件地址、房型、權狀坪數、預計交屋日期與可安排時段。若有客變圖或建商通知，也可一併提供。' },
      { q: '建議提前多久預約驗屋？', a: '建議在預計驗屋日前 1 至 2 週聯繫。熱門交屋月份排程較滿，可在建商通知後先詢問。' },
      { q: '驗屋當天需要請建商準備什麼？', a: '請確認現場已供水、供電，並可操作門窗、設備與排水；若社區有進場規範，也請提前告知。' },
      { q: '還沒有確定交屋日，可以先詢問嗎？', a: '可以先提供預計月份與物件資料，日期確定後再完成預約。' },
      { q: '預約後可以更改日期嗎？', a: '如需調整請盡早透過 LINE 聯繫，我們會依現有排程協助更改。' },
    ],
  },
  {
    id: 'inspection', label: '檢測內容',
    items: [
      { q: '驗屋主要會檢查哪些項目？', a: '包含防水滲漏、給排水、用電與弱電、牆地面與磁磚、門窗設備，以及儀器輔助檢測與照片紀錄。' },
      { q: '熱顯像可以直接判定漏水嗎？', a: '熱顯像用來觀察表面溫差，需要搭配現場痕跡、含水狀況與其他檢測結果綜合判讀。' },
      { q: '封閉在牆內的管線也能檢查嗎？', a: '驗屋以現場可觀察、可操作與可檢測範圍為主；未開孔的隱蔽管線會清楚說明檢測限制。' },
      { q: '磁磚空鼓會全面檢查嗎？', a: '會依可檢測範圍逐區檢查，並將異常位置記錄於報告中。' },
      { q: '會檢查插座與配電設備嗎？', a: '會檢查可操作的插座、配電箱及弱電設備，確認基本功能與可見異常。' },
    ],
  },
  {
    id: 'fee', label: '費用時程',
    items: [
      { q: '驗屋費用怎麼計算？', a: '報價依物件類型、坪數、樓層與地區個別評估。透過 LINE 提供物件資訊後即可取得報價。' },
      { q: '交屋時程很趕，來得及安排嗎？', a: '請盡早告知交屋時程，我們會確認可配合的日期；建議至少預留 1 至 2 週。' },
      { q: '社區團購有專屬方案嗎？', a: '社區團購可統一協調排程。提供社區名稱、戶數與交屋時程後，我們會依需求提出方案。' },
      { q: '透天別墅的費用如何估算？', a: '依總坪數、樓層數與檢測範圍評估，提供資料後即可取得個別報價。' },
      { q: '假日可以安排驗屋嗎？', a: '可依當期排程安排，假日時段通常較快額滿，建議提早詢問。' },
    ],
  },
  {
    id: 'report', label: '報告依據',
    items: [
      { q: '報告會在驗屋後多久提供？', a: '一般在驗屋完成後 1 至 3 個工作日內提供 PDF 報告。' },
      { q: '驗屋報告可以拿來做什麼？', a: '報告完整保留缺失位置、照片與說明，可作為通知建商修繕及後續複驗的依據。' },
      { q: '宅心會代替屋主和建商交涉嗎？', a: '我們協助找出問題、整理報告並說明重點；實際修繕協調仍由屋主與建商進行。' },
      { q: '報告內會附上缺失照片嗎？', a: '會以照片搭配位置與項目說明，方便屋主與建商對照現場。' },
      { q: '看不懂報告內容可以詢問嗎？', a: '可以，收到報告後可透過 LINE 確認項目或改善方向。' },
    ],
  },
  {
    id: 'recheck', label: '複驗修繕',
    items: [
      { q: '初驗完成後一定需要複驗嗎？', a: '若初驗有需要建商修繕的項目，建議安排複驗，逐項確認完成狀況。' },
      { q: '複驗會重新檢查全部項目嗎？', a: '複驗以初驗報告中的缺失為主要核對範圍，也會留意修繕周邊是否出現新狀況。' },
      { q: '建商修繕結果要怎麼確認？', a: '依報告中的位置、照片與項目逐一核對，確認已處理、仍待改善或需要持續觀察。' },
      { q: '複驗需要準備初驗報告嗎？', a: '宅心執行的案件會依原報告核對；其他來源的報告請預先提供。' },
      { q: '修繕還沒全部完成，可以先複驗嗎？', a: '建議待建商通知修繕完成後再安排，才能一次確認較完整的結果。' },
    ],
  },
  {
    id: 'service', label: '房型服務',
    items: [
      { q: '哪些房型可以驗屋？', a: '新成屋、中古屋、透天別墅與社區團購皆可安排，並依房型調整檢測重點。' },
      { q: '中古屋能保證找出所有問題嗎？', a: '服務以可觀察與可檢測的屋況為主；藏在牆內或地板下的隱蔽問題無法保證判斷。' },
      { q: '除了驗屋，還提供哪些服務？', a: '另有裝潢細清與全屋整裝服務，可依入住需求透過 LINE 詢問。' },
      { q: '中古屋驗屋和新成屋有什麼不同？', a: '中古屋重視使用痕跡與設備現況；新成屋則著重施工品質與交屋缺失。' },
      { q: '社區可以一起安排驗屋嗎？', a: '可以，由住戶統整戶數與預計時程後，我們可協助規劃連續場次。' },
    ],
  },
]

export default function FaqPage() {
  const pageRef = useRef(null)
  const tabsRef = useRef(null)
  useScrollReveal(pageRef)
  const [active, setActive] = useState(0)
  const current = CATEGORIES[active] ?? CATEGORIES[0]
  const numberedItems = current.items.map((item, index) => ({
    q: `Q${active + 1}-${index + 1}. ${item.q}`,
    a: item.a,
  }))

  const changeCategory = (nextIndex) => {
    const index = (nextIndex + CATEGORIES.length) % CATEGORIES.length
    setActive(index)
    tabsRef.current?.children[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }

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

            <div className="faq-page__tab-nav">
              <button className="faq-page__tab-arrow" type="button" aria-label="上一個分類" onClick={() => changeCategory(active - 1)}><ChevronLeft size={20} /></button>
              <div ref={tabsRef} className="faq-page__tabs" role="tablist" aria-label="問題分類">
                {CATEGORIES.map((category, index) => (
                  <button key={category.id} role="tab" aria-selected={active === index} className={`faq-page__tab${active === index ? ' is-active' : ''}`} onClick={() => changeCategory(index)}>
                    {category.label}
                  </button>
                ))}
              </div>
              <button className="faq-page__tab-arrow" type="button" aria-label="下一個分類" onClick={() => changeCategory(active + 1)}><ChevronRight size={20} /></button>
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
