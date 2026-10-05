import { useId, useState } from 'react'
import { Button } from '../components/Button/Button'
import { variables } from './variables.data'
import { TokenUsage } from './TokenUsage'
import { FoundationUsage } from './FoundationUsage'
import './variables.css'

const collections = ['All', ...new Set(variables.map(variable => variable.collection))]
const categoryLabels: Record<string, string> = {
  gray: 'Neutral palette', brand: 'Brand', background: 'Backgrounds', text: 'Text',
  icon: 'Icons', border: 'Borders', action: 'Actions', status: 'Status', chip: 'Chip',
  space: 'Spacing', radius: 'Radius', stroke: 'Stroke', button: 'Button dimensions',
  neutral: 'Container neutrals', red: 'Red palette', green: 'Green palette', blue: 'Blue palette',
  layout: 'Layout', motion: 'Motion', input: 'Input dimensions', checkbox: 'Checkbox dimensions', presentation: 'Presentation rules',
}

export function Variables() {
  const searchId = useId()
  const anchorId = (name: string) => `${searchId}-variables-${name.replace(/[^a-z0-9]/gi, '-')}`
  const [query, setQuery] = useState('')
  const [collection, setCollection] = useState('All')
  const filtered = variables.filter(variable =>
    (collection === 'All' || variable.collection === collection) &&
    [variable.name, variable.description, ...variable.values.map(value => value.reference ?? '')]
      .join(' ').toLowerCase().includes(query.trim().toLowerCase()),
  )

  return (
    <main className="m8-variables">
      <header className="m8-variables__header">
        <h1>Design Token</h1>
        <p>Every existing Figma variable, with its values, references, and usage guidance.</p>
        <p className="m8-variables__note">
          Figma snapshot · 5 October 2026 · {variables.length} variables. This page is a reference;
          colour, dimension, and presentation definitions are synchronized with code. Values below show Figma definitions,
          independently of the Appearance control. Dimensions use pixels; motion durations use milliseconds.
        </p>
        <a href="https://www.figma.com/design/Ig6OBlF54TZEoe3D8BwwlJ/modern8-bits?node-id=3-4" target="_blank" rel="noreferrer">Open the Figma token page ↗</a>
      </header>
      <div className="m8-variables__body">
      <div className="m8-variables__content">
      <div className="m8-variables__filters">
        <div className="m8-variables__search">
          <label htmlFor={searchId}>Search variables</label>
          <input id={searchId} type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Name, reference, or intended use" />
        </div>
        <fieldset>
          <legend>Collection</legend>
          <div className="m8-variables__choices">
            {collections.map(name => <Button key={name} variant={collection === name ? 'contained' : 'outline'} size="medium" aria-pressed={collection === name} onClick={() => setCollection(name)}>{name}</Button>)}
          </div>
        </fieldset>
      </div>
      <p role="status" className="m8-variables__count">{filtered.length} of {variables.length} variables</p>
      {filtered.length === 0 && <p>No variables match. Try a different search or collection.</p>}
      {collections.slice(1).map(name => {
        const group = filtered.filter(variable => variable.collection === name)
        if (!group.length) return null
        return (
          <section key={name} id={anchorId(name)} className="m8-variables__collection" aria-label={name}>
            <h2>{name} <span>{group.length}</span></h2>
            {name === 'Color' ? (
              <table className="m8-variables__colour-table">
                <caption className="m8-variables__sr-only">Colour variables: token and description, light value, and dark value</caption>
                <thead><tr><th scope="col">Token and description</th><th scope="col">Light value</th><th scope="col">Dark value</th></tr></thead>
                <tbody>
                  {group.map(variable => (
                    <tr id={anchorId(variable.name)} className="m8-variables__colour-row" key={variable.name}>
                      <th scope="row">
                        <code className="m8-variables__token-name">{variable.name}</code>
                        <p className="m8-variables__description">{variable.description}</p>
                      </th>
                      {variable.values.map(value => (
                        <td key={value.mode}>
                          <span className="m8-variables__mode-label">{value.mode} value</span>
                          <div className="m8-variables__colour-value">
                            <span className="m8-variables__swatch" style={{ backgroundColor: value.value }} aria-hidden="true" />
                            <div>
                              <code className="m8-variables__value-name">{value.reference ?? value.value}</code>
                              <span className="m8-variables__value-detail">{value.reference ? value.value : 'Direct value'}</span>
                            </div>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : <div className="m8-variables__list">
              {group.map(variable => (
                <article id={anchorId(variable.name)} className="m8-variables__item" key={variable.name}>
                  <div className="m8-variables__identity">
                    <h3><code>{variable.name}</code></h3>
                    <span className="m8-variables__type">{variable.type === 'COLOR' ? 'Colour' : variable.type === 'STRING' ? 'Font family' : variable.name.startsWith('motion/') ? 'Duration' : 'Dimension'}</span>
                  </div>
                  <dl className="m8-variables__values">
                    {variable.values.map(value => (
                      <div key={value.mode}>
                        <dt>{value.mode}</dt>
                        <dd>
                          {variable.type === 'COLOR' && <span className="m8-variables__swatch" style={{ backgroundColor: value.value }} aria-hidden="true" />}
                          <code>{value.value}</code>
                          {value.reference && <span className="m8-variables__reference">↳ {value.reference}</span>}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <p className="m8-variables__description">{variable.description}</p>
                </article>
              ))}
            </div>}
          </section>
        )
      })}
      <section id={anchorId('usage')} className="m8-variables__collection" aria-label="Usage and states">
        <h2>Usage and states</h2>
        <TokenUsage />
      </section>
      <section id={anchorId('typography-layout')} className="m8-variables__collection" aria-label="Typography and layout">
        <h2>Typography and layout</h2>
        <FoundationUsage />
      </section>
      </div>
      <nav className="m8-variables__toc" aria-label="Variables table of contents">
        <h2>On this page</h2>
        {collections.slice(1).map(name => {
          const group = filtered.filter(variable => variable.collection === name)
          if (!group.length) return null
          const categories = [...new Set(group.map(variable => variable.name.split('/')[0]))]
          return (
            <div className="m8-variables__toc-group" key={name}>
              <a className="m8-variables__toc-section" href={`#${anchorId(name)}`}>{name}</a>
              <ul>
                {categories.map(category => {
                  const first = group.find(variable => variable.name.startsWith(`${category}/`))!
                  return <li key={category}><a href={`#${anchorId(first.name)}`}>{categoryLabels[category] ?? category}</a></li>
                })}
              </ul>
            </div>
          )
        })}
        {filtered.length === 0 && <p>No matching sections.</p>}
        <a className="m8-variables__toc-section" href={`#${anchorId('usage')}`}>Usage and states</a>
        <a className="m8-variables__toc-section" href={`#${anchorId('typography-layout')}`}>Typography and layout</a>
      </nav>
      </div>
    </main>
  )
}
