import { useState } from 'react'
import FacilityCard from '../components/FacilityCard.jsx'

const WHEELCHAIR_TYPES = [
  { value: 'none',   label: 'No wheelchair' },
  { value: 'manual', label: 'Manual wheelchair' },
  { value: 'power',  label: 'Power wheelchair' },
  { value: 'scooter',label: 'Mobility scooter' },
]
const SENSITIVITIES = [
  { value: 'noise',          label: 'Loud noise' },
  { value: 'bright_light',   label: 'Bright / flashing light' },
  { value: 'crowds',         label: 'Crowds' },
  { value: 'strong_smells',  label: 'Strong smells' },
]
const DIVISIONS  = ['Western', 'Central', 'Northern', 'Eastern']
const CATEGORIES = [
  { value: 'hotel',      label: 'Hotels' },
  { value: 'restaurant', label: 'Restaurants' },
  { value: 'beach',      label: 'Beaches' },
  { value: 'attraction', label: 'Attractions' },
  { value: 'village',    label: 'Village stays' },
  { value: 'ferry',      label: 'Ferry & transfers' },
]

// Minimal Markdown-ish renderer for the AI response — headings, bold, and lists —
// so we don't need a Markdown dependency just for this one field.
function renderItinerary(text) {
  const lines = text.split('\n')
  const blocks = []
  let listBuf = []

  const flushList = () => {
    if (listBuf.length) {
      blocks.push(<ul key={blocks.length} style={s.list}>{listBuf.map((li, i) => <li key={i} style={s.listItem}>{inline(li)}</li>)}</ul>)
      listBuf = []
    }
  }
  const inline = (str) => str.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : <span key={i}>{part}</span>
  )

  lines.forEach((line, i) => {
    const trimmed = line.trim()
    if (trimmed.startsWith('## ')) {
      flushList()
      blocks.push(<h3 key={blocks.length} style={s.dayHeading}>{trimmed.slice(3)}</h3>)
    } else if (trimmed.startsWith('# ')) {
      flushList()
      blocks.push(<h2 key={blocks.length} style={s.mainHeading}>{trimmed.slice(2)}</h2>)
    } else if (/^[-*]\s+/.test(trimmed)) {
      listBuf.push(trimmed.replace(/^[-*]\s+/, ''))
    } else if (trimmed === '') {
      flushList()
    } else {
      flushList()
      blocks.push(<p key={blocks.length} style={s.para}>{inline(trimmed)}</p>)
    }
  })
  flushList()
  return blocks
}

