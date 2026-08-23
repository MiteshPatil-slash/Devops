import Logo from '../ui/Logo'
import AuthShowcase from './AuthShowcase'

export default function AuthLayout({ children, footer }) {
  return (
    <div className="grid min-h-screen bg-bg lg:grid-cols-2">
      <AuthShowcase />
      <div className="flex flex-col justify-center px-6 py-10 sm:px-12 lg:px-16">
        <div className="mb-8 lg:hidden">
          <Logo />
        </div>
        <div className="mx-auto w-full max-w-sm animate-[fade-in_280ms_ease-out]">
          {children}
        </div>
        {footer && <div className="mx-auto mt-6 w-full max-w-sm">{footer}</div>}
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
