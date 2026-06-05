import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../src/AuthContext.jsx'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar__logo">
        <a href="/">OVI<span>·</span>MATH</a>
      </div>

      <button
        className="navbar__toggle"
        aria-controls="primary-navigation"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
      >
        <span className="sr-only">Menu</span>
        <span aria-hidden="true">☰</span>
      </button>

      <ul id="primary-navigation" className={`navbar__links ${open ? 'navbar__links--open' : ''}`}>
        <li><Link to="/books">Books</Link></li>
        <li><Link to="/wiki">Wiki</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/forum">Forum</Link></li>
        {user ? (
          <>
            <li className="navbar__user">
              <span className="navbar__user-icon" aria-hidden="true">
                {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
              </span>
              <span>{user.name || user.email}</span>
            </li>
            <li>
              <button className="navbar__logout" onClick={() => { logout(); navigate('/') }}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  )
}