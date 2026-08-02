import { useSectionHeadReveal } from '../../hooks/useSectionHeadReveal'
import ProjectCard from './ProjectCard'
import { projects } from '../../data/projects'

export default function Projects() {
  const headRef = useSectionHeadReveal()

  return (
    <section className="section projects" id="projects">
      <div className="section-inner">
        <div className="section-head" data-aos="fade-up" ref={headRef}>
          <span className="section-eyebrow">02 — Projects</span>
          <h2 className="section-title">
            Models built to be<br />
            <span className="text-accent">used, not just trained.</span>
          </h2>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
