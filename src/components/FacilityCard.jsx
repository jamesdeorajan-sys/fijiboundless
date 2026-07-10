import { Link } from 'react-router-dom'
import VerifiedBadge from './VerifiedBadge.jsx'

const CATEGORY_ICONS = {
  toilet:     '🚻',
  hotel:      '🏨',
  restaurant: '🍽️',
  beach:      '🏖️',
  transport:  '🚐',
  attraction: '🎯',
  village:    '🏘️',
  ferry:      '⛵',
}

const SEVERITY_COLORS = { low: '#C08A1A', medium: '#E65100', high: '#B71C1C', critical: '#7A0000' }

const FEATURE_ICONS = [
  { key: 'step_free_entry',           label: 'Step-free entry',    icon: '♿' },
  { key: 'grab_rails',                label: 'Grab rails',          icon: '🤲' },
  { key: 'hoisting_equipment',        label: 'Hoist available',     icon: '🔧' },
  { key: 'beach_wheelchair_available',label: 'Beach wheelchair',    icon: '🏖️' },
  { key: 'all_terrain_wheelchair',    label: 'All-terrain chair',   icon: '🗺️' },
  { key: 'boat_accessible',           label: 'Boat accessible',     icon: '⛵' },
  { key: 'hearing_loop',              label: 'Hearing loop',        icon: '👂' },
  { key: 'sensory_friendly_rating',   label: 'Sensory friendly',    icon: '🧠', threshold: 3 },
]

export default function FacilityCard({ facility }) {
  const activeFeatures = FEATURE_ICONS.filter(f =>
    f.threshold ? facility[f.key] >= f.threshold : !!facility[f.key]
  )

  return (
    <Link to={`/facility/${facility.id}`} style={s.card}>
      {facility.active_alerts > 0 && (
        <div style={{
          ...s.alertBanner,
          ...(facility.top_alert_severity ? {
            background: SEVERITY_COLORS[facility.top_alert_severity] + '1A',
            borderColor: SEVERITY_COLORS[facility.top_alert_severity],
            color: SEVERITY_COLORS[facility.top_alert_severity],
          } : {}),
        }}>
          ⚠ {facility.active_alerts} active alert{facility.active_alerts > 1 ? 's' : ''}
          {facility.top_alert_severity && (
            <span style={s.severityTag}>{facility.top_alert_severity.toUpperCase()}</span>
          )}
        </div>
      )}

      <div style={s.top}>
        <span style={s.catIcon}>{CATEGORY_ICONS[facility.category] || '📍'}</span>
        <div style={s.topText}>
          <h3 style={s.name}>{facility.name}</h3>
          <p style={s.location}>
            {facility.town_or_area} · {facility.island} · {facility.division} Division
          </p>
        </div>
      </div>

      {facility.distance_km !== undefined && (
        <p style={s.distance}>{facility.distance_km} km away</p>
      )}

      <div style={s.features} aria-label="Accessibility features">
        {activeFeatures.slice(0, 6).map(f => (
          <span key={f.key} title={f.label} style={s.featureIcon}>{f.icon}</span>
        ))}
        {activeFeatures.length === 0 && (
          <span style={s.noFeatures}>Features not yet recorded</span>
        )}
      </div>

      <div style={s.footer}>
        <VerifiedBadge facility={facility} compact />
        {facility.door_width_cm && (
          <span style={s.meta}>Door {facility.door_width_cm}cm</span>
        )}
      </div>
    </Link>
  )
}

const s = {
  card: {
    display: 'block',
    background: '#FDFAF5',
    border: '1px solid #D4C9B0',
    borderRadius: 12,
    padding: '18px 20px',
    transition: 'box-shadow 200ms, transform 200ms',
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'inherit',
  },
  alertBanner: {
    background: '#FFF3E0',
    border: '1px solid #FFB300',
    borderRadius: 6,
    padding: '5px 10px',
    marginBottom: 12,
    fontSize: '0.78rem',
    color: '#E65100',
    fontWeight: 600,
    display: 'flex', alignItems: 'center', gap: 6,
  },
  severityTag: {
    marginLeft: 'auto', fontSize: '0.65rem', fontWeight: 800,
    letterSpacing: '0.04em', padding: '1px 6px', borderRadius: 4,
    background: 'rgba(0,0,0,0.08)',
  },
  top: { display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10 },
  catIcon: { fontSize: '1.6rem', flexShrink: 0, marginTop: 2 },
  topText: { flex: 1 },
  name: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1rem', fontWeight: 700,
    color: '#0D2B3E', lineHeight: 1.3, marginBottom: 3,
  },
  location: { fontSize: '0.78rem', color: '#7A6E60' },
  distance: { fontSize: '0.8rem', color: '#E8634A', fontWeight: 600, marginBottom: 10 },
  features: { display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 },
  featureIcon: { fontSize: '1.1rem' },
  noFeatures: { fontSize: '0.75rem', color: '#7A6E60', fontStyle: 'italic' },
  footer: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  meta: { fontSize: '0.75rem', color: '#7A6E60' },
}
