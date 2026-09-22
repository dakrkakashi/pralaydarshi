import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import type { RiskLevel } from '../../types'

type MetricProps = {
  icon: ReactNode
  label: string
  value: string
  unit: string
  trend: string
  tone: RiskLevel
  note: string
}

export function Metric({ icon, label, value, unit, trend, tone, note }: MetricProps) {
  return (
    <div className="metric-card">
      <div className="metric-top">
        <div className={`metric-icon ${tone}`}>{icon}</div>
        <span className={`trend ${tone}`}>{trend.startsWith('+') ? <ArrowUpRight size={14} /> : null}{trend}</span>
      </div>
      <span className="metric-label">{label}</span>
      <div className="metric-value">{value}<small>{unit}</small></div>
      <span className="metric-note">{note}</span>
    </div>
  )
}