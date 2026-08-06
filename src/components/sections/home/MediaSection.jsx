import { ExternalLink, Play } from 'lucide-react'
import './MediaSection.css'
import { asset } from '../../../config/site'

const MEDIA = [
  {
    id: 'ttv',
    outlet: '台視新聞',
    type: 'video',
    href: 'https://youtu.be/hX7_YSvLgNw',
    youtubeId: 'hX7_YSvLgNw',
    quote: '專業儀器揭露交屋缺失，驗屋師幫屋主把關每個細節',
    logo: asset('assets/media/media-logo-ttv.png'),
    logoAlt: '台視新聞',
  },
  {
    id: 'nownews',
    outlet: 'NOWnews 今日新聞',
    type: 'article',
    href: 'https://www.nownews.com/amp/news/6412989',
    image: 'https://media.nownews.com/nn_media/thumbnail/2024/04/1713952115238-1da26de11d09419d83c9dfbe4d723f95-1200x710.webp?unShow=false',
    quote: '交屋前驗屋成新趨勢，專業服務協助屋主建立交涉依據',
    logo: asset('assets/media/media-logo-nownews.png'),
    logoAlt: 'NOWnews 今日新聞',
  },
  {
    id: 'ctee',
    outlet: '工商時報',
    type: 'article',
    href: 'https://www.ctee.com.tw/news/20240424700659-430601',
    image: 'https://images.ctee.com.tw/newsphoto/2024-04-24/1024/20240424700660.jpg',
    quote: '驗屋市場需求升溫，專業服務成購屋族新選擇',
    logo: asset('assets/media/media-logo-ctee.png'),
    logoAlt: '工商時報',
  },
  {
    id: 'ettoday',
    outlet: 'ETtoday 房產雲',
    type: 'article',
    href: 'https://house.ettoday.net/news/2726738',
    image: 'https://cdn2.ettoday.net/images/7542/e7542406.jpg',
    quote: '新成屋缺失不少見，驗屋師：窗框防水是最常見問題',
    logo: asset('assets/media/media-logo-ettoday.png'),
    logoAlt: 'ETtoday 房產雲',
  },
]

export default function MediaSection() {
  return (
    <section className="media-section bg-subtle section">
      <div className="container">
        <div className="media-section__header" data-reveal>
          <p className="text-label media-section__label">媒體報導</p>
          <h2 className="text-h2 media-section__title">產業認證與時事報導</h2>
        </div>

        <div className="media-section__grid" data-stagger>
          {MEDIA.map((m) => (
            <a
              key={m.id}
              href={m.href}
              target="_blank"
              rel="noopener noreferrer"
              className="media-card"
              aria-label={`閱讀 ${m.outlet} 的報導`}
            >
              {(m.type === 'video' || m.image) && (
                <div className="media-card__thumb">
                  <img
                    src={m.type === 'video'
                      ? `https://img.youtube.com/vi/${m.youtubeId}/mqdefault.jpg`
                      : m.image}
                    alt={`${m.outlet} 報導縮圖`}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => { e.currentTarget.parentElement.style.display = 'none' }}
                  />
                  {m.type === 'video' && (
                    <span className="media-card__play">
                      <Play size={20} fill="currentColor" />
                    </span>
                  )}
                </div>
              )}

              <div className="media-card__body">
                <div className="media-card__logo-wrap">
                  <img
                    src={m.logo}
                    alt={m.logoAlt}
                    className="media-card__logo"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                  <span className="media-card__outlet-fallback">{m.outlet}</span>
                </div>
                <p className="media-card__quote">「{m.quote}」</p>
                <span className="media-card__link-hint">
                  {m.type === 'video' ? '觀看影片' : '閱讀報導'} <ExternalLink size={12} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
