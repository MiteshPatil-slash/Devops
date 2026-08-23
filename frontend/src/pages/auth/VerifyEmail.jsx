import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Mail, CheckCircle2 } from 'lucide-react'
import AuthLayout from '../../components/auth/AuthLayout'
import Button from '../../components/ui/Button'
import OtpInput from '../../components/ui/OtpInput'
import { api, setToken } from '../../lib/api'

export default function VerifyEmail() {
  const location = useLocation()
  const email = location.state?.email || ''
  const [code, setCode] = useState('')
  const [status, setStatus] = useState('idle') // idle | verifying | success | error
  const [errorMsg, setErrorMsg] = useState('')
  const [seconds, setSeconds] = useState(102)
  const navigate = useNavigate()

  useEffect(() => {
    if (!email) navigate('/create-account')
  }, [email, navigate])

  useEffect(() => {
    if (seconds <= 0) return
    const t = setInterval(() => setSeconds((s) => s - 1), 1000)
    return () => clearInterval(t)
  }, [seconds])

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')

  const handleVerify = async () => {
    if (code.length !== 6 && code.length !== 4) return
    setStatus('verifying')
    setErrorMsg('')
    try {
      const data = await api.verifyOtp({ email, otp: code })
      setToken(data.token)
      setStatus('success')
      setTimeout(() => navigate('/dashboard'), 900)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'Incorrect code')
    }
  }

  const handleResend = async () => {
    try {
      await api.resendOtp({ email })
      setSeconds(102)
      setStatus('idle')
      setErrorMsg('')
    } catch (err) {
      setErrorMsg(err.message)
    }
  }

  return (
    <AuthLayout>
      <div className="flex flex-col items-center text-center">
        <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-primary-soft">
          {status === 'success' ? (
            <CheckCircle2 className="size-6 text-success animate-[scale-in_400ms_ease-out]" />
          ) : (
            <Mail className="size-6 text-primary" />
          )}
        </div>
        <h2 className="font-display text-2xl font-semibold text-text-primary">Verify Email</h2>
        <p className="mt-1.5 text-sm text-text-secondary">
          We sent a verification code to <span className="text-text-primary">{email}</span>
        </p>
        <p className="mt-1 text-xs text-text-muted">
          Phase 1 dev mode — use code <span className="font-mono text-secondary">1111</span>
        </p>

        <div className="mt-7">
          <OtpInput length={4} onComplete={setCode} error={status === 'error'} />
        </div>

        {errorMsg && <p className="mt-3 text-sm text-danger">{errorMsg}</p>}

        <p className="mt-4 text-xs text-text-muted">
          {seconds > 0 ? (
            <>Code expires in {mm}:{ss}</>
          ) : (
            <span className="text-danger">Code expired</span>
          )}
        </p>

        <Button
          className="mt-5 w-full"
          disabled={code.length < 4}
          loading={status === 'verifying'}
          onClick={handleVerify}
        >
          {status === 'success' ? 'Verified' : 'Verify'}
        </Button>

        <p className="mt-5 text-sm text-text-secondary">
          Didn't receive code?{' '}
          <button
            type="button"
            onClick={handleResend}
            className="font-medium text-secondary hover:text-secondary/80"
          >
            Resend code
          </button>
        </p>
      </div>
      <style>{`
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.7); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </AuthLayout>
  )
}
