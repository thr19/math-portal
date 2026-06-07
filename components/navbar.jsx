import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../src/AuthContext.jsx'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user } = useAuth()

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
          <li>
            <Link to="/profile" className="navbar__icon-link" aria-label="Open profile dashboard">
              <span className="navbar__user-icon">
                {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
              </span>
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/login" className="navbar__icon-link" aria-label="Sign in">
              <span className="navbar__login-icon">↪</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}