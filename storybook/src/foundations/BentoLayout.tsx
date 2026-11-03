import { useState, type MouseEvent } from 'react'
import { Button } from '../components/Button/Button'
import { Card } from '../components/Card/Card'
import './bento-layout.css'
import './grid.css'

const sections = [['bento-example', 'Layout example'], ['bento-usage', 'When to use'], ['bento-rules', 'Grid rules']] as const

function navigate(event: MouseEvent<HTMLAnchorElement>, id: string) {
  event.preventDefault()
  const section = event.currentTarget.closest('.m8-bento-example')?.querySelector<HTMLElement>(`#${id}`)
  section?.scrollIntoView({ block: 'start', behavior: 'instant' })
  section?.querySelector<HTMLElement>('h2')?.focus({ preventScroll: true })
}

function backToTop(event: MouseEvent<HTMLButtonElement>) {
  const heading = event.currentTarget.closest('.m8-bento-example')?.querySelector<HTMLElement>('h1')
  heading?.closest('header')?.scrollIntoView({ block: 'start', behavior: 'instant' })
  heading?.focus({ preventScroll: true })
}

const longCopy = 'This is a deliberately longer piece of placeholder content. The card should make room for the complete message, keep its padding, and push the following row down naturally. It should remain readable when the page becomes narrow or the text size increases.'

