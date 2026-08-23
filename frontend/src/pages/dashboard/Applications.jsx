import { useState } from 'react'
import { Search, LayoutGrid, List, Plus } from 'lucide-react'
import AppShell from '../../components/layout/AppShell'
import ProjectCard from '../../components/dashboard/ProjectCard'
import Button from '../../components/ui/Button'
import { cn } from '../../lib/cn'

const apps = [
  { name: 'FreshCart', desc: 'E-commerce Platform', status: 'Deployed', stack: ['React', 'Node', 'MongoDB'], updated: '2 min ago', favorite: true },
  { name: 'TaskFlow', desc: 'Project Management App', status: 'Deployed', stack: ['React', 'Express'], updated: '1 hour ago', favorite: false },
  { name: 'DevBlog', desc: 'Blogging Platform', status: 'Building', stack: ['React', 'Node', 'MongoDB'], updated: '3 hours ago', favorite: false },
  { name: 'FitTrack', desc: 'Fitness Tracking App', status: 'Failed', stack: ['React', 'Express'], updated: '1 day ago', favorite: false },
  { name: 'BookingPro', desc: 'Booking Platform', status: 'Deployed', stack: ['React', 'Node', 'PostgreSQL'], updated: '2 days ago', favorite: true },
  { name: 'PortfolioX', desc: 'Personal Portfolio', status: 'Draft', stack: ['React'], updated: '4 days ago', favorite: false },
]

const filters = ['All Projects', 'Favorites', 'Deployed', 'Building', 'Failed']

export default function Applications() {
  const [active, setActive] = useState('All Projects')
  const [view, setView] = useState('grid')

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl space-y-5 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-semibold text-text-primary">Applications</h1>
            <p className="mt-1 text-sm text-text-secondary">All your AI-generated applications</p>
          </div>
          <Button icon={Plus}>New Application</Button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={cn(
                  'rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-150',
                  active === f
                    ? 'bg-primary-soft text-primary'
                    : 'text-text-secondary hover:bg-surface-2 hover:text-text-primary'
                )}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-text-muted" />
              <input
                placeholder="Search applications..."
                className="h-8 w-52 rounded-control border border-border bg-surface-2 pl-8 pr-3 text-xs text-text-primary placeholder:text-text-muted outline-none focus:border-secondary"
              />
            </div>
            <div className="flex items-center rounded-control border border-border bg-surface-2 p-0.5">
              <button
                onClick={() => setView('grid')}
                className={cn('flex size-7 items-center justify-center rounded-[7px]', view === 'grid' ? 'bg-surface-3 text-text-primary' : 'text-text-muted')}
              >
                <LayoutGrid className="size-3.5" />
              </button>
              <button
                onClick={() => setView('list')}
                className={cn('flex size-7 items-center justify-center rounded-[7px]', view === 'list' ? 'bg-surface-3 text-text-primary' : 'text-text-muted')}
              >
                <List className="size-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app) => (
            <ProjectCard key={app.name} app={app} />
          ))}
        </div>
      </div>
    </AppShell>
  )
}
