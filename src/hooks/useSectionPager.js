import { useEffect } from 'react'

const INTERACTIVE_SELECTOR = 'a, button, input, textarea, select, summary, [contenteditable="true"]'

export function useSectionPager(containerRef) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    // Native touch scrolling is more reliable on mobile Safari and embedded
    // browsers. Keep full-page wheel paging as a desktop enhancement.
    const desktopPager = window.matchMedia('(min-width: 768px) and (pointer: fine)')
    if (!desktopPager.matches) return undefined

    const footer = document.querySelector('.footer')
    const sections = [...Array.from(container.children), ...(footer ? [footer] : [])]
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let currentIndex = 0
    let locked = false
    let unlockTimer
    let touchStartY = null
    let touchStartX = null

    const updateViewportHeight = () => {
      document.documentElement.style.setProperty('--home-viewport-height', `${window.innerHeight}px`)
    }

    const nearestIndex = () => {
      let nearest = 0
      let distance = Number.POSITIVE_INFINITY
      sections.forEach((section, index) => {
        const nextDistance = Math.abs(section.getBoundingClientRect().top)
        if (nextDistance < distance) {
          distance = nextDistance
          nearest = index
        }
      })
      return nearest
    }

    const stepWithinSection = (direction) => {
      const section = sections[currentIndex]
      if (!section?.hasAttribute('data-pager-steps')) return false
      const event = new CustomEvent('home:pager-step', {
        detail: { direction },
        cancelable: true,
      })
      return !section.dispatchEvent(event)
    }

    const goTo = (nextIndex) => {
      const boundedIndex = Math.max(0, Math.min(sections.length - 1, nextIndex))
      if (boundedIndex === currentIndex || locked) return

      currentIndex = boundedIndex
      locked = true
      window.scrollTo({
        top: sections[currentIndex].offsetTop,
        behavior: reducedMotion ? 'auto' : 'smooth',
      })

      window.clearTimeout(unlockTimer)
      unlockTimer = window.setTimeout(() => { locked = false }, reducedMotion ? 80 : 720)
    }

    const onWheel = (event) => {
      if (event.ctrlKey || Math.abs(event.deltaY) < 8) return
      event.preventDefault()
      if (locked) return
      currentIndex = nearestIndex()
      const direction = event.deltaY > 0 ? 1 : -1
      if (stepWithinSection(direction)) return
      goTo(currentIndex + direction)
    }

    const onTouchStart = (event) => {
      const touch = event.touches[0]
      touchStartY = touch.clientY
      touchStartX = touch.clientX
    }

    const onTouchMove = (event) => {
      if (touchStartY === null || touchStartX === null) return
      const touch = event.touches[0]
      const deltaY = touchStartY - touch.clientY
      const deltaX = touchStartX - touch.clientX
      if (Math.abs(deltaY) > Math.abs(deltaX)) event.preventDefault()
    }

    const onTouchEnd = (event) => {
      if (touchStartY === null || touchStartX === null || locked) return
      const touch = event.changedTouches[0]
      const deltaY = touchStartY - touch.clientY
      const deltaX = touchStartX - touch.clientX
      touchStartY = null
      touchStartX = null
      if (Math.abs(deltaY) < 42 || Math.abs(deltaY) <= Math.abs(deltaX)) return
      currentIndex = nearestIndex()
      const direction = deltaY > 0 ? 1 : -1
      if (stepWithinSection(direction)) return
      goTo(currentIndex + direction)
    }

    const onKeyDown = (event) => {
      if (event.target.closest?.(INTERACTIVE_SELECTOR)) return
      const forward = ['ArrowDown', 'PageDown', ' ']
      const backward = ['ArrowUp', 'PageUp']
      if (!forward.includes(event.key) && !backward.includes(event.key)) return
      event.preventDefault()
      currentIndex = nearestIndex()
      const direction = forward.includes(event.key) ? 1 : -1
      if (stepWithinSection(direction)) return
      goTo(currentIndex + direction)
    }

    const onResize = () => {
      if (!desktopPager.matches) return
      updateViewportHeight()
      currentIndex = nearestIndex()
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: sections[currentIndex].offsetTop, behavior: 'auto' })
      })
    }

    updateViewportHeight()
    currentIndex = nearestIndex()
    window.addEventListener('wheel', onWheel, { passive: false, capture: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)

    return () => {
      window.clearTimeout(unlockTimer)
      document.documentElement.style.removeProperty('--home-viewport-height')
      window.removeEventListener('wheel', onWheel, { capture: true })
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
    }
  }, [containerRef])
}
