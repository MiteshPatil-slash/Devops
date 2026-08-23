import { cn } from '../../lib/cn'
import { Loader2 } from 'lucide-react'

const variants = {
  primary:
    'bg-primary text-white hover:bg-primary-hover shadow-[0_0_0_1px_rgba(109,74,255,0.4),0_8px_20px_-8px_rgba(109,74,255,0.6)]',
  secondary:
    'bg-surface-3 text-text-primary border border-border hover:border-secondary/60 hover:bg-surface-2',
  danger: 'bg-danger text-white hover:bg-danger/90',
  ghost: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-2',
}

const sizes = {
  sm: 'h-8 px-3 text-[13px] gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-11 px-5 text-[15px] gap-2',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconRight: IconRight,
  loading = false,
  className = '',
  disabled = false,
  ...props
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-control font-medium transition-all duration-150',
        'active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        Icon && <Icon className="size-4" />
      )}
      {children}
      {!loading && IconRight && <IconRight className="size-4" />}
    </button>
  )
}
