import { useState } from 'react'
import { useScrollPast } from '../../hooks/useScrollPast'
import { navLinks } from '../../data/site'

export default function Navbar() {
  const scrolled = useScrollPast(40)
  const [open, setOpen] = useState(false)

  function closeMenu() {
    setOpen(false)
  }

  return (
    <header className={`site-nav${scrolled ? ' scrolled' : ''}`} id="siteNav">
      <div className="nav-inner">
        <a href="#hero" className="nav-logo" aria-label="Yusuf Aman — home">
          <span className="logo-mark" aria-hidden="true">YA</span>
          <span className="logo-text">Yusuf</span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} data-nav>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-cta">
          <a href="#contact" className="btn btn-ghost">Let's talk</a>
        </div>

        <button
          className={`nav-toggle${open ? ' active' : ''}`}
          id="navToggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      <div className={`nav-mobile${open ? ' open' : ''}`} id="navMobile">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} data-nav onClick={closeMenu}>
            {link.label}
          </a>
        ))}
      </div>
    </header>
  )
}
