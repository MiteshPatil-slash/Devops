export default function Logo({ className = '', showWordmark = true }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="26" y2="26" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6D4AFF" />
            <stop offset="1" stopColor="#4F7CFF" />
          </linearGradient>
        </defs>
        <rect width="26" height="26" rx="7" fill="url(#logoGrad)" />
        <path
          d="M8 17.5L13 7.5L18 17.5"
          stroke="white"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M9.8 14.5H16.2" stroke="white" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
      {showWordmark && (
        <span className="font-display text-[15px] font-semibold tracking-tight text-text-primary">
          AI Deploy
        </span>
      )}
    </div>
  )
}
