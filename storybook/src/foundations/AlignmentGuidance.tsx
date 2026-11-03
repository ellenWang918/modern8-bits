import { useId, useState, type MouseEvent, type ReactNode } from 'react'
import './grid.css'
import './alignment-guidance.css'

const chapters = [['principle', 'The rule'], ['components', 'Icons & shapes'], ['typography', 'Text & baselines'], ['layouts', 'Layout edges'], ['implementation', 'Apply consistently'], ['review', 'Review checklist']] as const
type ExampleKind = 'play' | 'shape' | 'baseline' | 'quote' | 'layout'

function navigate(event: MouseEvent<HTMLAnchorElement>, id: string) {
  event.preventDefault()
  const section = event.currentTarget.closest('.m8-alignment-guide')?.querySelector<HTMLElement>(`#alignment-${id}`)
  section?.scrollIntoView({ block: 'start', behavior: 'instant' })
  section?.querySelector<HTMLElement>('h2')?.focus({ preventScroll: true })
}

function backToTop(event: MouseEvent<HTMLButtonElement>) {
  const heading = event.currentTarget.closest('.m8-alignment-guide')?.querySelector<HTMLElement>('h1')
  heading?.closest('header')?.scrollIntoView({ block: 'start', behavior: 'instant' })
  heading?.focus({ preventScroll: true })
}

function Section({ id, number, title, intro, children }: { id: string; number: string; title: string; intro: string; children: ReactNode }) {
  return <section id={`alignment-${id}`} className="m8-grid-section" aria-labelledby={`alignment-${id}-title`}>
    <div className="m8-grid-section__heading"><span className="m8-grid-kicker">{number} / ALIGNMENT</span><h2 id={`alignment-${id}-title`} tabIndex={-1}>{title}</h2><p>{intro}</p></div>
    {children}
  </section>
}

function Diagram({ kind, adjusted, label }: { kind: ExampleKind; adjusted: boolean; label: string }) {
  return <svg viewBox="0 0 300 180" className="m8-alignment-diagram" role="img" aria-label={label}>
    {kind === 'play' && <>
      <circle className="m8-alignment-frame" cx="150" cy="90" r="60" />
      <g className="m8-alignment-guides"><path d="M72 90H228M150 12V168" /><rect x="132" y="66" width="36" height="48" /></g>
      {/* Enlarged 3×: this 24-unit triangle's centroid is 2 units left of its box centre. */}
      <g transform={`translate(${adjusted ? 120 : 114} 54) scale(3)`}><path className="m8-alignment-ink" d="M6 4 18 12 6 20Z" /></g>
    </>}
    {kind === 'shape' && <>
      <rect className="m8-alignment-ink" x="60" y="64" width="52" height="52" />
      <circle className="m8-alignment-ink" cx="214" cy="90" r={adjusted ? 28 : 26} />
      <g className="m8-alignment-guides"><path d="M40 64H254M40 116H254M86 40V140M214 40V140" /></g>
    </>}
    {kind === 'baseline' && <>
      <g className="m8-alignment-guides"><path d="M20 98H280" /></g>
      <text className="m8-alignment-display" x="24" y="98" fontSize="32">Balance</text>
      <text x="174" y={adjusted ? 98 : 88} fontSize="14">Updated</text>
    </>}
    {kind === 'quote' && <>
      <g className="m8-alignment-guides"><path d="M44 22V158" /></g>
      <g className="m8-alignment-display" fontSize="30"><text x={adjusted ? 28 : 44} y="68">“</text><text x={adjusted ? 44 : 60} y="68">Good design</text><text x="44" y="112">feels clear.”</text></g>
    </>}
    {kind === 'layout' && <>
      <rect className="m8-alignment-frame" x="24" y="66" width="252" height="100" rx="4" />
      <text className="m8-alignment-display" x={adjusted ? 44 : 24} y="42" fontSize="24">Workspace</text>
      <text x="44" y="100" fontSize="16">Project overview</text>
      <rect className="m8-alignment-placeholder" x="44" y="114" width="172" height="8" /><rect className="m8-alignment-placeholder" x="44" y="134" width="124" height="8" />
      <g className="m8-alignment-guides"><path d="M44 16V170" /></g>
    </>}
  </svg>
}

