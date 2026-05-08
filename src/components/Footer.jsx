const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Programs', href: '#programs' },
  { label: 'Upcoming Trainings', href: '#events' },
  { label: 'Meet JT', href: '#meet-jt' },
  { label: 'Our Mission', href: '#community' },
  { label: 'About Us', href: '#', comingSoon: true },
]

const resourceLinks = [
  { label: 'Code of Conduct', href: '#credo' },
  { label: 'First Cast Juniors', href: '#programs' },
  { label: 'Middle School Program', href: '#programs' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Competitive Track', href: '#programs', comingSoon: true },
  { label: 'Sponsorships', href: '#', comingSoon: true },
  { label: 'Contact Us', href: '#signup' },
]

const socialLinks = [
  { icon: 'f', label: 'Facebook', title: 'Facebook — Coming Soon' },
  { icon: '▶', label: 'YouTube', title: 'YouTube — Coming Soon' },
  { icon: '◉', label: 'Instagram', title: 'Instagram — Coming Soon' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">

          <div className="footer-brand">
            <div className="footer-logo">
              <img
                src="/Images/logo.png"
                alt="Angln Academy"
                className="footer-logo-img"
                width="140"
                height="48"
                loading="lazy"
              />
              <div className="footer-logo-text">
                <span className="footer-logo-name">ANGLN</span>
                <span className="footer-logo-sub">Academy</span>
              </div>
            </div>

            <p className="footer-tagline">
              "Building better anglers.<br />
              Building better young people."
            </p>

            <div className="footer-location">
              <p>Greenwood &amp; Greenville, South Carolina</p>
              <p>Lake Greenwood · Upstate SC</p>
              <p style={{ marginTop: '0.375rem' }}>
                <a href="#signup" style={{ color: 'rgba(196,123,10,0.75)', transition: 'color 0.2s' }}>
                  angln.com
                </a>
              </p>
            </div>

            <div className="footer-social">
              {socialLinks.map(s => (
                <button
                  key={s.label}
                  className="footer-social-link"
                  title={s.title}
                  aria-label={s.label}
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="footer-col-title">Navigation</span>
            <nav className="footer-links" aria-label="Footer navigation">
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`footer-link ${link.comingSoon ? 'coming-soon' : ''}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <span className="footer-col-title">Programs &amp; Resources</span>
            <nav className="footer-links" aria-label="Programs and resources">
              {resourceLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`footer-link ${link.comingSoon ? 'coming-soon' : ''}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <span className="footer-col-title">Contact</span>
            <div>
              <div className="footer-contact-item">
                <span>📍</span>
                <span>Greenwood &amp; Greenville, SC area</span>
              </div>
              <div className="footer-contact-item">
                <span>✉️</span>
                <span>info@angln.com</span>
              </div>
            </div>

            <div style={{ marginTop: '1.75rem' }}>
              <span className="footer-col-title">Future Pages</span>
              <div className="footer-links">
                {['About Us', 'Parent FAQ', 'Clubs & Leagues', 'College Pathway'].map(p => (
                  <span key={p} className="footer-link coming-soon" style={{ cursor: 'default' }}>
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-inner">
            <div className="footer-copyright">
              <p>© {year} Angln Academy · Angln.com · All rights reserved.</p>
              <p style={{ marginTop: '0.25rem' }}>Youth Fishing Academy · Greenwood &amp; Greenville, South Carolina</p>
            </div>
            <p className="footer-disclaimer">
              <strong>Disclaimer:</strong> Current Angln Academy sessions are beginner-level bank
              and dock-based fishing trainings unless otherwise stated. No boat-based trips are
              currently offered. Future programs including boat-based, tournament, and competitive
              tracks are in development. "Angln Academy" and "Angln.com" are trademarks of their
              respective owners.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
