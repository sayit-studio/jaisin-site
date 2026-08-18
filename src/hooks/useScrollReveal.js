import { useEffect, useRef } from 'react'
import { gsap } from '../utils/gsap'

/**
 * Attach scroll-triggered reveal animations to a container.
 * Elements with [data-reveal] fade up individually.
 * Elements with [data-stagger] are animated as a staggered group.
 */
export function useScrollReveal(containerRef) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    if (reducedMotion || coarsePointer) {
      gsap.set(container.querySelectorAll('[data-reveal], [data-stagger] > *'), {
        clearProps: 'opacity,transform,visibility',
      })
      return undefined
    }

    let ctx
    try {
      ctx = gsap.context(() => {
      // Individual fade-up elements
      gsap.utils.toArray('[data-reveal]', containerRef.current).forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once: true,
            },
          }
        )
      })

      // Staggered children groups
      gsap.utils.toArray('[data-stagger]', containerRef.current).forEach((parent) => {
        const children = parent.children
        gsap.fromTo(
          children,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.08,
            scrollTrigger: {
              trigger: parent,
              start: 'top 85%',
              once: true,
            },
          }
        )
      })
      }, containerRef)
    } catch {
      gsap.set(container.querySelectorAll('[data-reveal], [data-stagger] > *'), {
        clearProps: 'opacity,transform,visibility',
      })
      return undefined
    }

    return () => ctx.revert()
  }, [containerRef])
}

/**
 * Convenience wrapper — creates its own ref and returns it.
 */
export function useRevealRef() {
  const ref = useRef(null)
  useScrollReveal(ref)
  return ref
}
