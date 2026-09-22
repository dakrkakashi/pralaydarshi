import { useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useAlerts } from '../../hooks/useAlerts'
import { useAuth } from '../../hooks/useAuth'
import { useLiveData } from '../../hooks/useLiveData'
import { AboutPage } from '../../pages/AboutPage'
import { AlertsPage } from '../../pages/AlertsPage'
import { CitizenAlertPage } from '../../pages/CitizenAlertPage'
import { DashboardPage } from '../../pages/DashboardPage'
import { DataSourcesPage } from '../../pages/DataSourcesPage'
import { ExplainabilityPage } from '../../pages/ExplainabilityPage'
import { LandingPage } from '../../pages/LandingPage'
import { LocationPage } from '../../pages/LocationPage'
import { LoginPage } from '../../pages/LoginPage'
import { MapPage } from '../../pages/MapPage'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

export function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { alerts, updateAlert } = useAlerts()
  const { isAuthenticated } = useAuth()
  const { lastUpdatedLabel } = useLiveData()
  const location = useLocation()

  if (location.pathname === '/') {
    return <LandingPage />
  }

  if (location.pathname === '/login') {
    return <LoginPage />
  }

  if (location.pathname.startsWith('/citizen-alert')) {
    return <CitizenAlertPage alerts={alerts} />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="app-shell">
        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        {mobileOpen && <button className="scrim" onClick={() => setMobileOpen(false)} aria-label="Close menu" />}
        <main id="main-content" tabIndex={-1} className="main-content">
          <Topbar updatedLabel={lastUpdatedLabel} onOpenMenu={() => setMobileOpen(true)} />
          <div className="page-wrap">
            <Routes>
              <Route path="/dashboard" element={<DashboardPage alerts={alerts} />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/alerts" element={<AlertsPage alerts={alerts} updateAlert={updateAlert} />} />
              <Route path="/citizen-alert" element={<CitizenAlertPage />} />
              <Route path="/citizen-alert/:locationId" element={<CitizenAlertPage />} />
              <Route path="/locations/:locationId" element={<LocationPage />} />
              <Route path="/explainability" element={<ExplainabilityPage />} />
              <Route path="/data-sources" element={<DataSourcesPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </>
  )
}