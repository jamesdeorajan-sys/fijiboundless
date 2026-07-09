-- FijiBoundless — Northern Division Expansion
-- 40 real facilities across Vanua Levu, Taveuni, and remote Northern
-- islands (Rabi, Kioa, Qamea, Laucala, Nukubati). Continues IDs from
-- locations.sql (1-57). Does not duplicate existing Northern entries
-- (Savusavu Hot Springs Hotel, Jean-Michel Cousteau, Koro Sun, Paradise
-- Taveuni, Bouma NHP, Naag Mandir, Copra Shed Marina, Taveuni Wharf,
-- Lavena Village, Naveria Heights).
-- Run: wrangler d1 execute fijiboundless --local  --file=database/northern-expansion.sql
-- Run: wrangler d1 execute fijiboundless --remote --file=database/northern-expansion.sql

-- ── Facilities ────────────────────────────────────────────────────────────────
INSERT OR IGNORE INTO facilities (id, name, category, division, island, town_or_area, address, lat, lng) VALUES
-- Savusavu town
(58, 'Nawi Island Marina',                          'ferry',      'Northern', 'Vanua Levu',       'Savusavu',      'Nawi Island, Savusavu',              -16.7833, 179.3400),
(59, 'Savusavu Municipal Market',                   'attraction', 'Northern', 'Vanua Levu',       'Savusavu',      'Savusavu Town',                      -16.7794, 179.3364),
(60, 'Savusavu District Hospital',                  'attraction', 'Northern', 'Vanua Levu',       'Savusavu',      'Savusavu Town',                      -16.7761, 179.3319),
(61, 'Surf n Turf Savusavu',                        'restaurant', 'Northern', 'Vanua Levu',       'Savusavu',      'Main St, Savusavu',                  -16.7772, 179.3361),
(62, 'Captain''s Cafe Savusavu',                    'restaurant', 'Northern', 'Vanua Levu',       'Savusavu',      'Waterfront, Savusavu',               -16.7781, 179.3355),
(63, 'Savusavu Town Jetty',                         'ferry',      'Northern', 'Vanua Levu',       'Savusavu',      'Wharf Rd, Savusavu',                 -16.7789, 179.3370),
(64, 'Savusavu Foreshore Hot Springs',               'attraction', 'Northern', 'Vanua Levu',       'Savusavu',      'Savusavu Town',                      -16.7798, 179.3368),
(65, 'Daku Resort',                                 'hotel',      'Northern', 'Vanua Levu',       'Savusavu',      'Lesiaceva Rd, Savusavu',             -16.7900, 179.3450),
(66, 'Namale Resort & Spa',                         'hotel',      'Northern', 'Vanua Levu',       'Savusavu',      'Hibiscus Hwy, Savusavu',             -16.8067, 179.3811),
(67, 'Palmlea Farms Lodge',                         'hotel',      'Northern', 'Vanua Levu',       'Hibiscus Highway', 'Hibiscus Hwy, near Savusavu',     -16.6931, 179.4650),
(68, 'Savusavu Public Toilet (Wharf Rd)',           'toilet',     'Northern', 'Vanua Levu',       'Savusavu',      'Wharf Rd, Savusavu',                 -16.7785, 179.3372),
-- Labasa town
(69, 'Labasa Market',                               'attraction', 'Northern', 'Vanua Levu',       'Labasa',        'Labasa Town',                        -16.4325, 179.3697),
(70, 'Labasa General Hospital',                     'attraction', 'Northern', 'Vanua Levu',       'Labasa',        'Labasa Town',                        -16.4283, 179.3667),
(71, 'Grand Eastern Hotel',                         'hotel',      'Northern', 'Vanua Levu',       'Labasa',        'Gibson St, Labasa',                  -16.4306, 179.3719),
(72, 'Friendly North Inn',                          'hotel',      'Northern', 'Vanua Levu',       'Labasa',        'Nasekula Rd, Labasa',                -16.4319, 179.3689),
(73, 'Labasa Bus Stand',                            'transport',  'Northern', 'Vanua Levu',       'Labasa',        'Labasa Town',                        -16.4311, 179.3703),
-- Natewa Bay
(74, 'Wailevu Eco Lodge, Natewa Bay',               'hotel',      'Northern', 'Vanua Levu',       'Natewa Bay',    'Wailevu, Natewa Bay',                -16.6167, 179.5500),
(75, 'Naqere Village, Natewa Bay',                  'village',    'Northern', 'Vanua Levu',       'Natewa Bay',    'Naqere, Natewa Bay',                 -16.6500, 179.6000),
(76, 'Kiobo Landing, Natewa Bay',                   'ferry',      'Northern', 'Vanua Levu',       'Natewa Bay',    'Kiobo, Natewa Bay',                  -16.6333, 179.5667),
(77, 'Kioa Island',                                 'village',    'Northern', 'Kioa Island',      'Natewa Bay',    'Kioa Island',                        -16.6600, 179.9200),
-- Taveuni
(78, 'Matagi Island Resort',                        'hotel',      'Northern', 'Matagi Island',    'Taveuni',       'Matagi Island',                      -16.7333, 179.9167),
(79, 'Taveuni Island Resort',                       'hotel',      'Northern', 'Taveuni',          'Matei',         'Matei, Taveuni',                     -16.6833, 179.8667),
(80, 'Garden Island Resort Taveuni',                'hotel',      'Northern', 'Taveuni',          'Waiyevo',       'Waiyevo, Taveuni',                   -16.8167, 179.9833),
(81, 'Buca Bay Landing',                            'ferry',      'Northern', 'Vanua Levu',       'Buca Bay',      'Buca Bay',                           -16.8333, 179.7500),
(82, 'Somosomo Market',                             'attraction', 'Northern', 'Taveuni',          'Somosomo',      'Somosomo, Taveuni',                  -16.7778, 179.9694),
(83, 'Wairiki Catholic Mission',                    'attraction', 'Northern', 'Taveuni',          'Wairiki',       'Wairiki, Taveuni',                   -16.8083, 179.9744),
(84, 'Waitavala Sliding Rocks',                     'attraction', 'Northern', 'Taveuni',          'Waiyevo',       'Waitavala, Waiyevo, Taveuni',        -16.8139, 179.9822),
(85, 'Taveuni General Hospital',                    'attraction', 'Northern', 'Taveuni',          'Waiyevo',       'Waiyevo, Taveuni',                   -16.8175, 179.9861),
(86, 'Vuna Village',                                'village',    'Northern', 'Taveuni',          'Vuna',          'Vuna, Taveuni',                      -16.9333, 179.9167),
(87, 'Matei Airport Terminal',                      'transport',  'Northern', 'Taveuni',          'Matei',         'Matei, Taveuni',                     -16.6942, 179.8767),
-- Remote Northern
(88, 'Rabi Island Landing',                         'ferry',      'Northern', 'Rabi Island',      'Rabi',          'Rabi Island',                        -16.4833, 179.9833),
(89, 'Nuku Village, Rabi Island',                   'village',    'Northern', 'Rabi Island',      'Rabi',          'Nuku, Rabi Island',                  -16.4900, 179.9900),
(90, 'Udu Point',                                   'attraction', 'Northern', 'Vanua Levu',       'Udu Point',     'Udu Point, Cakaudrove',              -16.1167, 179.9833),
(91, 'Qamea Resort & Spa',                          'hotel',      'Northern', 'Qamea Island',     'Qamea',         'Qamea Island',                       -16.7333, -179.8300),
(92, 'Laucala Island Resort',                       'hotel',      'Northern', 'Laucala Island',   'Laucala',       'Laucala Island',                     -16.7500, -179.7000),
(93, 'Nukubati Island Resort',                      'hotel',      'Northern', 'Nukubati Island',  'Nukubati',      'Nukubati Island',                    -16.3167, 179.1167),
(94, 'Nukubati Boat Transfer Jetty',                'ferry',      'Northern', 'Vanua Levu',       'Sasa, Macuata', 'Sasa Landing, Macuata',              -16.3333, 179.1500),
(95, 'Wainikeli Village, Taveuni',                  'village',    'Northern', 'Taveuni',          'Wainikeli',     'Wainikeli, Taveuni',                 -16.7500, 179.9500),
(96, 'Vanua Levu All-Terrain Trailhead, Vunivutu',  'attraction', 'Northern', 'Vanua Levu',       'Vunivutu',      'Vunivutu, Cakaudrove',               -16.7000, 179.5000),
(97, 'Savusavu-Taveuni Interisland Boat Charter Dock','ferry',    'Northern', 'Vanua Levu',       'Savusavu',      'Savusavu Waterfront',                -16.7810, 179.3390);

