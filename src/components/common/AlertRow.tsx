import { AlertTriangle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLocations } from '../../hooks/useLocations'
import { riskMeta } from '../../lib/constants'
import type { Alert } from '../../types'

export function AlertRow({ alert }: { alert: Alert }) {
  const locations = useLocations()
  const place = locations.find((item) => item.id === alert.locationId) ?? locations[0]
  return (
    <Link className="alert-row" to={`/locations/${place.id}`}>
      <div className={`severity-mark ${alert.severity}`}>
        <AlertTriangle size={16} />
      </div>
      <div className="alert-row-copy">
        <strong>{alert.title}</strong>
        <span>{place.name} · {alert.cause}</span>
      </div>
      <div className="alert-row-meta">
        <span className={`badge ${alert.severity}`}>{riskMeta[alert.severity].label}</span>
        <small>{alert.time}</small>
      </div>
    </Link>
  )
}