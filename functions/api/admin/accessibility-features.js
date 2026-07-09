import { json, err, cors, requireAdmin } from '../../_shared.js';

export async function onRequestOptions() { return cors(); }

// Boolean-ish columns (0/1) vs. free-form columns (number/text), all default to
// "not set" when omitted so a partial assessment doesn't need every field.
const BOOL_COLS = [
  'step_free_entry', 'accessible_parking', 'hoisting_equipment', 'pool_hoist',
  'beach_wheelchair_available', 'all_terrain_wheelchair', 'grab_rails',
  'roll_under_sink', 'shower_chair', 'changing_bench', 'low_lighting_option',
  'fidget_kit_available', 'social_story_available', 'braille_signage',
  'audio_description', 'hearing_loop', 'sign_language_staff',
  'accessible_vehicle_transfer', 'boat_accessible',
];
const OTHER_COLS = [
  'ramp_gradient_percent', 'door_width_cm', 'turning_circle_cm',
  'sensory_friendly_rating', 'quiet_hours_start', 'quiet_hours_end',
  'noise_level_rating', 'boat_notes',
];
const ALL_COLS = [...BOOL_COLS, ...OTHER_COLS];

export async function onRequestPost({ request, env }) {
  const unauthorized = requireAdmin(request, env);
  if (unauthorized) return unauthorized;

  let body;
  try { body = await request.json(); } catch { return err('Invalid JSON'); }

  const facilityId = parseInt(body.facility_id);
  if (isNaN(facilityId)) return err('facility_id is required');

  const values = ALL_COLS.map(col => {
    if (body[col] === undefined || body[col] === null || body[col] === '') {
      return BOOL_COLS.includes(col) ? 0 : null;
    }
    return BOOL_COLS.includes(col) ? (body[col] ? 1 : 0) : body[col];
  });

  const updateClause = ALL_COLS.map(c => `${c} = excluded.${c}`).join(', ');

  try {
    const facility = await env.DB.prepare('SELECT id FROM facilities WHERE id = ?').bind(facilityId).first();
    if (!facility) return err('Facility not found', 404);

    await env.DB
      .prepare(`INSERT INTO accessibility_features (facility_id, ${ALL_COLS.join(', ')}, updated_at)
                VALUES (?, ${ALL_COLS.map(() => '?').join(', ')}, datetime('now'))
                ON CONFLICT(facility_id) DO UPDATE SET ${updateClause}, updated_at = datetime('now')`)
      .bind(facilityId, ...values)
      .run();

    return json({ success: true, facility_id: facilityId }, 201);
  } catch (e) {
    return err('Database error: ' + e.message, 500);
  }
}
