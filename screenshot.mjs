/**
 * Angln Academy — Screenshot Utility
 * Usage:  node screenshot.mjs <url> [label]
 * Example: node screenshot.mjs http://localhost:5173
 *          node screenshot.mjs http://localhost:5173 mobile
 *
 * Saves to ./temporary screenshots/screenshot-N[-label].png (auto-increments)
 * Puppeteer from C:/Users/ccher/AppData/Local/Temp/puppeteer-test/
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

const url   = process.argv[2] || 'http://localhost:5173'
const label = process.argv[3] || ''

// Find next available N
const existing = readdirSync(SHOTS_DIR).filter(f => f.endsWith('.png'))
const nums = existing.map(f => parseInt(f.match(/^screenshot-(\d+)/)?.[1] ?? '0')).filter(Boolean)
const next = nums.length ? Math.max(...nums) + 1 : 1
const filename = label
  ? `screenshot-${next}-${label}.png`
  : `screenshot-${next}.png`
const outPath = join(SHOTS_DIR, filename)

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
]

if (label === 'mobile') {
  viewports.length = 0
  viewports.push({ name: 'mobile', width: 390, height: 844 })
}

;(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  for (const vp of viewports) {
    const page = await browser.newPage()
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 })
    console.log(`Navigating to ${url} at ${vp.width}×${vp.height}…`)
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 })

    // Wait for images and fonts
    await page.evaluate(() => document.fonts.ready)
    await new Promise(r => setTimeout(r, 800))

    const vpLabel = viewports.length > 1 ? `-${vp.name}` : ''
    const savePath = outPath.replace('.png', `${vpLabel}.png`)
    await page.screenshot({ path: savePath, fullPage: true })
    console.log(`  Saved: ${savePath}`)

    await page.close()
  }

  await browser.close()
  console.log('Done.')
})()
