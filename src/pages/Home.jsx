import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSEO } from '../hooks/useSEO.js'

const ORGANIZATION_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'FijiBoundless',
  url: 'https://fijiboundless.com',
  description: 'Verified accessibility guide to Fiji',
  areaServed: 'Fiji',
}

const CATEGORIES = [
  { value: 'toilet',     label: 'Accessible Toilets', icon: '🚻' },
  { value: 'hotel',      label: 'Hotels & Resorts',   icon: '🏨' },
  { value: 'beach',      label: 'Beaches',            icon: '🏖️' },
  { value: 'transport',  label: 'Transport',          icon: '🚐' },
  { value: 'village',    label: 'Village Stays',      icon: '🏘️' },
  { value: 'ferry',      label: 'Ferry Access',       icon: '⛵' },
]

const DIVISIONS = ['Western', 'Central', 'Northern', 'Eastern']

export default function Home() {
  const navigate = useNavigate()
  const [alerts, setAlerts]       = useState([])
  const [freshness, setFreshness] = useState(null)
  const [cat, setCat]             = useState('')
  const [div, setDiv]             = useState('')

  useSEO({ jsonLd: ORGANIZATION_JSON_LD })

  useEffect(() => {
    fetch('/api/alerts')
      .then(r => r.json())
      .then(d => setAlerts(d.active_alerts || []))
      .catch(() => {})
    fetch('/api/freshness-report')
      .then(r => r.json())
      .then(setFreshness)
      .catch(() => {})
  }, [])

  function handleSearch(e) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (cat) params.set('category', cat)
    if (div) params.set('division', div)
    navigate(`/search?${params.toString()}`)
  }

  return (
    <div>
      {/* ── Live alerts ticker ── */}
      {alerts.length > 0 && (
        <div style={s.ticker}>
          <span style={s.tickerLabel}>⚡ Live</span>
          <span>{alerts[0].facility_name}: {alerts[0].message}</span>
          {alerts.length > 1 && (
            <Link to="/search" style={s.tickerMore}>+{alerts.length - 1} more</Link>
          )}
        </div>
      )}

      {/* ── Hero ── */}
      <section style={s.hero}>
        <div className="home-hero-inner" style={s.heroInner}>
          <div style={s.heroText}>
            <div style={s.eyebrow}>
              <span style={s.liveDot} />
              Real-time accessibility data · Verified on the ground
            </div>
            <h1 style={s.heroTitle}>
              Every corner of Fiji,<br />
              <em style={s.heroEm}>open to everyone.</em>
            </h1>
            <p style={s.heroSub}>
              The only verified accessibility guide to Fiji — from Nadi's airport to Vanua Levu's
              rugged north. Sensory ratings, door widths, live alerts, and inclusive village stays.
            </p>

            {/* Search form */}
            <form onSubmit={handleSearch} style={s.searchForm}>
              <select
                value={cat}
                onChange={e => setCat(e.target.value)}
                style={s.select}
                aria-label="Facility type"
              >
                <option value="">All types</option>
                {CATEGORIES.map(c => (
                  <option key={c.value} value={c.value}>{c.icon} {c.label}</option>
                ))}
              </select>
              <select
                value={div}
                onChange={e => setDiv(e.target.value)}
                style={s.select}
                aria-label="Region"
              >
                <option value="">All regions</option>
                {DIVISIONS.map(d => (
                  <option key={d} value={d}>{d} Fiji</option>
                ))}
              </select>
              <button type="submit" style={s.searchBtn}>Search →</button>
            </form>
          </div>

          {/* Hero stat cards */}
          <div className="grid-responsive-2col" style={s.statGrid}>
            {[
              { n: '7+',   label: 'Islands covered' },
              { n: '30+',  label: 'Accessibility data points' },
              { n: '100%', label: 'Human-verified' },
              { n: 'Live', label: 'Alert system' },
            ].map(({ n, label }) => (
              <div key={label} style={s.statCard}>
                <span style={s.statN}>{n}</span>
                <span style={s.statLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Data health strip ── */}
      {freshness && freshness.total_facilities > 0 && (
        <DataHealthStrip freshness={freshness} />
      )}

      {/* ── Category quick links ── */}
      <section style={s.section}>
        <div style={s.container}>
          <h2 style={s.sectionTitle}>Find by type</h2>
          <div style={s.catGrid}>
            {CATEGORIES.map(c => (
              <Link
                key={c.value}
                to={`/search?category=${c.value}`}
                style={s.catCard}
              >
                <span style={s.catCardIcon}>{c.icon}</span>
                <span style={s.catCardLabel}>{c.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── What makes FijiBoundless different ── */}
      <section style={{ ...s.section, background: '#0D2B3E' }}>
        <div style={s.container}>
          <h2 style={{ ...s.sectionTitle, color: '#A8D5BA' }}>Why FijiBoundless</h2>
          <div style={s.featureGrid}>
            {[
              {
                icon: '📐',
                title: 'Real measurements',
                body: 'Door widths, ramp gradients, and turning circles — not just a tick-box.',
              },
              {
                icon: '🧠',
                title: 'Sensory & neurodiverse',
                body: 'Quiet-hour schedules, noise ratings, and social stories for every venue.',
              },
              {
                icon: '⚡',
                title: 'Live alerts',
                body: '"Ramp under repair at Port Denarau." Know before you go, not when you arrive.',
              },
              {
                icon: '🗺️',
                title: 'Northern Fiji',
                body: 'Vanua Levu and Taveuni coverage — including all-terrain wheelchair routes.',
              },
              {
                icon: '🏘️',
                title: 'Certified Villages',
                body: 'Authentic village stays fully assessed under the Tourism Bill 2026.',
              },
              {
                icon: '📍',
                title: 'Find nearest toilet',
                body: 'GPS-powered search finds the closest accessible toilet, right now.',
              },
            ].map(({ icon, title, body }) => (
              <div key={title} style={s.featureCard}>
                <span style={s.featureIcon}>{icon}</span>
                <h3 style={s.featureTitle}>{title}</h3>
                <p style={s.featureBody}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={s.ctaSection}>
        <div style={{ ...s.container, textAlign: 'center' }}>
          <h2 style={s.ctaTitle}>Ready to explore Fiji?</h2>
          <p style={s.ctaSub}>Search verified accessible facilities across all four divisions.</p>
          <Link to="/search" style={s.ctaBtn}>Find accessible places →</Link>
        </div>
      </section>
    </div>
  )
}

function DataHealthStrip({ freshness }) {
  const { total_facilities, verified_last_30_days, verified_30_90_days } = freshness
  const fresh = verified_last_30_days + verified_30_90_days
  const pct = Math.round((fresh / total_facilities) * 100)
  const color = pct >= 80 ? '#2D6A4F' : pct >= 50 ? '#C08A1A' : '#C0392B'

  return (
    <div style={s.healthStrip}>
      <div style={s.healthInner}>
        <span style={s.healthLabel}>
          Data health: <strong>{fresh} of {total_facilities}</strong> facilities verified in the last 90 days
        </span>
        <div style={s.healthBarTrack}>
          <div style={{ ...s.healthBarFill, width: `${pct}%`, background: color }} />
        </div>
        <span style={{ ...s.healthPct, color }}>{pct}%</span>
      </div>
    </div>
  )
}

const s = {
  ticker: {
    background: '#E8634A', color: '#FDFAF5',
    padding: '8px 24px', fontSize: '0.82rem',
    display: 'flex', alignItems: 'center', gap: 12,
  },
  tickerLabel: { fontWeight: 700, background: 'rgba(0,0,0,0.2)', borderRadius: 4, padding: '1px 7px' },
  tickerMore: { marginLeft: 'auto', color: '#FDFAF5', fontWeight: 600, textDecoration: 'underline' },

  healthStrip: { background: '#F5EDD6', borderBottom: '1px solid #D4C9B0', padding: '16px 24px' },
  healthInner: {
    maxWidth: 1200, margin: '0 auto',
    display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
  },
  healthLabel: { fontSize: '0.85rem', color: '#4A3F2F', flexShrink: 0 },
  healthBarTrack: {
    flex: 1, minWidth: 120, height: 8, borderRadius: 4,
    background: '#EDE7D8', overflow: 'hidden',
  },
  healthBarFill: { height: '100%', borderRadius: 4, transition: 'width 300ms ease' },
  healthPct: { fontSize: '0.85rem', fontWeight: 700, flexShrink: 0 },

  hero: {
    background: 'linear-gradient(135deg, #0D2B3E 0%, #0A3D50 60%, #0D4A3A 100%)',
    padding: '80px 24px 100px',
    position: 'relative', overflow: 'hidden',
  },
  heroInner: {
    maxWidth: 1200, margin: '0 auto',
  },
  heroText: {},
  eyebrow: {
    display: 'flex', alignItems: 'center', gap: 8,
    color: '#A8D5BA', fontSize: '0.82rem',
    fontWeight: 600, letterSpacing: '0.05em',
    textTransform: 'uppercase', marginBottom: 20,
  },
  liveDot: {
    display: 'inline-block',
    width: 8, height: 8, borderRadius: '50%',
    background: '#A8D5BA',
    animation: 'pulse 2s ease-in-out infinite',
  },
  heroTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
    fontWeight: 900, color: '#FDFAF5',
    lineHeight: 1.1, marginBottom: 20,
  },
  heroEm: { color: '#E8634A', fontStyle: 'italic' },
  heroSub: {
    color: 'rgba(253,250,245,0.72)',
    fontSize: '1.05rem', lineHeight: 1.7,
    maxWidth: 540, marginBottom: 36,
  },
  searchForm: { display: 'flex', gap: 10, flexWrap: 'wrap' },
  select: {
    padding: '11px 16px',
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(168,213,186,0.3)',
    borderRadius: 8, color: '#FDFAF5',
    fontSize: '0.9rem', minWidth: 160,
    cursor: 'pointer',
  },
  searchBtn: {
    padding: '11px 28px',
    background: '#E8634A', color: '#FDFAF5',
    border: 'none', borderRadius: 8,
    fontSize: '0.95rem', fontWeight: 700,
    transition: 'background 200ms',
  },
  statGrid: {},
  statCard: {
    background: 'rgba(168,213,186,0.08)',
    border: '1px solid rgba(168,213,186,0.2)',
    borderRadius: 12, padding: '20px 16px',
    display: 'flex', flexDirection: 'column', gap: 4,
  },
  statN: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '2rem', fontWeight: 900, color: '#A8D5BA',
  },
  statLabel: { fontSize: '0.78rem', color: 'rgba(253,250,245,0.6)' },

  section: { padding: '72px 24px' },
  container: { maxWidth: 1200, margin: '0 auto' },
  sectionTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
    color: '#0D2B3E', marginBottom: 36,
  },

  catGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap: 14,
  },
  catCard: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    gap: 10, padding: '24px 16px',
    background: '#F5EDD6',
    border: '1px solid #D4C9B0',
    borderRadius: 12,
    transition: 'box-shadow 200ms, transform 200ms',
    color: '#1A1208',
  },
  catCardIcon: { fontSize: '2rem' },
  catCardLabel: { fontSize: '0.85rem', fontWeight: 600, textAlign: 'center' },

  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: 20,
  },
  featureCard: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(168,213,186,0.15)',
    borderRadius: 12, padding: '24px 22px',
  },
  featureIcon: { fontSize: '1.8rem', display: 'block', marginBottom: 12 },
  featureTitle: {
    fontFamily: "'Playfair Display', serif",
    color: '#A8D5BA', fontSize: '1rem',
    marginBottom: 8,
  },
  featureBody: { color: 'rgba(253,250,245,0.6)', fontSize: '0.85rem', lineHeight: 1.7 },

  ctaSection: { background: '#F5EDD6', padding: '80px 24px' },
  ctaTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
    color: '#0D2B3E', marginBottom: 14,
  },
  ctaSub: { color: '#4A3F2F', fontSize: '1rem', marginBottom: 32 },
  ctaBtn: {
    display: 'inline-block',
    padding: '14px 36px',
    background: '#E8634A', color: '#FDFAF5',
    borderRadius: 8, fontSize: '1rem', fontWeight: 700,
    transition: 'background 200ms',
  },
}
