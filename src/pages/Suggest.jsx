import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSEO } from '../hooks/useSEO.js'

const CATEGORIES = [
  { value: '',            label: 'Not sure / other' },
  { value: 'toilet',      label: 'Accessible toilet' },
  { value: 'hotel',       label: 'Hotel / resort' },
  { value: 'restaurant',  label: 'Restaurant' },
  { value: 'beach',       label: 'Beach' },
  { value: 'transport',   label: 'Transport' },
  { value: 'attraction',  label: 'Attraction' },
  { value: 'village',     label: 'Village stay' },
  { value: 'ferry',       label: 'Ferry / marina' },
]

const EMPTY = { placeName: '', address: '', category: '', accessibilityNotes: '', submitterEmail: '' }

export default function Suggest() {
  useSEO({
    title: 'Suggest a Place | FijiBoundless',
    description: 'Know an accessible place in Fiji we should verify? Suggest it to FijiBoundless.',
  })

  const [form, setForm]     = useState(EMPTY)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  async function submit(e) {
    e.preventDefault()
    setLoading(true); setStatus(null)
    try {
      const res = await fetch('/api/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to submit suggestion')
      setStatus({ ok: true, message: 'Thanks — we\'ve logged your suggestion and will look into verifying it.' })
      setForm(EMPTY)
    } catch (e) {
      setStatus({ ok: false, message: e.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={s.page}>
      <section style={s.hero}>
        <div style={s.heroInner}>
          <h1 style={s.h1}>Suggest a place</h1>
          <p style={s.sub}>
            Know an accessible hotel, restaurant, beach, or facility in Fiji that isn't in our database yet?
            Tell us about it and we'll work on getting it verified.
          </p>
        </div>
      </section>

      <div style={s.container}>
        <form onSubmit={submit} style={s.form}>
          <div style={s.field}>
            <label style={s.label}>Place name</label>
            <input
              style={s.input} value={form.placeName}
              onChange={e => set('placeName', e.target.value)} required
            />
          </div>

          <div className="grid-responsive-2col">
            <div style={s.field}>
              <label style={s.label}>Address (optional)</label>
              <input style={s.input} value={form.address} onChange={e => set('address', e.target.value)} />
            </div>
            <div style={s.field}>
              <label style={s.label}>Type</label>
              <select style={s.input} value={form.category} onChange={e => set('category', e.target.value)}>
                {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
          </div>

          <div style={s.field}>
            <label style={s.label}>What accessibility features do you know about?</label>
            <textarea
              style={s.textarea} rows={4} value={form.accessibilityNotes}
              onChange={e => set('accessibilityNotes', e.target.value)}
              placeholder="E.g. step-free entrance, accessible toilet, pool hoist, quiet dining area…"
            />
          </div>

          <div style={s.field}>
            <label style={s.label}>Your email (optional, in case we have questions)</label>
            <input
              type="email" style={s.input} value={form.submitterEmail}
              onChange={e => set('submitterEmail', e.target.value)}
            />
          </div>

          <button type="submit" style={s.submitBtn} disabled={loading}>
            {loading ? 'Submitting…' : 'Submit suggestion →'}
          </button>

          {status && (
            <div style={status.ok ? s.success : s.error}>
              {status.ok ? '✓' : '⚠'} {status.message}
            </div>
          )}
        </form>

        <p style={s.backLink}><Link to="/search">← Back to search</Link></p>
      </div>
    </div>
  )
}

const s = {
  page: {},
  hero: {
    background: 'linear-gradient(135deg, #0D2B3E 0%, #0A3D50 60%, #0D4A3A 100%)',
    padding: '56px 24px 48px',
  },
  heroInner: { maxWidth: 640, margin: '0 auto' },
  h1: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 900,
    color: '#FDFAF5', marginBottom: 12,
  },
  sub: { color: 'rgba(253,250,245,0.75)', fontSize: '0.98rem', lineHeight: 1.7 },

  container: { maxWidth: 640, margin: '0 auto', padding: '40px 24px 80px' },
  form: {
    background: '#F5EDD6', border: '1px solid #D4C9B0', borderRadius: 14,
    padding: '28px 26px', display: 'flex', flexDirection: 'column', gap: 18,
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
  submitBtn: {
    padding: '13px 24px', background: '#E8634A', color: '#FDFAF5',
    border: 'none', borderRadius: 8, fontSize: '0.95rem', fontWeight: 700,
  },
  success: { fontSize: '0.88rem', color: '#1B5E20', fontWeight: 600 },
  error: { fontSize: '0.88rem', color: '#B71C1C', fontWeight: 600 },
  backLink: { marginTop: 20, fontSize: '0.85rem', color: '#E8634A', fontWeight: 600 },
}
