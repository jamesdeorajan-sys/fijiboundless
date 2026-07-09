// Shared utilities for all Cloudflare Pages Functions

export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': status === 200 ? 'public, max-age=30, stale-while-revalidate=60' : 'no-store',
    },
  });
}

export function err(message, status = 400) {
  return json({ error: message }, status);
}

export function cors() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
    },
  });
}

// Gate admin-only Pages Functions behind the ADMIN_PASSWORD env var / secret.
// Returns an error Response if unauthorized, or null if the request may proceed.
export function requireAdmin(request, env) {
  const supplied = request.headers.get('X-Admin-Password') || '';
  if (!env.ADMIN_PASSWORD || supplied !== env.ADMIN_PASSWORD) {
    return err('Unauthorized', 401);
  }
  return null;
}

const VALID_VERIFY_STATUSES = ['verified', 'needs_update', 'closed_temp', 'closed_perm'];
const VALID_VERIFY_SOURCES  = ['staff', 'community', 'partner', 'ai_vision'];

// Shared by the public /api/verify and password-gated /api/admin/verify endpoints.
export async function insertVerification(env, body) {
  const { facility_id, verified_by, status, notes, verifier_name, photo_urls } = body;
  if (!facility_id || !verified_by || !status) {
    throw new Error('facility_id, verified_by, and status are required');
  }
  if (!VALID_VERIFY_STATUSES.includes(status)) throw new Error('Invalid status');
  if (!VALID_VERIFY_SOURCES.includes(verified_by)) throw new Error('Invalid verified_by');

  const result = await env.DB
    .prepare('INSERT INTO verifications (facility_id, verified_by, verifier_name, status, notes, photo_urls) VALUES (?, ?, ?, ?, ?, ?)')
    .bind(facility_id, verified_by, verifier_name || null, status, notes || null, photo_urls ? JSON.stringify(photo_urls) : null)
    .run();

  await env.DB
    .prepare("UPDATE facilities SET updated_at = datetime('now') WHERE id = ?")
    .bind(facility_id)
    .run();

  return result.meta.last_row_id;
}

export const CATEGORIES = ['toilet', 'hotel', 'restaurant', 'beach', 'transport', 'attraction', 'village', 'ferry'];
export const DIVISIONS  = ['Western', 'Central', 'Northern', 'Eastern'];

// Haversine distance in km
export function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Base facility SELECT with latest verification joined
export const FACILITY_SELECT = `
  SELECT
    f.*,
    af.step_free_entry, af.door_width_cm, af.grab_rails,
    af.roll_under_sink, af.shower_chair, af.changing_bench,
    af.accessible_parking, af.hoisting_equipment, af.pool_hoist,
    af.beach_wheelchair_available, af.all_terrain_wheelchair,
    af.sensory_friendly_rating, af.noise_level_rating,
    af.quiet_hours_start, af.quiet_hours_end,
    af.low_lighting_option, af.fidget_kit_available, af.social_story_available,
    af.braille_signage, af.hearing_loop, af.sign_language_staff,
    af.boat_accessible, af.boat_notes,
    af.accessible_vehicle_transfer,
    v.verified_at   AS last_verified,
    v.status        AS verification_status,
    v.notes         AS verification_notes,
    v.verifier_name,
    v.photo_urls,
    (SELECT COUNT(*) FROM live_alerts la
      WHERE la.facility_id = f.id AND la.is_resolved = 0) AS active_alerts
  FROM facilities f
  LEFT JOIN accessibility_features af ON af.facility_id = f.id
  LEFT JOIN verifications v ON v.id = (
    SELECT id FROM verifications
    WHERE facility_id = f.id ORDER BY verified_at DESC LIMIT 1
  )
`;