function Comparison({ kind, title, before, after, children }: { kind: ExampleKind; title: string; before: string; after: string; children: ReactNode }) {
  return <article className="m8-alignment-example" aria-label={title}>
    <h3>{title}</h3>
    <div className="m8-alignment-comparison">
      <figure><figcaption><span>BEFORE</span>{before}</figcaption><Diagram kind={kind} adjusted={false} label={`${title}: ${before}`} /></figure>
      <figure><figcaption><span>AFTER</span>{after}</figcaption><Diagram kind={kind} adjusted label={`${title}: ${after}`} /></figure>
    </div>
    <div className="m8-alignment-explanation">{children}</div>
  </article>
}

const recipe = `/* Scope to this particular 24px play asset, after visual review.
   Its triangle is M6 4 L18 12 L6 20 Z; the correction is not universal. */
.play-control {
  inline-size: 44px;
  block-size: 44px;
  display: grid;
  place-items: center;
}
.play-control svg { inline-size: 24px; block-size: 24px; }
.play-control__shape { transform: translateX(2px); }

/* Text that shares a line should share its baseline. */
.heading-with-meta { display: flex; align-items: baseline; gap: var(--m8-space-2); }

/* Multiline content: align the icon with the first text line. */
.message { display: grid; grid-template-columns: 24px minmax(0, 1fr);
  align-items: start; gap: var(--m8-space-2); }
.message__text { margin: 0; line-height: 24px; }
/* Here both the icon and first line are 24px high; no offset is needed. */`

