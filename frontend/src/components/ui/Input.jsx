import { useState } from 'react'
import { cn } from '../../lib/cn'
import { Eye, EyeOff } from 'lucide-react'

export default function Input({
  label,
  type = 'text',
  icon: Icon,
  error,
  hint,
  rightAction,
  className = '',
  containerClassName = '',
  ...props
}) {
  const [show, setShow] = useState(false)
  const isPassword = type === 'password'
  const resolvedType = isPassword ? (show ? 'text' : 'password') : type

  return (
    <label className={cn('block', containerClassName)}>
      {label && (
        <span className="mb-1.5 block text-[13px] font-medium text-text-secondary">
          {label}
        </span>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
        )}
        <input
          type={resolvedType}
          className={cn(
            'h-10 w-full rounded-control border bg-surface-2 px-3 text-sm text-text-primary placeholder:text-text-muted',
            'border-border transition-colors duration-150 outline-none',
            'focus:border-secondary focus:ring-2 focus:ring-secondary/20',
            Icon && 'pl-9',
            (isPassword || rightAction) && 'pr-10',
            error && 'border-danger focus:border-danger focus:ring-danger/20',
            className
          )}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary"
          >
            {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        )}
        {!isPassword && rightAction && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightAction}</div>
        )}
      </div>
      {error && <span className="mt-1.5 block text-xs text-danger">{error}</span>}
      {hint && !error && (
        <span className="mt-1.5 block text-xs text-text-muted">{hint}</span>
      )}
    </label>
  )
}
