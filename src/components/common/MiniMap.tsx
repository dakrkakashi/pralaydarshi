import { Link } from 'react-router-dom'
import { useLocations } from '../../hooks/useLocations'
import { riskMeta } from '../../lib/constants'

type MiniMapProps = {
  selectedLocationId?: string
  onSelect?: (locationId: string) => void
}

export function MiniMap({ selectedLocationId, onSelect }: MiniMapProps) {
  const locations = useLocations()
  return (
    <div className="mini-map">
      <div className="map-water water-one" />
      <div className="map-water water-two" />
      {locations.map((place) => (
        <Link
          key={place.id}
          to={`/locations/${place.id}`}
          className={`map-pin ${place.riskLevel} ${selectedLocationId === place.id ? 'selected' : ''}`}
          style={{ left: `${place.x}%`, top: `${place.y}%` }}
          aria-label={`${place.name}, ${riskMeta[place.riskLevel].label} risk`}
          onClick={(event) => {
            if (onSelect) {
              event.preventDefault()
              onSelect(place.id)
            }
          }}
        >
          <span />
          <b>{place.name.split(' ')[0]}</b>
        </Link>
      ))}
      <div className="map-legend">
        <span><i className="critical" /> Critical</span>
        <span><i className="warning" /> Warning</span>
        <span><i className="watch" /> Watch</span>
      </div>
    </div>
  )
}