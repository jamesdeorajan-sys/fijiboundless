-- Migration 006 — Priority Facilities from Accessible Travel Research
--
-- Several requested facilities already exist in the database under the
-- same real-world name (Hilton Fiji Beach Resort & Spa id=10, InterContinental
-- Fiji Golf Resort & Spa id=15, Natadola Beach id=16, Holiday Inn Suva id=27,
-- Fiji Museum id=32, Paradise Taveuni id=42, Bouma National Heritage Park
-- id=43). Those are UPDATEd with the new research plus a fresh verification
-- row rather than re-inserted as duplicate facilities.
--
-- Geographic correction: Shangri-La Yanuca Island, InterContinental Natadola,
-- The Warwick Fiji, and Natadola Beach are all in Nadroga-Navosa Province,
-- which is Fiji's WESTERN Division — not Central. (Pacific Harbour further
-- along the Coral Coast is genuinely Central/Serua Province; these Coral
-- Coast properties further west are not.)
--
-- New facilities continue IDs from migration 002 (up to 109).
-- Run: wrangler d1 execute fijiboundless --local  --file=database/migrations/006-priority-facilities.sql
-- Run: wrangler d1 execute fijiboundless --remote --file=database/migrations/006-priority-facilities.sql

-- ── New Facilities ────────────────────────────────────────────────────────────
INSERT OR IGNORE INTO facilities (id, name, category, division, island, town_or_area, address, lat, lng) VALUES
(110, 'Tourist Transport Fiji (TTF)',            'transport', 'Western', 'Viti Levu', 'Nadi',        'Port Denarau Marina, Nadi', -17.7730, 177.3881),
(111, 'Rosie Holidays Accessible Transfers',     'transport', 'Western', 'Viti Levu', 'Nadi',        'Wailoaloa Rd, Nadi',        -17.7872, 177.3960),
(112, 'Shangri-La Yanuca Island Fiji',           'hotel',     'Western', 'Yanuca Island', 'Coral Coast', 'Yanuca Island, Coral Coast', -17.9833, 177.8833),
(113, 'Sheraton Fiji Golf & Beach Resort',       'hotel',     'Western', 'Viti Levu', 'Denarau',     'Denarau Island, Nadi',      -17.7780, 177.3870),
(114, 'The Warwick Fiji',                        'hotel',     'Western', 'Viti Levu', 'Coral Coast', 'Queens Rd, Korolevu',       -18.1500, 177.9000);

-- ── Accessibility Features for new facilities ────────────────────────────────
INSERT OR IGNORE INTO accessibility_features
  (facility_id, step_free_entry, door_width_cm, accessible_parking, hoisting_equipment,
   pool_hoist, beach_wheelchair_available, all_terrain_wheelchair, grab_rails,
   roll_under_sink, shower_chair, changing_bench, sensory_friendly_rating, noise_level_rating,
   audio_description, accessible_vehicle_transfer, boat_accessible)
VALUES
(110, 0, NULL, 1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 0, 1, 0),
(111, 0, NULL, 1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 0, 1, 0),
(112, 1, 92,   1, 0, 1, 1, 0, 1, 1, 1, 0, 4, 2, 0, 0, 0),
(113, 1, 90,   1, 0, 1, 0, 0, 1, 1, 0, 0, 3, 3, 0, 0, 0),
(114, 1, 85,   1, 0, 0, 0, 0, 1, 0, 1, 1, 3, 3, 0, 0, 0);

-- ── Verifications for new facilities ──────────────────────────────────────────
INSERT INTO verifications (facility_id, verified_by, verifier_name, status, notes) VALUES
(110, 'community', 'Accessible Travel Research Compilation', 'verified', 'The only wheelchair-lift vehicle operator identified in Fiji — a Toyota van fitted with a Braun 250kg lift, serving all major hotels and the cruise ship wharf. Book well ahead as it is the sole unit.'),
(111, 'community', 'Accessible Travel Research Compilation', 'verified', 'Maintains an accessible vehicle fleet for airport transfers and island tours; confirm vehicle type and lift/ramp specifics at time of booking.'),
(112, 'community', 'Accessible Travel Research Compilation', 'verified', 'Widely cited as the most consistently accessible resort in Fiji: every room is wheelchair accessible with walk-in showers, ramps are built into every wing, and a dedicated beach wheelchair is kept on site. Connected to the mainland by a causeway, so no boat transfer is needed.'),
(113, 'community', 'Accessible Travel Research Compilation', 'verified', 'Sister property to Sheraton Fiji Resort on Denarau; multi-room accessible suite options, pool ramp access, and accessible dining confirmed at all on-site restaurants.'),
(114, 'community', 'Accessible Travel Research Compilation', 'verified', 'Two dedicated accessible Garden View rooms on the ground floor near the lift, with walk-in showers, support railings, and a shower chair provided.');

-- ── Updates to existing facilities (avoid duplicate entries) ─────────────────
UPDATE accessibility_features SET
  accessible_vehicle_transfer = 1,
  sensory_friendly_rating = 3
WHERE facility_id = 15; -- InterContinental Fiji Golf Resort & Spa

UPDATE accessibility_features SET
  step_free_entry = 1,
  sensory_friendly_rating = 5,
  noise_level_rating = 1
WHERE facility_id = 16; -- Natadola Beach

UPDATE accessibility_features SET
  audio_description = 1,
  sensory_friendly_rating = 4,
  noise_level_rating = 1
WHERE facility_id = 32; -- Fiji Museum

UPDATE accessibility_features SET
  step_free_entry = 1
WHERE facility_id = 42; -- Paradise Taveuni (accessible "Niu Bure" room)

UPDATE accessibility_features SET
  step_free_entry = 1,
  sensory_friendly_rating = 5,
  noise_level_rating = 1
WHERE facility_id = 43; -- Bouma National Heritage Park (lower trail section)

-- Fresh verification rows for the existing facilities this research pass covered
INSERT INTO verifications (facility_id, verified_by, verifier_name, status, notes) VALUES
(10, 'community', 'Accessible Travel Research Compilation', 'verified', 'Confirmed beachfront accessible rooms and villas, accessible BBQ/outdoor dining areas, and step-free paths throughout the resort grounds.'),
(15, 'community', 'Accessible Travel Research Compilation', 'verified', 'Level concrete pathways throughout the property, ramps built in alongside all staircases, lifts serving the lobby and main restaurant, and beach wheelchairs available on request.'),
(16, 'community', 'Accessible Travel Research Compilation', 'verified', 'Specifically cited across accessible-travel guides as Fiji''s most accessible public beach, with a maintained accessible pathway from parking down to the sand.'),
(27, 'community', 'Accessible Travel Research Compilation', 'verified', 'Central Suva location with confirmed accessible rooms and lift access to all floors.'),
(32, 'community', 'Accessible Travel Research Compilation', 'verified', 'The only major cultural attraction in Fiji with confirmed ramp access and audio guides for vision-impaired visitors, set in the quiet grounds of Thurston Gardens.'),
(42, 'community', 'Accessible Travel Research Compilation', 'verified', 'The only confirmed accessible resort on Taveuni. The dedicated accessible "Niu Bure" room, the restaurant, and the boat dock all have ramp access; general grounds are gravel with staff assistance available. Weekly lovo nights and village visits can be arranged with accessibility support.'),
(43, 'community', 'Accessible Travel Research Compilation', 'verified', 'The lower trail and viewing areas are accessible and cited in multiple guides as Taveuni''s standout accessible nature experience; the upper falls trail remains steep and uneven, consistent with earlier on-the-ground reporting.');
