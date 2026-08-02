import { useCursorGlow } from '../../hooks/useCursorGlow'

export default function CursorGlow() {
  const glowRef = useCursorGlow()
  return <div className="cursor-glow" aria-hidden="true" ref={glowRef} />
}
