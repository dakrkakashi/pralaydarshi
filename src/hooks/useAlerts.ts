import { useState } from 'react'
import { initialAlerts } from '../data/alerts'
import type { Alert, AlertStatus } from '../types'

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts)

  const updateAlert = (id: string, status: AlertStatus) => {
    setAlerts((current) => current.map((alert) => (alert.id === id ? { ...alert, status } : alert)))
  }

  return { alerts, updateAlert }
}