'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, X, ArrowUp, ArrowDown, Loader2, Star, Eye, EyeOff } from 'lucide-react';
import { supabase, type MenuCategoryRow, type MenuItemRow } from '@/lib/supabase';

type ItemFormData = {
  name: string;
  description: string;
  price: number;
  image: string;
  category_id: string;
  sort_order: number;
  available: boolean;
  featured: boolean;
};

const emptyForm: ItemFormData = {
  name: '',
  description: '',
  price: 0,
  image: '',
  category_id: '',
  sort_order: 0,
  available: true,
  featured: false,
};

export default function AdminItemsPage() {
  const [items, setItems] = useState<MenuItemRow[]>([]);
  const [categories, setCategories] = useState<MenuCategoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ItemFormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<MenuItemRow | null>(null);

  const fetchData = useCallback(async () => {
    const [{ data: cats }, { data: allItems }] = await Promise.all([
      supabase.from('menu_categories').select('*').order('sort_order'),
      supabase.from('menu_items').select('*').order('sort_order'),
    ]);
    setCategories((cats ?? []) as MenuCategoryRow[]);
    setItems((allItems ?? []) as MenuItemRow[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredItems = filterCategory === 'all'
    ? items
    : items.filter((i) => i.category_id === filterCategory);

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      ...emptyForm,
      category_id: categories[0]?.id ?? '',
      sort_order: items.length,
    });
    setShowForm(true);
    setError('');
  };

  const handleEdit = (item: MenuItemRow) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      category_id: item.category_id,
      sort_order: item.sort_order,
      available: item.available,
      featured: item.featured,
    });
    setShowForm(true);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    if (!formData.name.trim()) {
      setError('الاسم مطلوب');
      setSaving(false);
      return;
    }
    if (!formData.category_id) {
      setError('يجب اختيار فئة');
      setSaving(false);
      return;
    }

    try {
      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: formData.price,
        image: formData.image.trim(),
        category_id: formData.category_id,
        sort_order: formData.sort_order,
        available: formData.available,
        featured: formData.featured,
      };

      if (editingId) {
        const { error } = await supabase.from('menu_items').update(payload).eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('menu_items').insert(payload);
        if (error) throw error;
      }
      setShowForm(false);
      setEditingId(null);
      setFormData(emptyForm);
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ');
    }
    setSaving(false);
  };

  const handleToggle = async (item: MenuItemRow, field: 'available' | 'featured') => {
    const { error } = await supabase
      .from('menu_items')
      .update({ [field]: !item[field] })
      .eq('id', item.id);
    if (!error) {
      setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, [field]: !i[field] } : i)));
    }
  };

  const handleMove = async (item: MenuItemRow, direction: 'up' | 'down') => {
    const sameCategoryItems = [...filteredItems].sort((a, b) => a.sort_order - b.sort_order);
    const index = sameCategoryItems.findIndex((i) => i.id === item.id);
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= sameCategoryItems.length) return;

    const swapItem = sameCategoryItems[swapIndex];
    await Promise.all([
      supabase.from('menu_items').update({ sort_order: swapItem.sort_order }).eq('id', item.id),
      supabase.from('menu_items').update({ sort_order: item.sort_order }).eq('id', swapItem.id),
    ]);
    await fetchData();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const { error } = await supabase.from('menu_items').delete().eq('id', deleteTarget.id);
    if (error) {
      setError(error.message);
    } else {
      setDeleteTarget(null);
      await fetchData();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-[hsl(348_58%_28%)] animate-spin" />
      </div>
    );
  }

  const catName = (id: string) => categories.find((c) => c.id === id)?.name ?? '—';

  return (
    <div dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[hsl(348_58%_28%)]">الأصناف</h1>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-[hsl(348_58%_28%)] hover:bg-[hsl(348_65%_18%)] text-white font-bold text-sm px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />
          إضافة صنف
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 rounded-xl p-3 mb-4 text-sm font-bold">
          {error}
        </div>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilterCategory('all')}
          className={`px-4 py-2 rounded-full font-bold text-sm transition-colors ${
            filterCategory === 'all'
              ? 'bg-[hsl(348_58%_28%)] text-white'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          الكل
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilterCategory(cat.id)}
            className={`px-4 py-2 rounded-full font-bold text-sm transition-colors ${
              filterCategory === cat.id
                ? 'bg-[hsl(348_58%_28%)] text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="flex gap-3 p-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-sm text-gray-800 truncate">{item.name}</h3>
                  <span className="text-sm font-bold text-[hsl(348_58%_28%)] flex-shrink-0">
                    {item.price} ج.م
                  </span>
                </div>
                <p className="text-xs text-gray-500 truncate mt-0.5">{item.description}</p>
                <p className="text-xs text-gray-400 mt-1">{catName(item.category_id)}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => handleToggle(item, 'available')}
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold transition-colors ${
                      item.available
                        ? 'bg-green-50 text-green-600'
                        : 'bg-orange-50 text-orange-600'
                    }`}
                  >
                    {item.available ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    {item.available ? 'متاح' : 'غير متاح'}
                  </button>
                  <button
                    onClick={() => handleToggle(item, 'featured')}
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold transition-colors ${
                      item.featured
                        ? 'bg-amber-50 text-amber-600'
                        : 'bg-gray-50 text-gray-400'
                    }`}
                  >
                    <Star className={`w-3 h-3 ${item.featured ? 'fill-amber-500' : ''}`} />
                    مميز
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-gray-50 px-3 py-2">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleMove(item, 'up')}
                  disabled={index === 0}
                  className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 transition-colors"
                >
                  <ArrowUp className="w-4 h-4 text-gray-500" />
                </button>
                <button
                  onClick={() => handleMove(item, 'down')}
                  disabled={index === filteredItems.length - 1}
                  className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 transition-colors"
                >
                  <ArrowDown className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteTarget(item)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="font-bold">لا توجد أصناف</p>
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setShowForm(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg text-gray-800">
                {editingId ? 'تعديل الصنف' : 'إضافة صنف جديد'}
              </h2>
              <button onClick={() => setShowForm(false)} className="p-1 rounded-lg hover:bg-gray-100">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">الاسم</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[hsl(348_58%_28%)] focus:ring-1 focus:ring-[hsl(348_58%_28%)] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">الوصف</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[hsl(348_58%_28%)] focus:ring-1 focus:ring-[hsl(348_58%_28%)] transition-colors resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">السعر (ج.م)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                    required
                    min={0}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[hsl(348_58%_28%)] focus:ring-1 focus:ring-[hsl(348_58%_28%)] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">الترتيب</label>
                  <input
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[hsl(348_58%_28%)] focus:ring-1 focus:ring-[hsl(348_58%_28%)] transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">رابط الصورة</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                  dir="ltr"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[hsl(348_58%_28%)] focus:ring-1 focus:ring-[hsl(348_58%_28%)] transition-colors text-right"
                />
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="preview"
                    className="mt-2 w-20 h-20 rounded-xl object-cover"
                  />
                )}
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">الفئة</label>
                <select
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[hsl(348_58%_28%)] focus:ring-1 focus:ring-[hsl(348_58%_28%)] transition-colors"
                >
                  <option value="">اختر فئة</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.available}
                    onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                    className="w-4 h-4 accent-[hsl(348_58%_28%)]"
                  />
                  <span className="text-sm font-bold text-gray-700">متاح للطلب</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 accent-[hsl(348_58%_28%)]"
                  />
                  <span className="text-sm font-bold text-gray-700">صنف مميز</span>
                </label>
              </div>
              {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-[hsl(348_58%_28%)] hover:bg-[hsl(348_65%_18%)] text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {editingId ? 'حفظ التعديلات' : 'إضافة'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setDeleteTarget(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-bold text-lg text-gray-800 mb-2">تأكيد الحذف</h2>
            <p className="text-gray-600 mb-4">
              هل أنت متأكد من حذف "{deleteTarget.name}"؟ لا يمكن التراجع عن هذا الإجراء.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 rounded-xl transition-colors"
              >
                حذف
              </button>
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 rounded-xl transition-colors"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
