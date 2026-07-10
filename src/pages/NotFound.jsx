import { Link } from 'react-router-dom'
import { useSEO } from '../hooks/useSEO.js'

export default function NotFound() {
  useSEO({ title: 'Page Not Found | FijiBoundless' })

  return (
    <div style={s.page}>
      <div style={s.inner}>
        <span style={s.mark}>◈</span>
        <h1 style={s.h1}>Lost at sea?</h1>
        <p style={s.sub}>
          We couldn't find that page. It may have drifted, or the address might not be quite right.
        </p>
        <div style={s.actions}>
          <Link to="/" style={s.primaryBtn}>Back to home</Link>
          <Link to="/search" style={s.secondaryBtn}>Search facilities</Link>
        </div>
      </div>
    </div>
  )
}

const s = {
  page: {
    minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '80px 24px',
    background: 'linear-gradient(135deg, #0D2B3E 0%, #0A3D50 60%, #0D4A3A 100%)',
  },
  inner: { maxWidth: 480, textAlign: 'center' },
  mark: { display: 'block', fontSize: '2.6rem', color: '#A8D5BA', marginBottom: 20 },
  h1: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: 900,
    color: '#FDFAF5', marginBottom: 16,
  },
  sub: { color: 'rgba(253,250,245,0.75)', fontSize: '1.02rem', lineHeight: 1.7, marginBottom: 36 },
  actions: { display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' },
  primaryBtn: {
    padding: '13px 28px', background: '#E8634A', color: '#FDFAF5',
    borderRadius: 8, fontSize: '0.92rem', fontWeight: 700,
  },
  secondaryBtn: {
    padding: '13px 28px', background: 'rgba(168,213,186,0.1)', color: '#A8D5BA',
    border: '1px solid rgba(168,213,186,0.3)', borderRadius: 8, fontSize: '0.92rem', fontWeight: 700,
  },
}
