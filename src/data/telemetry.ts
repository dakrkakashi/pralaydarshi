import type { TelemetryPoint } from '../types'

const series = (rainfall: number, river: number): TelemetryPoint[] => [
  { label: '04:00', rainfall: Math.round(rainfall * .32), river: Number((river * .84).toFixed(1)) },
  { label: '05:00', rainfall: Math.round(rainfall * .38), river: Number((river * .86).toFixed(1)) },
  { label: '06:00', rainfall: Math.round(rainfall * .45), river: Number((river * .89).toFixed(1)) },
  { label: '07:00', rainfall: Math.round(rainfall * .52), river: Number((river * .91).toFixed(1)) },
  { label: '08:00', rainfall: Math.round(rainfall * .68), river: Number((river * .95).toFixed(1)) },
  { label: '09:00', rainfall: Math.round(rainfall * .82), river: Number((river * .98).toFixed(1)) },
  { label: '10:00', rainfall: Math.round(rainfall * .9), river: Number((river * 1.01).toFixed(1)) },
  { label: '11:00', rainfall: Math.round(rainfall * .76), river: Number((river * 1.04).toFixed(1)) },
  { label: '12:00', rainfall: Math.round(rainfall * .7), river: Number((river * 1.06).toFixed(1)) },
  { label: '13:00', rainfall: Math.round(rainfall * .83), river: Number((river * 1.08).toFixed(1)) },
  { label: '14:00', rainfall: Math.round(rainfall * .94), river: Number((river * 1.1).toFixed(1)) },
  { label: '15:00', rainfall, river: Number((river * 1.12).toFixed(1)) },
]

export const telemetry: Record<string, TelemetryPoint[]> = {
  'rdp-s4': series(86, 3.8), 'gop-w2': series(72, 3.1), 'josh-ls': series(54, 2.3), 'nain-mr': series(48, 2.6), 'pdh-vg': series(28, 1.4), 'ktg-v': series(10, .7),
}
