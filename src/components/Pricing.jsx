const tiers = [
  {
    icon: '🎣',
    title: 'Beginner Clinics',
    range: '$25–$35',
    freq: 'per session',
    desc: 'Single-session group clinics. Perfect for a first experience with no commitment.',
    featured: false,
  },
  {
    icon: '👨‍👧',
    title: 'Parent + Child Session',
    range: '$50–$65',
    freq: 'per session',
    desc: 'Structured hands-on time designed for parent and child to learn together at the bank or dock.',
    featured: false,
  },
  {
    icon: '⭐',
    title: 'Rookie Series',
    range: '$99–$149',
    freq: '4-week program',
    desc: 'The most popular option. Four consecutive sessions building foundational skills with measurable progress.',
    featured: true,
  },
  {
    icon: '📅',
    title: 'Monthly Membership',
    range: '$59–$99',
    freq: '/month',
    desc: 'Ongoing access to clinics, group sessions, and priority registration for special events.',
    featured: false,
  },
  {
    icon: '🎯',
    title: 'Private Coaching',
    range: '$50–$90',
    freq: 'per session',
    desc: 'One-on-one focused instruction tailored entirely to your child\'s current level and goals.',
    featured: false,
  },
  {
    icon: '☀️',
    title: 'Summer Camps',
    range: '$150–$350',
    freq: 'per camp',
    desc: 'Multi-day immersive experiences combining fishing fundamentals, outdoorsmanship, and team building.',
    featured: false,
  },
]

export default function Pricing() {
  return (
    <section className="pricing section" id="pricing">
      <div className="pricing-bg" aria-hidden="true" />
      <div className="container">

        <div className="pricing-header text-center">
          <span className="section-label">Investment</span>
          <h2 className="section-title">
            Straightforward Pricing
          </h2>
          <p className="section-subtitle">
            No hidden fees. No long-term contracts required. Every program is designed
            to be accessible for Upstate South Carolina families.
          </p>
        </div>

        <div className="pricing-grid">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`price-card reveal ${tier.featured ? 'featured' : ''}`}
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              {tier.featured && (
                <span className="price-card-featured-label">Most Popular</span>
              )}
              <span className="price-card-icon">{tier.icon}</span>
              <h3 className="price-card-title">{tier.title}</h3>
              <span className="price-card-range">{tier.range}</span>
              <span className="price-card-freq">{tier.freq}</span>
              <p className="price-card-desc">{tier.desc}</p>
            </div>
          ))}
        </div>

        <p className="pricing-note">
          Tournament entry fees ($20–$40) available as program expands.&nbsp;
          <a href="#signup">Request current availability and exact pricing →</a>
        </p>

      </div>
    </section>
  )
}
