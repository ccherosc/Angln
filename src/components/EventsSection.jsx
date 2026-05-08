import { useState, useEffect } from 'react'
import { events as staticEvents, skillLevelLabels } from '../data/events'
import { loadEventsFromSheets } from '../utils/sheetsLoader'

function SkillDots({ level }) {
  return (
    <div className="skill-dots" aria-label={`Skill level: ${skillLevelLabels[level] ?? 'Beginner'}`}>
      {[1, 2, 3].map(n => (
        <span key={n} className={`skill-dot ${n <= level ? 'active' : ''}`} />
      ))}
    </div>
  )
}

function EventCard({ evt }) {
  const href = evt.signupUrl || '#signup'
  const isExternal = !!evt.signupUrl

  return (
    <article className="event-card">
      <div className="event-card-top">
        <div className="event-date-badge">
          <span className="event-date-month">{evt.month}</span>
          <span className="event-date-day">{evt.day}</span>
        </div>
        <div className="event-spots">
          <span className="event-spots-number">{evt.spots}</span>
          <span className="event-spots-label">spots left</span>
        </div>
      </div>

      <div className="event-card-body">
        <h3 className="event-title">{evt.title}</h3>

        <div className="event-meta">
          <div className="event-meta-row">
            <span className="event-meta-icon">🕐</span>
            <span>{evt.time}</span>
          </div>
          <div className="event-meta-row">
            <span className="event-meta-icon">📍</span>
            <span>{evt.location}</span>
          </div>
          {evt.address && (
            <div className="event-meta-row">
              <span className="event-meta-icon"> </span>
              <span style={{ fontSize: '0.75rem', opacity: 0.65 }}>{evt.address}</span>
            </div>
          )}
          <div className="event-meta-row">
            <span className="event-meta-icon">👤</span>
            <span>{evt.ageRange}</span>
          </div>
        </div>

        <div className="event-tags">
          {evt.tags.map(tag => (
            <span key={tag} className="event-tag">{tag}</span>
          ))}
        </div>

        <p className="event-desc">{evt.description}</p>
      </div>

      <div className="event-card-footer">
        <div className="event-skill-level">
          <SkillDots level={evt.skillLevel} />
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)' }}>
            {skillLevelLabels[evt.skillLevel] ?? 'Beginner'}
          </span>
        </div>
        <a
          href={href}
          className="btn btn-primary btn-sm"
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {evt.spots > 0 ? 'Sign Up' : 'Request Info'}
        </a>
      </div>
    </article>
  )
}

export default function EventsSection() {
  const [displayEvents, setDisplayEvents] = useState(staticEvents)

  useEffect(() => {
    loadEventsFromSheets().then(sheetEvents => {
      if (sheetEvents && sheetEvents.length > 0) {
        setDisplayEvents(sheetEvents)
      }
    })
  }, [])

  return (
    <section className="events section" id="events">
      <div className="container">
        <div className="events-header">
          <div className="events-header-left">
            <span className="section-label">Upcoming Sessions</span>
            <h2 className="section-title">Training Calendar</h2>
            <p className="section-subtitle">
              All sessions are bank or dock-based beginner trainings. Spots are limited
              to keep instruction focused. Register early.
            </p>
          </div>
          <a href="#signup" className="btn btn-primary">
            Request More Info
          </a>
        </div>

        <div className="events-grid">
          {displayEvents.length === 0 ? (
            <div className="events-empty-state">
              <p style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>🎣</p>
              <p>New sessions are being scheduled — check back soon or request info below.</p>
            </div>
          ) : (
            displayEvents.map(evt => <EventCard key={evt.id} evt={evt} />)
          )}
        </div>

        <div className="events-sheets-note">
          <span style={{ fontSize: '1.25rem' }}>📋</span>
          <p className="events-sheets-note-text">
            <strong>Site Admin:</strong> Events are editable via a connected Google Sheet.
            See <code style={{ opacity: 0.7, fontSize: '0.8125rem' }}>src/utils/sheetsLoader.js</code> for
            setup instructions — no code changes needed to add or update sessions.
          </p>
        </div>
      </div>
    </section>
  )
}
