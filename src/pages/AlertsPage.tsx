import { AlertTriangle, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocations } from '../hooks/useLocations'
import { riskMeta } from '../lib/constants'
import type { Alert, AlertStatus, RiskLevel } from '../types'

const FILTERS = ['all', 'critical', 'warning', 'watch'] as const

type AlertsPageProps = {
  alerts: Alert[]
  updateAlert: (id: string, status: AlertStatus) => void
}

export function AlertsPage({ alerts, updateAlert }: AlertsPageProps) {
  const [filter, setFilter] = useState<RiskLevel | 'all'>('all')
  const [feedback, setFeedback] = useState('')
  const locations = useLocations()
  const visible = alerts.filter((alert) => filter === 'all' || alert.severity === filter)
  const changeStatus = (alert: Alert, status: AlertStatus) => {
    updateAlert(alert.id, status)
    setFeedback(`${alert.title} marked ${status}. This is a local demo action only.`)
  }
  return (
    <>
      <div className="page-intro">
        <div>
          <span className="eyebrow">RESPONSE WORKFLOW</span>
          <h2>Alerts & response</h2>
          <p>Review the priority queue and record simulated operator actions.</p>
        </div>
        <div className="alert-count" aria-live="polite">
          <strong>{alerts.filter((item) => item.status !== 'resolved').length}</strong>
          <span>open alerts</span>
        </div>
      </div>
      <div className="filter-bar">
        <div className="filter-pills">
          {FILTERS.map((item) => (
            <button
              className={`filter-pill ${filter === item ? 'selected' : ''}`}
              key={item}
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item === 'all' ? 'All' : riskMeta[item].label}
            </button>
          ))}
        </div>
        <span className="muted-label"><CheckCircle2 size={15} /> Actions are demo-only</span>
      </div>
      <section className="panel alert-table">
        <div className="table-head">
          <span>Alert</span>
          <span>Location</span>
          <span>Confidence</span>
          <span>Created</span>
          <span>Status</span>
          <span>Actions</span>
        </div>
        {visible.map((alert) => {
          const place = locations.find((item) => item.id === alert.locationId) ?? locations[0]
          return (
            <div className="table-row" key={alert.id}>
              <div className="table-alert">
                <div className={`severity-mark ${alert.severity}`}><AlertTriangle size={16} /></div>
                <div>
                  <strong>{alert.title}</strong>
                  <span>{alert.cause}</span>
                  {alert.status === 'broadcast' && <small className="broadcast-preview">Citizen preview: {alert.citizenMessage}</small>}
                </div>
              </div>
              <Link className="table-location" to={`/locations/${place.id}`}>{place.name}<small>{place.district}</small></Link>
              <strong>{alert.confidence}%</strong>
              <span>{alert.time}</span>
              <span className={`badge ${alert.status}`}>{alert.status}</span>
              <div className="row-actions">
                {alert.status === 'pending_approval' && <button onClick={() => changeStatus(alert, 'approved')}>Approve</button>}
                {alert.status === 'approved' && <button onClick={() => changeStatus(alert, 'broadcast')}>Send citizen alert</button>}
                {alert.status === 'broadcast' && <button onClick={() => changeStatus(alert, 'acknowledged')}>Acknowledge</button>}
                {alert.status === 'acknowledged' && <button onClick={() => changeStatus(alert, 'escalated')}>Escalate</button>}
                {alert.status !== 'resolved' && <button className="resolve" onClick={() => changeStatus(alert, 'resolved')}>Resolve</button>}
                {alert.status === 'resolved' && <span className="resolved"><CheckCircle2 size={14} /> Closed</span>}
              </div>
            </div>
          )
        })}
      </section>
      <div className="sr-only" role="status" aria-live="polite">{feedback}</div>
    </>
  )
}