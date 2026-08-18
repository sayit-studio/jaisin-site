import { useEffect, useRef, useState } from 'react'
import { MessageCircle, CalendarCheck, ScanLine, FileText, HeadphonesIcon, ArrowRight } from 'lucide-react'
import { asset } from '../../../config/site'
import './HowWeWorkSection.css'
import NextSectionCue from '../../ui/NextSectionCue'

const SCENES = [
  {
    icon: MessageCircle,
    text: '告訴我們房屋資訊',
    image: 'assets/story/handover-01-home.webp',
    alt: '明亮整潔的新家空間',
  },
  {
    icon: CalendarCheck,
    text: '宅心安排驗屋師到場',
    image: 'assets/story/handover-02-arrival.webp',
    alt: '宅心驗屋師準備進行檢測',
  },
  {
    icon: ScanLine,
    text: '完成 100 多項專業檢測',
    image: 'assets/story/handover-03-inspection.webp',
    alt: '使用專業儀器進行房屋檢測',
    highlight: true,
  },
  {
    icon: FileText,
    text: '將問題整理成完整報告',
    image: 'assets/story/handover-04-report-v2.webp',
    alt: '驗屋報告內容示意',
  },
  {
    icon: HeadphonesIcon,
    text: '陪你確認交屋前的下一步',
    image: 'assets/story/handover-05-next-step.webp',
    alt: '窗外視野遼闊的新家',
  },
]

export default function HowWeWorkSection() {
  const rootRef = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const section = rootRef.current
    if (!section) return undefined

    const onPagerStep = (event) => {
      const next = active + event.detail.direction
      if (next < 0 || next >= SCENES.length) return
      event.preventDefault()
      setActive(next)
    }

    section.addEventListener('home:pager-step', onPagerStep)
    return () => section.removeEventListener('home:pager-step', onPagerStep)
  }, [active])

  const progress = active / (SCENES.length - 1)

  return (
    <section
      ref={rootRef}
      id="inspection-process"
      data-pager-steps
      className="how-we-work bg-subtle section home-section home-section--immersive"
    >
      <div className="container story">
        <div className="how-we-work__header">
          <h2 className="text-h2 how-we-work__title">交屋前，宅心為你把關</h2>
        </div>

        <div className="story__stage" aria-live="polite">
          <svg className="story__path" viewBox="0 0 1000 420" preserveAspectRatio="none" aria-hidden="true">
            <path className="story__path-base" d="M40 330 C210 80 370 360 520 165 S790 50 960 255" />
            <path
              className="story__path-progress"
              pathLength="1"
              d="M40 330 C210 80 370 360 520 165 S790 50 960 255"
              style={{ strokeDashoffset: 1 - progress }}
            />
          </svg>

          <div className="story__images" aria-hidden="true">
            {SCENES.map((scene, index) => (
              <figure
                key={`${scene.text}-image`}
                className={`story-image story-image--${index + 1}${index === active ? ' is-active' : ''}${index < active ? ' is-past' : ''}`}
              >
                <img src={asset(scene.image)} alt="" loading={index === 0 ? 'eager' : 'lazy'} />
              </figure>
            ))}
          </div>

          <ol className="story__copy">
            {SCENES.map(({ icon: Icon, text, highlight }, index) => (
              <li
                key={text}
                className={`story-copy${index === active ? ' is-active' : ''}${highlight ? ' story-copy--highlight' : ''}`}
                aria-hidden={index !== active}
              >
                <span className="story-copy__icon"><Icon size={22} strokeWidth={1.5} /></span>
                <p>
                  {highlight ? <><mark>100 多項</mark>專業檢測</> : text}
                </p>
              </li>
            ))}
          </ol>

          {active < SCENES.length - 1 && (
            <button
              type="button"
              className="story__next"
              onClick={() => setActive((step) => Math.min(step + 1, SCENES.length - 1))}
              aria-label="查看下一個驗屋流程"
            >
              <ArrowRight size={22} strokeWidth={1.6} />
            </button>
          )}

          <div className="story__progress" aria-label={`流程第 ${active + 1} 步，共 ${SCENES.length} 步`}>
            {SCENES.map((scene, index) => (
              <button
                key={scene.text}
                type="button"
                className={index === active ? 'is-active' : ''}
                onClick={() => setActive(index)}
                aria-label={`查看：${scene.text}`}
              />
            ))}
          </div>
        </div>
      </div>
      <NextSectionCue
        target="report-value"
        label={active === SCENES.length - 1 ? '你會得到什麼' : '繼續了解'}
        tone="light"
      />
    </section>
  )
}
