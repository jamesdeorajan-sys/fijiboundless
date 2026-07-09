import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={s.footer}>
      <div style={s.inner}>
        <div style={s.brand}>
          <span style={s.logoMark}>◈</span>
          <span style={s.logoText}>FijiBoundless</span>
          <p style={s.tagline}>Verified accessibility data for every traveller in Fiji.</p>
        </div>

        <div style={s.cols}>
          <div>
            <p style={s.colHead}>Explore</p>
            <Link to="/search" style={s.footLink}>All Facilities</Link>
            <Link to="/search?category=hotel" style={s.footLink}>Accessible Hotels</Link>
            <Link to="/search?category=toilet" style={s.footLink}>Accessible Toilets</Link>
            <Link to="/search?category=beach" style={s.footLink}>Beaches</Link>
          </div>
          <div>
            <p style={s.colHead}>Regions</p>
            <Link to="/search?division=Western" style={s.footLink}>Western (Nadi)</Link>
            <Link to="/search?division=Central" style={s.footLink}>Central (Suva)</Link>
            <Link to="/search?division=Northern" style={s.footLink}>Northern (Vanua Levu)</Link>
            <Link to="/search?division=Eastern" style={s.footLink}>Eastern Islands</Link>
          </div>
          <div>
            <p style={s.colHead}>Community</p>
            <a href="mailto:verify@fijiboundless.com" style={s.footLink}>Submit a Verification</a>
            <a href="mailto:alert@fijiboundless.com" style={s.footLink}>Report an Issue</a>
            <a href="mailto:hello@fijiboundless.com" style={s.footLink}>Contact Us</a>
          </div>
        </div>
      </div>

      <div style={s.bottom}>
        <p style={s.copy}>© {new Date().getFullYear()} FijiBoundless. Data verified by real humans on the ground.</p>
        <div style={s.liveRow}>
          <span style={s.liveDot} />
          <span style={s.liveText}>Live accessibility data</span>
        </div>
      </div>
    </footer>
  )
}

const s = {
  footer: {
    background: '#0D2B3E',
    color: 'rgba(253,250,245,0.7)',
    marginTop: 80,
  },
  inner: {
    maxWidth: 1200, margin: '0 auto',
    padding: '56px 24px 40px',
    display: 'flex', gap: 64, flexWrap: 'wrap',
  },
  brand: { flex: '0 0 220px' },
  logoMark: { color: '#A8D5BA', fontSize: '1.4rem', marginRight: 8 },
  logoText: {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 700, fontSize: '1.1rem', color: '#FDFAF5',
  },
  tagline: { marginTop: 12, fontSize: '0.82rem', lineHeight: 1.6, color: 'rgba(253,250,245,0.55)' },
  cols: { flex: 1, display: 'flex', gap: 48, flexWrap: 'wrap' },
  colHead: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '0.78rem', fontWeight: 700,
    letterSpacing: '0.1em', textTransform: 'uppercase',
    color: '#A8D5BA', marginBottom: 14,
  },
  footLink: {
    display: 'block', fontSize: '0.85rem',
    color: 'rgba(253,250,245,0.6)',
    marginBottom: 8,
    transition: 'color 200ms',
  },
  bottom: {
    maxWidth: 1200, margin: '0 auto',
    padding: '20px 24px',
    borderTop: '1px solid rgba(168,213,186,0.12)',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    flexWrap: 'wrap', gap: 12,
  },
  copy: { fontSize: '0.78rem', color: 'rgba(253,250,245,0.35)' },
  liveRow: { display: 'flex', alignItems: 'center', gap: 6 },
  liveDot: {
    width: 7, height: 7, borderRadius: '50%',
    background: '#A8D5BA',
    animation: 'pulse 2s ease-in-out infinite',
  },
  liveText: { fontSize: '0.75rem', color: 'rgba(168,213,186,0.7)' },
}
