import { useState } from 'react'
import { useSEO } from '../hooks/useSEO.js'

const SUBJECT_TYPES = [
  { value: 'doorway',  label: 'Doorway' },
  { value: 'ramp',     label: 'Ramp' },
  { value: 'step',     label: 'Step' },
  { value: 'bathroom', label: 'Bathroom' },
]

const PASS_COLORS = { yes: '#1B5E20', unclear: '#C08A1A', no: '#B71C1C' }
const PASS_LABELS = { yes: '✓ Should pass', unclear: '? Unclear from photo', no: '✕ Unlikely to pass' }

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result.split(',')[1])
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default function DoorwayCheck() {
  useSEO({
    title: 'AI Doorway & Ramp Accessibility Checker | FijiBoundless',
    description: 'Upload a photo of a doorway, ramp, step, or bathroom and get an instant AI estimate of wheelchair accessibility.',
  })

  const [subjectType, setSubjectType] = useState('doorway')
  const [file, setFile]               = useState(null)
  const [preview, setPreview]         = useState(null)
  const [loading, setLoading]         = useState(false)
  const [error, setError]             = useState(null)
  const [result, setResult]           = useState(null)

  function handleFile(e) {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setResult(null)
    setError(null)
  }

  async function submit(e) {
    e.preventDefault()
    if (!file) { setError('Choose a photo first.'); return }
    setLoading(true); setError(null); setResult(null)
    try {
      const imageBase64 = await fileToBase64(file)
      const res = await fetch('/api/tools/vision-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64, mediaType: file.type, subjectType }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Analysis failed')
      setResult(data.analysis)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={s.page}>
      <section style={s.hero}>
        <div style={s.heroInner}>
          <div style={s.eyebrow}>
            <span style={s.liveDot} />
            AI-powered · Instant estimate, not a certified survey
          </div>
          <h1 style={s.h1}>Doorway & Ramp Checker</h1>
          <p style={s.sub}>
            Upload a photo of a doorway, ramp, step, or bathroom and get an instant estimate of whether a
            wheelchair could pass — useful before you book, or to help verify a FijiBoundless listing.
          </p>
        </div>
      </section>

      <div style={s.container}>
        <form onSubmit={submit} style={s.form}>
          <div style={s.field}>
            <label style={s.label}>What are you photographing?</label>
            <select value={subjectType} onChange={e => setSubjectType(e.target.value)} style={s.select}>
              {SUBJECT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>

          <div style={s.field}>
            <label style={s.label}>Photo</label>
            <input type="file" accept="image/*" onChange={handleFile} style={s.fileInput} />
          </div>

          {preview && (
            <img src={preview} alt="Preview" style={s.preview} />
          )}

          <button type="submit" style={s.submitBtn} disabled={loading || !file}>
            {loading ? 'Analysing…' : 'Analyse photo →'}
          </button>
        </form>

        {error && <div style={s.error}>⚠ {error}</div>}

        {result && (
          <div style={s.result}>
            <h2 style={s.resultTitle}>Analysis</h2>

            <div className="grid-responsive-2col" style={s.passRow}>
              <div style={{ ...s.passCard, borderColor: PASS_COLORS[result.manual_wheelchair_passable] || '#D4C9B0' }}>
                <span style={s.passLabel}>Manual wheelchair</span>
                <span style={{ ...s.passValue, color: PASS_COLORS[result.manual_wheelchair_passable] || '#7A6E60' }}>
                  {PASS_LABELS[result.manual_wheelchair_passable] || 'Unknown'}
                </span>
              </div>
              <div style={{ ...s.passCard, borderColor: PASS_COLORS[result.power_wheelchair_passable] || '#D4C9B0' }}>
                <span style={s.passLabel}>Power wheelchair (70cm)</span>
                <span style={{ ...s.passValue, color: PASS_COLORS[result.power_wheelchair_passable] || '#7A6E60' }}>
                  {PASS_LABELS[result.power_wheelchair_passable] || 'Unknown'}
                </span>
              </div>
            </div>

            <div style={s.metaGrid}>
              {result.door_width_cm != null && (
                <div style={s.metaItem}><strong>Estimated door width:</strong> {result.door_width_cm} cm</div>
              )}
              {result.ramp_gradient_percent != null && (
                <div style={s.metaItem}><strong>Estimated ramp gradient:</strong> {result.ramp_gradient_percent}%</div>
              )}
              <div style={s.metaItem}><strong>Confidence:</strong> {result.confidence || 'unknown'}</div>
            </div>

            {result.concerns?.length > 0 && (
              <div style={s.concerns}>
                <h3 style={s.concernsTitle}>Key concerns</h3>
                <ul style={s.concernsList}>
                  {result.concerns.map((c, i) => <li key={i} style={s.concernItem}>{c}</li>)}
                </ul>
              </div>
            )}

            <p style={s.disclaimer}>
              This is an AI estimate from a single photo, not a certified accessibility survey. Always confirm
              critical details directly with the venue before travelling.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

const s = {
  page: {},
  hero: {
    background: 'linear-gradient(135deg, #0D2B3E 0%, #0A3D50 60%, #0D4A3A 100%)',
    padding: '64px 24px 56px',
  },
  heroInner: { maxWidth: 700, margin: '0 auto' },
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
    fontSize: 'clamp(2rem, 4.5vw, 2.8rem)', fontWeight: 900,
    color: '#FDFAF5', marginBottom: 14,
  },
  sub: { color: 'rgba(253,250,245,0.75)', fontSize: '1.02rem', lineHeight: 1.7, maxWidth: 600 },

  container: { maxWidth: 700, margin: '0 auto', padding: '40px 24px 80px' },
  form: {
    background: '#F5EDD6', border: '1px solid #D4C9B0', borderRadius: 14,
    padding: '28px 26px', display: 'flex', flexDirection: 'column', gap: 18,
  },
  field: { display: 'flex', flexDirection: 'column', gap: 8 },
  label: {
    fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em',
    textTransform: 'uppercase', color: '#4A3F2F',
  },
  select: {
    padding: '10px 12px', background: '#FDFAF5', border: '1px solid #D4C9B0',
    borderRadius: 7, fontSize: '0.9rem', color: '#1A1208',
  },
  fileInput: { fontSize: '0.88rem', color: '#4A3F2F' },
  preview: { maxWidth: '100%', maxHeight: 300, borderRadius: 10, objectFit: 'contain' },
  submitBtn: {
    padding: '13px 24px', background: '#E8634A', color: '#FDFAF5',
    border: 'none', borderRadius: 8, fontSize: '0.95rem', fontWeight: 700,
  },

  error: {
    marginTop: 20, background: '#FFF3E0', border: '1px solid #FFB300',
    borderRadius: 8, padding: '14px 18px', color: '#E65100',
  },

  result: {
    marginTop: 32, background: '#FDFAF5', border: '1px solid #D4C9B0',
    borderRadius: 12, padding: '24px 26px',
  },
  resultTitle: { fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', color: '#0D2B3E', marginBottom: 20 },
  passRow: { marginBottom: 20 },
  passCard: {
    border: '2px solid', borderRadius: 10, padding: '14px 16px',
    display: 'flex', flexDirection: 'column', gap: 6,
  },
  passLabel: { fontSize: '0.78rem', color: '#7A6E60', fontWeight: 600 },
  passValue: { fontSize: '0.92rem', fontWeight: 700 },
  metaGrid: { display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16, fontSize: '0.88rem', color: '#1A1208' },
  metaItem: {},
  concerns: { marginBottom: 16 },
  concernsTitle: { fontFamily: "'Playfair Display', serif", fontSize: '1rem', color: '#0D2B3E', marginBottom: 8 },
  concernsList: { paddingLeft: 20 },
  concernItem: { fontSize: '0.88rem', color: '#4A3F2F', lineHeight: 1.6, marginBottom: 4 },
  disclaimer: { fontSize: '0.78rem', color: '#7A6E60', fontStyle: 'italic', borderTop: '1px solid #EDE7D8', paddingTop: 14 },
}
