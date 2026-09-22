import { ChevronRight, Info, Layers3, Mountain, Search } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { RealMap } from '../components/common/RealMap'
import { PanelHeading } from '../components/common/PanelHeading'
import { useLocations } from '../hooks/useLocations'
import { riskMeta } from '../lib/constants'
import type { RiskLevel } from '../types'

const FILTERS = ['all', 'critical', 'warning', 'watch'] as const

export function MapPage() {
  const [filter, setFilter] = useState<RiskLevel | 'all'>('all')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string>()
  const locations = useLocations()
  const visible = locations.filter(
    (item) => (filter === 'all' || item.riskLevel === filter) && item.name.toLowerCase().includes(query.toLowerCase()),
  )
  const selected = visible.find((item) => item.id === selectedId) ?? visible[0]
  return (
    <>
      <div className="page-intro">
        <div>
          <span className="eyebrow">GEOSPATIAL MONITORING</span>
          <h2>Risk map</h2>
          <p>Select a corridor to inspect the signals behind its current risk level.</p>
        </div>
        <div className="live-control"><span className="pulse-dot" /> Auto-refresh on</div>
      </div>
      <div className="filter-bar">
        <div className="search-field">
          <Search size={17} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search location or district" />
        </div>
        <div className="filter-pills">
          {FILTERS.map((item) => (
            <button
              className={`filter-pill ${filter === item ? 'selected' : ''}`}
              key={item}
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item === 'all' ? 'All locations' : riskMeta[item].label}
            </button>
          ))}
        </div>
      </div>
      <div className="map-layout">
        <section className="panel large-map">
          <div className="map-toolbar">
            <span><Layers3 size={17} /> Composite risk layer</span>
            <span className="map-scale">Scale 1 : 2.4M</span>
          </div>
          <RealMap locationId={selected?.id} />
        </section>
        <section className="panel location-list">
          <PanelHeading eyebrow={`${visible.length} LOCATIONS`} title="Corridors" />
          {visible.map((place) => (
            <Link className={`location-list-row ${selected?.id === place.id ? 'selected' : ''}`} to={`/locations/${place.id}`} key={place.id} onMouseEnter={() => setSelectedId(place.id)}>
              <div className={`location-marker ${place.riskLevel}`}><Mountain size={17} /></div>
              <div>
                <strong>{place.name}</strong>
                <span>{place.district}, {place.state}</span>
              </div>
              <div className="location-score">
                <strong>{place.overallRisk}</strong>
                <span>risk</span>
              </div>
              <ChevronRight size={16} />
            </Link>
          ))}
          {selected && (
            <div className="map-detail" aria-live="polite">
              <span className="eyebrow">SELECTED CORRIDOR</span>
              <strong>{selected.name}</strong>
              <span>{selected.district}, {selected.state} · {selected.overallRisk}/100 risk</span>
              <Link className="panel-link" to={`/locations/${selected.id}`}>Open location intelligence <ChevronRight size={14} /></Link>
            </div>
          )}
          {!selected && <p className="empty-state">No corridors match this search. Try another location or reset the filter.</p>}
        </section>
      </div>
      <div className="disclaimer">
        <Info size={16} />
        <span>Map layers are illustrative prototype geometry. Production deployment should connect to validated geospatial services and authority-approved thresholds.</span>
      </div>
    </>
  )
}