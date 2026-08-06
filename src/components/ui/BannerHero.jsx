import { ChevronDown } from 'lucide-react'
import './BannerHero.css'

/**
 * Responsive banner hero for service / house-type pages.
 * Desktop + mobile image via <picture>; falls back to a navy gradient
 * with the overlay text if images are missing.
 */
export default function BannerHero({
  desktop,
  mobile,
  eyebrow,
  title,
  desc,
  scrollTo,
}) {
  const handleScroll = () => {
    if (!scrollTo) return
    document.getElementById(scrollTo)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="banner-hero">
      <div className="banner-hero__media">
        {desktop && (
          <picture>
            {mobile && <source media="(max-width: 767px)" srcSet={mobile} />}
            <img
              src={desktop}
              alt=""
              className="banner-hero__img"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
          </picture>
        )}
        <span className="banner-hero__scrim" aria-hidden="true" />
      </div>

      <div className="container banner-hero__inner">
        <div className="banner-hero__content">
          {eyebrow && <p className="text-label banner-hero__eyebrow">{eyebrow}</p>}
          <h1 className="banner-hero__title">{title}</h1>
          {desc && <p className="banner-hero__desc">{desc}</p>}
        </div>
      </div>

      {scrollTo && (
        <button type="button" className="banner-hero__scroll" onClick={handleScroll} aria-label="往下看內容">
          <ChevronDown size={22} />
        </button>
      )}
    </section>
  )
}
