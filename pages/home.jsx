const BOOKS = [
  {
    title: 'Principles of Mathematical Analysis',
    author: 'Rudin, W.',
    tag: 'Analysis',
    color: '#c8440a',
  },
  {
    title: 'Abstract Algebra',
    author: 'Dummit & Foote',
    tag: 'Algebra',
    color: '#1a6b3c',
  },
  {
    title: 'Topology',
    author: 'Munkres, J.',
    tag: 'Topology',
    color: '#2a4a8c',
  },
  {
    title: 'An Introduction to the Theory of Numbers',
    author: 'Hardy & Wright',
    tag: 'Number Theory',
    color: '#7a4012',
  },
]

const ARTICLES = [
  { title: 'The Riemann Hypothesis: A Modern Overview', tag: 'Analysis', tagClass: 'tag--analysis', date: 'Jun 01' },
  { title: "Brouwer's Fixed Point Theorem via Homology", tag: 'Topology', tagClass: 'tag--topology', date: 'May 28' },
  { title: 'Visualizing p-adic Numbers', tag: 'Number Theory', tagClass: 'tag--number', date: 'May 22' },
  { title: "Gödel's Incompleteness Theorems Explained", tag: 'Logic', tagClass: 'tag--logic', date: 'May 17' },
]

const WIKI_TOPICS = [
  { label: 'Continuity', color: '#c8440a' },
  { label: 'Compactness', color: '#2a4a8c' },
  { label: 'Groups', color: '#1a6b3c' },
  { label: 'Primes', color: '#7a4012' },
  { label: 'Manifolds', color: '#5a2a8c' },
  { label: 'Integration', color: '#c8440a' },
  { label: 'Metric Spaces', color: '#2a4a8c' },
  { label: 'Rings & Fields', color: '#1a6b3c' },
]

export default function Home() {
  return (
    <main className="container">

      {/* Featured Books */}
      <section className="section">
        <div className="section-head">
          <h2>Featured Books</h2>
          <a href="/books" className="section-head__link">View library →</a>
        </div>
        <div className="books-grid">
          {BOOKS.map((book) => (
            <div className="book-card" key={book.title}>
              <div className="book-card__spine" style={{ background: book.color }} />
              <div className="book-card__title">{book.title}</div>
              <div className="book-card__author">{book.author}</div>
              <span className="book-card__tag">{book.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Problem of the Week */}
      <section className="section">
        <div className="section-head">
          <h2>Problem of the Week</h2>
        </div>
        <div className="potw">
          <div className="potw__label">Week 23 — 2026</div>
          <p className="potw__question">
            Let f : ℝ → ℝ be a continuous function such that f(f(x)) = x for all x ∈ ℝ.
            Must f have a fixed point?
          </p>
          <div className="potw__meta">
            Difficulty: ★★★☆☆ &nbsp;·&nbsp; Topic: Real Analysis &nbsp;·&nbsp; 14 solutions submitted
          </div>
          <a href="/forum/potw" className="potw__btn">Submit Solution ↗</a>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="section">
        <div className="section-head">
          <h2>Latest Articles</h2>
          <a href="/blog" className="section-head__link">All articles →</a>
        </div>
        <ul className="articles-list">
          {ARTICLES.map((a, i) => (
            <li className="article-row" key={a.title}>
              <span className="article-row__num">0{i + 1}</span>
              <span className="article-row__title">{a.title}</span>
              <span className={`article-row__tag ${a.tagClass}`}>{a.tag}</span>
              <span className="article-row__date">{a.date}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Popular Wiki Topics */}
      <section className="section">
        <div className="section-head">
          <h2>Popular Wiki Topics</h2>
          <a href="/wiki" className="section-head__link">Browse wiki →</a>
        </div>
        <div className="wiki-grid">
          {WIKI_TOPICS.map((t) => (
            <a href={`/wiki/${t.label.toLowerCase()}`} className="wiki-chip" key={t.label}>
              <div className="wiki-chip__dot" style={{ background: t.color }} />
              {t.label}
            </a>
          ))}
        </div>
      </section>

    </main>
  )
}