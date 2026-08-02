import { useEffect, useState } from 'react'

/** Returns true once window.scrollY exceeds `threshold`. */
export function useScrollPast(threshold) {
  const [past, setPast] = useState(() => (typeof window !== 'undefined' ? window.scrollY > threshold : false))

  useEffect(() => {
    function onScroll() {
      setPast(window.scrollY > threshold)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return past
}
