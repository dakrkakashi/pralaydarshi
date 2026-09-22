import { Activity, AlertTriangle, ChevronRight, CloudRain, Info, Radio, SlidersHorizontal, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AlertRow } from '../components/common/AlertRow'
import { Metric } from '../components/common/Metric'
import { RealMap } from '../components/common/RealMap'
import { PanelHeading } from '../components/common/PanelHeading'
import { sourceRows } from '../data/dataSources'
import { chartBars } from '../data/statistics'
import { shelters } from '../data/shelters'
import { telemetry } from '../data/telemetry'
import { useLocations } from '../hooks/useLocations'
import type { Alert } from '../types'

export function DashboardPage({ alerts }: { alerts: Alert[] }) {
  const locations = useLocations()
  const criticalCount = locations.filter((item) => item.riskLevel === 'critical').length
  const online = sourceRows.filter((row) => row.status === 'online').length
  return (
    <>
      <div className="page-intro">
        <div>
          <span className="eyebrow">SITUATION OVERVIEW · 21 SEP 2026</span>
          <h2>Good evening, situation desk.</h2>
          <p>Monitoring is active across five vulnerable corridors. Conditions are changing in the Western Ghats.</p>
        </div>
        <button className="button ghost"><SlidersHorizontal size={16} /> Configure view</button>
      </div>
      <div className="notice">
        <Zap size={17} />
        <div>
          <strong>Multi-hazard posture: heightened</strong>
          <span>Rainfall intensity is elevated across Kerala; review the two active high-priority locations.</span>
        </div>
        <Link to="/alerts">Review alerts <ChevronRight size={15} /></Link>
      </div>
      <div className="metric-grid">
        <Metric icon={<Activity />} label="Overall risk" value="58" unit="/ 100" trend="+8" tone="warning" note="up from previous cycle" />
        <Metric icon={<AlertTriangle />} label="Critical locations" value={criticalCount.toString()} unit="of 5" trend="+1" tone="critical" note="requires authority review" />
        <Metric icon={<CloudRain />} label="Peak rainfall" value="112" unit="mm / hr" trend="+19%" tone="warning" note="Munnar Valley" />
        <Metric icon={<Radio />} label="Data sources online" value={online.toString()} unit="/ 6" trend="stable" tone="normal" note="IoT coverage optional" />
      </div>
      <div className="dashboard-grid">
        <section className="panel map-panel">
          <PanelHeading eyebrow="RISK LANDSCAPE" title="Monitored corridors" link="/map" linkLabel="Open full map" />
          <RealMap compact />
        </section>
        <section className="panel">
          <PanelHeading eyebrow="PRIORITY QUEUE" title="Active alerts" link="/alerts" linkLabel="View all" />
          <div className="alert-stack">{alerts.slice(0, 3).map((alert) => <AlertRow key={alert.id} alert={alert} />)}</div>
        </section>
      </div>
      <div className="dashboard-grid lower">
        <section className="panel">
          <PanelHeading eyebrow="SIGNAL TRENDS" title="Rainfall intensity · last 6 hours" />
          <div className="chart">
            <div className="chart-y"><span>120</span><span>80</span><span>40</span><span>0</span></div>
            <div className="chart-body">
              <div className="grid-line" />
              <div className="grid-line" />
              <div className="grid-line" />
              <div className="chart-bars">
                {chartBars.map((height, index) => (
                  <div key={index} className={`bar ${index > 8 ? 'hot' : ''}`} style={{ height: `${height}%` }} />
                ))}
              </div>
              <div className="chart-x"><span>15:00</span><span>17:00</span><span>19:00</span><span>21:00</span></div>
            </div>
          </div>
        </section>
        <section className="panel">
          <PanelHeading eyebrow="SYSTEM HEALTH" title="Input coverage" link="/data-sources" linkLabel="Manage sources" />
          <div className="source-health">
            {sourceRows.slice(0, 5).map((row) => (
              <div className="health-row" key={row.name}>
                <span className={`status-dot ${row.status}`} />
                <span>{row.name}</span>
                <small>{row.status === 'online' ? row.lastUpdated : 'Review'}</small>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="dashboard-grid lower">
        <section className="panel">
          <PanelHeading eyebrow="SHELTER CAPACITY" title="Safe places at a glance" />
          <div className="shelter-health">{shelters.slice(0, 5).map((shelter) => { const utilization = Math.round(shelter.occupied / shelter.capacity * 100); return <div className="capacity-row" key={shelter.id}><div><strong>{shelter.name}</strong><small>{shelter.occupied}/{shelter.capacity} occupied</small></div><div className="capacity-bar"><span className={utilization > 80 ? 'near-full' : ''} style={{ width: `${utilization}%` }} /></div><b>{utilization}%</b></div> })}</div>
        </section>
        <section className="panel">
          <PanelHeading eyebrow="LIVE TELEMETRY" title="Rainfall and river gauge" />
          <div className="telemetry-strip">{telemetry['rdp-s4'].map((point) => <div className="telemetry-point" key={point.label}><span style={{ height: `${Math.max(8, point.rainfall / 1.2)}%` }} /><small>{point.label}</small></div>)}</div>
          <div className="telemetry-legend"><span><i className="rain-line" /> Rainfall mm/hr</span><span><i className="river-line" /> River gauge m</span><em>Deterministic demo telemetry</em></div>
        </section>
      </div>
      <div className="disclaimer">
        <Info size={16} />
        <span>Demo environment using simulated data. Pralaydarshi provides decision support; it does not issue official public warnings or replace authorized emergency protocols.</span>
      </div>
    </>
  )
}