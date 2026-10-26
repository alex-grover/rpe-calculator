import { mkdir } from 'node:fs/promises'
import { createRequire } from 'node:module'
import path from 'node:path'

const require = createRequire(import.meta.url)
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const sharp = require(
  require.resolve('sharp', {
    paths: [path.join(root, 'node_modules/.pnpm/node_modules'), root],
  }),
)

const source = path.join(root, 'scripts/icon-source.png')
const pub = path.join(root, 'public')
const iconsDir = path.join(pub, 'icons')
const splashDir = path.join(pub, 'splash')
await mkdir(iconsDir, { recursive: true })
await mkdir(splashDir, { recursive: true })

const { data } = await sharp(source).extract({ left: 4, top: 4, width: 1, height: 1 }).raw().toBuffer({ resolveWithObject: true })
const background = { r: data[0], g: data[1], b: data[2], alpha: 1 }
console.log('background', background)

const icons = [
  ['apple-icon.png', 180],
  ['icons/icon-192.png', 192],
  ['icons/icon-512.png', 512],
  ['icon-32x32.png', 32],
]
for (const [file, size] of icons) {
  await sharp(source).resize(size, size).png().toFile(path.join(pub, file))
}

const maskableInner = Math.round(512 * 0.8)
await sharp({ create: { width: 512, height: 512, channels: 4, background } })
  .composite([{ input: await sharp(source).resize(maskableInner, maskableInner).toBuffer(), gravity: 'center' }])
  .png()
  .toFile(path.join(iconsDir, 'icon-maskable-512.png'))

const splashes = [
  [1206, 2622],
  [1320, 2868],
  [1179, 2556],
  [1290, 2796],
  [1170, 2532],
  [1284, 2778],
  [1125, 2436],
]
for (const [w, h] of splashes) {
  const iconSize = Math.round(w * 0.32)
  await sharp({ create: { width: w, height: h, channels: 4, background } })
    .composite([{ input: await sharp(source).resize(iconSize, iconSize).toBuffer(), gravity: 'center' }])
    .png()
    .toFile(path.join(splashDir, `splash-${w}x${h}.png`))
}
console.log('done')
