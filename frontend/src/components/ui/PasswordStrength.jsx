import { cn } from '../../lib/cn'

function scorePassword(pw) {
  if (!pw) return 0
  let score = 0
  if (pw.length >= 8) score++
  if (pw.length >= 12) score++
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  return Math.min(score, 4)
}

const labels = ['Too weak', 'Weak', 'Fair', 'Strong', 'Very strong']
const colors = ['bg-danger', 'bg-danger', 'bg-warning', 'bg-secondary', 'bg-success']

export default function PasswordStrength({ password }) {
  const score = scorePassword(password)
  if (!password) return null

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-text-muted">Password strength</span>
        <span className={cn('text-xs font-medium', score <= 1 ? 'text-danger' : score === 2 ? 'text-warning' : score === 3 ? 'text-secondary' : 'text-success')}>
          {labels[score]}
        </span>
      </div>
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              'h-1 flex-1 rounded-full bg-surface-3 transition-colors duration-300',
              i < score && colors[score]
            )}
          />
        ))}
      </div>
    </div>
  )
}
