-- FijiBoundless — Seed Data
-- Run: npm run db:seed          (local dev)
-- Run: npm run db:seed:remote   (production)

-- ── Facilities ────────────────────────────────────────────────────────────────
INSERT OR IGNORE INTO facilities (id, name, category, division, island, town_or_area, address, lat, lng) VALUES
(1, 'Nadi International Airport T1 – Accessible Toilet', 'toilet', 'Western', 'Viti Levu', 'Nadi', 'Nadi Airport Terminal 1, Queens Hwy', -17.7559, 177.4432),
(2, 'Port Denarau Marina – Toilet Block A',              'toilet', 'Western', 'Viti Levu', 'Nadi', 'Port Denarau Marina, Denarau Island', -17.7730, 177.3881),
(3, 'Nadi Town Market – Public Accessible Toilet',       'toilet', 'Western', 'Viti Levu', 'Nadi', 'Market Rd, Nadi Town', -17.7993, 177.4103),
(4, 'Wailoaloa Beach Public Toilet',                     'toilet', 'Western', 'Viti Levu', 'Nadi', 'Wailoaloa Rd, Nadi', -17.7872, 177.3955),
(5, 'Sofitel Fiji Resort & Spa',                         'hotel',  'Western', 'Viti Levu', 'Denarau', 'Denarau Island, Nadi', -17.7798, 177.3870),
(6, 'The Pearl South Pacific Resort',                    'hotel',  'Central', 'Viti Levu', 'Pacific Harbour', 'Queens Rd, Pacific Harbour', -18.2333, 178.1833),
(7, 'Savusavu Hot Springs Hotel',                        'hotel',  'Northern', 'Vanua Levu', 'Savusavu', 'Main St, Savusavu', -16.7833, 179.3333);

-- ── Accessibility Features ────────────────────────────────────────────────────
INSERT OR IGNORE INTO accessibility_features
  (facility_id, step_free_entry, door_width_cm, grab_rails, roll_under_sink,
   noise_level_rating, sensory_friendly_rating, hoisting_equipment,
   accessible_parking, beach_wheelchair_available, all_terrain_wheelchair)
VALUES
(1, 1, 90, 1, 1, 3, 3, 0, 1, 0, 0),
(2, 1, 88, 1, 0, 2, 4, 0, 1, 0, 0),
(3, 1, 80, 1, 0, 4, 2, 0, 0, 0, 0),
(4, 1, 85, 1, 0, 1, 5, 0, 0, 1, 0),
(5, 1, 92, 1, 1, 2, 4, 1, 1, 1, 0),
(6, 1, 90, 1, 1, 2, 4, 1, 1, 1, 0),
(7, 0, 75, 0, 0, 1, 5, 0, 0, 0, 1);

-- ── Verifications ─────────────────────────────────────────────────────────────
INSERT OR IGNORE INTO verifications (facility_id, verified_by, verifier_name, status, notes) VALUES
(1, 'staff',     'FijiBoundless Launch Audit', 'verified',      'Door 90cm. Radar key not required. Grab rails both sides.'),
(2, 'staff',     'FijiBoundless Launch Audit', 'verified',      'Step-free from carpark. Hand dryer only.'),
(3, 'community', 'Mosese V.',                  'needs_update',  'Ramp steep (~12%). Re-survey scheduled.'),
(4, 'staff',     'FijiBoundless Launch Audit', 'verified',      'Seasonal closure Nov–Apr during cyclone season.'),
(5, 'partner',   'Sofitel Fiji',               'verified',      'Pool hoist, beach wheelchair, accessible bungalows available.'),
(6, 'staff',     'FijiBoundless Launch Audit', 'verified',      'Full accessibility suite. Hoist on request.'),
(7, 'community', 'Local partner Adi T.',       'needs_update',  'Northern Division. All-terrain chair available for hire nearby.');

-- ── Live Alerts ───────────────────────────────────────────────────────────────
INSERT OR IGNORE INTO live_alerts (facility_id, alert_type, message, reported_by) VALUES
(3, 'ramp_repair', 'Ramp resurfacing in progress. Temporary plywood ramp in place — passable but uneven.', 'FijiBoundless Staff');
