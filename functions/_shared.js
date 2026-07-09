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
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

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
