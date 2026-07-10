// Runs in front of every request (pages + API) in this Pages deployment.
// Cloudflare Bulk Redirects/Redirect Rules can't do this: they only see
// traffic for zones in your own account, and fijiboundless.pages.dev is a
// subdomain of Cloudflare's own pages.dev zone, not yours. This middleware
// is what actually intercepts it, since it runs inside your deployment.
const OLD_HOST = 'fijiboundless.pages.dev';
const NEW_HOST = 'fijiboundless.com';

export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  if (url.hostname === OLD_HOST) {
    url.hostname = NEW_HOST;
    return Response.redirect(url.toString(), 301);
  }
  return next();
}
