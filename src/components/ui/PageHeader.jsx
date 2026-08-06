import './PageHeader.css'

export default function PageHeader({ eyebrow, title, desc }) {
  return (
    <header className="page-header">
      <div className="container page-header__inner">
        {eyebrow && <p className="text-label page-header__eyebrow">{eyebrow}</p>}
        <h1 className="page-header__title">{title}</h1>
        {desc && <p className="page-header__desc">{desc}</p>}
      </div>
    </header>
  )
}
