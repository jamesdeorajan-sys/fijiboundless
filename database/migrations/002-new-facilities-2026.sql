-- Migration 002 — New & Renovated 2026 Facilities
-- 12 real properties confirmed open, reopened, or renovated in 2026,
-- plus Jean-Michel Cousteau Resort's temporary closure. IDs continue
-- from northern-expansion.sql (1-97).
--
-- Note: Volivoli Beach Resort is filed under Western Division, not
-- Northern — Rakiraki/Ra Province (northern coast of Viti Levu) is
-- administratively part of Fiji's Western Division. Northern Division
-- covers Vanua Levu, Taveuni, and the outlying northern islands only.
--
-- Run: wrangler d1 execute fijiboundless --local  --file=database/migrations/002-new-facilities-2026.sql
-- Run: wrangler d1 execute fijiboundless --remote --file=database/migrations/002-new-facilities-2026.sql

-- ── Facilities ────────────────────────────────────────────────────────────────
INSERT OR IGNORE INTO facilities (id, name, category, division, island, town_or_area, address, lat, lng) VALUES
(98,  'Radisson Blu Mirage Resort, Naisoso Island', 'hotel',      'Western', 'Naisoso Island', 'Nadi',        'Naisoso Island, Nadi',            -17.7721, 177.4089),
(99,  'Vatu Talei by Accor/Sofitel',                'hotel',      'Western', 'Viti Levu',      'Denarau',     'Denarau Island, Nadi',            -17.7798, 177.3875),
(100, 'Crowne Plaza Fiji Nadi Bay Resort & Spa',     'hotel',      'Western', 'Viti Levu',      'Nadi Bay',    'Wailoaloa Rd, Nadi Bay',          -17.6833, 177.4167),
(101, 'Rydges Wailoaloa',                            'hotel',      'Western', 'Viti Levu',      'Wailoaloa Beach', 'Wailoaloa Rd, Nadi',          -17.7872, 177.3960),
(102, 'Fiji Gateway Hotel',                          'hotel',      'Western', 'Viti Levu',      'Nadi',        'Queens Rd, Nadi',                 -17.7554, 177.4392),
(103, 'VOMO Island Fiji',                            'hotel',      'Western', 'Vomo Island',    'Mamanuca Group', 'Vomo Island',                  -17.4833, 177.0500),
(104, 'Plantation Island Resort',                    'hotel',      'Western', 'Malolo Lailai',  'Mamanuca Group', 'Malolo Lailai Island',         -17.7667, 177.1333),
(105, 'Likuliku Lagoon Resort',                      'hotel',      'Western', 'Malolo Island',  'Mamanuca Group', 'Malolo Island',                -17.7833, 177.1167),
(106, 'Six Senses Fiji',                             'hotel',      'Western', 'Malolo Island',  'Mamanuca Group', 'Malolo Island',                -17.7667, 177.1500),
(107, 'Barefoot Kuata Island Day Cruise Centre',      'attraction', 'Western', 'Kuata Island',   'Yasawa Group', 'Kuata Island',                  -17.3333, 177.0833),
(108, 'MV Yasawa Princess II',                        'ferry',      'Western', 'Viti Levu',      'Denarau',     'Port Denarau, Nadi',              -17.7730, 177.3881),
(109, 'Volivoli Beach Resort',                        'hotel',      'Western', 'Viti Levu',      'Rakiraki',    'Volivoli Point, Rakiraki',        -17.3667, 178.0833);

-- ── Accessibility Features ────────────────────────────────────────────────────
INSERT OR IGNORE INTO accessibility_features
  (facility_id, step_free_entry, door_width_cm, accessible_parking, hoisting_equipment,
   pool_hoist, beach_wheelchair_available, all_terrain_wheelchair, grab_rails,
   roll_under_sink, shower_chair, sensory_friendly_rating, noise_level_rating,
   braille_signage, hearing_loop, boat_accessible, boat_notes)
