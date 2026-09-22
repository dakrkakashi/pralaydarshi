import { AlertTriangle, ArrowRight, Clock3, MapPin, ShieldCheck, Waves } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { RealMap } from '../components/common/RealMap'
import { useAlerts } from '../hooks/useAlerts'
import { useLocations } from '../hooks/useLocations'
import { sheltersForLocation } from '../data/shelters'
import { riskMeta } from '../lib/constants'
import type { Alert } from '../types'
import './citizen.css'

export function CitizenAlertPage({ alerts: suppliedAlerts }: { alerts?: Alert[] }) {
  const { locationId } = useParams()
  const { alerts } = useAlerts()
  const locations = useLocations()
  const broadcast = (suppliedAlerts ?? alerts).filter((alert) => alert.status === 'broadcast')
  const active = broadcast.find((alert) => alert.locationId === locationId) ?? broadcast[0]
  const place = locations.find((location) => location.id === active?.locationId)
  const shelter = place ? sheltersForLocation(place.id)[0] : undefined
  return (
    <main className="citizen-page">
      <header className="citizen-header">
        <Link className="citizen-brand" to="/"><span className="citizen-mark"><Waves size={19} /></span><strong>Pralaydarshi</strong></Link>
        <div><span className="citizen-label">PUBLIC ALERT VIEW</span><Link to="/login">Authority login <ArrowRight size={14} /></Link></div>
      </header>
      <section className="citizen-intro"><span className="citizen-kicker"><ShieldCheck size={15} /> Plain-language public information</span><h1>Know what to do next.</h1><p>This is a simulated citizen interface showing how an authority-approved alert could appear at village level.</p></section>
      {broadcast.length > 0 && <nav className="citizen-selector" aria-label="Broadcast locations">{broadcast.map((alert) => { const location = locations.find((item) => item.id === alert.locationId); return <Link className={active?.id === alert.id ? 'selected' : ''} key={alert.id} to={`/citizen-alert/${alert.locationId}`}>{location?.name}</Link> })}</nav>}
      {!active || !place ? <section className="citizen-empty"><ShieldCheck size={28} /><h2>No active public alerts</h2><p>There are no simulated authority-approved broadcasts for this monitoring network right now.</p></section> : <>
        <section className="citizen-alert-card" aria-labelledby="citizen-alert-title">
          <div className="citizen-alert-top"><span className="citizen-red"><AlertTriangle size={20} /> RED ALERT</span><span>{riskMeta[active.severity].label} · issued {active.time}</span></div>
          <h2 id="citizen-alert-title">YOUR VILLAGE: {place.name}</h2>
          <p className="citizen-message">{active.citizenMessage}</p>
          <div className="citizen-facts"><div><Clock3 size={18} /><span><strong>~{active.leadTimeMinutes ?? '—'} min</strong><small>estimated lead time</small></span></div><div><MapPin size={18} /><span><strong>{shelter?.name ?? 'Follow local officials'}</strong><small>go to the nearest safe shelter</small></span></div><div><AlertTriangle size={18} /><span><strong>{place.affectedZone}</strong><small>affected area</small></span></div></div>
          <div className="citizen-action"><strong>GO NOW</strong><span>{shelter ? `${shelter.distanceKm} km · approximately ${shelter.travelMinutes} minutes` : 'Follow the route announced by authorities'}</span></div>
          <div className="citizen-avoid"><strong>AVOID</strong><span>River crossings, cut slopes and roads marked closed by officials.</span></div>
        </section>
        <section className="citizen-map"><div><span className="citizen-label">LOCAL MAP</span><h2>Shelter and route context</h2></div><RealMap locationId={place.id} compact /></section>
      </>}
      <footer className="citizen-footer">Demonstration interface. In a real deployment, alerts are issued by authorized authorities. Approximate map data is non-production.</footer>
    </main>
  )
}
