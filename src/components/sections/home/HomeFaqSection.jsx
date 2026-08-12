import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle } from 'lucide-react'
import FaqAccordion from '../../ui/FaqAccordion'
import './HomeFaqSection.css'
import NextSectionCue from '../../ui/NextSectionCue'

// 首頁僅顯示精選 5 題，完整題庫於 /faq
const FAQS = [
  {
    q: '驗屋大概需要多久時間？',
    a: '依物件大小不同，一般新成屋約需 2 至 4 小時，中古屋視屋況與坪數可能需要 3 至 5 小時。社區團購則依戶數另行排程。如需更精確的時間評估，歡迎透過 LINE 提供物件資訊讓我們幫您確認。',
  },
  {
    q: '驗屋是交屋前還是交屋後來？',
    a: '新成屋建議在正式交屋點交前安排驗屋，如此發現缺失可在點交當下與建商確認，保有較完整的交涉空間。若已完成點交，也仍可安排驗屋，協助您釐清保固責任範圍。',
  },
  {
    q: '建商說有保固期，還需要額外驗屋嗎？',
    a: '保固期是法定保障，但保固的前提是「缺失有被記錄」。交屋時若沒有完整的缺失清單，後續申請保固修繕可能面臨建商質疑是否為使用所致。驗屋報告可作為你在保固申請時的依據，讓交涉過程更有說服力。',
  },
  {
    q: '報告會在驗屋後多久提供？',
    a: '驗屋日隔天起算，五個工作天內提供完整報告。報告提供方式為電子檔（PDF），視需求可加印紙本。',
  },
  {
    q: '驗屋費用是怎麼計算的？',
    a: '驗屋報價依物件條件、坪數與地區個別估算。請透過 LINE 提供物件資訊，我們會盡快回覆報價參考。',
  },
]

export default function HomeFaqSection() {
  return (
    <section id="home-faq" className="home-faq bg-base section home-section home-section--reading">
      <div className="container">
        <div className="home-faq__inner">
          <div className="home-faq__header">
            <h2 className="text-h2 home-faq__title">預約之前，你可能還想知道</h2>
            <p className="home-faq__sub">
              還有其他疑問？歡迎透過 LINE 直接詢問，我們通常在一個工作日內回覆。
            </p>
          </div>

          <div className="home-faq__accordion">
            <FaqAccordion items={FAQS} />
            <Link to="/faq" className="home-faq__more">
              看更多常見問題 <ArrowRight size={16} />
            </Link>
            <a className="home-faq__mobile-note" href="https://line.me/R/ti/p/@301thssm" target="_blank" rel="noopener noreferrer"><MessageCircle size={17} />還有其他疑問？加入 LINE 詢問</a>
          </div>
        </div>
      </div>
      <NextSectionCue target="site-footer" label="讓期待安心落地" tone="light" />
    </section>
  )
}
