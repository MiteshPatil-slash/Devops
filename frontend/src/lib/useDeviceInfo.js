import { useEffect, useState } from 'react'

function parseUA(ua) {
  let browser = 'Unknown browser'
  if (ua.includes('Edg/')) browser = 'Edge'
  else if (ua.includes('Chrome/') && !ua.includes('Chromium')) browser = 'Chrome'
  else if (ua.includes('Firefox/')) browser = 'Firefox'
  else if (ua.includes('Safari/') && !ua.includes('Chrome')) browser = 'Safari'

  let os = 'Unknown OS'
  if (ua.includes('Windows')) os = 'Windows'
  else if (ua.includes('Mac OS')) os = 'macOS'
  else if (ua.includes('Android')) os = 'Android'
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS'
  else if (ua.includes('Linux')) os = 'Linux'

  const isMobile = /Mobi|Android|iPhone/i.test(ua)
  return { browser, os, device: isMobile ? 'Mobile' : 'Desktop' }
}

/**
 * Client-only device + location capture for the login screen.
 * Nothing here is sent anywhere yet (Phase 1 is frontend-only) —
 * it's read from the browser and shown/held in state for later use.
 */
export default function useDeviceInfo({ requestLocation = false } = {}) {
  const [device, setDevice] = useState(null)
  const [location, setLocation] = useState({ status: 'idle', data: null, error: null })

  useEffect(() => {
    const ua = navigator.userAgent
    setDevice({
      ...parseUA(ua),
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screen: `${window.screen.width}×${window.screen.height}`,
    })
  }, [])

  useEffect(() => {
    if (!requestLocation) return
    if (!('geolocation' in navigator)) {
      setLocation({ status: 'unsupported', data: null, error: 'Geolocation not supported' })
      return
    }
    setLocation((s) => ({ ...s, status: 'requesting' }))
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          status: 'granted',
          data: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
          },
          error: null,
        })
      },
      (err) => {
        setLocation({ status: 'denied', data: null, error: err.message })
      },
      { timeout: 8000 }
    )
  }, [requestLocation])

  return { device, location }
}
