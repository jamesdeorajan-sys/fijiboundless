-- Migration 001 — Audit Log
-- Backs the monthly data-freshness audit (admin-triggered via
-- POST /api/admin/run-audit, or the companion cron Worker).
-- Run: wrangler d1 execute fijiboundless --remote --file=database/migrations/001-audit-log.sql

CREATE TABLE IF NOT EXISTS audit_log (
  id                 INTEGER PRIMARY KEY AUTOINCREMENT,
  run_at             TEXT    NOT NULL DEFAULT (datetime('now')),
  facilities_flagged INTEGER NOT NULL DEFAULT 0,
  alerts_posted      INTEGER NOT NULL DEFAULT 0,
  notes              TEXT
);

CREATE INDEX IF NOT EXISTS idx_audit_log_run_at ON audit_log(run_at DESC);

-- The audit inserts verifications with verified_by='ai_audit', which the
-- original CHECK constraint doesn't allow ('staff','community','partner',
-- 'ai_vision' only). SQLite can't ALTER a CHECK constraint in place, so the
-- table is rebuilt with the widened constraint and existing rows copied over.
CREATE TABLE verifications_new (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  facility_id   INTEGER NOT NULL REFERENCES facilities(id) ON DELETE CASCADE,
  verified_by   TEXT    NOT NULL CHECK(verified_by IN ('staff','community','partner','ai_vision','ai_audit')),
  verifier_name TEXT,
  verified_at   TEXT    NOT NULL DEFAULT (datetime('now')),
  status        TEXT    NOT NULL CHECK(status IN ('verified','needs_update','closed_temp','closed_perm')),
  notes         TEXT,
  photo_urls    TEXT
);

INSERT INTO verifications_new SELECT * FROM verifications;
DROP TABLE verifications;
ALTER TABLE verifications_new RENAME TO verifications;

CREATE INDEX IF NOT EXISTS idx_ver_facility ON verifications(facility_id, verified_at DESC);
