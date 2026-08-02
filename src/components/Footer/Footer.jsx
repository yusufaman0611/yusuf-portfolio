import { socialLinks } from '../../data/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="logo-mark" aria-hidden="true">YA</span>
          <span>Yusuf Aman</span>
        </div>
        <p className="footer-tagline">Data Scientist — Machine Learning, AI &amp; Python.</p>
        <div className="footer-social">
          <a href={socialLinks.github} target="_blank" rel="noopener" aria-label="GitHub">
            <i className="fa-brands fa-github" />
          </a>
          <a href={socialLinks.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn">
            <i className="fa-brands fa-linkedin-in" />
          </a>
          <a href={`mailto:${socialLinks.email}`} aria-label="Email">
            <i className="fa-solid fa-envelope" />
          </a>
        </div>
        <p className="footer-copyright">&copy; <span id="footerYear">{year}</span> Yusuf Aman. All rights reserved.</p>
      </div>
    </footer>
  )
}
