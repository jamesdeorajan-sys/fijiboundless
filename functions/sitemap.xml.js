import { GUIDES } from '../src/data/guides.js'

const SITE = 'https://fijiboundless.pages.dev'

// Guides content was last touched (added/edited) on this date — used as a
// single, honest <lastmod> for all guide URLs rather than fabricating
// distinct per-guide edit history we don't actually track.
const GUIDES_LAST_UPDATED = '2026-07-10'

// path -> { changefreq, priority }. /admin is deliberately excluded from
// the sitemap. Anything not listed here still gets a sane default.
const STATIC_ROUTES = [
  { path: '/',          changefreq: 'daily',   priority: '1.0' },
  { path: '/search',    changefreq: 'daily',   priority: '0.9' },
  { path: '/concierge', changefreq: 'weekly',  priority: '0.9' },
  { path: '/guides',    changefreq: 'monthly', priority: '0.8' },
  { path: '/about',     changefreq: 'monthly', priority: '0.7' },
  { path: '/partner',   changefreq: 'monthly', priority: '0.7' },
  { path: '/suggest',   changefreq: 'monthly', priority: '0.6' },
  { path: '/tools/doorway-check',    changefreq: 'monthly', priority: '0.6' },
  { path: '/tools/score-calculator', changefreq: 'monthly', priority: '0.6' },
];

export async function onRequestGet() {
  const entries = [
    ...STATIC_ROUTES,
    ...GUIDES.map(g => ({
      path: `/guides/${g.slug}`,
      changefreq: 'monthly',
      priority: '0.8',
      lastmod: GUIDES_LAST_UPDATED,
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(e => `  <url>
    <loc>${SITE}${e.path}</loc>${e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : ''}
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
