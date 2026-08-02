import { useSectionHeadReveal } from '../../hooks/useSectionHeadReveal'
import ContactForm from './ContactForm'
import { socialLinks } from '../../data/site'

export default function Contact() {
  const headRef = useSectionHeadReveal()

  return (
    <section className="section contact" id="contact">
      <div className="section-inner">
        <div className="section-head" data-aos="fade-up" ref={headRef}>
          <span className="section-eyebrow">03 — Contact</span>
          <h2 className="section-title">
            Have a role or project<br />
            <span className="text-accent">in mind? Let's talk.</span>
          </h2>
        </div>

        <div className="contact-grid">
          <div className="contact-info" data-aos="fade-up" data-aos-delay="100">
            <p className="contact-intro">
              I'm currently open to Data Science, Machine Learning, and AI
              engineering roles. The fastest way to reach me is email — I
              typically respond within a day.
            </p>

            <a href={`tel:${socialLinks.phone}`} className="contact-item glass">
              <span className="contact-icon"><i className="fa-solid fa-phone" /></span>
              <span>
                <span className="contact-label">Phone</span>
                <span className="contact-value">{socialLinks.phoneDisplay}</span>
              </span>
            </a>

            <a href={`mailto:${socialLinks.email}`} className="contact-item glass">
              <span className="contact-icon"><i className="fa-solid fa-envelope" /></span>
              <span>
                <span className="contact-label">Email</span>
                <span className="contact-value">{socialLinks.email}</span>
              </span>
            </a>

            <a href={socialLinks.linkedin} target="_blank" rel="noopener" className="contact-item glass">
              <span className="contact-icon"><i className="fa-brands fa-linkedin-in" /></span>
              <span>
                <span className="contact-label">LinkedIn</span>
                <span className="contact-value">linkedin.com/in/yusufaman</span>
              </span>
            </a>

            <a href={socialLinks.github} target="_blank" rel="noopener" className="contact-item glass">
              <span className="contact-icon"><i className="fa-brands fa-github" /></span>
              <span>
                <span className="contact-label">GitHub</span>
                <span className="contact-value">github.com/yusufaman0611</span>
              </span>
            </a>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  )
}
