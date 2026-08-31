import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database row types

export type MenuCategoryRow = {
  id: string;
  name: string;
  icon: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type MenuItemRow = {
  id: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  sort_order: number;
  available: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
};

export type RestaurantSettingsRow = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  phone: string;
  whatsapp: string;
  address: string;
  address_line2: string;
  google_maps_url: string;
  opening_hours: string;
  created_at: string;
  updated_at: string;
};
