import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { setToken } from '../../lib/api'

export default function OAuthCallback() {
  const [params] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const token = params.get('token')
    if (token) {
      setToken(token)
      navigate('/dashboard', { replace: true })
    } else {
      navigate('/login?error=github', { replace: true })
    }
  }, [params, navigate])

  return (
    <div className="flex h-screen items-center justify-center bg-bg">
      <div className="flex flex-col items-center gap-3 text-text-secondary">
        <Loader2 className="size-6 animate-spin text-secondary" />
        <p className="text-sm">Signing you in…</p>
      </div>
    </div>
  )
}
