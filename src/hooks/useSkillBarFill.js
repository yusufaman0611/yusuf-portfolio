import { useEffect, useRef, useState } from 'react'

/** Fills a skill bar's width to `level`% once it scrolls into view. */
export function useSkillBarFill(level) {
  const fillRef = useRef(null)
  const [width, setWidth] = useState('0%')

  useEffect(() => {
    const el = fillRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          setWidth(level + '%')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [level])

  return [fillRef, width]
}
