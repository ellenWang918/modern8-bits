import { useId, type InputHTMLAttributes } from 'react'
import './input.css'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  /** Visible label associated with the field. */
  label: string
  /** Short guidance shown below the field. */
  hint?: string
  /** Error message; also marks the field invalid for assistive technology. */
  error?: string
  /** Optional stable ID, useful when a form needs to reference this field. */
  id?: string
}

export function Input({
  className = '',
  disabled = false,
  error,
  hint,
  id,
  label,
  type = 'text',
  ...props
}: InputProps) {
  const generatedId = useId()
  const inputId = id ?? `m8-input-${generatedId}`
  const message = error || hint
  const messageId = message ? `${inputId}-message` : undefined
  const classes = ['m8-field__input', error && 'm8-field__input--error', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="m8-field">
      <label className="m8-field__label" htmlFor={inputId}>{label}</label>
      <input
        {...props}
        aria-describedby={messageId}
        aria-invalid={error ? true : undefined}
        className={classes}
        disabled={disabled}
        id={inputId}
        type={type}
      />
      {message && <span className={`m8-field__message${error ? ' m8-field__message--error' : ''}`} id={messageId}>{message}</span>}
    </div>
  )
}
