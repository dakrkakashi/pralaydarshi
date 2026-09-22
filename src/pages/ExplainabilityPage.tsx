import { AlertTriangle, ChevronRight, Sparkles } from 'lucide-react'
import { PanelHeading } from '../components/common/PanelHeading'
import { weightRows } from '../data/statistics'
import { flowSteps } from '../data/flowSteps'

const FUSION_INPUTS = ['Rainfall', 'Forecast', 'River level', 'Soil moisture', 'Terrain / slope', 'Historical landslides', 'Optional IoT']

export function ExplainabilityPage() {
  return (
    <>
      <div className="page-intro">
        <div>
          <span className="eyebrow">TRANSPARENT RISK ENGINE</span>
          <h2>Explainability</h2>
          <p>Every signal should make the next conversation clearer, not replace it.</p>
        </div>
        <span className="model-chip"><Sparkles size={15} /> Prototype model v0.4</span>
      </div>
      <section className="panel fusion-panel">
        <PanelHeading eyebrow="MULTI-SOURCE FUSION" title="Observe → fuse → explain → coordinate" />
        <div className="fusion-diagram">
          <div className="fusion-inputs">
            {FUSION_INPUTS.map((item, index) => (
              <div className="fusion-input" key={item}><span className={`input-icon i-${index}`} />{item}</div>
            ))}
          </div>
          <div className="fusion-arrow">
            <span>Normalize<br />& weight</span>
            <ChevronRight size={25} />
          </div>
          <div className="fusion-engine">
            <Sparkles size={28} />
            <strong>Risk<br />engine</strong>
            <small>rules + ML</small>
          </div>
          <div className="fusion-arrow">
            <ChevronRight size={25} />
            <span>Explain<br />drivers</span>
          </div>
          <div className="fusion-output">
            <AlertTriangle size={22} />
            <strong>Actionable<br />alert</strong>
          </div>
        </div>
      </section>
      <section className="panel pipeline-panel">
        <PanelHeading eyebrow="SENSE · LEARN · ACT" title="Seven transparent stages" />
        <div className="pipeline-groups"><div><span className="pipeline-group-label">SENSE</span><div className="pipeline-steps">{flowSteps.slice(0, 3).map((step) => <div key={step.number}><b>{step.number}</b><span>{step.title}</span></div>)}</div></div><div><span className="pipeline-group-label">LEARN</span><div className="pipeline-steps">{flowSteps.slice(3, 5).map((step) => <div key={step.number}><b>{step.number}</b><span>{step.title}</span></div>)}</div></div><div><span className="pipeline-group-label">ACT</span><div className="pipeline-steps">{flowSteps.slice(5).map((step) => <div key={step.number}><b>{step.number}</b><span>{step.title}</span></div>)}</div></div></div>
      </section>
      <div className="detail-grid">
        <section className="panel">
          <PanelHeading eyebrow="DEMO WEIGHTS" title="What influences a score?" />
          <div className="weight-list">
            {weightRows.map((row) => (
              <div className="weight-row" key={row.label}>
                <span>{row.label}</span>
                <div className="progress"><span className={`fill-${row.color}`} style={{ width: `${row.value * 3}%` }} /></div>
                <strong>{row.value}%</strong>
              </div>
            ))}
          </div>
          <p className="small-note">Prototype demonstration weights only. Production thresholds require historical back-testing, field validation and authority approval.</p>
        </section>
        <section className="panel">
          <PanelHeading eyebrow="DECISION LOGIC" title="Readable rules" />
          <div className="rule-list">
            <div>
              <span className="rule-number">01</span>
              <p><strong>Flood pressure rises</strong> when rainfall intensity is high and the river trend is rising.</p>
            </div>
            <div>
              <span className="rule-number">02</span>
              <p><strong>Landslide pressure rises</strong> when soil is saturated and slope susceptibility is high.</p>
            </div>
            <div>
              <span className="rule-number">03</span>
              <p><strong>Confidence falls</strong> when observations are stale, missing or disagree.</p>
            </div>
          </div>
        </section>
      </div>
      <div className="disclaimer"><AlertTriangle size={16} /><span>Current engine: transparent deterministic model. Infinite Slope Stability, LSTM and XGBoost are roadmap validation methods, not claims of current AI accuracy.</span></div>
    </>
  )
}