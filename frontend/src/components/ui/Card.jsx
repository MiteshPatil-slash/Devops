import { cn } from '../../lib/cn'

export function Card({ children, className = '', ...props }) {
  return (
    <div
      className={cn(
        'rounded-card border border-border bg-surface shadow-[0_1px_0_0_rgba(255,255,255,0.02)_inset]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function Badge({ children, tone = 'neutral', className = '', dot = false }) {
  const tones = {
    neutral: 'bg-surface-3 text-text-secondary border-border',
    success: 'bg-success-soft text-success border-success/30',
    warning: 'bg-warning-soft text-warning border-warning/30',
    danger: 'bg-danger-soft text-danger border-danger/30',
    primary: 'bg-primary-soft text-primary border-primary/30',
    secondary: 'bg-secondary-soft text-secondary border-secondary/30',
  }
  const dotTones = {
    neutral: 'bg-text-muted',
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger',
    primary: 'bg-primary',
    secondary: 'bg-secondary',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium',
        tones[tone],
        className
      )}
    >
      {dot && <span className={cn('size-1.5 rounded-full', dotTones[tone])} />}
      {children}
    </span>
  )
}
