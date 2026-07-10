import { json, err, cors, haversineKm, FACILITY_SELECT } from '../_shared.js';

export async function onRequestOptions() { return cors(); }

export async function onRequestGet({ request, env, waitUntil }) {
  const url      = new URL(request.url);
  const category = url.searchParams.get('category');
  const division = url.searchParams.get('division');
  const island   = url.searchParams.get('island');
  const userLat  = parseFloat(url.searchParams.get('lat'));
  const userLng  = parseFloat(url.searchParams.get('lng'));
  const radiusKm = parseFloat(url.searchParams.get('radius_km') || '20');
  const limit    = Math.min(parseInt(url.searchParams.get('limit') || '20'), 100);
  const hasGps   = !isNaN(userLat) && !isNaN(userLng);

  try {
    let query    = FACILITY_SELECT + ' WHERE f.is_active = 1';
    const params = [];

    if (category) { query += ' AND f.category = ?'; params.push(category); }
    if (division) { query += ' AND f.division = ?'; params.push(division); }
    if (island)   { query += ' AND f.island = ?';   params.push(island);   }

    query += ' ORDER BY f.name LIMIT ?';
    params.push(limit);

    const { results } = await env.DB.prepare(query).bind(...params).all();

    let output = results;
    if (hasGps) {
      output = results
        .map(row => ({
          ...row,
          distance_km: parseFloat(haversineKm(userLat, userLng, row.lat, row.lng).toFixed(2)),
        }))
        .filter(row => row.distance_km <= radiusKm)
        .sort((a, b) => a.distance_km - b.distance_km);
    }

    waitUntil(
      env.DB.prepare(
        'INSERT INTO searches_log (category, division, island, has_gps, result_count) VALUES (?, ?, ?, ?, ?)'
      ).bind(category || null, division || null, island || null, hasGps ? 1 : 0, output.length).run().catch(() => {})
    );

    return json({ count: output.length, facilities: output });
  } catch (e) {
    return err('Database error: ' + e.message, 500);
  }
}
