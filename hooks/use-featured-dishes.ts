'use client';

import { useState, useEffect } from 'react';
import { supabase, type MenuItemRow } from '@/lib/supabase';
import {
  featuredDishes as staticDishes,
  type FeaturedDish,
} from '@/lib/restaurant-data';

type FeaturedData = {
  dishes: FeaturedDish[];
  loading: boolean;
};

export function useFeaturedDishes(): FeaturedData {
  const [dishes, setDishes] = useState<FeaturedDish[]>(staticDishes);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        const { data, error } = await supabase
          .from('menu_items')
          .select('*')
          .eq('available', true)
          .eq('featured', true)
          .order('sort_order');

        if (cancelled) return;

        if (error || !data || data.length === 0) {
          setLoading(false);
          return;
        }

        const fetched: FeaturedDish[] = data.map((i: MenuItemRow) => ({
          id: i.id,
          name: i.name,
          description: i.description,
          image: i.image,
          price: String(i.price),
          priceValue: i.price,
        }));

        setDishes(fetched);
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

  return { dishes, loading };
}
