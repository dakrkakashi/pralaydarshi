import type { RiskLevel } from '../types'

export const BRAND_NAME = 'Pralaydarshi'

export const riskMeta: Record<RiskLevel, { label: string; className: string }> = {
  normal: { label: 'Normal', className: 'normal' },
  watch: { label: 'Watch', className: 'watch' },
  warning: { label: 'Warning', className: 'warning' },
  critical: { label: 'Critical', className: 'critical' },
}

const TITLES: Record<string, string> = {
  '/dashboard': 'Command dashboard',
  '/map': 'Risk map',
  '/alerts': 'Alerts & response',
  '/citizen-alert': 'Public alert view',
  '/explainability': 'Explainability',
  '/data-sources': 'Data sources',
  '/about': `About ${BRAND_NAME}`,
}

export function pageTitle(pathname: string): string {
  if (pathname.startsWith('/locations')) return 'Location intelligence'
  return TITLES[pathname] ?? BRAND_NAME
}