import { useState } from 'react'
import { Button } from '../components/Button/Button'
import { Checkbox } from '../components/Checkbox/Checkbox'
import { Input } from '../components/Input/Input'

export function TokenUsage() {
  const [appearance, setAppearance] = useState<'light' | 'dark'>('light')
  return (
    <div className="m8-token-usage" data-theme={appearance}>
      <div className="m8-token-usage__actions" role="group" aria-label="Example appearance">
        <Button variant={appearance === 'light' ? 'contained' : 'outline'} aria-pressed={appearance === 'light'} onClick={() => setAppearance('light')}>Light examples</Button>
        <Button variant={appearance === 'dark' ? 'contained' : 'outline'} aria-pressed={appearance === 'dark'} onClick={() => setAppearance('dark')}>Dark examples</Button>
      </div>
      <p>Raw palette values belong in primitives. Semantic roles describe intent; component colours reference those roles.</p>
      <p><code>chip/strong/background → background/contrast → neutral/800</code> in light appearance. The dark mapping ends at <code>neutral/50</code>.</p>
      <h3>Status fills and inline feedback</h3>
      <p>Use <code>status/on-*</code> on its paired fill. Use <code>status/*/text</code> for inline feedback on neutral surfaces. Keep an explicit message alongside colour.</p>
      <div className="m8-token-usage__statuses">
        {(['error', 'success', 'info'] as const).map(status => (
          <div key={status}>
            <div className={`m8-token-usage__status m8-token-usage__status--${status}`}>
              <strong>{status === 'error' ? 'Error: changes could not be saved.' : status === 'success' ? 'Success: changes were saved.' : 'Information: changes save when you confirm.'}</strong>
              <code>status/{status} + status/on-{status}</code>
            </div>
            <p className={`m8-token-usage__inline m8-token-usage__inline--${status}`}>
              {status === 'error' ? 'Error: enter a valid value.' : status === 'success' ? 'Success: your entry is valid.' : 'Information: this field is optional.'}
            </p>
          </div>
        ))}
      </div>
      <Input label="Email address" error="Error: enter a valid email address." defaultValue="not-an-email" />
      <h3>Interaction states</h3>
      <p>Hover or press the buttons, use Tab to inspect focus, and check the option. Hover and pressed feedback are temporary; selection persists. Focus stays visible independently of selection.</p>
      <div className="m8-token-usage__actions">
        <Button size="medium">Primary action</Button>
        <Button variant="outline" size="medium">Outlined action</Button>
        <Button variant="ghost" size="medium">Ghost action</Button>
        <Button size="medium" disabled>Unavailable</Button>
      </div>
      <Checkbox label="Selected option" description="A check mark and checked semantics communicate selection." defaultChecked />
      <Checkbox label="Unavailable option" defaultChecked disabled />
    </div>
  )
}
