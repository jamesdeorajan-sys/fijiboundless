import { useState, useEffect, useCallback } from 'react'

const CATEGORIES = ['toilet', 'hotel', 'restaurant', 'beach', 'transport', 'attraction', 'village', 'ferry']
const DIVISIONS  = ['Western', 'Central', 'Northern', 'Eastern']
const VERIFY_SOURCES = ['staff', 'community', 'partner', 'ai_vision']
const VERIFY_STATUSES = ['verified', 'needs_update', 'closed_temp', 'closed_perm']
const ALERT_TYPES = ['ramp_repair', 'hoist_down', 'flooded', 'closed_temp', 'road_damage', 'ferry_cancelled', 'power_outage', 'other']

const BOOL_FEATURES = [
  ['step_free_entry', 'Step-free entry'], ['accessible_parking', 'Accessible parking'],
  ['hoisting_equipment', 'Hoisting equipment'], ['pool_hoist', 'Pool hoist'],
  ['beach_wheelchair_available', 'Beach wheelchair'], ['all_terrain_wheelchair', 'All-terrain wheelchair'],
  ['grab_rails', 'Grab rails'], ['roll_under_sink', 'Roll-under sink'],
  ['shower_chair', 'Shower chair'], ['changing_bench', 'Changing bench'],
  ['low_lighting_option', 'Low lighting option'], ['fidget_kit_available', 'Fidget kit available'],
  ['social_story_available', 'Social story available'], ['braille_signage', 'Braille signage'],
  ['audio_description', 'Audio description'], ['hearing_loop', 'Hearing loop'],
  ['sign_language_staff', 'Sign language staff'], ['accessible_vehicle_transfer', 'Accessible vehicle transfer'],
  ['boat_accessible', 'Boat accessible'],
]

const EMPTY_FACILITY = { name: '', category: 'hotel', division: 'Western', island: '', town_or_area: '', address: '', lat: '', lng: '', phone: '', website: '' }
const EMPTY_VERIFY   = { facility_id: '', verified_by: 'staff', verifier_name: '', status: 'verified', notes: '' }
const EMPTY_ALERT    = { facility_id: '', alert_type: 'other', message: '', reported_by: '' }

export default function Admin() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed]     = useState(false)
  const [authError, setAuthError] = useState(null)
  const [authLoading, setAuthLoading] = useState(false)

  if (!authed) {
    return (
      <div style={s.gatePage}>
        <form
          style={s.gateForm}
          onSubmit={async e => {
            e.preventDefault()
            setAuthLoading(true); setAuthError(null)
            try {
              const res = await fetch('/api/admin/ping', { headers: { 'X-Admin-Password': password } })
              if (!res.ok) throw new Error('Incorrect password')
              setAuthed(true)
            } catch (e) {
              setAuthError(e.message)
            } finally {
              setAuthLoading(false)
            }
          }}
        >
          <h1 style={s.gateTitle}>Admin access</h1>
          <p style={s.gateSub} id="gate-desc">Enter the admin password to manage facilities, verifications, and alerts.</p>
          <label style={s.label} htmlFor="gate-password">Admin password</label>
          <input
            id="gate-password" type="password" value={password} onChange={e => setPassword(e.target.value)}
            style={s.gateInput} autoFocus aria-describedby="gate-desc"
            autoComplete="current-password"
          />
          {authError && <div style={s.gateError}>⚠ {authError}</div>}
          <button type="submit" style={s.gateBtn} disabled={authLoading}>
            {authLoading ? 'Checking…' : 'Enter'}
          </button>
        </form>
      </div>
    )
  }

  return <AdminPanel password={password} />
}

