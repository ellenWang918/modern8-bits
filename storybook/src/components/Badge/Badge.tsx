import type { HTMLAttributes } from 'react'
import './badge.css'

export type BadgeVariant = 'neutral' | 'strong' | 'pixel'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Small visual emphasis level. */
  variant?: BadgeVariant
}

export function Badge({ children, className = '', variant = 'neutral', ...props }: BadgeProps) {
  const classes = ['m8-badge', `m8-badge--${variant}`, className].filter(Boolean).join(' ')
  return <span className={classes} {...props}>{children}</span>
}
