import type { DeviceProfile } from '../foundations/grid.data'

export interface ContentRect { x: number; y: number; width: number; height: number }

// Partition the measured safe rectangle around each known obstruction. Keeping
// the largest remaining rectangle is a conservative single-pane demo policy.
export function mobileContentRect(profile: DeviceProfile): ContentRect | undefined {
  const { window: size, insets } = profile
  let areas: ContentRect[] = [{ x: insets.left, y: insets.top, width: size.width - insets.left - insets.right, height: size.height - insets.top - insets.bottom }]
  for (const region of profile.reservedRegions) {
    areas = areas.flatMap(area => {
      const left = Math.max(area.x, region.x)
      const top = Math.max(area.y, region.y)
      const right = Math.min(area.x + area.width, region.x + region.width)
      const bottom = Math.min(area.y + area.height, region.y + region.height)
      if (left >= right || top >= bottom) return [area]
      return [
        { x: area.x, y: area.y, width: area.width, height: top - area.y },
        { x: area.x, y: bottom, width: area.width, height: area.y + area.height - bottom },
        { x: area.x, y: top, width: left - area.x, height: bottom - top },
        { x: right, y: top, width: area.x + area.width - right, height: bottom - top },
      ].filter(rect => rect.width > 0 && rect.height > 0)
    })
  }
  return areas.sort((a, b) => b.width * b.height - a.width * a.height)[0]
}
