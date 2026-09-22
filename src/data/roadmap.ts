import type { ImpactItem, RoadmapPhase, StackItem } from '../types'

export const roadmapPhases: RoadmapPhase[] = [
  { phase: '01', title: 'Foundation', body: 'Deterministic compound engine, village GIS and authority review workflow.', status: 'Current prototype' },
  { phase: '02', title: 'ML validation', body: 'Validate transparent statistical and ML methods against historical events and field observations.', status: 'Next validation phase' },
  { phase: '03', title: 'Chamoli pilot', body: 'Deploy and validate 10–20 low-cost IoT nodes with district authorities.', status: 'Pilot pathway' },
  { phase: '04', title: 'Multi-district scale', body: 'Expand the observation network and governance model across vulnerable districts.', status: 'Long-term scale' },
]

export const techStack: StackItem[] = [
  { name: 'FastAPI', role: 'Risk and ingestion APIs' }, { name: 'React + TypeScript', role: 'Authority and citizen interfaces' },
  { name: 'PostgreSQL + PostGIS', role: 'Locations, polygons and audit data' }, { name: 'TimescaleDB', role: 'Telemetry time series' },
  { name: 'Redis + Celery', role: 'Jobs and alert orchestration' }, { name: 'ESP32 + MQTT', role: 'Optional field telemetry' },
  { name: 'OSM / OSMnx', role: 'Open geospatial foundation' }, { name: 'Docker + GovCloud', role: 'Deployment pathway' },
]

export const impactItems: ImpactItem[] = [
  { title: 'Earlier', body: 'Turn changing signals into a lead-time window before a local crisis compounds.' },
  { title: 'Local', body: 'Surface village and ward conditions instead of hiding them inside district averages.' },
  { title: 'Actionable', body: 'Connect risk to shelters, routes and authority-led next steps.' },
]
