import { useRef } from 'react'
import { Check, X } from 'lucide-react'
import Seo from '../../seo/Seo'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import BannerHero from '../../ui/BannerHero'
import FaqAccordion from '../../ui/FaqAccordion'
import CtaBannerSection from '../home/CtaBannerSection'
import './HouseTypeTemplate.css'

function CompareValue({ value }) {
  if (typeof value === 'string' && (value.startsWith('✓') || value.startsWith('✗'))) {
    const yes = value.startsWith('✓')
    const rest = value.slice(1).trim()
    const Icon = yes ? Check : X
    return (
      <span className="ht-compare__cell">
        <Icon size={16} strokeWidth={2.5}
          className={yes ? 'ht-compare__yes' : 'ht-compare__no'}
          aria-label={yes ? '有' : '無'} />
        {rest && <span>{rest}</span>}
      </span>
    )
  }
  return value
}

export default function HouseTypeTemplate({ config }) {
  const pageRef = useRef(null)
  useScrollReveal(pageRef)

  const { seo, banner, header, intro, compare, faq, cases } = config

  return (
    <div ref={pageRef}>
      {seo && <Seo routeKey={config.routeKey} fallback={seo} />}

      <BannerHero
        desktop={banner?.desktop}
        mobile={banner?.mobile}
        eyebrow={header.eyebrow}
        title={header.title}
        desc={header.desc}
        scrollTo="ht-cases"
      />

      {/* ① 案例分享 */}
      {cases && (
        <section id="ht-cases" className="ht-cases bg-base section">
          <div className="container">
            <div className="ht-section-head" data-reveal>
              <p className="text-label ht-label">{cases.label}</p>
              <h2 className="text-h2">{cases.title}</h2>
              {cases.sub && <p className="ht-sub">{cases.sub}</p>}
            </div>
            <div className="ht-cases__grid" data-stagger>
              {cases.items.map((c) => (
                <article key={c.title} className="ht-case-card">
                  <div className="ht-case-card__img">
                    <img src={c.img} alt={c.title} loading="lazy"
                      onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement.classList.add('is-empty') }} />
                    {c.tag && <span className="ht-case-card__tag">{c.tag}</span>}
                  </div>
                  <div className="ht-case-card__body">
                    <p className="ht-case-card__meta">{c.meta}</p>
                    <h3 className="ht-case-card__title">{c.title}</h3>
                    <p className="ht-case-card__desc">{c.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ② 房型檢測重點 */}
      {intro && (
        <section className="ht-intro bg-subtle section">
          <div className="container">
            <div className="ht-section-head" data-reveal>
              <p className="text-label ht-label">{intro.label}</p>
              <h2 className="text-h2">{intro.title}</h2>
              {intro.sub && <p className="ht-sub">{intro.sub}</p>}
            </div>
            <div className="ht-intro__grid" data-stagger>
              {intro.items.map((d) => {
                const Icon = d.icon
                return (
                  <div key={d.label} className="ht-intro-card">
                    <div className="ht-intro-card__icon"><Icon size={22} strokeWidth={1.5} /></div>
                    <div>
                      <p className="ht-intro-card__label">{d.label}</p>
                      <p className="ht-intro-card__desc">{d.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ③ 方案比較 */}
      {compare && (
        <section className="ht-compare bg-base section">
          <div className="container">
            <div className="ht-section-head ht-section-head--center" data-reveal>
              <p className="text-label ht-label">{compare.label}</p>
              <h2 className="text-h2">{compare.title}</h2>
              {compare.sub && <p className="ht-sub">{compare.sub}</p>}
            </div>
            {compare.tables.map((tb, ti) => (
              <div key={ti} className="ht-compare__wrap" data-reveal>
                {tb.caption && <h3 className="ht-compare__caption text-h4">{tb.caption}</h3>}
                <div className="ht-compare__scroll">
                  <table className="ht-compare__table">
                    <thead>
                      <tr>
                        <th className="ht-compare__corner" aria-hidden="true"></th>
                        {tb.columns.map((c, ci) => (
                          <th key={ci} className={ci === tb.highlight ? 'is-highlight' : ''}>
                            {ci === tb.highlight && tb.badge && (
                              <span className="ht-compare__badge">{tb.badge}</span>
                            )}
                            {c}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {tb.rows.map((r, ri) => (
                        <tr key={ri}>
                          <th scope="row">{r.label}</th>
                          {r.values.map((v, vi) => (
                            <td key={vi} className={vi === tb.highlight ? 'is-highlight' : ''}>
                              <CompareValue value={v} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
            {compare.note && <p className="ht-compare__note">{compare.note}</p>}
          </div>
        </section>
      )}

      {/* ④ 常見問題 */}
      {faq && (
        <section className="ht-faq bg-subtle section">
          <div className="container">
            <div className="ht-faq__inner">
              <div className="ht-section-head" data-reveal>
                <p className="text-label ht-label">常見問題</p>
                <h2 className="text-h2">{faq.title}</h2>
              </div>
              <div className="ht-faq__accordion" data-reveal>
                <FaqAccordion items={faq.items} />
              </div>
            </div>
          </div>
        </section>
      )}

      <CtaBannerSection />
    </div>
  )
}
