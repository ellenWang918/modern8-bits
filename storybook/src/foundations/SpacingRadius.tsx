import type { CSSProperties } from 'react'
import { Button } from '../components/Button/Button'
import './spacing-radius.css'

const spacingTokens = [
  { name: 'space/1', value: '4px', cssVar: '--m8-space-1', use: 'Fine alignment, icon gaps' },
  { name: 'space/2', value: '8px', cssVar: '--m8-space-2', use: 'Base unit, compact gaps' },
  { name: 'space/3', value: '12px', cssVar: '--m8-space-3', use: 'Tight control padding' },
  { name: 'space/4', value: '16px', cssVar: '--m8-space-4', use: 'Standard control and card padding' },
  { name: 'space/5', value: '24px', cssVar: '--m8-space-6', use: 'Component gaps and form rows' },
  { name: 'space/6', value: '32px', cssVar: '--m8-space-8', use: 'Section spacing and modal padding' },
  { name: 'space/7', value: '48px', cssVar: '--m8-space-12', use: 'Page rhythm and hero margins' },
  { name: 'space/8', value: '80px', cssVar: '--m8-space-20', use: 'Major section separation' },
]

const radiusTokens = [
  { name: 'radius/sm', value: '4px', cssVar: '--m8-radius-sm', use: 'Compact controls and subtle softening' },
  { name: 'radius/md', value: '8px', cssVar: '--m8-radius-md', use: 'Cards and larger containers' },
  { name: 'radius/lg', value: '12px', cssVar: '--m8-radius-lg', use: 'Panels, drawers and large containers' },
  { name: 'radius/full', value: '9999px', cssVar: '--m8-radius-full', use: 'Chips (pill), avatars, badges' },
]

type TokenStyle = CSSProperties & { '--token-size'?: string; '--token-radius'?: string }

function SpacingCard({ token }: { token: (typeof spacingTokens)[number] }) {
  return (
    <article className="foundation-token-card">
      <div className="foundation-token-card__preview foundation-token-card__preview--spacing">
        <span className="foundation-token-card__spacing-swatch" style={{ '--token-size': `var(${token.cssVar})` } as TokenStyle} />
      </div>
      <div className="foundation-token-card__details">
        <code className="foundation-token-card__name">{token.name}</code>
        <span className="foundation-token-card__value">{token.value}</span>
        <code className="foundation-token-card__variable">var({token.cssVar})</code>
        <span className="foundation-token-card__use">{token.use}</span>
      </div>
    </article>
  )
}

function RadiusCard({ token }: { token: (typeof radiusTokens)[number] }) {
  return (
    <article className="foundation-token-card">
      <div className="foundation-token-card__preview foundation-token-card__preview--radius">
        <span className="foundation-token-card__radius-swatch" style={{ '--token-radius': `var(${token.cssVar})` } as TokenStyle} />
      </div>
      <div className="foundation-token-card__details">
        <code className="foundation-token-card__name">{token.name}</code>
        <span className="foundation-token-card__value">{token.value}</span>
        <span className="foundation-token-card__use">{token.use}</span>
      </div>
    </article>
  )
}

function SpaceBand({ token, value }: { token: string; value: string }) {
  return (
    <div className="spacing-application__band" style={{ '--token-size': `var(${token})` } as TokenStyle}>
      <code>{value}</code>
      <span />
    </div>
  )
}

export function SpacingRadius() {
  return (
    <main className="foundation-sheet">
      <header className="foundation-sheet__header">
        <div className="foundation-sheet__masthead">
          <span>MODERN8-BITS&nbsp; / &nbsp;FOUNDATIONS</span>
          <span>SPACING</span>
        </div>
        <div className="foundation-sheet__hero">
          <div>
            <h1>Spacing &amp; Radius</h1>
            <p>A measured scale for rhythm and shape. Every specimen is linked to a live Figma variable.</p>
          </div>
          <p className="foundation-sheet__note">USE THE TOKEN.<br />KEEP THE RHYTHM.</p>
        </div>
      </header>

      <section className="foundation-sheet__section" aria-labelledby="spacing-title">
        <p className="foundation-sheet__index">01&nbsp;&nbsp; SPACING</p>
        <div className="foundation-sheet__section-heading">
          <h2 id="spacing-title">A consistent 4px rhythm.</h2>
          <p>Bar width equals its token value. Use the scale for padding, gaps and section rhythm.</p>
        </div>
        <div className="foundation-token-grid foundation-token-grid--spacing">
          {spacingTokens.map((token) => <SpacingCard key={token.name} token={token} />)}
        </div>
      </section>

      <section className="foundation-sheet__section" aria-labelledby="radius-title">
        <p className="foundation-sheet__index">02&nbsp;&nbsp; RADIUS</p>
        <div className="foundation-sheet__section-heading">
          <h2 id="radius-title">Softness, used with intent.</h2>
          <p>Shape previews are bound to their radius variables. Keep primary silhouettes crisp.</p>
        </div>
        <div className="foundation-token-grid foundation-token-grid--radius">
          {radiusTokens.map((token) => <RadiusCard key={token.name} token={token} />)}
        </div>
      </section>

      <section className="foundation-sheet__section foundation-sheet__section--application" aria-labelledby="application-title">
        <p className="foundation-sheet__index">03&nbsp;&nbsp; APPLY THE SCALE</p>
        <div className="foundation-sheet__section-heading">
          <h2 id="application-title">Inset, gap, section.</h2>
          <p>Use spacing tokens for consistent inset, vertical rhythm, and separation.</p>
        </div>
        <div className="spacing-application">
          <div className="spacing-application__content">
            <SpaceBand token="--m8-space-12" value="$spacing-7" />
            <p className="spacing-application__label">Optional label</p>
            <SpaceBand token="--m8-space-2" value="$spacing-2" />
            <h3>Example of spacing tokens applied</h3>
            <SpaceBand token="--m8-space-6" value="$spacing-5" />
            <h4>Section heading</h4>
            <SpaceBand token="--m8-space-3" value="$spacing-3" />
            <p className="spacing-application__body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <SpaceBand token="--m8-space-6" value="$spacing-5" />
            <Button>Button</Button>
            <SpaceBand token="--m8-space-20" value="$spacing-8" />
          </div>
        </div>
      </section>

      <footer className="foundation-sheet__footer">MODERN8-BITS&nbsp; / &nbsp;FOUNDATIONS&nbsp; / &nbsp;SPACING</footer>
    </main>
  )
}
