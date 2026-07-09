import { json, err, cors } from '../_shared.js';

const VALID_STATUSES = ['verified','needs_update','closed_temp','closed_perm'];
const VALID_SOURCES  = ['staff','community','partner','ai_vision'];

export async function onRequestOptions() { return cors(); }

export async function onRequestPost({ request, env }) {
  let body;
  try { body = await request.json(); } catch { return err('Invalid JSON'); }

  const { facility_id, verified_by, status, notes, verifier_name, photo_urls } = body;
  if (!facility_id || !verified_by || !status) return err('facility_id, verified_by, and status are required');
  if (!VALID_STATUSES.includes(status))  return err('Invalid status');
  if (!VALID_SOURCES.includes(verified_by)) return err('Invalid verified_by');

  try {
    const result = await env.DB
      .prepare('INSERT INTO verifications (facility_id, verified_by, verifier_name, status, notes, photo_urls) VALUES (?, ?, ?, ?, ?, ?)')
      .bind(facility_id, verified_by, verifier_name || null, status, notes || null, photo_urls ? JSON.stringify(photo_urls) : null)
      .run();

    await env.DB
      .prepare("UPDATE facilities SET updated_at = datetime('now') WHERE id = ?")
      .bind(facility_id)
      .run();

    return json({ success: true, verification_id: result.meta.last_row_id }, 201);
  } catch (e) {
    return err('Database error: ' + e.message, 500);
  }
}
