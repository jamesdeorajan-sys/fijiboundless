import { useState, useEffect } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      className="no-print"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={s.btn}
      aria-label="Back to top"
    >
      ↑
    </button>
  )
}

const s = {
  btn: {
    position: 'fixed', bottom: 24, right: 24, zIndex: 90,
    width: 44, height: 44, borderRadius: '50%',
    background: '#0D2B3E', color: '#A8D5BA', border: '1px solid rgba(168,213,186,0.3)',
    fontSize: '1.2rem', fontWeight: 700, boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'background 200ms',
  },
}
