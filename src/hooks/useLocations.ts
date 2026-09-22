import { useMemo } from 'react'
import { locationSeeds } from '../data/locations'
import { computeCompoundRisk } from '../lib/engine'
import type { Location } from '../types'

export function useLocations(): Location[] {
  return useMemo(
    () =>
      locationSeeds.map((seed) => {
        const inputs = {
          rainfall: seed.rainfall,
          cumulativeRainfall: seed.cumulativeRainfall,
          riverLevel: seed.riverLevel,
          riverRateOfRise: seed.riverRateOfRise,
          soilMoisture: seed.soilMoisture,
          slope: seed.slope,
          historicalExposure: seed.historicalExposure,
          populationDensity: seed.populationDensity,
          households: seed.households,
        }
        const result = computeCompoundRisk(inputs, seed.availability, seed.sensorStatus, seed.leadTimeMinutes)
        return {
          ...seed,
          ...result,
        }
      }),
    [],
  )
}