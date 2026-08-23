import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock } from 'lucide-react'
import GithubMark from '../../components/ui/icons/GithubMark'
import AuthLayout from '../../components/auth/AuthLayout'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import DeviceLocationStrip from '../../components/auth/DeviceLocationStrip'
import { api, setToken } from '../../lib/api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await api.login({ email, password })
      setToken(data.token)
      navigate('/dashboard')
    } catch (err) {
      if (err.data?.requiresVerification) {
        navigate('/verify-email', { state: { email: err.data.email } })
        return
      }
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleGithub = () => {
    window.location.href = api.githubLoginUrl()
  }

  return (
    <AuthLayout>
      <h2 className="font-display text-2xl font-semibold text-text-primary">Login</h2>
      <p className="mt-1.5 text-sm text-text-secondary">Welcome back! Please login to continue.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <Input
          label="Email"
          type="email"
          icon={Mail}
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Password"
          type="password"
          icon={Lock}
          placeholder="••••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-text-secondary">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="size-4 rounded border-border bg-surface-2 accent-primary"
            />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-sm font-medium text-secondary hover:text-secondary/80">
            Forgot password?
          </Link>
        </div>

        {error && <p className="text-sm text-danger">{error}</p>}

        <Button type="submit" className="w-full" loading={loading}>
          Login
        </Button>

        <div className="flex items-center gap-3 py-1">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-text-muted">OR</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <Button type="button" variant="secondary" icon={GithubMark} className="w-full" onClick={handleGithub}>
          Continue with GitHub
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-text-secondary">
        Don't have an account?{' '}
        <Link to="/create-account" className="font-medium text-secondary hover:text-secondary/80">
          Sign up
        </Link>
      </p>

      <div className="mt-6">
        <DeviceLocationStrip />
      </div>
    </AuthLayout>
  )
}
