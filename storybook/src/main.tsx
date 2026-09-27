import React from 'react'
import ReactDOM from 'react-dom/client'
import { Badge, Button, Card, Checkbox, Input } from './components'
import './styles/tokens.css'
import './styles/global.css'

function App() {
  return (
    <main className="showcase" data-theme="light">
      <header className="showcase__header">
        <p className="eyebrow">DESIGN SYSTEM / 001</p>
        <h1>Quiet UI.<br /><span>Loud pixels.</span></h1>
        <p className="showcase__intro">A clean, flexible foundation with a little 8-bit warmth.</p>
      </header>
      <section className="showcase__section" aria-labelledby="button-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">COMPONENT / ACTION</p>
            <h2 id="button-heading">Button</h2>
          </div>
          <p>Clear actions, with just enough character.</p>
        </div>
        <div className="button-grid">
          <div className="button-sample"><span>Contained</span><Button variant="contained">Get started</Button></div>
          <div className="button-sample"><span>Outline</span><Button variant="outline">Learn more</Button></div>
          <div className="button-sample"><span>Ghost</span><Button variant="ghost">Explore</Button></div>
          <div className="button-sample"><span>Pixel detail</span><Button variant="pixel">Explore system</Button></div>
          <div className="button-sample"><span>Disable</span><Button variant="contained" disabled>Unavailable</Button></div>
        </div>
      </section>
      <section className="showcase__section" aria-labelledby="form-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">COMPONENTS / FORM</p>
            <h2 id="form-heading">Inputs &amp; selection</h2>
          </div>
          <p>Clear labels, useful guidance, and visible states.</p>
        </div>
        <div className="showcase__form-grid">
          <Input label="Email address" placeholder="you@example.com" hint="For account updates and sign-in." />
          <Input label="Project name" defaultValue="Modern8-bits" error="This name is already in use." />
          <Checkbox label="Send me product updates" description="You can change this any time." defaultChecked />
        </div>
      </section>
      <section className="showcase__section" aria-labelledby="content-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">COMPONENTS / CONTENT</p>
            <h2 id="content-heading">Cards &amp; badges</h2>
          </div>
          <div className="badge-row"><Badge>FOUNDATION</Badge><Badge variant="strong">IN PROGRESS</Badge><Badge variant="pixel">PIXEL DETAIL</Badge></div>
        </div>
        <div className="showcase__card-grid">
          <Card eyebrow="DESIGN SYSTEM" title="One flexible foundation">
            Semantic tokens keep components consistent as products make the system their own.
          </Card>
          <Card eyebrow="COMPONENT / 001" title="Quiet UI. Loud pixels." variant="pixel" footer={<Button variant="outline" size="small">Explore components</Button>}>
            Pixel geometry adds warmth in small, deliberate moments.
          </Card>
        </div>
      </section>
      <footer className="showcase__footer"><span className="pixel-mark" aria-hidden="true" />Modern8-bits <span>FOUNDATIONS IN PROGRESS</span></footer>
    </main>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><App /></React.StrictMode>,
)
