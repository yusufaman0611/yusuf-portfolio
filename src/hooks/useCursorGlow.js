import { useEffect, useRef } from 'react'
import { getHasFineHover } from './usePrefersReducedMotion'

/** Returns a ref to attach to the glow element; moves it with the pointer. */
export function useCursorGlow() {
  const glowRef = useRef(null)

  useEffect(() => {
    if (!glowRef.current || !getHasFineHover()) return

    function onPointerMove(e) {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
      }
    }

    window.addEventListener('pointermove', onPointerMove)
    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [])

  return glowRef
}
