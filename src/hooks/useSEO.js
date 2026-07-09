import { useEffect } from 'react'

// No react-helmet in this project (checked package.json) — plain DOM
// title/meta/JSON-LD management is enough for a handful of static routes.
export function useSEO({ title, description, faqJsonLd }) {
  useEffect(() => {
    const prevTitle = document.title
    if (title) document.title = title

    let metaTag = null
    let prevDescription = null
    if (description) {
      metaTag = document.querySelector('meta[name="description"]')
      if (!metaTag) {
        metaTag = document.createElement('meta')
        metaTag.setAttribute('name', 'description')
        document.head.appendChild(metaTag)
      }
      prevDescription = metaTag.getAttribute('content')
      metaTag.setAttribute('content', description)
    }

    let script = null
    if (faqJsonLd) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.text = JSON.stringify(faqJsonLd)
      document.head.appendChild(script)
    }

    return () => {
      document.title = prevTitle
      if (metaTag && prevDescription !== null) metaTag.setAttribute('content', prevDescription)
      if (script) document.head.removeChild(script)
    }
  }, [title, description, faqJsonLd])
}
