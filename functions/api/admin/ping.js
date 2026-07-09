import { json, cors, requireAdmin } from '../../_shared.js';

export async function onRequestOptions() { return cors(); }

// Used by the admin login screen to check a password before showing the panel.
export async function onRequestGet({ request, env }) {
  const unauthorized = requireAdmin(request, env);
  if (unauthorized) return unauthorized;
  return json({ ok: true });
}
