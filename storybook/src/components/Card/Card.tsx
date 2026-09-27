import type { HTMLAttributes, ReactNode } from 'react'
import './card.css'

export type CardVariant = 'default' | 'pixel'

export interface CardProps extends HTMLAttributes<HTMLElement> {
  /** Optional small label above the title. */
  eyebrow?: string
  /** Card heading. */
  title?: string
  /** Optional content placed at the bottom of the card. */
  footer?: ReactNode
  /** Subtle surface treatment. */
  variant?: CardVariant
}

export function Card({
  children,
  className = '',
  eyebrow,
  footer,
  title,
  variant = 'default',
  ...props
}: CardProps) {
  const classes = ['m8-card', `m8-card--${variant}`, className].filter(Boolean).join(' ')
  return (
    <article className={classes} {...props}>
      {(eyebrow || title) && <header className="m8-card__header">
        {eyebrow && <p className="m8-card__eyebrow">{eyebrow}</p>}
        {title && <h3 className="m8-card__title">{title}</h3>}
      </header>}
      <div className="m8-card__body">{children}</div>
      {footer && <footer className="m8-card__footer">{footer}</footer>}
    </article>
  )
}
