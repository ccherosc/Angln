const values = [
  'Respect the water',
  'Respect the fish',
  'Respect your family',
  'Respect your competitors',
  'Leave places better than you found them',
  'Tell the truth',
  'Help the younger angler',
  'Win with humility',
  'Lose with class',
  'Carry yourself with courtesy, patience, and integrity',
]

export default function CredoSection() {
  return (
    <section className="credo section" id="credo">
      <div className="credo-bg-pattern" aria-hidden="true" />
      <div className="container">
        <div className="credo-inner">
          <div className="credo-eyebrow" aria-hidden="true">
            <span className="credo-line" />
            <span className="credo-eyebrow-text">Our Foundation</span>
            <span className="credo-line right" />
          </div>

          <h2 className="credo-title">
            The Code of the Southern Outdoorsman
          </h2>

          <blockquote className="credo-statement">
            "At Angln.com, we believe fishing is more than catching fish. It is a way to
            teach patience, discipline, responsibility, confidence, and respect. Every young
            angler who trains with us is expected to honor the water, respect others, and
            carry themselves with integrity — on and off the bank."
          </blockquote>

          <p className="credo-values-title">What We Stand For</p>

          <ol className="credo-values" aria-label="Core values">
            {values.map((value, i) => (
              <li key={i} className="credo-value">
                <span className="credo-value-num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="credo-value-text">{value}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
