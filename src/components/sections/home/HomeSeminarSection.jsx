import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays, CircleHelp, ClipboardCheck } from 'lucide-react'
import { asset } from '../../../config/site'
import NextSectionCue from '../../ui/NextSectionCue'
import './HomeSeminarSection.css'

export default function HomeSeminarSection() {
  return (
    <section id="home-seminar" className="home-seminar bg-subtle section home-section home-section--immersive">
      <div className="container home-seminar__container">
        <header className="home-seminar__header" data-reveal>
          <h2 className="text-h2 home-seminar__title">第一次驗屋，也能先做好準備</h2>
        </header>
        <div className="home-seminar__feature" data-reveal>
          <div className="home-seminar__visual">
            <img src={asset('assets/home-sections/seminar-v1.webp')} alt="宅心驗屋說明會現場" loading="lazy" />
            <span className="home-seminar__date"><CalendarDays size={18} /> 驗屋說明會</span>
          </div>
          <div className="home-seminar__content">
            <h3>交屋前，把不確定先問清楚</h3>
            <div className="home-seminar__points">
              <span><CircleHelp size={19} />了解驗屋重點</span>
              <span><ClipboardCheck size={19} />掌握交屋準備</span>
            </div>
            <Link to="/seminar" className="home-seminar__link">查看近期場次 <ArrowRight size={18} /></Link>
          </div>
        </div>
      </div>
      <NextSectionCue target="home-house-types" label="查看驗屋類型" tone="light" />
    </section>
  )
}