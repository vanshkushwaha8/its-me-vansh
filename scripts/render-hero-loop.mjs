// Renders scripts/ambient-loop.html into public/media/hero-loop.webm and hero-poster.jpg.
// Usage: node scripts/render-hero-loop.mjs <path-to-playwright-ffmpeg> (needs `playwright` resolvable)
import { chromium } from 'playwright'
import { spawn } from 'node:child_process'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ffmpeg = process.argv[2]
const FPS = 24, W = 1920, H = 1080

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH })
const page = await browser.newPage({ viewport: { width: W, height: H } })
await page.goto(pathToFileURL(path.join(root, 'scripts/ambient-loop.html')).href)
const loop = await page.evaluate(() => window.LOOP)

await page.evaluate(() => window.draw(0))
await page.screenshot({ path: path.join(root, 'public/media/hero-poster.jpg'), type: 'jpeg', quality: 80 })

const enc = spawn(ffmpeg, ['-hide_banner', '-y', '-f', 'image2pipe', '-c:v', 'mjpeg', '-framerate', String(FPS), '-i', 'pipe:0',
  '-c:v', 'libvpx-vp9', '-b:v', '1400k', '-deadline', 'good', '-cpu-used', '2', '-pix_fmt', 'yuv420p', '-an',
  path.join(root, 'public/media/hero-loop.webm')], { stdio: ['pipe', 'inherit', 'inherit'] })
for (let f = 0; f < loop * FPS; f++) {
  await page.evaluate((t) => window.draw(t), f / FPS)
  enc.stdin.write(await page.screenshot({ type: 'jpeg', quality: 92 }))
}
enc.stdin.end()
await new Promise((r) => enc.on('close', r))
await browser.close()
