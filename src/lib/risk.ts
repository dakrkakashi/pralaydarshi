import type { RiskLevel } from '../types'

export function riskLevelFromScore(score: number): RiskLevel {
  if (score < 25) return 'normal'
  if (score < 50) return 'watch'
  if (score < 70) return 'warning'
  return 'critical'
}
