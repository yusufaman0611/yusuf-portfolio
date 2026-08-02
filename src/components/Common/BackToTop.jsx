import { useScrollPast } from '../../hooks/useScrollPast'

export default function BackToTop() {
  const visible = useScrollPast(700)

  return (
    <a
      href="#hero"
      className={`back-to-top${visible ? ' visible' : ''}`}
      id="backToTop"
      aria-label="Back to top"
    >
      <i className="fa-solid fa-arrow-up" aria-hidden="true" />
    </a>
  )
}
