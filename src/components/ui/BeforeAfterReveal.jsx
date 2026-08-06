import { useRef, useState, useCallback } from 'react'
import { ChevronsLeftRight } from 'lucide-react'
import './BeforeAfterReveal.css'

export default function BeforeAfterReveal({
  beforeSrc,
  afterSrc,
  beforeLabel = '肉眼視覺',
  afterLabel = '熱顯像分析',
  beforeAlt = '驗前',
  afterAlt = '驗後',
}) {
  const containerRef = useRef(null)
  const [position, setPosition] = useState(50) // percentage
  const dragging = useRef(false)

  const clamp = (val, min, max) => Math.min(Math.max(val, min), max)

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const pct = clamp(((clientX - rect.left) / rect.width) * 100, 5, 95)
    setPosition(pct)
  }, [])

  const onMouseDown = (e) => {
    dragging.current = true
    e.preventDefault()

    const onMove = (e) => { if (dragging.current) updatePosition(e.clientX) }
    const onUp = () => { dragging.current = false; window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  const onTouchStart = () => {
    dragging.current = true

    const onMove = (e) => { if (dragging.current) updatePosition(e.touches[0].clientX) }
    const onEnd = () => { dragging.current = false; window.removeEventListener('touchmove', onMove); window.removeEventListener('touchend', onEnd) }

    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('touchend', onEnd)
  }

  return (
    <div className="bar-reveal" ref={containerRef} role="img" aria-label="驗屋前後對比">
      {/* Before image (full width, clipped on right) */}
      <div className="bar-reveal__before">
        {beforeSrc
          ? <img src={beforeSrc} alt={beforeAlt} draggable={false} />
          : <div className="bar-reveal__placeholder bar-reveal__placeholder--before"><span>{beforeLabel}</span></div>
        }
        <span className="bar-reveal__label bar-reveal__label--before">{beforeLabel}</span>
      </div>

      {/* After image (clipped on left, revealed by position) */}
      <div
        className="bar-reveal__after"
        style={{ clipPath: `inset(0 0 0 ${position}%)` }}
      >
        {afterSrc
          ? <img src={afterSrc} alt={afterAlt} draggable={false} />
          : <div className="bar-reveal__placeholder bar-reveal__placeholder--after"><span>{afterLabel}</span></div>
        }
        <span className="bar-reveal__label bar-reveal__label--after">{afterLabel}</span>
      </div>

      {/* Divider line */}
      <div className="bar-reveal__divider" style={{ left: `${position}%` }} />

      {/* Drag handle */}
      <div
        className="bar-reveal__handle"
        style={{ left: `${position}%` }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        role="slider"
        aria-valuemin={5}
        aria-valuemax={95}
        aria-valuenow={Math.round(position)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') setPosition(p => clamp(p - 2, 5, 95))
          if (e.key === 'ArrowRight') setPosition(p => clamp(p + 2, 5, 95))
        }}
      >
        <ChevronsLeftRight size={20} />
      </div>
    </div>
  )
}
