import { useState } from 'react'
import { Sparkles, ChevronDown, ExternalLink, AlertCircle } from 'lucide-react'
import { Card } from '../ui/Card'
import Button from '../ui/Button'
import { api } from '../../lib/api'

const suggestions = ['E-commerce store', 'SaaS dashboard', 'Portfolio site', 'Booking platform']

const stageLabels = {
  generating: 'AI agent is generating your website…',
  building: 'Building Docker image…',
  running: 'Live and running',
  failed: 'Generation failed',
}

export default function PromptCard() {
  const [prompt, setPrompt] = useState('')
  const [focused, setFocused] = useState(false)
  const [status, setStatus] = useState('idle') // idle | working | done | error
  const [project, setProject] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    setStatus('working')
    setErrorMsg('')
    setProject(null)
    try {
      const data = await api.generate(prompt)
      setProject(data.project)
      setStatus('done')
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong generating your app')
      setStatus('error')
    }
  }

  return (
    <Card
      className={`p-5 transition-shadow duration-200 ${
        focused ? 'ring-2 ring-primary/30 border-primary/50' : ''
      }`}
    >
      <p className="font-display text-lg font-semibold text-text-primary">Good morning 👋</p>
      <p className="mt-0.5 text-sm text-text-secondary">What are we building today?</p>

      <textarea
        rows={3}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Describe your application… e.g. Create a modern e-commerce website"
        disabled={status === 'working'}
        className="mt-4 w-full resize-none rounded-control border border-border bg-surface-2 p-3 text-sm text-text-primary placeholder:text-text-muted outline-none disabled:opacity-60"
      />

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-text-muted">Try these:</span>
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => setPrompt(`Create a ${s.toLowerCase()}`)}
              disabled={status === 'working'}
              className="rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[11px] text-text-secondary hover:border-secondary/50 hover:text-text-primary disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>
        <Button icon={Sparkles} disabled={!prompt.trim() || status === 'working'} loading={status === 'working'} onClick={handleGenerate}>
          Generate
        </Button>
      </div>

      <button className="mt-3 flex items-center gap-1 text-xs text-text-muted hover:text-text-secondary">
        Advanced Options <ChevronDown className="size-3.5" />
      </button>

      {status === 'working' && (
        <div className="mt-4 flex items-center gap-2 rounded-control border border-border-soft bg-surface-2 px-3 py-2.5 text-xs text-text-secondary">
          <span className="size-2 animate-pulse rounded-full bg-secondary" />
          This calls the real AI agent and Docker pipeline — can take up to a minute or two.
        </div>
      )}

      {status === 'error' && (
        <div className="mt-4 flex items-start gap-2 rounded-control border border-danger/30 bg-danger-soft px-3 py-2.5 text-xs text-danger">
          <AlertCircle className="mt-0.5 size-3.5 shrink-0" />
          {errorMsg}
        </div>
      )}

      {status === 'done' && project && (
        <div className="mt-4 flex items-center justify-between rounded-control border border-success/30 bg-success-soft px-3 py-2.5">
          <div>
            <p className="text-sm font-medium text-text-primary">{project.name}</p>
            <p className="text-xs text-text-secondary">{stageLabels[project.status] || project.status}</p>
          </div>
          {project.previewUrl && (
            <a
              href={project.previewUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-control bg-success px-3 py-1.5 text-xs font-medium text-white hover:bg-success/90"
            >
              Open Preview <ExternalLink className="size-3.5" />
            </a>
          )}
        </div>
      )}
    </Card>
  )
}
