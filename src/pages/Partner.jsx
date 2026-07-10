import { useState } from 'react'
import { useSEO } from '../hooks/useSEO.js'

const PROPERTY_TYPES = [
  { value: '',            label: 'Select type…' },
  { value: 'hotel',       label: 'Hotel / resort' },
  { value: 'restaurant',  label: 'Restaurant' },
  { value: 'beach',       label: 'Beach facility' },
  { value: 'transport',   label: 'Transport operator' },
  { value: 'attraction',  label: 'Attraction / tour' },
  { value: 'village',     label: 'Village stay' },
  { value: 'ferry',       label: 'Ferry / marina' },
]

const EMPTY = { propertyName: '', contactName: '', email: '', propertyType: '', description: '' }

export default function Partner() {
  useSEO({
    title: 'Partner With FijiBoundless',
    description: 'List your property, get API access for accessibility data, or partner with FijiBoundless as a disability organisation or media contact.',
  })

  const [form, setForm]       = useState(EMPTY)
  const [loading, setLoading] = useState(false)
  const [status, setStatus]   = useState(null)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  async function submit(e) {
    e.preventDefault()
    setLoading(true); setStatus(null)
    try {
      const res = await fetch('/api/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          placeName: form.propertyName,
          category: form.propertyType || null,
          accessibilityNotes: `Contact: ${form.contactName}\n\n${form.description}`,
          submitterEmail: form.email,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to submit')
      setStatus({ ok: true, message: "Thanks — we've received your property details and will be in touch about verification." })
      setForm(EMPTY)
    } catch (e) {
      setStatus({ ok: false, message: e.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <section style={s.hero}>
        <div style={s.heroInner}>
          <h1 style={s.h1}>Partner with FijiBoundless</h1>
          <p style={s.heroSub}>
            Whether you run a resort, work in travel, or advocate for disability access — here's how to work with us.
          </p>
        </div>
      </section>

      {/* ── List your property ── */}
      <section style={s.section}>
        <div style={s.container}>
          <h2 style={s.sectionTitle}>List your property</h2>
          <p style={s.sectionSub}>
            Tell us about your property's accessibility features and we'll follow up to get it verified and listed.
          </p>

          <form onSubmit={submit} style={s.form}>
            <div className="grid-responsive-2col">
              <div style={s.field}>
                <label style={s.label}>Property name</label>
                <input style={s.input} value={form.propertyName} onChange={e => set('propertyName', e.target.value)} required />
              </div>
              <div style={s.field}>
                <label style={s.label}>Property type</label>
                <select style={s.input} value={form.propertyType} onChange={e => set('propertyType', e.target.value)}>
                  {PROPERTY_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
              <div style={s.field}>
                <label style={s.label}>Contact name</label>
                <input style={s.input} value={form.contactName} onChange={e => set('contactName', e.target.value)} required />
              </div>
              <div style={s.field}>
                <label style={s.label}>Email</label>
                <input type="email" style={s.input} value={form.email} onChange={e => set('email', e.target.value)} required />
              </div>
            </div>

            <div style={s.field}>
              <label style={s.label}>Accessibility features (brief description)</label>
              <textarea
                style={s.textarea} rows={4} value={form.description}
                onChange={e => set('description', e.target.value)}
                placeholder="E.g. step-free entry, accessible rooms with roll-in showers, pool hoist, beach wheelchair…"
              />
            </div>

            <button type="submit" style={s.submitBtn} disabled={loading}>
              {loading ? 'Submitting…' : 'Submit property →'}
            </button>

            {status && (
              <div style={status.ok ? s.success : s.error}>{status.ok ? '✓' : '⚠'} {status.message}</div>
            )}
          </form>
        </div>
      </section>

      {/* ── For travel agents ── */}
      <section style={{ ...s.section, background: '#F5EDD6' }}>
        <div style={s.container}>
          <h2 style={s.sectionTitle}>For travel agents</h2>
          <p style={s.sectionSub}>
            Our facility accessibility data is available via a simple read-only API — useful for building accessible
            itineraries or checking a property before you recommend it to a client.
          </p>
          <pre style={s.codeBlock}>
{`GET https://fijiboundless.pages.dev/api/facilities?category=hotel&division=Western

{
  "count": 23,
  "facilities": [
    {
      "name": "Shangri-La Yanuca Island Fiji",
      "step_free_entry": 1,
      "beach_wheelchair_available": 1,
      "verification_status": "verified",
      ...
    }
  ]
}`}
          </pre>
          <p style={s.sectionSub}>
            The API is currently open and unauthenticated for read access. For higher-volume use or questions about
            data licensing, contact <a href="mailto:partners@fijiboundless.com" style={s.inlineLink}>partners@fijiboundless.com</a>.
          </p>
        </div>
      </section>

      {/* ── For disability organisations ── */}
      <section style={s.section}>
        <div style={s.container}>
          <h2 style={s.sectionTitle}>For disability organisations</h2>
          <p style={s.sectionSub}>
            If you represent a disability advocacy group or NGO working in Fiji, we'd like to partner with you on
            community verification — your members' on-the-ground experience is exactly the kind of detail our data is
            missing most. Get in touch at{' '}
            <a href="mailto:partners@fijiboundless.com" style={s.inlineLink}>partners@fijiboundless.com</a>, or have
            individual members submit verifications directly via any facility page.
          </p>
        </div>
      </section>

      {/* ── Media enquiries ── */}
      <section style={{ ...s.section, background: '#0D2B3E' }}>
        <div style={{ ...s.container, textAlign: 'center' }}>
          <h2 style={{ ...s.sectionTitle, color: '#A8D5BA' }}>Media enquiries</h2>
          <p style={{ ...s.sectionSub, color: 'rgba(253,250,245,0.7)', margin: '0 auto' }}>
            For press and media questions, contact{' '}
            <a href="mailto:media@fijiboundless.com" style={{ ...s.inlineLink, color: '#E8634A' }}>media@fijiboundless.com</a>.
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
  container: { maxWidth: 800, margin: '0 auto' },
  sectionTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', color: '#0D2B3E', marginBottom: 14,
  },
  sectionSub: { color: '#4A3F2F', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 24, maxWidth: 640 },

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
    alignSelf: 'flex-start', padding: '13px 24px', background: '#E8634A', color: '#FDFAF5',
    border: 'none', borderRadius: 8, fontSize: '0.92rem', fontWeight: 700,
  },
  success: { fontSize: '0.88rem', color: '#1B5E20', fontWeight: 600 },
  error: { fontSize: '0.88rem', color: '#B71C1C', fontWeight: 600 },

  codeBlock: {
    background: '#0D2B3E', color: '#A8D5BA', borderRadius: 10,
    padding: '20px 22px', fontSize: '0.8rem', lineHeight: 1.6,
    overflowX: 'auto', maxWidth: '100%', marginBottom: 24, fontFamily: 'ui-monospace, monospace',
  },
  inlineLink: { color: '#E8634A', fontWeight: 600 },
}
