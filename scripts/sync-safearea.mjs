/** Import factual measurements from safearea.info; never execute source content. */
import { readFile, writeFile, mkdir, rename } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = fileURLToPath(new URL('../', import.meta.url))
const destination = path.join(root, 'storybook/src/foundations/grid/devices.json')
const args = process.argv.slice(2)
const slug = args[0]
const option = (name) => args.includes(name) ? args[args.indexOf(name) + 1] : undefined
const sourceFile = option('--source-file')
const checkedOn = option('--checked-on') ?? new Date().toISOString().slice(0, 10)

if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !/^\d{4}-\d{2}-\d{2}$/.test(checkedOn)) {
  throw new Error('Usage: node scripts/sync-safearea.mjs <safearea-slug> [--source-file <saved.md>] [--checked-on YYYY-MM-DD]')
}

const source = `https://safearea.info/${slug}`
const reference = `${source}.md`
let markdown
if (sourceFile) markdown = await readFile(path.resolve(sourceFile), 'utf8')
else {
  const response = await fetch(reference, { signal: AbortSignal.timeout(30_000) })
  if (!response.ok) throw new Error(`Reference returned HTTP ${response.status}; existing data is unchanged.`)
  markdown = await response.text()
}
// Some reference responses encode line breaks as literal backslash-n sequences.
markdown = markdown.replaceAll('\\n', '\n').replaceAll('\r', '').replace(/^\uFEFF/, '')
const name = markdown.match(/^# (.+)$/m)?.[1]?.trim()
if (!name || !markdown.includes(`Device page: ${source}`)) throw new Error('Unexpected reference format or device identity; existing data is unchanged.')

const number = (value) => /^\d+(?:\.\d+)? pt$/.test(value ?? '') ? parseFloat(value) : undefined
const size = (value) => {
  const match = value?.match(/^(\d+(?:\.\d+)?) pt × (\d+(?:\.\d+)?) pt$/)
  return match ? { width: Number(match[1]), height: Number(match[2]) } : undefined
}
const idFor = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const sections = markdown.split(/(?=^#{3,4} (?:Portrait|Landscape))/m).slice(1)
const latestSdk = markdown.match(/^## SDK: (.+)$/m)?.[1]
const profiles = []
const omitted = []

for (const section of sections) {
  const heading = section.match(/^#{3,4} (.+)$/m)?.[1]
  if (!heading || (latestSdk && !heading.includes(latestSdk))) continue
  // Stop at the next parent section. Values in another SDK must not leak into a profile.
  const body = section.split(/^#{1,3} (?!Portrait|Landscape)/m)[0]
  const orientation = heading.split(' · ')[0]
  const windows = new Map()
  let windowName = 'fullscreen'
  let regionWindow = 'fullscreen'
  let inRegions = false
  let screen
  const measuredOn = body.match(/^Measured on (.+)\.$/m)?.[1] ?? latestSdk ?? 'Not reported'
  for (const line of body.split('\n').slice(1)) {
    const subheading = line.match(/^#{4,5} (.+)$/)?.[1]
    if (subheading) {
      inRegions = subheading.includes('Reserved Regions')
      const namedWindow = subheading.match(/^(split-left|split-right|fullscreen)(?: ·|$)/)?.[1]
      if (namedWindow) windowName = namedWindow
      if (inRegions) regionWindow = namedWindow ?? 'fullscreen'
      continue
    }
    if (!line.startsWith('|')) continue
    const cells = line.split('|').slice(1, -1).map(cell => cell.trim())
    if (cells[0] === 'Screen size') screen = size(cells[1])
    if (cells[0] === 'Window size') {
      if (windows.has(windowName)) throw new Error(`Ambiguous window in ${heading}; update the importer before writing.`)
      windows.set(windowName, { window: size(cells[1]), insets: {}, safeArea: undefined, reservedRegions: [] })
    }
    const record = windows.get(windowName)
    if (record && cells[0] === 'Safe area size') record.safeArea = size(cells[1])
    const edge = cells[0]?.match(/^(Top|Right|Bottom|Left) inset$/)?.[1]?.toLowerCase()
    if (record && edge) record.insets[edge] = number(cells[1])
    if (inRegions && !['Region', '---'].includes(cells[0])) {
      const coordinates = cells.slice(1).map(number)
      if (coordinates.length !== 4 || coordinates.some(value => value === undefined)) throw new Error(`Unrecognized reserved region in ${heading}.`)
      const target = windows.get(regionWindow)
      if (!target) throw new Error(`Missing window for reserved region in ${heading}.`)
      target.reservedRegions.push({ kind: cells[0], x: coordinates[0], y: coordinates[1], width: coordinates[2], height: coordinates[3] })
    }
  }
  if (!windows.size) omitted.push(heading)
  for (const [windowId, record] of windows) {
    const { window, insets, safeArea, reservedRegions } = record
    if (!screen || !window || !safeArea || ['top', 'right', 'bottom', 'left'].some(edge => insets[edge] === undefined)) {
      omitted.push(`${heading} · ${windowId}`)
      continue
    }
    const validSize = (value) => value.width > 0 && value.height > 0
    if (!validSize(screen) || !validSize(window) || !validSize(safeArea) || Math.abs(window.width - insets.left - insets.right - safeArea.width) > 1 || Math.abs(window.height - insets.top - insets.bottom - safeArea.height) > 1) {
      throw new Error(`Inconsistent safe-area geometry in ${heading}; existing data is unchanged.`)
    }
    for (const region of reservedRegions) {
      if (region.width <= 0 || region.height <= 0 || region.x < 0 || region.y < 0 || region.x + region.width > window.width + 1 || region.y + region.height > window.height + 1) throw new Error(`Reserved region outside its window in ${heading}.`)
    }
    profiles.push({ id: idFor(`${heading}-${windowId}`), label: `${heading}${windowId === 'fullscreen' ? '' : ` · ${windowId}`}`, orientation, windowId, screen, window, insets, reservedRegions, measuredOn })
  }
}

if (!profiles.length || new Set(profiles.map(profile => profile.id)).size !== profiles.length) throw new Error('No complete profiles or duplicate identities; existing data is unchanged.')
let devices = []
try { devices = JSON.parse(await readFile(destination, 'utf8')) } catch (error) { if (error.code !== 'ENOENT') throw error }
const device = { id: slug, name, source, reference, checkedOn, unit: 'pt', scope: latestSdk ? `Latest source SDK only: ${latestSdk}` : 'All measured orientations and display-zoom settings', omittedProfiles: omitted, profiles }
const index = devices.findIndex(item => item.id === slug)
if (index < 0) devices.push(device)
else devices[index] = device
await mkdir(path.dirname(destination), { recursive: true })
await writeFile(`${destination}.tmp`, `${JSON.stringify(devices, null, 2)}\n`, 'utf8')
await rename(`${destination}.tmp`, destination)
console.log(`${name}: imported ${profiles.length} measured window profiles; omitted ${omitted.length} unavailable profiles. Grid documentation updates from this data on the next build.`)
