import type { LocationSeed } from '../types'

const availability = { rainfall: 'available', cumulative: 'available', river: 'available', riverRate: 'available', soil: 'available', slope: 'available', historical: 'available', population: 'available', iot: 'available' } as const

export const locationSeeds: LocationSeed[] = [
  {
    id: 'rdp-s4', name: 'Rudraprayag Sector 4', ward: 'Lower settlement', district: 'Rudraprayag', state: 'Uttarakhand', lat: 30.284, lng: 78.975, x: 45, y: 52,
    rainfall: 86, cumulativeRainfall: 320, forecast: 92, riverLevel: 3.8, riverTrend: 'rising', riverRateOfRise: 1.4, soilMoisture: 82, slope: 76, historicalExposure: 70, populationDensity: 48, households: 140,
    availability, sensorStatus: 'online', affectedZone: 'Lower settlement (140 households)', leadTimeMinutes: 35, floodRisk: 0, landslideRisk: 0,
    scores: { rainfall: 86, forecast: 92, river: 76, soil: 82, terrain: 76, historical: 70, iot: 100 }, updated: '2 min ago',
  },
  {
    id: 'gop-w2', name: 'Gopeshwar Ward 2', ward: 'Ward 2', district: 'Chamoli', state: 'Uttarakhand', lat: 30.409, lng: 79.320, x: 58, y: 29,
    rainfall: 72, cumulativeRainfall: 260, forecast: 80, riverLevel: 3.1, riverTrend: 'rising', riverRateOfRise: 1.0, soilMoisture: 68, slope: 58, historicalExposure: 60, populationDensity: 62, households: 95,
    availability: { ...availability, iot: 'unavailable' }, sensorStatus: 'offline', affectedZone: 'Ward 2 stream corridor (95 households)', leadTimeMinutes: null, floodRisk: 0, landslideRisk: 0,
    scores: { rainfall: 72, forecast: 80, river: 62, soil: 68, terrain: 58, historical: 60, iot: 0 }, updated: '8 min ago',
  },
  {
    id: 'josh-ls', name: 'Joshimath Lower Slopes', ward: 'Lower slopes', district: 'Chamoli', state: 'Uttarakhand', lat: 30.555, lng: 79.564, x: 73, y: 19,
    rainfall: 54, cumulativeRainfall: 280, forecast: 60, riverLevel: 2.3, riverTrend: 'stable', riverRateOfRise: 0.3, soilMoisture: 88, slope: 92, historicalExposure: 78, populationDensity: 42, households: 72,
    availability: { ...availability, iot: 'available' }, sensorStatus: 'degraded', affectedZone: 'Unstable lower slope (72 households)', leadTimeMinutes: null, floodRisk: 0, landslideRisk: 0,
    scores: { rainfall: 54, forecast: 60, river: 46, soil: 88, terrain: 92, historical: 78, iot: 70 }, updated: '5 min ago',
  },
  {
    id: 'nain-mr', name: 'Nainital Mall Road Wards', ward: 'Mall Road wards', district: 'Nainital', state: 'Uttarakhand', lat: 29.392, lng: 79.454, x: 27, y: 70,
    rainfall: 40, cumulativeRainfall: 150, forecast: 48, riverLevel: 2.1, riverTrend: 'rising', riverRateOfRise: 0.5, soilMoisture: 38, slope: 32, historicalExposure: 24, populationDensity: 42, households: 120,
    availability, sensorStatus: 'online', affectedZone: 'Mall Road drainage catchment (210 households)', leadTimeMinutes: null, floodRisk: 0, landslideRisk: 0,
    scores: { rainfall: 48, forecast: 55, river: 52, soil: 62, terrain: 48, historical: 40, iot: 100 }, updated: '7 min ago',
  },
  {
    id: 'pdh-vg', name: 'Pauri Village', ward: 'Valley hamlet', district: 'Pauri Garhwal', state: 'Uttarakhand', lat: 30.149, lng: 78.778, x: 34, y: 49,
    rainfall: 28, cumulativeRainfall: 110, forecast: 34, riverLevel: 1.4, riverTrend: 'stable', riverRateOfRise: 0.1, soilMoisture: 38, slope: 30, historicalExposure: 25, populationDensity: 22, households: 38,
    availability, sensorStatus: 'online', affectedZone: 'Valley access road (38 households)', leadTimeMinutes: null, floodRisk: 0, landslideRisk: 0,
    scores: { rainfall: 28, forecast: 34, river: 28, soil: 38, terrain: 30, historical: 25, iot: 100 }, updated: '10 min ago',
  },
  {
    id: 'ktg-v', name: 'Kedarnath Valley Hamlet', ward: 'Valley hamlet', district: 'Rudraprayag', state: 'Uttarakhand', lat: 30.735, lng: 79.067, x: 51, y: 82,
    rainfall: 10, cumulativeRainfall: 34, forecast: 16, riverLevel: 0.7, riverTrend: 'falling', riverRateOfRise: 0, soilMoisture: 18, slope: 12, historicalExposure: 10, populationDensity: 10, households: 18,
    availability, sensorStatus: 'online', affectedZone: 'Upper hamlet (18 households)', leadTimeMinutes: null, floodRisk: 0, landslideRisk: 0,
    scores: { rainfall: 10, forecast: 16, river: 14, soil: 18, terrain: 12, historical: 10, iot: 100 }, updated: '12 min ago',
  },
]
