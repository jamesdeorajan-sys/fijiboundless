import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSEO } from '../hooks/useSEO.js'

const CARDS = [
  {
    icon: '📧',
    title: 'General enquiries',
    body: 'For general questions about the site or our data',
    action: { type: 'mailto', href: 'mailto:hello@fijiboundless.com', label: 'hello@fijiboundless.com' },
  },
  {
    icon: '🛡️',
    title: 'Verify or update a listing',
    body: "Found incorrect data? Help us keep Fiji's accessibility information accurate.",
    action: { type: 'link', href: '/suggest?type=verification', label: 'Submit a verification →' },
  },
  {
    icon: '💼',
    title: 'Partnership & business',
    body: 'For resort operators, travel agents, government agencies, and Tourism Fiji partnerships',
    action: { type: 'mailto', href: 'mailto:partners@fijiboundless.com', label: 'partners@fijiboundless.com' },
  },
  {
    icon: '📢',
    title: 'Media enquiries',
    body: 'Press, interviews, and accessibility advocacy stories',
    action: { type: 'mailto', href: 'mailto:media@fijiboundless.com', label: 'media@fijiboundless.com' },
  },
]

const EMPTY = { reporterName: '', placeName: '', whatsWrong: '', reporterEmail: '' }
const MAX_NOTES = 1000

