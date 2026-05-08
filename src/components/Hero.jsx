export default function Hero() {
  return (
    <section className="hero" id="home">
      {/* Real photo background */}
      <div className="hero-bg-photo" role="img" aria-label="JT Such holding a large bass on the dock" />
      <div className="hero-bg-overlay" />
      <div className="hero-bg-vignette" />
      <div className="hero-bg-glow" />

      <div className="hero-content container">
        <div className="hero-inner">

          {/* Left — text */}
          <div className="hero-text">
            <div className="hero-logo-lockup">
              <img
                src="/Images/logo.png"
                alt="Angln Academy"
                className="hero-logo"
              />
            </div>

            <span className="hero-label">
              Greenwood &amp; Greenville, South Carolina
            </span>

            <h1 className="hero-headline">
              From First Cast to{' '}
              <em>Tournament&nbsp;Confidence</em>
            </h1>

            <p className="hero-subheadline">
              Angln Academy offers beginner-friendly bank and dock fishing
              training for kids and families across Upstate South Carolina —
              built on safety, fundamentals, confidence, and Southern
              outdoorsmanship.
            </p>

            <div className="hero-ctas">
              <a href="#events" className="btn btn-primary btn-lg">
                View Upcoming Trainings
              </a>
              <a href="#signup" className="btn btn-outline btn-lg">
                Request More Info
              </a>
            </div>

            <p className="hero-tagline">
              Build Skills. Build Character. Catch More.
            </p>

            <div className="hero-trust-strip">
              {[
                { icon: '🎣', text: 'Bank & Dock Training' },
                { icon: '👨‍👧', text: 'Parent-Friendly Sessions' },
                { icon: '🛡️', text: 'Safety-First Approach' },
                { icon: '🌱', text: 'No Experience Needed' },
              ].map(item => (
                <div key={item.text} className="hero-trust-item">
                  <span className="icon">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — framed photo card */}
          <div className="hero-visual">
            <div className="hero-stat-float pos-1">
              <span className="hero-stat-float-num">22+</span>
              <span className="hero-stat-float-label">Years on the Water</span>
            </div>

            <div className="hero-photo-frame">
              <img
                src="/Images/hero-dock.jpg"
                alt="JT Such — Angln Academy founder holding a large bass on the dock"
                loading="eager"
              />
              <div className="hero-photo-badge">
                <span className="hero-photo-badge-title">JT Such — Founder</span>
                <span className="hero-photo-badge-sub">Lander University · Bassmaster Collegiate</span>
              </div>
            </div>

            <div className="hero-stat-float pos-2">
              <span className="hero-stat-float-num">SC</span>
              <span className="hero-stat-float-label">Upstate South Carolina</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
