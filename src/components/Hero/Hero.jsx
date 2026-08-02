import { useRef } from 'react'
import { useHeroReveal } from '../../hooks/useHeroReveal'
import { useTypedRole } from '../../hooks/useTypedRole'
import { useHeroScene } from '../../hooks/useHeroScene'
import { socialLinks } from '../../data/site'

export default function Hero() {
  const heroSectionRef = useRef(null)
  const contentRef = useHeroReveal()
  const typedRole = useTypedRole()
  const canvasRef = useHeroScene(heroSectionRef)

  return (
    <section className="hero" id="heroSection" ref={heroSectionRef}>
      <canvas id="heroCanvas" className="hero-canvas" aria-hidden="true" ref={canvasRef} />
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />

      <div className="hero-content" ref={contentRef}>
        <p className="eyebrow" data-reveal>
          <span className="pulse-dot" aria-hidden="true" />
          Available for Data Science roles
        </p>

        <h1 className="hero-title" data-reveal>
          <span className="line">Yusuf <span className="text-outline" data-text="Aman">Aman</span></span>
        </h1>

        <div className="hero-subtitle" data-reveal>
          <span className="typed-role" id="typedRole">{typedRole}</span>
          <span className="typed-cursor">|</span>
        </div>

        <p className="hero-desc" data-reveal>
          I turn raw, messy data into models that make decisions — building
          end‑to‑end machine learning systems from a clean pandas pipeline to a
          production‑ready API. B.Sc. Computer Science graduate, fluent in Python,
          obsessed with the math behind the model.
        </p>

        <div className="hero-actions" data-reveal>
          <a href="#projects" className="btn btn-primary magnetic">
            <span>View Projects</span>
            <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </a>
          <a href="assets/Yusuf_Aman_Resume.pdf" className="btn btn-glass magnetic" download>
            <i className="fa-solid fa-arrow-down-to-line" aria-hidden="true" />
            <span>Download Resume</span>
          </a>
          <a href="#contact" className="btn btn-outline magnetic">
            <span>Contact Me</span>
          </a>
        </div>

        <div className="hero-social" data-reveal>
          <a href={socialLinks.github} target="_blank" rel="noopener" aria-label="GitHub">
            <i className="fa-brands fa-github" />
          </a>
          <a href={socialLinks.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn">
            <i className="fa-brands fa-linkedin-in" />
          </a>
          <a href={`mailto:${socialLinks.email}`} aria-label="Email">
            <i className="fa-solid fa-envelope" />
          </a>
          <a href={`tel:${socialLinks.phone}`} aria-label="Phone">
            <i className="fa-solid fa-phone" />
          </a>
        </div>
      </div>

      <button className="scroll-indicator" id="scrollIndicator" aria-label="Scroll to About section">
        <span className="scroll-track"><span className="scroll-dot" /></span>
        <span className="scroll-label">Scroll</span>
      </button>
    </section>
  )
}
