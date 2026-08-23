import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock } from 'lucide-react'
import GithubMark from '../../components/ui/icons/GithubMark'
import AuthLayout from '../../components/auth/AuthLayout'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import PasswordStrength from '../../components/ui/PasswordStrength'
import { api } from '../../lib/api'

export default function CreateAccount() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agree, setAgree] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      await api.register({ fullName, email, password })
      navigate('/verify-email', { state: { email } })
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleGithub = () => {
    window.location.href = api.githubLoginUrl()
  }

  return (
    <AuthLayout>
      <h2 className="font-display text-2xl font-semibold text-text-primary">Create Account</h2>
      <p className="mt-1.5 text-sm text-text-secondary">Join AI Deploy today</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <Input
          label="Full Name"
          icon={User}
          placeholder="Your name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <Input
          label="Email"
          type="email"
          icon={Mail}
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div>
          <Input
            label="Password"
            type="password"
            icon={Lock}
            placeholder="••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <PasswordStrength password={password} />
        </div>
        <Input
          label="Confirm Password"
          type="password"
          icon={Lock}
          placeholder="••••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {error && <p className="text-sm text-danger">{error}</p>}

        <label className="flex items-start gap-2 text-sm text-text-secondary">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mt-0.5 size-4 rounded border-border bg-surface-2 accent-primary"
            required
          />
          I agree to the Terms &amp; Conditions
        </label>

        <Button type="submit" className="w-full" loading={loading} disabled={!agree}>
          Create Account
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
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-secondary hover:text-secondary/80">
          Login
        </Link>
      </p>
    </AuthLayout>
  )
}
