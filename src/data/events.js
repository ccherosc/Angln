/**
 * ANGLN.COM — Event Data
 *
 * HOW TO UPDATE EVENTS:
 * Option A (Manual): Edit this array directly and redeploy.
 * Option B (Google Sheets): See src/utils/sheetsLoader.js for instructions
 *   on publishing your Google Sheet and connecting it to live-load events.
 *
 * Each event object fields:
 *   id          — unique string
 *   title       — event name
 *   month       — 3-letter month abbreviation (e.g. "MAY")
 *   day         — day number as string (e.g. "10")
 *   year        — 4-digit year string
 *   time        — display string (e.g. "8:00 AM – 11:00 AM")
 *   location    — venue name
 *   address     — street address or lake/area description
 *   ageRange    — string (e.g. "Ages 6–11")
 *   skillLevel  — 1 | 2 | 3  (1=Beginner, 2=Intermediate, 3=Advanced)
 *   spots       — number of remaining spots
 *   description — 1–2 sentence description
 *   tags        — string array (e.g. ["Beginner", "Parent Friendly"])
 *   program     — "first-cast" | "middle-school" | "competitive"
 *   signupUrl   — optional external signup link; falls back to #signup
 */
export const events = [
  {
    id: 'evt-001',
    title: 'First Cast Family Clinic',
    month: 'MAY',
    day: '10',
    year: '2025',
    time: '8:00 AM – 11:00 AM',
    location: 'Lake Greenwood State Park',
    address: 'Ninety Six, SC · Bank & Dock',
    ageRange: 'Ages 6–11',
    skillLevel: 1,
    spots: 14,
    description:
      'A beginner-friendly morning on the bank for grade school kids and their parents. We cover casting, bait basics, knot tying, and fish-handling — all from the shore. Rods provided.',
    tags: ['Beginner', 'Parent Friendly', 'Rod Provided'],
    program: 'first-cast',
    signupUrl: null,
  },
  {
    id: 'evt-002',
    title: 'Dock Fishing Fundamentals',
    month: 'MAY',
    day: '24',
    year: '2025',
    time: '7:30 AM – 10:30 AM',
    location: 'Greenwood Marina Dock Area',
    address: 'Greenwood, SC · Dock Access',
    ageRange: 'Ages 8–14',
    skillLevel: 1,
    spots: 10,
    description:
      "Learn how to fish effectively from a dock: structure, depth, presentation, and patience. Great for first-timers and kids who've been out before but want more structure.",
    tags: ['Beginner', 'Dock Fishing', 'All Welcome'],
    program: 'first-cast',
    signupUrl: null,
  },
  {
    id: 'evt-003',
    title: 'Middle School Angler Skills Lab',
    month: 'JUN',
    day: '7',
    year: '2025',
    time: '7:00 AM – 11:00 AM',
    location: 'Lake Greenwood — South Cove Access',
    address: 'Hodges, SC · Bank Fishing',
    ageRange: 'Ages 11–14',
    skillLevel: 2,
    spots: 8,
    description:
      'A focused skills session for middle school anglers ready to build beyond the basics. Casting accuracy drills, tackle rigging, and reading water structure on a productive stretch of Lake Greenwood.',
    tags: ['Intermediate', 'Skills Lab', 'Lake Greenwood'],
    program: 'middle-school',
    signupUrl: null,
  },
]

export const skillLevelLabels = {
  1: 'Beginner',
  2: 'Intermediate',
  3: 'Advanced',
}
