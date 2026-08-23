import { MapPin, Monitor, LoaderCircle } from 'lucide-react'
import useDeviceInfo from '../../lib/useDeviceInfo'

export default function DeviceLocationStrip() {
  const { device, location } = useDeviceInfo({ requestLocation: true })

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-control border border-border-soft bg-surface-2/60 px-3 py-2">
      <div className="flex items-center gap-1.5 text-xs text-text-secondary">
        <Monitor className="size-3.5 text-text-muted" />
        {device ? (
          <span>
            {device.browser} on {device.os} · {device.device}
          </span>
        ) : (
          <span className="text-text-muted">Detecting device…</span>
        )}
      </div>
      <span className="text-border">•</span>
      <div className="flex items-center gap-1.5 text-xs text-text-secondary">
        <MapPin className="size-3.5 text-text-muted" />
        {location.status === 'requesting' && (
          <span className="flex items-center gap-1 text-text-muted">
            <LoaderCircle className="size-3 animate-spin" /> Locating…
          </span>
        )}
        {location.status === 'granted' && location.data && (
          <span>
            {location.data.latitude.toFixed(2)}, {location.data.longitude.toFixed(2)}
          </span>
        )}
        {(location.status === 'denied' || location.status === 'unsupported') && (
          <span className="text-text-muted">Location unavailable</span>
        )}
        {location.status === 'idle' && <span className="text-text-muted">—</span>}
      </div>
    </div>
  )
}
