import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { asset } from '../../../config/site'
import NextSectionCue from '../../ui/NextSectionCue'
import './ServiceTypesSection.css'

const HOUSE_TYPES = [
  { title: '新成屋', to: '/services/new-home', image: 'assets/home-sections/new-home-v1.webp' },
  { title: '中古屋', to: '/services/used-home', image: 'assets/home-sections/used-home-v1.webp' },
  { title: '透天別墅', to: '/services/townhouse', image: 'assets/home-sections/townhouse-v1.webp' },
]

const SERVICE_ITEMS = [
  { title: '專業驗屋', to: '/services/inspection', image: 'assets/story/handover-03-inspection.webp' },
  { title: '全屋整裝', to: '/services/renovation', image: 'assets/home-new-space-v1.webp' },
]

function SelectionSection({ id, title, items, nextTarget, nextLabel, tone = 'base' }) {
  return (
    <section id={id} className={`service-selection service-selection--${tone} section home-section home-section--immersive`}>
      <div className="container service-selection__container">
        <header className="service-types__header" data-reveal>
          <h2 className="text-h2 service-types__title">{title}</h2>
        </header>
        <div className="service-selection__grid" data-stagger style={{ '--card-count': items.length }}>
          {items.map((item) => (
            <Link key={item.title} to={item.to} className="service-selection__card">
              <img src={asset(item.image)} alt={`${item.title}服務示意`} loading="lazy" />
              <span className="service-selection__filter" aria-hidden="true" />
              <strong>{item.title}</strong>
              <span className="service-selection__arrow"><ArrowUpRight size={18} /></span>
            </Link>
          ))}
        </div>
      </div>
      <NextSectionCue target={nextTarget} label={nextLabel} tone="light" />
    </section>
  )
}

export default function ServiceTypesSection() {
  return (
    <Fragment>
      <SelectionSection id="home-house-types" title="驗屋類型" items={HOUSE_TYPES} nextTarget="home-service-types" nextLabel="查看其他服務" tone="base" />
      <SelectionSection id="home-service-types" title="服務項目" items={SERVICE_ITEMS} nextTarget="home-reviews" nextLabel="看看屋主怎麼說" tone="subtle" />
    </Fragment>
  )
}