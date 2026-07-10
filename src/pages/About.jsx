import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSEO } from '../hooks/useSEO.js'

const VERIFICATION_METHODS = [
  { icon: '🧑‍💼', title: 'Staff audits', body: 'Our own team physically visits facilities and measures door widths, ramp gradients, and other details firsthand.' },
  { icon: '🤝', title: 'Community submissions', body: 'Travellers and locals submit verifications and updates directly on any facility page — the fastest way data changes.' },
  { icon: '🏨', title: 'Partner hotels', body: 'Resorts and operators confirm their own accessibility features directly, and can update them as renovations complete.' },
  { icon: '📷', title: 'AI vision tool', body: 'Our doorway and ramp checker gives an instant photo-based estimate — useful as a first pass, not a replacement for verification.' },
  { icon: '🗓️', title: 'Monthly automated re-check', body: 'A scheduled audit flags any facility not re-verified in 60+ days, and posts a public alert past 180 days.' },
]

const STATUS_SYSTEM = [
  { label: 'Verified', color: '#1B5E20', body: 'Confirmed accurate within the last verification cycle.' },
  { label: 'Needs update', color: '#C08A1A', body: 'Flagged for re-checking — usually because it\'s aged past our freshness window, or new information conflicts with what\'s on record.' },
  { label: 'Stale / overdue', color: '#B71C1C', body: 'Past 180 days without re-verification — treat as unconfirmed until updated.' },
]

