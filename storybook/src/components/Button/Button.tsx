import type { ButtonHTMLAttributes } from 'react'
import './button.css'

export type ButtonVariant = 'contained' | 'outline' | 'ghost' | 'pixel'
export type ButtonSize = 'small' | 'medium' | 'large'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual treatment for the action. */
  variant?: ButtonVariant
  /** Control height and horizontal padding. */
  size?: ButtonSize
  /** Render only the trailing Material Symbol, with no text label. */
  iconOnly?: boolean
}

export function Button({
  children,
  className = '',
  iconOnly = false,
  size = 'small',
  type = 'button',
  variant = 'contained',
  ...props
}: ButtonProps) {
  const classes = ['m8-button', `m8-button--${variant}`, `m8-button--${size}`, iconOnly && 'm8-button--icon-only', className]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={classes} type={type} {...props}>
      {!iconOnly && <span className="m8-button__label">{children}</span>}
      <span className="m8-button__icon" aria-hidden="true">arrow_forward</span>
    </button>
  )
}
