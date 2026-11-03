import { useId, useState, type MouseEvent, type ReactNode } from 'react'
import { elevationLayers, elevationRecipe, elevationRoles, elevationScenarios } from './elevation.data'
import './variables.css'
import './elevation-guidance.css'

const sections = [['roles', 'Surface roles'], ['simulator', 'Try the rules'], ['appearance', 'Light, dark & low-fidelity'], ['states', 'Interaction states'], ['layers', 'Stacking order'], ['implementation', 'Tokens & implementation'], ['references', 'References']] as const

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <section id={`elevation-${id}`} className="m8-elevation-section" aria-labelledby={`elevation-${id}-title`}>
    <h2 id={`elevation-${id}-title`} tabIndex={-1}>{title}</h2>{children}
  </section>
}

function ElevationAnatomy() {
  const id = useId()
  const layers = [
    { name: 'Overlay', token: 'elevation/surface/overlay', kind: 'overlay', top: '18.18%' },
    { name: 'Raised', token: 'elevation/surface/raised', kind: 'raised', top: '40.91%' },
    { name: 'Base', token: 'elevation/surface/base', kind: 'base', top: '63.64%' },
    { name: 'Sunken', token: 'elevation/surface/sunken', kind: 'sunken', top: '86.36%' },
  ]
  return <div className="m8-elevation-anatomy-block">
    <div className="m8-elevation-anatomy" data-theme="light" data-presentation="default" role="img" aria-label="Light-mode surface depth diagram. Four visible planes, from top to bottom: Overlay with a soft shadow, Raised with a soft shadow, a flat Base at zero, and Sunken as the recessed background well. The diagram shows perceived surface depth, not stacking values.">
      <svg className="m8-elevation-anatomy__planes" viewBox="0 0 1080 440" fill="none" aria-hidden="true">
        <defs>
          {/* Optical shadows for the enlarged illustration; no separate shadow planes. */}
          <filter id={`${id}-raised-soft`} x="-25%" y="-25%" width="150%" height="160%"><feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="var(--m8-gray-1000)" floodOpacity=".12" /></filter>
          <filter id={`${id}-overlay-soft`} x="-25%" y="-25%" width="150%" height="160%"><feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="var(--m8-gray-1000)" floodOpacity=".16" /></filter>
        </defs>
        <path className="m8-elevation-anatomy__sunken m8-elevation-anatomy__plane" d="M535 380 815 230 1260 475 980 625Z" />
        <path className="m8-elevation-anatomy__base m8-elevation-anatomy__plane" d="M535 280 815 130 1260 375 980 525Z" />
        <path className="m8-elevation-anatomy__raised m8-elevation-anatomy__plane" d="M535 180 815 30 1260 275 980 425Z" filter={`url(#${id}-raised-soft)`} />
        <path className="m8-elevation-anatomy__overlay m8-elevation-anatomy__plane" d="M535 80 815 -70 1260 175 980 325Z" filter={`url(#${id}-overlay-soft)`} />
        <g className="m8-elevation-anatomy__ruler"><path d="M72 80H118M72 105H88M72 130H98M72 155H88M72 180H118M72 205H88M72 230H98M72 255H88M72 280H135M72 305H88M72 330H98M72 355H88M72 380H118" /><text x="52" y="85">+</text><text x="52" y="285">0</text><text x="52" y="385">−</text></g>
        <g className="m8-elevation-anatomy__leaders">
          <path d="M200 80H545M200 180H545M200 280H545M200 380H545" />
          <circle cx="545" cy="80" r="4" /><circle cx="545" cy="180" r="4" /><circle cx="545" cy="280" r="4" /><circle cx="545" cy="380" r="4" />
        </g>
      </svg>
      <div className="m8-elevation-anatomy__labels" aria-hidden="true">
        {layers.map(layer => <div key={layer.kind} className="m8-elevation-anatomy__label" data-layer={layer.kind} style={{ top: layer.top }}><i className="m8-elevation-anatomy__swatch" /><code>{layer.token}</code></div>)}
      </div>
    </div>
    <p className="m8-elevation-note">Perceived depth relative to Base (0): Sunken reads as a background well; Raised and Overlay sit above content. This illustrates surface relationships, not z-index values. Sunken is placed on Base in the actual layout.</p>
  </div>
}

