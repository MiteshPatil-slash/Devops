import { ShoppingBag, KanbanSquare, Newspaper } from 'lucide-react'
import { Card, Badge } from '../ui/Card'

const apps = [
  { name: 'FreshCart', desc: 'E-commerce Platform', icon: ShoppingBag, version: 'v1.4', status: 'Deployed', time: '2 min ago', tone: 'success' },
  { name: 'TaskFlow', desc: 'Project Management App', icon: KanbanSquare, version: 'v1.2', status: 'Deployed', time: '1 hour ago', tone: 'success' },
  { name: 'DevBlog', desc: 'Blogging Platform', icon: Newspaper, version: 'v1.1', status: 'Building', time: '3 hours ago', tone: 'warning' },
]

export default function RecentApplications() {
  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">Recent Applications</h3>
        <button className="text-xs font-medium text-secondary hover:text-secondary/80">View all</button>
      </div>
      <div className="space-y-1">
        {apps.map((app) => (
          <div
            key={app.name}
            className="flex items-center gap-3 rounded-control px-2 py-2.5 transition-colors duration-150 hover:bg-surface-2"
          >
            <div className="flex size-9 items-center justify-center rounded-control bg-surface-3">
              <app.icon className="size-4 text-text-secondary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-text-primary">{app.name}</p>
              <p className="truncate text-xs text-text-muted">{app.desc}</p>
            </div>
            <Badge tone={app.tone} dot>
              {app.status}
            </Badge>
            <span className="w-16 shrink-0 text-right text-[11px] text-text-muted">{app.version}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
