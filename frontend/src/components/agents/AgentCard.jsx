import { Card, Badge } from '../ui/Card'
import { cn } from '../../lib/cn'

const statusTone = {
  Ready: 'success',
  Working: 'secondary',
  Completed: 'success',
  Failed: 'danger',
  Standby: 'warning',
}

export default function AgentCard({ agent, onClick }) {
  const { name, purpose, icon: Icon, status, accent = 'primary' } = agent
  const accentBg = {
    primary: 'bg-primary-soft text-primary',
    secondary: 'bg-secondary-soft text-secondary',
    success: 'bg-success-soft text-success',
  }

  return (
    <Card
      onClick={onClick}
      className="group cursor-pointer p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-secondary/40"
    >
      <div className="flex items-start gap-3">
        <div className={cn('relative flex size-10 items-center justify-center rounded-control', accentBg[accent])}>
          {status === 'Working' && (
            <span className="absolute inset-0 rounded-control animate-ping bg-current opacity-10" />
          )}
          <Icon className="size-[18px]" strokeWidth={1.8} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-text-primary">{name}</p>
          <p className="mt-0.5 text-xs text-text-muted line-clamp-1">{purpose}</p>
        </div>
      </div>
      <div className="mt-3.5 flex items-center justify-between">
        <Badge tone={statusTone[status]} dot>
          {status}
        </Badge>
        <button className="text-[11px] font-medium text-text-muted opacity-0 transition-opacity duration-150 group-hover:opacity-100 hover:text-secondary">
          Configure
        </button>
      </div>
    </Card>
  )
}
