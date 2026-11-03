import { useId, useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react'
import { Button } from '../components/Button/Button'
import { devices, gridFor, gridRules, references, type Device, type DeviceProfile } from './grid.data'
import { safeAreaExample, webGridExample } from './grid.examples'
import { scenarioPolicy, type ColumnChoice, type GridScenario } from './grid.columns'
import { viewportGroups } from './grid.viewports'
import './grid.css'

const chapters = [['anatomy', 'Anatomy'], ['responsive', 'Web grid'], ['patterns', 'Patterns'], ['safe-areas', 'Mobile & safe areas'], ['implementation', 'Implementation'], ['extend', 'Add devices'], ['references', 'References']]
type GridStyle = CSSProperties & { '--grid-columns': number; '--grid-gap': string; '--grid-margin': string }

function scrollToSection(event: MouseEvent<HTMLAnchorElement>, id: string) {
  event.preventDefault()
  const section = event.currentTarget.closest('.m8-grid-guide')?.querySelector<HTMLElement>(`#${id}`)
  section?.scrollIntoView({ block: 'start', behavior: 'instant' })
  section?.querySelector<HTMLElement>('h2')?.focus({ preventScroll: true })
}

function scrollToTop(event: MouseEvent<HTMLButtonElement>) {
  const heading = event.currentTarget.closest('.m8-grid-guide')?.querySelector<HTMLElement>('h1')
  heading?.closest('header')?.scrollIntoView({ block: 'start', behavior: 'instant' })
  heading?.focus({ preventScroll: true })
}

function Section({ id, number, title, intro, children }: { id: string; number: string; title: string; intro: string; children: ReactNode }) {
  return <section id={id} className="m8-grid-section" aria-labelledby={`${id}-title`}>
    <div className="m8-grid-section__heading"><span className="m8-grid-kicker">{number} / FOUNDATION</span><h2 id={`${id}-title`} tabIndex={-1}>{title}</h2><p>{intro}</p></div>
    {children}
  </section>
}

function WebExplorer() {
  const id = useId()
  const [width, setWidth] = useState(1280)
  const [layout, setLayout] = useState('constrained')
  const [overlay, setOverlay] = useState(true)
  const [scenario, setScenario] = useState<GridScenario>('halves')
  const [selection, setSelection] = useState<ColumnChoice>('auto')
  const [notice, setNotice] = useState('')
  const rule = gridFor(width)
  const policy = scenarioPolicy(width, scenario)
  const chosen = policy.accepts(selection) ? selection : 'auto'
  const columns = chosen === 'auto' ? rule.columns : Number(chosen)
  function changeWidth(next: number) {
    if (!scenarioPolicy(next, scenario).accepts(selection)) {
      setSelection('auto'); setNotice('Column selection returned to Auto because the new viewport does not support the previous count.')
    } else setNotice('')
    setWidth(next)
  }
  function changeScenario(next: GridScenario) {
    if (!scenarioPolicy(width, next).accepts(selection)) {
      setSelection('auto'); setNotice('Column selection returned to Auto to preserve this layout’s spans and proportions.')
    } else setNotice('')
    setScenario(next)
  }
  const container = layout === 'constrained' ? Math.min(width, 1440) : width
  const column = (container - rule.margin * 2 - rule.gap * (columns - 1)) / columns
  const spans = scenario === 'full' ? [columns] : scenario === 'thirds' ? (width >= 1056 ? [4, 4, 4] : [columns, columns, columns]) : scenario === 'split' ? (width >= 1056 ? [4, 8] : [columns, columns]) : width < 672 ? [columns, columns] : [rule.columns / 2, rule.columns / 2]
  // This specimen is fitted to the page; measurements remain logical CSS px.
  const style: GridStyle = { '--grid-columns': columns, '--grid-gap': `${rule.gap / (container - rule.margin * 2) * 100}%`, '--grid-margin': `${rule.margin / container * 100}%` }
  return <div className="m8-grid-explorer">
    <div className="m8-grid-controls m8-grid-controls--web">
      <label htmlFor={`${id}-width`}>Viewport width<select id={`${id}-width`} aria-describedby={`${id}-viewport-help`} value={width} onChange={event => changeWidth(Number(event.target.value))}>{viewportGroups.map(group => <optgroup key={group.label} label={group.label}>{group.widths.map(value => <option key={value} value={value}>{value}px</option>)}</optgroup>)}</select></label>
      <label htmlFor={`${id}-layout`}>Layout width<select id={`${id}-layout`} value={layout} onChange={event => setLayout(event.target.value)}><option value="constrained">Constrained · max 1440px</option><option value="fluid">Fluid · use available width</option></select></label>
      <label htmlFor={`${id}-scenario`}>Content layout<select id={`${id}-scenario`} value={scenario} onChange={event => changeScenario(event.target.value as GridScenario)}><option value="halves">Responsive halves</option><option value="full">Full-width content</option><option value="thirds">Responsive thirds</option><option value="split">Responsive 4 + 8 split</option></select></label>
      <label htmlFor={`${id}-columns`}>Columns<select id={`${id}-columns`} aria-describedby={`${id}-column-help`} value={chosen} onChange={event => { if (policy.accepts(event.target.value)) { setSelection(event.target.value); setNotice('') } }}><option value="auto">Auto · {rule.columns} columns</option>{policy.options.map(option => <option key={option.count} value={option.count} disabled={!option.allowed}>{option.count} columns{option.allowed ? '' : ` — ${option.reason}`}</option>)}</select></label>
      <label className="m8-grid-check"><input type="checkbox" checked={overlay} onChange={event => setOverlay(event.target.checked)} />Show column guides</label>
    </div>
    <p id={`${id}-viewport-help`} className="m8-grid-caption">Representative phone, tablet, laptop, desktop and wide-window widths in CSS pixels. These are layout test presets; browser zoom and window size can differ from a display’s physical resolution.</p>
    <p id={`${id}-column-help`} className="m8-grid-caption">{policy.explanation} Auto follows the 4 / 8 / 12 breakpoint rules. Incompatible options are disabled. Try Full-width content to compare column counts.</p>
    <div className="m8-grid-presets" aria-label="Viewport examples">{[320, 671, 672, 1055, 1056, 1440, 1920].map(value => <Button key={value} variant={value === width ? 'contained' : 'outline'} size="small" aria-pressed={value === width} onClick={() => changeWidth(value)}>{value}px</Button>)}</div>
    <p className="m8-grid-readout" role="status" aria-label="Grid measurements">{notice && <>{notice} </>}{rule.name} · {columns} columns · {rule.margin}px outer margins · {rule.gap}px gutters · {column.toFixed(1)}px per column</p>
    <div className="m8-web-stage" style={{ paddingInline: `${(width - container) / width * 50}%` }}>
      <div className="m8-web-grid" style={style} data-testid="web-grid" data-columns={columns}>
        <div className="m8-web-grid__ruler" aria-hidden="true">{Array.from({ length: columns }, (_, index) => <span key={index}>{index + 1}</span>)}</div>
        <div className="m8-web-grid__content">
          <div className="m8-web-grid__banner">Main content <span>full span</span></div>
          {spans.map((span, index) => <div key={index} className="m8-web-grid__tile" style={{ gridColumn: `span ${span}` }}>{['Primary content', 'Related content', 'Additional content'][index]}<span>{span === columns ? 'Full width' : `${span} columns`}</span></div>)}
        </div>
        {overlay && <div className="m8-web-grid__overlay" aria-hidden="true">{Array.from({ length: columns }, (_, index) => <span key={index} />)}</div>}
      </div>
    </div>
    <p className="m8-grid-caption">Fitted diagram; widths above are CSS pixels, not the diagram’s rendered size. The {container}px container includes its outer margins. Column width = (container − 2 × margin − (columns − 1) × gutter) ÷ columns.</p>
  </div>
}

function DeviceDiagram({ device, profile }: { device: Device; profile: DeviceProfile }) {
  const patternId = useId().replaceAll(':', '')
  const { width, height } = profile.window
  const { top, right, bottom, left } = profile.insets
  const rule = gridFor(width)
  const innerWidth = width - left - right - rule.margin * 2
  const innerHeight = height - top - bottom - rule.margin * 2
  const column = (innerWidth - rule.gap * (rule.columns - 1)) / rule.columns
  return <div className="m8-device-stage">
    <svg className="m8-device-diagram" viewBox={`0 0 ${width} ${height}`} style={{ aspectRatio: `${width} / ${height}` }} role="img" aria-label={`${device.name}, ${profile.label}. Window ${width} by ${height} points. Safe insets: top ${top}, right ${right}, bottom ${bottom}, left ${left}. ${profile.reservedRegions.length} reported reserved regions.`}>
      <defs><pattern id={patternId} width="8" height="8" patternUnits="userSpaceOnUse"><path d="M-2 2L2-2M0 8L8 0M6 10L10 6" className="m8-device-hatch" /></pattern></defs>
      <rect width={width} height={height} className="m8-device-diagram__window" />
      <rect x={left} y={top} width={width - left - right} height={height - top - bottom} className="m8-device-diagram__safe" />
      {Array.from({ length: rule.columns }, (_, index) => <rect key={index} x={left + rule.margin + index * (column + rule.gap)} y={top + rule.margin} width={Math.max(0, column)} height={Math.max(0, innerHeight)} className="m8-device-diagram__column" />)}
      <rect x={left + rule.margin} y={top + rule.margin} width={Math.max(0, innerWidth)} height={Math.max(0, innerHeight)} className="m8-device-diagram__content" />
      {profile.reservedRegions.map((region, index) => <g key={index}><rect x={region.x} y={region.y} width={region.width} height={region.height} className="m8-device-diagram__reserved" /><rect x={region.x} y={region.y} width={region.width} height={region.height} fill={`url(#${patternId})`} /></g>)}
    </svg>
    <div className="m8-device-legend"><span><i className="m8-device-legend__inset" />System inset</span><span><i className="m8-device-legend__safe" />Safe rectangle</span><span><i className="m8-device-legend__grid" />Content columns</span><span><i className="m8-device-legend__reserved" />Reserved region</span></div>
  </div>
}

function SafeAreaExplorer() {
  const id = useId()
  const [deviceId, setDeviceId] = useState(devices[0].id)
  const [profileId, setProfileId] = useState(devices[0].profiles[0].id)
  const device = devices.find(item => item.id === deviceId) ?? devices[0]
  const profile = device.profiles.find(item => item.id === profileId) ?? device.profiles[0]
  const orientations = [...new Set(device.profiles.map(item => item.orientation))]
  const modes = device.profiles.filter(item => item.orientation === profile.orientation)
  const rule = gridFor(profile.window.width)
  function changeDevice(value: string) {
    const next = devices.find(item => item.id === value) ?? devices[0]
    setDeviceId(next.id)
    setProfileId(next.profiles[0].id)
  }
  return <div className="m8-safe-explorer">
    <div className="m8-grid-controls m8-grid-controls--devices">
      <label htmlFor={`${id}-device`}>Device<select id={`${id}-device`} value={device.id} onChange={event => changeDevice(event.target.value)}>{devices.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
      <label htmlFor={`${id}-orientation`}>Orientation<select id={`${id}-orientation`} value={profile.orientation} onChange={event => setProfileId(device.profiles.find(item => item.orientation === event.target.value)!.id)}>{orientations.map(value => <option key={value}>{value}</option>)}</select></label>
      <label htmlFor={`${id}-mode`}>Measured configuration<select id={`${id}-mode`} value={profile.id} onChange={event => setProfileId(event.target.value)}>{modes.map(item => <option key={item.id} value={item.id}>{item.label.split(' · ').slice(1).join(' · ')}</option>)}</select></label>
    </div>
    <div className="m8-safe-explorer__body">
      <DeviceDiagram device={device} profile={profile} />
      <div className="m8-safe-metrics" aria-live="polite" data-testid="device-metrics">
        <span className="m8-grid-kicker">MEASURED WINDOW / POINTS</span><h3>{device.name}</h3><p className="m8-safe-metrics__mode">{profile.label}</p>
        <dl><div><dt>Physical display, logical size</dt><dd>{profile.screen.width} × {profile.screen.height} pt</dd></div><div><dt>Application window</dt><dd>{profile.window.width} × {profile.window.height} pt</dd></div><div><dt>Safe rectangle</dt><dd>{profile.window.width - profile.insets.left - profile.insets.right} × {profile.window.height - profile.insets.top - profile.insets.bottom} pt</dd></div><div><dt>Insets · top / right / bottom / left</dt><dd>{profile.insets.top} / {profile.insets.right} / {profile.insets.bottom} / {profile.insets.left} pt</dd></div><div><dt>Modern8-bits grid</dt><dd>{rule.columns} columns · {rule.margin}pt margin · {rule.gap}pt gutter</dd></div><div><dt>Source context</dt><dd>{profile.measuredOn}</dd></div></dl>
        <p><a href={device.source} target="_blank" rel="noreferrer">View measurements on safearea.info ↗</a><br /><small>Retrieved {device.checkedOn}. {device.scope}.</small></p>
        <p className="m8-grid-caption">The preview maps one source point to one logical design unit, then scales to fit. It does not emulate browser chrome, device pixels, or native OS behavior.</p>
      </div>
    </div>
    {profile.reservedRegions.length > 0 ? <div className="m8-grid-callout"><strong>Check the hatched regions separately.</strong> Insets alone may leave cameras or pane dividers inside the safe rectangle. Place content in unobstructed panes; keep controls and text clear of every reported region.<div className="m8-grid-table-wrap"><table><caption>Reserved regions in this window · points from its top-left corner</caption><thead><tr><th scope="col">Kind</th><th scope="col">X / Y</th><th scope="col">Width × height</th></tr></thead><tbody>{profile.reservedRegions.map((region, index) => <tr key={index}><th scope="row">{region.kind}</th><td>{region.x} / {region.y}</td><td>{region.width} × {region.height}</td></tr>)}</tbody></table></div></div> : <p className="m8-grid-caption">No additional reserved-region geometry is supplied for this profile. The inset envelope is shown; camera and display-corner shapes are not drawn.</p>}
    <details><summary>Measurement coverage and unavailable configurations</summary><p>{device.profiles.length} measured window profiles are available for this device. The explorer offers only configurations with complete window and inset measurements; an unavailable value is never replaced with zero.</p>{device.omittedProfiles.length > 0 && <ul>{device.omittedProfiles.map(value => <li key={value}>{value} — unavailable in the source.</li>)}</ul>}<p>Duo profiles use the latest SDK section in the source. Split-left and split-right are separate application windows with local region coordinates; they are not reconstructed by rotating another profile. iPad values describe the listed full-screen configurations; resize and multi-window behavior still require runtime verification.</p></details>
  </div>
}

export function GridGuidance() {
  return <main className="m8-grid-guide sb-unstyled">
    <header className="m8-grid-header"><div className="m8-grid-header__content">
      <h1 tabIndex={-1}>Grid</h1>
      <p>Layout rules, responsive columns, and safe areas for web and mobile.</p>
      <p className="m8-grid-header__note">An 8px spacing rhythm · 4, 8, and 12 columns · Interactive web and device simulators</p>
    </div></header>
    <div className="m8-grid-body">
    <nav className="m8-grid-toc" aria-label="Grid guidance sections">
      <h2>On this page</h2>
      <div className="m8-grid-toc__links">{chapters.map(([id, label]) => <a key={id} href={`#${id}`} onClick={event => scrollToSection(event, id)}>{label}</a>)}</div>
      <button type="button" className="m8-grid-back-top" aria-label="Back to top" title="Back to top" onClick={scrollToTop}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" /></svg></button>
    </nav>
    <div className="m8-grid-content">

    <Section id="anatomy" number="01" title="Structure before decoration." intro="Use an 8px rhythm for layout, with 4px half-steps for compact spacing. Columns stretch between breakpoints; margins and gutters stay on the spacing scale.">
      <div className="m8-grid-anatomy" role="img" aria-label="Grid anatomy: outer margins surround columns; gutters separate columns; container padding sits inside each content block."><span className="m8-grid-anatomy__margin">Margin</span><div><div className="m8-grid-anatomy__columns"><span>Column</span><i>Gutter</i><span>Column</span><i>Gutter</i><span>Column</span></div><div className="m8-grid-anatomy__block"><span>Content container</span><small>Internal padding follows the spacing scale</small></div></div><span className="m8-grid-anatomy__margin">Margin</span></div>
      <div className="m8-grid-three-up"><article><h3>Margin</h3><p>Space from the main content boundary to the first and last columns. It is separate from device safe-area insets.</p></article><article><h3>Gutter</h3><p>Space between columns. Modern8-bits uses the current layout gutter value for both outer margins and column gaps.</p></article><article><h3>Padding</h3><p>Space inside a card or container. Use spacing tokens; a button or icon does not need its own page-grid column.</p></article></div>
      <p className="m8-grid-caption">Align top-level cards, media, forms, and headings. Keep navigation and side panels outside the main content grid. Floating overlays use their own positioning and safe bounds.</p>
    </Section>

    <Section id="responsive" number="02" title="One grid. Room to adapt." intro="Keep the existing Modern8-bits breakpoints: 4, 8, and 12 columns. Choose the breakpoint from the available application window, not the device name or physical resolution.">
      <WebExplorer />
      <div className="m8-grid-callout"><strong>Why some column options are unavailable</strong><p>Some layouts need a specific number of columns. For example, two sections that each use 6 columns need a 12-column grid. Choosing 8 would change their size or push content out of place, so that option is unavailable.</p><p>To try different column counts, choose <strong>Full-width content</strong> in the simulator. If you change the viewport or layout, the simulator returns to <strong>Auto</strong> when your selected count no longer fits.</p></div>
      <div className="m8-grid-table-wrap"><table><caption>Modern8-bits responsive grid · logical CSS pixels on web</caption><thead><tr><th scope="col">Range</th><th scope="col">Window width</th><th scope="col">Columns</th><th scope="col">Margin / gutter</th><th scope="col">Useful spans</th></tr></thead><tbody>{gridRules.map(rule => <tr key={rule.name}><th scope="row">{rule.name}</th><td>{rule.min === 0 ? '< 672' : `${rule.min}${rule.max ? `–${rule.max}` : '+'}`}px</td><td>{rule.columns}</td><td>{rule.margin} / {rule.gap}px</td><td>{rule.spans}</td></tr>)}</tbody></table></div>
      <p>Start checking at 320px and include the widths immediately before and after 672px and 1056px. A landscape phone can use the medium range; a resized tablet can use the small range. Match the content to the space that remains after app navigation and panels.</p>
      <p className="m8-grid-caption">The range follows the full app viewport/window. A nested pane can stack its contents earlier when its own available width is tight. Use container queries for that local adaptation rather than changing the global breakpoint tokens.</p>
    </Section>

    <Section id="patterns" number="03" title="Choose the layout by its task." intro="Columns provide alignment, not a requirement to fill every track. Let content length and minimum usable pane widths decide when the structure changes.">
      <p>Use the grid for structural alignment, then check visible content edges and balance inside components. Follow the shared <a href="./?path=/docs/foundation-alignment--docs" target="_top">Alignment rules →</a> for optical corrections, text baselines, and consistent layout anchors.</p>
      <div className="m8-grid-three-up m8-grid-patterns"><article><div className="m8-grid-pattern m8-grid-pattern--reading" aria-hidden="true"><span /><span /><span /></div><h3>Reading</h3><p>Center a text column inside the constrained grid. Start near 65ch for body copy and test the actual type and content.</p></article><article><div className="m8-grid-pattern m8-grid-pattern--dashboard" aria-hidden="true"><span /><span /><span /></div><h3>Dashboard</h3><p>Use a container capped at 1440px, including margins. Stack on small windows, then span 4 of 8 or 6 of 12 columns for halves.</p></article><article><div className="m8-grid-pattern m8-grid-pattern--board" aria-hidden="true"><span /><span /><span /></div><h3>Board or canvas</h3><p>Use fluid width when horizontal space serves the task. Contain intentional board overflow; keep page navigation and controls reachable.</p></article></div>
      <div className="m8-grid-callout"><h3>Bento layout</h3><p>Mix a larger feature card with smaller supporting cards on the same grid. Keep consistent gaps, let rows grow with their content, and stack cards in reading order on small screens. Card size provides hierarchy; static cards stay flat.</p><p><a href="./?path=/story/foundation-grid--bento-layout" target="_top">Try the Bento Layout example →</a> with column guides and longer placeholder text.</p></div>
      <div className="m8-grid-two-up"><article><h3>Responsive → adaptive</h3><p>Resize columns first. When two panes no longer fit, move to one pane with a clear back action. A tablet in a narrow window needs the narrow layout.</p></article><article><h3>Reflow with real content</h3><p>Use <code>minmax(0, 1fr)</code> and <code>min-width: 0</code>. Wrap long text and expand rows naturally. Check zoom, large text, keyboard focus, and RTL reading order.</p></article></div>
    </Section>

    <Section id="safe-areas" number="04" title="Design inside the usable window." intro="A safe area protects content from system UI and display edges. Apply the device insets first, then add the Modern8-bits design margin inside that rectangle.">
      <div className="m8-grid-callout"><strong>Window → safe rectangle → design margin → content grid.</strong><p>Backgrounds and decorative media may reach the display edge. Labels, controls, and essential content stay inside the safe bounds and outside reserved regions.</p></div>
      <SafeAreaExplorer />
      <div className="m8-grid-three-up"><article><h3>Use logical units</h3><p>These source measurements use Apple points (pt). Web layout uses CSS pixels; a point is not a physical pixel. The simulator uses a 1:1 logical design mapping only.</p></article><article><h3>Read runtime insets</h3><p>For production, read the host platform’s safe-area values. Browser bars, keyboards, zoom, orientation, and window resizing can change the usable region. Device profiles are design references.</p></article><article><h3>Respect fold &amp; window state</h3><p>Duo configurations include folded states, toolbars, camera occlusions, and split windows. A rectangular inset cannot describe every obstruction. Keep each pane usable independently.</p></article></div>
      <p>On iPad, check portrait, landscape, display zoom, and resized app windows. On phones, test both landscape directions and the bottom action area with the keyboard open. Keyboard avoidance is a separate layout concern; safe-area bottom is not keyboard height.</p>
    </Section>

    <Section id="implementation" number="05" title="Apply it consistently." intro="These recipes use existing Modern8-bits tokens. The grid preview is documentation; native application components are not part of this React library.">
      <details open><summary>Web · responsive content grid</summary><pre><code>{webGridExample}</code></pre></details>
      <details><summary>Web / installed web app · safe-area ownership</summary><pre><code>{safeAreaExample}</code></pre><p>Let the shell own top and side insets once. Add design spacing inside it. A fixed footer owns its own inset, and scrolling content reserves the footer’s full height so its last item remains reachable.</p><p><code>env(safe-area-inset-*, 0px)</code> uses the browser’s reported values. A zero value does not prove that every native reserved region is exposed to the web; test the target host. A wrapping native app must coordinate inset ownership with its web content.</p></details>
      <details><summary>Native applications · platform handoff</summary><p>Apply the same spacing, column, and adaptation rules in platform logical units. Let the native root layout guide constrain controls; add design margins inside it. Extend backgrounds deliberately, keep bottom actions above the gesture region, and coordinate keyboard avoidance separately.</p><p>Read window size, safe-area bounds, and any available occlusion or pane geometry from the host at runtime. Recalculate on rotation, resizing, fold-state changes, and system UI changes. Treat reference profiles as test cases, not production device-detection rules.</p></details>
      <div className="m8-grid-two-up"><article><h3>In Figma</h3><p>Use a frame in logical units. Draw the sourced safe rectangle and reserved regions as named guides, then place a stretch column grid inside the design margins. Use auto layout for content; fixed coordinates describe the device regions only.</p><p>This page introduces code-side guidance. It does not claim that corresponding Figma grid assets have been authored or synchronized.</p></article><article><h3>Before sharing</h3><ul><li>Check 320px, breakpoint boundaries, and a wide window.</li><li>Check every supported orientation and relevant device mode.</li><li>Keep the last action visible above bottom chrome and keyboard.</li><li>Check long content, text zoom, RTL, focus, and overflow.</li><li>Review default and low-fidelity in light and dark.</li></ul></article></div>
    </Section>

    <Section id="extend" number="06" title="Add a device. Keep the guidance." intro="Device cards, selectors, diagrams, measurements, and source links all read the same local dataset. Adding a verified profile updates them together on the next documentation build.">
      <div className="m8-grid-device-list">{devices.map(device => <article key={device.id}><span className="m8-grid-kicker">{device.profiles.length} WINDOW PROFILES</span><h3>{device.name}</h3><p>{device.scope}</p><a href={device.source} target="_blank" rel="noreferrer">Device reference ↗</a></article>)}</div>
      <p>Ask a coding agent: <strong>“Add [device name] to the Modern8-bits Grid guidance using safearea.info. Follow docs/agents/grid-devices.md and run the documented validation.”</strong></p>
      <p><a href="./grid-devices.md" target="_blank" rel="noreferrer">Read the AI device-extension guide ↗</a> · <a href="./grid-devices.json" target="_blank" rel="noreferrer">Download the current measurement data ↗</a></p>
      <details><summary>Maintainer import command</summary><pre><code>node scripts/sync-safearea.mjs &lt;slug-from-safearea.info&gt;</code></pre><p>Run from the repository root. The importer validates geometry and updates the dataset; it leaves unavailable measurements out of the explorer. Build Storybook to refresh its downloadable guide and data. Publishing uses the project’s normal deployment workflow.</p></details>
    </Section>

    <section id="references" className="m8-grid-section" aria-labelledby="grid-references-title"><div className="m8-grid-section__heading"><span className="m8-grid-kicker">07 / REFERENCES</span><h2 id="grid-references-title" tabIndex={-1}>Learn from the foundations.</h2><p>The principles are informed by these references. Breakpoints, columns, and spacing remain Modern8-bits decisions.</p></div><div className="m8-grid-two-up">{references.map(reference => <article key={reference.url}><h3><a href={reference.url} target="_blank" rel="noreferrer">{reference.name} ↗</a></h3><p>{reference.contribution}</p></article>)}</div></section>
    <footer className="m8-grid-footer">MODERN8-BITS / GRID &amp; SAFE AREAS<span>8px rhythm. Content comes first.</span></footer>
    </div>
    </div>
  </main>
}
