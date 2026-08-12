import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import './Navbar.css'
import { asset } from '../../config/site'

const LINE_URL = 'https://line.me/R/ti/p/@301thssm'

const navItems = [
  {
    label: '驗屋類型',
    children: [
      { label: '新成屋驗屋', to: '/services/new-home' },
      { label: '中古屋驗屋', to: '/services/used-home' },
      { label: '透天別墅驗屋', to: '/services/townhouse' },
    ],
  },
  {
    label: '服務項目',
    children: [
      { label: '專業驗屋', to: '/services/inspection' },
      { label: '全屋整裝', to: '/services/renovation' },
    ],
  },
  { label: '社區團購', to: '/services/group' },
  { label: '關於宅心', to: '/about' },
  { label: '驗屋說明會', to: '/seminar' },
  { label: '常見問題', to: '/faq' },
  { label: '合作洽詢', to: '/cooperation' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState(null)
  const [heroReady, setHeroReady] = useState(pathname !== '/')
  const overHero = (pathname === '/' || pathname === '/seminar') && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (pathname !== '/') { setHeroReady(true); return undefined }
    setHeroReady(false)
    const onReady = () => setHeroReady(true)
    window.addEventListener('hero:intro-complete', onReady)
    return () => window.removeEventListener('hero:intro-complete', onReady)
  }, [pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => {
    setMenuOpen(false)
    setOpenGroup(null)
  }

  return (
    <>
      <header className={`navbar${overHero ? ' navbar--over-hero' : ' navbar--scrolled'}${pathname === '/' && !heroReady ? ' navbar--intro-hidden' : ''}${pathname === '/' && !scrolled ? ' navbar--compact-home' : ''}`}>
        <div className="navbar__inner">
          {/* Logo */}
          <Link to="/" className="navbar__logo" onClick={closeMenu} aria-label="宅心驗屋 首頁">
            <img src={asset('assets/logo/brand-mark.png')} alt="" className="navbar__logo-mark" aria-hidden="true" />
            <span className="navbar__logo-text">宅心驗屋</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="navbar__desktop" aria-label="主要導覽">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label} className="navbar__dropdown-wrap">
                  <button
                    className="navbar__link navbar__link--dropdown"
                    aria-haspopup="true"
                  >
                    {item.label}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <div className="navbar__dropdown">
                    {item.children.map((child) => (
                      <NavLink key={child.to} to={child.to} className="navbar__dropdown-item">
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink key={item.to} to={item.to} className="navbar__link">
                  {item.label}
                </NavLink>
              )
            )}
          </nav>

          {/* Desktop CTA */}
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary navbar__cta"
          >
            LINE 諮詢
          </a>

          {/* Mobile Hamburger */}
          <button
            className={`navbar__hamburger${menuOpen ? ' is-open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? '關閉選單' : '開啟選單'}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Mobile Overlay Menu */}
      <div className={`mobile-menu${menuOpen ? ' is-open' : ''}`} aria-hidden={!menuOpen}>
        <nav aria-label="行動版導覽">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label} className="mobile-menu__group">
                <button
                  className="mobile-menu__services-toggle"
                  onClick={() => setOpenGroup((g) => (g === item.label ? null : item.label))}
                  aria-expanded={openGroup === item.label}
                >
                  {item.label}
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true"
                    style={{ transform: openGroup === item.label ? 'rotate(180deg)' : 'rotate(0)', transition: '300ms' }}>
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {openGroup === item.label && (
                  <div className="mobile-menu__sub">
                    {item.children.map((child) => (
                      <NavLink key={child.to} to={child.to} className="mobile-menu__sub-link" onClick={closeMenu}>
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink key={item.to} to={item.to} className="mobile-menu__link" onClick={closeMenu}>
                {item.label}
              </NavLink>
            )
          )}
        </nav>
        <a
          href={LINE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-full-mobile mobile-menu__cta"
          onClick={closeMenu}
        >
          LINE 諮詢
        </a>
      </div>
    </>
  )
}
