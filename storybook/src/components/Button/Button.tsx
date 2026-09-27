import type { ButtonHTMLAttributes } from 'react'
import './button.css'

export type ButtonVariant = 'primary' | 'secondary' | 'pixel'
export type ButtonSize = 'small' | 'medium' | 'large'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual treatment for the action. */
  variant?: ButtonVariant
  /** Control height and horizontal padding. */
  size?: ButtonSize
}

export function Button({
  children,
  className = '',
  size = 'medium',
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  const classes = ['m8-button', `m8-button--${variant}`, `m8-button--${size}`, className]
    .filter(Boolean)
    .join(' ')

  return <button className={classes} type={type} {...props}>{children}</button>
}
