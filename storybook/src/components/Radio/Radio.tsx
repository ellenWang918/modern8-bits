import { useId, type InputHTMLAttributes } from 'react'
import './radio.css'

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  description?: string
  error?: string
}

/** Use the same name for options in one single-selection group. */
export function Radio({ label, description, error, id, className = '', 'aria-describedby': describedBy, 'aria-labelledby': labelledBy, 'aria-label': ariaLabel, ...props }: RadioProps) {
  const generatedId = useId()
  const inputId = id ?? `m8-radio-${generatedId}`
  const message = error || description
  const messageId = message ? `${inputId}-message` : undefined
  const descriptionIds = [...new Set(`${describedBy ?? ''} ${messageId ?? ''}`.split(/\s+/).filter(Boolean))].join(' ') || undefined
  return (
    <label className={`m8-radio ${className}`}>
      <input {...props} type="radio" id={inputId} aria-label={ariaLabel} aria-labelledby={labelledBy || (ariaLabel ? undefined : `${inputId}-label`)} aria-describedby={descriptionIds} aria-invalid={error ? true : props['aria-invalid']} />
      <span>
        <span id={`${inputId}-label`} className="m8-radio__label">{label}</span>
        {message && <span id={messageId} className="m8-radio__message">{message}</span>}
      </span>
    </label>
  )
}
