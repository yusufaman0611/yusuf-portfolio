import { useEffect, useState } from 'react'
import { getPrefersReducedMotion } from './usePrefersReducedMotion'
import { typedRoles } from '../data/site'

export function useTypedRole() {
  const [text, setText] = useState(() => (getPrefersReducedMotion() ? typedRoles[0] : ''))

  useEffect(() => {
    if (getPrefersReducedMotion()) {
      setText(typedRoles[0])
      return
    }

    let roleIndex = 0
    let charIndex = 0
    let deleting = false
    let timeoutId = null

    function typeLoop() {
      const currentRole = typedRoles[roleIndex]
      if (!deleting) {
        charIndex++
        setText(currentRole.slice(0, charIndex))
        if (charIndex === currentRole.length) {
          deleting = true
          timeoutId = setTimeout(typeLoop, 1600)
          return
        }
      } else {
        charIndex--
        setText(currentRole.slice(0, charIndex))
        if (charIndex === 0) {
          deleting = false
          roleIndex = (roleIndex + 1) % typedRoles.length
        }
      }
      timeoutId = setTimeout(typeLoop, deleting ? 35 : 65)
    }

    timeoutId = setTimeout(typeLoop, 0)
    return () => clearTimeout(timeoutId)
  }, [])

  return text
}
