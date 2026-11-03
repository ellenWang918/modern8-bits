import { copyFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = fileURLToPath(new URL('../', import.meta.url))
const publicDir = path.join(root, 'storybook/public')
await mkdir(publicDir, { recursive: true })
await copyFile(path.join(root, 'docs/agents/grid-devices.md'), path.join(publicDir, 'grid-devices.md'))
await copyFile(path.join(root, 'storybook/src/foundations/grid/devices.json'), path.join(publicDir, 'grid-devices.json'))
console.log('Grid device guide and measurement downloads are ready.')
