import { useState, useEffect, useMemo } from 'react'
import { useSEO } from '../hooks/useSEO.js'

const NEEDS = [
  {
    key: 'power_wheelchair', label: 'Power wheelchair',
    check: f => f.step_free_entry == null ? 'unconfirmed'
      : !f.step_free_entry ? 'unmet'
      : f.door_width_cm == null ? 'unconfirmed'
      : f.door_width_cm >= 75 ? 'met' : 'unmet',
  },
  {
    key: 'manual_wheelchair', label: 'Manual wheelchair',
    check: f => f.step_free_entry == null ? 'unconfirmed'
      : !f.step_free_entry ? 'unmet'
      : f.door_width_cm == null ? 'unconfirmed'
      : f.door_width_cm >= 70 ? 'met' : 'unmet',
  },
  {
    key: 'walking_frame', label: 'Walking frame',
    check: f => f.step_free_entry == null ? 'unconfirmed' : f.step_free_entry ? 'met' : 'unmet',
  },
  {
    key: 'hoisting_required', label: 'Hoisting required',
    check: f => (f.hoisting_equipment == null && f.pool_hoist == null) ? 'unconfirmed'
      : (f.hoisting_equipment || f.pool_hoist) ? 'met' : 'unmet',
  },
  {
    key: 'sensory_sensitivities', label: 'Sensory sensitivities',
    check: f => (f.sensory_friendly_rating == null && f.noise_level_rating == null) ? 'unconfirmed'
      : (f.sensory_friendly_rating >= 4 || (f.noise_level_rating != null && f.noise_level_rating <= 2)) ? 'met' : 'unmet',
  },
  {
    key: 'hearing_impairment', label: 'Hearing impairment',
    check: f => f.hearing_loop == null ? 'unconfirmed' : f.hearing_loop ? 'met' : 'unmet',
  },
  {
    key: 'vision_impairment', label: 'Vision impairment',
    check: f => f.braille_signage == null ? 'unconfirmed' : f.braille_signage ? 'met' : 'unmet',
  },
  {
    key: 'carer', label: 'Travelling with carer',
    sublabel: 'checks vehicle transfer assistance',
    check: f => f.accessible_vehicle_transfer == null ? 'unconfirmed' : f.accessible_vehicle_transfer ? 'met' : 'unmet',
  },
]

const STATUS_ICON  = { met: '✓', unconfirmed: '?', unmet: '✕' }
const STATUS_COLOR = { met: '#1B5E20', unconfirmed: '#C08A1A', unmet: '#B71C1C' }
const STATUS_LABEL = { met: 'Met', unconfirmed: 'Unconfirmed', unmet: 'Not met' }

