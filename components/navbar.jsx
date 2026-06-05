import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

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
        <li><a href="/books">Books</a></li>
        <li><a href="/wiki">Wiki</a></li>
        <li><a href="/blog">Blog</a></li>
        <li><a href="/forum">Forum</a></li>
      </ul>
    </nav>
  )
}