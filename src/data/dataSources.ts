import type { DataSourceRow } from '../types'

export const sourceRows: DataSourceRow[] = [
  { name: 'Weather forecast', provider: 'IMD', type: 'weather', status: 'online', lastUpdated: '6 min ago', coverage: 'National' },
  { name: 'River gauges', provider: 'CWC', type: 'river', status: 'online', lastUpdated: '4 min ago', coverage: '360 stations' },
  { name: 'Landslide inventory', provider: 'GSI', type: 'historical', status: 'online', lastUpdated: '1 day ago', coverage: '91,000 records' },
  { name: 'Terrain & slope', provider: 'NASA / DEM', type: 'terrain', status: 'online', lastUpdated: '12 hrs ago', coverage: '30 m resolution' },
  { name: 'Satellite change', provider: 'Sentinel-1', type: 'satellite', status: 'degraded', lastUpdated: '2 hrs ago', coverage: 'Cloud-aware' },
  { name: 'Optional IoT nodes', provider: 'Pralaydarshi Chamoli pilot', type: 'iot', status: 'degraded', lastUpdated: '9 min ago', coverage: '3 / 5 online' },
]