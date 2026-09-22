import { LayersControl, MapContainer, Polygon, Polyline, Popup, TileLayer, CircleMarker, useMap } from 'react-leaflet'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import type { LatLngBoundsExpression } from 'leaflet'
import { geography } from '../../data/geography'
import { sheltersForLocation } from '../../data/shelters'
import { useLocations } from '../../hooks/useLocations'
import { riskMeta } from '../../lib/constants'
import type { Location } from '../../types'
import 'leaflet/dist/leaflet.css'

type RealMapProps = { locationId?: string; compact?: boolean; locationIds?: string[] }

const RISK_COLORS: Record<Location['riskLevel'], string> = { normal: '#21865b', watch: '#2489a6', warning: '#d99622', critical: '#c94343' }
const center: [number, number] = [30.36, 79.2]

function FocusLocation({ location }: { location?: Location }) {
  const map = useMap()
  useEffect(() => {
    if (location) map.flyTo([location.lat, location.lng], 11, { duration: 0.6 })
  }, [location, map])
  return null
}

export function RealMap({ locationId, compact = false, locationIds }: RealMapProps) {
  const allLocations = useLocations()
  const locations = locationIds ? allLocations.filter((location) => locationIds.includes(location.id)) : allLocations
  const selected = allLocations.find((location) => location.id === locationId)
  const bounds = locations.length ? locations.map((location) => [location.lat, location.lng] as [number, number]) as LatLngBoundsExpression : undefined
  return (
    <div className={`real-map-wrap ${compact ? 'compact' : ''}`}>
      <MapContainer center={selected ? [selected.lat, selected.lng] : center} zoom={selected ? 11 : 8} scrollWheelZoom className="real-map" bounds={bounds}>
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Esri satellite">
            <TileLayer attribution='Tiles &copy; Esri' url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
          </LayersControl.BaseLayer>
          <LayersControl.Overlay checked name="Risk locations">
            <>{locations.map((location) => (
              <CircleMarker key={location.id} center={[location.lat, location.lng]} radius={compact ? 7 : 10} pathOptions={{ color: '#fff', weight: 2, fillColor: RISK_COLORS[location.riskLevel], fillOpacity: .92 }}>
                <Popup>
                  <strong>{location.name}</strong><br />
                  <span>{riskMeta[location.riskLevel].label} · {location.overallRisk}/100</span><br />
                  <span>{location.primaryThreat === 'compound' ? 'Flash Flood & Slope Failure' : `${location.primaryThreat} pressure`} · {location.leadTimeMinutes ? `~${location.leadTimeMinutes} min` : 'not imminent'}</span><br />
                  <Link to={`/locations/${location.id}`}>Open location intelligence</Link>
                </Popup>
              </CircleMarker>
            ))}</>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Flood zones">
            <>{locations.map((location) => geography[location.id] && <Polygon key={location.id} positions={geography[location.id].floodZone} pathOptions={{ color: '#2489a6', fillColor: '#2489a6', fillOpacity: .18 }} />)}</>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Landslide zones">
            <>{locations.map((location) => geography[location.id] && <Polygon key={location.id} positions={geography[location.id].landslideZone} pathOptions={{ color: '#d99622', fillColor: '#d99622', fillOpacity: .2 }} />)}</>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Safe routes">
            <>{locations.flatMap((location) => (geography[location.id]?.safeRoutes ?? []).map((route, index) => <Polyline key={`${location.id}-safe-${index}`} positions={route} pathOptions={{ color: '#21865b', weight: 4 }} />))}</>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Roads to avoid">
            <>{locations.flatMap((location) => (geography[location.id]?.roadsToAvoid ?? []).map((route, index) => <Polyline key={`${location.id}-avoid-${index}`} positions={route} pathOptions={{ color: '#c94343', weight: 4, dashArray: '7 8' }} />))}</>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Shelters">
            <>{locations.flatMap((location) => sheltersForLocation(location.id).map((shelter) => (
              <CircleMarker key={shelter.id} center={[shelter.lat, shelter.lng]} radius={6} pathOptions={{ color: '#0b1f34', fillColor: '#fff', fillOpacity: 1 }}>
                <Popup><strong>{shelter.name}</strong><br />{shelter.occupied}/{shelter.capacity} occupied · {shelter.distanceKm} km<br />{shelter.travelMinutes} min travel time</Popup>
              </CircleMarker>
            )))}</>
          </LayersControl.Overlay>
        </LayersControl>
        <FocusLocation location={selected} />
      </MapContainer>
      <div className="map-note">Approximate demonstration coordinates. Map tiles require network access; risk data remains simulated.</div>
      <div className="map-access-list" aria-label="Map locations">
        {locations.map((location) => <Link key={location.id} to={`/locations/${location.id}`}><span className="status-dot" style={{ background: RISK_COLORS[location.riskLevel] }} />{location.name} · {riskMeta[location.riskLevel].label}</Link>)}
      </div>
    </div>
  )
}
