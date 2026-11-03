import source from './grid/devices.json'

export interface Size { width: number; height: number }
export interface Insets { top: number; right: number; bottom: number; left: number }
export interface ReservedRegion extends Size { kind: string; x: number; y: number }
export interface DeviceProfile {
  id: string
  label: string
  orientation: string
  windowId: string
  screen: Size
  window: Size
  insets: Insets
  reservedRegions: ReservedRegion[]
  measuredOn: string
}
export interface Device {
  id: string
  name: string
  source: string
  reference: string
  checkedOn: string
  unit: string
  scope: string
  omittedProfiles: string[]
  profiles: DeviceProfile[]
}

export const devices: Device[] = source

// Document the existing CSS layout tokens; these are Modern8-bits rules, not
// copies of the reference systems' breakpoint or column values.
export const gridRules = [
  { name: 'Small', min: 0, max: 671, columns: 4, margin: 16, gap: 16, spans: '4 · 2 + 2', purpose: 'One primary content flow' },
  { name: 'Medium', min: 672, max: 1055, columns: 8, margin: 24, gap: 24, spans: '8 · 4 + 4 · 2 + 6', purpose: 'Two panes when content fits' },
  { name: 'Large', min: 1056, max: null, columns: 12, margin: 32, gap: 32, spans: '12 · 6 + 6 · 4 + 4 + 4', purpose: 'Structured multi-column content' },
]

export function gridFor(width: number) {
  return gridRules.find(rule => rule.max !== null && width <= rule.max) ?? gridRules[2]
}

export const references = [
  { name: 'Atlassian · Grid', url: 'https://atlassian.design/foundations/grid', contribution: 'Anatomy, alignment within main content, and choosing constrained or fluid layouts.' },
  { name: 'Carbon · 2x Grid', url: 'https://www.carbondesignsystem.com/building-blocks/foundations/2x-grid/overview', contribution: 'An 8px mini unit and the distinction between fluid columns and fixed-size elements.' },
  { name: 'Material 3 · Layout', url: 'https://m3.material.io/foundations/layout/layout-overview/overview', contribution: 'Adaptive panes, available window space, safety regions, and fold-aware layouts.' },
  { name: 'safearea.info', url: 'https://safearea.info/', contribution: 'Device-specific window measurements, safe-area insets, and reserved regions.' },
]
