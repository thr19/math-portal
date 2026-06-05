import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)
const STORAGE_KEY = 'mathportal_token'

async function fetchCurrentUser(token) {
  const res = await fetch('/api/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch user')
  }
  const data = await res.json()
  return data.user
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEY))
  const [loading, setLoading] = useState(Boolean(token))
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!token) {
      setLoading(false)
      return
    }

    fetchCurrentUser(token)
      .then((userData) => {
        setUser(userData)
        setLoading(false)
      })
      .catch(() => {
        localStorage.removeItem(STORAGE_KEY)
        setToken(null)
        setUser(null)
        setLoading(false)
      })
  }, [token])

  const login = async (email, password) => {
    setError(null)
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      setError(body.error || 'Login failed')
      return { success: false }
    }

    const { token: authToken, user: userData } = await res.json()
    localStorage.setItem(STORAGE_KEY, authToken)
    setToken(authToken)
    setUser(userData)
    return { success: true }
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
    setToken(null)
    setError(null)
  }

  const value = useMemo(
    () => ({ user, loading, error, login, logout }),
    [user, loading, error]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
