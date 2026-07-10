import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getGuide } from '../data/guides.js'
import { useSEO } from '../hooks/useSEO.js'
import FacilityCard from '../components/FacilityCard.jsx'

export default function Guide({ slug }) {
  const guide = getGuide(slug)
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)

  const faqJsonLd = guide ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  } : null

  useSEO({
    title: guide?.title,
    description: guide?.description,
    jsonLd: faqJsonLd,
  })

  useEffect(() => {
    if (!guide) return
    let cancelled = false
    setLoading(true)

    Promise.all(guide.facilityQueries.map(async q => {
      const params = new URLSearchParams(q.params)
      params.set('limit', '50')
      const res = await fetch(`/api/facilities?${params}`)
      const data = await res.json()
      let facilities = data.facilities || []
      if (q.clientFilter) facilities = facilities.filter(q.clientFilter)
      return { label: q.label, facilities: facilities.slice(0, 9) }
    })).then(results => {
      if (!cancelled) { setSections(results); setLoading(false) }
    }).catch(() => {
      if (!cancelled) setLoading(false)
    })

    return () => { cancelled = true }
  }, [guide])

  if (!guide) {
    return (
      <div style={s.container}>
        <p style={s.notFound}>⚠ Guide not found.</p>
        <Link to="/guides" style={s.backLink}>← Back to guides</Link>
      </div>
    )
  }

  return (
    <div>
      <section style={s.hero}>
        <div style={s.heroInner}>
          <Link to="/guides" style={s.backLink}>← All guides</Link>
          <h1 style={s.h1}>{guide.h1}</h1>
        </div>
      </section>

      <div style={s.container}>
        <div style={s.intro}>
          {guide.intro.map((p, i) => <p key={i} style={s.introPara}>{p}</p>)}
        </div>

        <div style={s.searchCta}>
          <Link to={guide.searchLink} style={s.searchCtaBtn}>
            Search these facilities on the map →
          </Link>
        </div>

        {guide.facilityQueries.length > 0 && (
          <section style={s.facilitiesSection}>
            <h2 style={s.sectionTitle}>Facilities mentioned in this guide</h2>
            {loading ? (
              <div style={s.grid}>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="skeleton" style={s.skeletonCard} />
                ))}
              </div>
            ) : (
              sections.map(section => (
                <div key={section.label} style={s.querySection}>
                  {guide.facilityQueries.length > 1 && (
                    <h3 style={s.querySectionTitle}>{section.label}</h3>
                  )}
                  {section.facilities.length === 0 ? (
                    <p style={s.emptyNote}>No verified facilities match this yet — check back soon.</p>
                  ) : (
                    <div style={s.grid}>
                      {section.facilities.map(f => <FacilityCard key={f.id} facility={f} />)}
                    </div>
                  )}
                </div>
              ))
            )}
          </section>
        )}

        <section style={s.faqSection}>
          <h2 style={s.sectionTitle}>Frequently asked questions</h2>
          <div style={s.faqList}>
            {guide.faqs.map((f, i) => (
              <div key={i} style={s.faqItem}>
                <h3 style={s.faqQ}>{f.q}</h3>
                <p style={s.faqA}>{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

const s = {
  hero: {
    background: 'linear-gradient(135deg, #0D2B3E 0%, #0A3D50 60%, #0D4A3A 100%)',
    padding: '48px 24px 44px',
  },
  heroInner: { maxWidth: 800, margin: '0 auto' },
  backLink: {
    display: 'inline-block', color: '#A8D5BA', fontSize: '0.85rem',
    fontWeight: 600, marginBottom: 18,
  },
  h1: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(1.7rem, 4vw, 2.6rem)', fontWeight: 900,
    color: '#FDFAF5', lineHeight: 1.15,
  },

  container: { maxWidth: 800, margin: '0 auto', padding: '40px 24px 80px' },
  intro: { marginBottom: 28 },
  introPara: { fontSize: '1rem', color: '#1A1208', lineHeight: 1.75, marginBottom: 16 },

  searchCta: { marginBottom: 44 },
  searchCtaBtn: {
    display: 'inline-block', padding: '12px 26px',
    background: '#E8634A', color: '#FDFAF5',
    borderRadius: 8, fontSize: '0.92rem', fontWeight: 700,
  },

  facilitiesSection: { marginBottom: 48 },
  sectionTitle: {
    fontFamily: "'Playfair Display', serif", fontSize: '1.4rem',
    color: '#0D2B3E', marginBottom: 20,
  },
  querySection: { marginBottom: 28 },
  querySectionTitle: { fontSize: '1rem', color: '#4A3F2F', fontWeight: 700, marginBottom: 12 },
  grid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16,
  },
  skeletonCard: { height: 180, borderRadius: 12 },
  emptyNote: { fontSize: '0.88rem', color: '#7A6E60', fontStyle: 'italic' },

  faqSection: {},
  faqList: { display: 'flex', flexDirection: 'column', gap: 20 },
  faqItem: {
    background: '#F5EDD6', border: '1px solid #D4C9B0', borderRadius: 10, padding: '18px 20px',
  },
  faqQ: {
    fontFamily: "'Playfair Display', serif", fontSize: '1.02rem',
    color: '#0D2B3E', marginBottom: 8,
  },
  faqA: { fontSize: '0.9rem', color: '#4A3F2F', lineHeight: 1.65 },

  notFound: { color: '#B71C1C', margin: '60px 24px 12px', textAlign: 'center' },
}
