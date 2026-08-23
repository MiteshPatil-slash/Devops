import { Card } from '../ui/Card'
import useCountUp from '../../lib/useCountUp'
import { cn } from '../../lib/cn'

export default function StatCard({ label, value, suffix = '', delta, icon: Icon, tone = 'secondary' }) {
  const isNumeric = typeof value === 'number'
  const animated = useCountUp(isNumeric ? value : 0)
  const display = isNumeric ? animated : value

  const toneClasses = {
    primary: 'bg-primary-soft text-primary',
    secondary: 'bg-secondary-soft text-secondary',
    success: 'bg-success-soft text-success',
  }

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[13px] text-text-secondary">{label}</p>
          <p className="mt-1.5 font-display text-2xl font-semibold text-text-primary">
            {display}
            {suffix}
          </p>
        </div>
        {Icon && (
          <div className={cn('flex size-9 items-center justify-center rounded-control', toneClasses[tone])}>
            <Icon className="size-4" strokeWidth={2} />
          </div>
        )}
      </div>
      {delta && <p className="mt-2 text-xs text-success">{delta}</p>}
    </Card>
  )
}
