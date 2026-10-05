import { useState, type FormEvent } from 'react'
import { Badge, Button, Card, Checkbox, Input } from '../components'
import '../styles/presentation.css'
import './getting-started.css'

export function GettingStarted() {
  const [appearance, setAppearance] = useState<'light' | 'dark'>('light')
  const [presentation, setPresentation] = useState<'default' | 'low-fidelity'>('default')
  const [name, setName] = useState('')
  const [keepNotes, setKeepNotes] = useState(false)
  const [attempted, setAttempted] = useState(false)
  const [saved, setSaved] = useState(false)
  const error = attempted && !name.trim() ? 'Error: enter a project name.' : undefined

  function save(event: FormEvent) {
    event.preventDefault()
    setAttempted(true)
    setSaved(Boolean(name.trim()))
  }

  return (
    <main className="m8-getting-started">
      <header>
        <h1>Getting Started</h1>
        <p>Start with a coherent default, or explore the structure in low-fidelity. Both use the same components and layout rules.</p>
      </header>
      <section aria-labelledby="mode-choice-title">
        <h2 id="mode-choice-title">Choose how you want to start</h2>
        <p><strong>Default theme</strong> shows the Modern8-bits typography and optional pixel accents. <strong>Low-fidelity</strong> uses plain type, grayscale feedback, and minimal decoration so you can review structure.</p>
        <div className="m8-getting-started__controls">
          <fieldset><legend>Presentation</legend><div>
            {(['default', 'low-fidelity'] as const).map(mode => <Button key={mode} size="medium" variant={presentation === mode ? 'contained' : 'outline'} aria-pressed={presentation === mode} onClick={() => setPresentation(mode)}>{mode === 'default' ? 'Default theme' : 'Low-fidelity'}</Button>)}
          </div></fieldset>
          <fieldset><legend>Appearance</legend><div>
            {(['light', 'dark'] as const).map(mode => <Button key={mode} size="medium" variant={appearance === mode ? 'contained' : 'outline'} aria-pressed={appearance === mode} onClick={() => setAppearance(mode)}>{mode === 'light' ? 'Light' : 'Dark'}</Button>)}
          </div></fieldset>
        </div>
      </section>
      <section aria-labelledby="example-title">
        <h2 id="example-title">Try the same example</h2>
        <p>Enter a name, change the checkbox, and save. Switch either control above: your values and result stay in place. This example stores state only while the page is open.</p>
        <div className="m8-getting-started__example" data-theme={appearance} data-presentation={presentation}>
          <div className="m8-getting-started__badges"><Badge>Component example</Badge><Badge variant="pixel">Pixel accent</Badge></div>
          <Card eyebrow="A SHARED FOUNDATION" title="Start your project">
            <form onSubmit={save} noValidate>
              <Input label="Project name" value={name} onChange={event => { setName(event.target.value); setSaved(false) }} hint="Choose a short, clear name." error={error} autoComplete="off" />
              <Checkbox label="Keep planning notes" description="Include notes when you save this example." checked={keepNotes} onChange={event => { setKeepNotes(event.target.checked); setSaved(false) }} />
              <div className="m8-getting-started__actions"><Button type="submit" size="large">Save example</Button><Button size="large" disabled>Unavailable action</Button></div>
              <p role="status" className="m8-getting-started__result">{saved ? `Success: “${name.trim()}” saved in this example${keepNotes ? ' with planning notes' : ''}.` : 'Nothing saved yet.'}</p>
            </form>
          </Card>
        </div>
      </section>
      <section aria-labelledby="building-title">
        <h2 id="building-title">Build with the available pieces</h2>
        <ol>
          <li>Choose presentation and appearance before adding components.</li>
          <li>Use Button for actions, Input for text entry, Checkbox for selection, Badge for short labels, and Card for grouped content.</li>
          <li>Use semantic colours and the shared spacing and typography roles from <a href="?path=/docs/foundation-design-token--docs">Design Token</a>.</li>
          <li>Review keyboard focus, error messages, disabled states, and narrow layouts before sharing.</li>
        </ol>
        <p>For coding agents, begin with: <strong>“Would you like the default Modern8-bits theme, or a low-fidelity prototype to review the structure?”</strong> Use the choice already given when one exists.</p>
        <p>The repository's <code>USAGE.md</code> contains imports, setup, mode rules, and the current component limits. When a capability is missing, describe the gap before adding a new component or API.</p>
      </section>
    </main>
  )
}
