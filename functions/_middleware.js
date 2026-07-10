// Runs in front of every request (pages + API) in this Pages deployment.
// Cloudflare Bulk Redirects/Redirect Rules can't do this: they only see
// traffic for zones in your own account, and fijiboundless.pages.dev is a
// subdomain of Cloudflare's own pages.dev zone, not yours. This middleware
// is what actually intercepts it, since it runs inside your deployment.
const OLD_HOST = 'fijiboundless.pages.dev';
const NEW_HOST = 'fijiboundless.com';

// img-src allows any https host (not just 'self') because facility photos
// and verification photo_urls are arbitrary third-party URLs submitted via
// /api/suggest and the admin panel — we don't control that host list.
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: https:",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  if (url.hostname === OLD_HOST) {
    url.hostname = NEW_HOST;
    return Response.redirect(url.toString(), 301);
  }

  const response = await next();
  const headers = new Headers(response.headers);
  headers.set('Content-Security-Policy', CSP);
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Permissions-Policy', 'geolocation=(self), camera=(), microphone=()');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
