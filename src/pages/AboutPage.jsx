import { useRef } from 'react'
import { ExternalLink, Play } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useCmsData } from '../hooks/useCmsData'
import Seo from '../components/seo/Seo'
import PageHeader from '../components/ui/PageHeader'
import CtaBannerSection from '../components/sections/home/CtaBannerSection'
import LogoLoop from '../components/ui/LogoLoop'
import '../components/sections/home/MediaSection.css'
import './AboutPage.css'
import { asset } from '../config/site'

const MEDIA = [
  {
    id: 'ttv',
    outlet: '台視新聞',
    type: 'video',
    href: 'https://youtu.be/hX7_YSvLgNw',
    youtubeId: 'hX7_YSvLgNw',
    quote: '專業儀器揭露交屋缺失，驗屋師幫屋主把關每個細節',
    logo: asset('assets/media/media-logo-ttv.png'),
  },
  {
    id: 'nownews',
    outlet: 'NOWnews 今日新聞',
    type: 'article',
    href: 'https://www.nownews.com/amp/news/6412989',
    quote: '交屋前驗屋成新趨勢，專業服務協助屋主建立交涉依據',
    logo: asset('assets/media/media-logo-nownews.png'),
  },
  {
    id: 'ctee',
    outlet: '工商時報',
    type: 'article',
    href: 'https://www.ctee.com.tw/news/20240424700659-430601',
    quote: '驗屋市場需求升溫，專業服務成購屋族新選擇',
    logo: asset('assets/media/media-logo-ctee.png'),
  },
  {
    id: 'ettoday',
    outlet: 'ETtoday 房產雲',
    type: 'article',
    href: 'https://house.ettoday.net/news/2726738',
    quote: '新成屋缺失不少見，驗屋師：窗框防水是最常見問題',
    logo: asset('assets/media/media-logo-ettoday.png'),
  },
]

const SHOW_TEAM = false

const TEAM = [
  {
    name: '謝育欣',
    role: '驗屋顧問 / 現場負責人',
    bio: '從建築工程背景出發，在台中深耕驗屋服務逾七年。相信每一個發現，都是幫屋主爭取一點點安心的空間。',
    photo: asset('assets/team/inspector-main-sample.png'),
    tags: ['熱顯像檢測', '窗框防水', '新成屋缺失記錄'],
  },
  {
    name: '林承翰',
    role: '現場驗屋師',
    bio: '土木背景出身，對泄水坡度與管線走向特別敏銳。每份報告裡的每一條線，都是幫屋主說清楚的依據。',
    photo: asset('assets/team/inspector-sub-sample.png'),
    tags: ['屋況判讀', '排水系統', '中古屋屋況評估'],
  },
  {
    name: '陳志遠',
    role: '現場驗屋師',
    bio: '具備室內裝修工程背景，熟悉建材材質與施工品質判讀。擅長針對磁磚空鼓與龜裂進行系統性評估，讓問題有所依據。',
    photo: null,
    tags: ['磁磚空鼓', '室內裝修判讀', '新成屋缺失'],
  },
  {
    name: '黃雅婷',
    role: '驗屋助理 / 報告撰寫',
    bio: '負責現場記錄與報告彙整，確保每一條缺失都有清楚的圖文依據。讓屋主拿到報告的第一時間就能看懂、用得上。',
    photo: null,
    tags: ['現場記錄', '報告撰寫', '客服溝通'],
  },
]

const STATS_FALLBACK = [
  { value: '130+', label: '服務社區' },
  { value: '50+',  label: '品牌建商' },
  { value: '8+',   label: '服務縣市' },
]

export default function AboutPage() {
  const pageRef = useRef(null)
  useScrollReveal(pageRef)
  const STATS = useCmsData('/api/content/trust?locale=zh') ?? STATS_FALLBACK
  return (
    <div ref={pageRef}>
      <Seo routeKey="about" fallback={{
        title: '關於宅心驗屋｜品牌理念與服務實績',
        description: '130+ 服務社區、50+ 品牌建商、8+ 服務縣市。宅心驗屋以把關細節為核心，協助屋主建立交屋交涉依據，守護每個家最初的樣子。',
        ogImage: asset('assets/og/og-about.jpg'),
      }} />

      <PageHeader
        title="家，值得被好好對待"
        desc="宅心用專業陪你顧好，交屋這一路的每個細節"
        image={asset('assets/banners/about-desktop.webp')}
        mobileImage={asset('assets/banners/about-mobile.webp')}
      />

      {/* 品牌理念 */}
      <section className="about-mission bg-base">
        <div className="container about-mission__container">
          <div className="about-mission__inner">
            <div className="about-mission__text">
              <h2 className="text-h2">每一個發現，都是安心的依據</h2>
              <p className="about-mission__desc">
                買房是很多人一生最大的決定。但在興奮與期待之中，很少人有足夠的知識和工具去確認那個家的真實狀態。
              </p>
              <p className="about-mission__desc">
                宅心的存在，就是要填補這個落差。我們不只是找缺失，而是幫你把看不見的風險說清楚，讓你在做決定的時候，有所依據而不是只靠感覺。
              </p>
            </div>
            <div className="about-mission__stats">
              {STATS.map((s) => (
                <div key={s.label} className="about-stat">
                  <span className="about-stat__value text-number">{s.value}</span>
                  <span className="about-stat__label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 服務足跡 Logo Loop */}
      <LogoLoop />

      {/* 驗屋師團隊（暫時隱藏：改回 true 即可恢復） */}
      {SHOW_TEAM && (
      <section className="about-team bg-subtle">
        <div className="container about-team__container">
          <h2 className="text-h2 about-section-title">專業團隊，為家把關</h2>
          <div className="about-team__grid" data-stagger>
            {TEAM.map((m, i) => (
              <div key={i} className="inspector-card">
                <div className="inspector-card__photo">
                  {m.photo
                    ? <img src={m.photo} alt={`${m.name} 示意照`} loading="lazy" />
                    : <span className="inspector-card__photo-placeholder" />}
                </div>
                <div className="inspector-card__body">
                  <div>
                    <h3 className="inspector-card__name">{m.name}</h3>
                    <p className="inspector-card__role">{m.role}</p>
                  </div>
                  <p className="inspector-card__bio">{m.bio}</p>
                  <div className="inspector-card__tags">
                    {m.tags.map((t) => <span key={t} className="badge badge-navy">{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* 媒體報導 */}
      <section className="about-media bg-base">
        <div className="container about-media__container">
          <h2 className="text-h2 about-section-title">各大媒體的認可</h2>
          <div className="about-media__grid" data-stagger>
            {MEDIA.map((m) => (
              <a
                key={m.id}
                href={m.href}
                target="_blank"
                rel="noopener noreferrer"
                className="media-card"
              >
                {m.type === 'video' && (
                  <div className="media-card__thumb">
                    <img
                      src={`https://img.youtube.com/vi/${m.youtubeId}/mqdefault.jpg`}
                      alt={`${m.outlet} 採訪影片`}
                      loading="lazy"
                    />
                    <span className="media-card__play"><Play size={20} fill="currentColor" /></span>
                  </div>
                )}
                <div className="media-card__body">
                  <div className="media-card__logo-wrap">
                    <img src={m.logo} alt={m.outlet} className="media-card__logo"
                      onError={(e) => { e.currentTarget.style.display = 'none' }} />
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

      <CtaBannerSection />
    </div>
  )
}
