import { NavLink } from 'react-router-dom'
import {
  LayoutGrid,
  AppWindow,
  Bot,
  Rocket,
  Activity,
  LifeBuoy,
  Settings,
} from 'lucide-react'
import Logo from '../ui/Logo'
import { cn } from '../../lib/cn'

const items = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { to: '/applications', label: 'Applications', icon: AppWindow },
  { to: '/ai-agents', label: 'AI Agents', icon: Bot },
  { to: '/deployments', label: 'Deployments', icon: Rocket },
  { to: '/monitoring', label: 'Monitoring', icon: Activity },
  { to: '/ai-support', label: 'AI Support', icon: LifeBuoy },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  return (
    <aside className="hidden h-screen w-60 shrink-0 flex-col border-r border-border-soft bg-surface lg:flex">
      <div className="flex h-16 items-center px-5">
        <Logo />
      </div>
      <nav className="flex-1 space-y-1 px-3 py-2">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2.5 rounded-control px-3 py-2 text-sm font-medium transition-colors duration-150',
                isActive
                  ? 'bg-primary-soft text-primary'
                  : 'text-text-secondary hover:bg-surface-2 hover:text-text-primary'
              )
            }
          >
            <Icon className="size-[18px]" strokeWidth={1.8} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-border-soft p-3">
        <div className="flex items-center gap-2 rounded-control bg-surface-2 px-3 py-2.5">
          <span className="size-1.5 rounded-full bg-success" />
          <span className="text-xs text-text-secondary">All systems ready</span>
        </div>
      </div>
    </aside>
  )
}
