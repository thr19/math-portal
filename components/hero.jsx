import { useState } from 'react'

const TOPICS = ['All Topics', 'Analysis', 'Algebra', 'Topology', 'Number Theory', 'Logic']

export default function Hero() {
  const [active, setActive] = useState('All Topics')

  return (
    <section className="hero">
      <div className="hero__grid-bg" aria-hidden="true" />
      <div className="hero__content">
        <div className="hero__tag">// mathematics portal</div>
        <h1 className="hero__title">
          OVI Math<br />
          <em>Portal.</em>
        </h1>
        <p className="hero__sub">Learn &nbsp;·&nbsp; Explore &nbsp;·&nbsp; Discuss</p>
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