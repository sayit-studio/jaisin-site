import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../../utils/gsap'
import Navbar from './Navbar'
import Footer from './Footer'
import PageTransition from '../ui/PageTransition'
import FloatingCta from '../ui/FloatingCta'
import { trackPageView } from '../../utils/analytics'

export default function Layout() {
  const { pathname } = useLocation()
  const lenisRef = useRef(null)

  // Init Lenis once
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      prevent: () => document.documentElement.classList.contains('home-pager-mode'),
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
      lenis.destroy()
    }
  }, [])

  // Route change: scroll to top, refresh animations, and notify analytics.
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true })
    ScrollTrigger.refresh()
    trackPageView(pathname)
  }, [pathname])

  return (
    <>
      <PageTransition />
      <Navbar />
      <main id="main-content">
        <Outlet />
      </main>
      <FloatingCta />
      <Footer />
    </>
  )
}
