import { useEffect, useRef, useState } from 'react'
import { Star } from 'lucide-react'
import { useCmsData } from '../../../hooks/useCmsData'
import './ReviewsSection.css'
import { asset } from '../../../config/site'
import NextSectionCue from '../../ui/NextSectionCue'

const REVIEWS_FALLBACK = [
  {
    name: '陳先生',
    meta: '台中西屯・新成屋',
    text: '交屋前請宅心來驗，光是窗框防水就找出三個明顯問題。報告出來後跟建商談修繕，有憑有據，建商也沒辦法打馬虎眼。非常值得。',
  },
  {
    name: '林小姐',
    meta: '台中北屯・中古屋',
    text: '看中古屋時請宅心先幫忙驗，發現天花板漏水痕跡和排水不順的問題。靠這份報告議了價，省下來的錢遠超過驗屋費用。',
  },
  {
    name: '黃先生',
    meta: '社區管委籌備・30 戶團購',
    text: '我們社區三十戶集體團購，宅心的安排很有效率，每一戶的報告都很完整。幾個公設缺失也記錄進去，後來跟建商交涉有很明確的依據。',
  },
  {
    name: '王太太',
    meta: '桃園・新成屋首購',
    text: '第一次買房，什麼都不懂。驗屋當天師傅一邊檢測一邊解釋，當天解說完全沒有聽不懂的地方。對我這個新手來說非常友善。',
  },
  {
    name: '張先生',
    meta: '台中南屯・透天別墅',
    text: '透天三層樓，自己根本不知道怎麼看。師傅從頂樓防水一路檢查到一樓管線，連牆面滲水都用熱顯像找出來，很細心。',
  },
  {
    name: '吳小姐',
    meta: '新竹竹北・新成屋',
    text: '報告是 PDF，缺失照片加上位置標記，我直接轉給建商，溝通起來省事很多。專業度跟效率都讓人放心。',
  },
]

const REVIEW_PHOTOS = [
  ['assets/reviews/records/review-new-home-window-v1.webp'],
  ['assets/reviews/records/review-used-home-moisture-v1.webp'],
  ['assets/reviews/records/review-community-group-v1.webp'],
  ['assets/reviews/records/review-first-buyer-v1.webp'],
  ['assets/reviews/records/review-townhouse-roof-v1.webp'],
  ['assets/reviews/records/review-report-handover-v1.webp'],
]
const AVATAR_COLORS = ['#6f52b5','#287f8e','#b35d45','#3973a8','#a36b18','#4f8060']

function Stars() {
  return (
    <div className="review-stars" aria-label="五星評價">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} fill="#FFD35A" color="#FFD35A" />
      ))}
    </div>
  )
}

function ReviewCard({ r }) {
  return (
    <div className="review-card">
      <Stars />
      <p className="review-card__text">「{r.text}」</p>
      {r.photos?.length > 0 && (
        <div className="review-card__photos" aria-label="服務紀錄照片">
          {r.photos.map((photo, index) => (
            <img key={photo} src={photo} alt={`服務紀錄 ${index + 1}`} loading="lazy" />
          ))}
        </div>
      )}
      <div className="review-card__author">
        <div className="review-card__avatar" style={{ '--avatar-color': r.avatarColor }} aria-hidden="true">
          {r.name?.trim().charAt(0) || '屋'}
        </div>
        <div>
          <p className="review-card__name">{r.name}</p>
          <p className="review-card__meta">{r.meta}</p>
        </div>
      </div>
    </div>
  )
}

function MarqueeRow({ items, reverse }) {
  const doubled = [...items, ...items]
  return (
    <div className="reviews-marquee">
      <div className={`reviews-marquee__track${reverse ? ' reviews-marquee__track--reverse' : ''}`}>
        {doubled.map((r, i) => <ReviewCard key={i} r={r} />)}
      </div>
    </div>
  )
}

function MobileReviewDeck({ reviews }) {
  const [active, setActive] = useState(0)
  const touchStart = useRef(null)
  const count = reviews.length
  const goNext = () => setActive((current) => (current + 1) % count)
  const goPrevious = () => setActive((current) => (current - 1 + count) % count)

  useEffect(() => {
    if (count < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const timer = window.setInterval(goNext, 3800)
    return () => window.clearInterval(timer)
  }, [count])

  const handleTouchEnd = (event) => {
    if (touchStart.current === null) return
    const distance = event.changedTouches[0].clientX - touchStart.current
    if (Math.abs(distance) > 42) distance < 0 ? goNext() : goPrevious()
    touchStart.current = null
  }

  return (
    <div
      className="reviews-deck"
      onTouchStart={(event) => { touchStart.current = event.touches[0].clientX }}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="評價輪播"
    >
      <span className="reviews-deck__quote" aria-hidden="true">“</span>
      <div className="reviews-deck__cards">
        {reviews.map((review, index) => {
          const offset = (index - active + count) % count
          const layer = offset < 3 ? offset : -1
          return (
            <div key={`${review.name}-${index}`} className={`reviews-deck__card reviews-deck__card--${layer}`} aria-hidden={layer !== 0}>
              <ReviewCard r={review} />
            </div>
          )
        })}
      </div>
      <div className="reviews-deck__progress" aria-label="切換客戶評價">
        {reviews.map((review, index) => (
          <button
            key={`${review.name}-progress`}
            type="button"
            className={index === active ? 'is-active' : ''}
            onClick={() => setActive(index)}
            aria-label={`查看第 ${index + 1} 則評價`}
            aria-current={index === active ? 'true' : undefined}
          />
        ))}
      </div>
    </div>
  )
}

export default function ReviewsSection() {
  // CMS 評價 ?? 原本硬寫；CMS 未帶頭像時補回本機頭像，外觀不變
  const cmsReviews = useCmsData('/api/content/reviews?locale=zh')
  const reviewSource = cmsReviews?.length ? cmsReviews : REVIEWS_FALLBACK
  const REVIEWS = reviewSource.map((r, i) => ({
    ...r,
    avatarColor: AVATAR_COLORS[i % AVATAR_COLORS.length],
    photos: (r.photos?.length ? r.photos : REVIEW_PHOTOS[i % REVIEW_PHOTOS.length]).map((photo) => /^https?:\/\//i.test(photo) ? photo : asset(photo)),
  }))
  const rowA = REVIEWS.slice(0, 3)
  const rowB = REVIEWS.slice(3, 6)

  return (
    <section id="home-reviews" className="reviews-section bg-warm section home-section home-section--immersive">
      <div className="container reviews-section__head">
        <div className="reviews-section__header" data-reveal>
          <h2 className="text-h2 reviews-section__title">每一次檢查，都要經得起後續驗證</h2>
          <p className="reviews-section__sub">真正的專業，是讓屋主在交屋與修繕溝通時，知道問題在哪裡、下一步怎麼處理。</p>
        </div>
      </div>

      <div className="reviews-section__rows">
        <MarqueeRow items={rowA} reverse={false} />
        <MarqueeRow items={rowB} reverse />
      </div>
      <MobileReviewDeck reviews={REVIEWS} />
      <NextSectionCue target="home-faq" label="預約前常見問題" tone="light" />
    </section>
  )
}
