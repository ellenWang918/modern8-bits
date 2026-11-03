/// <reference types="vite/client" />
// Local, throwaway grid experiment: three structural layouts, shared via ?variant=.
import { useEffect, useId, useRef, useState, type CSSProperties } from 'react'
import { websiteColumnPolicy, type ColumnChoice } from '../foundations/grid.columns'
import { viewportGroups } from '../foundations/grid.viewports'
import { Button, Input, Checkbox } from '../components'
import '../styles/tokens.css'
import '../styles/global.css'
import '../styles/presentation.css'
import './grid-prototype.css'

const variants = ['Homepage', 'Workspace', 'Article'] as const
const params = new URLSearchParams(location.search)
const initialVariant = variants.includes(params.get('variant') as typeof variants[number]) ? params.get('variant')! : 'Homepage'
const paragraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante. Donec ullamcorper nulla non metus auctor fringilla.'
const longTitle = 'A much longer placeholder heading to test wrapping, alignment, and how the layout responds when content needs more room.'

export function GridWebsiteCanvas() {
  const [variant, setVariant] = useState(initialVariant)
  const [guides, setGuides] = useState(false)
  const [long, setLong] = useState(false)
  const [rtl, setRtl] = useState(false)
  const [safe, setSafe] = useState(false)
  const [fluid, setFluid] = useState(false)
  const [theme, setTheme] = useState('light')
  const [presentation, setPresentation] = useState('low-fidelity')
  const [menu, setMenu] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [detail, setDetail] = useState(false)
  const [filter, setFilter] = useState('')
  const [selection, setSelection] = useState<ColumnChoice>('auto')
  const [viewport, setViewport] = useState(window.innerWidth)
  useEffect(() => {
    const resize = () => setViewport(window.innerWidth)
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])
  useEffect(() => {
    const configure = (event: MessageEvent) => {
      if (event.origin !== location.origin || event.source !== parent || event.data?.type !== 'grid-config') return
      const c = event.data
      setVariant(c.variant); setGuides(c.guides); setLong(c.long); setRtl(c.rtl)
      setSafe(c.safe); setFluid(c.fluid); setTheme(c.theme); setPresentation(c.presentation)
      setSelection(c.selection)
    }
    window.addEventListener('message', configure)
    if (parent !== window) parent.postMessage({ type: 'grid-ready' }, location.origin)
    return () => window.removeEventListener('message', configure)
  }, [])
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.dataset.presentation = presentation
    document.documentElement.dir = rtl ? 'rtl' : 'ltr'
  }, [theme, presentation, rtl])
  const title = (short: string) => long ? longTitle : short
  const block = (label: string, className = '') => <div className={`gp-box ${className}`}>{label}</div>
  const policy = websiteColumnPolicy(viewport, variant)
  const columns = selection !== 'auto' && policy.accepts(selection) ? Number(selection) : policy.automatic
  return <div className={`gp-site ${guides ? 'gp-guides' : ''} ${safe ? 'gp-safe-demo' : ''} ${fluid ? 'gp-fluid' : ''}`} style={{ '--m8-layout-columns': columns } as CSSProperties} data-columns={columns} data-variant={variant} data-long={long} data-rtl={rtl} data-theme={theme} data-presentation={presentation}>
    <a className="gp-skip" href="#main">Skip to content</a>
    <header className="gp-header gp-grid">
      <a className="gp-brand" href="#main">Placeholder®</a>
      <nav className={`gp-navigation ${menu ? 'is-open' : ''}`} aria-label="Website navigation">
        <a href="#section-one">Section one</a><a href="#section-two">Section two</a><a href="#contact">Contact</a>
      </nav>
      <button className="gp-menu" aria-expanded={menu} onClick={() => setMenu(!menu)}>Menu {menu ? '−' : '+'}</button>
    </header>
    <main id="main" tabIndex={-1}>
      {variant === 'Homepage' && <>
        <section className="gp-grid gp-section gp-hero" id="section-one">
          <div className="gp-half"><p className="gp-kicker">01 / A placeholder website</p><h1>{title('A clear place for your next big idea.')}</h1><p className="gp-lead">{paragraph}</p><a className="gp-action" href="#contact">Placeholder action →</a></div>
          {block('Content placeholder / 4:3', 'gp-half gp-hero-box')}
        </section>
        <section className="gp-grid gp-section" id="section-two">
          <div className="gp-full gp-section-title"><p className="gp-kicker">02 / Explore the content</p><h2>{title('One rhythm. Different possibilities.')}</h2></div>
          {[1, 2, 3].map(n => <article className="gp-third" key={n}>{block(`Placeholder ${String(n).padStart(2, '0')}`, 'gp-tile')}<p className="gp-kicker">Category / 0{n}</p><h3>{title(`Placeholder content title ${n}`)}</h3><p>{paragraph}</p><a href="#contact">Read placeholder →</a></article>)}
        </section>
        <section className="gp-grid gp-section gp-feature"><div className="gp-third"><p className="gp-kicker">03 / A different proportion</p><h2>{title('Space for the details.')}</h2></div><div className="gp-two-thirds">{block('Wide content placeholder / 2:1', 'gp-wide')}<p>{paragraph} {paragraph}</p></div></section>
      </>}
      {variant === 'Workspace' && <>
        <div className="gp-grid gp-section" id="section-one"><div className="gp-full"><p className="gp-kicker">01 / Workspace placeholder</p><h1>{title('Your workspace, at a glance.')}</h1></div></div>
        <div className="gp-workspace" id="section-two">
          <aside className="gp-sidebar" aria-label="Workspace filters"><h2>Filters</h2><Input label="Filter placeholders" value={filter} onChange={e => setFilter(e.target.value)}/><Checkbox label="Include archived"/><p>{paragraph}</p></aside>
          <div className="gp-work-content gp-grid"><div className="gp-full gp-summary"><h2>{title('Placeholder overview')}</h2><p>{paragraph}</p></div>
            {[1, 2, 3, 4].filter(n => `Placeholder item ${n}`.toLowerCase().includes(filter.toLowerCase())).map(n => <article key={n} className="gp-work-card"><p className="gp-kicker">Item / 0{n}</p><h3>{title(`Placeholder item ${n}`)}</h3><p>{paragraph}</p><Button size="large" variant="outline" onClick={() => setDetail(!detail)}>Toggle detail</Button>{detail && <p>Additional placeholder content. {paragraph}</p>}</article>)}
            {filter && ![1, 2, 3, 4].some(n => `Placeholder item ${n}`.toLowerCase().includes(filter.toLowerCase())) && <p className="gp-full">No matching placeholder items.</p>}
          </div>
        </div>
      </>}
      {variant === 'Article' && <>
        <header className="gp-grid gp-section" id="section-one"><div className="gp-reading-head"><p className="gp-kicker">01 / Editorial placeholder</p><h1>{title('A little room to read, think, and explore.')}</h1><p className="gp-lead">{paragraph}</p><p className="gp-kicker">Placeholder author · 6 minute read</p></div></header>
        <div className="gp-grid gp-section gp-article-layout" id="section-two"><aside className="gp-contents"><h2>In this article</h2><a href="#article-one">First placeholder section</a><a href="#article-two">Second placeholder section</a></aside><article className="gp-reading"><h2 id="article-one">{title('A placeholder section heading')}</h2><p>{paragraph} {paragraph}</p>{block('Inline content placeholder / 2:1', 'gp-wide')}<p>{paragraph}</p><blockquote>{long ? 'AnUnbrokenPlaceholderReferenceThatMustWrapWithoutMakingThePageWiderThanItsAvailableViewport'.repeat(3) : '“A short placeholder quotation with a little more room to breathe.”'}</blockquote><h2 id="article-two">Another placeholder heading</h2><p>{paragraph} {paragraph} {paragraph}</p></article></div>
      </>}
      <section id="contact" className="gp-grid gp-section gp-contact"><div className="gp-half"><p className="gp-kicker">04 / Keep in touch</p><h2>{title('A final placeholder thought.')}</h2><p>{paragraph}</p></div><form className="gp-half" onSubmit={e => { e.preventDefault(); setSubmitted(true) }}><Input label="Placeholder email" type="email" required placeholder="name@example.com"/><Checkbox label="Send me placeholder updates"/><Button type="submit" size="large">Submit placeholder</Button>{submitted && <p role="status">Placeholder received. This demo stores nothing.</p>}</form></section>
    </main>
    <footer className="gp-grid gp-footer"><p className="gp-half">Placeholder® / A grey-box website</p><p className="gp-half">Mock content for layout review only.</p></footer>
  </div>
}

