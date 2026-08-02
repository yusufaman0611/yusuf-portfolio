import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getPrefersReducedMotion } from './usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

/**
 * Mirrors the original main.js smooth-scroll setup:
 * - Initializes Lenis (skipped for prefers-reduced-motion)
 * - Wires Lenis into the GSAP ticker + ScrollTrigger
 * - Intercepts clicks on any in-page `#` anchor and smooth-scrolls to it,
 *   falling back to native smooth scrollIntoView when Lenis is unavailable.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = getPrefersReducedMotion()
    let lenis = null
    let rafId = null
    let tickerFn = null

    if (!prefersReducedMotion) {
      lenis = new Lenis({
        duration: 1.1,
        smoothWheel: true,
        smoothTouch: false
      })

      function raf(time) {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)

      lenis.on('scroll', ScrollTrigger.update)
      tickerFn = (time) => lenis.raf(time * 1000)
      gsap.ticker.add(tickerFn)
      gsap.ticker.lagSmoothing(0)
    }

    function handleAnchorClick(e) {
      const anchor = e.target.closest('a[href^="#"]')
      if (!anchor) return
      const targetId = anchor.getAttribute('href')
      if (!targetId || targetId === '#') return
      let targetEl
      try {
        targetEl = document.querySelector(targetId)
      } catch {
        return
      }
      if (!targetEl) return
      e.preventDefault()
      if (lenis) {
        lenis.scrollTo(targetEl, { offset: -70, duration: 1.2 })
      } else {
        targetEl.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' })
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      if (rafId) cancelAnimationFrame(rafId)
      if (tickerFn) gsap.ticker.remove(tickerFn)
      if (lenis) lenis.destroy()
    }
  }, [])
}