function AdminPanel({ password }) {
  const [facilities, setFacilities] = useState([])
  const [alerts, setAlerts]         = useState([])

  const loadFacilities = useCallback(() => {
    fetch('/api/facilities?limit=200').then(r => r.json()).then(d => setFacilities(d.facilities || [])).catch(() => {})
  }, [])
  const loadAlerts = useCallback(() => {
    fetch('/api/alerts').then(r => r.json()).then(d => setAlerts(d.active_alerts || [])).catch(() => {})
  }, [])

  useEffect(() => { loadFacilities(); loadAlerts() }, [loadFacilities, loadAlerts])

  async function adminPost(path, body) {
    const res = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Admin-Password': password },
      body: JSON.stringify(body),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(data.error || 'Request failed')
    return data
  }

  return (
    <div style={s.page}>
      <section style={s.hero}>
        <h1 style={s.heroTitle}>Admin panel</h1>
        <p style={s.heroSub}>Add facilities, record accessibility assessments, submit verifications, and manage live alerts.</p>
      </section>

      <div style={s.container}>
        <AddFacilityForm adminPost={adminPost} onCreated={loadFacilities} />
        <AccessibilityFeaturesForm adminPost={adminPost} facilities={facilities} />
        <VerificationForm adminPost={adminPost} facilities={facilities} />
        <AlertForm adminPost={adminPost} facilities={facilities} onCreated={loadAlerts} />
        <ResolveAlertForm adminPost={adminPost} alerts={alerts} onResolved={loadAlerts} />
        <AuditLogPanel adminPost={adminPost} password={password} />
      </div>
    </div>
  )
}

function Panel({ title, children }) {
  return (
    <section style={s.panel}>
      <h2 style={s.panelTitle}>{title}</h2>
      {children}
    </section>
  )
}

function StatusMsg({ status }) {
  if (!status) return null
  return <div style={status.ok ? s.success : s.error}>{status.ok ? '✓' : '⚠'} {status.message}</div>
}

