import { useCountUp } from '../../hooks/useCountUp'

export default function StatCard({ count, suffix, label }) {
  const [ref, display] = useCountUp(count, suffix)

  return (
    <div className="stat-card glass">
      <span className="stat-number" data-count={count} data-suffix={suffix || undefined} ref={ref}>
        {display}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  )
}
