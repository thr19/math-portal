import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../src/AuthContext.jsx'

export default function Login() {
  const { user, login, loading, error } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')

  if (user) {
    return <Navigate to="/" replace />
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('')

    const result = await login(email, password)
    if (!result.success) {
      setStatus(error || 'Login failed. Check your credentials.')
      return
    }

    setStatus('Logged in successfully.')
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Login</h1>
        <p className="auth-note">Use your account to access moderation and posting tools.</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="auth-input"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input"
            />
          </label>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
          {status && <p className="auth-error">{status}</p>}
        </form>
      </div>
    </main>
  )
}
