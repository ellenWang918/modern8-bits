import { useEffect, useId, useRef, useState, type CSSProperties } from 'react'
import { Button, Input, Checkbox } from '../components'
import { devices, gridFor, type DeviceProfile } from '../foundations/grid.data'
import { columnPolicy, type ColumnChoice } from '../foundations/grid.columns'
import { mobileContentRect } from './mobile-grid.geometry'
import './mobile-grid-prototype.css'

const screens = ['Home', 'Browse', 'Details'] as const
type Screen = typeof screens[number]
const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. A short piece of placeholder content goes here.'
const longHeading = 'A longer placeholder heading to see how the layout handles content that needs several lines.'

export function MobileGridMockup() {
  const id = useId()
  const [deviceId, setDeviceId] = useState(devices[0].id)
  const [profileId, setProfileId] = useState(devices[0].profiles[0].id)
  const [screen, setScreen] = useState<Screen>('Home')
  const [selection, setSelection] = useState<ColumnChoice>('auto')
  const [notice, setNotice] = useState('')
  const [guides, setGuides] = useState(false)
  const [insetsVisible, setInsetsVisible] = useState(true)
  const [long, setLong] = useState(false)
  const [theme, setTheme] = useState('light')
  const [presentation, setPresentation] = useState('low-fidelity')
  const [name, setName] = useState('')
  const [saved, setSaved] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [available, setAvailable] = useState(440)
  const stage = useRef<HTMLDivElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const device = devices.find(item => item.id === deviceId) ?? devices[0]
  const profile = device.profiles.find(item => item.id === profileId) ?? device.profiles[0]
  const rule = gridFor(profile.window.width)
  const policy = columnPolicy(profile.window.width, rule.columns, `This layout uses ${rule.columns}-column alignment for its header, content and bottom actions. Other counts would change their layout.`)
  const chosen = policy.accepts(selection) ? selection : 'auto'
  const columns = chosen === 'auto' ? rule.columns : Number(chosen)
  const content = mobileContentRect(profile)
  const scale = Math.min(1, available / profile.window.width, 720 / profile.window.height)
  const orientations = [...new Set(device.profiles.map(item => item.orientation))]
  const configurations = device.profiles.filter(item => item.orientation === profile.orientation)
  useEffect(() => {
    const observer = new ResizeObserver(entries => setAvailable(entries[0].contentRect.width))
    if (stage.current) observer.observe(stage.current)
    return () => observer.disconnect()
  }, [])
  useEffect(() => { scroller.current?.scrollTo({ top: 0 }) }, [screen])
  function changeProfile(next: DeviceProfile) {
    const nextColumns = gridFor(next.window.width).columns
    if (!columnPolicy(next.window.width, nextColumns).accepts(selection)) {
      setSelection('auto'); setNotice('Columns returned to Auto because this window uses a different grid.')
    } else setNotice('')
    setProfileId(next.id)
  }
  function changeDevice(value: string) {
    const next = devices.find(item => item.id === value)!
    setDeviceId(next.id)
    changeProfile(next.profiles[0])
  }
  const heading = (short: string) => long ? longHeading : short
  const style = {
    '--mp-columns': columns,
    '--mp-gap': `${rule.gap}px`,
    '--mp-margin': `${rule.margin}px`,
  } as CSSProperties
  return <main className="mp-review" data-theme={theme} data-presentation={presentation}>
    <header className="mp-intro"><p className="mp-kicker">MODERN8-BITS / GRID EXPERIMENT 02</p><h1>A little space. A complete layout.</h1><p>A mobile app mockup with grey boxes, placeholder text, and room for the device.</p></header>
    <section className="mp-controls" aria-label="Mobile mockup controls">
      <label>Device<select value={device.id} onChange={event => changeDevice(event.target.value)}>{devices.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
      <label>Orientation<select value={profile.orientation} onChange={event => changeProfile(device.profiles.find(item => item.orientation === event.target.value)!)}>{orientations.map(value => <option key={value}>{value}</option>)}</select></label>
      <label>Measured configuration<select value={profile.id} onChange={event => changeProfile(device.profiles.find(item => item.id === event.target.value)!)}>{configurations.map(item => <option key={item.id} value={item.id}>{item.label.split(' · ').slice(1).join(' · ')}</option>)}</select></label>
      <label>Screen<select value={screen} onChange={event => setScreen(event.target.value as Screen)}>{screens.map(value => <option key={value}>{value}</option>)}</select></label>
      <label>Columns<select value={chosen} aria-describedby={`${id}-columns-help`} onChange={event => { if (policy.accepts(event.target.value)) { setSelection(event.target.value); setNotice('') } }}><option value="auto">Auto · {rule.columns} columns</option>{policy.options.map(option => <option key={option.count} value={option.count} disabled={!option.allowed}>{option.count} columns{option.allowed ? '' : ' — unavailable for this layout'}</option>)}</select></label>
      <label>Appearance<select value={theme} onChange={event => setTheme(event.target.value)}><option value="light">Light</option><option value="dark">Dark</option></select></label>
      <label>Presentation<select value={presentation} onChange={event => setPresentation(event.target.value)}><option value="low-fidelity">Low-fidelity</option><option value="default">Default</option></select></label>
      <label className="mp-check"><input type="checkbox" checked={guides} onChange={event => setGuides(event.target.checked)}/> Grid guides</label>
      <label className="mp-check"><input type="checkbox" checked={insetsVisible} onChange={event => setInsetsVisible(event.target.checked)}/> Safe-area guides</label>
      <label className="mp-check"><input type="checkbox" checked={long} onChange={event => setLong(event.target.checked)}/> Long text</label>
    </section>
    <p id={`${id}-columns-help`} className="mp-help">{policy.explanation}</p>
    <p role="status" aria-label="Mobile preview measurements" className="mp-help">{notice} {profile.window.width} × {profile.window.height} pt window · {columns} columns · {rule.margin}pt margins · {rule.gap}pt gutters · {Math.round(scale * 100)}% preview scale</p>
    <div className="mp-workbench">
      <div ref={stage} className="mp-stage">
        <div style={{ width: profile.window.width * scale, height: profile.window.height * scale }}>
          <div className="mp-window" data-testid="mobile-window" data-profile={profile.id} data-columns={columns} style={{ ...style, width: profile.window.width, height: profile.window.height, transform: `scale(${scale})` }}>
            {insetsVisible && <>
              <div className="mp-inset" style={{ inset: `0 0 auto 0`, height: profile.insets.top }}/>
              <div className="mp-inset" style={{ inset: `auto 0 0 0`, height: profile.insets.bottom }}/>
              <div className="mp-inset" style={{ inset: `0 auto 0 0`, width: profile.insets.left }}/>
              <div className="mp-inset" style={{ inset: `0 0 0 auto`, width: profile.insets.right }}/>
              <div className="mp-safe-outline" style={{ left: profile.insets.left, top: profile.insets.top, width: profile.window.width - profile.insets.left - profile.insets.right, height: profile.window.height - profile.insets.top - profile.insets.bottom }}/>
            </>}
            {content ? <div className="mp-app" data-testid="mobile-content" style={{ left: content.x, top: content.y, width: content.width, height: content.height }}>
              <header className="mp-app-header mp-grid"><strong>Placeholder®</strong><span>{screen}</span></header>
              <div ref={scroller} className="mp-scroll" data-testid="mobile-scroll" tabIndex={0} aria-label={`${screen} screen content`}>
                {screen === 'Home' && <div className="mp-grid mp-body">
                  <div className="mp-full"><p className="mp-kicker">01 / Your day, in one place</p><h2>{heading('Make room for what matters.')}</h2><p>{text}</p></div>
                  <div className="mp-box mp-full mp-hero-box">Featured content placeholder / 3:2</div>
                  <h3 className="mp-full">{heading('A few things to explore')}</h3>
                  {[1, 2].map(n => <article className="mp-half" key={n}><div className="mp-box mp-small-box">Placeholder 0{n}</div><h4>{heading(`A short title ${n}`)}</h4><p>{text}</p></article>)}
                  <article className="mp-full mp-note"><h3>One more placeholder</h3><p>{text} {text}</p></article>
                </div>}
                {screen === 'Browse' && <div className="mp-grid mp-body"><div className="mp-full"><p className="mp-kicker">02 / Browse the collection</p><h2>{heading('Something for your next idea.')}</h2><p>{text}</p></div>{[1, 2, 3, 4].map(n => <article className="mp-full mp-list-item" key={n}><div className="mp-box">0{n}</div><div><h3>{heading(`Placeholder item ${n}`)}</h3><p>{text}</p><button onClick={() => setScreen('Details')}>View details →</button></div></article>)}</div>}
                {screen === 'Details' && <form id={`${id}-form`} className="mp-grid mp-body" onSubmit={event => { event.preventDefault(); setSubmitted(true) }}><div className="mp-full"><p className="mp-kicker">03 / A little more detail</p><h2>{heading('Your placeholder details.')}</h2><p>{text}</p></div><div className="mp-box mp-full mp-wide-box">Content placeholder / 2:1</div><div className="mp-full"><Input label="Placeholder name" required value={name} onChange={event => { setName(event.target.value); setSubmitted(false) }}/></div><div className="mp-full"><Checkbox label="Save this placeholder" checked={saved} onChange={event => setSaved(event.target.checked)}/></div>{submitted && <p className="mp-full" role="status" aria-label="Placeholder confirmation">Placeholder saved for this preview. Nothing is sent or stored.</p>}<p className="mp-full">{text} {text}</p></form>}
              </div>
              <footer className="mp-bottom">
                <div className="mp-bottom-action">{screen === 'Details' ? <Button size="large" type="submit" form={`${id}-form`}>Save placeholder</Button> : <Button size="large" onClick={() => setScreen('Details')}>View placeholder</Button>}</div>
                <nav aria-label="Mobile app navigation">{screens.map(value => <button key={value} aria-pressed={screen === value} onClick={() => setScreen(value)}>{value}</button>)}</nav>
              </footer>
              {guides && <div className="mp-column-guides" aria-hidden="true">{Array.from({ length: columns }, (_, n) => <span key={n}/>)}</div>}
            </div> : <p className="mp-empty">No clear content area is available in this configuration.</p>}
            {profile.reservedRegions.map((region, n) => <div className="mp-reserved" data-testid="mobile-reserved-region" key={n} title={`Measured ${region.kind} region`} aria-label={`Reserved ${region.kind} region`} style={{ left: region.x, top: region.y, width: region.width, height: region.height }}/>) }
          </div>
        </div>
        <ul className="mp-legend" aria-label="Mobile preview legend">
          <li><i className="mp-legend-inset" aria-hidden="true"/><span>System inset{!insetsVisible && <small> (guides off)</small>}</span></li>
          <li><i className="mp-legend-safe" aria-hidden="true"/><span>Safe rectangle{!insetsVisible && <small> (guides off)</small>}</span></li>
          <li><i className="mp-legend-columns" aria-hidden="true"/><span>Content columns{!guides && <small> (guides off)</small>}</span></li>
          <li><i className="mp-legend-reserved" aria-hidden="true"/><span>Reserved region{profile.reservedRegions.length === 0 && <small> (none recorded)</small>}</span></li>
        </ul>
        <p className="mp-legend-help">Grey bands show space reserved by the device. Keep important text and controls inside the dashed safe rectangle and clear of any hatched areas.</p>
      </div>
      <aside className="mp-notes" aria-label="Mobile layout explanation"><p className="mp-kicker">WHAT TO LOOK FOR</p><h2>Content has its own safe space.</h2><ol><li>The measured window sets the outer size.</li><li>Safe-area insets leave room at the edges.</li><li>Content stays clear of recorded camera and divider regions.</li><li>Design margins sit inside the usable area.</li><li>Content scrolls while the bottom action stays reachable.</li></ol><dl><div><dt>Insets · top / right / bottom / left</dt><dd>{profile.insets.top} / {profile.insets.right} / {profile.insets.bottom} / {profile.insets.left} pt</dd></div>{content && <div><dt>Clear content area before design margins</dt><dd>{content.width.toFixed(1)} × {content.height.toFixed(1)} pt</dd></div>}<div><dt>Source context</dt><dd>{profile.measuredOn}</dd></div></dl><p><a href={device.source} target="_blank" rel="noreferrer">View source measurements ↗</a><br/>Retrieved {device.checkedOn}.</p><p>{device.scope}. {device.omittedProfiles.length} configurations have unavailable measurements.</p><p>{profile.reservedRegions.length ? 'For this single-pane example, the app uses the largest clear rectangle after recorded obstructions are removed. Other clear areas are left empty.' : 'No additional reserved-region geometry is supplied for this profile. Camera and screen-corner shapes are not simulated.'}</p><p className="mp-limit">This is a browser layout preview using stored measurements: 1 source point maps to 1 design unit before scaling. It does not reproduce the native OS, browser bars, keyboard, or device pixels. Physical-device checks are still needed.</p></aside>
    </div>
  </main>
}