export function AlignmentGuidance({ initialTheme = 'light', initialPresentation = 'default' }: { initialTheme?: 'light' | 'dark'; initialPresentation?: 'default' | 'low-fidelity' }) {
  const id = useId()
  const [guides, setGuides] = useState(true)
  const [theme, setTheme] = useState(initialTheme)
  const [presentation, setPresentation] = useState(initialPresentation)
  return <main className="m8-grid-guide m8-alignment-guide sb-unstyled" data-theme={theme} data-presentation={presentation} data-guides={guides}>
    <header className="m8-grid-header"><div className="m8-grid-header__content">
      <h1 tabIndex={-1}><span className="m8-alignment-title-ink">Alignment</span></h1>
      <p>Make the structure precise, then make it look right.</p>
      <p className="m8-grid-header__note">Geometric and optical alignment · Rules for every component and layout · Original Modern8-bits guidance</p>
    </div></header>
    <div className="m8-grid-body">
      <nav className="m8-grid-toc" aria-label="Alignment guidance sections"><h2>On this page</h2><div className="m8-grid-toc__links">{chapters.map(([key, label]) => <a key={key} href={`#alignment-${key}`} onClick={event => navigate(event, key)}>{label}</a>)}</div><button type="button" className="m8-grid-back-top" aria-label="Back to top" title="Back to top" onClick={backToTop}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" /></svg></button></nav>
      <div className="m8-grid-content">
        <Section id="principle" number="01" title="Align the structure. Balance the content." intro="Geometric alignment matches boxes, centres, edges, and baselines. Optical alignment makes a small correction when the visible shape or text still appears out of place.">
          <div className="m8-grid-callout"><strong>Our rule</strong><p>All components and layouts start with geometric alignment. Check their visible content at its intended size. When a mismatch remains, use the smallest useful correction inside the component, and record why it is needed.</p></div>
          <div className="m8-grid-two-up m8-alignment-principles"><article><h3>Keep the structure dependable</h3><p>Grid lines, container edges, padding, gaps, input boundaries, focus rings, and interactive hit areas remain consistent. Fix an incorrect layout or an asset’s empty bounds before adding an offset.</p></article><article><h3>Judge what people actually see</h3><p>Transparent space, uneven shapes, and font metrics can make equal boxes look unequal. Compare visible edges and visual weight, with guides both on and off.</p></article></div>
          <p className="m8-grid-caption">These are our own system rules and teaching diagrams. They do not prescribe a universal correction or claim that every existing component or Figma asset has already been reviewed.</p>
          <div className="m8-alignment-controls" role="group" aria-label="Documentation display settings">
            <label htmlFor={`${id}-theme`}>Appearance<select id={`${id}-theme`} value={theme} onChange={event => setTheme(event.target.value === 'dark' ? 'dark' : 'light')}><option value="light">Light</option><option value="dark">Dark</option></select></label>
            <label htmlFor={`${id}-presentation`}>Presentation<select id={`${id}-presentation`} value={presentation} onChange={event => setPresentation(event.target.value === 'low-fidelity' ? 'low-fidelity' : 'default')}><option value="default">Default</option><option value="low-fidelity">Low-fidelity</option></select></label>
            <label className="m8-alignment-check"><input type="checkbox" checked={guides} onChange={event => setGuides(event.target.checked)} />Show alignment guides</label>
          </div>
          <p className="m8-grid-caption">Dashed lines show the reference edge, centre, or baseline. All examples below use the selected appearance and presentation. Diagrams scale to fit; their dimensions are illustrative.</p>
        </Section>
        <Section id="components" number="02" title="Centre the visible shape." intro="Use a consistent icon frame, then inspect the shape inside it. A correction belongs to that asset and size, rather than every icon on the page.">
          <Comparison kind="play" title="A play icon inside a control" before="Bounding box centred" after="Visible weight balanced">
            <p>The triangle’s bounding box is centred, but more of its area sits on the left. In this example, moving the triangle 2 units right balances it around the control’s centre. The drawing is enlarged 3× to show the difference.</p><p><strong>Keep fixed:</strong> the control, icon frame, focus ring, and clickable area. Adjust the path inside the icon. Other triangles, sizes, and arrow shapes may need a different correction or none.</p>
          </Comparison>
          <Comparison kind="shape" title="A circle next to a square" before="Equal measured size" after="Round shape slightly enlarged">
            <p>The circle can appear smaller because its edges taper away from the shared top and bottom. Here its diameter increases from 52 to 56 diagram units while its centre stays fixed.</p><p><strong>Use selectively:</strong> compare the actual shapes at their intended size. Allow room inside the same frame; preserve spacing and touch targets. Do not enlarge every round component or replace an authored logo’s proportions.</p>
          </Comparison>
        </Section>
        <Section id="typography" number="03" title="Align text by how it is read." intro="Text boxes include space above and below the glyphs. Use a shared baseline for text on one line, and the first line as the anchor for multiline labels.">
          <Comparison kind="baseline" title="A heading with smaller metadata" before="Centres aligned" after="Baselines aligned">
            <p>The smaller label looks detached when both text boxes are vertically centred. Sharing a baseline connects the two pieces of text without changing their sizes. Use <code>align-items: baseline</code> for the real text elements.</p><p><strong>For icons:</strong> align a small icon to the visible centre of a single text line. With a wrapping label, anchor it to the first line rather than the centre of the entire paragraph. Review the actual font, line height, and icon bounds before adding an offset.</p>
          </Comparison>
          <Comparison kind="quote" title="An opening quotation mark" before="Punctuation starts at the edge" after="Letters share a reading edge">
            <p>In a large editorial quote, the opening mark can sit in the margin so the first letters align with the following line. This is an optional optical treatment for display text.</p><p><strong>Reserve room:</strong> keep the quote as real text, preserve its reading order, and provide space for the mark. Check wrapping, translations, and zoom. Leave form labels, code, and ordinary body text on their normal alignment unless a specific need is established.</p>
          </Comparison>
        </Section>
        <Section id="layouts" number="04" title="Choose a visible edge to share." intro="Decide whether a group follows container boundaries, text edges, or baselines. Use one clear anchor for related content, then maintain it across the layout.">
          <Comparison kind="layout" title="A heading above a padded panel" before="Heading follows the panel boundary" after="Heading follows the content edge">
            <p>Here the heading introduces the text inside the panel, so aligning it with that text creates a clearer reading edge. Keep the panel’s padding and move the heading through the layout’s shared content inset.</p><p><strong>This is a layout decision:</strong> use grid, padding, or a shared wrapper. Do not translate the whole card to compensate. A page that deliberately aligns headings with panel boundaries can keep that choice consistently.</p>
          </Comparison>
          <div className="m8-grid-callout"><strong>In grids and Bento layouts</strong><p>Align card boundaries and gaps to the grid. Apply optical corrections to the content inside each card. With different title lengths, preserve common padding and content order; allow rows to grow. Independent cards do not need their text baselines forced into one row.</p><p><a href="./?path=/docs/foundation-grid--docs" target="_top">Grid guidance →</a> · <a href="./?path=/story/foundation-grid--bento-layout" target="_top">Bento layout →</a></p></div>
        </Section>
        <Section id="implementation" number="05" title="Make one correction reusable." intro="Resolve the cause at the smallest shared level: the icon asset, text style, component, or layout wrapper. Pages should not invent new offsets for the same component.">
          <ol className="m8-alignment-steps"><li><strong>Check the cause.</strong> Confirm the intended alignment, loaded font, asset bounds, padding, and line height. Remove accidental transparent space or incorrect structure first.</li><li><strong>Start with no correction.</strong> Compare actual content at its intended size. Try a small change only when the mismatch remains visible without guides.</li><li><strong>Own it locally.</strong> Record the asset, size, direction, value, and reason beside the rule. Review every supported size; scale a correction only after checking the result.</li><li><strong>Preserve behaviour.</strong> Keep the component’s layout bounds, focus outline, hit area, and reading order intact. Leave enough internal room to avoid clipping.</li></ol>
          <pre><code>{recipe}</code></pre>
          <p>The 8px spacing rhythm and 4px compact steps still govern layout spacing. An asset-specific optical correction may be smaller. A local 1px or 2px correction is an explained exception, not a new spacing token or permission to change surrounding gaps.</p>
          <p>Use logical start/end edges for layouts and text. In RTL, mirror directional icons only when their meaning requires it, then review the correction for that asset. A media play symbol keeps its direction; its correction does not automatically reverse with the page.</p>
          <p className="m8-grid-caption">The play-control recipe illustrates a dedicated asset. It does not add a custom-icon API to the existing Button, whose current icon is a fixed arrow. Match the same frame and visible-content correction when authoring the corresponding Figma component.</p>
        </Section>
        <Section id="review" number="06" title="Review the result, not just the numbers." intro="Alignment is complete when the structure is consistent and the content looks balanced in the conditions people will use.">
          <ul className="m8-alignment-review"><li>Compare the original and adjusted versions at normal size, with guides on and off. Keep the original when no clear improvement is visible.</li><li>Check every supported component size and state, including focus, disabled, loading, and error where available.</li><li>Review the authored font and a fallback font, short and wrapping labels, numbers, and translated content. Avoid per-word offsets.</li><li>Check narrow and wide layouts, RTL where supported, and 200% browser zoom or increased text size. Prevent clipping and overlap.</li><li>Review light, dark, default, and low-fidelity. Optical corrections remain when needed for balance; low-fidelity removes decoration, not meaningful alignment.</li><li>Record the reason and ownership. Recheck after changing the font, icon geometry, stroke, component size, or surrounding layout.</li></ul>
          <div className="m8-grid-callout"><strong>Before sharing a component or layout</strong><p>Be able to name its alignment anchor, explain any local correction, and show that the focus area, spacing, and reading order remain intact.</p></div>
        </Section>
        <footer className="m8-grid-footer">MODERN8-BITS / ALIGNMENT<span>Precise structure. Balanced content.</span></footer>
      </div>
    </div>
  </main>
}
