import { useEffect } from 'react'
import AOS from 'aos'
import { getPrefersReducedMotion } from './usePrefersReducedMotion'

// NOTE: the original site loads the AOS *script* from a CDN but never
// includes AOS's stylesheet, so `data-aos` elements render without the
// library's fade/translate transition — they're simply present in the
// DOM with AOS's data attributes wired up. We intentionally do not
// import 'aos/dist/aos.css' here so behavior stays identical.
export function useAOSInit() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
      disable: getPrefersReducedMotion()
    })
  }, [])
}
