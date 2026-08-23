import { Search, Bell } from 'lucide-react'
import GithubMark from '../ui/icons/GithubMark'
import { Badge } from '../ui/Card'

export default function Topbar({ user = { name: 'Mitesh Patil', plan: 'Pro Plan' } }) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border-soft bg-surface/80 px-6 backdrop-blur">
      <div className="relative w-full max-w-xs">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
        <input
          placeholder="Search anything..."
          className="h-9 w-full rounded-control border border-border bg-surface-2 pl-9 pr-14 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
        />
        <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-border bg-surface-3 px-1.5 py-0.5 text-[10px] text-text-muted">
          ⌘K
        </kbd>
      </div>

      <div className="flex items-center gap-3">
        <Badge tone="success" dot className="hidden sm:inline-flex">
          <GithubMark className="size-3" /> GitHub connected
        </Badge>
        <button className="relative flex size-9 items-center justify-center rounded-control text-text-secondary hover:bg-surface-2 hover:text-text-primary">
          <Bell className="size-[18px]" />
          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-danger" />
        </button>
        <div className="flex items-center gap-2.5 border-l border-border-soft pl-3">
          <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-semibold text-white">
            {user.name.split(' ').map((n) => n[0]).join('')}
          </div>
          <div className="hidden leading-tight sm:block">
            <p className="text-[13px] font-medium text-text-primary">{user.name}</p>
            <p className="text-[11px] text-text-muted">{user.plan}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
