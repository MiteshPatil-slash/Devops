import { AppWindow, Rocket, Gauge, Radio } from 'lucide-react'
import AppShell from '../../components/layout/AppShell'
import PromptCard from '../../components/dashboard/PromptCard'
import StatCard from '../../components/dashboard/StatCard'
import RecentApplications from '../../components/dashboard/RecentApplications'
import RecentActivity from '../../components/dashboard/RecentActivity'

export default function Dashboard() {
  return (
    <AppShell>
      <div className="mx-auto max-w-6xl space-y-6 p-6">
        <PromptCard />

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Applications" value={12} delta="+3 this week" icon={AppWindow} tone="secondary" />
          <StatCard label="Deployments" value={28} delta="+12% this week" icon={Rocket} tone="primary" />
          <StatCard label="Success Rate" value={89} suffix=".2%" delta="+5.3% this week" icon={Gauge} tone="success" />
          <StatCard label="Live Applications" value={8} delta="Healthy" icon={Radio} tone="secondary" />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <RecentApplications />
          <RecentActivity />
        </div>
      </div>
    </AppShell>
  )
}
