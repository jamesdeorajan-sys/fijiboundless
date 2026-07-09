import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import VerifiedBadge from '../components/VerifiedBadge.jsx'

const FEATURE_ROWS = [
  { section: 'Mobility & Access' },
  { key: 'step_free_entry',            label: 'Step-free entry' },
  { key: 'accessible_parking',         label: 'Accessible parking' },
  { key: 'door_width_cm',              label: 'Door width', unit: 'cm' },
  { key: 'ramp_gradient_percent',      label: 'Ramp gradient', unit: '%' },
  { key: 'turning_circle_cm',          label: 'Turning circle', unit: 'cm' },
  { key: 'hoisting_equipment',         label: 'Hoisting equipment' },
  { key: 'pool_hoist',                 label: 'Pool hoist' },
  { key: 'beach_wheelchair_available', label: 'Beach wheelchair' },
  { key: 'all_terrain_wheelchair',     label: 'All-terrain wheelchair' },
  { key: 'accessible_vehicle_transfer',label: 'Accessible vehicle transfer' },
  { key: 'boat_accessible',            label: 'Boat accessible' },
  { key: 'boat_notes',                 label: 'Boat notes', text: true },

  { section: 'Bathroom' },
  { key: 'grab_rails',                 label: 'Grab rails' },
  { key: 'roll_under_sink',            label: 'Roll-under sink' },
  { key: 'shower_chair',              label: 'Shower chair' },
  { key: 'changing_bench',             label: 'Changing bench' },

  { section: 'Sensory & Neurodiversity' },
  { key: 'sensory_friendly_rating',    label: 'Sensory rating', rating: true },
  { key: 'noise_level_rating',         label: 'Noise level', noise: true },
  { key: 'quiet_hours_start',          label: 'Quiet hours', quietHours: true },
  { key: 'low_lighting_option',        label: 'Low lighting option' },
  { key: 'fidget_kit_available',       label: 'Fidget kit available' },
  { key: 'social_story_available',     label: 'Social story available' },

  { section: 'Visual & Hearing' },
  { key: 'braille_signage',            label: 'Braille signage' },
  { key: 'audio_description',          label: 'Audio description' },
  { key: 'hearing_loop',               label: 'Hearing loop' },
  { key: 'sign_language_staff',        label: 'Sign language staff' },
]

const NOISE_LABELS = ['', 'Very quiet', 'Quiet', 'Moderate', 'Loud', 'Very loud']
const ALERT_LABELS = {
  ramp_repair: 'Ramp repair',
  hoist_down: 'Hoist down',
  flooded: 'Flooding',
  closed_temp: 'Temporarily closed',
  road_damage: 'Road damage',
  ferry_cancelled: 'Ferry cancelled',
  power_outage: 'Power outage',
  other: 'Alert',
}

function FeatureValue({ row, facility }) {
  const val = facility[row.key]
  if (val === null || val === undefined || val === '') return null
  if (row.text) return <span style={s.featureVal}>{val}</span>
  if (row.rating) return (
    <span style={s.featureVal}>
      {'★'.repeat(val)}{'☆'.repeat(5 - val)} ({val}/5)
    </span>
  )
  if (row.noise) return <span style={s.featureVal}>{NOISE_LABELS[val]}</span>
  if (row.quietHours) {
    const end = facility.quiet_hours_end
    return <span style={s.featureVal}>{val}{end ? ` – ${end}` : ''}</span>
  }
  if (row.unit) return <span style={s.featureVal}>{val} {row.unit}</span>
  return <span style={s.featureVal}>{val ? '✓ Yes' : '✕ No'}</span>
}

