import { Link } from 'react-router-dom'
import { Home, MessageCircle } from 'lucide-react'
import Seo from '../components/seo/Seo'
import './NotFoundPage.css'

const LINE_URL = 'https://line.me/R/ti/p/@301thssm'

export default function NotFoundPage() {
  return (
    <>
      <Seo routeKey="not-found" fallback={{
        title: '找不到這個頁面 — 宅心驗屋',
        noindex: true,
      }} />

      <div className="not-found">
        {/* SVG house outline */}
        <div className="not-found__visual" aria-hidden="true">
          <svg
            className="not-found__house"
            viewBox="0 0 240 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Roof */}
            <path
              d="M120 20 L220 100 L20 100 Z"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="500"
              strokeDashoffset="0"
              className="not-found__house-path"
            />
            {/* Body */}
            <rect
              x="50" y="100" width="140" height="90"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinejoin="round"
              fill="none"
              className="not-found__house-path"
            />
            {/* Door */}
            <rect
              x="100" y="145" width="40" height="45"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
              fill="none"
              className="not-found__house-path"
            />
          </svg>

          {/* Ping rings */}
          <span className="not-found__ping" />
          <span className="not-found__ping not-found__ping--2" />

          <div className="not-found__404" aria-hidden="true">404</div>
        </div>

        <div className="not-found__content">
          <h1 className="not-found__title">這個頁面，我們找不到。</h1>
          <p className="not-found__desc">
            就像驗屋時有些地方需要仔細尋找——<br />
            這個頁面可能已移動、或從未存在過。
          </p>

          <div className="not-found__actions">
            <Link to="/" className="btn btn-primary">
              <Home size={18} />
              回到首頁
            </Link>
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <MessageCircle size={18} />
              透過 LINE 告訴我們
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
