import { Gauge, Info } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PanelHeading } from '../components/common/PanelHeading'
import { StatCard } from '../components/common/StatCard'
import { comparisonSystems, scaleSteps } from '../data/statistics'
import { impactItems, roadmapPhases, techStack } from '../data/roadmap'

export function AboutPage() {
  return (
    <>
      <div className="page-intro">
        <div>
          <span className="eyebrow">THE CASE FOR PRALAYADARSHI</span>
          <h2>Evidence, gap, response.</h2>
          <p>The proposal connects the problem scale in the source research with a practical, explainable decision layer.</p>
        </div>
        <Link className="button ghost" to="/dashboard"><Gauge size={16} /> Open dashboard</Link>
      </div>
      <div className="evidence-grid">
        <StatCard value="1,645" label="average annual flood-related deaths" detail="The cost of delayed or fragmented situational awareness is human." />
        <StatCard value="7M ha" label="affected annually" detail="Large geographies need prioritization, not just more data." />
        <StatCard value="33,904" label="field-validated landslides" detail="GSI’s inventory is valuable context, while validation remains incomplete." />
        <StatCard value="2–3" label="hyper-local IoT deployments" detail="The coverage gap makes an IoT-optional architecture important." />
      </div>
      <section className="panel comparison">
        <PanelHeading eyebrow="EXISTING SYSTEMS" title="Pralaydarshi fills the connection layer" />
        <div className="comparison-table">
          <div className="comparison-head">
            <span>System</span>
            <span>What it does well</span>
            <span>Connection gap</span>
          </div>
          {comparisonSystems.map((row) => (
            <div className="comparison-row" key={row.system}>
              <strong>{row.system}</strong>
              <span>{row.strength}</span>
              <span>{row.gap}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="scale-section">
        <div>
          <span className="eyebrow light">A RESPONSIBLE PATH TO SCALE</span>
          <h2>Start small. Validate locally. Connect nationally.</h2>
          <p>Prototype with simulated feeds, pilot low-cost field nodes estimated at approximately ₹2,600 each, validate outputs with authorities, then expand the observation network.</p>
        </div>
        <div className="scale-steps">
          {scaleSteps.map((item, index) => (
            <div key={item}>
              <span>0{index + 1}</span>
              <strong>{item}</strong>
            </div>
          ))}
        </div>
      </section>
      <section className="panel roadmap-panel">
        <PanelHeading eyebrow="ROADMAP" title="From foundation to multi-district scale" />
        <div className="roadmap-grid">{roadmapPhases.map((phase) => <div className="roadmap-card" key={phase.phase}><span>{phase.phase}</span><strong>{phase.title}</strong><p>{phase.body}</p><small>{phase.status}</small></div>)}</div>
      </section>
      <section className="panel stack-panel">
        <PanelHeading eyebrow="REFERENCE ARCHITECTURE" title="Designed to connect with public systems" />
        <div className="stack-grid">{techStack.map((item) => <div key={item.name}><strong>{item.name}</strong><span>{item.role}</span></div>)}</div>
      </section>
      <section className="impact-strip">{impactItems.map((item) => <div key={item.title}><span>{item.title}</span><p>{item.body}</p></div>)}</section>
      <div className="disclaimer">
        <Info size={16} />
        <span>Evidence figures are reproduced from the project source material and should be checked against current official datasets before public or operational use.</span>
      </div>
    </>
  )
}