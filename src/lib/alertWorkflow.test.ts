import { describe, expect, it } from 'vitest'
import { nextAlertStatus } from './alertWorkflow'

describe('alert workflow', () => {
  it('moves an approved alert to the citizen broadcast', () => {
    expect(nextAlertStatus('pending_approval', 'approve')).toBe('approved')
    expect(nextAlertStatus('approved', 'broadcast')).toBe('broadcast')
    expect(nextAlertStatus('broadcast', 'acknowledge')).toBe('acknowledged')
    expect(nextAlertStatus('acknowledged', 'escalate')).toBe('escalated')
    expect(nextAlertStatus('escalated', 'resolve')).toBe('resolved')
  })

  it('does not skip authority gates', () => {
    expect(nextAlertStatus('pending_approval', 'broadcast')).toBe('pending_approval')
    expect(nextAlertStatus('resolved', 'acknowledge')).toBe('resolved')
  })
})