export default function Contact() {
  useSEO({
    title: 'Contact Us | FijiBoundless',
    description: "Get in touch with FijiBoundless — general enquiries, listing verification, partnerships, and media contacts for Fiji's accessible travel platform.",
  })

  const [form, setForm]       = useState(EMPTY)
  const [loading, setLoading] = useState(false)
  const [status, setStatus]   = useState(null)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(hash.slice(1))
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [hash])

  async function submit(e) {
    e.preventDefault()
    setLoading(true); setStatus(null)
    try {
      const res = await fetch('/api/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          placeName: form.placeName,
          accessibilityNotes: `Reported by: ${form.reporterName || 'anonymous'}\n\n${form.whatsWrong}`,
          submitterEmail: form.reporterEmail || null,
          suggestionType: 'issue',
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to submit')
      setStatus({ ok: true, message: "Thank you — we'll review this within 48 hours" })
      setForm(EMPTY)
    } catch (e) {
      setStatus({ ok: false, message: 'Something went wrong — please email hello@fijiboundless.com directly' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <section style={s.hero}>
        <div style={s.heroInner}>
          <h1 style={s.h1}>Get in touch</h1>
          <p style={s.heroSub}>
            Whether you're a traveller, resort operator, government agency, or media organisation — we'd love to
            hear from you.
          </p>
        </div>
      </section>

      <section style={s.section}>
        <div style={s.container}>
          <div className="contact-cards-grid">
            {CARDS.map(card => (
              <div key={card.title} style={s.card}>
                <span style={s.cardIcon} aria-hidden="true">{card.icon}</span>
                <h2 style={s.cardTitle}>{card.title}</h2>
                <p style={s.cardBody}>{card.body}</p>
                {card.action.type === 'link' ? (
                  <Link to={card.action.href} style={s.cardLink}>{card.action.label}</Link>
                ) : (
                  <a href={card.action.href} style={s.cardLink}>{card.action.label}</a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="report" style={{ ...s.section, background: '#F5EDD6' }}>
        <div style={s.container}>
          <h2 style={s.sectionTitle}>Report an issue</h2>
          <p style={s.sectionSub}>
            Let us know if accessibility information is incorrect, outdated, or if a facility has a live issue that
            needs alerting.
          </p>

          <form onSubmit={submit} style={s.form}>
            <div style={s.field}>
              <label htmlFor="reporterName" style={s.label}>Your name (optional)</label>
              <input
                id="reporterName" style={s.input} value={form.reporterName}
                onChange={e => set('reporterName', e.target.value)}
              />
            </div>

            <div style={s.field}>
              <label htmlFor="placeName" style={s.label}>Facility name or URL</label>
              <input
                id="placeName" style={s.input} value={form.placeName}
                onChange={e => set('placeName', e.target.value)} required
              />
            </div>

            <div style={s.field}>
              <label htmlFor="whatsWrong" style={s.label}>What's wrong</label>
              <textarea
                id="whatsWrong" style={s.textarea} rows={4} maxLength={MAX_NOTES}
                value={form.whatsWrong} onChange={e => set('whatsWrong', e.target.value)}
                required
              />
              <span style={s.charCount}>{form.whatsWrong.length} / {MAX_NOTES}</span>
            </div>

            <div style={s.field}>
              <label htmlFor="reporterEmail" style={s.label}>Your contact email (optional)</label>
              <input
                id="reporterEmail" type="email" style={s.input} value={form.reporterEmail}
                onChange={e => set('reporterEmail', e.target.value)}
              />
            </div>

            <button type="submit" style={s.submitBtn} disabled={loading}>
              {loading ? 'Submitting…' : 'Report issue →'}
            </button>

            {status && (
              <div style={status.ok ? s.success : s.error}>{status.ok ? '✓' : '⚠'} {status.message}</div>
            )}
          </form>
        </div>
      </section>

      <section style={{ ...s.section, background: '#0D2B3E', textAlign: 'center' }}>
        <div style={s.container}>
          <p style={s.promise}>
            We aim to respond to all enquiries within 48 hours. For urgent accessibility issues at a listed
            facility, use the Report an Issue form above — these are reviewed daily.
          </p>
        </div>
      </section>
    </div>
  )
}

const s = {
  hero: {
    background: 'linear-gradient(135deg, #0D2B3E 0%, #0A3D50 60%, #0D4A3A 100%)',
    padding: '64px 24px 56px',
  },
  heroInner: { maxWidth: 700, margin: '0 auto' },
  h1: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(1.9rem, 4.5vw, 2.6rem)', fontWeight: 900,
    color: '#FDFAF5', marginBottom: 14,
  },
  heroSub: { color: 'rgba(253,250,245,0.75)', fontSize: '1.02rem', lineHeight: 1.7 },

  section: { padding: '56px 24px' },
  container: { maxWidth: 900, margin: '0 auto' },
  sectionTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', color: '#0D2B3E', marginBottom: 14,
  },
  sectionSub: { color: '#4A3F2F', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 24, maxWidth: 640 },

  card: {
    background: '#F5EDD6', border: '1px solid #D4C9B0', borderRadius: 14,
    padding: '24px 20px', textAlign: 'left',
  },
  cardIcon: { fontSize: '1.8rem', display: 'block', marginBottom: 12 },
  cardTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.05rem', color: '#0D2B3E', marginBottom: 8,
  },
  cardBody: { fontSize: '0.85rem', color: '#4A3F2F', lineHeight: 1.6, marginBottom: 16 },
  cardLink: { color: '#E8634A', fontSize: '0.85rem', fontWeight: 700 },

  form: {
    background: '#FDFAF5', border: '1px solid #D4C9B0', borderRadius: 14,
    padding: '28px 26px', display: 'flex', flexDirection: 'column', gap: 18,
    maxWidth: 640,
  },
  field: { display: 'flex', flexDirection: 'column', gap: 8 },
  label: {
    fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em',
    textTransform: 'uppercase', color: '#4A3F2F',
  },
  input: {
    padding: '10px 12px', background: '#FDFAF5', border: '1px solid #D4C9B0',
    borderRadius: 7, fontSize: '0.9rem', color: '#1A1208',
  },
  textarea: {
    padding: '10px 12px', background: '#FDFAF5', border: '1px solid #D4C9B0',
    borderRadius: 7, fontSize: '0.9rem', color: '#1A1208', fontFamily: 'inherit', resize: 'vertical',
  },
  charCount: { fontSize: '0.72rem', color: '#8C7355', alignSelf: 'flex-end' },
  submitBtn: {
    alignSelf: 'flex-start', padding: '13px 24px', background: '#E8634A', color: '#FDFAF5',
    border: 'none', borderRadius: 8, fontSize: '0.92rem', fontWeight: 700,
  },
  success: { fontSize: '0.88rem', color: '#1B5E20', fontWeight: 600 },
  error: { fontSize: '0.88rem', color: '#B71C1C', fontWeight: 600 },

  promise: { color: 'rgba(253,250,245,0.8)', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: 640, margin: '0 auto' },
}