function ElevationSimulator() {
  const id = useId()
  const [scenario, setScenario] = useState<keyof typeof elevationScenarios>('menu')
  const [presentation, setPresentation] = useState('default')
  const [shadows, setShadows] = useState(true)
  const choice = elevationScenarios[scenario]
  const role = elevationRoles.find(value => value.id === choice.role)!
  const hasShadow = choice.role === 'raised' || choice.role === 'overlay'
  return <div className="m8-elevation-simulator">
    <div className="m8-elevation-controls">
      <label htmlFor={`${id}-scenario`}>Example<select id={`${id}-scenario`} value={scenario} onChange={event => setScenario(event.target.value as keyof typeof elevationScenarios)}>{Object.entries(elevationScenarios).map(([key, value]) => <option key={key} value={key}>{value.name}</option>)}</select></label>
      <label htmlFor={`${id}-presentation`}>Example presentation<select id={`${id}-presentation`} value={presentation} onChange={event => setPresentation(event.target.value)}><option value="default">Default</option><option value="low-fidelity">Low-fidelity</option></select></label>
      <label className="m8-elevation-check"><input type="checkbox" checked={presentation === 'default' && shadows} disabled={presentation === 'low-fidelity'} onChange={event => setShadows(event.target.checked)} />Show shadows</label>
    </div>
    <p role="status"><strong>{choice.name} → {role.name}.</strong> {choice.explanation}</p>
    {presentation === 'low-fidelity' && <p className="m8-elevation-note">Low-fidelity removes shadows. Surface differences, clear outlines, and the layer order stay visible.</p>}
    <div className="m8-elevation-comparison">
      {(['light', 'dark'] as const).map(theme => <figure key={theme} data-theme={theme} data-presentation={presentation} className="m8-elevation-preview" aria-label={`${theme === 'light' ? 'Light' : 'Dark'} elevation example`}>
        <figcaption>{theme === 'light' ? 'Light' : 'Dark'} appearance</figcaption>
        <div className="m8-elevation-scene" data-scenario={scenario}>
          <div className="m8-elevation-context" aria-hidden="true"><span>{scenario === 'well' ? 'Base surface' : 'Project overview'}</span>{scenario !== 'well' && <><i /><i /><i /></>}</div>
          {scenario === 'dialog' && <div className="m8-elevation-scene__scrim" aria-hidden="true" />}
          <div className="m8-elevation-surface m8-elevation-scene__sample" data-elevation={choice.role} style={presentation === 'default' && !shadows ? { boxShadow: 'none' } : undefined}>
            <strong>{choice.name}</strong><span>{role.name} surface</span>
            {scenario === 'well' ? <div className="m8-elevation-well__components"><div>Task one<span>Child component</span></div><div>Task two<span>Child component</span></div></div> : <p>{scenario === 'menu' ? 'Rename project · Move · Archive' : scenario === 'dialog' ? 'Review your changes before continuing.' : scenario === 'dragged' ? 'Moving to the next column' : scenario === 'sticky' ? 'Page title and navigation' : 'A clear container for useful content.'}</p>}
          </div>
        </div>
        <p className="m8-elevation-note">{scenario === 'dialog' ? 'Overlay + scrim' : 'No scrim'} · {presentation === 'low-fidelity' || !shadows || !hasShadow ? 'No shadow' : 'Paired shadow'}</p>
      </figure>)}
    </div>
    <p className="m8-elevation-note">These are visual examples. A production menu or modal also needs its own keyboard, focus, dismissal, and positioning behavior.</p>
  </div>
}

