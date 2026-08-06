import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../../seo/Seo'
import { ArrowRight } from 'lucide-react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import BannerHero from '../../ui/BannerHero'
import BeforeAfterReveal from '../../ui/BeforeAfterReveal'
import CtaBannerSection from '../home/CtaBannerSection'
import './ServiceTemplate.css'

export default function ServiceTemplate({ config }) {
  const pageRef = useRef(null)
  useScrollReveal(pageRef)

  const { seo, banner, header, points, flow, report, houseLinks } = config

  return (
    <div ref={pageRef}>
      {seo && <Seo routeKey={config.routeKey} fallback={seo} />}

      <BannerHero
        desktop={banner?.desktop}
        mobile={banner?.mobile}
        eyebrow={header.eyebrow}
        title={header.title}
        desc={header.desc}
        scrollTo="sv-points"
      />

      {/* ① 講解重點 */}
      {points && (
        <section id="sv-points" className="sv-points bg-base section">
          <div className="container">
            <div className="sv-head" data-reveal>
              <p className="text-label sv-label">{points.label}</p>
              <h2 className="text-h2">{points.title}</h2>
              {points.sub && <p className="sv-sub">{points.sub}</p>}
            </div>
            <div className="sv-points__grid" data-stagger>
              {points.items.map((p) => {
                const Icon = p.icon
                return (
                  <div key={p.label} className="sv-point-card">
                    <div className="sv-point-card__icon"><Icon size={24} strokeWidth={1.5} /></div>
                    <h3 className="sv-point-card__label text-h4">{p.label}</h3>
                    <p className="sv-point-card__desc">{p.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ② 驗屋流程 */}
      {flow && (
        <section className="sv-flow bg-subtle section">
          <div className="container">
            <div className="sv-head sv-head--center" data-reveal>
              <p className="text-label sv-label">{flow.label}</p>
              <h2 className="text-h2">{flow.title}</h2>
            </div>
            <div className="sv-flow__grid" data-stagger>
              {flow.items.map((s) => (
                <div key={s.num} className="sv-flow-step">
                  <span className="sv-flow-step__num text-number">{s.num}</span>
                  <h3 className="sv-flow-step__title text-h4">{s.title}</h3>
                  <p className="sv-flow-step__desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ③ 驗屋報告（保留 Before/After 滑桿） */}
      {report && (
        <section className="sv-report bg-base section">
          <div className="container">
            <div className="sv-report__inner">
              <div className="sv-report__text" data-reveal>
                <p className="text-label sv-label">{report.label}</p>
                <h2 className="text-h2" dangerouslySetInnerHTML={{ __html: report.title }} />
                <p className="sv-report__desc">{report.desc}</p>
                {report.list && (
                  <ul className="sv-report__list">
                    {report.list.map((li) => <li key={li}>{li}</li>)}
                  </ul>
                )}
              </div>
              <div className="sv-report__media" data-reveal>
                {report.reveal ? (
                  <div className="sv-report__slider">
                    <BeforeAfterReveal
                      beforeSrc={report.reveal.beforeSrc}
                      afterSrc={report.reveal.afterSrc}
                      beforeLabel={report.reveal.beforeLabel}
                      afterLabel={report.reveal.afterLabel}
                      beforeAlt={report.reveal.beforeAlt}
                      afterAlt={report.reveal.afterAlt}
                    />
                  </div>
                ) : (
                  <div className="sv-report__img">
                    <img src={report.img} alt={report.imgAlt} loading="lazy"
                      onError={(e) => { e.currentTarget.style.visibility = 'hidden' }} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ④ 依房型選擇（僅總覽頁） */}
      {houseLinks && (
        <section className="sv-types bg-subtle section">
          <div className="container">
            <div className="sv-head sv-head--center" data-reveal>
              <p className="text-label sv-label">{houseLinks.label}</p>
              <h2 className="text-h2">{houseLinks.title}</h2>
            </div>
            <div className="sv-types__grid" data-stagger>
              {houseLinks.items.map((t) => {
                const Icon = t.icon
                return (
                  <Link key={t.to} to={t.to} className="sv-type-card">
                    <div className="sv-type-card__media">
                      {t.img && (
                        <img src={t.img} alt={t.title} loading="lazy"
                          onError={(e) => { e.currentTarget.style.display = 'none' }} />
                      )}
                      {Icon && (
                        <span className="sv-type-card__icon"><Icon size={28} strokeWidth={1.5} /></span>
                      )}
                    </div>
                    <div className="sv-type-card__overlay">
                      <h3 className="sv-type-card__title text-h4">{t.title}</h3>
                      <p className="sv-type-card__desc">{t.desc}</p>
                      <span className="sv-type-card__arrow">了解更多 <ArrowRight size={16} /></span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <CtaBannerSection />
    </div>
  )
}
