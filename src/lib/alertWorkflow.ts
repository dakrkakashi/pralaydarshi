import type { AlertStatus } from '../types'

export function nextAlertStatus(status: AlertStatus, action: 'approve' | 'broadcast' | 'acknowledge' | 'escalate' | 'resolve'): AlertStatus {
  if (action === 'approve' && status === 'pending_approval') return 'approved'
  if (action === 'broadcast' && status === 'approved') return 'broadcast'
  if (action === 'acknowledge' && status === 'broadcast') return 'acknowledged'
  if (action === 'escalate' && status === 'acknowledged') return 'escalated'
  if (action === 'resolve' && status !== 'resolved') return 'resolved'
  return status
}
