import { GUIDES } from '../src/data/guides.js'

const SITE = 'https://fijiboundless.pages.dev'

// Static, crawlable routes — /admin is deliberately excluded from the sitemap.
const STATIC_ROUTES = ['/', '/search', '/concierge', '/guides']

export async function onRequestGet() {
  const urls = [
    ...STATIC_ROUTES,
    ...GUIDES.map(g => `/guides/${g.slug}`),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(path => `  <url><loc>${SITE}${path}</loc></url>`).join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