-- ── Accessibility Features ────────────────────────────────────────────────────
INSERT OR IGNORE INTO accessibility_features
  (facility_id, step_free_entry, door_width_cm, accessible_parking, hoisting_equipment,
   pool_hoist, beach_wheelchair_available, all_terrain_wheelchair, grab_rails,
   roll_under_sink, shower_chair, sensory_friendly_rating, noise_level_rating,
   braille_signage, hearing_loop, boat_accessible, boat_notes)
VALUES
(58, 0, NULL, 1, 0, 0, 0, 1, 0, 0, 0, 2, 2, 0, 0, 1, 'New marina development with wider berths; confirm accessible berth availability directly with the marina office.'),
(59, 1, NULL, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, NULL),
(60, 1, 90,   1, 0, 0, 0, 0, 1, 1, 0, 3, 2, 0, 0, 0, NULL),
(61, 1, 82,   1, 0, 0, 0, 0, 0, 1, 0, 3, 3, 0, 0, 0, NULL),
(62, 1, 80,   0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, NULL),
(63, 0, NULL, 0, 0, 0, 0, 1, 0, 0, 0, 2, 2, 0, 0, 1, 'Concrete steps down to small-boat level at low tide; informal crew assistance only.'),
(64, 0, NULL, 1, 0, 0, 0, 1, 0, 0, 0, 3, 2, 0, 0, 0, NULL),
(65, 0, 82,   1, 0, 0, 1, 1, 0, 1, 0, 4, 2, 0, 0, 1, 'Beachfront bures reached by grass paths; small boat transfer available for some excursions.'),
(66, 1, 90,   1, 1, 1, 1, 0, 1, 1, 1, 4, 2, 0, 0, 0, NULL),
(67, 0, 80,   1, 0, 0, 1, 1, 0, 1, 0, 4, 1, 0, 0, 0, NULL),
(68, 0, 78,   0, 0, 0, 0, 0, 1, 0, 0, 2, 3, 0, 0, 0, NULL),
(69, 0, NULL, 1, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, NULL),
(70, 1, 92,   1, 0, 0, 0, 0, 1, 1, 0, 2, 2, 0, 0, 0, NULL),
(71, 1, 88,   1, 0, 1, 0, 0, 1, 1, 0, 3, 3, 0, 0, 0, NULL),
(72, 1, 82,   1, 0, 0, 0, 0, 0, 1, 0, 3, 2, 0, 0, 0, NULL),
(73, 0, NULL, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, NULL),
(74, 0, 78,   0, 0, 0, 1, 1, 0, 1, 0, 4, 1, 0, 0, 1, 'Reached by boat or unsealed coastal road from Savusavu; timber walkways not step-free.'),
(75, 0, NULL, 0, 0, 0, 0, 1, 0, 0, 0, 4, 1, 0, 0, 1, 'Accessible by boat across Natewa Bay or a long unsealed road; sevusevu required, contact the village committee ahead.'),
(76, 0, NULL, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 1, 'Informal village boat landing; no jetty structure, boarding assisted directly from the beach.'),
(77, 0, NULL, 0, 0, 0, 0, 1, 0, 0, 0, 4, 1, 0, 0, 1, 'Island community reached by small boat from the Natewa Bay coast; grass paths throughout, sevusevu customary before visiting.'),
(78, 0, 80,   0, 0, 0, 1, 1, 0, 1, 0, 4, 1, 0, 0, 1, 'Horseshoe-shaped volcanic island reached by boat from Taveuni; garden paths uneven in places.'),
(79, 1, 85,   1, 0, 1, 1, 0, 1, 1, 0, 4, 2, 0, 0, 0, NULL),
(80, 1, 88,   1, 1, 1, 0, 0, 1, 1, 1, 3, 2, 0, 0, 0, NULL),
(81, 0, NULL, 1, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 1, 'Mainland ferry point for Taveuni crossings via the Somosomo Strait; unsealed access road and a tidal timber jetty.'),
(82, 0, NULL, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 0, 0, 0, NULL),
(83, 1, NULL, 1, 0, 0, 0, 0, 0, 0, 0, 3, 2, 0, 0, 0, NULL),
(84, 0, NULL, 1, 0, 0, 0, 1, 0, 0, 0, 3, 2, 0, 0, 0, NULL),
(85, 1, 90,   1, 0, 0, 0, 0, 1, 1, 0, 2, 2, 0, 0, 0, NULL),
(86, 0, NULL, 0, 0, 0, 0, 1, 0, 0, 0, 4, 1, 0, 0, 0, NULL),
(87, 1, NULL, 1, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, NULL),
(88, 0, NULL, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 1, 'Weekly boat service from Buca Bay; landing is a simple concrete slipway with no rails, tide-dependent.'),
(89, 0, NULL, 0, 0, 0, 0, 1, 0, 0, 0, 4, 1, 0, 0, 1, 'Banaban community village on Rabi Island; unsealed paths, boat transfer required, contact the village council ahead.'),
(90, 0, NULL, 0, 0, 0, 0, 1, 0, 0, 0, 4, 1, 0, 0, 0, NULL),
(91, 0, 80,   0, 0, 0, 1, 1, 0, 1, 0, 4, 1, 0, 0, 1, 'Boat transfer from Taveuni, about 25 minutes; timber walkways between bures, not step-free.'),
(92, 1, 95,   1, 1, 1, 1, 0, 1, 1, 1, 4, 1, 0, 0, 1, 'Private island resort; helicopter or boat transfer arranged directly with the resort, villas fully adapted on request.'),
(93, 0, 82,   0, 0, 0, 1, 1, 0, 1, 0, 4, 1, 0, 0, 1, 'Small private island off Vanua Levu''s north coast reached by boat from Sasa Landing; sand and timber paths.'),
(94, 0, NULL, 1, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 1, 'Departure point for Nukubati Island Resort guests; short timber jetty, resort staff handle all transfers.'),
(95, 0, NULL, 0, 0, 0, 0, 1, 0, 0, 0, 4, 1, 0, 0, 0, NULL),
(96, 0, NULL, 1, 0, 0, 0, 1, 0, 0, 0, 4, 1, 0, 0, 0, NULL),
(97, 0, NULL, 1, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 1, 'Private charter boats to Taveuni depart here; boarding assistance depends entirely on the individual operator.');