export default function ScoreCalculator() {
  useSEO({
    title: 'Accessibility Compatibility Score Calculator | FijiBoundless',
    description: 'Select your accessibility needs and a Fiji facility to get a personalised compatibility score based on verified accessibility data.',
  })

  const [needs, setNeeds]           = useState({})
  const [facilities, setFacilities] = useState([])
  const [facilityId, setFacilityId] = useState('')
  const [loading, setLoading]       = useState(true)

  useEffect(() => {
    fetch('/api/facilities?limit=200')
      .then(r => r.json())
      .then(d => setFacilities(d.facilities || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const facility = facilities.find(f => String(f.id) === String(facilityId))
  const selectedNeeds = NEEDS.filter(n => needs[n.key])

  const result = useMemo(() => {
    if (!facility || selectedNeeds.length === 0) return null
    const rows = selectedNeeds.map(n => ({ ...n, status: n.check(facility) }))
    const points = rows.reduce((sum, r) => sum + (r.status === 'met' ? 1 : r.status === 'unconfirmed' ? 0.5 : 0), 0)
    const score = Math.round((points / rows.length) * 100)
    return { rows, score }
  }, [facility, selectedNeeds])

  const scoreColor = result == null ? '#7A6E60' : result.score >= 75 ? '#1B5E20' : result.score >= 45 ? '#C08A1A' : '#B71C1C'

  return (
    <div style={s.page}>
      <section style={s.hero}>
        <div style={s.heroInner}>
          <div style={s.eyebrow}>
            <span style={s.liveDot} />
            Instant · No AI needed, pure logic against verified data
          </div>
          <h1 style={s.h1}>Accessibility Score Calculator</h1>
          <p style={s.sub}>
            Select your access needs and a facility to see a personalised compatibility score, with a
            clear breakdown of what's confirmed to work, what's unconfirmed, and what isn't a fit.
          </p>
        </div>
      </section>

      <div style={s.container}>
        <div style={s.panel}>
          <label style={s.label} htmlFor="sc-facility">Facility</label>
          <select
            id="sc-facility"
            value={facilityId} onChange={e => setFacilityId(e.target.value)}
            style={s.select} disabled={loading}
          >
            <option value="">{loading ? 'Loading facilities…' : 'Select a facility…'}</option>
            {facilities.map(f => (
              <option key={f.id} value={f.id}>{f.name} ({f.town_or_area}, {f.division})</option>
            ))}
          </select>

          <fieldset style={{ ...s.fieldset, marginTop: 20 }}>
            <legend style={s.label}>Your accessibility needs</legend>
            <div style={s.needsGrid}>
              {NEEDS.map(n => (
                <label key={n.key} style={s.needLabel}>
                  <input
                    type="checkbox"
                    checked={!!needs[n.key]}
                    onChange={e => setNeeds(v => ({ ...v, [n.key]: e.target.checked }))}
                  />
                  <span>
                    {n.label}
                    {n.sublabel && <span style={s.needSub}> ({n.sublabel})</span>}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        {facilityId && selectedNeeds.length === 0 && (
          <p style={s.hint}>Select at least one accessibility need to calculate a score.</p>
        )}

        {result && (
          <div style={s.result}>
            <div style={s.scoreRow}>
              <div style={{ ...s.scoreCircle, borderColor: scoreColor, color: scoreColor }}>
                {result.score}
              </div>
              <div>
                <h2 style={s.resultTitle}>Compatibility score</h2>
                <p style={s.resultSub}>for {facility.name}</p>
              </div>
            </div>

            <div style={s.breakdown}>
              {result.rows.map(r => (
                <div key={r.key} style={s.breakdownRow}>
                  <span style={{ ...s.breakdownIcon, color: STATUS_COLOR[r.status] }}>{STATUS_ICON[r.status]}</span>
                  <span style={s.breakdownLabel}>{r.label}</span>
                  <span style={{ ...s.breakdownStatus, color: STATUS_COLOR[r.status] }}>{STATUS_LABEL[r.status]}</span>
                </div>
              ))}
            </div>

            <p style={s.disclaimer}>
              Scores are calculated from verified accessibility_features data — "unconfirmed" means this
              facility hasn't been assessed for that need yet, not that it fails it.
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
  panel: {
    background: '#F5EDD6', border: '1px solid #D4C9B0', borderRadius: 14, padding: '28px 26px',
  },
  label: {
    display: 'block', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em',
    textTransform: 'uppercase', color: '#4A3F2F', marginBottom: 8,
  },
  fieldset: { border: 'none', padding: 0, margin: 0 },
  select: {
    width: '100%', padding: '10px 12px', background: '#FDFAF5', border: '1px solid #D4C9B0',
    borderRadius: 7, fontSize: '0.9rem', color: '#1A1208',
  },
  needsGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '10px 14px',
  },
  needLabel: { display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.88rem', color: '#1A1208' },
  needSub: { fontSize: '0.75rem', color: '#7A6E60', fontStyle: 'italic' },

  hint: { marginTop: 16, fontSize: '0.85rem', color: '#7A6E60', fontStyle: 'italic' },

  result: {
    marginTop: 28, background: '#FDFAF5', border: '1px solid #D4C9B0', borderRadius: 12, padding: '26px',
  },
  scoreRow: { display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 },
  scoreCircle: {
    width: 76, height: 76, borderRadius: '50%', border: '4px solid',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '1.6rem', fontWeight: 900, flexShrink: 0,
  },
  resultTitle: { fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', color: '#0D2B3E' },
  resultSub: { fontSize: '0.88rem', color: '#7A6E60', marginTop: 4 },

  breakdown: { display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 },
  breakdownRow: {
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '10px 14px', background: '#F5EDD6', borderRadius: 8, fontSize: '0.88rem',
  },
  breakdownIcon: { fontWeight: 900, width: 18, textAlign: 'center', flexShrink: 0 },
  breakdownLabel: { flex: 1, color: '#1A1208' },
  breakdownStatus: { fontWeight: 700, fontSize: '0.8rem' },

  disclaimer: { fontSize: '0.78rem', color: '#7A6E60', fontStyle: 'italic', borderTop: '1px solid #EDE7D8', paddingTop: 14 },
}