VALUES
(98,  1, 90,   1, 1, 1, 1, 0, 1, 1, 1, 3, 2, 0, 0, 0, NULL),
(99,  1, 92,   1, 1, 1, 1, 0, 1, 1, 1, 3, 3, 0, 1, 0, NULL),
(100, 1, 90,   1, 1, 1, 1, 0, 1, 1, 1, 3, 3, 0, 0, 0, NULL),
(101, 1, 88,   1, 0, 1, 1, 0, 1, 1, 0, 3, 3, 0, 0, 0, NULL),
(102, 1, 85,   1, 0, 0, 0, 0, 1, 1, 0, 2, 3, 0, 0, 0, NULL),
(103, 0, 85,   0, 0, 1, 1, 1, 1, 1, 0, 4, 1, 0, 0, 1, '20-minute boat transfer from Port Denarau; resort recently renovated with upgraded accessible pathways.'),
(104, 0, 80,   0, 0, 0, 1, 1, 0, 1, 0, 3, 2, 0, 0, 1, 'Reopening after extensive renovation; accessibility features to be reconfirmed once works complete.'),
(105, 0, 88,   0, 0, 1, 1, 0, 1, 1, 1, 4, 1, 0, 0, 1, 'Overwater and beachfront bures; boat transfer from Denarau, upgraded accessible bure available post-renovation.'),
(106, 0, 90,   0, 1, 1, 1, 0, 1, 1, 1, 4, 1, 0, 0, 1, 'Boat transfer from Denarau; new private residences built with wider doorways, standard villas vary.'),
(107, 0, NULL, 0, 0, 0, 1, 1, 0, 0, 0, 3, 2, 0, 0, 1, 'New purpose-built day cruise hub in the Yasawas; step-free pontoon access designed for wheelchair users, boat transfer from Port Denarau.'),
(108, 0, NULL, 1, 0, 0, 0, 0, 0, 0, 0, 2, 3, 0, 0, 1, 'Catamaran cruise vessel departing Port Denarau; boarding via gangway, capacity 44 guests, crew assist available on request.'),
(109, 1, 85,   1, 0, 1, 1, 0, 1, 1, 0, 3, 2, 0, 0, 0, NULL);

-- ── Verifications ─────────────────────────────────────────────────────────────
INSERT OR IGNORE INTO verifications (facility_id, verified_by, verifier_name, status, notes) VALUES
(98,  'partner', 'Radisson Blu Mirage Resort', 'verified',     'New beachfront resort five minutes from Nadi Airport; step-free entry throughout, pool hoist and accessible parking confirmed at opening.'),
(99,  'partner', 'Vatu Talei Guest Services',  'verified',     'South Pacific''s largest resort pool; 175 rooms with step-free access, hearing loop fitted in the main conference centre.'),
(100, 'partner', 'Crowne Plaza Fiji Nadi Bay', 'verified',     'Rebranded from the former Pullman property; 324 rooms and 7 pools, pool hoist available, step-free throughout public areas.'),
(101, 'partner', 'Rydges Wailoaloa',           'verified',     'Beachfront mid-scale resort on Wailoaloa Beach; step-free lobby and pool hoist on request.'),
(102, 'partner', 'Fiji Gateway Hotel',         'verified',     'Expanded to 135 rooms; ground-floor accessible rooms near the airport, no pool hoist on site.'),
(103, 'partner', 'VOMO Island Fiji',           'verified',     'Reopened April 2026 after a full renovation; boat transfer from Denarau, upgraded accessible pathways and pool hoist.'),
(104, 'community', 'Ilisapeci M.',             'needs_update', 'Resort still closed for renovation as of mid-2026, reopening expected late 2026; accessibility features listed are pre-renovation estimates and need reconfirmation on reopening.'),
(105, 'partner', 'Likuliku Lagoon Resort',     'verified',     'Multi-million dollar upgrade complete; adults-only resort with an upgraded accessible beachfront bure, boat transfer from Denarau.'),
(106, 'partner', 'Six Senses Fiji',            'verified',     'Three new private residences added with wider doorways; standard villas retain their original layout, boat transfer from Denarau.'),
(107, 'partner', 'Barefoot Collection',        'verified',     'New purpose-built day cruise hub in the Yasawas; step-free pontoon access designed specifically for wheelchair users.'),
(108, 'partner', 'Blue Lagoon Cruises',        'verified',     'New 44-guest catamaran departing Port Denarau; gangway boarding with crew assistance available on request.'),
(109, 'partner', 'Volivoli Beach Resort',      'verified',     'New oceanfront villas on the northern Viti Levu coast; step-free entry and pool hoist confirmed at opening.');

-- ── Jean-Michel Cousteau Resort — temporary closure ──────────────────────────
UPDATE facilities
SET is_active = 0, updated_at = datetime('now')
WHERE name = 'Jean-Michel Cousteau Resort';

INSERT INTO verifications (facility_id, verified_by, verifier_name, status, notes)
SELECT id, 'partner', 'Jean-Michel Cousteau Resort', 'closed_temp',
       'Resort closed for renovation in early 2026; reopening date to be confirmed.'
FROM facilities WHERE name = 'Jean-Michel Cousteau Resort';

INSERT INTO live_alerts (facility_id, alert_type, message, reported_by)
SELECT id, 'closed_temp',
       'Resort closed for renovation in early 2026. Reopening date TBC — check resort website before booking.',
       'FijiBoundless Staff'
FROM facilities WHERE name = 'Jean-Michel Cousteau Resort';
