-- FijiBoundless — D1 Schema (SQLite / Cloudflare D1)
-- Run: npm run db:init          (local dev)
-- Run: npm run db:init:remote   (production)

PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

-- ── Facilities ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS facilities (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  name           TEXT    NOT NULL,
  category       TEXT    NOT NULL CHECK(category IN (
                   'toilet','hotel','restaurant','beach',
                   'transport','attraction','village','ferry'
                 )),
  division       TEXT    NOT NULL CHECK(division IN (
                   'Central','Western','Northern','Eastern'
                 )),
  island         TEXT    NOT NULL,
  town_or_area   TEXT    NOT NULL,
  address        TEXT,
  lat            REAL    NOT NULL,
  lng            REAL    NOT NULL,
  phone          TEXT,
  website        TEXT,
  is_active      INTEGER NOT NULL DEFAULT 1,
  created_at     TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_at     TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- ── Accessibility Features ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS accessibility_features (
  id                          INTEGER PRIMARY KEY AUTOINCREMENT,
  facility_id                 INTEGER NOT NULL UNIQUE
                                REFERENCES facilities(id) ON DELETE CASCADE,
  -- Mobility
  step_free_entry             INTEGER DEFAULT 0,
  ramp_gradient_percent       REAL,
  door_width_cm               REAL,
  turning_circle_cm           REAL,
  accessible_parking          INTEGER DEFAULT 0,
  hoisting_equipment          INTEGER DEFAULT 0,
  pool_hoist                  INTEGER DEFAULT 0,
  beach_wheelchair_available  INTEGER DEFAULT 0,
  all_terrain_wheelchair      INTEGER DEFAULT 0,
  -- Bathroom
  grab_rails                  INTEGER DEFAULT 0,
  roll_under_sink             INTEGER DEFAULT 0,
  shower_chair                INTEGER DEFAULT 0,
  changing_bench              INTEGER DEFAULT 0,
  -- Sensory / Neurodiversity
  sensory_friendly_rating     INTEGER CHECK(sensory_friendly_rating BETWEEN 1 AND 5),
  quiet_hours_start           TEXT,
  quiet_hours_end             TEXT,
  low_lighting_option         INTEGER DEFAULT 0,
  noise_level_rating          INTEGER CHECK(noise_level_rating BETWEEN 1 AND 5),
  fidget_kit_available        INTEGER DEFAULT 0,
  social_story_available      INTEGER DEFAULT 0,
  -- Visual / Hearing
  braille_signage             INTEGER DEFAULT 0,
  audio_description           INTEGER DEFAULT 0,
  hearing_loop                INTEGER DEFAULT 0,
  sign_language_staff         INTEGER DEFAULT 0,
  -- Transport
  accessible_vehicle_transfer INTEGER DEFAULT 0,
  boat_accessible             INTEGER DEFAULT 0,
  boat_notes                  TEXT,
  updated_at                  TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ── Verifications ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS verifications (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  facility_id   INTEGER NOT NULL REFERENCES facilities(id) ON DELETE CASCADE,
  verified_by   TEXT    NOT NULL CHECK(verified_by IN ('staff','community','partner','ai_vision')),
  verifier_name TEXT,
  verified_at   TEXT    NOT NULL DEFAULT (datetime('now')),
  status        TEXT    NOT NULL CHECK(status IN ('verified','needs_update','closed_temp','closed_perm')),
  notes         TEXT,
  photo_urls    TEXT    -- JSON array e.g. '["r2://media/abc.jpg"]'
);

-- ── Live Alerts ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS live_alerts (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  facility_id   INTEGER NOT NULL REFERENCES facilities(id) ON DELETE CASCADE,
  alert_type    TEXT    NOT NULL CHECK(alert_type IN (
                  'ramp_repair','hoist_down','flooded','closed_temp',
                  'road_damage','ferry_cancelled','power_outage','other'
                )),
  message       TEXT    NOT NULL,
  reported_by   TEXT,
  reported_at   TEXT    NOT NULL DEFAULT (datetime('now')),
  resolved_at   TEXT,
  is_resolved   INTEGER NOT NULL DEFAULT 0
);

-- ── Certified Villages ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS villages (
  id                     INTEGER PRIMARY KEY AUTOINCREMENT,
  facility_id            INTEGER UNIQUE REFERENCES facilities(id) ON DELETE SET NULL,
  village_name           TEXT NOT NULL,
  chief_contact          TEXT,
  certification_level    TEXT CHECK(certification_level IN ('bronze','silver','gold')),
  certified_at           TEXT,
  tourism_bill_compliant INTEGER DEFAULT 0,
  notes                  TEXT
);

-- ── Indexes ───────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_fac_geo       ON facilities(lat, lng);
CREATE INDEX IF NOT EXISTS idx_fac_category  ON facilities(category, is_active);
CREATE INDEX IF NOT EXISTS idx_fac_division  ON facilities(division);
CREATE INDEX IF NOT EXISTS idx_ver_facility  ON verifications(facility_id, verified_at DESC);
CREATE INDEX IF NOT EXISTS idx_alerts_active ON live_alerts(facility_id, is_resolved);
