import { Star, ExternalLink, Pencil, History } from 'lucide-react'
import { Card, Badge } from '../ui/Card'
import { cn } from '../../lib/cn'

const statusTone = { Deployed: 'success', Building: 'warning', Failed: 'danger', Draft: 'neutral' }

export default function ProjectCard({ app }) {
  return (
    <Card className="group overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:border-secondary/40">
      <div className="relative flex h-32 items-center justify-center bg-gradient-to-br from-surface-2 to-surface-3">
        <span className="font-display text-3xl font-semibold text-text-muted/30">{app.name[0]}</span>
        <button className="absolute right-2.5 top-2.5 flex size-7 items-center justify-center rounded-control bg-surface/80 text-text-muted opacity-0 backdrop-blur transition-opacity duration-150 group-hover:opacity-100 hover:text-warning">
          <Star className={cn('size-3.5', app.favorite && 'fill-warning text-warning')} />
        </button>
      </div>
      <div className="p-4">
        <div className="mb-1.5 flex items-center justify-between">
          <p className="text-sm font-medium text-text-primary">{app.name}</p>
          <Badge tone={statusTone[app.status]} dot>
            {app.status}
          </Badge>
        </div>
        <p className="mb-3 text-xs text-text-muted">{app.desc}</p>
        <div className="mb-3 flex flex-wrap gap-1.5">
          {app.stack.map((s) => (
            <span key={s} className="rounded-full bg-surface-3 px-2 py-0.5 text-[10px] text-text-secondary">
              {s}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-border-soft pt-3">
          <span className="text-[11px] text-text-muted">{app.updated}</span>
          <div className="flex items-center gap-1">
            <button className="flex size-7 items-center justify-center rounded-control text-text-muted hover:bg-surface-2 hover:text-text-primary">
              <ExternalLink className="size-3.5" />
            </button>
            <button className="flex size-7 items-center justify-center rounded-control text-text-muted hover:bg-surface-2 hover:text-text-primary">
              <Pencil className="size-3.5" />
            </button>
            <button className="flex size-7 items-center justify-center rounded-control text-text-muted hover:bg-surface-2 hover:text-text-primary">
              <History className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </Card>
  )
}
