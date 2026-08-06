import './NextSectionCue.css'

export default function NextSectionCue({ target, label, tone = 'dark', position = 'center' }) {
  const handleClick = (event) => {
    event.preventDefault()
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById(target)?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <a
      className={`next-section-cue next-section-cue--${tone} next-section-cue--${position}`}
      href={`#${target}`}
      aria-label={`${label}，前往下一個區塊`}
      onClick={handleClick}
    >
      <span className="next-section-cue__label">{label}</span>
      <span className="next-section-cue__arrow" aria-hidden="true">
        <svg viewBox="0 0 32 22">
          <path d="M4 5 16 17 28 5" />
        </svg>
      </span>
    </a>
  )
}
