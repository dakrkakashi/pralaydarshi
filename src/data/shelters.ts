import type { Shelter } from '../types'

export const shelters: Shelter[] = [
  { id: 's-rdp-school', name: 'Govt Higher Sec. School', locationId: 'rdp-s4', type: 'school', capacity: 320, occupied: 140, distanceKm: 1.4, travelMinutes: 8, lat: 30.291, lng: 78.982 },
  { id: 's-rdp-hall', name: 'Sector 4 Community Hall', locationId: 'rdp-s4', type: 'community_hall', capacity: 180, occupied: 82, distanceKm: 2.1, travelMinutes: 12, lat: 30.277, lng: 78.968 },
  { id: 's-gop-school', name: 'Gopeshwar Inter College', locationId: 'gop-w2', type: 'school', capacity: 260, occupied: 95, distanceKm: 1.8, travelMinutes: 10, lat: 30.416, lng: 79.313 },
  { id: 's-josh-hospital', name: 'Joshimath Relief Hospital', locationId: 'josh-ls', type: 'hospital', capacity: 120, occupied: 64, distanceKm: 2.6, travelMinutes: 16, lat: 30.565, lng: 79.558 },
  { id: 's-nain-hall', name: 'Mall Road Community Hall', locationId: 'nain-mr', type: 'community_hall', capacity: 300, occupied: 190, distanceKm: 1.1, travelMinutes: 7, lat: 29.397, lng: 79.449 },
  { id: 's-pauri-school', name: 'Pauri Village School', locationId: 'pdh-vg', type: 'school', capacity: 100, occupied: 32, distanceKm: 1.7, travelMinutes: 11, lat: 30.154, lng: 78.784 },
  { id: 's-kedar-open', name: 'Upper Valley Open Ground', locationId: 'ktg-v', type: 'open', capacity: 90, occupied: 12, distanceKm: 0.8, travelMinutes: 5, lat: 30.741, lng: 79.071 },
]

export function sheltersForLocation(locationId: string) {
  return shelters.filter((shelter) => shelter.locationId === locationId)
}
