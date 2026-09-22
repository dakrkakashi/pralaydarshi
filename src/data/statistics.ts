export type LandingStat = { id: string; value: string; label: string }

export const landingStats: LandingStat[] = [
  { id: 'deaths', value: '1,645', label: 'average annual flood-related deaths' },
  { id: 'affected', value: '31.6M', label: 'people affected annually' },
  { id: 'records', value: '91K', label: 'landslide records in GSI inventory' },
  { id: 'node', value: '₹2,600', label: 'estimated low-cost sensor node' },
]

export type WeightRow = { label: string; value: number; color: string }

export const weightRows: WeightRow[] = [
  { label: 'Rainfall', value: 25, color: 'teal' },
  { label: 'Forecast', value: 15, color: 'cyan' },
  { label: 'River level', value: 20, color: 'orange' },
  { label: 'Soil moisture', value: 15, color: 'blue' },
  { label: 'Terrain / slope', value: 10, color: 'purple' },
  { label: 'Historical context', value: 10, color: 'slate' },
  { label: 'Optional IoT', value: 5, color: 'green' },
]

export type ComparisonSystem = { system: string; strength: string; gap: string }

export const comparisonSystems: ComparisonSystem[] = [
  { system: 'CWC', strength: 'River and flood forecasting', gap: 'Limited hyper-local multi-hazard fusion' },
  { system: 'GSI', strength: 'Landslide inventory and susceptibility', gap: 'Limited real-time warning workflow' },
  { system: 'SACHET', strength: 'Public warning distribution', gap: 'Not a complete local risk-fusion engine' },
  { system: 'Amrita LEWS', strength: 'Hyper-local field deployment', gap: 'Needs broader integration and scale' },
  { system: 'Pralaydarshi', strength: 'Multi-source explainable fusion', gap: 'Prototype requiring validation' },
]

export const scaleSteps = ['Simulated demo', 'Pilot district', 'Field validation', 'Progressive scale']

export const chartBars = [34, 42, 39, 54, 66, 88, 75, 94, 82, 100, 93, 86]