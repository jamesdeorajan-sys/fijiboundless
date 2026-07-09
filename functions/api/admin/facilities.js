import { json, err, cors, requireAdmin, CATEGORIES, DIVISIONS } from '../../_shared.js';

export async function onRequestOptions() { return cors(); }

export async function onRequestPost({ request, env }) {
  const unauthorized = requireAdmin(request, env);
  if (unauthorized) return unauthorized;

  let body;
  try { body = await request.json(); } catch { return err('Invalid JSON'); }

  const { name, category, division, island, town_or_area, address, lat, lng, phone, website } = body;

  if (!name || !category || !division || !island || !town_or_area) {
    return err('name, category, division, island, and town_or_area are required');
  }
  if (!CATEGORIES.includes(category)) return err('Invalid category');
  if (!DIVISIONS.includes(division))  return err('Invalid division');

  const latNum = parseFloat(lat);
  const lngNum = parseFloat(lng);
  if (isNaN(latNum) || isNaN(lngNum)) return err('lat and lng must be numbers');

  try {
    const result = await env.DB
      .prepare(`INSERT INTO facilities (name, category, division, island, town_or_area, address, lat, lng, phone, website)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .bind(name, category, division, island, town_or_area, address || null, latNum, lngNum, phone || null, website || null)
      .run();

    return json({ success: true, facility_id: result.meta.last_row_id }, 201);
  } catch (e) {
    return err('Database error: ' + e.message, 500);
  }
}
