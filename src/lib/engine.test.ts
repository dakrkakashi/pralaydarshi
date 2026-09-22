import { describe, expect, it } from 'vitest'
import { locationSeeds } from '../data/locations'
import { shelters } from '../data/shelters'
import { computeCompoundRisk, classifyPrimaryThreat, estimateLeadTime } from './engine'
import { riskLevelFromScore } from './risk'

const inputsFor = (seed: typeof locationSeeds[number]) => ({
  rainfall: seed.rainfall, cumulativeRainfall: seed.cumulativeRainfall, riverLevel: seed.riverLevel,
  riverRateOfRise: seed.riverRateOfRise, soilMoisture: seed.soilMoisture, slope: seed.slope,
  historicalExposure: seed.historicalExposure, populationDensity: seed.populationDensity, households: seed.households,
})

describe('compound risk engine', () => {
  it('represents all four risk tiers across the six pilot locations', () => {
    const levels = locationSeeds.map((seed) => computeCompoundRisk(inputsFor(seed), seed.availability, seed.sensorStatus, seed.leadTimeMinutes))
    expect(levels.map((result) => result.riskLevel)).toEqual(['critical', 'warning', 'warning', 'watch', 'watch', 'normal'])
    expect(levels[0].overallRisk).toBeGreaterThanOrEqual(70)
    expect(levels[0].overallRisk).toBeLessThanOrEqual(85)
  })

  it('renormalizes unavailable inputs instead of treating them as safe', () => {
    const seed = locationSeeds[0]
    const complete = computeCompoundRisk(inputsFor(seed), seed.availability, seed.sensorStatus)
    const missing = computeCompoundRisk(inputsFor(seed), { ...seed.availability, soil: 'unavailable' }, seed.sensorStatus)
    expect(missing.unavailable).toContain('soil')
    expect(missing.confidence).toBeLessThan(complete.confidence)
    expect(missing.contributions.filter((item) => item.key === 'soil')[0].score).toBeGreaterThan(0)
    expect(missing.contributions.reduce((sum, item) => sum + item.contribution, 0)).toBeGreaterThanOrEqual(95)
  })

  it('excludes offline IoT from the Gopeshwar score', () => {
    const seed = locationSeeds.find((item) => item.id === 'gop-w2')!
    const result = computeCompoundRisk(inputsFor(seed), seed.availability, seed.sensorStatus)
    expect(result.unavailable).toContain('iot')
    expect(result.confidence).toBeLessThan(80)
  })
})

describe('risk helpers', () => {
  it('classifies the primary threat', () => {
    expect(classifyPrimaryThreat(80, 40)).toBe('flood')
    expect(classifyPrimaryThreat(35, 70)).toBe('landslide')
    expect(classifyPrimaryThreat(70, 65)).toBe('compound')
    expect(classifyPrimaryThreat(10, 20)).toBe('none')
  })

  it('estimates lead-time bands', () => {
    expect(estimateLeadTime(18, 'normal', 0, 10)).toBeNull()
    expect(estimateLeadTime(78, 'critical', 1.4, 80)).toBe(35)
    expect(estimateLeadTime(55, 'warning', .5, 60)).toBeGreaterThanOrEqual(45)
    expect(estimateLeadTime(35, 'watch', .1, 30)).toBeGreaterThanOrEqual(90)
    expect(riskLevelFromScore(70)).toBe('critical')
  })
})

describe('shelter data', () => {
  it('never exceeds capacity', () => {
    expect(shelters.every((shelter) => shelter.occupied <= shelter.capacity)).toBe(true)
  })
})
