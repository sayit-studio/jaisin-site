import { MessageCircle } from 'lucide-react'
import './CtaBannerSection.css'

const LINE_URL = 'https://line.me/R/ti/p/@301thssm'

export default function CtaBannerSection() {
  return (
    <section id="home-final-cta" className="cta-banner bg-dark section home-section home-section--immersive">
      <div className="container">
        <div className="cta-banner__inner">
          <div className="cta-banner__text">
            <p className="text-label cta-banner__label">立即開始</p>
            <h2 className="cta-banner__title">
              準備好讓宅心<br />幫你把關了嗎？
            </h2>
            <p className="cta-banner__desc">
              透過 LINE 告訴我們物件地址與交屋時程，<br />
              我們協助評估排程並提供報價參考。
            </p>
          </div>

          <div className="cta-banner__actions">
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary cta-banner__btn"
            >
              <MessageCircle size={20} />
              LINE 立即諮詢
            </a>
            <p className="cta-banner__note">
              驗屋報價依物件條件、坪數、地區個別估算
            </p>
          </div>
        </div>

        {/* Decorative ping rings */}
        <div className="cta-banner__deco" aria-hidden="true">
          <span className="cta-ping" />
          <span className="cta-ping ping-delay-1" />
          <span className="cta-ping ping-delay-2" />
        </div>
      </div>
    </section>
  )
}
