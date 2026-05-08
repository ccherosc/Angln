/**
 * Angln Academy — Image Optimization Script
 * Run: node scripts/optimize-images.js  (or  npm run optimize-images)
 *
 * IMPORTANT: All images use .rotate() (no args) first to auto-correct EXIF
 * orientation. iPhone photos have exif_orient=6 (stored as landscape, displayed
 * portrait). Without .rotate() they output sideways.
 */
import sharp from 'sharp'
import { existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SRC = join(__dirname, '..', 'Images')
const OUT = join(__dirname, '..', 'public', 'Images')

if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true })

/**
 * Jobs list.
 * All JPEG sources call .rotate() (auto-EXIF) before resize.
 * Sources with exif_orient=6 (iPhone portrait) become portrait after rotate.
 * Sources with exif_orient=1 (already correct) are unchanged.
 *
 * Source orientations verified:
 *   IMG_2121  4032×3024 exif=6 → portrait 3024×4032 after rotate
 *   IMG_2234  4032×3024 exif=6 → portrait 3024×4032 after rotate
 *   IMG_2958  4032×3024 exif=6 → portrait 3024×4032 after rotate
 *   IMG_3228  1242×2208 exif=1 → portrait already correct
 *   IMG_3477  4032×3024 exif=6 → portrait 3024×4032 after rotate
 *   IMG_6306   970×1641 exif=1 → portrait already correct
 *   IMG_6885  5712×4284 exif=6 → portrait 4284×5712 after rotate
 *   IMG_7132  4032×2268 exif=1 → landscape already correct
 */
const jobs = [
  // ─── HERO DOCK PHOTO ───────────────────────────────────────────────────────
  {
    src: 'IMG_3226.jpeg',
    out: 'hero-dock.jpg',
    rotate: false,
    width: 1200,
    format: 'jpeg',
    options: { quality: 84, progressive: true },
  },
  // ───────────────────────────────────────────────────────────────────────────

  // ─── NEW GALLERY PHOTOS ────────────────────────────────────────────────────
  // Angln_Img1 — portrait, orient=1 (already correct)
  {
    src: 'Angln_Img1.jpeg',
    out: 'angln-img1.jpg',
    rotate: false,
    width: 800,
    format: 'jpeg',
    options: { quality: 84, progressive: true },
  },
  // Angln_Img2 — orient=6 (needs EXIF rotate → portrait)
  {
    src: 'Angln_Img2.jpeg',
    out: 'angln-img2.jpg',
    rotate: true,
    width: 800,
    format: 'jpeg',
    options: { quality: 84, progressive: true },
  },
  // Angln_Img3 — orient=6 (needs EXIF rotate → portrait)
  {
    src: 'Angln_Img3.jpeg',
    out: 'angln-img3.jpg',
    rotate: true,
    width: 800,
    format: 'jpeg',
    options: { quality: 84, progressive: true },
  },
  // ───────────────────────────────────────────────────────────────────────────

  // Logo — keep as-is (PNG, no EXIF rotation)
  {
    src: 'Angln_Logo.png',
    out: 'logo.png',
    rotate: false,
    width: 320,
    format: 'png',
    options: { quality: 90 },
  },

  // Hero background — portrait after EXIF fix (3024×4032 → resized to 1200 wide)
  // Used as CSS background-image with object-fit: cover; works great portrait
  {
    src: 'IMG_2121.JPEG',
    out: 'hero-bg.jpg',
    rotate: true,
    width: 1200,
    format: 'jpeg',
    options: { quality: 82, progressive: true },
  },

  // JT portrait for Meet JT — portrait after EXIF fix, perfect for 3:4 frame
  {
    src: 'IMG_6885.jpeg',
    out: 'jt-portrait.jpg',
    rotate: true,
    width: 800,
    format: 'jpeg',
    options: { quality: 85, progressive: true },
  },

  // JT with bass on boat — portrait after EXIF fix, used in gallery + middle-school card
  {
    src: 'IMG_2234.jpeg',
    out: 'jt-lake.jpg',
    rotate: true,
    width: 800,
    format: 'jpeg',
    options: { quality: 83, progressive: true },
  },

  // Tournament weigh-in — portrait after EXIF fix, gallery
  {
    src: 'IMG_2958.jpeg',
    out: 'jt-tournament-bass.jpg',
    rotate: true,
    width: 800,
    format: 'jpeg',
    options: { quality: 82, progressive: true },
  },

  // Dock/bank fishing — already correct portrait (exif=1), program card
  {
    src: 'IMG_3228.JPG',
    out: 'dock-fishing.jpg',
    rotate: false,
    width: 800,
    format: 'jpeg',
    options: { quality: 85, progressive: true },
  },

  // JT with huge bass — portrait after EXIF fix, Why section
  {
    src: 'IMG_3477.jpeg',
    out: 'jt-big-bass.jpg',
    rotate: true,
    width: 800,
    format: 'jpeg',
    options: { quality: 83, progressive: true },
  },

  // JT + friend on Ranger — already correct portrait (exif=1), community section
  {
    src: 'IMG_6306.JPEG',
    out: 'team-catch.jpg',
    rotate: false,
    width: 900,
    format: 'jpeg',
    options: { quality: 85, progressive: true },
  },

  // MLF tournament — already correct landscape (exif=1), competitive card + gallery
  {
    src: 'IMG_7132.jpeg',
    out: 'mlf-tournament.jpg',
    rotate: false,
    width: 1100,
    format: 'jpeg',
    options: { quality: 84, progressive: true },
  },
]

async function processJob(job) {
  const srcPath = join(SRC, job.src)
  const outPath = join(OUT, job.out)

  let pipeline = sharp(srcPath)

  // Auto-rotate based on EXIF orientation data
  if (job.rotate) {
    pipeline = pipeline.rotate()
  }

  if (job.format === 'jpeg') {
    pipeline = pipeline
      .resize({ width: job.width, withoutEnlargement: true })
      .jpeg(job.options)
  } else if (job.format === 'png') {
    pipeline = pipeline
      .resize({ width: job.width, withoutEnlargement: true })
      .png(job.options)
  }

  const info = await pipeline.toFile(outPath)
  const kb = Math.round(info.size / 1024)
  const rotated = job.rotate ? '↻ EXIF' : '     '
  console.log(`  ${rotated}  ${job.out.padEnd(32)} ${info.width}×${info.height}  ${kb}KB`)
}

console.log('\nAngln Academy — Optimizing images (with EXIF auto-rotate)...\n')
for (const job of jobs) {
  try {
    await processJob(job)
  } catch (err) {
    console.error(`  ✗ ${job.src}: ${err.message}`)
  }
}
console.log('\nDone. Optimized images written to public/Images/\n')
