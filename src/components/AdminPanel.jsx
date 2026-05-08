import { useState } from 'react'
import { events as staticEvents } from '../data/events'

const STORAGE_KEY = 'angln_draft_events'
const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']

const BLANK = {
  id: '', title: '', month: 'MAY', day: '', year: new Date().getFullYear().toString(),
  time: '', location: '', address: '', ageRange: 'Ages 6–11',
  skillLevel: '1', spots: '12', description: '', tags: '', program: 'first-cast', signupUrl: '',
}

function load() {
  try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : null }
  catch { return null }
}
function save(evts) { localStorage.setItem(STORAGE_KEY, JSON.stringify(evts)) }
function clear() { localStorage.removeItem(STORAGE_KEY) }

function eventToForm(e) { return { ...e, skillLevel: String(e.skillLevel), spots: String(e.spots), tags: e.tags.join(', ') } }
function formToEvent(f) {
  return {
    ...f,
    id: f.id || `evt-${Date.now()}`,
    skillLevel: parseInt(f.skillLevel) || 1,
    spots: parseInt(f.spots) || 0,
    tags: f.tags.split(',').map(t => t.trim()).filter(Boolean),
    signupUrl: f.signupUrl || null,
  }
}

function generateCode(evts) {
  return `export const events = ${JSON.stringify(evts, null, 2)}\n\nexport const skillLevelLabels = {\n  1: 'Beginner',\n  2: 'Intermediate',\n  3: 'Advanced',\n}\n`
}

