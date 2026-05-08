const credentials = [
  { icon: '🎓', label: 'College Graduate' },
  { icon: '🎣', label: 'Lander University Fishing Team' },
  { icon: '🏆', label: 'Bassmaster Collegiate Competitor' },
  { icon: '⚡', label: 'MLF Tournament Angler' },
  { icon: '📍', label: 'Upstate South Carolina' },
  { icon: '🌊', label: '22+ Years on the Water' },
]

export default function MeetJT() {
  return (
    <section className="meet-jt section" id="meet-jt">
      <div className="container">
        <div className="meet-jt-inner">

          {/* Photo column */}
          <div className="meet-jt-photo-col reveal">
            <div className="meet-jt-corner-badge">
              <span className="meet-jt-corner-badge-num">Est.</span>
              <span className="meet-jt-corner-badge-label">Born to Fish<br />Since 2004</span>
            </div>

            <div className="meet-jt-photo-wrap">
              <img
                src="/Images/jt-portrait.jpg"
                alt="JT Such — Angln Academy founder holding a large bass on the water"
                loading="lazy"
              />
              <div className="meet-jt-photo-overlay">
                <span className="meet-jt-name-plate">
                  <span className="meet-jt-name">JT Such</span>
                  <span className="meet-jt-title-line">Founder · Head Coach · Angln Academy</span>
                </span>
              </div>
            </div>
          </div>

          {/* Content column */}
          <div className="meet-jt-content">
            <span className="section-label">Meet Your Coach</span>
            <h2 className="section-title">
              He Was That Kid Once.<br />
              <span style={{ color: 'var(--blue-light)' }}>Now He's Coming Back to Help Yours.</span>
            </h2>

            <div className="meet-jt-origin">
              <p className="meet-jt-origin-text">
                "The first rod I ever held was a gift from my Dad. First cast — bird's nest.
                Neither of us knew how to fix it. So Dad walked over to a stranger on the bank,
                asked for help, and that fisherman put down his rod and showed us both how to
                get back in the water. I never forgot that."
              </p>
            </div>

            <div className="meet-jt-bio">
              <p>
                JT Such grew up in Upstate South Carolina with a rod in his hand and a love
                for the water that never left. Now 22 years old and a college graduate, he
                has competed at the highest levels of collegiate fishing — representing Lander
                University on the fishing team, competing in Bassmaster Collegiate tournaments,
                and standing on the stage at MLF events with some of the best young anglers in
                the country.
              </p>
              <p>
                But what drives JT isn't the trophies. It's that moment on the bank with his
                Dad and a stranger who stopped to help. He remembers how much that meant — a
                simple act of community that turned a frustrated kid into a lifelong angler.
                Angln Academy was built around that memory. Around paying it forward to the
                next generation of families standing at the water's edge, not knowing where
                to start.
              </p>
              <p>
                JT speaks both languages: the beginner on the bank holding a rod for the very
                first time, and the competitor standing at the weigh-in stage. He can help your
                child — and you — get started from scratch, and he knows exactly what it takes
                to grow from there. No judgment. No intimidation. Just patient, structured,
                community-driven instruction that meets every family where they are.
              </p>
            </div>

            <div className="meet-jt-credentials">
              {credentials.map(c => (
                <span key={c.label} className="credential-chip">
                  <span className="credential-chip-icon">{c.icon}</span>
                  {c.label}
                </span>
              ))}
            </div>

            <div className="meet-jt-cta-row">
              <a href="#signup" className="btn btn-primary btn-lg">
                Train with JT
              </a>
              <a href="#programs" className="btn btn-outline-navy">
                View Programs
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
