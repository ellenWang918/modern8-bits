import { typography } from './typography.data'
import { Badge } from '../components/Badge/Badge'
import { Card } from '../components/Card/Card'

export function FoundationUsage() {
  return (
    <div className="m8-foundation-usage">
      <p>Figma text styles map to complete CSS roles: family, size, weight, line height, and tracking. Space Grotesk leads; IBM Plex Sans carries product UI; IBM Plex Mono marks metadata and pixel accents.</p>
      <p>Below 672px, hero changes from 72/78 to 48/54, large display from 48/54 to 32/38, and section headings from 32/38 to 28/34. Body and control text retain their size. Fallback fonts preserve the role but can change line wrapping.</p>
      <div className="m8-foundation-usage__type-list">
        {typography.filter(role => !role.name.endsWith('/mobile')).map(role => {
          const token = `--m8-type-${role.name.replaceAll('/', '-')}`
          return (
            <article className="m8-foundation-usage__type" key={role.name}>
              <code>{role.name}</code>
              <p className="m8-foundation-usage__sample" style={{ font: `var(${token}-font)`, letterSpacing: `var(${token}-tracking)` }}>
                {role.family === 'IBM Plex Mono' ? 'Details, with intent.' : 'Build with clarity.'}
              </p>
              <p>{role.family} · {role.weight} · {role.size}/{role.line}px · {Number(role.tracking.toFixed(2))}px tracking</p>
              <code>var({token}-font)</code>
            </article>
          )
        })}
      </div>
      <h3>Responsive layout</h3>
      <p>Use 4 columns and 16px outer gutters below 672px, 8 columns and 24px gutters from 672px, and 12 columns and 32px gutters from 1056px. Ordinary content stops at 1440px. Columns guide alignment; content determines how many a section uses.</p>
      <div className="m8-foundation-usage__grid" aria-label="Responsive column example">
        {Array.from({ length: 12 }, (_, i) => <span key={i}>{i + 1}</span>)}
      </div>
      <p>The documentation's right contents rail moves above the content below 960px; colour-table rows stack below 672px. These documentation-specific adaptations do not change the product layout breakpoints.</p>
      <h3>Supported component mapping</h3>
      <ul>
        <li>Button: small/medium/large map to 32/40/48px. Ordinary labels use Sans; the pixel treatment uses Mono. Use large controls for touch-heavy layouts and allow adequate spacing around compact controls.</li>
        <li>Input: the code component uses Figma's medium 44px input. Figma's small and large options are not exposed by its code API.</li>
        <li>Checkbox: the code component uses the medium 20px box. Small and indeterminate Figma options do not imply code support.</li>
        <li>Card: shared default surface, border, heading, and body roles. Figma's small layout and additional slots differ from the code API.</li>
        <li>Badge: a code component with neutral/strong/pixel treatments. The richer Figma Chip is a separate component; matching a colour role does not establish an interchangeable API.</li>
      </ul>
      <div className="m8-foundation-usage__badges"><Badge>Product UI</Badge><Badge variant="pixel">Pixel detail</Badge></div>
      <Card eyebrow="SHARED ROLES" title="A clear hierarchy">This card uses heading/card, body/base, background/card, and border/card.</Card>
    </div>
  )
}
