import { useEffect, useState } from 'react'

const MINUTE = 60_000
const seededLastUpdate = Date.now() - 2 * MINUTE

export function useLiveData(intervalMs = 30_000) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), intervalMs)
    return () => window.clearInterval(timer)
  }, [intervalMs])

  const minutesAgo = Math.max(1, Math.floor((now - seededLastUpdate) / MINUTE))
  const lastUpdatedLabel = minutesAgo < 2 ? 'Updated just now' : `Updated ${minutesAgo} min ago`

  return { now, lastUpdatedLabel }
}