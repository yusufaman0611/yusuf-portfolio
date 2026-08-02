import { useEffect, useRef, useState } from 'react'

/** Animates 0 -> target with a cubic ease-out once the element scrolls into view. */
export function useCountUp(target, suffix = '') {
  const elRef = useRef(null)
  const [display, setDisplay] = useState('0' + suffix)

  useEffect(() => {
    const el = elRef.current
    if (!el) return

    function animate() {
      const duration = 1400
      const start = performance.now()
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setDisplay(Math.round(eased * target) + suffix)
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          animate()
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, suffix])

  return [elRef, display]
}
