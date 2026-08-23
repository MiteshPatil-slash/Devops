import { Card } from '../ui/Card'
import { cn } from '../../lib/cn'

const activity = [
  { text: 'Deployment successful for FreshCart v1.4', time: '2 min ago', tone: 'success' },
  { text: 'Docker image built successfully', time: '5 min ago', tone: 'success' },
  { text: 'New commit pushed to GitHub', time: '12 min ago', tone: 'secondary' },
  { text: 'AI agents completed generation', time: '18 min ago', tone: 'primary' },
]

const dotTone = {
  success: 'bg-success',
  secondary: 'bg-secondary',
  primary: 'bg-primary',
  danger: 'bg-danger',
}

export default function RecentActivity() {
  return (
    <Card className="p-5">
      <h3 className="mb-4 text-sm font-semibold text-text-primary">Recent Activity</h3>
      <div className="relative space-y-4 pl-1">
        {activity.map((item, i) => (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span className={cn('mt-1.5 size-1.5 shrink-0 rounded-full', dotTone[item.tone])} />
              {i < activity.length - 1 && <span className="mt-1 w-px flex-1 bg-border-soft" />}
            </div>
            <div className="pb-1">
              <p className="text-[13px] leading-snug text-text-secondary">{item.text}</p>
              <p className="mt-0.5 text-[11px] text-text-muted">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
