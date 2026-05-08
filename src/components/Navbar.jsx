import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'Programs', href: '#programs' },
    { label: 'Trainings', href: '#events' },
    { label: 'Meet JT', href: '#meet-jt' },
    { label: 'Our Mission', href: '#community' },
  ]

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-inner">

          <a href="#home" className="navbar-logo" aria-label="Angln Academy Home">
            <img
              src="/Images/logo.png"
              alt="Angln Academy"
              className="navbar-logo-img"
            />
          </a>

          <div className="navbar-nav">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="navbar-link">
                {link.label}
              </a>
            ))}
            <a href="#signup" className="btn btn-primary btn-sm navbar-cta">
              Get Started
            </a>
          </div>

          <button
            className="navbar-mobile-toggle"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            <span style={mobileOpen ? { transform: 'rotate(45deg) translate(5px, 5px)' } : {}} />
            <span style={mobileOpen ? { opacity: 0 } : {}} />
            <span style={mobileOpen ? { transform: 'rotate(-45deg) translate(5px, -5px)' } : {}} />
          </button>
        </div>

        <div className={`navbar-mobile-menu ${mobileOpen ? 'open' : ''}`}>
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="navbar-mobile-link"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#signup"
            className="btn btn-primary btn-sm"
            style={{ marginTop: '0.75rem', justifyContent: 'center' }}
            onClick={() => setMobileOpen(false)}
          >
            Request Information
          </a>
        </div>
      </div>
    </nav>
  )
}
