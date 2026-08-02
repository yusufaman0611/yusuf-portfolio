import { useEffect } from 'react'
import { getPrefersReducedMotion, getHasFineHover } from './usePrefersReducedMotion'

/**
 * Applies the original site's magnetic-button (`.magnetic`) and
 * tilt-card (`.tilt`) pointer effects globally, exactly like the
 * document.querySelectorAll-based wiring in main.js. Runs once
 * the whole tree has mounted, so it picks up every matching element.
 */
export function useMagneticAndTilt() {
  useEffect(() => {
    if (getPrefersReducedMotion() || !getHasFineHover()) return

    const cleanups = []

    document.querySelectorAll('.magnetic').forEach((btn) => {
      function onMove(e) {
        const rect = btn.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`
      }
      function onLeave() {
        btn.style.transform = 'translate(0, 0)'
      }
      btn.addEventListener('mousemove', onMove)
      btn.addEventListener('mouseleave', onLeave)
      cleanups.push(() => {
        btn.removeEventListener('mousemove', onMove)
        btn.removeEventListener('mouseleave', onLeave)
      })
    })

    document.querySelectorAll('.tilt').forEach((card) => {
      function onMove(e) {
        const rect = card.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        card.style.transform = `perspective(900px) rotateX(${y * -8}deg) rotateY(${x * 8}deg) translateY(-4px)`
      }
      function onLeave() {
        card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)'
      }
      card.addEventListener('mousemove', onMove)
      card.addEventListener('mouseleave', onLeave)
      cleanups.push(() => {
        card.removeEventListener('mousemove', onMove)
        card.removeEventListener('mouseleave', onLeave)
      })
    })

    return () => cleanups.forEach((fn) => fn())
  }, [])
}
