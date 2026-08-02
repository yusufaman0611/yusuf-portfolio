import { useSkillBarFill } from '../../hooks/useSkillBarFill'

export default function SkillBar({ name, level }) {
  const [fillRef, width] = useSkillBarFill(level)

  return (
    <div className="skill-bar">
      <span className="skill-name">{name}</span>
      <div className="bar-track">
        <div className="bar-fill" data-level={level} ref={fillRef} style={{ width }} />
      </div>
    </div>
  )
}