export default function About() {
  useSEO({
    title: 'About FijiBoundless | Our Mission & Verification System',
    description: 'How FijiBoundless verifies accessibility data across Fiji — staff audits, community submissions, partner hotels, AI tools, and our data freshness promise.',
  })

  const [stats, setStats] = useState(null)

  useEffect(() => {
    fetch('/api/freshness-report').then(r => r.json()).then(setStats).catch(() => {})
  }, [])

  return (
    <div>
      {/* ── Hero: Mission ── */}
      <section style={s.hero}>
        <div style={s.heroInner}>
          <div style={s.eyebrow}>
            <span style={s.liveDot} />
            Our mission
          </div>
          <h1 style={s.h1}>Making every corner of Fiji knowable before you go.</h1>
          <p style={s.heroSub}>
            Accessibility information for travel is scattered, outdated, or simply guessed. FijiBoundless exists to
            replace guesswork with verified, facility-level detail — door widths, ramp gradients, sensory ratings, and
            honest notes on what's genuinely accessible, not just marketed as such — across every division of Fiji.
          </p>
        </div>
      </section>

      {/* ── How we verify data ── */}
      <section style={s.section}>
        <div style={s.container}>
          <h2 style={s.sectionTitle}>How we verify data</h2>
          <p style={s.sectionSub}>
            No single source is trusted alone — FijiBoundless combines five verification channels, and every facility
            page shows exactly which one produced its current status.
          </p>
          <div style={s.methodGrid}>
            {VERIFICATION_METHODS.map(m => (
              <div key={m.title} style={s.methodCard}>
                <span style={s.methodIcon}>{m.icon}</span>
                <h3 style={s.methodTitle}>{m.title}</h3>
                <p style={s.methodBody}>{m.body}</p>
              </div>
            ))}
          </div>

          <div style={s.statusBox}>
            <h3 style={s.statusBoxTitle}>What "verified", "needs update", and "stale" mean</h3>
            <div style={s.statusGrid}>
              {STATUS_SYSTEM.map(st => (
                <div key={st.label} style={s.statusRow}>
                  <span style={{ ...s.statusDot, background: st.color }} />
                  <div>
                    <strong style={{ color: st.color }}>{st.label}</strong>
                    <p style={s.statusBody}>{st.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Our coverage ── */}
      <section style={{ ...s.section, background: '#0D2B3E' }}>
        <div style={s.container}>
          <h2 style={{ ...s.sectionTitle, color: '#A8D5BA' }}>Our coverage</h2>
          <div style={s.statGrid}>
            <div style={s.statCard}>
              <span style={s.statN}>{stats ? stats.total_facilities : '…'}</span>
              <span style={s.statLabel}>Verified facilities</span>
            </div>
            <div style={s.statCard}>
              <span style={s.statN}>4</span>
              <span style={s.statLabel}>Divisions covered</span>
            </div>
            <div style={s.statCard}>
              <span style={s.statN}>30+</span>
              <span style={s.statLabel}>Data points per facility</span>
            </div>
            <div style={s.statCard}>
              <span style={s.statN}>{stats ? stats.verified_last_30_days + stats.verified_30_90_days : '…'}</span>
              <span style={s.statLabel}>Verified in last 90 days</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Data freshness promise ── */}
      <section style={s.section}>
        <div style={s.container}>
          <h2 style={s.sectionTitle}>Our data freshness promise</h2>
          <p style={s.sectionSub}>
            Accessibility features change — resorts renovate, ramps get built, roads wash out. We treat data age as
            part of the data itself, not an afterthought.
          </p>
          <div style={s.promiseGrid}>
            <div style={s.promiseCard}>
              <span style={s.promiseNum}>60 days</span>
              <p style={s.promiseBody}>A facility not re-verified in 60+ days is flagged internally and queued for our next monthly audit.</p>
            </div>
            <div style={s.promiseCard}>
              <span style={s.promiseNum}>180 days</span>
              <p style={s.promiseBody}>Past 180 days without re-verification, we post a public alert on the facility page — you'll always see it before you book.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Partner with us ── */}
      <section style={{ ...s.section, background: '#F5EDD6' }}>
        <div style={{ ...s.container, textAlign: 'center' }}>
          <h2 style={s.sectionTitle}>Partner with us</h2>
          <p style={{ ...s.sectionSub, margin: '0 auto 28px' }}>
            Run a resort, tour, or transport service in Fiji? Help us keep your accessibility data accurate — submit
            it directly, or get in touch about a fuller partnership.
          </p>
          <div style={s.ctaRow}>
            <Link to="/partner" style={s.primaryBtn}>Partner with us →</Link>
            <Link to="/suggest" style={s.secondaryBtn}>Suggest a place</Link>
          </div>
        </div>
      </section>

      {/* ── Accessibility statement ── */}
      <section style={s.section}>
        <div style={s.container}>
          <h2 style={s.sectionTitle}>Accessibility statement</h2>
          <p style={s.sectionSub}>
            This website is built to meet WCAG 2.1 Level AA. Specifically:
          </p>
          <ul style={s.statementList}>
            <li>Semantic HTML throughout — headings, landmarks, and lists convey structure to assistive technology, not just visual styling.</li>
            <li>A visible focus ring on every interactive element, so keyboard navigation is never ambiguous.</li>
            <li>ARIA labels on icon-only controls (menu toggles, dropdowns, form buttons) so screen readers announce their purpose.</li>
            <li>Colour contrast checked against WCAG AA thresholds for body text, links, and status badges.</li>
            <li>Responsive layouts that reflow rather than requiring horizontal scrolling at any zoom level or viewport width.</li>
          </ul>
          <p style={s.statementFooter}>
            Found an accessibility issue on this site itself? <a href="mailto:hello@fijiboundless.com" style={s.inlineLink}>Let us know</a> — we treat it with the same priority as facility data.
          </p>
        </div>
      </section>
    </div>
  )
}

const s = {
  hero: {
    background: 'linear-gradient(135deg, #0D2B3E 0%, #0A3D50 60%, #0D4A3A 100%)',
    padding: '72px 24px 64px',
  },
  heroInner: { maxWidth: 720, margin: '0 auto' },
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
    fontSize: 'clamp(1.9rem, 4.5vw, 2.8rem)', fontWeight: 900,
    color: '#FDFAF5', lineHeight: 1.2, marginBottom: 18,
  },
  heroSub: { color: 'rgba(253,250,245,0.75)', fontSize: '1.02rem', lineHeight: 1.75, maxWidth: 640 },

  section: { padding: '64px 24px' },
  container: { maxWidth: 1000, margin: '0 auto' },
  sectionTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#0D2B3E', marginBottom: 14,
  },
  sectionSub: { color: '#4A3F2F', fontSize: '0.98rem', lineHeight: 1.7, maxWidth: 640, marginBottom: 36 },

  methodGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20, marginBottom: 40,
  },
  methodCard: {
    background: '#F5EDD6', border: '1px solid #D4C9B0', borderRadius: 12, padding: '22px 20px',
  },
  methodIcon: { fontSize: '1.8rem', display: 'block', marginBottom: 12 },
  methodTitle: { fontFamily: "'Playfair Display', serif", fontSize: '1.02rem', color: '#0D2B3E', marginBottom: 8 },
  methodBody: { fontSize: '0.85rem', color: '#4A3F2F', lineHeight: 1.6 },

  statusBox: {
    background: '#FDFAF5', border: '1px solid #D4C9B0', borderRadius: 12, padding: '26px 24px',
  },
  statusBoxTitle: { fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', color: '#0D2B3E', marginBottom: 18 },
  statusGrid: { display: 'flex', flexDirection: 'column', gap: 16 },
  statusRow: { display: 'flex', gap: 12, alignItems: 'flex-start' },
  statusDot: { width: 10, height: 10, borderRadius: '50%', marginTop: 6, flexShrink: 0 },
  statusBody: { fontSize: '0.85rem', color: '#4A3F2F', lineHeight: 1.6, marginTop: 2 },

  statGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 20,
  },
  statCard: {
    background: 'rgba(168,213,186,0.08)', border: '1px solid rgba(168,213,186,0.2)',
    borderRadius: 12, padding: '24px 18px', textAlign: 'center',
  },
  statN: {
    display: 'block', fontFamily: "'Playfair Display', serif",
    fontSize: '2.2rem', fontWeight: 900, color: '#A8D5BA', marginBottom: 6,
  },
  statLabel: { fontSize: '0.82rem', color: 'rgba(253,250,245,0.65)' },

  promiseGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 },
  promiseCard: {
    background: '#F5EDD6', border: '1px solid #D4C9B0', borderRadius: 12, padding: '26px 24px',
  },
  promiseNum: {
    display: 'block', fontFamily: "'Playfair Display', serif",
    fontSize: '1.6rem', fontWeight: 900, color: '#E8634A', marginBottom: 10,
  },
  promiseBody: { fontSize: '0.9rem', color: '#4A3F2F', lineHeight: 1.65 },

  ctaRow: { display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' },
  primaryBtn: {
    padding: '13px 28px', background: '#E8634A', color: '#FDFAF5',
    borderRadius: 8, fontSize: '0.92rem', fontWeight: 700,
  },
  secondaryBtn: {
    padding: '13px 28px', background: '#FDFAF5', color: '#0D2B3E',
    border: '1px solid #D4C9B0', borderRadius: 8, fontSize: '0.92rem', fontWeight: 700,
  },

  statementList: { paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 },
  statementFooter: { fontSize: '0.88rem', color: '#7A6E60' },
  inlineLink: { color: '#E8634A', fontWeight: 600 },
}
