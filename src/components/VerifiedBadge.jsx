// VerifiedBadge — compact trust signal for facility cards and detail pages

function daysSince(dateString) {
  if (!dateString) return null
  return Math.floor((Date.now() - new Date(dateString).getTime()) / 86400000)
}

function freshnessColor(days) {
  if (days === null) return '#7A6E60'
  if (days <= 30)  return '#2D6A4F'
  if (days <= 90)  return '#74A84A'
  if (days <= 180) return '#C08A1A'
  return '#C0392B'
}

function freshnessLabel(days) {
  if (days === null) return 'Not yet verified'
  if (days === 0)  return 'Verified today'
  if (days <= 30)  return `Verified ${days}d ago`
  if (days <= 90)  return `Checked ${days}d ago`
  if (days <= 180) return `Ageing — ${days}d ago`
  return `Overdue re-check (${days}d)`
}

const STATUS_CONFIG = {
  verified:     { label: 'Verified Accessible', color: '#1B5E20', icon: '✓' },
  needs_update: { label: 'Update Needed',        color: '#E65100', icon: '⚠' },
  closed_temp:  { label: 'Temporarily Closed',   color: '#B71C1C', icon: '✕' },
  closed_perm:  { label: 'Permanently Closed',   color: '#4A0E0E', icon: '✕' },
  unverified:   { label: 'Unverified',            color: '#546E7A', icon: '?' },
}

export default function VerifiedBadge({ facility, compact = false }) {
  const status = facility?.verification_status || 'unverified'
  const cfg    = STATUS_CONFIG[status] || STATUS_CONFIG.unverified
  const days   = daysSince(facility?.last_verified)

  if (compact) {
    return (
      <span style={{ ...s.chip, borderColor: cfg.color, color: cfg.color }}>
        {cfg.icon} {cfg.label}
      </span>
    )
  }

  return (
    <div style={{ ...s.badge, borderLeftColor: cfg.color }}>
      <div style={s.row}>
        <span style={{ ...s.dot, background: cfg.color }} />
        <span style={s.label}>{cfg.icon} {cfg.label}</span>
      </div>
      <div style={{ ...s.freshness, color: freshnessColor(days) }}>
        {freshnessLabel(days)}
      </div>
      {facility?.verifier_name && (
        <div style={s.verifier}>by {facility.verifier_name}</div>
      )}
    </div>
  )
}

const s = {
  badge: {
    background: '#F5EDD6',
    border: '1px solid #D4C9B0',
    borderLeft: '4px solid #1B5E20',
    borderRadius: 8,
    padding: '10px 14px',
    fontSize: '0.82rem',
  },
  chip: {
    display: 'inline-flex', alignItems: 'center', gap: 4,
    padding: '3px 10px',
    border: '1px solid',
    borderRadius: 20,
    fontSize: '0.75rem', fontWeight: 600,
    background: 'rgba(245,237,214,0.5)',
  },
  row: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 },
  dot: { width: 8, height: 8, borderRadius: '50%', flexShrink: 0 },
  label: { fontWeight: 700, color: '#1A1208' },
  freshness: { fontSize: '0.78rem', fontWeight: 600 },
  verifier: { fontSize: '0.75rem', color: '#7A6E60', marginTop: 2 },
}