const S = {
  page:    { minHeight: '100vh', background: '#0b1c34', color: '#f0f5fa', fontFamily: "'Inter', sans-serif", padding: '0' },
  header:  { background: '#0E2444', borderBottom: '1px solid rgba(196,123,10,0.3)', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' },
  logo:    { fontFamily: "'Oswald', sans-serif", fontSize: '1.25rem', fontWeight: 700, color: '#fff', letterSpacing: '0.06em' },
  sub:     { fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', marginLeft: '0.75rem' },
  homeBtn: { fontSize: '0.8125rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', padding: '0.4rem 0.875rem', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px' },
  body:    { maxWidth: '1000px', margin: '0 auto', padding: '2rem' },
  h2:      { fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '0.25rem' },
  muted:   { fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)', marginBottom: '1.5rem' },
  addBtn:  { background: '#C47B0A', color: '#0E2444', border: 'none', borderRadius: '6px', padding: '0.6rem 1.25rem', fontFamily: "'Oswald', sans-serif", fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer', marginBottom: '1.5rem' },
  table:   { width: '100%', borderCollapse: 'collapse', marginBottom: '2.5rem' },
  th:      { textAlign: 'left', fontSize: '0.6875rem', fontFamily: "'Oswald', sans-serif", fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C47B0A', padding: '0.5rem 0.75rem', borderBottom: '1px solid rgba(255,255,255,0.1)' },
  td:      { padding: '0.875rem 0.75rem', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)', verticalAlign: 'top' },
  editBtn: { background: 'rgba(26,103,174,0.2)', color: '#3C96E4', border: '1px solid rgba(26,103,174,0.35)', borderRadius: '4px', padding: '0.3rem 0.625rem', fontSize: '0.75rem', cursor: 'pointer', marginRight: '0.375rem' },
  delBtn:  { background: 'rgba(200,50,50,0.12)', color: '#E05252', border: '1px solid rgba(200,50,50,0.25)', borderRadius: '4px', padding: '0.3rem 0.625rem', fontSize: '0.75rem', cursor: 'pointer' },
  delConf: { background: '#C0392B', color: '#fff', border: 'none', borderRadius: '4px', padding: '0.3rem 0.625rem', fontSize: '0.75rem', cursor: 'pointer' },
  modal:   { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: '1rem' },
  card:    { background: '#152340', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '2rem', maxWidth: '680px', width: '100%', maxHeight: '90vh', overflowY: 'auto' },
  cardH:   { fontSize: '1.125rem', fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#fff', marginBottom: '1.5rem' },
  grid:    { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
  full:    { gridColumn: '1 / -1' },
  label:   { display: 'block', fontSize: '0.6875rem', fontFamily: "'Oswald', sans-serif", fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '0.3rem' },
  input:   { width: '100%', padding: '0.625rem 0.875rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#f0f5fa', fontSize: '0.9375rem', boxSizing: 'border-box' },
  textarea:{ width: '100%', padding: '0.625rem 0.875rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#f0f5fa', fontSize: '0.9375rem', minHeight: '80px', resize: 'vertical', boxSizing: 'border-box' },
  select:  { width: '100%', padding: '0.625rem 0.875rem', background: '#152340', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#f0f5fa', fontSize: '0.9375rem', boxSizing: 'border-box' },
  row:     { display: 'flex', gap: '0.75rem', marginTop: '1.5rem', justifyContent: 'flex-end' },
  saveBtn: { background: '#C47B0A', color: '#0E2444', border: 'none', borderRadius: '6px', padding: '0.7rem 1.5rem', fontFamily: "'Oswald', sans-serif", fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer' },
  cancelBtn:{ background: 'transparent', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0.7rem 1.25rem', fontSize: '0.875rem', cursor: 'pointer' },
  codeBox: { background: '#091522', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '1.25rem', fontFamily: 'monospace', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.7)', overflowX: 'auto', whiteSpace: 'pre', maxHeight: '300px', overflowY: 'auto', marginTop: '1rem' },
  copyBtn: { background: '#1A67AE', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.6rem 1.25rem', fontFamily: "'Oswald', sans-serif", fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer', marginTop: '0.75rem' },
  info:    { background: 'rgba(196,123,10,0.1)', border: '1px solid rgba(196,123,10,0.25)', borderRadius: '8px', padding: '1.25rem 1.5rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', marginBottom: '1.5rem' },
  step:    { display: 'flex', gap: '0.875rem', marginBottom: '0.875rem', alignItems: 'flex-start' },
  stepNum: { background: '#C47B0A', color: '#0E2444', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0, marginTop: '0.125rem' },
  code:    { background: 'rgba(255,255,255,0.08)', padding: '0.125rem 0.4rem', borderRadius: '3px', fontFamily: 'monospace', fontSize: '0.8125rem' },
  divider: { border: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', margin: '2.5rem 0' },
  badge:   { display: 'inline-block', padding: '0.2rem 0.625rem', borderRadius: '999px', fontSize: '0.6875rem', fontFamily: "'Oswald', sans-serif", fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' },
  note:    { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '1rem 1.25rem', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.5)', marginTop: '2rem', lineHeight: '1.6' },
}

export default function AdminPanel() {
  const [events, setEvents] = useState(() => load() || [...staticEvents])
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState(BLANK)
  const [showForm, setShowForm] = useState(false)
  const [delConfirm, setDelConfirm] = useState(null)
  const [copied, setCopied] = useState(false)
  const [showCode, setShowCode] = useState(false)
  const [tab, setTab] = useState('events')
  const isCustom = !!load()

  function openAdd() { setForm(BLANK); setEditId(null); setShowForm(true) }
  function openEdit(e) { setForm(eventToForm(e)); setEditId(e.id); setShowForm(true) }

  function handleDelete(id) {
    if (delConfirm === id) {
      const updated = events.filter(e => e.id !== id)
      setEvents(updated); save(updated); setDelConfirm(null)
    } else { setDelConfirm(id) }
  }

  function handleSave() {
    const evt = formToEvent(form)
    const updated = editId ? events.map(e => e.id === editId ? evt : e) : [...events, evt]
    setEvents(updated); save(updated); setShowForm(false); setEditId(null); setForm(BLANK)
  }

  function handleCopyCode() {
    navigator.clipboard.writeText(generateCode(events)).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500) })
  }

  function handleReset() {
    if (window.confirm('Reset to original events.js data? Your local changes will be lost.')) {
      clear(); setEvents([...staticEvents])
    }
  }

  function fc(name) { return e => setForm(f => ({ ...f, [name]: e.target.value })) }

  const tabStyle = (t) => ({
    padding: '0.5rem 1.125rem', fontFamily: "'Oswald', sans-serif", fontSize: '0.8125rem',
    fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer',
    border: 'none', borderRadius: '6px 6px 0 0',
    background: tab === t ? 'rgba(255,255,255,0.08)' : 'transparent',
    color: tab === t ? '#fff' : 'rgba(255,255,255,0.45)',
    borderBottom: tab === t ? '2px solid #C47B0A' : '2px solid transparent',
  })

  return (
    <div style={S.page}>
      {/* Header */}
      <div style={S.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={S.logo}>ANGLN <span style={{ color: '#C47B0A' }}>ADMIN</span></span>
          <span style={S.sub}>Event Manager</span>
          {isCustom && (
            <span style={{ ...S.badge, background: 'rgba(196,123,10,0.15)', color: '#E49E20', marginLeft: '0.5rem' }}>
              Custom events active
            </span>
          )}
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {isCustom && (
            <button onClick={handleReset} style={{ ...S.cancelBtn, fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}>
              Reset to defaults
            </button>
          )}
          <a href="/" style={S.homeBtn}>← Back to Site</a>
        </div>
      </div>

      <div style={S.body}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <button style={tabStyle('events')} onClick={() => setTab('events')}>Events</button>
          <button style={tabStyle('sheets')} onClick={() => setTab('sheets')}>Google Sheets Setup</button>
        </div>

        {/* ── EVENTS TAB ── */}
        {tab === 'events' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <div style={S.h2}>Training Events</div>
                <div style={S.muted}>{events.length} event{events.length !== 1 ? 's' : ''} · Changes here are local only — see "Save to File" below</div>
              </div>
              <button style={S.addBtn} onClick={openAdd}>+ Add Event</button>
            </div>

            {events.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.9375rem' }}>
                No events yet. Click "Add Event" to create one.
              </div>
            ) : (
              <table style={S.table}>
                <thead>
                  <tr>
                    <th style={S.th}>Date</th>
                    <th style={S.th}>Title</th>
                    <th style={S.th}>Location</th>
                    <th style={S.th}>Spots</th>
                    <th style={S.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map(evt => (
                    <tr key={evt.id}>
                      <td style={S.td}>
                        <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, color: '#C47B0A' }}>
                          {evt.month} {evt.day}
                        </span>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginTop: '0.125rem' }}>{evt.year}</span>
                      </td>
                      <td style={S.td}>
                        <div style={{ fontWeight: 500 }}>{evt.title}</div>
                        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.125rem' }}>{evt.ageRange}</div>
                      </td>
                      <td style={{ ...S.td, maxWidth: '200px' }}>
                        <div>{evt.location}</div>
                        {evt.address && <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.125rem' }}>{evt.address}</div>}
                      </td>
                      <td style={S.td}>{evt.spots}</td>
                      <td style={S.td}>
                        <button style={S.editBtn} onClick={() => openEdit(evt)}>Edit</button>
                        <button
                          style={delConfirm === evt.id ? S.delConf : S.delBtn}
                          onClick={() => handleDelete(evt.id)}
                        >
                          {delConfirm === evt.id ? 'Confirm?' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <hr style={S.divider} />

            {/* Save to File */}
            <div style={{ ...S.h2, fontSize: '1.125rem', marginBottom: '0.375rem' }}>Save to File</div>
            <p style={S.muted}>Copy this code and paste it into <code style={S.code}>src/data/events.js</code> to make your changes permanent.</p>

            <button style={{ ...S.copyBtn, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => { setShowCode(!showCode); if (!showCode) {} }}>
              {showCode ? 'Hide Code' : 'Show Generated Code'}
            </button>

            {showCode && (
              <>
                <div style={S.codeBox}>{generateCode(events)}</div>
                <button style={{ ...S.copyBtn, marginLeft: '0.75rem' }} onClick={handleCopyCode}>
                  {copied ? '✓ Copied!' : 'Copy to Clipboard'}
                </button>
              </>
            )}

            <div style={S.note}>
              <strong style={{ color: 'rgba(255,255,255,0.7)' }}>How this works:</strong> Changes you make here are saved in your browser's local storage. To update the live site, copy the generated code above and replace the contents of <code style={S.code}>src/data/events.js</code>, then redeploy. For live updates without redeploying, use the Google Sheets option.
            </div>
          </>
        )}

        {/* ── GOOGLE SHEETS TAB ── */}
        {tab === 'sheets' && (
          <>
            <div style={S.h2}>Connect Google Sheets</div>
            <p style={{ ...S.muted, marginBottom: '1.5rem' }}>Update events from your phone or computer — no code editing, no redeployment needed.</p>

            <div style={S.info}>
              <strong style={{ color: '#E49E20' }}>How it works:</strong> Publish your event list as a Google Sheet. The site will automatically load events from it every time someone visits. Edit the sheet → refresh the page → done.
            </div>

            <div style={{ ...S.h2, fontSize: '1.125rem', marginBottom: '1.25rem' }}>Setup Steps</div>

            {[
              ['Create a Google Sheet', <>Go to <a href="https://sheets.google.com" target="_blank" rel="noopener noreferrer" style={{ color: '#3C96E4' }}>sheets.google.com</a> and create a new blank spreadsheet. Name it "Angln Academy Events".</>],
              ['Add these column headers in Row 1', <>Type each of these in the first row: <code style={S.code}>id</code> · <code style={S.code}>title</code> · <code style={S.code}>month</code> · <code style={S.code}>day</code> · <code style={S.code}>year</code> · <code style={S.code}>time</code> · <code style={S.code}>location</code> · <code style={S.code}>address</code> · <code style={S.code}>ageRange</code> · <code style={S.code}>skillLevel</code> · <code style={S.code}>spots</code> · <code style={S.code}>description</code> · <code style={S.code}>tags</code> · <code style={S.code}>program</code> · <code style={S.code}>signupUrl</code></>],
              ['Add your events starting at Row 2', <>For each event, fill in the columns. For <code style={S.code}>month</code> use 3-letter caps (MAY, JUN, JUL…). For <code style={S.code}>skillLevel</code> use 1, 2, or 3. For <code style={S.code}>tags</code> separate with semicolons (Beginner;Parent Friendly).</>],
              ['Publish the sheet as CSV', <>Click <strong style={{ color: '#fff' }}>File → Share → Publish to web</strong>. Under "Link", set the first dropdown to the Sheet tab name, second dropdown to <strong style={{ color: '#fff' }}>Comma-separated values (.csv)</strong>. Click <strong style={{ color: '#fff' }}>Publish</strong> and copy the URL.</>],
              ['Add the URL to your .env file', <>Open the file <code style={S.code}>.env</code> in your project folder (create it if it doesn't exist). Add this line:<br /><code style={{ ...S.code, display: 'block', marginTop: '0.5rem', padding: '0.5rem 0.75rem', background: 'rgba(0,0,0,0.3)' }}>VITE_SHEETS_CSV_URL=https://docs.google.com/spreadsheets/d/...</code></>],
              ['Redeploy once', 'After adding the env var you need to redeploy once to pick it up. After that, any edits to the sheet show up on the live site automatically without redeploying.'],
            ].map(([title, desc], i) => (
              <div key={i} style={S.step}>
                <div style={S.stepNum}>{i + 1}</div>
                <div>
                  <div style={{ fontWeight: 600, color: '#fff', marginBottom: '0.25rem' }}>{title}</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', lineHeight: '1.6' }}>{desc}</div>
                </div>
              </div>
            ))}

            <div style={{ ...S.info, marginTop: '2rem' }}>
              <strong style={{ color: '#E49E20' }}>Month format reference:</strong><br />
              <span style={{ fontFamily: 'monospace', fontSize: '0.8125rem' }}>JAN · FEB · MAR · APR · MAY · JUN · JUL · AUG · SEP · OCT · NOV · DEC</span>
            </div>
          </>
        )}
      </div>

      {/* ── EVENT FORM MODAL ── */}
      {showForm && (
        <div style={S.modal} onClick={e => { if (e.target === e.currentTarget) { setShowForm(false); setEditId(null) } }}>
          <div style={S.card}>
            <div style={S.cardH}>{editId ? 'Edit Event' : 'New Event'}</div>
            <div style={S.grid}>
              <div style={S.full}>
                <label style={S.label}>Event Title *</label>
                <input style={S.input} value={form.title} onChange={fc('title')} placeholder="First Cast Family Clinic" />
              </div>
              <div>
                <label style={S.label}>Month</label>
                <select style={S.select} value={form.month} onChange={fc('month')}>
                  {MONTHS.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label style={S.label}>Day *</label>
                <input style={S.input} value={form.day} onChange={fc('day')} placeholder="10" />
              </div>
              <div>
                <label style={S.label}>Year</label>
                <input style={S.input} value={form.year} onChange={fc('year')} />
              </div>
              <div>
                <label style={S.label}>Time *</label>
                <input style={S.input} value={form.time} onChange={fc('time')} placeholder="8:00 AM – 11:00 AM" />
              </div>
              <div style={S.full}>
                <label style={S.label}>Location Name *</label>
                <input style={S.input} value={form.location} onChange={fc('location')} placeholder="Lake Greenwood State Park" />
              </div>
              <div style={S.full}>
                <label style={S.label}>Address / Area</label>
                <input style={S.input} value={form.address} onChange={fc('address')} placeholder="Ninety Six, SC · Bank & Dock" />
              </div>
              <div>
                <label style={S.label}>Age Range</label>
                <input style={S.input} value={form.ageRange} onChange={fc('ageRange')} placeholder="Ages 6–11" />
              </div>
              <div>
                <label style={S.label}>Spots Available</label>
                <input style={S.input} type="number" value={form.spots} onChange={fc('spots')} min="0" />
              </div>
              <div>
                <label style={S.label}>Skill Level</label>
                <select style={S.select} value={form.skillLevel} onChange={fc('skillLevel')}>
                  <option value="1">1 — Beginner</option>
                  <option value="2">2 — Intermediate</option>
                  <option value="3">3 — Advanced</option>
                </select>
              </div>
              <div>
                <label style={S.label}>Program</label>
                <select style={S.select} value={form.program} onChange={fc('program')}>
                  <option value="first-cast">First Cast</option>
                  <option value="middle-school">Middle School</option>
                  <option value="competitive">Competitive Track</option>
                </select>
              </div>
              <div style={S.full}>
                <label style={S.label}>Tags (comma-separated)</label>
                <input style={S.input} value={form.tags} onChange={fc('tags')} placeholder="Beginner, Parent Friendly, Rod Provided" />
              </div>
              <div style={S.full}>
                <label style={S.label}>Description *</label>
                <textarea style={S.textarea} value={form.description} onChange={fc('description')} placeholder="A short description of what participants will learn and do." />
              </div>
              <div style={S.full}>
                <label style={S.label}>Signup URL (optional)</label>
                <input style={S.input} value={form.signupUrl} onChange={fc('signupUrl')} placeholder="Leave blank to use the site's contact form" />
              </div>
            </div>
            <div style={S.row}>
              <button style={S.cancelBtn} onClick={() => { setShowForm(false); setEditId(null) }}>Cancel</button>
              <button style={S.saveBtn} onClick={handleSave} disabled={!form.title || !form.day || !form.time || !form.location}>
                {editId ? 'Save Changes' : 'Add Event'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
