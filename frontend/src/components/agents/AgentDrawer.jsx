import { X } from 'lucide-react'
import { Badge } from '../ui/Card'
import { cn } from '../../lib/cn'

const statusTone = {
  Ready: 'success',
  Working: 'secondary',
  Completed: 'success',
  Failed: 'danger',
  Standby: 'warning',
}

export default function AgentDrawer({ agent, onClose }) {
  if (!agent) return null
  const Icon = agent.icon

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-[fade-in_180ms_ease-out]"
        onClick={onClose}
      />
      <div className="relative flex h-full w-full max-w-sm flex-col border-l border-border bg-surface p-6 animate-[slide-in_240ms_cubic-bezier(0.16,1,0.3,1)]">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-control bg-primary-soft text-primary">
              <Icon className="size-5" strokeWidth={1.8} />
            </div>
            <div>
              <p className="font-display text-base font-semibold text-text-primary">{agent.name}</p>
              <Badge tone={statusTone[agent.status]} dot className="mt-1">
                {agent.status}
              </Badge>
            </div>
          </div>
          <button onClick={onClose} className="rounded-control p-1.5 text-text-muted hover:bg-surface-2 hover:text-text-primary">
            <X className="size-4" />
          </button>
        </div>

        <div className="mt-6">
          <p className="text-xs font-medium uppercase tracking-wide text-text-muted">Purpose</p>
          <p className="mt-1.5 text-sm text-text-secondary">{agent.purpose}</p>
        </div>

        <div className="mt-5">
          <p className="text-xs font-medium uppercase tracking-wide text-text-muted">Capabilities</p>
          <ul className="mt-2 space-y-1.5">
            {agent.capabilities.map((c) => (
              <li key={c} className="flex items-center gap-2 text-sm text-text-secondary">
                <span className="size-1 rounded-full bg-secondary" />
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5">
          <p className="text-xs font-medium uppercase tracking-wide text-text-muted">Recent Activity</p>
          <ul className="mt-2 space-y-2.5">
            {agent.activity.map((a, i) => (
              <li key={i} className="text-[13px] text-text-secondary">
                <span className="text-text-muted">{a.time} · </span>
                {a.text}
              </li>
            ))}
          </ul>
        </div>

        <style>{`
          @keyframes fade-in { from { opacity: 0 } to { opacity: 1 } }
          @keyframes slide-in { from { transform: translateX(100%) } to { transform: translateX(0) } }
        `}</style>
      </div>
    </div>
  )
}