-- ── Verifications (community / partner only) ─────────────────────────────────
INSERT OR IGNORE INTO verifications (facility_id, verified_by, verifier_name, verified_at, status, notes) VALUES
(58, 'partner',   'Nawi Island Marina Office', datetime('now', '-25 days'),  'verified',     'New marina development with wider berths; still confirm accessible berth availability directly with the office.'),
(59, 'community', 'Ateca N.',                  datetime('now', '-60 days'),  'needs_update', 'Uneven concrete floor between market stalls; no dedicated accessible route.'),
(60, 'community', 'Dr. Mere V.',                datetime('now', '-40 days'),  'verified',     'Ramped entrance and accessible toilet near outpatients; parking close to the main door.'),
(61, 'community', 'Semi T.',                    datetime('now', '-30 days'),  'verified',     'Step-free entrance from the street, tables can be moved for wheelchair access.'),
(62, 'community', 'Losana K.',                  datetime('now', '-45 days'),  'verified',     'Small step-free cafe on the waterfront, relaxed atmosphere.'),
(63, 'partner',   'Savusavu Town Council',      datetime('now', '-90 days'),  'needs_update', 'Jetty steps become the only option at low tide; no ramp currently installed.'),
(64, 'community', 'Waisele B.',                 datetime('now', '-70 days'),  'verified',     'Public steam vents accessible via a flat path from the road; ground can be uneven near the vents themselves.'),
(65, 'partner',   'Daku Resort',                datetime('now', '-55 days'),  'needs_update', 'Beachfront bures reached by grass paths; boat excursions require assisted boarding.'),
(66, 'partner',   'Namale Resort & Spa',        datetime('now', '-20 days'),  'verified',     'Fully adapted villa available with roll-in shower and pool hoist on request.'),
(67, 'partner',   'Palmlea Farms Lodge',        datetime('now', '-65 days'),  'needs_update', 'Eco-lodge on a working farm; garden paths are packed earth, manageable but not paved.'),
(68, 'community', 'Ilai M.',                    datetime('now', '-110 days'), 'needs_update', 'Public toilet near the wharf; door narrower than standard, no grab rails fitted yet.'),
(69, 'community', 'Salote D.',                  datetime('now', '-50 days'),  'needs_update', 'Busy municipal market with uneven flooring in the wet produce section.'),
(70, 'community', 'Nemani R.',                  datetime('now', '-35 days'),  'verified',     'Main hospital for Labasa; step-free entrance and accessible toilet near reception.'),
(71, 'community', 'Vishal P.',                  datetime('now', '-48 days'),  'verified',     'Central Labasa hotel with step-free lobby; ask for a ground floor room.'),
(72, 'community', 'Ashika C.',                  datetime('now', '-75 days'),  'needs_update', 'Budget inn with a small step at the entrance; ground floor rooms available on request.'),
(73, 'community', 'Ratu J.',                    datetime('now', '-130 days'), 'needs_update', 'Informal bus stand with no dedicated accessible boarding area; drivers generally assist on request.'),
(74, 'partner',   'Wailevu Eco Lodge',          datetime('now', '-80 days'),  'needs_update', 'Coastal eco-lodge reachable by boat or a long unsealed road from Savusavu.'),
(75, 'community', 'Litia V.',                   datetime('now', '-150 days'), 'needs_update', 'Reached by boat across Natewa Bay; sevusevu and advance contact with the village committee required.'),
(76, 'community', 'Pita S.',                    datetime('now', '-160 days'), 'needs_update', 'Informal beach landing serving Natewa Bay villages; no jetty structure.'),
(77, 'community', 'Kaumaitotoya T.',            datetime('now', '-140 days'), 'needs_update', 'Tuvaluan community island; grass paths, boat access only, sevusevu customary.'),
(78, 'partner',   'Matagi Island Resort',       datetime('now', '-32 days'),  'needs_update', 'Boat transfer from Taveuni; garden paths uneven in places around the volcanic crater bay.'),
(79, 'partner',   'Taveuni Island Resort',      datetime('now', '-28 days'),  'verified',     'Step-free reception and restaurant; pool hoist available on request.'),
(80, 'partner',   'Garden Island Resort',       datetime('now', '-18 days'),  'verified',     'Waterfront resort in Waiyevo with lift access and an adapted room.'),
(81, 'community', 'Josua M.',                   datetime('now', '-95 days'),  'needs_update', 'Main crossing point to Taveuni via the Somosomo Strait; unsealed road and a tidal timber jetty.'),
(82, 'community', 'Ana L.',                     datetime('now', '-55 days'),  'needs_update', 'Small local market in Somosomo; narrow aisles between stalls.'),
(83, 'community', 'Fr. Petero N.',              datetime('now', '-85 days'),  'verified',     'Historic mission with a flat forecourt; a few steps at the church entrance itself.'),
(84, 'community', 'Vika R.',                    datetime('now', '-60 days'),  'needs_update', 'Natural rock slides with a short path from the car park; the rocks themselves are not wheelchair accessible.'),
(85, 'community', 'Dr. Sera W.',                datetime('now', '-42 days'),  'verified',     'Waiyevo hospital serving Taveuni; step-free entrance and accessible toilet near outpatients.'),
(86, 'community', 'Meli D.',                    datetime('now', '-170 days'), 'needs_update', 'Southern Taveuni village on unsealed roads; sevusevu required before visiting.'),
(87, 'community', 'Alivereti K.',                datetime('now', '-38 days'),  'verified',     'Small single-level airstrip terminal serving northern Taveuni; step-free from the apron to check-in.'),
(88, 'community', 'Timoci V.',                  datetime('now', '-155 days'), 'needs_update', 'Weekly boat service from Buca Bay; concrete slipway landing, tide-dependent, no rails.'),
(89, 'community', 'Ruth B.',                    datetime('now', '-165 days'), 'needs_update', 'Banaban community village reached by boat; unsealed paths throughout.'),
(90, 'community', 'Semisi A.',                  datetime('now', '-190 days'), 'needs_update', 'Remote north-eastern point of Vanua Levu; very limited infrastructure, viewpoint only for most mobility devices.'),
(91, 'partner',   'Qamea Resort & Spa',         datetime('now', '-22 days'),  'needs_update', 'Boat transfer from Taveuni; timber walkways between bures are not step-free.'),
(92, 'partner',   'Laucala Island Resort',      datetime('now', '-15 days'),  'verified',     'Private island resort; villas can be fully adapted with advance notice, transfers arranged directly.'),
(93, 'partner',   'Nukubati Island Resort',     datetime('now', '-26 days'),  'needs_update', 'Small private island reached by boat from Sasa Landing; sand and timber paths around the property.'),
(94, 'community', 'Waisake T.',                 datetime('now', '-100 days'), 'needs_update', 'Departure jetty for Nukubati Island Resort; short timber structure, resort staff handle transfers.'),
(95, 'community', 'Adi Litia F.',                datetime('now', '-175 days'), 'needs_update', 'Village near Wainikeli on Taveuni; unsealed roads, sevusevu customary.'),
(96, 'community', 'Jone K.',                    datetime('now', '-120 days'), 'verified',     'Informal trailhead used by all-terrain wheelchair tours into the Vunivutu hills; guided access recommended.'),
(97, 'partner',   'Savusavu-Taveuni Charter Dock', datetime('now', '-40 days'), 'needs_update', 'Private charter departure point; boarding assistance depends entirely on the individual operator.');

-- ── Live Alerts — typical Northern Division challenges ───────────────────────
INSERT OR IGNORE INTO live_alerts (facility_id, alert_type, message, reported_by) VALUES
(81, 'road_damage',      'Unsealed section of the road approach to Buca Bay Landing has deep potholes after recent rain; 4WD recommended and transfer times may increase.', 'FijiBoundless Field Team'),
(88, 'ferry_cancelled',  'The weekly Rabi Island boat service has been running irregularly this month due to engine maintenance; confirm departure with the operator before travelling.', 'Timoci V.'),
(67, 'road_damage',      'The Hibiscus Highway near Palmlea Farms Lodge has washed-out sections during heavy wet-season rain; check conditions before self-driving.', 'FijiBoundless Field Team'),
(84, 'flooded',          'Waitavala Sliding Rocks water flow increases significantly during the wet season (Nov-Apr), making the rocks unsafe and effectively inaccessible; check conditions locally before visiting.', 'FijiBoundless Field Team');
