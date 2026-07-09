import { json, err, cors, haversineKm, FACILITY_SELECT } from '../_shared.js';

export async function onRequestOptions() { return cors(); }

export async function onRequestGet({ request, env }) {
  const url     = new URL(request.url);
  const userLat = parseFloat(url.searchParams.get('lat'));
  const userLng = parseFloat(url.searchParams.get('lng'));
  const limit   = Math.min(parseInt(url.searchParams.get('limit') || '5'), 20);

  if (isNaN(userLat) || isNaN(userLng)) {
    return err('lat and lng query params are required');
  }

  try {
    const { results } = await env.DB
      .prepare(FACILITY_SELECT + " WHERE f.category = 'toilet' AND f.is_active = 1")
      .all();

    const sorted = results
      .map(row => ({
        ...row,
        distance_km: parseFloat(haversineKm(userLat, userLng, row.lat, row.lng).toFixed(2)),
      }))
      .sort((a, b) => a.distance_km - b.distance_km)
      .slice(0, limit);

    return json({ user_location: { lat: userLat, lng: userLng }, nearest_toilets: sorted });
  } catch (e) {
    return err('Database error: ' + e.message, 500);
  }
}
