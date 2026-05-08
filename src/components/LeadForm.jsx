import { useState } from 'react'

const initialState = {
  parentName: '',
  email: '',
  phone: '',
  childAge: '',
  experience: '',
  program: '',
  message: '',
}

export default function LeadForm() {
  const [form, setForm] = useState(initialState)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    // Replace with your actual form endpoint (Formspree, Netlify Forms, etc.)
    // For now, simulate a short delay and show success state
    await new Promise(resolve => setTimeout(resolve, 900))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <section className="lead-form section" id="signup">
      <div className="lead-form-bg" aria-hidden="true" />
      <div className="container">
        <div className="lead-form-inner">
          <div className="lead-form-left">
            <span className="section-label">Get Started</span>
            <h2 className="section-title">
              Ready to Get<br />
              <span style={{ color: 'var(--gold-light)' }}>Your Angler Started?</span>
            </h2>
            <p className="section-subtitle" style={{ maxWidth: 'none' }}>
              Fill out the form and we'll follow up with upcoming training dates,
              age-appropriate options, and everything you need to know before
              your first session.
            </p>

            <div className="lead-form-bullets">
              <span className="lead-form-bullet">Upcoming training dates &amp; availability</span>
              <span className="lead-form-bullet">Age-appropriate program recommendations</span>
              <span className="lead-form-bullet">What to bring and what to expect</span>
              <span className="lead-form-bullet">Pricing and registration details</span>
              <span className="lead-form-bullet">No commitment required to inquire</span>
            </div>

            <div className="lead-form-reassurance">
              <strong>No spam, ever.</strong> We'll follow up with upcoming training dates,
              age-appropriate options, and what to bring. We respond to every inquiry personally.
            </div>
          </div>

          <div className="form-card">
            {submitted ? (
              <div className="form-success">
                <div className="form-success-icon">🎣</div>
                <h3 className="form-success-title">You're on the Water!</h3>
                <p className="form-success-text">
                  We've received your information and will be in touch soon with
                  upcoming training dates and everything you need to get started.
                  Welcome to the Angln.com community.
                </p>
              </div>
            ) : (
              <>
                <h3 className="form-title">Request Information</h3>
                <p className="form-subtitle">We'll follow up within 1–2 business days.</p>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="form-grid">
                    <div className="form-group full">
                      <label className="form-label" htmlFor="parentName">
                        Parent / Guardian Name <span className="required">*</span>
                      </label>
                      <input
                        id="parentName"
                        name="parentName"
                        type="text"
                        className="form-input"
                        placeholder="John Smith"
                        value={form.parentName}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="email">
                        Email <span className="required">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="form-input"
                        placeholder="you@email.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="phone">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="form-input"
                        placeholder="(864) 555-0100"
                        value={form.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="childAge">
                        Child's Age <span className="required">*</span>
                      </label>
                      <select
                        id="childAge"
                        name="childAge"
                        className="form-select"
                        value={form.childAge}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select age</option>
                        {Array.from({ length: 13 }, (_, i) => i + 6).map(age => (
                          <option key={age} value={age}>{age} years old</option>
                        ))}
                        <option value="18+">18+</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="experience">
                        Experience Level <span className="required">*</span>
                      </label>
                      <select
                        id="experience"
                        name="experience"
                        className="form-select"
                        value={form.experience}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select level</option>
                        <option value="beginner">Beginner — Little to none</option>
                        <option value="some">Some Experience</option>
                        <option value="competitive">Competitive Interest</option>
                      </select>
                    </div>

                    <div className="form-group full">
                      <label className="form-label" htmlFor="program">
                        Interested Program
                      </label>
                      <select
                        id="program"
                        name="program"
                        className="form-select"
                        value={form.program}
                        onChange={handleChange}
                      >
                        <option value="">Not sure yet</option>
                        <option value="first-cast">First Cast Juniors (Grade School)</option>
                        <option value="middle-school">Middle School Angler Development</option>
                        <option value="competitive">Future Competitive Track (Coming Soon)</option>
                        <option value="unsure">Not sure — help me decide</option>
                      </select>
                    </div>

                    <div className="form-group full">
                      <label className="form-label" htmlFor="message">
                        Anything Else We Should Know?
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        className="form-textarea"
                        placeholder="Any questions, scheduling needs, or details about your child's experience..."
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg form-submit"
                    disabled={loading}
                  >
                    {loading ? 'Sending…' : 'Request Information →'}
                  </button>

                  <p className="form-note">
                    No commitment required. We'll reach out with details and let you decide.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
