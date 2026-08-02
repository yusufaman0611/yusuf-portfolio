export default function ProjectCard({ project }) {
  return (
    <article
      className="project-card glass tilt"
      data-aos="fade-up"
      data-aos-delay={project.aosDelay || undefined}
    >
      <div className="project-media">
        <div className="project-visual" data-visual={project.id}>
          <i className={project.icon} />
        </div>
        <div className="project-badges">
          {project.badges.map((badge) => (
            <span key={badge}>{badge}</span>
          ))}
        </div>
      </div>
      <div className="project-body">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <ul className="project-results">
          {project.results.map((result) => (
            <li key={result}>
              <i className="fa-solid fa-check" /> {result}
            </li>
          ))}
        </ul>
        <div className="project-links">
          <a href={project.codeUrl} target="_blank" rel="noopener" className="btn btn-ghost btn-sm">
            <i className="fa-brands fa-github" /> Code
          </a>
          <a
            href={project.liveUrl}
            className={`btn btn-outline btn-sm${project.isLiveInternal ? ' project-live-link' : ''}`}
          >
            <i className={project.liveIcon} /> {project.liveLabel}
          </a>
        </div>
      </div>
    </article>
  )
}
