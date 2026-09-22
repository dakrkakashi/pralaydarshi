export type RiskLevel = 'normal' | 'watch' | 'warning' | 'critical'
export type Availability = 'available' | 'unavailable'
export type RiskInputKey = 'rainfall' | 'cumulative' | 'river' | 'riverRate' | 'soil' | 'slope' | 'historical' | 'population' | 'iot'
export type AlertStatus = 'pending_approval' | 'approved' | 'broadcast' | 'acknowledged' | 'escalated' | 'resolved'
export type SensorStatus = 'online' | 'degraded' | 'offline'
export type RiverTrend = 'rising' | 'stable' | 'falling'
export type SourceStatus = 'online' | 'degraded' | 'unavailable'
export type SourceType = 'weather' | 'river' | 'historical' | 'terrain' | 'satellite' | 'iot'
export type PrimaryThreat = 'flood' | 'landslide' | 'compound' | 'none'

export type ComponentScores = {
  rainfall: number; forecast: number; river: number; soil: number; terrain: number; historical: number; iot: number
}

export type RiskInputs = {
  rainfall: number; cumulativeRainfall: number; riverLevel: number; riverRateOfRise: number
  soilMoisture: number; slope: number; historicalExposure: number; populationDensity: number; households: number
}

export type LocationSeed = {
  id: string; name: string; ward: string | null; district: string; state: string; lat: number; lng: number; x: number; y: number
  rainfall: number; cumulativeRainfall: number; forecast: number; riverLevel: number; riverTrend: RiverTrend; riverRateOfRise: number
  soilMoisture: number; slope: number; historicalExposure: number; populationDensity: number; households: number
  availability: Partial<Record<RiskInputKey, Availability>>; sensorStatus: SensorStatus; affectedZone: string
  leadTimeMinutes: number | null; floodRisk: number; landslideRisk: number; scores: ComponentScores; updated: string
}

export type CompoundResult = {
  overallRisk: number; riskLevel: RiskLevel; floodRisk: number; landslideRisk: number; vulnerability: number; conditions: number
  confidence: number; contributions: Array<{ key: RiskInputKey | 'vulnerability' | 'conditions'; label: string; contribution: number; score: number }>
  leadTimeMinutes: number | null; primaryThreat: PrimaryThreat; unavailable: RiskInputKey[]
}

export type Location = LocationSeed & CompoundResult

export type Alert = {
  id: string; title: string; locationId: string; severity: RiskLevel; status: AlertStatus; cause: string; confidence: number
  action: string; time: string; leadTimeMinutes?: number | null; primaryThreat?: PrimaryThreat; citizenMessage?: string
}

export type DataSourceRow = {
  name: string; provider: string; type: SourceType; status: SourceStatus; lastUpdated: string; coverage: string; availability?: Availability
}

export type Shelter = {
  id: string; name: string; locationId: string; type: 'school' | 'community_hall' | 'hospital' | 'open'; capacity: number
  occupied: number; distanceKm: number; travelMinutes: number; lat: number; lng: number
}

export type TelemetryPoint = { label: string; rainfall: number; river: number }
export type RoadmapPhase = { phase: string; title: string; body: string; status: string }
export type StackItem = { name: string; role: string }
export type ImpactItem = { title: string; body: string }