export function ElevationGuidance() {
  const navigate = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault()
    const section = event.currentTarget.closest('.m8-elevation-docs')?.querySelector<HTMLElement>(`#elevation-${id}`)
    section?.scrollIntoView({ block: 'start', behavior: 'instant' })
    section?.querySelector<HTMLElement>('h2')?.focus({ preventScroll: true })
  }
  const backToTop = (event: MouseEvent<HTMLButtonElement>) => {
    const heading = event.currentTarget.closest('.m8-elevation-docs')?.querySelector<HTMLElement>('h1')
    heading?.closest('header')?.scrollIntoView({ block: 'start', behavior: 'instant' })
    heading?.focus({ preventScroll: true })
  }
  return <main className="m8-variables m8-elevation-docs sb-unstyled">
    <header className="m8-variables__header"><div className="m8-variables__header-content">
      <h1 tabIndex={-1}>Elevation</h1>
      <p>Show what sits on the page, what can move, and what floats above it.</p>
      <p className="m8-variables__note">Four surface roles · Background wells and lifted surfaces · Independent stacking order</p>
    </div></header>
    <div className="m8-variables__body">
      <div className="m8-variables__content">
        <Section id="roles" title="Start flat. Add depth when it helps.">
          <ElevationAnatomy />
          <p>Use Base for the page. Place Sunken on Base to create a background well for other components. Add Raised when a surface can move or needs one clear point of emphasis. Use Overlay when content temporarily covers other content.</p>
          <div className="m8-elevation-role-list">{elevationRoles.map(role => <article key={role.id}>
            <div className="m8-elevation-role-demo" data-role={role.id}>
              {role.id === 'sunken' ? <div className="m8-elevation-surface m8-elevation-role-demo__base" data-elevation="base"><span>Base</span><div className="m8-elevation-surface m8-elevation-role-demo__well" data-elevation="sunken"><strong>Sunken</strong><div className="m8-elevation-well__components"><div>Component</div></div></div></div> : <div className="m8-elevation-surface" data-elevation={role.id}><strong>{role.name}</strong><span>{role.shadow}</span></div>}
            </div>
            <h3>{role.name}</h3><p>{role.description}</p><p className="m8-elevation-note">{role.use}</p>
          </article>)}</div>
          <aside className="m8-elevation-callout"><strong>Base → Sunken background → child components.</strong><p>Sunken is drawn on top of Base, but serves as the recessed backdrop for content inside it. Use it for board columns and grouped work areas. It has no shadow and needs no extra stacking layer.</p><p>Use Sunken on Base only. Inside a Raised or Overlay surface, group content with spacing or a border instead.</p></aside>
        </Section>
        <Section id="simulator" title="Try the rules in context."><p>Choose a use case to see the appropriate role in light and dark. Hide shadows to check that the surface still has a clear boundary.</p><ElevationSimulator /></Section>
        <Section id="appearance" title="Keep the layers clear in every appearance.">
          <div className="m8-elevation-two-up"><article><h3>Light and dark</h3><p>Sunken uses #EEEEEE in light and #111111 in dark. Its tone separates a background well from the page and the components inside it. Our dark Base is already black, so Sunken is a semantic backdrop, not a claim that it is darker than Base.</p><p>Raised uses #292929 in dark, and Overlay uses #333333. Keep their surface and shadow tokens paired, with <code>text/primary</code> for readable content.</p></article><article><h3>Low-fidelity</h3><p>Remove shadows and rounded surface corners. Keep the same content, spacing, stacking order, and interaction behavior. Strong outlines and surface tones preserve separation, including the Sunken background and its child components.</p></article></div>
          <p>A shadow is a depth cue, not an accessible label or a focus indicator. Keep visible edges when adjacent surfaces blend, and use <code>border/focus</code> for keyboard focus. Check text and controls against the actual surface.</p>
        </Section>
        <Section id="states" title="Change depth for a reason.">
          <ul><li><strong>Hover and press:</strong> keep the resting elevation. Use existing action hover and pressed roles for controls. Do not make every card jump on hover.</li><li><strong>Drag:</strong> temporarily use Overlay, then restore the resting role after drop or cancel. Show a destination and support keyboard movement.</li><li><strong>Selected, disabled, or focused:</strong> keep the same elevation. Use explicit state styling and semantics; selected is not “higher.”</li><li><strong>Scroll:</strong> start with a separator at a sticky edge. Add a shadow only if the boundary is otherwise unclear. It does not create another surface role.</li><li><strong>Pixel accents:</strong> hard offset shadows on explicit pixel variants are decoration. They do not make a surface an Overlay and do not change its stacking position.</li></ul>
        </Section>
        <Section id="layers" title="Elevation and stacking order do different jobs.">
          <p>Elevation describes how a surface looks. Stacking order decides what covers what. A menu and a modal share Overlay styling, but a modal belongs above page menus and its own scrim.</p>
          <div className="m8-elevation-table-wrap"><table><caption>Application layers within one stacking context</caption><thead><tr><th scope="col">Token</th><th scope="col">Value</th><th scope="col">Use</th><th scope="col">Surface</th></tr></thead><tbody>{elevationLayers.map(([name, value, use, role]) => <tr key={name}><th scope="row"><code>layer/{name}</code></th><td>{value}</td><td>{use}</td><td>{role}</td></tr>)}</tbody></table></div>
          <p>These values order siblings within the same application context. A child cannot escape its parent’s stacking context by choosing a larger number. Mount modal-owned menus, tooltips, and feedback in the active modal layer so they remain usable.</p>
          <p>Native <code>dialog</code> and popover elements use the browser’s top layer; ordinary z-index values cannot place content above it. Use the platform’s focus, inert-background, and dismissal behavior deliberately. A scrim or shadow alone does not make a modal.</p>
        </Section>
        <Section id="implementation" title="Apply the surface and shadow together.">
          <p>Import <code>tokens.css</code>, followed by the existing global and presentation styles. The elevation extension is included. The opt-in <code>m8-elevation-surface</code> class supports <code>data-elevation="base | sunken | raised | overlay"</code>; it does not position an element or assign a layer.</p>
          <pre><code>{elevationRecipe}</code></pre>
          <div className="m8-elevation-table-wrap"><table><caption>Implemented elevation token pairs</caption><thead><tr><th scope="col">Role</th><th scope="col">Surface token</th><th scope="col">Shadow token</th></tr></thead><tbody>{elevationRoles.map(role => <tr key={role.id}><th scope="row">{role.name}</th><td><code>elevation/surface/{role.id}</code></td><td><code>elevation/shadow/{role.id}</code></td></tr>)}</tbody></table></div>
          <details><summary>Exact mappings and shadow values</summary><p>Base reuses <code>background/canvas</code>. Sunken maps to <code>gray/100</code> in light and <code>gray/950</code> in dark. Raised reuses <code>background/raised</code>. Overlay maps to <code>gray/0</code> in light and <code>neutral/800</code> in dark. <code>elevation/border</code> maps to <code>border/default</code> in light and <code>gray/600</code> in dark.</p><ul><li>Raised: 0 1px 2px / 12% black + 0 4px 8px / 8% black in light; 32% + 24% in dark.</li><li>Overlay: 0 4px 8px / 16% black + 0 12px 24px / 12% black in light; 40% + 32% in dark.</li><li>Base and Sunken: no shadow. Scrim: black at 40% in light and 64% in dark, using <code>elevation/scrim</code>.</li></ul></details>
          <aside className="m8-elevation-callout"><strong>Available in code; Figma authoring is pending.</strong><p>This new extension is defined in <code>styles/elevation.css</code>. Existing Card and Button APIs keep their current behavior. The Design Token page remains the verified Figma snapshot; these new names and effects have not been added to that snapshot or authored in Figma.</p></aside>
        </Section>
        <Section id="references" title="References and our choices.">
          <p><a href="https://atlassian.design/foundations/elevation" target="_blank" rel="noreferrer">Atlassian · Elevation ↗</a> informs the role-based surface and shadow pairs, restrained use of depth, and the distinction between elevation and stacking order.</p>
          <p><a href="https://m3.material.io/styles/elevation/overview" target="_blank" rel="noreferrer">Material 3 · Elevation ↗</a> informs the small set of levels, use of surface tone as a depth cue, and consistent resting states.</p>
          <p>Modern8-bits uses four named roles and a neutral palette. Sunken follows the background-well idea from Atlassian; our dark mapping is adapted to the existing black Base. These roles are our own decisions, not Material dp measurements or copies of either reference’s token scale.</p>
        </Section>
      </div>
      <nav className="m8-variables__toc" aria-label="Elevation table of contents"><h2>On this page</h2><div className="m8-variables__toc-links">{sections.map(([id, label]) => <a key={id} href={`#elevation-${id}`} onClick={event => navigate(event, id)}>{label}</a>)}</div><button type="button" className="m8-variables__back-top" aria-label="Back to top" title="Back to top" onClick={backToTop}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" /></svg></button></nav>
    </div>
  </main>
}
