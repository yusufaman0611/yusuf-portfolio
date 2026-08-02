import { useScrollProgress } from '../../hooks/useScrollProgress'

export default function ProgressBar() {
  const progress = useScrollProgress()
  return (
    <div className="progress-bar" aria-hidden="true">
      <span id="progressFill" style={{ width: `${progress}%` }} />
    </div>
  )
}
