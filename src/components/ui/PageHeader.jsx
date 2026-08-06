import './PageHeader.css'

export default function PageHeader({ title, desc, image, mobileImage }) {
  return (
    <header className={`page-header${image ? ' page-header--media' : ''}`}>
      {image && (
        <picture className="page-header__media" aria-hidden="true">
          {mobileImage && <source media="(max-width: 767px)" srcSet={mobileImage} />}
          <img src={image} alt="" />
        </picture>
      )}
      {image && <span className="page-header__scrim" aria-hidden="true" />}
      <div className="container page-header__inner">
        <h1 className="page-header__title">{title}</h1>
        {desc && <p className="page-header__desc">{desc}</p>}
      </div>
    </header>
  )
}