export function GridWebsiteMockup({
  canvasUrl = '/grid-prototype.html?canvas=1',
  guidanceUrl = 'http://127.0.0.1:6006/?path=/docs/foundation-grid--docs',
  showSwitcher = import.meta.env.DEV,
}: { canvasUrl?: string; guidanceUrl?: string; showSwitcher?: boolean }) {
  const id = useId()
  const [variant, setVariant] = useState(initialVariant)
  const [width, setWidth] = useState(1280)
  const [available, setAvailable] = useState(1280)
  const [guides, setGuides] = useState(false)
  const [long, setLong] = useState(false)
  const [rtl, setRtl] = useState(false)
  const [safe, setSafe] = useState(false)
  const [fluid, setFluid] = useState(false)
  const [theme, setTheme] = useState('light')
  const [presentation, setPresentation] = useState('low-fidelity')
  const [selection, setSelection] = useState<ColumnChoice>('auto')
  const [notice, setNotice] = useState('')
  const policy = websiteColumnPolicy(width, variant)
  const chosen = policy.accepts(selection) ? selection : 'auto'
  const host = useRef<HTMLDivElement>(null)
  const frame = useRef<HTMLIFrameElement>(null)
  const config = { type: 'grid-config', variant, guides, long, rtl, safe, fluid, theme, presentation, selection: chosen }
  const send = () => frame.current?.contentWindow?.postMessage(config, location.origin)
  useEffect(send, [variant, guides, long, rtl, safe, fluid, theme, presentation, chosen, width])
  useEffect(() => {
    const ready = (event: MessageEvent) => {
      if (event.origin === location.origin && event.source === frame.current?.contentWindow && event.data?.type === 'grid-ready') send()
    }
    window.addEventListener('message', ready)
    return () => window.removeEventListener('message', ready)
  }, [variant, guides, long, rtl, safe, fluid, theme, presentation, chosen, width])
  useEffect(() => {
    const observer = new ResizeObserver(entries => setAvailable(entries[0].contentRect.width))
    if (host.current) observer.observe(host.current)
    return () => observer.disconnect()
  }, [])
  const cycle = (direction: number) => {
    const next = variants[(variants.indexOf(variant as typeof variants[number]) + direction + variants.length) % variants.length]
    if (!websiteColumnPolicy(width, next).accepts(selection)) {
      setSelection('auto'); setNotice('Column selection returned to Auto to preserve the new layout.')
    } else setNotice('')
    setVariant(next)
    const url = new URL(location.href); url.searchParams.set('variant', next); history.replaceState(null, '', url)
  }
  useEffect(() => {
    const arrows = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement).closest('input, textarea, select, [contenteditable]')) return
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); cycle(event.key === 'ArrowLeft' ? -1 : 1) }
    }
    window.addEventListener('keydown', arrows)
    return () => window.removeEventListener('keydown', arrows)
  })
  const scale = Math.min(1, available / width)
  const columns = chosen === 'auto' ? policy.automatic : Number(chosen)
  const gutter = width < 672 ? 16 : width < 1056 ? 24 : 32
  return <div className="gp-review" data-theme="light" data-presentation="low-fidelity">
    <header className="gp-review-header"><div><p className="gp-kicker">MODERN8-BITS / GRID EXPERIMENT 01</p><h1>Put the grid to work.</h1><p>Three website layouts. Grey boxes, mock text, real reflow.</p></div><a href={guidanceUrl} target="_top">Read the Grid rules ↗</a></header>
    <section className="gp-controls" aria-label="Prototype controls">
      <label>Viewport width<select value={width} onChange={e => { const next = Number(e.target.value); if (!websiteColumnPolicy(next, variant).accepts(selection)) { setSelection('auto'); setNotice('Column selection returned to Auto because the new viewport requires a different count.') } else setNotice(''); setWidth(next) }}>{viewportGroups.map(group => <optgroup key={group.label} label={group.label}>{group.widths.map(w => <option key={w} value={w}>{w}px</option>)}</optgroup>)}</select></label>
      <label>Columns<select aria-describedby={`${id}-columns-help`} value={chosen} onChange={e => { if (policy.accepts(e.target.value)) { setSelection(e.target.value); setNotice('') } }}><option value="auto">Auto · {policy.automatic} columns</option>{policy.options.map(option => <option key={option.count} value={option.count} disabled={!option.allowed}>{option.count} columns{option.allowed ? '' : ` — ${option.reason}`}</option>)}</select></label>
      <label>Content width<select value={fluid ? 'fluid' : 'constrained'} onChange={e => setFluid(e.target.value === 'fluid')}><option value="constrained">Constrained · 1440px</option><option value="fluid">Fluid</option></select></label>
      <label><input type="checkbox" checked={guides} onChange={e => setGuides(e.target.checked)}/> Grid guides</label>
      <label><input type="checkbox" checked={long} onChange={e => setLong(e.target.checked)}/> Long text</label>
      <label><input type="checkbox" checked={rtl} onChange={e => setRtl(e.target.checked)}/> RTL</label>
      <label><input type="checkbox" checked={safe} onChange={e => setSafe(e.target.checked)}/> Simulated insets</label>
      <label>Appearance<select value={theme} onChange={e => setTheme(e.target.value)}><option value="light">Light</option><option value="dark">Dark</option></select></label>
      <label>Presentation<select value={presentation} onChange={e => setPresentation(e.target.value)}><option value="low-fidelity">Low-fidelity</option><option value="default">Default</option></select></label>
    </section>
    <p id={`${id}-columns-help`} className="gp-review-note">{policy.explanation} Auto follows the responsive 4 / 8 / 12 rules. Counts are checked against every section; incompatible options are disabled.</p>
    <p className="gp-column-notice" role="status">{notice}</p>
    <div className="gp-telemetry" aria-live="polite"><strong>{variant}</strong><span>{width}px viewport / {columns} columns / {gutter}px margins + gutters</span><span>{Math.round(scale * 100)}% preview scale</span></div>
    <div ref={host} className="gp-stage"><div style={{ width: width * scale, height: 850 * scale }}><iframe ref={frame} title="Grey-box website prototype" src={`${canvasUrl}&variant=${encodeURIComponent(initialVariant)}`} onLoad={send} style={{ width, height: 850, transform: `scale(${scale})`, transformOrigin: 'top left' }}/></div></div>
    <p className="gp-review-note">The preview has a real {width}px viewport, scaled to fit here. Scroll inside it to explore. Simulated insets are illustrative: 24px top, 16px sides, 34px bottom; they are not device measurements.</p>
    <details className="gp-findings"><summary>What this experiment tests</summary><p>Shared alignment, breakpoint boundaries, 1440px cap, half/third/two-third spans, 65ch reading measure, navigation collapse, local pane reflow, long strings, form wrapping, RTL, and safe-inset ownership.</p><p>App-specific decisions: 240px workspace navigation; a local 560px pane threshold; single-column cards at medium widths when three equal cards cannot use whole grid tracks. These choices need guidance beyond the global grid.</p><p>This website cannot validate native fold/camera exclusion, dynamic browser chrome, or keyboard avoidance. Those require device testing.</p></details>
    {showSwitcher && <nav className="gp-switcher" aria-label="Layout variants"><button aria-label="Previous layout" onClick={() => cycle(-1)}>←</button><span>{variants.indexOf(variant as typeof variants[number]) + 1} / 3 · {variant}</span><button aria-label="Next layout" onClick={() => cycle(1)}>→</button></nav>}
  </div>
}
