import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './HeroSection.css'
import { asset } from '../../../config/site'
import NextSectionCue from '../../ui/NextSectionCue'

export default function HeroSection() {
  const root = useRef(null)

  useEffect(() => {
    const done = () => window.dispatchEvent(new CustomEvent('hero:intro-complete'))
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      done()
      return undefined
    }

    const context = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power2.inOut' }, onComplete: done })
        .to('.hero__visual', { opacity: 1, duration: 1.3, ease: 'power1.out' })
        .to('.hero__visual img', { scale: 1, filter: 'blur(0px)', duration: 1.9 }, 0)
        .to('.hero__opening', { opacity: 1, y: 0, duration: 1.15 }, 1.05)
        .to({}, { duration: 1.4 })
        .to('.hero__unit--zhai', { xPercent: -55, duration: 2.2, ease: 'power1.inOut' })
        .to('.hero__unit--xin', { xPercent: 55, duration: 2.2, ease: 'power1.inOut' }, '<')
        .to('.hero__opening', { opacity: 0, duration: 0.85 }, '-=0.7')
        .to('.hero__statement', { opacity: 1, y: 0, duration: 1 }, '-=0.1')
    }, root)

    return () => context.revert()
  }, [])

  return (
    <section ref={root} className="hero" aria-label="宅心驗屋首頁主視覺">
      <div className="hero__visual" aria-hidden="true">
        <div className="hero__backdrops">
          <picture>
            <source media="(max-width: 767px)" srcSet={asset('assets/hero-01-new-home-mobile.webp')} />
            <img src={asset('assets/hero-01-new-home-desktop.webp')} alt="" fetchPriority="high" />
          </picture>
          <picture>
            <source media="(max-width: 767px)" srcSet={asset('assets/hero-02-window-mobile.webp')} />
            <img src={asset('assets/hero-02-window-desktop.webp')} alt="" />
          </picture>
          <picture>
            <source media="(max-width: 767px)" srcSet={asset('assets/hero-03-townhouse-mobile.webp')} />
            <img src={asset('assets/hero-03-townhouse-desktop.webp')} alt="" />
          </picture>
        </div>
        <i />
      </div>

      <div className="hero__opening" aria-hidden="true">
        <div className="hero__unit hero__unit--zhai">
          <img src={asset('hero-zhai.svg')} alt="" />
        </div>
        <div className="hero__unit hero__unit--xin">
          <img src={asset('hero-xin.svg')} alt="" />
        </div>
      </div>

      <h1 className="hero__statement">比你更在乎，<span>家的細節。</span></h1>

      <NextSectionCue target="inspection-value" label="驗屋能幫你什麼" tone="dark" />
    </section>
  )
}
