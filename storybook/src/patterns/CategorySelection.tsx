import { useId, useState, type FormEvent } from 'react'
import { Button, Checkbox, Radio } from '../components'
import './category-selection.css'

const categories = ['Food', 'Travel', 'Home', 'Health', 'Other']

export function CategorySelection({ exampleName = '' }: { exampleName?: string }) {
  const id = useId()
  const [single, setSingle] = useState('')
  const [multiple, setMultiple] = useState<string[]>([])
  const [singleAttempted, setSingleAttempted] = useState(false)
  const [multipleAttempted, setMultipleAttempted] = useState(false)
  const [singleResult, setSingleResult] = useState('')
  const [multipleResult, setMultipleResult] = useState('')
  const singleError = singleAttempted && !single
  const multipleError = multipleAttempted && multiple.length === 0
  function submitSingle(event: FormEvent) { event.preventDefault(); setSingleAttempted(true); setSingleResult(single ? `Selected category: ${single}.` : '') }
  function submitMultiple(event: FormEvent) { event.preventDefault(); setMultipleAttempted(true); setMultipleResult(multiple.length ? `Selected categories: ${multiple.join(', ')}.` : '') }
  return (
    <div className="m8-category-examples">
      <form aria-label={`Single category example${exampleName ? ` — ${exampleName}` : ''}`} onSubmit={submitSingle} noValidate>
        <fieldset aria-describedby={`${id}-single-help${singleError ? ` ${id}-single-error` : ''}`}>
          <legend>Choose one category</legend>
          <p id={`${id}-single-help`}>Use arrow keys to move between options. Only one can be selected.</p>
          <div className="m8-category-options">
            {categories.map(category => <Radio key={category} name={`${id}-category`} value={category} label={category} checked={single === category} onChange={() => { setSingle(category); setSingleResult('') }} aria-invalid={singleError || undefined} aria-describedby={singleError ? `${id}-single-error` : `${id}-single-help`} />)}
          </div>
          {singleError && <p id={`${id}-single-error`} className="m8-category-error" role="alert">Error: choose one category.</p>}
        </fieldset>
        <Button type="submit" size="large">Save category</Button>
        <p role="status">{singleResult}</p>
      </form>
      <form aria-label={`Multiple categories example${exampleName ? ` — ${exampleName}` : ''}`} onSubmit={submitMultiple} noValidate>
        <fieldset aria-describedby={`${id}-multiple-help${multipleError ? ` ${id}-multiple-error` : ''}`}>
          <legend>Choose your categories</legend>
          <p id={`${id}-multiple-help`}>Choose at least one. Tab moves between choices; Space toggles each one.</p>
          <div className="m8-category-options">
            {categories.map(category => <Checkbox key={category} label={category} checked={multiple.includes(category)} onChange={event => { setMultiple(previous => event.target.checked ? [...previous, category] : previous.filter(value => value !== category)); setMultipleResult('') }} aria-describedby={multipleError ? `${id}-multiple-error` : `${id}-multiple-help`} aria-invalid={multipleError || undefined} />)}
          </div>
          {multipleError && <p id={`${id}-multiple-error`} className="m8-category-error" role="alert">Error: choose at least one category.</p>}
        </fieldset>
        <Button type="submit" size="large">Save categories</Button>
        <p role="status">{multipleResult}</p>
      </form>
    </div>
  )
}
