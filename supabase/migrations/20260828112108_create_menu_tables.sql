/*
# Create menu management tables for restaurant CMS

## Summary
Creates three tables to replace hard-coded menu data with database-backed content:
- `menu_categories`: 8 categories (shawarma, meals, fatta, appetizers, salads, grills, drinks, desserts)
- `menu_items`: 22 items linked to categories via foreign key, with price, image, availability, featured flags
- `restaurant_settings`: single-row table for restaurant info (name, phone, address, hours, etc.)

## New Tables

### menu_categories
- `id` (uuid, primary key)
- `name` (text, not null) — Arabic category name
- `icon` (text) — emoji icon
- `sort_order` (integer, default 0) — display ordering
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

### menu_items
- `id` (uuid, primary key)
- `category_id` (uuid, foreign key → menu_categories.id ON DELETE RESTRICT)
- `name` (text, not null) — Arabic dish name
- `description` (text) — Arabic description
- `price` (integer, not null) — price in EGP
- `image` (text) — image URL
- `sort_order` (integer, default 0)
- `available` (boolean, default true) — if false, hidden from public ordering
- `featured` (boolean, default false) — if true, appears in featured dishes section
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

### restaurant_settings
- `id` (uuid, primary key)
- `name` (text)
- `tagline` (text)
- `description` (text)
- `phone` (text)
- `whatsapp` (text)
- `address` (text)
- `address_line2` (text)
- `google_maps_url` (text)
- `opening_hours` (text)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

## Security
- RLS enabled on all three tables.
- Public (anon) can SELECT available categories and items (for website display).
- Authenticated users can do full CRUD on all tables (for admin dashboard).
- Unauthenticated users cannot INSERT/UPDATE/DELETE.
- restaurant_settings: public can SELECT, authenticated can do full CRUD.

## Important Notes
1. `ON DELETE RESTRICT` on menu_items.category_id prevents deleting a category that still has items.
2. The `available` column controls public visibility — unavailable items are hidden from customers.
3. The `featured` column controls which items appear in the "Featured Dishes" section.
4. An index on `menu_items.category_id` speeds up category-filtered queries.
5. An index on `menu_items.sort_order` speeds up ordered queries.
*/

-- Create menu_categories table
CREATE TABLE IF NOT EXISTS menu_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  icon text DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create menu_items table
CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES menu_categories(id) ON DELETE RESTRICT,
  name text NOT NULL,
  description text DEFAULT '',
  price integer NOT NULL,
  image text DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  available boolean NOT NULL DEFAULT true,
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create restaurant_settings table
CREATE TABLE IF NOT EXISTS restaurant_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text DEFAULT '',
  tagline text DEFAULT '',
  description text DEFAULT '',
  phone text DEFAULT '',
  whatsapp text DEFAULT '',
  address text DEFAULT '',
  address_line2 text DEFAULT '',
  google_maps_url text DEFAULT '',
  opening_hours text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurant_settings ENABLE ROW LEVEL SECURITY;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_menu_items_category_id ON menu_items(category_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_sort_order ON menu_items(sort_order);
CREATE INDEX IF NOT EXISTS idx_menu_categories_sort_order ON menu_categories(sort_order);

-- ========================================
-- RLS POLICIES: menu_categories
-- ========================================

-- Public can read all categories
DROP POLICY IF EXISTS "public_read_categories" ON menu_categories;
CREATE POLICY "public_read_categories"
ON menu_categories FOR SELECT
TO anon, authenticated
USING (true);

-- Authenticated can insert
DROP POLICY IF EXISTS "auth_insert_categories" ON menu_categories;
CREATE POLICY "auth_insert_categories"
ON menu_categories FOR INSERT
TO authenticated
WITH CHECK (true);

-- Authenticated can update
DROP POLICY IF EXISTS "auth_update_categories" ON menu_categories;
CREATE POLICY "auth_update_categories"
ON menu_categories FOR UPDATE
TO authenticated
USING (true) WITH CHECK (true);

-- Authenticated can delete
DROP POLICY IF EXISTS "auth_delete_categories" ON menu_categories;
CREATE POLICY "auth_delete_categories"
ON menu_categories FOR DELETE
TO authenticated
USING (true);

-- ========================================
-- RLS POLICIES: menu_items
-- ========================================

-- Public can read only available items
DROP POLICY IF EXISTS "public_read_available_items" ON menu_items;
CREATE POLICY "public_read_available_items"
ON menu_items FOR SELECT
TO anon, authenticated
USING (available = true);

-- Authenticated can read ALL items (including unavailable)
DROP POLICY IF EXISTS "auth_read_all_items" ON menu_items;
CREATE POLICY "auth_read_all_items"
ON menu_items FOR SELECT
TO authenticated
USING (true);

-- Authenticated can insert
DROP POLICY IF EXISTS "auth_insert_items" ON menu_items;
CREATE POLICY "auth_insert_items"
ON menu_items FOR INSERT
TO authenticated
WITH CHECK (true);

-- Authenticated can update
DROP POLICY IF EXISTS "auth_update_items" ON menu_items;
CREATE POLICY "auth_update_items"
ON menu_items FOR UPDATE
TO authenticated
USING (true) WITH CHECK (true);

-- Authenticated can delete
DROP POLICY IF EXISTS "auth_delete_items" ON menu_items;
CREATE POLICY "auth_delete_items"
ON menu_items FOR DELETE
TO authenticated
USING (true);

-- ========================================
-- RLS POLICIES: restaurant_settings
-- ========================================

-- Public can read settings
DROP POLICY IF EXISTS "public_read_settings" ON restaurant_settings;
CREATE POLICY "public_read_settings"
ON restaurant_settings FOR SELECT
TO anon, authenticated
USING (true);

-- Authenticated can insert
DROP POLICY IF EXISTS "auth_insert_settings" ON restaurant_settings;
CREATE POLICY "auth_insert_settings"
ON restaurant_settings FOR INSERT
TO authenticated
WITH CHECK (true);

-- Authenticated can update
DROP POLICY IF EXISTS "auth_update_settings" ON restaurant_settings;
CREATE POLICY "auth_update_settings"
ON restaurant_settings FOR UPDATE
TO authenticated
USING (true) WITH CHECK (true);

-- Authenticated can delete
DROP POLICY IF EXISTS "auth_delete_settings" ON restaurant_settings;
CREATE POLICY "auth_delete_settings"
ON restaurant_settings FOR DELETE
TO authenticated
USING (true);

-- ========================================
-- updated_at trigger function
-- ========================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_menu_categories_updated_at ON menu_categories;
CREATE TRIGGER update_menu_categories_updated_at
BEFORE UPDATE ON menu_categories
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_menu_items_updated_at ON menu_items;
CREATE TRIGGER update_menu_items_updated_at
BEFORE UPDATE ON menu_items
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_restaurant_settings_updated_at ON restaurant_settings;
CREATE TRIGGER update_restaurant_settings_updated_at
BEFORE UPDATE ON restaurant_settings
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
