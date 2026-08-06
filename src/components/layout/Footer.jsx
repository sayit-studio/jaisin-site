import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import './Footer.css'
import { asset } from '../../config/site'

const LINE_URL = 'https://line.me/R/ti/p/@301thssm'
const IG_URL = 'https://www.instagram.com/p/DRTvOOPEh9B/'
const FB_URL = 'https://www.facebook.com/js0971866797/?locale=zh_TW'

export default function Footer() {
  return (
    <footer id="site-footer" className="footer">
      <div className="container footer__main">
        <Link to="/" className="footer__logo" aria-label="宅心驗屋 首頁">
          <img src={asset('assets/logo/brand-mark.png')} alt="" className="footer__logo-mark" aria-hidden="true" />
          <span className="footer__logo-text">宅心驗屋</span>
        </Link>

        <div className="footer__message">
          <h2><span className="footer__message-line">為你把關每個細節</span></h2>
        </div>

        <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="footer__cta">
          <MessageCircle size={20} />
          LINE 免費諮詢
        </a>

        <nav className="footer__links" aria-label="頁尾導覽">
          <Link to="/about">關於宅心</Link>
          <Link to="/faq">常見問題</Link>
          <Link to="/privacy">隱私政策</Link>
        </nav>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span>© 2026 宅心驗屋</span>
          <div className="footer__socials">
            <a href={IG_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
            <a href={FB_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  )
}