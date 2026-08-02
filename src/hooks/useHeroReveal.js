import { useEffect, useRef } from 'react'

/**
 * Attach the returned ref to the hero section container. On mount,
 * staggers `.is-visible` onto every [data-reveal] descendant, matching
 * the original 150ms + i*140ms cadence.
 */
export function useHeroReveal() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return
    const reveals = containerRef.current.querySelectorAll('[data-reveal]')
    const timers = []
    reveals.forEach((el, i) => {
      const timer = setTimeout(() => el.classList.add('is-visible'), 150 + i * 140)
      timers.push(timer)
    })
    return () => timers.forEach(clearTimeout)
  }, [])

  return containerRef
}
