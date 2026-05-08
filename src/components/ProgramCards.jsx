const programs = [
  {
    id: 'first-cast',
    photo: { src: '/Images/dock-fishing.jpg', alt: 'Young angler on a wooden dock holding a bass', position: 'center 20%' },
    badge: { text: 'Open Enrollment', className: 'badge-blue' },
    title: 'First Cast Juniors',
    subtitle: 'Grade School · Ages 6–11 · Parent Participation',
    description:
      "The perfect starting point for young anglers and their parents. First Cast Juniors is a relaxed, fun, and structured introduction to fishing from the bank or dock. No experience needed — just a willingness to learn and have a great time outdoors.",
    features: [
      'Casting basics & rod fundamentals',
      'Hook, line & bait essentials',
      'Simple knot tying',
      'Fish identification & safe handling',
      'Water safety & awareness',
      'Building patience & focus',
    ],
    cta: { text: 'Sign Up', href: '#signup' },
    ctaClass: 'btn-primary',
  },
  {
    id: 'middle-school',
    photo: { src: '/Images/jt-lake.jpg', alt: 'Angler holding a largemouth bass on the water under blue sky', position: 'center 30%' },
    badge: { text: 'Open Enrollment', className: 'badge-blue' },
    title: 'Middle School Angler Development',
    subtitle: 'Middle School · Ages 11–14 · Skill Building',
    description:
      "For young anglers ready to level up. This program moves beyond the basics with structured skill development focused on casting accuracy, understanding fish behavior, lure selection, and developing the mindset of a confident, courteous angler.",
    features: [
      'Casting accuracy & distance',
      'Tackle selection & rigging',
      'Reading water & structure',
      'Seasonal patterns & timing',
      'Lure basics (topwater, soft plastics)',
      'Sportsmanship & competition mindset',
    ],
    cta: { text: 'Sign Up', href: '#signup' },
    ctaClass: 'btn-primary',
  },
  {
    id: 'competitive',
    photo: { src: '/Images/mlf-tournament.jpg', alt: 'JT Such and partner at MLF tournament displaying their catch', position: 'center center' },
    badge: { text: 'Coming Soon', className: 'badge-coming-soon' },
    title: 'Future Competitive Track',
    subtitle: 'High School · Ages 14–18 · Tournament Prep',
    description:
      "The next level is coming. Designed for high school anglers who want to compete, the Competitive Track will prepare young anglers for tournament fishing, team dynamics, college fishing pathways, and a reputation built on skill and integrity.",
    features: [
      'Tournament rules & strategy',
      'Fish care & livewell management',
      'Competitive casting techniques',
      'Team mindset & communication',
      'College fishing pathway guidance',
      'Sponsorship & professionalism',
    ],
    cta: { text: 'Get Notified', href: '#signup' },
    ctaClass: 'btn-outline-navy',
    comingSoon: true,
  },
]

export default function ProgramCards() {
  return (
    <section className="programs section" id="programs">
      <div className="container">
        <div className="programs-header">
          <span className="section-label">Training Programs</span>
          <h2 className="section-title" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.625rem)' }}>
            Built for Every Stage of the Journey
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Whether it's your child's first time holding a rod or they're ready to
            compete — Angln Academy has a structured path forward.
          </p>
        </div>

        <div className="programs-grid">
          {programs.map((prog, i) => (
            <div
              key={prog.id}
              className={`program-card reveal ${prog.comingSoon ? 'coming-soon' : ''}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Real photo header */}
              <div className="program-card-photo">
                <img
                  src={prog.photo.src}
                  alt={prog.photo.alt}
                  style={{ objectPosition: prog.photo.position }}
                  loading="lazy"
                />
                <div className="program-card-photo-overlay" />
              </div>

              <div className="program-card-body">
                <div className="program-card-meta">
                  <span className={`badge ${prog.badge.className}`}>
                    {prog.badge.text}
                  </span>
                </div>
                <h3 className="program-card-title">{prog.title}</h3>
                <p className="program-card-subtitle">{prog.subtitle}</p>
                <p className="program-card-desc">{prog.description}</p>
                <div className="program-card-features">
                  {prog.features.map(f => (
                    <span key={f} className="feature-pill">{f}</span>
                  ))}
                </div>
              </div>

              <div className="program-card-footer">
                <a
                  href={prog.cta.href}
                  className={`btn ${prog.ctaClass}`}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {prog.cta.text}
                </a>
                {prog.comingSoon && (
                  <p style={{ textAlign: 'center', fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
                    Leave your info and be first to know when this program launches.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
