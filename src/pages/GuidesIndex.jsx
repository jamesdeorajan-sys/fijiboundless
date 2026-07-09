import { Link } from 'react-router-dom'
import { GUIDES } from '../data/guides.js'
import { useSEO } from '../hooks/useSEO.js'

export default function GuidesIndex() {
  useSEO({
    title: 'Fiji Accessibility Guides | FijiBoundless',
    description: 'Practical, verified accessibility guides to Fiji — airports, ferries, resorts, beaches, and Northern Fiji, written from real facility-level data.',
  })

  return (
    <div>
      <section style={s.hero}>
        <div style={s.heroInner}>
          <div style={s.eyebrow}>
            <span style={s.liveDot} />
            Verified, facility-level detail — not generic advice
          </div>
          <h1 style={s.h1}>Fiji Accessibility Guides</h1>
          <p style={s.sub}>
            Practical guides built from FijiBoundless's own verified facility data — real door widths,
            tide-dependent ferry gangways, and honest notes on what's genuinely accessible, not just marketed as such.
          </p>
        </div>
      </section>

      <div style={s.container}>
        <div style={s.grid}>
          {GUIDES.map(g => (
            <Link key={g.slug} to={`/guides/${g.slug}`} style={s.card}>
              <h2 style={s.cardTitle}>{g.h1}</h2>
              <p style={s.cardDesc}>{g.description}</p>
              <span style={s.cardLink}>Read guide →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

const s = {
  hero: {
    background: 'linear-gradient(135deg, #0D2B3E 0%, #0A3D50 60%, #0D4A3A 100%)',
    padding: '64px 24px 56px',
  },
  heroInner: { maxWidth: 760, margin: '0 auto' },
  eyebrow: {
    display: 'flex', alignItems: 'center', gap: 8,
    color: '#A8D5BA', fontSize: '0.82rem', fontWeight: 600,
    letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 18,
  },
  liveDot: {
    display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
    background: '#A8D5BA', animation: 'pulse 2s ease-in-out infinite',
  },
  h1: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 900,
    color: '#FDFAF5', marginBottom: 14,
  },
  sub: { color: 'rgba(253,250,245,0.75)', fontSize: '1.02rem', lineHeight: 1.7, maxWidth: 620 },

  container: { maxWidth: 1100, margin: '0 auto', padding: '48px 24px 80px' },
  grid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20,
  },
  card: {
    display: 'flex', flexDirection: 'column', gap: 10,
    background: '#F5EDD6', border: '1px solid #D4C9B0', borderRadius: 12,
    padding: '22px 22px', color: 'inherit', textDecoration: 'none',
    transition: 'box-shadow 200ms, transform 200ms',
  },
  cardTitle: {
    fontFamily: "'Playfair Display', serif", fontSize: '1.1rem',
    color: '#0D2B3E', lineHeight: 1.3,
  },
  cardDesc: { fontSize: '0.85rem', color: '#4A3F2F', lineHeight: 1.6, flex: 1 },
  cardLink: { fontSize: '0.82rem', color: '#E8634A', fontWeight: 700 },
}
