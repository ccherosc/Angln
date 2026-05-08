const points = [
  {
    icon: '📚',
    title: 'Knowledge Is the Difference',
    text: 'Experienced anglers know that catching fish consistently takes real knowledge — species behavior, seasonal patterns, water temperature, presentation. Angln Academy teaches these fundamentals early so young anglers build a real foundation.',
  },
  {
    icon: '🎯',
    title: 'Structure Accelerates Growth',
    text: 'Without structure, fishing can be frustrating and discouraging. A child who casts wrong for two years builds bad habits. Angln Academy gives young anglers correct mechanics from the start — saving them years of frustration.',
  },
  {
    icon: '🤝',
    title: 'Mentorship Changes Trajectories',
    text: "Most of the best anglers in the country learned from someone who took time with them. Angln Academy creates that mentorship environment for kids who may not have a fishing mentor in their immediate family.",
  },
  {
    icon: '🌱',
    title: 'It Starts at the Bank',
    text: 'Every great tournament angler started at the bank or dock with the basics. The fundamentals learned close to shore — patience, precision, reading water — are the same ones that eventually win tournaments.',
  },
]

export default function WhyAngln() {
  return (
    <section className="why section" id="why">
      <div className="container">
        <div className="why-inner">

          <div className="why-visual reveal">
            <div className="why-image-main">
              <img
                src="/Images/jt-big-bass.jpg"
                alt="JT Such holding a large largemouth bass from a boat — fall fishing on Upstate SC water"
                loading="lazy"
              />
            </div>
            <div className="why-stat-block">
              <span className="why-stat-block-num">100%</span>
              <span className="why-stat-block-label">Bank &amp; Dock Based</span>
            </div>
          </div>

          <div className="why-content">
            <span className="section-label">Why It Matters</span>
            <h2 className="section-title">
              Fishing Looks Simple.<br />
              <span style={{ color: 'var(--blue-light)' }}>It Takes Real Knowledge.</span>
            </h2>
            <p className="section-subtitle" style={{ maxWidth: 'none', marginBottom: '2rem' }}>
              From the outside, fishing looks like relaxing with a rod. Experienced anglers
              know the truth — consistent success takes understanding of species, seasons,
              water, presentation, and patience. Angln Academy gives young anglers a structured
              environment to actually learn those fundamentals.
            </p>

            <div className="why-points">
              {points.map((pt, i) => (
                <div key={i} className="why-point reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                  <div className="why-point-icon">{pt.icon}</div>
                  <div className="why-point-content">
                    <h3 className="why-point-title">{pt.title}</h3>
                    <p className="why-point-text">{pt.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <a href="#signup" className="btn btn-navy">
              Get Started with Angln Academy
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
