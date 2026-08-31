'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Tag, UtensilsCrossed, Settings, TrendingUp, Eye, EyeOff } from 'lucide-react';
import { supabase, type MenuCategoryRow, type MenuItemRow } from '@/lib/supabase';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    categories: 0,
    items: 0,
    available: 0,
    unavailable: 0,
    featured: 0,
  });
  const [recentItems, setRecentItems] = useState<MenuItemRow[]>([]);
  const [categories, setCategories] = useState<MenuCategoryRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const [{ data: cats }, { data: items }, { data: featured }, { data: available }] = await Promise.all([
        supabase.from('menu_categories').select('*'),
        supabase.from('menu_items').select('*'),
        supabase.from('menu_items').select('*').eq('featured', true),
        supabase.from('menu_items').select('*').eq('available', true),
      ]);

      const allItems = (items ?? []) as MenuItemRow[];
      setStats({
        categories: cats?.length ?? 0,
        items: allItems.length,
        available: available?.length ?? 0,
        unavailable: allItems.length - (available?.length ?? 0),
        featured: featured?.length ?? 0,
      });
      setCategories((cats ?? []) as MenuCategoryRow[]);
      setRecentItems(allItems.slice(0, 5));
      setLoading(false);
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-[hsl(348_58%_28%)] font-bold text-lg">جاري التحميل...</p>
      </div>
    );
  }

  const cards = [
    { label: 'الفئات', value: stats.categories, icon: Tag, color: 'bg-blue-50 text-blue-600' },
    { label: 'إجمالي الأصناف', value: stats.items, icon: UtensilsCrossed, color: 'bg-green-50 text-green-600' },
    { label: 'متاح', value: stats.available, icon: Eye, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'غير متاح', value: stats.unavailable, icon: EyeOff, color: 'bg-orange-50 text-orange-600' },
    { label: 'مميز', value: stats.featured, icon: TrendingUp, color: 'bg-amber-50 text-amber-600' },
  ];

  return (
    <div dir="rtl">
      <h1 className="text-2xl font-bold text-[hsl(348_58%_28%)] mb-6">لوحة التحكم</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
              <p className="text-sm text-gray-500">{card.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-lg text-gray-800 mb-4">إجراءات سريعة</h2>
          <div className="space-y-2">
            <Link
              href="/admin/categories"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">إدارة الفئات</p>
                <p className="text-xs text-gray-500">إضافة وتعديل وحذف فئات المنيو</p>
              </div>
            </Link>
            <Link
              href="/admin/items"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">إدارة الأصناف</p>
                <p className="text-xs text-gray-500">إضافة وتعديل وحذف أصناف المنيو</p>
              </div>
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">إعدادات المطعم</p>
                <p className="text-xs text-gray-500">تعديل معلومات المطعم</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-lg text-gray-800 mb-4">أحدث الأصناف</h2>
          {recentItems.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">لا توجد أصناف</p>
          ) : (
            <div className="space-y-2">
              {recentItems.map((item) => {
                const cat = categories.find((c) => c.id === item.category_id);
                return (
                  <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-gray-800 truncate">{item.name}</p>
                      <p className="text-xs text-gray-500">{cat?.name ?? '—'}</p>
                    </div>
                    <span className="text-sm font-bold text-[hsl(348_58%_28%)]">{item.price} ج.م</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
