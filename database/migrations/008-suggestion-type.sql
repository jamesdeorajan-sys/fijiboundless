-- Adds a type discriminator to suggestions so /suggest, /contact, and
-- Partner.jsx submissions (which all share the /api/suggest endpoint) can
-- be told apart in the admin panel. NULL means the original "suggest a
-- place" flow, predating this column.
ALTER TABLE suggestions ADD COLUMN suggestion_type TEXT;