function AddFacilityForm({ adminPost, onCreated }) {
  const [form, setForm]     = useState(EMPTY_FACILITY)
  const [status, setStatus] = useState(null)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  async function submit(e) {
    e.preventDefault()
    setStatus(null)
    try {
      const data = await adminPost('/api/admin/facilities', { ...form, lat: parseFloat(form.lat), lng: parseFloat(form.lng) })
      setStatus({ ok: true, message: `Facility created (id ${data.facility_id}).` })
      setForm(EMPTY_FACILITY)
      onCreated()
    } catch (e) {
      setStatus({ ok: false, message: e.message })
    }
  }

  return (
    <Panel title="1. Add a new facility">
      <form onSubmit={submit} style={s.form}>
        <div className="grid-responsive-2col">
          <div style={s.field}>
            <label style={s.label} htmlFor="af-name">Name</label>
            <input id="af-name" style={s.input} value={form.name} onChange={e => set('name', e.target.value)} required />
          </div>
          <div style={s.field}>
            <label style={s.label} htmlFor="af-category">Category</label>
            <select id="af-category" style={s.input} value={form.category} onChange={e => set('category', e.target.value)}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div style={s.field}>
            <label style={s.label} htmlFor="af-division">Division</label>
            <select id="af-division" style={s.input} value={form.division} onChange={e => set('division', e.target.value)}>
              {DIVISIONS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div style={s.field}>
            <label style={s.label} htmlFor="af-island">Island</label>
            <input id="af-island" style={s.input} value={form.island} onChange={e => set('island', e.target.value)} required />
          </div>
          <div style={s.field}>
            <label style={s.label} htmlFor="af-town">Town / area</label>
            <input id="af-town" style={s.input} value={form.town_or_area} onChange={e => set('town_or_area', e.target.value)} required />
          </div>
          <div style={s.field}>
            <label style={s.label} htmlFor="af-address">Address</label>
            <input id="af-address" style={s.input} value={form.address} onChange={e => set('address', e.target.value)} />
          </div>
          <div style={s.field}>
            <label style={s.label} htmlFor="af-lat">Latitude</label>
            <input id="af-lat" style={s.input} value={form.lat} onChange={e => set('lat', e.target.value)} required />
          </div>
          <div style={s.field}>
            <label style={s.label} htmlFor="af-lng">Longitude</label>
            <input id="af-lng" style={s.input} value={form.lng} onChange={e => set('lng', e.target.value)} required />
          </div>
          <div style={s.field}>
            <label style={s.label} htmlFor="af-phone">Phone (optional)</label>
            <input id="af-phone" style={s.input} value={form.phone} onChange={e => set('phone', e.target.value)} />
          </div>
          <div style={s.field}>
            <label style={s.label} htmlFor="af-website">Website (optional)</label>
            <input id="af-website" style={s.input} value={form.website} onChange={e => set('website', e.target.value)} />
          </div>
        </div>
        <button type="submit" style={s.submitBtn}>Add facility</button>
        <StatusMsg status={status} />
      </form>
    </Panel>
  )
}

function AccessibilityFeaturesForm({ adminPost, facilities }) {
  const [facilityId, setFacilityId] = useState('')
  const [bools, setBools]           = useState({})
  const [other, setOther]           = useState({ ramp_gradient_percent: '', door_width_cm: '', turning_circle_cm: '', sensory_friendly_rating: '', quiet_hours_start: '', quiet_hours_end: '', noise_level_rating: '', boat_notes: '' })
  const [status, setStatus]         = useState(null)

  async function submit(e) {
    e.preventDefault()
    setStatus(null)
    if (!facilityId) { setStatus({ ok: false, message: 'Choose a facility first.' }); return }
    try {
      await adminPost('/api/admin/accessibility-features', { facility_id: parseInt(facilityId), ...bools, ...other })
      setStatus({ ok: true, message: 'Accessibility features saved.' })
    } catch (e) {
      setStatus({ ok: false, message: e.message })
    }
  }

  return (
    <Panel title="2. Add accessibility features">
      <form onSubmit={submit} style={s.form}>
        <div style={s.field}>
          <label style={s.label} htmlFor="acc-facility">Facility</label>
          <select id="acc-facility" style={s.input} value={facilityId} onChange={e => setFacilityId(e.target.value)} required>
            <option value="">Select facility…</option>
            {facilities.map(f => <option key={f.id} value={f.id}>{f.name} ({f.town_or_area})</option>)}
          </select>
        </div>

        <fieldset style={s.fieldset}>
          <legend style={s.legend}>Accessibility features present</legend>
          <div style={s.checkGrid}>
            {BOOL_FEATURES.map(([key, label]) => (
              <label key={key} style={s.checkLabel}>
                <input
                  type="checkbox"
                  checked={!!bools[key]}
                  onChange={e => setBools(b => ({ ...b, [key]: e.target.checked }))}
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid-responsive-2col">
          <div style={s.field}>
            <label style={s.label} htmlFor="acc-ramp">Ramp gradient %</label>
            <input id="acc-ramp" style={s.input} value={other.ramp_gradient_percent} onChange={e => setOther(o => ({ ...o, ramp_gradient_percent: e.target.value }))} />
          </div>
          <div style={s.field}>
            <label style={s.label} htmlFor="acc-door">Door width (cm)</label>
            <input id="acc-door" style={s.input} value={other.door_width_cm} onChange={e => setOther(o => ({ ...o, door_width_cm: e.target.value }))} />
          </div>
          <div style={s.field}>
            <label style={s.label} htmlFor="acc-turning">Turning circle (cm)</label>
            <input id="acc-turning" style={s.input} value={other.turning_circle_cm} onChange={e => setOther(o => ({ ...o, turning_circle_cm: e.target.value }))} />
          </div>
          <div style={s.field}>
            <label style={s.label} htmlFor="acc-sensory">Sensory friendly rating (1-5)</label>
            <input id="acc-sensory" style={s.input} value={other.sensory_friendly_rating} onChange={e => setOther(o => ({ ...o, sensory_friendly_rating: e.target.value }))} />
          </div>
          <div style={s.field}>
            <label style={s.label} htmlFor="acc-noise">Noise level rating (1-5)</label>
            <input id="acc-noise" style={s.input} value={other.noise_level_rating} onChange={e => setOther(o => ({ ...o, noise_level_rating: e.target.value }))} />
          </div>
          <div style={s.field}>
            <label style={s.label} htmlFor="acc-qstart">Quiet hours start (HH:MM)</label>
            <input id="acc-qstart" style={s.input} value={other.quiet_hours_start} onChange={e => setOther(o => ({ ...o, quiet_hours_start: e.target.value }))} />
          </div>
          <div style={s.field}>
            <label style={s.label} htmlFor="acc-qend">Quiet hours end (HH:MM)</label>
            <input id="acc-qend" style={s.input} value={other.quiet_hours_end} onChange={e => setOther(o => ({ ...o, quiet_hours_end: e.target.value }))} />
          </div>
        </div>
        <div style={s.field}>
          <label style={s.label} htmlFor="acc-boat">Boat access notes (optional)</label>
          <textarea id="acc-boat" style={s.textarea} value={other.boat_notes} onChange={e => setOther(o => ({ ...o, boat_notes: e.target.value }))} rows={2} />
        </div>

        <button type="submit" style={s.submitBtn}>Save accessibility features</button>
        <StatusMsg status={status} />
      </form>
    </Panel>
  )
}

function VerificationForm({ adminPost, facilities }) {
  const [form, setForm]     = useState(EMPTY_VERIFY)
  const [status, setStatus] = useState(null)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  async function submit(e) {
    e.preventDefault()
    setStatus(null)
    if (!form.facility_id) { setStatus({ ok: false, message: 'Choose a facility first.' }); return }
    try {
      await adminPost('/api/admin/verify', { ...form, facility_id: parseInt(form.facility_id) })
      setStatus({ ok: true, message: 'Verification submitted.' })
      setForm(EMPTY_VERIFY)
    } catch (e) {
      setStatus({ ok: false, message: e.message })
    }
  }

  return (
    <Panel title="3. Submit a verification">
      <form onSubmit={submit} style={s.form}>
        <div className="grid-responsive-2col">
          <div style={s.field}>
            <label style={s.label} htmlFor="ver-facility">Facility</label>
            <select id="ver-facility" style={s.input} value={form.facility_id} onChange={e => set('facility_id', e.target.value)} required>
              <option value="">Select facility…</option>
              {facilities.map(f => <option key={f.id} value={f.id}>{f.name} ({f.town_or_area})</option>)}
            </select>
          </div>
          <div style={s.field}>
            <label style={s.label} htmlFor="ver-source">Verified by</label>
            <select id="ver-source" style={s.input} value={form.verified_by} onChange={e => set('verified_by', e.target.value)}>
              {VERIFY_SOURCES.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div style={s.field}>
            <label style={s.label} htmlFor="ver-name">Verifier name</label>
            <input id="ver-name" style={s.input} value={form.verifier_name} onChange={e => set('verifier_name', e.target.value)} />
          </div>
          <div style={s.field}>
            <label style={s.label} htmlFor="ver-status">Status</label>
            <select id="ver-status" style={s.input} value={form.status} onChange={e => set('status', e.target.value)}>
              {VERIFY_STATUSES.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
        </div>
        <div style={s.field}>
          <label style={s.label} htmlFor="ver-notes">Notes</label>
          <textarea id="ver-notes" style={s.textarea} value={form.notes} onChange={e => set('notes', e.target.value)} rows={2} />
        </div>
        <button type="submit" style={s.submitBtn}>Submit verification</button>
        <StatusMsg status={status} />
      </form>
    </Panel>
  )
}

function AlertForm({ adminPost, facilities, onCreated }) {
  const [form, setForm]     = useState(EMPTY_ALERT)
  const [status, setStatus] = useState(null)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  async function submit(e) {
    e.preventDefault()
    setStatus(null)
    if (!form.facility_id) { setStatus({ ok: false, message: 'Choose a facility first.' }); return }
    try {
      await adminPost('/api/admin/alerts', { ...form, facility_id: parseInt(form.facility_id) })
      setStatus({ ok: true, message: 'Alert posted.' })
      setForm(EMPTY_ALERT)
      onCreated()
    } catch (e) {
      setStatus({ ok: false, message: e.message })
    }
  }

  return (
    <Panel title="4. Post a live alert">
      <form onSubmit={submit} style={s.form}>
        <div className="grid-responsive-2col">
          <div style={s.field}>
            <label style={s.label} htmlFor="alert-facility">Facility</label>
            <select id="alert-facility" style={s.input} value={form.facility_id} onChange={e => set('facility_id', e.target.value)} required>
              <option value="">Select facility…</option>
              {facilities.map(f => <option key={f.id} value={f.id}>{f.name} ({f.town_or_area})</option>)}
            </select>
          </div>
          <div style={s.field}>
            <label style={s.label} htmlFor="alert-type">Alert type</label>
            <select id="alert-type" style={s.input} value={form.alert_type} onChange={e => set('alert_type', e.target.value)}>
              {ALERT_TYPES.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div style={s.field}>
            <label style={s.label} htmlFor="alert-reporter">Reported by</label>
            <input id="alert-reporter" style={s.input} value={form.reported_by} onChange={e => set('reported_by', e.target.value)} />
          </div>
        </div>
        <div style={s.field}>
          <label style={s.label} htmlFor="alert-message">Alert message</label>
          <textarea id="alert-message" style={s.textarea} value={form.message} onChange={e => set('message', e.target.value)} rows={2} required />
        </div>
        <button type="submit" style={s.submitBtn}>Post alert</button>
        <StatusMsg status={status} />
      </form>
    </Panel>
  )
}

function ResolveAlertForm({ adminPost, alerts, onResolved }) {
  const [status, setStatus] = useState(null)

  async function resolve(id) {
    setStatus(null)
    try {
      await adminPost(`/api/admin/alerts/${id}/resolve`, {})
      setStatus({ ok: true, message: `Alert ${id} resolved.` })
      onResolved()
    } catch (e) {
      setStatus({ ok: false, message: e.message })
    }
  }

  return (
    <Panel title="5. Resolve an active alert">
      {alerts.length === 0 ? (
        <p style={s.empty}>No active alerts right now.</p>
      ) : (
        <div style={s.alertList}>
          {alerts.map(a => (
            <div key={a.id} style={s.alertRow}>
              <div>
                <strong>{a.facility_name}</strong> · {a.alert_type}
                <p style={s.alertMsg}>{a.message}</p>
              </div>
              <button type="button" style={s.resolveBtn} onClick={() => resolve(a.id)}>Resolve</button>
            </div>
          ))}
        </div>
      )}
      <StatusMsg status={status} />
    </Panel>
  )
}

function AuditLogPanel({ adminPost, password }) {
  const [runs, setRuns]       = useState([])
  const [loading, setLoading] = useState(true)
  const [running, setRunning] = useState(false)
  const [status, setStatus]   = useState(null)

  const loadRuns = useCallback(() => {
    setLoading(true)
    fetch('/api/admin/audit-log', { headers: { 'X-Admin-Password': password } })
      .then(r => r.json())
      .then(d => setRuns(d.runs || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [password])

  useEffect(() => { loadRuns() }, [loadRuns])

  async function runNow() {
    setRunning(true); setStatus(null)
    try {
      const data = await adminPost('/api/admin/run-audit', {})
      setStatus({ ok: true, message: `Audit complete: ${data.facilities_flagged} flagged, ${data.alerts_posted} alerts posted.` })
      loadRuns()
    } catch (e) {
      setStatus({ ok: false, message: e.message })
    } finally {
      setRunning(false)
    }
  }

  return (
    <Panel title="6. Audit log">
      <button type="button" style={s.submitBtn} onClick={runNow} disabled={running}>
        {running ? 'Running audit…' : 'Run audit now'}
      </button>
      <StatusMsg status={status} />

      {loading ? (
        <p style={s.empty}>Loading audit history…</p>
      ) : runs.length === 0 ? (
        <p style={s.empty}>No audit runs yet.</p>
      ) : (
        <table style={s.auditTable}>
          <thead>
            <tr>
              <th style={s.auditTh}>Date</th>
              <th style={s.auditTh}>Facilities flagged</th>
              <th style={s.auditTh}>Alerts posted</th>
              <th style={s.auditTh}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {runs.map(r => (
              <tr key={r.id}>
                <td style={s.auditTd}>{new Date(r.run_at).toLocaleString('en-FJ')}</td>
                <td style={s.auditTd}>{r.facilities_flagged}</td>
                <td style={s.auditTd}>{r.alerts_posted}</td>
                <td style={s.auditTd}>{r.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Panel>
  )
}

const s = {
  gatePage: {
    minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
  },
  gateForm: {
    background: '#F5EDD6', border: '1px solid #D4C9B0', borderRadius: 14,
    padding: '36px 32px', maxWidth: 380, width: '100%',
    display: 'flex', flexDirection: 'column', gap: 14,
  },
  gateTitle: { fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', color: '#0D2B3E' },
  gateSub: { fontSize: '0.88rem', color: '#4A3F2F', lineHeight: 1.6 },
  gateInput: {
    padding: '11px 14px', border: '1px solid #D4C9B0', borderRadius: 8,
    fontSize: '0.95rem', background: '#FDFAF5', color: '#1A1208',
  },
  gateBtn: {
    padding: '12px', background: '#E8634A', color: '#FDFAF5',
    border: 'none', borderRadius: 8, fontSize: '0.95rem', fontWeight: 700,
  },
  gateError: { fontSize: '0.85rem', color: '#B71C1C' },

  page: {},
  hero: {
    background: '#0D2B3E', padding: '48px 24px 40px', textAlign: 'center',
  },
  heroTitle: { fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#FDFAF5', marginBottom: 8 },
  heroSub: { color: 'rgba(253,250,245,0.7)', fontSize: '0.95rem' },

  container: { maxWidth: 820, margin: '0 auto', padding: '40px 24px 80px', display: 'flex', flexDirection: 'column', gap: 28 },
  panel: { background: '#F5EDD6', border: '1px solid #D4C9B0', borderRadius: 14, padding: '26px 24px' },
  panelTitle: { fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', color: '#0D2B3E', marginBottom: 18 },

  form: { display: 'flex', flexDirection: 'column', gap: 14 },
  field: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: {
    fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.05em',
    textTransform: 'uppercase', color: '#4A3F2F',
  },
  fieldset: { border: 'none', padding: 0, margin: 0 },
  legend: {
    fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.05em',
    textTransform: 'uppercase', color: '#4A3F2F', padding: 0, marginBottom: 8,
  },
  input: {
    padding: '10px 12px', background: '#FDFAF5', border: '1px solid #D4C9B0',
    borderRadius: 7, fontSize: '0.88rem', color: '#1A1208',
  },
  textarea: {
    padding: '10px 12px', background: '#FDFAF5', border: '1px solid #D4C9B0',
    borderRadius: 7, fontSize: '0.88rem', color: '#1A1208', fontFamily: 'inherit', resize: 'vertical',
  },
  checkGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '6px 10px',
    background: '#FDFAF5', border: '1px solid #D4C9B0', borderRadius: 8, padding: 14,
  },
  checkLabel: { display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: '#1A1208' },
  submitBtn: {
    alignSelf: 'flex-start', padding: '10px 22px', background: '#E8634A', color: '#FDFAF5',
    border: 'none', borderRadius: 8, fontSize: '0.88rem', fontWeight: 700,
  },
  success: { fontSize: '0.85rem', color: '#1B5E20', fontWeight: 600 },
  error: { fontSize: '0.85rem', color: '#B71C1C', fontWeight: 600 },
  empty: { fontSize: '0.88rem', color: '#7A6E60' },
  alertList: { display: 'flex', flexDirection: 'column', gap: 10 },
  alertRow: {
    display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12,
    background: '#FDFAF5', border: '1px solid #D4C9B0', borderRadius: 8, padding: '12px 14px', fontSize: '0.85rem',
  },
  alertMsg: { color: '#7A6E60', marginTop: 4, fontSize: '0.8rem' },
  resolveBtn: {
    flexShrink: 0, padding: '7px 14px', background: '#0D2B3E', color: '#A8D5BA',
    border: 'none', borderRadius: 6, fontSize: '0.78rem', fontWeight: 700,
  },
  auditTable: { width: '100%', borderCollapse: 'collapse', marginTop: 16, fontSize: '0.82rem' },
  auditTh: {
    textAlign: 'left', padding: '8px 10px', color: '#8C7355',
    fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.05em',
    textTransform: 'uppercase', borderBottom: '1px solid #D4C9B0',
  },
  auditTd: {
    padding: '8px 10px', color: '#1A1208', borderBottom: '1px solid #EDE7D8', verticalAlign: 'top',
  },
}
