import { ArrowUpRight, ChevronRight, Globe2, ShieldCheck, Signal, Sparkles, Waves } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { flowSteps } from '../data/flowSteps'
import { landingStats } from '../data/statistics'
import { BRAND_NAME } from '../lib/constants'

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="stat">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  )
}

function Feature({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
  return (
    <div className="feature">
      <div className="feature-icon">{icon}</div>
      <div>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
    </div>
  )
}

export function LandingPage() {
  const navigate = useNavigate()
  return (
    <>
      <a className="skip-link" href="#landing-main">Skip to content</a>
      <div className="landing">
        <nav className="landing-nav">
          <Link className="brand" to="/">
            <div className="brand-mark"><Waves size={21} /></div>
            <div>
              <strong className="brand-name">{BRAND_NAME}</strong>
              <span>EARLY WARNING INTELLIGENCE</span>
            </div>
          </Link>
          <div className="landing-links">
            <a href="#how-it-works">How it works</a>
            <a href="#evidence">Evidence</a>
            <Link to="/about">About</Link>
            <Link to="/login">Sign in</Link>
          </div>
          <button className="button primary small" onClick={() => navigate('/dashboard')}>Open dashboard <ArrowUpRight size={16} /></button>
        </nav>

        <section className="hero-section" id="landing-main" tabIndex={-1}>
          <div className="hero-copy">
            <div className="kicker"><span className="pulse-dot" /> Decision support for vulnerable regions</div>
            <h1>Compound risk.<br /><em>Lead time. Action.</em></h1>
            <p>{BRAND_NAME} fuses rainfall, river levels, terrain, soil moisture and historical landslides into explainable, hyper-local intelligence for flash-flood and landslide preparedness.</p>
            <div className="hero-actions">
              <button className="button primary" onClick={() => navigate('/dashboard')}>Open live dashboard <ArrowUpRight size={17} /></button>
              <a className="text-link" href="#how-it-works">Explore the approach <ChevronRight size={17} /></a>
            </div>
            <div className="hero-note"><ShieldCheck size={17} /> Prototype decision support · final action remains with authorized authorities</div>
          </div>
          <div className="hero-visual">
            <div className="radar-grid">
              <div className="radar-sweep" />
              <div className="radar-ring ring-one" />
              <div className="radar-ring ring-two" />
              <div className="radar-ring ring-three" />
              <span className="radar-point point-one" />
              <span className="radar-point point-two" />
              <span className="radar-point point-three" />
              <div className="radar-center">
                <Waves size={28} />
                <span>FUSION<br />ENGINE</span>
              </div>
            </div>
            <div className="visual-caption">
              <span>MONITORING NETWORK</span>
              <strong>5 vulnerable corridors · 8 data layers</strong>
            </div>
          </div>
        </section>

        <section className="stat-strip" id="evidence">
          {landingStats.map((stat) => <Stat key={stat.id} value={stat.value} label={stat.label} />)}
        </section>

        <section className="section" id="how-it-works">
          <div className="section-heading">
            <div>
              <span className="eyebrow">A DECISION LAYER, NOT ANOTHER SILO</span>
              <h2>From scattered signals to a shared picture.</h2>
            </div>
            <p>Existing systems provide valuable forecasts, inventories and public messaging. {BRAND_NAME} connects those signals at village and ward level, then shows people why risk changed.</p>
          </div>
          <div className="flow-grid">
            {flowSteps.map((step) => (
              <div className="flow-card" key={step.title}>
                <span className="flow-number">{step.number}</span>
                <div className="flow-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="dark-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow light">WHY PRALAYADARSHI</span>
              <h2>Designed for imperfect coverage.</h2>
            </div>
            <p>IoT improves hyper-local precision, but it is not a hard dependency. When a node is offline, the system exposes the gap and continues with the other available inputs.</p>
          </div>
          <div className="feature-grid">
            <Feature icon={<Signal />} title="IoT optional" body="Keep monitoring when local sensor coverage is limited." />
            <Feature icon={<Sparkles />} title="Explainable by design" body="Show the evidence behind a warning instead of a black-box score." />
            <Feature icon={<Globe2 />} title="Built to scale" body="Start with simulated data, validate in a pilot district, then expand." />
          </div>
        </section>

        <section className="interface-section">
          <div className="section-heading">
            <div><span className="eyebrow">ONE RISK ENGINE · TWO INTERFACES</span><h2>Different audiences. One accountable picture.</h2></div>
            <p>Authorities need evidence, approval and coordination. Residents need plain language, lead time and a safe next step.</p>
          </div>
          <div className="interface-grid">
            <Link className="interface-card authority" to="/dashboard"><span>AUTHORITY CONTROL ROOM</span><strong>Detect → estimate → decide</strong><p>Inspect compound risk, sensor health, shelters, routes and approval queues.</p><ArrowUpRight size={19} /></Link>
            <Link className="interface-card citizen" to="/citizen-alert"><span>PUBLIC ALERT VIEW</span><strong>Act with clarity</strong><p>Read a broadcast alert in plain language: where to go, what to avoid and how soon.</p><ArrowUpRight size={19} /></Link>
          </div>
        </section>

        <footer className="landing-footer">
          <div>
            <strong className="brand-name">{BRAND_NAME}</strong>
            <span>Observe · Fuse · Explain · Coordinate</span>
          </div>
          <span>SIH prototype · 2026</span>
        </footer>
      </div>
    </>
  )
}