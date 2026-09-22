import type { Alert } from '../types'

export const initialAlerts: Alert[] = [
  {
    id: 'a-001', title: 'Compound risk detected', locationId: 'rdp-s4', severity: 'critical', status: 'pending_approval',
    cause: 'Rainfall intensity, rising river gauge and slope exposure are converging.', confidence: 92, leadTimeMinutes: 35, primaryThreat: 'compound',
    action: 'Review and approve a village-level public alert.', time: '09:42 IST', citizenMessage: 'Heavy rain and rising water may affect Lower settlement. Move to Govt Higher Sec. School now and avoid the river road.',
  },
  {
    id: 'a-002', title: 'Flash flood watch', locationId: 'gop-w2', severity: 'warning', status: 'approved',
    cause: 'River rise and cumulative rainfall remain elevated; IoT telemetry is unavailable.', confidence: 72, leadTimeMinutes: 55, primaryThreat: 'flood',
    action: 'Send citizen alert after final authority review.', time: '09:38 IST', citizenMessage: 'Water levels may rise near Ward 2. Keep away from streams and be ready to move to the designated shelter.',
  },
  {
    id: 'a-003', title: 'Slope failure readiness', locationId: 'josh-ls', severity: 'warning', status: 'broadcast',
    cause: 'Saturated soil and steep unstable slopes increase landslide pressure.', confidence: 84, leadTimeMinutes: 60, primaryThreat: 'landslide',
    action: 'Monitor slope movement and keep the response team ready.', time: '09:31 IST', citizenMessage: 'Slope movement is possible near Lower slopes. Stay away from cut slopes and follow local authority instructions.',
  },
  {
    id: 'a-004', title: 'Urban drainage watch', locationId: 'nain-mr', severity: 'watch', status: 'acknowledged',
    cause: 'Short-duration rainfall and dense urban exposure may overwhelm drainage.', confidence: 88, leadTimeMinutes: 120, primaryThreat: 'flood',
    action: 'Inspect drains and keep local response teams ready.', time: '09:18 IST', citizenMessage: 'Brief flooding is possible around Mall Road wards. Avoid underpasses and report blocked drains.',
  },
]
