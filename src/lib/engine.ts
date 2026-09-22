import type { Availability, CompoundResult, PrimaryThreat, RiskInputKey, RiskInputs, RiskLevel, SensorStatus } from '../types'
import { riskLevelFromScore } from './risk'

const AVAILABLE = (availability: Partial<Record<RiskInputKey, Availability>>, key: RiskInputKey) => availability[key] !== 'unavailable'
const clamp = (value: number) => Math.max(0, Math.min(100, value))
const weighted = (terms: Array<[RiskInputKey, number, number]>, availability: Partial<Record<RiskInputKey, Availability>>) => {
  const active = terms.filter(([key]) => AVAILABLE(availability, key))
  const totalWeight = active.reduce((sum, [, weight]) => sum + weight, 0)
  return totalWeight === 0 ? 0 : active.reduce((sum, [, weight, score]) => sum + (weight / totalWeight) * clamp(score), 0)
}

export function computeFloodRisk(inputs: RiskInputs, availability: Partial<Record<RiskInputKey, Availability>>): number {
  return Math.round(weighted([
    ['rainfall', 35, inputs.rainfall],
    ['cumulative', 20, inputs.cumulativeRainfall / 4],
    ['river', 25, inputs.riverLevel * 20],
    ['riverRate', 20, inputs.riverRateOfRise * 25],
  ], availability))
}

export function computeLandslideRisk(inputs: RiskInputs, availability: Partial<Record<RiskInputKey, Availability>>): number {
  return Math.round(weighted([
    ['soil', 35, inputs.soilMoisture],
    ['slope', 30, inputs.slope],
    ['cumulative', 15, inputs.cumulativeRainfall / 4],
    ['historical', 20, inputs.historicalExposure],
  ], availability))
}

export function computeVulnerability(inputs: RiskInputs, availability: Partial<Record<RiskInputKey, Availability>>): number {
  return Math.round(weighted([
    ['population', 60, inputs.populationDensity],
    ['historical', 40, inputs.households / 2],
  ], availability))
}

export function computeConditions(sensorStatus: SensorStatus, availability: Partial<Record<RiskInputKey, Availability>>): number {
  const base = sensorStatus === 'online' ? 100 : sensorStatus === 'degraded' ? 85 : 70
  return availability.iot === 'unavailable' ? Math.max(0, base - 10) : base
}

export function computeConfidence(sensorStatus: SensorStatus, unavailableCount = 0): number {
  const base = sensorStatus === 'online' ? 96 : sensorStatus === 'degraded' ? 84 : 70
  return Math.max(35, base - unavailableCount * 6)
}

export function classifyPrimaryThreat(floodRisk: number, landslideRisk: number): PrimaryThreat {
  if (floodRisk < 25 && landslideRisk < 25) return 'none'
  if (floodRisk > landslideRisk + 10) return 'flood'
  if (landslideRisk > floodRisk + 10) return 'landslide'
  return 'compound'
}

export function estimateLeadTime(score: number, level: RiskLevel, riverRate: number, floodRisk: number): number | null {
  if (level === 'normal') return null
  if (level === 'watch') return Math.round((180 - Math.min(90, riverRate * 12)) / 5) * 5
  if (level === 'warning') return Math.round((90 - Math.min(45, riverRate * 10)) / 5) * 5
  return Math.max(10, Math.min(45, Math.round((85 - score / 2 - riverRate * 3 - floodRisk / 12) / 5) * 5))
}

const labels: Record<string, string> = {
  rainfall: 'Rainfall intensity', cumulative: 'Cumulative rainfall', river: 'River gauge', riverRate: 'River rise rate',
  soil: 'Soil saturation', slope: 'Slope stability', historical: 'Historical exposure', population: 'Population density', iot: 'IoT telemetry',
  vulnerability: 'Local vulnerability', conditions: 'Real-time conditions',
}

export function computeCompoundRisk(
  inputs: RiskInputs,
  availability: Partial<Record<RiskInputKey, Availability>>,
  sensorStatus: SensorStatus,
  leadTimeOverride: number | null = null,
): CompoundResult {
  const unavailable = (Object.keys(availability) as RiskInputKey[]).filter((key) => availability[key] === 'unavailable')
  const floodRisk = computeFloodRisk(inputs, availability)
  const landslideRisk = computeLandslideRisk(inputs, availability)
  const vulnerability = computeVulnerability(inputs, availability)
  const conditions = computeConditions(sensorStatus, availability)
  const overallRisk = Math.round(floodRisk * 0.38 + landslideRisk * 0.32 + vulnerability * 0.18 + conditions * 0.12)
  const riskLevel = riskLevelFromScore(overallRisk)
  const primaryThreat = classifyPrimaryThreat(floodRisk, landslideRisk)
  const leadTimeMinutes = leadTimeOverride ?? estimateLeadTime(overallRisk, riskLevel, inputs.riverRateOfRise, floodRisk)
  const groups: Array<[RiskInputKey | 'vulnerability' | 'conditions', number]> = [
    ['rainfall', floodRisk * 0.38], ['river', floodRisk * 0.38], ['soil', landslideRisk * 0.32], ['slope', landslideRisk * 0.32],
    ['vulnerability', vulnerability * 0.18], ['conditions', conditions * 0.12],
  ]
  const total = groups.reduce((sum, [, value]) => sum + value, 0) || 1
  const contributions = groups.map(([key, value]) => ({ key, label: labels[key], score: Math.round(value), contribution: Math.round(value / total * 100) }))
  return { overallRisk, riskLevel, floodRisk, landslideRisk, vulnerability, conditions, confidence: computeConfidence(sensorStatus, unavailable.length), contributions, leadTimeMinutes, primaryThreat, unavailable }
}
