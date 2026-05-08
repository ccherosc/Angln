import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const puppeteer = require('C:/Users/ccher/AppData/Local/Temp/puppeteer-test/node_modules/puppeteer')

const SHOTS_DIR = 'D:/Project_Angln_4-25-26/temporary screenshots'
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] })
const page = await browser.newPage()
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 })
// Navigate directly to the pricing anchor
await page.goto('http://localhost:5176/#pricing', { waitUntil: 'networkidle0', timeout: 30000 })
await page.evaluate(() => document.fonts.ready)
await new Promise(r => setTimeout(r, 2500))
await page.screenshot({ path: `${SHOTS_DIR}/screenshot-final-pricing-anchor.png`, fullPage: false })
console.log('Done — pricing via anchor hash')
await page.close()
await browser.close()
