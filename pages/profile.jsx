import { useNavigate } from 'react-router-dom'
import { useAuth } from '../src/AuthContext.jsx'

export default function Profile() {
  const { user, loading, logout } = useAuth()
  const navigate = useNavigate()

  if (loading) {
    return (
      <section className="page">
        <h1>Profile</h1>
        <p>Loading your account…</p>
      </section>
    )
  }

  return (
    <section className="page">
      <div className="profile-hero">
        <div>
          <h1>Profile</h1>
          <p className="auth-note">Your dashboard for posts, account settings, and membership status.</p>
        </div>
        {user && (
          <button
            className="auth-button auth-button--secondary"
            onClick={() => {
              logout()
              navigate('/')
            }}
          >
            Sign out
          </button>
        )}
      </div>

      {user ? (
        <div className="profile-card">
          <div className="profile-card__avatar">{user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}</div>
          <div>
            <h2>{user.name || 'Math Portal User'}</h2>
            <p>{user.email}</p>
            <p className="profile-card__role">Role: {user.role}</p>
          </div>
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}

      <div className="profile-notifications">
        <h2>Notifications</h2>
        <p>No new notifications yet. This is where alerts and approvals will appear.</p>
      </div>
    </section>
  )
}