export default function Concierge() {
  const [wheelchairType, setWheelchairType] = useState('none')
  const [hoistRequired, setHoistRequired]   = useState(false)
  const [sensitivities, setSensitivities]   = useState([])
  const [divisions, setDivisions]           = useState([])
  const [categories, setCategories]         = useState([])
  const [tripLengthDays, setTripLengthDays] = useState(5)
  const [notes, setNotes]                   = useState('')

  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)
  const [itinerary, setItinerary] = useState(null)
  const [anxietyGuide, setAnxietyGuide] = useState(null)
  const [showAnxietyGuide, setShowAnxietyGuide] = useState(false)
  const [facilities, setFacilities] = useState([])

  function toggle(list, setList, value) {
    setList(list.includes(value) ? list.filter(v => v !== value) : [...list, value])
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true); setError(null); setItinerary(null); setAnxietyGuide(null); setFacilities([])
    try {
      const res = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wheelchairType, hoistRequired, sensitivities, divisions, categories, tripLengthDays, notes }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to build itinerary')
      setItinerary(data.itinerary)
      setAnxietyGuide(data.anxietyGuide || null)
      setFacilities(data.facilities || [])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={s.page}>
      <section className="no-print" style={s.hero}>
        <div style={s.heroInner}>
          <div style={s.eyebrow}>
            <span style={s.liveDot} />
            AI-powered · Grounded in verified facilities only
          </div>
          <h1 style={s.heroTitle}>AI Concierge</h1>
          <p style={s.heroSub}>
            Tell us what access you need and we'll build a personalised, verified itinerary across Fiji —
            drawing only from facilities in our database, never guessed.
          </p>
        </div>
      </section>

      <div style={s.container}>
        <form onSubmit={handleSubmit} className="no-print" style={s.form}>
          <div className="grid-responsive-2col" style={s.formGrid}>
            <div style={s.field}>
              <label style={s.label}>Wheelchair type</label>
              <select value={wheelchairType} onChange={e => setWheelchairType(e.target.value)} style={s.select}>
                {WHEELCHAIR_TYPES.map(w => <option key={w.value} value={w.value}>{w.label}</option>)}
              </select>
            </div>

            <div style={s.field}>
              <label style={s.label}>Trip length (days)</label>
              <input
                type="number" min={1} max={21}
                value={tripLengthDays}
                onChange={e => setTripLengthDays(e.target.value)}
                style={s.select}
              />
            </div>

            <label style={s.checkboxRow}>
              <input type="checkbox" checked={hoistRequired} onChange={e => setHoistRequired(e.target.checked)} />
              Hoist required (pool / bathroom)
            </label>
          </div>

          <fieldset style={s.fieldset}>
            <legend style={s.label}>Sensory sensitivities</legend>
            <div style={s.chipRow}>
              {SENSITIVITIES.map(sn => (
                <button
                  type="button" key={sn.value}
                  onClick={() => toggle(sensitivities, setSensitivities, sn.value)}
                  aria-pressed={sensitivities.includes(sn.value)}
                  style={{ ...s.chip, ...(sensitivities.includes(sn.value) ? s.chipActive : {}) }}
                >
                  {sn.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset style={s.fieldset}>
            <legend style={s.label}>Preferred regions</legend>
            <div style={s.chipRow}>
              {DIVISIONS.map(d => (
                <button
                  type="button" key={d}
                  onClick={() => toggle(divisions, setDivisions, d)}
                  aria-pressed={divisions.includes(d)}
                  style={{ ...s.chip, ...(divisions.includes(d) ? s.chipActive : {}) }}
                >
                  {d} Fiji
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset style={s.fieldset}>
            <legend style={s.label}>Interested in</legend>
            <div style={s.chipRow}>
              {CATEGORIES.map(c => (
                <button
                  type="button" key={c.value}
                  onClick={() => toggle(categories, setCategories, c.value)}
                  aria-pressed={categories.includes(c.value)}
                  style={{ ...s.chip, ...(categories.includes(c.value) ? s.chipActive : {}) }}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </fieldset>

          <div style={s.field}>
            <label style={s.label}>Anything else we should know?</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="E.g. travelling with my mother who gets overwhelmed by loud environments and uses a manual wheelchair."
              rows={3}
              style={s.textarea}
            />
          </div>

          <button type="submit" style={s.submitBtn} disabled={loading}>
            {loading ? 'Building your itinerary…' : 'Build my itinerary →'}
          </button>
        </form>

        {error && <div className="no-print" style={s.error}>⚠ {error}</div>}

        {itinerary && (
          <div style={s.result}>
            <div style={s.resultHeader}>
              <h2 style={s.resultTitle}>Your personalised itinerary</h2>
              <button type="button" className="no-print" style={s.printBtn} onClick={() => window.print()}>
                🖨️ Print itinerary
              </button>
            </div>
            <div style={s.itineraryBody}>{renderItinerary(itinerary)}</div>

            {anxietyGuide && (
              <div style={s.anxietySection}>
                <button
                  type="button"
                  className="no-print"
                  style={s.anxietyToggle}
                  onClick={() => setShowAnxietyGuide(v => !v)}
                  aria-expanded={showAnxietyGuide}
                >
                  <span>🧠 Reduce travel anxiety — what to expect, step by step</span>
                  <span>{showAnxietyGuide ? '−' : '+'}</span>
                </button>
                {showAnxietyGuide && (
                  <div style={s.anxietyBody}>{renderItinerary(anxietyGuide)}</div>
                )}
              </div>
            )}

            {facilities.length > 0 && (
              <div className="no-print">
                <h3 style={s.resultSubtitle}>Facilities referenced</h3>
                <div style={s.grid}>
                  {facilities.map(f => <FacilityCard key={f.id} facility={f} />)}
                </div>
              </div>
            )}
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
  heroTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 900,
    color: '#FDFAF5', marginBottom: 14,
  },
  heroSub: { color: 'rgba(253,250,245,0.75)', fontSize: '1.02rem', lineHeight: 1.7, maxWidth: 560 },

  container: { maxWidth: 760, margin: '0 auto', padding: '40px 24px 80px' },
  form: {
    background: '#F5EDD6', border: '1px solid #D4C9B0', borderRadius: 14,
    padding: '28px 26px', display: 'flex', flexDirection: 'column', gap: 22,
  },
  formGrid: {
    alignItems: 'end',
  },
  field: { display: 'flex', flexDirection: 'column', gap: 8 },
  fieldset: { border: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 },
  label: {
    fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em',
    textTransform: 'uppercase', color: '#4A3F2F',
  },
  select: {
    padding: '10px 12px', background: '#FDFAF5', border: '1px solid #D4C9B0',
    borderRadius: 7, fontSize: '0.9rem', color: '#1A1208',
  },
  checkboxRow: {
    display: 'flex', alignItems: 'center', gap: 8,
    fontSize: '0.9rem', color: '#1A1208', gridColumn: '1 / -1',
  },
  chipRow: { display: 'flex', flexWrap: 'wrap', gap: 8 },
  chip: {
    padding: '7px 14px', borderRadius: 20, fontSize: '0.82rem',
    background: '#FDFAF5', border: '1px solid #D4C9B0', color: '#4A3F2F',
    transition: 'all 150ms',
  },
  chipActive: { background: '#0D2B3E', color: '#A8D5BA', borderColor: '#0D2B3E' },
  textarea: {
    padding: '10px 12px', background: '#FDFAF5', border: '1px solid #D4C9B0',
    borderRadius: 7, fontSize: '0.9rem', color: '#1A1208', fontFamily: 'inherit', resize: 'vertical',
  },
  submitBtn: {
    padding: '13px 24px', background: '#E8634A', color: '#FDFAF5',
    border: 'none', borderRadius: 8, fontSize: '0.95rem', fontWeight: 700,
  },

  error: {
    marginTop: 20, background: '#FFF3E0', border: '1px solid #FFB300',
    borderRadius: 8, padding: '14px 18px', color: '#E65100',
  },

  result: { marginTop: 36 },
  resultHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 16, flexWrap: 'wrap' },
  resultTitle: { fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: '#0D2B3E' },
  printBtn: {
    padding: '8px 16px', background: '#FDFAF5', border: '1px solid #D4C9B0',
    borderRadius: 7, fontSize: '0.82rem', fontWeight: 600, color: '#0D2B3E',
  },
  resultSubtitle: { fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', color: '#0D2B3E', margin: '28px 0 16px' },
  itineraryBody: {
    background: '#FDFAF5', border: '1px solid #D4C9B0', borderRadius: 12, padding: '24px 26px',
  },
  mainHeading: { fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', color: '#0D2B3E', margin: '4px 0 12px' },
  dayHeading: { fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: '#E8634A', margin: '18px 0 8px' },
  para: { fontSize: '0.92rem', color: '#1A1208', lineHeight: 1.7, marginBottom: 10 },
  list: { margin: '4px 0 10px 20px' },
  listItem: { fontSize: '0.92rem', color: '#1A1208', lineHeight: 1.7, marginBottom: 4 },

  grid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16,
  },

  anxietySection: { marginTop: 20 },
  anxietyToggle: {
    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '14px 20px', background: '#0D2B3E', color: '#A8D5BA',
    border: 'none', borderRadius: 10, fontSize: '0.92rem', fontWeight: 700, textAlign: 'left',
  },
  anxietyBody: {
    background: '#FDFAF5', border: '1px solid #D4C9B0', borderTop: 'none',
    borderRadius: '0 0 10px 10px', padding: '22px 26px', marginTop: -1,
  },
}
