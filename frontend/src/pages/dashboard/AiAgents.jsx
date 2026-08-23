import { useState } from 'react'
import {
  Sparkles,
  ClipboardList,
  Palette,
  Code2,
  Server,
  Database,
  FlaskConical,
  Boxes,
  ShieldCheck,
} from 'lucide-react'
import AppShell from '../../components/layout/AppShell'
import { Card, Badge } from '../../components/ui/Card'
import AgentCard from '../../components/agents/AgentCard'
import AgentDrawer from '../../components/agents/AgentDrawer'

const agents = [
  {
    id: 'orchestrator',
    name: 'Orchestrator',
    purpose: 'Coordinates all agents and sequences the generation pipeline end to end.',
    icon: Sparkles,
    status: 'Ready',
    accent: 'primary',
    capabilities: ['Task routing between agents', 'Pipeline sequencing', 'Conflict resolution', 'Progress aggregation'],
    activity: [
      { time: '2m ago', text: 'Routed generation request to Requirement Agent' },
      { time: '1h ago', text: 'Completed orchestration for FreshCart v1.4' },
    ],
  },
  {
    id: 'requirement',
    name: 'Requirement Agent',
    purpose: 'Converts a plain-language prompt into structured application requirements.',
    icon: ClipboardList,
    status: 'Ready',
    accent: 'secondary',
    capabilities: ['Prompt parsing', 'Feature extraction', 'Entity/data modeling hints', 'Ambiguity flagging'],
    activity: [{ time: '2m ago', text: 'Parsed requirements for "modern e-commerce website"' }],
  },
  {
    id: 'uiux',
    name: 'UI/UX Agent',
    purpose: 'Designs screens, components and the overall visual system for the app.',
    icon: Palette,
    status: 'Ready',
    accent: 'secondary',
    capabilities: ['Layout planning', 'Component selection', 'Design token generation', 'Accessibility pass'],
    activity: [{ time: '3m ago', text: 'Generated layout for FreshCart product grid' }],
  },
  {
    id: 'frontend',
    name: 'Frontend Agent',
    purpose: 'Builds the frontend codebase from the requirements and design plan.',
    icon: Code2,
    status: 'Ready',
    accent: 'primary',
    capabilities: ['React component generation', 'Tailwind styling', 'Routing setup', 'State wiring'],
    activity: [{ time: '4m ago', text: 'Generated 14 components for FreshCart' }],
  },
  {
    id: 'backend',
    name: 'Backend Agent',
    purpose: 'Builds backend services and REST APIs to power the generated app.',
    icon: Server,
    status: 'Ready',
    accent: 'primary',
    capabilities: ['Express route generation', 'Auth scaffolding', 'API contract design', 'Error handling'],
    activity: [{ time: '5m ago', text: 'Generated 8 API routes for FreshCart' }],
  },
  {
    id: 'database',
    name: 'Database Agent',
    purpose: 'Designs data models and database configuration for the app.',
    icon: Database,
    status: 'Ready',
    accent: 'secondary',
    capabilities: ['Schema design', 'Mongoose model generation', 'Seed data', 'Index planning'],
    activity: [{ time: '5m ago', text: 'Generated 6 models for FreshCart' }],
  },
  {
    id: 'testing',
    name: 'Testing Agent',
    purpose: 'Writes and runs automated tests against the generated application.',
    icon: FlaskConical,
    status: 'Ready',
    accent: 'secondary',
    capabilities: ['Unit test generation', 'API test generation', 'Test execution', 'Coverage summary'],
    activity: [{ time: '1h ago', text: '42/42 tests passed for FreshCart v1.4' }],
  },
  {
    id: 'devops',
    name: 'DevOps Agent',
    purpose: 'Handles the CI/CD pipeline — Docker, builds and deployment configuration.',
    icon: Boxes,
    status: 'Ready',
    accent: 'primary',
    capabilities: ['Dockerfile generation', 'CI pipeline config', 'Image build & push', 'Deployment scripting'],
    activity: [{ time: '2m ago', text: 'Built Docker image for FreshCart v1.4' }],
  },
  {
    id: 'security',
    name: 'Security Agent',
    purpose: 'Checks the generated application for common security risks before deploy.',
    icon: ShieldCheck,
    status: 'Standby',
    accent: 'success',
    capabilities: ['Dependency scanning', 'Secrets detection', 'Basic OWASP checks', 'Report generation'],
    activity: [{ time: '—', text: 'Enable this agent to start scanning generated apps' }],
  },
]

export default function AiAgents() {
  const [selected, setSelected] = useState(null)

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-semibold text-text-primary">AI Agents</h1>
            <p className="mt-1 text-sm text-text-secondary">Control and monitor all AI agents</p>
          </div>
          <Badge tone="success" dot>
            All systems ready
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} onClick={() => setSelected(agent)} />
          ))}
        </div>

        <Card className="p-5">
          <h3 className="mb-1 text-sm font-semibold text-text-primary">Pipeline order</h3>
          <p className="mb-4 text-xs text-text-muted">
            The order agents run in for a single generation request.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {agents.slice(1).map((a, i) => (
              <div key={a.id} className="flex items-center gap-2">
                <span className="rounded-full border border-border bg-surface-2 px-3 py-1.5 text-xs text-text-secondary">
                  {a.name.replace(' Agent', '')}
                </span>
                {i < agents.length - 2 && <span className="text-text-muted">→</span>}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <AgentDrawer agent={selected} onClose={() => setSelected(null)} />
    </AppShell>
  )
}
