import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import FacilityCard from '../components/FacilityCard.jsx'

const CATEGORIES = ['toilet','hotel','restaurant','beach','transport','attraction','village','ferry']
const DIVISIONS  = ['Western','Central','Northern','Eastern']

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [facilities, setFacilities]     = useState([])
  const [loading, setLoading]           = useState(false)
  const [error, setError]               = useState(null)
  const [useGPS, setUseGPS]             = useState(false)
  const [gps, setGps]                   = useState(null)
  const [gpsLoading, setGpsLoading]     = useState(false)

  const category = searchParams.get('category') || ''
  const division = searchParams.get('division') || ''

  const fetchFacilities = useCallback(async () => {
    setLoading(true); setError(null)
    try {
      const params = new URLSearchParams()
      if (category) params.set('category', category)
      if (division) params.set('division', division)
      if (useGPS && gps) {
        params.set('lat', gps.lat)
        params.set('lng', gps.lng)
        params.set('radius_km', '30')
      }
      params.set('limit', '50')

      const res  = await fetch(`/api/facilities?${params}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to load')
      setFacilities(data.facilities || [])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [category, division, useGPS, gps])

  useEffect(() => { fetchFacilities() }, [fetchFacilities])

  function handleGPS() {
    if (!navigator.geolocation) return
    setGpsLoading(true)
    navigator.geolocation.getCurrentPosition(
      pos => {
        setGps({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setUseGPS(true)
        setGpsLoading(false)
      },
      () => setGpsLoading(false)
    )
  }

  function setFilter(key, value) {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    setSearchParams(next)
  }

  return (
    <div style={s.page}>
      {/* ── Sidebar filters ── */}
      <aside style={s.sidebar}>
        <h2 style={s.filterHead}>Filter</h2>

        <div style={s.filterGroup}>
          <label style={s.filterLabel}>Type</label>
          <select
            value={category}
            onChange={e => setFilter('category', e.target.value)}
            style={s.select}
          >
            <option value="">All types</option>
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
            ))}
          </select>
        </div>

        <div style={s.filterGroup}>
          <label style={s.filterLabel}>Region</label>
          <select
            value={division}
            onChange={e => setFilter('division', e.target.value)}
            style={s.select}
          >
            <option value="">All regions</option>
            {DIVISIONS.map(d => (
              <option key={d} value={d}>{d} Fiji</option>
            ))}
          </select>
        </div>

        <div style={s.filterGroup}>
          <label style={s.filterLabel}>Near me</label>
          <button
            onClick={handleGPS}
            style={{ ...s.gpsBtn, ...(useGPS ? s.gpsBtnActive : {}) }}
            disabled={gpsLoading}
          >
            {gpsLoading ? 'Getting location…' : useGPS ? '📍 Location on' : '📍 Use my location'}
          </button>
          {useGPS && (
            <button onClick={() => { setUseGPS(false); setGps(null) }} style={s.clearGps}>
              Clear
            </button>
          )}
        </div>

        {(category || division || useGPS) && (
          <button
            onClick={() => { setSearchParams({}); setUseGPS(false); setGps(null) }}
            style={s.clearAll}
          >
            Clear all filters
          </button>
        )}
      </aside>

      {/* ── Results ── */}
      <div style={s.results}>
        <div style={s.resultsHeader}>
          <h1 style={s.resultsTitle}>
            {loading ? 'Searching…' : `${facilities.length} place${facilities.length !== 1 ? 's' : ''} found`}
          </h1>
          {useGPS && gps && (
            <span style={s.gpsPill}>📍 Sorted by distance</span>
          )}
        </div>

        {error && <div style={s.error}>⚠ {error}</div>}

        {loading ? (
          <div style={s.grid}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton" style={s.skeletonCard} />
            ))}
          </div>
        ) : facilities.length === 0 ? (
          <div style={s.empty}>
            <p style={s.emptyTitle}>No facilities found</p>
            <p style={s.emptySub}>Try removing a filter or expanding your search area.</p>
          </div>
        ) : (
          <div style={s.grid}>
            {facilities.map(f => (
              <FacilityCard key={f.id} facility={f} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const s = {
  page: {
    maxWidth: 1200, margin: '0 auto',
    padding: '40px 24px',
    display: 'grid',
    gridTemplateColumns: '220px 1fr',
    gap: 40, alignItems: 'start',
  },
  sidebar: {
    position: 'sticky', top: 84,
    background: '#F5EDD6',
    border: '1px solid #D4C9B0',
    borderRadius: 12, padding: '24px 20px',
  },
  filterHead: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.1rem', color: '#0D2B3E',
    marginBottom: 20,
  },
  filterGroup: { marginBottom: 20 },
  filterLabel: {
    display: 'block',
    fontSize: '0.75rem', fontWeight: 700,
    letterSpacing: '0.07em', textTransform: 'uppercase',
    color: '#4A3F2F', marginBottom: 8,
  },
  select: {
    width: '100%', padding: '9px 12px',
    background: '#FDFAF5',
    border: '1px solid #D4C9B0', borderRadius: 7,
    fontSize: '0.88rem', color: '#1A1208',
    cursor: 'pointer',
  },
  gpsBtn: {
    width: '100%', padding: '9px 12px',
    background: '#FDFAF5', border: '1px solid #D4C9B0',
    borderRadius: 7, fontSize: '0.85rem',
    color: '#4A3F2F', textAlign: 'left',
    transition: 'all 200ms',
  },
  gpsBtnActive: {
    background: '#0D2B3E', color: '#A8D5BA',
    borderColor: '#0D2B3E',
  },
  clearGps: {
    marginTop: 6, fontSize: '0.75rem',
    color: '#7A6E60', background: 'none',
    border: 'none', cursor: 'pointer',
    textDecoration: 'underline',
  },
  clearAll: {
    marginTop: 12, width: '100%',
    padding: '8px', background: 'none',
    border: '1px dashed #D4C9B0', borderRadius: 7,
    fontSize: '0.8rem', color: '#7A6E60',
    cursor: 'pointer',
  },

  results: {},
  resultsHeader: {
    display: 'flex', alignItems: 'center', gap: 12,
    marginBottom: 24,
  },
  resultsTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.5rem', color: '#0D2B3E',
  },
  gpsPill: {
    fontSize: '0.78rem', background: '#A8D5BA',
    color: '#0D2B3E', borderRadius: 20,
    padding: '3px 10px', fontWeight: 600,
  },
  error: {
    background: '#FFF3E0', border: '1px solid #FFB300',
    borderRadius: 8, padding: '14px 18px',
    color: '#E65100', marginBottom: 20,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 16,
  },
  skeletonCard: { height: 180, borderRadius: 12 },
  empty: {
    textAlign: 'center', padding: '64px 24px',
    border: '2px dashed #D4C9B0', borderRadius: 12,
  },
  emptyTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.3rem', color: '#0D2B3E', marginBottom: 8,
  },
  emptySub: { color: '#7A6E60', fontSize: '0.9rem' },
}