export default function Facility() {
  const { id } = useParams()
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    fetch(`/api/facilities/${id}`)
      .then(r => { if (!r.ok) throw new Error('Not found'); return r.json() })
      .then(d => { setData(d); setLoading(false) })
      .catch(e => { setError(e.message); setLoading(false) })
  }, [id])

  if (loading) return (
    <div style={s.page}>
      <div className="skeleton" style={{ height: 48, maxWidth: 400, marginBottom: 32 }} />
      <div className="skeleton" style={{ height: 200 }} />
    </div>
  )

  if (error || !data) return (
    <div style={s.page}>
      <p style={{ color: '#C0392B' }}>⚠ {error || 'Facility not found'}</p>
      <Link to="/search" style={{ color: '#E8634A', marginTop: 12, display: 'inline-block' }}>
        ← Back to search
      </Link>
    </div>
  )

  const { facility, active_alerts } = data

  // Group feature rows, skip whole sections if no data
  const sections = []
  let currentSection = null
  let currentRows    = []

  for (const row of FEATURE_ROWS) {
    if (row.section) {
      if (currentSection && currentRows.length) sections.push({ title: currentSection, rows: currentRows })
      currentSection = row.section
      currentRows    = []
    } else {
      const val = facility[row.key]
      if (val !== null && val !== undefined && val !== '' && val !== 0) {
        currentRows.push(row)
      }
    }
  }
  if (currentSection && currentRows.length) sections.push({ title: currentSection, rows: currentRows })

  return (
    <div style={s.page}>
      <Link to="/search" style={s.back}>← Back to search</Link>

      {/* ── Header ── */}
      <div style={s.header}>
        <div>
          <p style={s.breadcrumb}>
            {facility.division} Division · {facility.island} · {facility.town_or_area}
          </p>
          <h1 style={s.title}>{facility.name}</h1>
          {facility.address && <p style={s.address}>📍 {facility.address}</p>}
        </div>
        <VerifiedBadge facility={facility} />
      </div>

      {/* ── Active alerts ── */}
      {active_alerts?.length > 0 && (
        <div style={s.alertsBox}>
          <h2 style={s.alertsTitle}>⚡ Live Alerts</h2>
          {active_alerts.map(a => (
            <div key={a.id} style={s.alert}>
              <span style={s.alertType}>{ALERT_LABELS[a.alert_type] || 'Alert'}</span>
              <span style={s.alertMsg}>{a.message}</span>
              <span style={s.alertDate}>
                Reported {new Date(a.reported_at).toLocaleDateString('en-FJ')}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ── Accessibility data ── */}
      <div style={s.body}>
        <div style={s.featuresCol}>
          <h2 style={s.sectionHead}>Accessibility data</h2>
          {sections.length === 0 && (
            <p style={{ color: '#7A6E60', fontStyle: 'italic' }}>
              Detailed features not yet recorded for this facility.
            </p>
          )}
          {sections.map(({ title, rows }) => (
            <div key={title} style={s.featureSection}>
              <h3 style={s.featureSectionTitle}>{title}</h3>
              <table style={s.table}>
                <tbody>
                  {rows.map(row => (
                    <tr key={row.key} style={s.tr}>
                      <td style={s.featureKey}>{row.label}</td>
                      <td><FeatureValue row={row} facility={facility} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        {/* ── Sidebar ── */}
        <aside style={s.aside}>
          {facility.phone && (
            <a href={`tel:${facility.phone}`} style={s.contactBtn}>📞 {facility.phone}</a>
          )}
          {facility.website && (
            <a href={facility.website} target="_blank" rel="noopener noreferrer" style={s.contactBtn}>
              🌐 Visit website
            </a>
          )}
          <a
            href={`https://www.google.com/maps?q=${facility.lat},${facility.lng}`}
            target="_blank" rel="noopener noreferrer"
            style={s.contactBtn}
          >
            🗺️ Open in Maps
          </a>

          <div style={s.verifyBox}>
            <p style={s.verifyTitle}>Is this data correct?</p>
            <p style={s.verifySub}>
              Help keep FijiBoundless accurate. Submit an update if anything has changed.
            </p>
            <a href={`mailto:verify@fijiboundless.com?subject=Update: ${facility.name}`} style={s.verifyLink}>
              Submit update →
            </a>
          </div>

          {facility.last_verified && (
            <p style={s.lastChecked}>
              Last checked {new Date(facility.last_verified).toLocaleDateString('en-FJ', {
                day: 'numeric', month: 'long', year: 'numeric',
              })}
            </p>
          )}
        </aside>
      </div>
    </div>
  )
}

const s = {
  page: { maxWidth: 1100, margin: '0 auto', padding: '40px 24px' },
  back: { color: '#E8634A', fontSize: '0.88rem', fontWeight: 600, display: 'inline-block', marginBottom: 24 },
  header: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'flex-start', gap: 24,
    marginBottom: 28, flexWrap: 'wrap',
  },
  breadcrumb: { fontSize: '0.8rem', color: '#7A6E60', marginBottom: 8 },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(1.5rem, 4vw, 2.4rem)',
    color: '#0D2B3E', lineHeight: 1.2,
  },
  address: { fontSize: '0.88rem', color: '#4A3F2F', marginTop: 8 },
  alertsBox: {
    background: '#FFF3E0', border: '1px solid #FFB300',
    borderRadius: 10, padding: '18px 20px', marginBottom: 28,
  },
  alertsTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1rem', color: '#E65100', marginBottom: 12,
  },
  alert: { display: 'flex', gap: 12, alignItems: 'baseline', flexWrap: 'wrap', marginBottom: 8 },
  alertType: { fontWeight: 700, color: '#E65100', fontSize: '0.8rem', textTransform: 'uppercase' },
  alertMsg: { fontSize: '0.88rem', color: '#4A3F2F', flex: 1 },
  alertDate: { fontSize: '0.75rem', color: '#7A6E60' },
  body: { display: 'grid', gridTemplateColumns: '1fr 260px', gap: 40, alignItems: 'start' },
  featuresCol: {},
  sectionHead: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.3rem', color: '#0D2B3E', marginBottom: 24,
  },
  featureSection: { marginBottom: 28 },
  featureSectionTitle: {
    fontSize: '0.75rem', fontWeight: 700,
    letterSpacing: '0.08em', textTransform: 'uppercase',
    color: '#8C7355', marginBottom: 10,
    paddingBottom: 6, borderBottom: '1px solid #D4C9B0',
  },
  table: { width: '100%', borderCollapse: 'collapse' },
  tr: { borderBottom: '1px solid #EDE7D8' },
  featureKey: {
    padding: '9px 0', fontSize: '0.85rem',
    color: '#4A3F2F', width: '55%', verticalAlign: 'top',
  },
  featureVal: { fontSize: '0.85rem', color: '#1A1208', fontWeight: 600 },
  aside: { position: 'sticky', top: 84 },
  contactBtn: {
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '11px 16px', marginBottom: 10,
    background: '#F5EDD6', border: '1px solid #D4C9B0',
    borderRadius: 8, fontSize: '0.88rem', color: '#0D2B3E',
    fontWeight: 600, transition: 'background 200ms',
  },
  verifyBox: {
    marginTop: 16,
    background: '#0D2B3E', borderRadius: 10,
    padding: '18px 16px',
  },
  verifyTitle: {
    fontFamily: "'Playfair Display', serif",
    color: '#A8D5BA', fontSize: '0.95rem', marginBottom: 6,
  },
  verifySub: { color: 'rgba(253,250,245,0.6)', fontSize: '0.78rem', lineHeight: 1.6, marginBottom: 12 },
  verifyLink: { color: '#E8634A', fontSize: '0.85rem', fontWeight: 700 },
  lastChecked: { marginTop: 14, fontSize: '0.75rem', color: '#7A6E60', textAlign: 'center' },
}
