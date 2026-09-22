import { useMemo } from 'react'
import { computeCompoundRisk } from '../lib/engine'
import type { Availability, RiskInputKey, RiskInputs, SensorStatus } from '../types'

export function useRiskCalculation(inputs: RiskInputs, availability: Partial<Record<RiskInputKey, Availability>>, sensorStatus: SensorStatus, leadTimeOverride: number | null = null) {
  return useMemo(() => {
    return computeCompoundRisk(inputs, availability, sensorStatus, leadTimeOverride)
  }, [inputs, availability, sensorStatus, leadTimeOverride])
}