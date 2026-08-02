import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Returns a ref to attach to a `.section-head` element for the GSAP scroll-in reveal. */
export function useSectionHeadReveal() {
  const headRef = useRef(null)

  useEffect(() => {
    if (!headRef.current) return
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'expo.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 85%' }
      })
    })
    return () => ctx.revert()
  }, [])

  return headRef
}