export function BentoLayout({ theme = 'light', presentation = 'default' }: { theme?: 'light' | 'dark'; presentation?: 'default' | 'low-fidelity' }) {
  const [guides, setGuides] = useState(false)
  const [long, setLong] = useState(false)
  return <main className="m8-grid-guide m8-bento-example sb-unstyled" data-theme={theme} data-presentation={presentation}>
    <header className="m8-grid-header"><div className="m8-grid-header__content">
      <h1 tabIndex={-1}>Bento layout</h1>
      <p>One shared grid, different card sizes. The main story gets more room; supporting content stays easy to scan.</p>
      <p className="m8-grid-header__note">A grid pattern · Interactive grey-box example · Usage and responsive guidance</p>
    </div></header>
    <div className="m8-grid-body">
      <nav className="m8-grid-toc" aria-label="Bento guidance sections">
        <h2>On this page</h2>
        <div className="m8-grid-toc__links">{sections.map(([id, label]) => <a key={id} href={`#${id}`} onClick={event => navigate(event, id)}>{label}</a>)}</div>
        <button type="button" className="m8-grid-back-top" aria-label="Back to top" title="Back to top" onClick={backToTop}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" /></svg></button>
      </nav>
      <div className="m8-grid-content m8-bento-content">
    <section id="bento-example" className="m8-grid-section m8-bento-container m8-bento-workspace" aria-labelledby="bento-workspace-title">
      <div className="m8-grid-section__heading"><span className="m8-grid-kicker">01 / EXAMPLE</span><h2 id="bento-workspace-title" tabIndex={-1}>Workspace overview</h2><p>Placeholder content for a flexible dashboard. Try the guides and longer text to see how the layout responds.</p></div>
      <div className="m8-bento-controls"><Button size="small" variant={guides ? 'contained' : 'outline'} aria-pressed={guides} onClick={() => setGuides(value => !value)}>Column guides</Button><Button size="small" variant={long ? 'contained' : 'outline'} aria-pressed={long} onClick={() => setLong(value => !value)}>Longer text</Button></div>
      <div className="m8-bento-grid" data-guides={guides}>
        {guides && <div className="m8-bento-ruler" aria-hidden="true">{Array.from({ length: 12 }, (_, index) => <span key={index}>{index + 1}</span>)}</div>}
        <Card className="m8-bento-card m8-bento-card--feature" eyebrow="01 / FEATURED" title={long ? 'A longer project title that still needs room to breathe' : 'Your next big idea'}>
          <p>{long ? longCopy : 'A short introduction to the most important project, update, or story on this page.'}</p>
          <div className="m8-bento-placeholder" role="img" aria-label="Grey placeholder for a project preview"><span>Project preview</span></div>
          <p className="m8-bento-caption">Featured content · A larger card signals priority.</p>
        </Card>
        <Card className="m8-bento-card m8-bento-card--activity" eyebrow="02 / ACTIVITY" title="What’s happening">
          <p>{long ? longCopy : 'A short update from the team. Keep the important information visible without opening another page.'}</p>
        </Card>
        <Card className="m8-bento-card m8-bento-card--metric" eyebrow="03 / SNAPSHOT" title="Projects">
          <p className="m8-bento-metric">24</p><p>Active this month</p>
        </Card>
        <Card className="m8-bento-card m8-bento-card--note" eyebrow="04 / NOTE" title="Keep it simple">
          <p>{long ? longCopy : 'One clear idea belongs in each card.'}</p>
        </Card>
        <Card className="m8-bento-card m8-bento-card--upcoming" eyebrow="05 / UP NEXT" title="Make room to review">
          <p>{long ? longCopy : 'A placeholder for the next milestone, meeting, or useful reminder.'}</p>
        </Card>
        <Card className="m8-bento-card m8-bento-card--team" eyebrow="06 / TEAM UPDATE" title="Small pieces. One clear picture.">
          <p>{long ? longCopy : 'A wider space for supporting context. Shared edges and consistent gaps connect the different card sizes.'}</p>
          <div className="m8-bento-placeholder m8-bento-placeholder--compact" role="img" aria-label="Grey placeholder for a team update"><span>Supporting content</span></div>
        </Card>
      </div>
    </section>
    <section id="bento-usage" className="m8-grid-section m8-bento-container m8-bento-usage" aria-labelledby="bento-usage-title">
      <div className="m8-grid-section__heading"><span className="m8-grid-kicker">02 / USAGE</span><h2 id="bento-usage-title" tabIndex={-1}>When to use a Bento layout</h2>
      <p>Use Bento for an overview of related content that people can explore in any order. Give the most important content more space.</p></div>
      <div className="m8-bento-usage__choices">
        <div><h3>A good fit for</h3><ul>
          <li><strong>Dashboards and workspace homepages:</strong> combine a key project, quick metrics, updates, and reminders.</li>
          <li><strong>Product feature overviews:</strong> highlight one main benefit alongside shorter supporting features.</li>
          <li><strong>Portfolio highlights:</strong> feature a main project with smaller pieces of related work.</li>
        </ul></div>
        <div><h3>Choose a simpler layout when</h3><ul>
          <li><strong>People need to compare items:</strong> use equal cards or a table so the same details line up.</li>
          <li><strong>Steps must happen in order:</strong> use a clear sequence for forms, checkout, and instructions.</li>
          <li><strong>People need to read in depth:</strong> use a single reading column for articles and long explanations.</li>
        </ul></div>
      </div>
      <p className="m8-bento-usage__tip">Size should signal importance. Keep each card focused, let text determine its height, and check that the mobile order still makes sense.</p>
    </section>
    <section id="bento-rules" className="m8-grid-section m8-bento-container m8-bento-notes" aria-labelledby="bento-rules-title"><div className="m8-grid-section__heading"><span className="m8-grid-kicker">03 / GRID RULES</span><h2 id="bento-rules-title" tabIndex={-1}>How this example follows the grid</h2><p>The example adapts to its available content width. The documentation menu takes its own space, so cards can stack earlier than the full application grid.</p></div><ul><li>Below 672px: 4 columns; each card uses the full width, in the same reading order.</li><li>From 672px: 8 columns; the feature uses 4, the small cards use 2, and supporting cards use 4.</li><li>From 1056px: 12 columns; the feature uses 6, the small cards use 3, and the last row uses 4 + 8.</li><li>Gaps use the 16 / 24 / 32px grid values. In a full page, outer margins use the same values and the container stops at 1440px.</li><li>Rows grow with their content. Static cards stay flat, and keyboard order follows the visible reading order.</li></ul><p>These spans need the full column count at each breakpoint. This pattern follows Auto; column overrides are not offered.</p><p>Card boundaries and gaps follow the grid. Keep any optical correction inside the card and preserve its shared padding. <a href="./?path=/docs/foundation-alignment--docs" target="_top">Read the Alignment rules →</a></p><p><a href="./?path=/docs/foundation-grid--docs" target="_top">Read the Grid rules →</a></p></section>
      <footer className="m8-grid-footer">MODERN8-BITS / BENTO LAYOUT<span>Card size signals priority.</span></footer>
      </div>
    </div>
  </main>
}
