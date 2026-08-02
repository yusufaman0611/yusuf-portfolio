import { useEffect, useState } from 'react'

export function usePrefersReducedMotion() {
  const [prefersReducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  return prefersReducedMotion
}

// Non-hook helper for one-off reads inside effects/imperative code
export function getPrefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function getHasFineHover() {
  return typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
}
