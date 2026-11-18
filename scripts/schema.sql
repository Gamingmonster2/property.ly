-- Property.ly D1 schema
-- Applied via: npx wrangler d1 execute property-ly-db --file=scripts/schema.sql --remote

DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS listings;

CREATE TABLE listings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  external_id TEXT UNIQUE,          -- source post id (nullable for user listings)
  slug TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'user',      -- 'user' | 'opensooq'
  source_name TEXT,                          -- e.g. 'السوق المفتوح' / 'OpenSooq'
  source_url TEXT,                           -- link to the original ad
  purpose TEXT NOT NULL,                     -- 'sale' | 'rent'
  property_type TEXT,                        -- apartment|villa|land|office|shop|building|farm|chalet|other
  type_ar TEXT,
  type_en TEXT,
  title_ar TEXT NOT NULL,
  title_en TEXT,
  description_ar TEXT,
  description_en TEXT,
  price REAL,
  currency TEXT,
  usd_price REAL,
  area_sqm REAL,
  bedrooms INTEGER,
  bathrooms INTEGER,
  city_key TEXT,
  city_ar TEXT,
  city_en TEXT,
  neighborhood_ar TEXT,
  neighborhood_en TEXT,
  country_ar TEXT,
  country_en TEXT,
  phone TEXT,
  scraped_at TEXT,                          -- original relative date string (e.g. 'قبل 3 أيام')
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  status TEXT NOT NULL DEFAULT 'active'     -- active | pending | removed
);

CREATE INDEX idx_listings_purpose ON listings (purpose);
CREATE INDEX idx_listings_city ON listings (city_key);
CREATE INDEX idx_listings_status ON listings (status);
CREATE INDEX idx_listings_created ON listings (created_at DESC);
CREATE INDEX idx_listings_external ON listings (external_id);

CREATE TABLE images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  listing_id INTEGER NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  position INTEGER NOT NULL DEFAULT 0,
  url TEXT,                -- original source url (for attribution)
  content_type TEXT,
  data BLOB
);

CREATE INDEX idx_images_listing ON images (listing_id);
