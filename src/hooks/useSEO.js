import { useEffect } from 'react'

// Temporary stand-in so og:image always points at something real and
// self-hosted rather than a guessed/placeholder URL that might not resolve.
// Swap for a proper 1200x630 PNG/JPG once one exists.
const DEFAULT_OG_IMAGE = 'https://fijiboundless.pages.dev/favicon.svg'

function upsertMeta(attr, key, content, created, restored) {
  let tag = document.querySelector(`meta[${attr}="${key}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, key)
    document.head.appendChild(tag)
    created.push(tag)
  } else {
    restored.push({ tag, prev: tag.getAttribute('content') })
  }
  tag.setAttribute('content', content)
}

// No react-helmet in this project (checked package.json) — plain DOM
// title/meta/JSON-LD management is enough for a handful of static routes.
// jsonLd accepts a single schema.org object or an array of them (one
// <script> tag per item — e.g. FAQPage on guide pages, Organization on home).
export function useSEO({ title, description, jsonLd, image, type = 'website' }) {
  useEffect(() => {
    const prevTitle = document.title
    if (title) document.title = title

    const created = []
    const restored = []

    if (description) upsertMeta('name', 'description', description, created, restored)
    if (title) upsertMeta('property', 'og:title', title, created, restored)
    if (description) upsertMeta('property', 'og:description', description, created, restored)
    upsertMeta('property', 'og:type', type, created, restored)
    upsertMeta('property', 'og:url', window.location.href, created, restored)
    upsertMeta('property', 'og:image', image || DEFAULT_OG_IMAGE, created, restored)
    upsertMeta('name', 'twitter:card', 'summary_large_image', created, restored)

    const scripts = (jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []).map(item => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.text = JSON.stringify(item)
      document.head.appendChild(script)
      return script
    })

    return () => {
      document.title = prevTitle
      created.forEach(tag => document.head.removeChild(tag))
      restored.forEach(({ tag, prev }) => { if (prev !== null) tag.setAttribute('content', prev) })
      scripts.forEach(script => document.head.removeChild(script))
    }
  }, [title, description, jsonLd, image, type])
}
