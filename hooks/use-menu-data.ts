'use client';

import { useState, useEffect } from 'react';
import { supabase, type MenuCategoryRow, type MenuItemRow } from '@/lib/supabase';
import {
  menuCategories as staticCategories,
  menuItems as staticItems,
  type MenuItem,
  type MenuCategory,
} from '@/lib/restaurant-data';

type MenuData = {
  categories: MenuCategory[];
  items: MenuItem[];
  loading: boolean;
};

const categoryMap: Record<string, string> = {};

export function useMenuData(): MenuData {
  const [categories, setCategories] = useState<MenuCategory[]>(staticCategories);
  const [items, setItems] = useState<MenuItem[]>(staticItems);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        const [{ data: catData, error: catError }, { data: itemData, error: itemError }] =
          await Promise.all([
            supabase.from('menu_categories').select('*').order('sort_order'),
            supabase
              .from('menu_items')
              .select('*')
              .eq('available', true)
              .order('sort_order'),
          ]);

        if (cancelled) return;

        if (catError || itemError || !catData || !itemData || catData.length === 0) {
          setLoading(false);
          return;
        }

        const fetchedCategories: MenuCategory[] = catData.map((c: MenuCategoryRow) => {
          categoryMap[c.id] = c.name;
          return {
            id: c.id,
            label: c.name,
            icon: c.icon,
          };
        });

        const fetchedItems: MenuItem[] = itemData.map((i: MenuItemRow) => ({
          id: i.id,
          category: i.category_id,
          name: i.name,
          description: i.description,
          price: String(i.price),
          priceValue: i.price,
          image: i.image,
        }));

        setCategories(fetchedCategories);
        setItems(fetchedItems);
      } catch {
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => {
      cancelled = true;
    };
  }, []);

  return { categories, items, loading };
}
