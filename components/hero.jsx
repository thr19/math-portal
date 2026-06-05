import { useState } from 'react'

const TOPICS = ['All Topics', 'Analysis', 'Algebra', 'Topology', 'Number Theory', 'Logic']

export default function Hero() {
  const [active, setActive] = useState('All Topics')

  return (
    <section className="hero">
      <div className="hero__grid-bg" aria-hidden="true" />
      <div className="hero__content">
        <div className="hero__tag">// mathematics portal</div>
        <h1 className="hero__title">OVI Math Portal</h1>
        <p className="hero__intro">A community-curated hub for learning and discussing mathematics.</p>
        <p className="hero__sub">Learn &nbsp;·&nbsp; Explore &nbsp;·&nbsp; Discuss</p>
        <a href="/books" className="hero__cta">Explore library →</a>
        <div className="hero__pills">
          {TOPICS.map((t) => (
            <button
              key={t}
              className={`pill${active === t ? ' pill--active' : ''}`}
              onClick={() => setActive(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}