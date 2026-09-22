import { ArrowLeft, LockKeyhole, ShieldCheck, Waves } from 'lucide-react'
import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { BRAND_NAME } from '../lib/constants'
import './login.css'

const DEMO_CREDENTIALS = { username: 'situation-desk', password: 'demo' }

export function LoginPage() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [username, setUsername] = useState(DEMO_CREDENTIALS.username)
  const [password, setPassword] = useState(DEMO_CREDENTIALS.password)
  const [error, setError] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    if (username.trim().length === 0 || password.length === 0) {
      setError('Enter the demo credentials below to enter the prototype.')
      return
    }
    signIn()
    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="login-canvas">
      <a className="skip-link" href="#login-main">Skip to content</a>
      <header className="login-nav">
        <Link className="brand" to="/">
          <div className="brand-mark"><Waves size={21} /></div>
          <div>
            <strong className="brand-name">{BRAND_NAME}</strong>
            <span>EARLY WARNING INTELLIGENCE</span>
          </div>
        </Link>
        <Link className="login-back" to="/"><ArrowLeft size={15} /> Back to overview</Link>
      </header>

      <main className="login-body" id="login-main" tabIndex={-1}>
        <div className="login-card">
          <div className="login-icon"><LockKeyhole size={21} /></div>
          <span className="login-kicker">SITUATION DESK ACCESS</span>
          <h1>Sign in</h1>
          <p className="login-sub">Enter the command dashboard to review live risk intelligence across the monitored corridors.</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="login-username">Operator ID</label>
              <input
                id="login-username"
                name="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="situation-desk"
                aria-invalid={error ? true : undefined}
              />
            </div>
            <div className="field">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                aria-invalid={error ? true : undefined}
              />
            </div>
            {error && (
              <p className="login-error" role="alert">{error}</p>
            )}
            <button className="button primary login-submit" type="submit">Sign in to dashboard</button>
          </form>

          <div className="login-hint" role="note">
            <strong>Demo environment</strong>
            <span>Prototype credentials — no real accounts exist. Sign in as: <code>{DEMO_CREDENTIALS.username}</code> / <code>{DEMO_CREDENTIALS.password}</code></span>
          </div>
        </div>
      </main>

      <footer className="login-foot">
        <ShieldCheck size={14} /> Prototype decision support · final warnings remain with authorized authorities
      </footer>
    </div>
  )
}