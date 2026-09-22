import { Menu } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { pageTitle } from '../../lib/constants'

type TopbarProps = { updatedLabel: string; onOpenMenu: () => void }

export function Topbar({ updatedLabel, onOpenMenu }: TopbarProps) {
  const location = useLocation()
  return (
    <header className="topbar">
      <button className="icon-button mobile-menu" onClick={onOpenMenu} aria-label="Open navigation">
        <Menu size={21} />
      </button>
      <div>
        <span className="eyebrow">NATIONAL MULTI-HAZARD MONITORING</span>
        <h1>{pageTitle(location.pathname)}</h1>
      </div>
      <div className="topbar-actions">
        <div className="sync-status" role="status">
          <span className="pulse-dot" /> {updatedLabel}
        </div>
        <button className="profile">
          <span>SD</span>
          <div>
            <strong>Situation desk</strong>
            <small>Demo operator</small>
          </div>
        </button>
      </div>
    </header>
  )
}