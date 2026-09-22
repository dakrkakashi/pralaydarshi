import { Bell, ChevronRight, Gauge, Info, Layers3, LogOut, Radio, ShieldCheck, Sparkles, Waves, X } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { BRAND_NAME } from '../../lib/constants'

type SidebarProps = { mobileOpen: boolean; onClose: () => void }

type NavItem = { to: string; icon: ReactNode; label: string }

const NAV_ITEMS: NavItem[] = [
  { to: '/dashboard', icon: <Gauge size={18} />, label: 'Command dashboard' },
  { to: '/map', icon: <Layers3 size={18} />, label: 'Risk map' },
  { to: '/alerts', icon: <Bell size={18} />, label: 'Alerts & response' },
  { to: '/explainability', icon: <Sparkles size={18} />, label: 'Explainability' },
  { to: '/data-sources', icon: <Radio size={18} />, label: 'Data sources' },
]

function NavLink({ to, icon, label }: NavItem) {
  const active = useLocation().pathname === to
  return (
    <Link className={`nav-link ${active ? 'active' : ''}`} aria-current={active ? 'page' : undefined} to={to}>
      {icon}
      <span>{label}</span>
      {active && <span className="nav-active-dot" />}
    </Link>
  )
}

export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const { signOut } = useAuth()
  return (
    <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
      <div className="brand">
        <div className="brand-mark"><Waves size={21} /></div>
        <div>
          <strong className="brand-name">{BRAND_NAME}</strong>
          <span>EARLY WARNING INTELLIGENCE</span>
        </div>
        <button className="icon-button close-menu" onClick={onClose} aria-label="Close navigation">
          <X size={20} />
        </button>
      </div>
      <div className="demo-badge"><span className="pulse-dot" /> Live prototype · simulated data</div>
      <nav aria-label="Primary navigation">
        {NAV_ITEMS.map((item) => <NavLink key={item.to} {...item} />)}
      </nav>
      <div className="sidebar-bottom">
        <Link className="sidebar-info" to="/about">
          <Info size={17} /> About {BRAND_NAME} <ChevronRight size={16} />
        </Link>
        <button className="sidebar-logout" onClick={signOut}>
          <LogOut size={16} /> Sign out
        </button>
        <div className="authority-card">
          <ShieldCheck size={18} />
          <div>
            <strong>Human authority</strong>
            <span>Final warnings remain with authorized officials.</span>
          </div>
        </div>
      </div>
    </aside>
  )
}