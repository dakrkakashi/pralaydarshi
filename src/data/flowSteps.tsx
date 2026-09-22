import { Activity, CloudRain, Layers3, LifeBuoy, MapPinned, ShieldCheck, Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'

export type FlowStep = { number: string; title: string; body: string; icon: ReactNode }

export const flowSteps: FlowStep[] = [
  { number: '01', title: 'Sense', body: 'Bring together rainfall, river, soil, terrain, satellite and optional IoT observations.', icon: <CloudRain size={21} /> },
  { number: '02', title: 'Validate', body: 'Check freshness, provenance and whether each input is available.', icon: <ShieldCheck size={21} /> },
  { number: '03', title: 'Normalize', body: 'Translate different units and scales into comparable signals.', icon: <Layers3 size={21} /> },
  { number: '04', title: 'Compound', body: 'Combine flood, landslide, vulnerability and real-time conditions.', icon: <Activity size={21} /> },
  { number: '05', title: 'Localize', body: 'Bring the result down to a village, ward or monitoring corridor.', icon: <MapPinned size={21} /> },
  { number: '06', title: 'Estimate', body: 'Show a four-tier risk state, confidence and lead-time window.', icon: <Sparkles size={21} /> },
  { number: '07', title: 'Map & alert', body: 'Connect authority review to shelters, routes and public information.', icon: <LifeBuoy size={21} /> },
]