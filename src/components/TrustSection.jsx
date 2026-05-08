const trustCards = [
  {
    icon: '🛡️',
    color: 'navy',
    title: 'Safety First, Always',
    text: 'Every session is structured with safety as the foundation. Age-appropriate gear, supervised casting, fish-handling guidelines, and water awareness are built into every lesson.',
  },
  {
    icon: '👨‍👧‍👦',
    color: 'blue',
    title: 'Designed for Families',
    text: "Parents are welcome — and encouraged — to participate. Grade school sessions are built around parent-child connection. You're not just dropping them off. You're part of it.",
  },
  {
    icon: '🎯',
    color: 'amber',
    title: 'Structured Instruction',
    text: 'This is not a casual fishing trip. Each training has a defined curriculum: casting mechanics, tackle fundamentals, fish identification, and angler responsibility.',
  },
  {
    icon: '🌱',
    color: 'navy',
    title: 'No Experience Required',
    text: 'We start from scratch. Whether your child has never held a rod or has a few trips under their belt, our First Cast program meets them exactly where they are.',
  },
  {
    icon: '🏆',
    color: 'amber',
    title: 'Character-Building Core',
    text: 'Patience. Respect. Responsibility. Confidence. Fishing is the vehicle — but what young anglers carry away goes far beyond the water.',
  },
  {
    icon: '🤝',
    color: 'blue',
    title: 'Community-Based',
    text: "We are rooted in Greenwood, Greenville, and Upstate South Carolina. This is your community. These are your neighbors. We're building something local and lasting.",
  },
]

export default function TrustSection() {
  return (
    <section className="trust section" id="about">
      <div className="container">
        <div className="trust-header">
          <span className="section-label">For Parents &amp; Families</span>
          <h2 className="trust-header-title">
            More Than a Fishing Lesson
          </h2>
          <p className="section-subtitle">
            When you enroll your child in Angln Academy, you're giving them something
            that can't be found on a screen — time outdoors, earned skills, and a
            community that holds young people to a high standard.
          </p>
        </div>

        <div className="trust-intro reveal">
          <p className="trust-intro-text">
            "You are not just signing your child up for a fishing lesson. You are introducing
            them to patience, responsibility, focus, respect for nature, and time away from
            screens. That matters — and we take it seriously."
          </p>
          <p className="trust-intro-sub">— The Angln Academy Philosophy</p>
        </div>

        <div className="trust-grid">
          {trustCards.map((card, i) => (
            <div key={i} className={`trust-card trust-card--${card.color} reveal`} style={{ transitionDelay: `${i * 0.06}s` }}>
              <div className="trust-card-icon-wrap">
                <span className="trust-card-icon-emoji">{card.icon}</span>
              </div>
              <div className="trust-card-body">
                <h3 className="trust-card-title">{card.title}</h3>
                <p className="trust-card-text">{card.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
