import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import AuthLayout from '../../components/auth/AuthLayout'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import OtpInput from '../../components/ui/OtpInput'
import { cn } from '../../lib/cn'

const steps = ['Email', 'Verify', 'Reset']

export default function ForgotPassword() {
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)

  const advance = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep((s) => Math.min(s + 1, steps.length - 1))
    }, 900)
  }

  return (
    <AuthLayout>
      <h2 className="font-display text-2xl font-semibold text-text-primary">Forgot Password</h2>

      {/* Stepper */}
      <div className="mt-5 flex items-center">
        {steps.map((label, i) => (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  'flex size-7 items-center justify-center rounded-full border text-xs font-semibold transition-colors duration-200',
                  i < step && 'border-success bg-success-soft text-success',
                  i === step && 'border-primary bg-primary text-white',
                  i > step && 'border-border bg-surface-2 text-text-muted'
                )}
              >
                {i < step ? <Check className="size-3.5" /> : i + 1}
              </div>
              <span className={cn('text-[11px]', i === step ? 'text-text-primary' : 'text-text-muted')}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  'mx-2 mb-4 h-px w-10 transition-colors duration-300',
                  i < step ? 'bg-success' : 'bg-border'
                )}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-7">
        {step === 0 && (
          <>
            <p className="mb-4 text-sm text-text-secondary">
              Enter your email and we'll send you a code to reset your password.
            </p>
            <Input label="Email" type="email" placeholder="you@example.com" />
            <Button className="mt-5 w-full" loading={loading} onClick={advance}>
              Send Code
            </Button>
          </>
        )}

        {step === 1 && (
          <div className="flex flex-col items-center text-center">
            <p className="mb-5 text-sm text-text-secondary">Enter the 6-digit code we emailed you.</p>
            <OtpInput onComplete={() => {}} />
            <Button className="mt-6 w-full" loading={loading} onClick={advance}>
              Verify Code
            </Button>
          </div>
        )}

        {step === 2 && (
          <>
            <p className="mb-4 text-sm text-text-secondary">Choose a new password for your account.</p>
            <Input label="New Password" type="password" placeholder="••••••••••" containerClassName="mb-4" />
            <Input label="Confirm New Password" type="password" placeholder="••••••••••" />
            <Button className="mt-5 w-full" loading={loading} onClick={advance}>
              Reset Password
            </Button>
          </>
        )}
      </div>

      <p className="mt-6 text-center text-sm text-text-secondary">
        Remember your password?{' '}
        <Link to="/login" className="font-medium text-secondary hover:text-secondary/80">
          Login
        </Link>
      </p>
    </AuthLayout>
  )
}
