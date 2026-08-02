import { useSectionHeadReveal } from '../../hooks/useSectionHeadReveal'
import StatCard from './StatCard'
import SkillBar from './SkillBar'
import { timeline, stats, skillGroups, techFloatIcons } from '../../data/about'

export default function About() {
  const headRef = useSectionHeadReveal()

  return (
    <section className="section about" id="about">
      <div className="section-inner">
        <div className="section-head" data-aos="fade-up" ref={headRef}>
          <span className="section-eyebrow">01 — About</span>
          <h2 className="section-title">
            Where statistics meets<br />
            <span className="text-accent">software engineering.</span>
          </h2>
        </div>

        <div className="about-grid">
          <div className="about-copy" data-aos="fade-up" data-aos-delay="100">
            <p className="about-lead">
              I'm a Computer Science graduate who found his focus in data —
              not just visualizing it, but building systems that learn from it.
              My work sits at the intersection of statistics, machine learning,
              and clean software engineering.
            </p>
            <p>
              As a fresher, I've spent my academic years building a portfolio of
              real, working models rather than just notebooks: regression systems
              that price houses, classifiers that predict outcomes, and
              recommender systems that mirror what Netflix or Spotify do at a
              much smaller scale. Every project ships with a clear pipeline —
              from raw CSV to a deployed, testable result.
            </p>
            <p>
              I care about the "why" behind a model as much as the "what" —
              feature importance, bias, and interpretability guide my decisions
              as much as accuracy does.
            </p>

            <div className="about-timeline">
              {timeline.map((item) => (
                <div className="timeline-item" key={item.title}>
                  <span className="timeline-dot" aria-hidden="true" />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="about-stats" data-aos="fade-up" data-aos-delay="200">
            {stats.map((stat) => (
              <StatCard key={stat.label} count={stat.count} suffix={stat.suffix} label={stat.label} />
            ))}
          </div>
        </div>

        <div className="skills-block" data-aos="fade-up">
          <h3 className="skills-heading">Core technical skills</h3>
          <div className="skills-columns">
            {skillGroups.map((group) => (
              <div className="skill-group" key={group.heading}>
                <h4>
                  <i className={group.icon} aria-hidden="true" /> {group.heading}
                </h4>
                {group.skills.map((skill) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                ))}
              </div>
            ))}
          </div>

          <div className="tech-float-row" aria-hidden="true">
            {techFloatIcons.map((icon) => (
              <span key={icon}><i className={icon} /></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
