/**
 * Section-zoom screenshotter — captures the visible viewport at a specific
 * scroll position to inspect individual sections at readable size.
 * Usage: node screenshot-section.mjs <url> <scrollY> <label>
 */
import { createRequire } from 'module'
import { existsSync, mkdirSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const require = createRequire(import.meta.url)
const puppeteer = require('C:/Users/ccher/AppData/Local/Temp/puppeteer-test/node_modules/puppeteer')

const __dirname = dirname(fileURLToPath(import.meta.url))
const SHOTS_DIR = join(__dirname, 'temporary screenshots')
if (!existsSync(SHOTS_DIR)) mkdirSync(SHOTS_DIR, { recursive: true })

const url    = process.argv[2] || 'http://localhost:5175'
const scrollY = parseInt(process.argv[3] ?? '0')
const label  = process.argv[4] || `scroll${scrollY}`

const existing = readdirSync(SHOTS_DIR).filter(f => f.endsWith('.png'))
const nums = existing.map(f => parseInt(f.match(/^screenshot-(\d+)/)?.[1] ?? '0')).filter(Boolean)
const next = nums.length ? Math.max(...nums) + 1 : 1
const outPath = join(SHOTS_DIR, `screenshot-${next}-${label}.png`)

;(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 })
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 })
  await page.evaluate(() => document.fonts.ready)
  await page.evaluate(y => window.scrollTo(0, y), scrollY)
  await new Promise(r => setTimeout(r, 2000))
  await page.screenshot({ path: outPath, fullPage: false })
  console.log(`Saved: ${outPath}`)
  await browser.close()
})()
