import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

export default function Nav() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <header style={s.header}>
      <div style={s.inner}>
        <Link to="/" style={s.logo}>
          <span style={s.logoMark}>◈</span>
          <span style={s.logoText}>FijiBoundless</span>
        </Link>

        {/* Desktop nav */}
        <nav className="nav-links" style={s.nav} aria-label="Main navigation">
          <Link to="/search" style={{ ...s.link, ...(pathname === '/search' ? s.active : {}) }}>
            Find Facilities
          </Link>
          <Link to="/search?category=hotel" style={s.link}>Hotels</Link>
          <Link to="/search?category=toilet" style={s.link}>Accessible Toilets</Link>
          <Link to="/search?division=Northern" style={s.link}>Northern Fiji</Link>
          <Link to="/concierge" style={{ ...s.link, ...(pathname === '/concierge' ? s.active : {}) }}>
            AI Concierge
          </Link>
          <Link to="/guides" style={{ ...s.link, ...(pathname.startsWith('/guides') ? s.active : {}) }}>
            Guides
          </Link>
        </nav>

        <Link to="/search" className="nav-cta" style={s.cta}>Plan a Trip</Link>

        {/* Mobile toggle */}
        <button
          className="nav-burger"
          style={s.burger}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {open && (
        <nav style={s.mobileMenu} aria-label="Mobile navigation">
          {[
            ['Find Facilities', '/search'],
            ['Hotels', '/search?category=hotel'],
            ['Accessible Toilets', '/search?category=toilet'],
            ['Northern Fiji', '/search?division=Northern'],
            ['AI Concierge', '/concierge'],
            ['Guides', '/guides'],
          ].map(([label, href]) => (
            <Link key={href} to={href} style={s.mobileLink} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}

const s = {
  header: {
    position: 'sticky', top: 0, zIndex: 100,
    background: 'rgba(13,43,62,0.97)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(168,213,186,0.15)',
  },
  inner: {
    maxWidth: 1200, margin: '0 auto',
    padding: '0 24px',
    height: 64,
    display: 'flex', alignItems: 'center', gap: 32,
  },
  logo: {
    display: 'flex', alignItems: 'center', gap: 10,
    flexShrink: 0,
  },
  logoMark: { color: '#A8D5BA', fontSize: '1.3rem' },
  logoText: {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 700, fontSize: '1.15rem',
    color: '#FDFAF5', letterSpacing: '0.02em',
  },
  nav: { gap: 4, flex: 1 },
  link: {
    padding: '6px 14px',
    borderRadius: 6,
    fontSize: '0.88rem',
    fontWeight: 400,
    color: 'rgba(253,250,245,0.75)',
    transition: 'all 200ms',
    whiteSpace: 'nowrap',
  },
  active: { color: '#A8D5BA', background: 'rgba(168,213,186,0.1)' },
  cta: {
    marginLeft: 'auto',
    padding: '8px 20px',
    background: '#E8634A',
    color: '#FDFAF5',
    borderRadius: 6,
    fontSize: '0.88rem',
    fontWeight: 600,
    flexShrink: 0,
    transition: 'background 200ms',
  },
  burger: {
    background: 'none', border: 'none',
    color: '#FDFAF5', fontSize: '1.2rem',
    padding: '8px',
  },
  mobileMenu: {
    display: 'flex', flexDirection: 'column',
    padding: '12px 24px 16px',
    borderTop: '1px solid rgba(168,213,186,0.1)',
    gap: 4,
  },
  mobileLink: {
    padding: '10px 12px',
    color: 'rgba(253,250,245,0.85)',
    borderRadius: 6,
    fontSize: '0.95rem',
  },
}
