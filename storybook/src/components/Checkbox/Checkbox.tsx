import { useId, type InputHTMLAttributes } from 'react'
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
  'aria-describedby': describedBy,
  'aria-labelledby': labelledBy,
  'aria-label': ariaLabel,
  ...props
}: CheckboxProps) {
  const message = error || description
  const generatedId = useId()
  const inputId = id ?? `m8-checkbox-${generatedId}`
  const messageId = message ? `${inputId}-message` : undefined
  const labelId = `${inputId}-label`
  const descriptionIds = [...new Set(`${describedBy ?? ''} ${messageId ?? ''}`.split(/\s+/).filter(Boolean))].join(' ') || undefined
  const classes = ['m8-checkbox__input', className].filter(Boolean).join(' ')

  return (
    <label className={`m8-checkbox${disabled ? ' m8-checkbox--disabled' : ''}`}>
      <input
        {...props}
        aria-describedby={descriptionIds}
        aria-label={ariaLabel}
        aria-labelledby={labelledBy || (ariaLabel ? undefined : labelId)}
        aria-invalid={error ? true : props['aria-invalid']}
        className={classes}
        disabled={disabled}
        id={inputId}
        type="checkbox"
      />
      <span className="m8-checkbox__box" aria-hidden="true"><span /></span>
      <span className="m8-checkbox__copy">
        <span className="m8-checkbox__label" id={labelId}>{label}</span>
        {message && <span className={`m8-checkbox__message${error ? ' m8-checkbox__message--error' : ''}`} id={messageId}>{message}</span>}
      </span>
    </label>
  )
}
