import { ChevronRight, Radio, Signal } from 'lucide-react'
import { Link } from 'react-router-dom'
import { sourceRows } from '../data/dataSources'

export function DataSourcesPage() {
  const onlineCount = sourceRows.filter((row) => row.status === 'online').length
  const degradedReference = sourceRows.filter((row) => row.status === 'degraded' && row.type !== 'iot').length
  const optionalCount = sourceRows.filter((row) => row.type === 'iot').length
  return (
    <>
      <div className="page-intro">
        <div>
          <span className="eyebrow">OBSERVATION NETWORK</span>
          <h2>Data sources</h2>
          <p>Know what is informing the model, how fresh it is and where coverage is limited.</p>
        </div>
        <div className="source-summary">
          <strong>{onlineCount}</strong>
          <span>online · {degradedReference} degraded · {optionalCount} optional</span>
        </div>
      </div>
      <section className="panel source-table">
        <div className="table-head source-head">
          <span>Source</span>
          <span>Provider</span>
          <span>Type</span>
          <span>Status</span>
          <span>Last update</span>
          <span>Coverage</span>
        </div>
        {sourceRows.map((row) => (
          <div className="table-row source-row" key={row.name}>
            <div className="table-alert">
              <div className={`source-icon ${row.type}`}><Radio size={16} /></div>
              <div>
                <strong>{row.name}</strong>
                <span>{row.type === 'iot' ? 'Hyper-local pilot network' : 'Reference observation layer'}</span>
              </div>
            </div>
            <span>{row.provider}</span>
            <span className="type-label">{row.type}</span>
            <span><span className={`status-pill ${row.status}`}><span className="status-dot" />{row.status}</span></span>
            <span>{row.lastUpdated}</span>
            <span>{row.coverage}</span>
          </div>
        ))}
      </section>
      <section className="iot-banner">
        <div className="iot-icon"><Signal size={24} /></div>
        <div>
          <span className="eyebrow light">DESIGNED FOR IMPERFECT COVERAGE</span>
          <h3>IoT is an accelerator, not a dependency.</h3>
          <p>Pralaydarshi continues to provide a useful risk estimate when local nodes are offline by exposing the data gap and relying on weather, river, terrain, satellite and historical layers.</p>
        </div>
        <Link className="button light-button" to="/explainability">See confidence logic <ChevronRight size={16} /></Link>
      </section>
      <section className="panel availability-panel">
        <div className="availability-heading"><div><span className="eyebrow">CRITICAL DATA RULE</span><h3>Unavailable does not mean safe.</h3></div><span className="status-pill unavailable">Explicit gap</span></div>
        <p>If a sensor or source is offline, Pralaydarshi excludes that input from the score, lowers confidence and displays the gap. It never fills missing observations with a zero-risk value.</p>
        <div className="availability-chips"><span className="status-pill online">Available · weather</span><span className="status-pill online">Available · river</span><span className="status-pill unavailable">Unavailable · Gopeshwar IoT</span></div>
      </section>
    </>
  )
}