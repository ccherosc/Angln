/**
 * ANGLN.COM — Google Sheets Event Loader
 *
 * ─────────────────────────────────────────────────────────────
 * HOW TO CONNECT YOUR GOOGLE SHEET
 * ─────────────────────────────────────────────────────────────
 *
 * 1. Create a Google Sheet with this exact column order in Row 1:
 *
 *    id | title | month | day | year | time | location | address
 *    ageRange | skillLevel | spots | description | tags | program | signupUrl
 *
 * 2. Fill in your events in rows 2, 3, 4, etc.
 *    - skillLevel: enter 1 (Beginner), 2 (Intermediate), or 3 (Advanced)
 *    - tags: separate multiple tags with a pipe character: Beginner|Dock Fishing
 *    - signupUrl: leave blank to use the site's #signup form
 *
 * 3. Publish the sheet:
 *    File → Share → Publish to web → Sheet1 → CSV → Publish
 *
 * 4. Copy the published URL. It looks like:
 *    https://docs.google.com/spreadsheets/d/SHEET_ID/pub?gid=0&single=true&output=csv
 *
 * 5. Add it to your .env file:
 *    VITE_SHEETS_CSV_URL=https://docs.google.com/spreadsheets/d/.../pub?...
 *
 * 6. In EventsSection.jsx, import and call loadEventsFromSheets()
 *    instead of (or as a fallback after) the static events array.
 * ─────────────────────────────────────────────────────────────
 */

const SHEETS_URL = import.meta.env.VITE_SHEETS_CSV_URL

function parseCSV(text) {
  const lines = text.trim().split('\n')
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''))
  return lines.slice(1).map(line => {
    // Handle quoted fields with commas inside
    const values = []
    let current = ''
    let inQuotes = false
    for (let i = 0; i < line.length; i++) {
      const ch = line[i]
      if (ch === '"') {
        inQuotes = !inQuotes
      } else if (ch === ',' && !inQuotes) {
        values.push(current.trim())
        current = ''
      } else {
        current += ch
      }
    }
    values.push(current.trim())

    const obj = {}
    headers.forEach((h, i) => {
      obj[h] = values[i] ?? ''
    })

    // Coerce types
    obj.skillLevel = parseInt(obj.skillLevel, 10) || 1
    obj.spots = parseInt(obj.spots, 10) || 0
    obj.tags = obj.tags ? obj.tags.split('|').map(t => t.trim()) : []
    obj.signupUrl = obj.signupUrl || null

    return obj
  }).filter(evt => evt.id && evt.title)
}

export async function loadEventsFromSheets() {
  if (!SHEETS_URL) {
    console.info('[Angln] No VITE_SHEETS_CSV_URL set — using local event data.')
    return null
  }

  try {
    const res = await fetch(SHEETS_URL)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const text = await res.text()
    return parseCSV(text)
  } catch (err) {
    console.warn('[Angln] Could not load events from Google Sheets:', err.message)
    return null
  }
}
