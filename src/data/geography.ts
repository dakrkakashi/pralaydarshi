import type { LatLngExpression } from 'leaflet'

export type Polygon = LatLngExpression[]
export type Geography = { floodZone: Polygon; landslideZone: Polygon; safeRoutes: Polygon[]; roadsToAvoid: Polygon[] }

const box = (lat: number, lng: number, dLat: number, dLng: number): Polygon => [
  [lat - dLat, lng - dLng], [lat + dLat, lng - dLng], [lat + dLat, lng + dLng], [lat - dLat, lng + dLng], [lat - dLat, lng - dLng],
]

export const geography: Record<string, Geography> = {
  'rdp-s4': { floodZone: box(30.284, 78.975, .012, .014), landslideZone: box(30.291, 78.968, .009, .01), safeRoutes: [[[30.279, 78.969], [30.285, 78.978], [30.291, 78.982]]], roadsToAvoid: [[[30.278, 78.982], [30.284, 78.975], [30.292, 78.968]]] },
  'gop-w2': { floodZone: box(30.409, 79.32, .01, .012), landslideZone: box(30.416, 79.313, .007, .008), safeRoutes: [[[30.405, 79.31], [30.412, 79.316], [30.416, 79.313]]], roadsToAvoid: [[[30.4, 79.328], [30.409, 79.32], [30.418, 79.325]]] },
  'josh-ls': { floodZone: box(30.555, 79.564, .008, .009), landslideZone: box(30.561, 79.557, .012, .011), safeRoutes: [[[30.55, 79.56], [30.559, 79.56], [30.565, 79.558]]], roadsToAvoid: [[[30.548, 79.57], [30.555, 79.564], [30.565, 79.55]]] },
  'nain-mr': { floodZone: box(29.392, 79.454, .008, .01), landslideZone: box(29.4, 79.449, .005, .006), safeRoutes: [[[29.387, 79.45], [29.395, 79.452], [29.397, 79.449]]], roadsToAvoid: [[[29.385, 79.46], [29.392, 79.454], [29.4, 79.448]]] },
  'pdh-vg': { floodZone: box(30.149, 78.778, .007, .008), landslideZone: box(30.153, 78.784, .006, .006), safeRoutes: [[[30.145, 78.772], [30.15, 78.78], [30.154, 78.784]]], roadsToAvoid: [[[30.14, 78.786], [30.149, 78.778], [30.157, 78.781]]] },
  'ktg-v': { floodZone: box(30.735, 79.067, .005, .006), landslideZone: box(30.739, 79.071, .004, .004), safeRoutes: [[[30.732, 79.063], [30.737, 79.068], [30.741, 79.071]]], roadsToAvoid: [[[30.73, 79.072], [30.735, 79.067], [30.742, 79.062]]] },
}
