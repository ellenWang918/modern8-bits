import { gridFor } from './grid.data'

export const columnCounts = [4, 8, 12] as const
export type ColumnChoice = 'auto' | '4' | '8' | '12'
export type GridScenario = 'halves' | 'full' | 'thirds' | 'split'

export function columnPolicy(width: number, required?: number, explanation?: string) {
  const rule = gridFor(width)
  const options = columnCounts.map(count => ({
    count,
    allowed: count <= rule.columns && (required === undefined || count === required),
    reason: count > rule.columns ? `This viewport supports at most ${rule.columns} columns.` : required !== undefined && count !== required ? `This layout requires ${required} columns.` : '',
  }))
  return {
    automatic: rule.columns,
    options,
    explanation: explanation ?? `Full-width sections follow the entire grid. Choose up to ${rule.columns} columns at this viewport.`,
    accepts: (value: string): value is ColumnChoice => value === 'auto' || options.some(option => option.allowed && String(option.count) === value),
  }
}

export function scenarioPolicy(width: number, scenario: GridScenario) {
  const rule = gridFor(width)
  if (scenario === 'halves' && width >= 672) return columnPolicy(width, rule.columns, `Two fixed ${rule.columns / 2}-column halves require ${rule.columns} columns. Their spans and proportions stay unchanged.`)
  if ((scenario === 'thirds' || scenario === 'split') && width >= 1056) return columnPolicy(width, 12, scenario === 'thirds' ? 'Three fixed 4-column sections require 12 columns.' : 'The fixed 4 + 8 split requires 12 columns.')
  return columnPolicy(width, undefined, scenario === 'full' ? undefined : `These sections stack at this viewport and span the full grid. Choose up to ${rule.columns} columns.`)
}

export function websiteColumnPolicy(width: number, variant: string) {
  const rule = gridFor(width)
  const reason = width < 672 ? 'The compact header uses explicit positions on 4 columns.' : variant === 'Article' ? `The article positions and ${rule.columns / 2}-column footer halves require ${rule.columns} columns.` : variant === 'Homepage' && width >= 1056 ? 'The homepage combines 6 + 6 halves, 4-column thirds, and a 4 + 8 split. All require 12 columns.' : `The header positions and ${rule.columns / 2}-column contact/footer halves require ${rule.columns} columns.`
  return columnPolicy(width, rule.columns, reason)
}
