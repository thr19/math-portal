export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        OVI<span>·</span>MATH
      </div>
      <ul className="navbar__links">
        <li><a href="/books">Books</a></li>
        <li><a href="/wiki">Wiki</a></li>
        <li><a href="/blog">Blog</a></li>
        <li><a href="/forum">Forum</a></li>
      </ul>
    </nav>
  )
}