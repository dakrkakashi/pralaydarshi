import { Activity, CloudRain, Droplets, Info, LifeBuoy, Mountain, Radio, Sparkles, Waves } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Metric } from '../components/common/Metric'
import { PanelHeading } from '../components/common/PanelHeading'
import { RealMap } from '../components/common/RealMap'
import { sheltersForLocation } from '../data/shelters'
import { useLocations } from '../hooks/useLocations'
import { useRiskCalculation } from '../hooks/useRiskCalculation'
import { riskMeta } from '../lib/constants'
import type { RiskInputKey } from '../types'

const CONTRIBUTION_ICONS: Partial<Record<RiskInputKey | 'vulnerability' | 'conditions', LucideIcon>> = {
  rainfall: CloudRain,
  river: Waves,
  soil: Droplets,
  slope: Mountain,
  historical: Activity,
  iot: Radio,
}

export function LocationPage() {
  const { locationId } = useParams()
  const locations = useLocations()
  const place = locations.find((item) => item.id === locationId)
  const { riskLevel, overallRisk, contributions } = useRiskCalculation(
    place ? { rainfall: place.rainfall, cumulativeRainfall: place.cumulativeRainfall, riverLevel: place.riverLevel, riverRateOfRise: place.riverRateOfRise, soilMoisture: place.soilMoisture, slope: place.slope, historicalExposure: place.historicalExposure, populationDensity: place.populationDensity, households: place.households } : { rainfall: 0, cumulativeRainfall: 0, riverLevel: 0, riverRateOfRise: 0, soilMoisture: 0, slope: 0, historicalExposure: 0, populationDensity: 0, households: 0 },
    place?.availability ?? {},
    place?.sensorStatus ?? 'offline',
    place?.leadTimeMinutes ?? null,
  )
  if (!place) {
    return (
      <section className="panel not-found" role="alert">
        <span className="eyebrow">LOCATION NOT FOUND</span>
        <h2>That monitoring corridor is unavailable.</h2>
        <p>The requested location is not part of this simulated monitoring network.</p>
        <Link className="button primary" to="/map">Return to risk map</Link>
      </section>
    )
  }
  const sortedContributions = [...contributions].sort((a, b) => b.contribution - a.contribution)
  const shelters = sheltersForLocation(place.id)
  return (
    <>
      <div className="back-link"><Link to="/map">← Back to risk map</Link></div>
      <div className="location-hero">
        <div>
          <span className="eyebrow">{place.district.toUpperCase()} · {place.state.toUpperCase()}</span>
          <h2>{place.name}</h2>
          <p>Selected monitoring corridor · updated {place.updated}</p>
        </div>
        <span className={`badge large ${riskLevel}`}>{riskMeta[riskLevel].label} · {overallRisk}/100</span>
      </div>
      <div className="metric-grid location-metrics">
        <Metric icon={<CloudRain />} label="Rainfall / hour" value={place.rainfall.toString()} unit="mm" trend="+19%" tone={riskLevel} note="above local baseline" />
        <Metric icon={<Waves />} label="River level" value={place.riverLevel.toFixed(1)} unit="m" trend={place.riverTrend} tone={riskLevel} note="upstream gauge trend" />
        <Metric icon={<Droplets />} label="Soil moisture" value={place.soilMoisture.toString()} unit="%" trend="+12%" tone={riskLevel} note="saturation indicator" />
        <Metric icon={<Mountain />} label="Slope susceptibility" value={place.slope.toString()} unit="%" trend="stable" tone="watch" note={`${place.historicalExposure} exposure index`} />
      </div>
      <div className="detail-grid">
        <section className="panel">
          <PanelHeading eyebrow="WHY THIS SCORE" title="Risk contribution" />
          <div className="contribution-list">
            {sortedContributions.map((item) => {
              const Icon = CONTRIBUTION_ICONS[item.key] ?? Activity
              return (
                <div className="contribution" key={item.key}>
                  <div className="contribution-label">
                    <Icon size={16} />
                    <span>{item.label}</span>
                    <strong>{item.contribution}%</strong>
                  </div>
                  <div className="progress"><span style={{ width: `${item.contribution * 2.9}%` }} /></div>
                </div>
              )
            })}
          </div>
          <div className="explanation-callout">
            <Sparkles size={18} />
            <p><strong>System explanation:</strong> {place.name} is under {riskMeta[riskLevel].label.toLowerCase()} because rainfall intensity and soil saturation are elevated while terrain susceptibility remains high. The {place.riverTrend} river trend adds flood exposure.</p>
          </div>
        </section>
        <section className="panel">
          <PanelHeading eyebrow="RECOMMENDED ACTION" title="Response posture" />
          <div className="action-card">
            <div className={`action-icon ${riskLevel}`}><LifeBuoy size={22} /></div>
            <div>
              <span className={`badge ${riskLevel}`}>{riskMeta[riskLevel].label} posture</span>
              <h3>{riskLevel === 'critical' ? 'Prepare authority-led evacuation messaging' : 'Maintain heightened local readiness'}</h3>
              <p>{riskLevel === 'critical' ? 'Escalate to district authority, verify safe routes and prepare a village-level communication plan.' : 'Inspect drainage and keep local response teams ready while conditions are monitored.'}</p>
            </div>
          </div>
          <div className="source-mini">
            <span className={`status-dot ${place.sensorStatus}`} />
            <div>
              <strong>Optional IoT coverage</strong>
              <small>{place.sensorStatus === 'online' ? 'Local nodes are contributing to the score.' : 'Coverage is degraded; non-IoT inputs remain active.'}</small>
            </div>
          </div>
        </section>
      </div>
      <section className="panel location-map-panel">
        <PanelHeading eyebrow="LOCAL GIS CONTEXT" title="Zones, shelters and routes" />
        <RealMap locationId={place.id} compact />
      </section>
      <div className="detail-grid location-context-grid">
        <section className="panel">
          <PanelHeading eyebrow="WHAT NOW" title="Nearest safe shelter" />
          {shelters.map((shelter) => <div className="shelter-row" key={shelter.id}><div><strong>{shelter.name}</strong><span>{shelter.distanceKm} km · {shelter.travelMinutes} min · {shelter.type.replace('_', ' ')}</span></div><strong>{shelter.occupied}/{shelter.capacity}</strong></div>)}
        </section>
        <section className="panel">
          <PanelHeading eyebrow="DATA QUALITY" title="Availability is not safety" />
          <div className="availability-list">{place.unavailable.length ? place.unavailable.map((key) => <span className="status-pill unavailable" key={key}>Unavailable · {key}</span>) : <span className="status-pill online">All required inputs available</span>}</div>
          <p className="small-note">Missing telemetry lowers confidence. It is never interpreted as a safe reading.</p>
        </section>
      </div>
      <div className="disclaimer">
        <Info size={16} />
        <span>Risk values and recommended actions are simulated for demonstration. They require field validation and operational governance before any real deployment.</span>
      </div>
    </>
  )
}