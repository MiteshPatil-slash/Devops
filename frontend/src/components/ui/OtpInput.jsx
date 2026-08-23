import { useRef, useState } from 'react'
import { cn } from '../../lib/cn'

export default function OtpInput({ length = 6, onComplete, error }) {
  const [values, setValues] = useState(Array(length).fill(''))
  const refs = useRef([])

  const focusAt = (i) => refs.current[i]?.focus()

  const handleChange = (i, raw) => {
    const val = raw.replace(/[^0-9]/g, '')
    if (!val) {
      const next = [...values]
      next[i] = ''
      setValues(next)
      return
    }
    const next = [...values]
    next[i] = val[val.length - 1]
    setValues(next)
    if (i < length - 1) focusAt(i + 1)
    if (next.every((v) => v !== '')) onComplete?.(next.join(''))
  }

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !values[i] && i > 0) {
      focusAt(i - 1)
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const paste = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, length)
    if (!paste) return
    const next = Array(length).fill('')
    paste.split('').forEach((d, i) => (next[i] = d))
    setValues(next)
    focusAt(Math.min(paste.length, length - 1))
    if (next.every((v) => v !== '')) onComplete?.(next.join(''))
  }

  return (
    <div className="flex gap-2.5" onPaste={handlePaste}>
      {values.map((v, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          value={v}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          inputMode="numeric"
          maxLength={1}
          className={cn(
            'h-12 w-11 rounded-control border bg-surface-2 text-center text-lg font-semibold text-text-primary outline-none transition-all duration-150',
            'border-border focus:border-primary focus:ring-2 focus:ring-primary/20 focus:scale-[1.03]',
            error && 'border-danger'
          )}
        />
      ))}
    </div>
  )
}
