import { Bot, Code2, Container, CheckCircle2 } from 'lucide-react'
import Logo from '../ui/Logo'

const stages = [
  { icon: Bot, label: 'Agents' },
  { icon: Code2, label: 'Code' },
  { icon: Container, label: 'Docker' },
  { icon: CheckCircle2, label: 'Deployed' },
]

export default function AuthShowcase() {
  return (
    <div className="relative hidden h-full flex-col justify-between overflow-hidden bg-surface p-10 lg:flex">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -left-32 -top-32 size-[420px] rounded-full bg-primary/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-20 size-[420px] rounded-full bg-secondary/15 blur-[120px]" />

      <Logo />

      <div className="relative z-10">
        <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-3 py-1 text-[11px] font-medium text-text-secondary">
          <span className="size-1.5 rounded-full bg-success animate-pulse" />
          The future of development
        </span>
        <h1 className="font-display text-[40px] font-semibold leading-[1.1] tracking-tight text-text-primary">
          Build with AI.
          <br />
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Deploy with confidence.
          </span>
        </h1>
        <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-text-secondary">
          From idea to production in minutes with multi-agent AI and automated DevOps —
          real containers, real pipelines, no shortcuts.
        </p>

        <div className="mt-10 flex items-center">
          {stages.map((stage, i) => (
            <div key={stage.label} className="flex items-center">
              <div className="flex flex-col items-center gap-2">
                <div
                  className="flex size-12 items-center justify-center rounded-2xl border border-border bg-surface-2"
                  style={{ animation: `pulse-ring 2.4s ease-in-out ${i * 0.3}s infinite` }}
                >
                  <stage.icon className="size-5 text-secondary" strokeWidth={1.8} />
                </div>
                <span className="text-[11px] text-text-muted">{stage.label}</span>
              </div>
              {i < stages.length - 1 && (
                <div className="mx-1.5 mb-5 h-px w-8 bg-gradient-to-r from-border to-border/40" />
              )}
            </div>
          ))}
        </div>
      </div>

      <p className="relative z-10 text-xs text-text-muted">
        Trusted foundation for real, running applications — every deployment is genuine.
      </p>

      <style>{`
        @keyframes pulse-ring {
          0%, 100% { box-shadow: 0 0 0 0 rgba(79, 124, 255, 0.25); }
          50% { box-shadow: 0 0 0 6px rgba(79, 124, 255, 0); }
        }
      `}</style>
    </div>
  )
}
