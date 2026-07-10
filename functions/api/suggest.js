import { json, err, cors, CATEGORIES } from '../_shared.js';

export async function onRequestOptions() { return cors(); }

export async function onRequestPost({ request, env }) {
  let body;
  try { body = await request.json(); } catch { return err('Invalid JSON'); }

  const { placeName, address, category, accessibilityNotes, submitterEmail } = body;
  if (!placeName) return err('placeName is required');
  if (category && !CATEGORIES.includes(category)) return err('Invalid category');

  try {
    const result = await env.DB
      .prepare(`INSERT INTO suggestions (place_name, address, category, accessibility_notes, submitter_email)
                VALUES (?, ?, ?, ?, ?)`)
      .bind(placeName, address || null, category || null, accessibilityNotes || null, submitterEmail || null)
      .run();

    // Email notification intentionally not wired up: Cloudflare Email Workers
    // needs a send_email binding plus a verified sending domain, neither of
    // which is configured for this project. Suggestions are stored in D1
    // (visible to admins there) — add the binding + send call here once
    // Email Workers is set up, without needing to change this response shape.

    return json({ success: true, suggestion_id: result.meta.last_row_id }, 201);
  } catch (e) {
    return err('Database error: ' + e.message, 500);
  }
}
