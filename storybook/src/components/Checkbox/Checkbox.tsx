import type { InputHTMLAttributes } from 'react'
import './checkbox.css'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Text label displayed beside the checkbox. */
  label: string
  /** Optional supporting copy. */
  description?: string
  /** Error message; also marks the checkbox invalid for assistive technology. */
  error?: string
}

export function Checkbox({
  className = '',
  description,
  disabled = false,
  error,
  id,
  label,
  ...props
}: CheckboxProps) {
  const message = error || description
  const messageId = id && message ? `${id}-message` : undefined
  const classes = ['m8-checkbox__input', className].filter(Boolean).join(' ')

  return (
    <label className={`m8-checkbox${disabled ? ' m8-checkbox--disabled' : ''}`}>
      <input
        {...props}
        aria-describedby={messageId}
        aria-invalid={error ? true : undefined}
        className={classes}
        disabled={disabled}
        id={id}
        type="checkbox"
      />
      <span className="m8-checkbox__box" aria-hidden="true"><span /></span>
      <span className="m8-checkbox__copy">
        <span className="m8-checkbox__label">{label}</span>
        {message && <span className={`m8-checkbox__message${error ? ' m8-checkbox__message--error' : ''}`} id={messageId}>{message}</span>}
      </span>
    </label>
  )
}
