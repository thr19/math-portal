import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../src/AuthContext.jsx'

export default function Signup() {
  const { user, signup, loading, error } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')
  const navigate = useNavigate()

  if (user) {
    return <Navigate to="/" replace />
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('')

    const result = await signup({ name, email, password })
    if (!result.success) {
      setStatus(error || 'Signup failed. Please try again.')
      return
    }

    setStatus('Signup successful. Redirecting…')
    navigate('/profile')
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Sign up</h1>
        <p className="auth-note">Create a new account to post, comment, and contribute.</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="auth-input"
            />
          </label>
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
            {loading ? 'Creating account…' : 'Sign up'}
          </button>
          {status && <p className="auth-error">{status}</p>}
          <p className="auth-note">
            Already have an account? <Link to="/login">Log in</Link>.
          </p>
        </form>
      </div>
    </main>
  )
}
