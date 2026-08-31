'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, X, ArrowUp, ArrowDown, Loader2, AlertTriangle } from 'lucide-react';
import { supabase, type MenuCategoryRow } from '@/lib/supabase';

type CategoryFormData = {
  name: string;
  icon: string;
  sort_order: number;
};

const emptyForm: CategoryFormData = { name: '', icon: '', sort_order: 0 };

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<MenuCategoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<CategoryFormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<MenuCategoryRow | null>(null);
  const [deleteInfo, setDeleteInfo] = useState<{ itemCount: number; loading: boolean } | null>(null);

  const fetchCategories = useCallback(async () => {
    const { data, error } = await supabase
      .from('menu_categories')
      .select('*')
      .order('sort_order');
    if (!error && data) {
      setCategories(data as MenuCategoryRow[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleAdd = () => {
    setEditingId(null);
    setFormData({ ...emptyForm, sort_order: categories.length });
    setShowForm(true);
    setError('');
  };

  const handleEdit = (cat: MenuCategoryRow) => {
    setEditingId(cat.id);
    setFormData({ name: cat.name, icon: cat.icon, sort_order: cat.sort_order });
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

    try {
      if (editingId) {
        const { error } = await supabase
          .from('menu_categories')
          .update({
            name: formData.name.trim(),
            icon: formData.icon.trim(),
            sort_order: formData.sort_order,
          })
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('menu_categories').insert({
          name: formData.name.trim(),
          icon: formData.icon.trim(),
          sort_order: formData.sort_order,
        });
        if (error) throw error;
      }
      setShowForm(false);
      setEditingId(null);
      setFormData(emptyForm);
      await fetchCategories();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ');
    }
    setSaving(false);
  };

  const handleMove = async (cat: MenuCategoryRow, direction: 'up' | 'down') => {
    const sorted = [...categories].sort((a, b) => a.sort_order - b.sort_order);
    const index = sorted.findIndex((c) => c.id === cat.id);
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= sorted.length) return;

    const swapCat = sorted[swapIndex];
    await Promise.all([
      supabase.from('menu_categories').update({ sort_order: swapCat.sort_order }).eq('id', cat.id),
      supabase.from('menu_categories').update({ sort_order: cat.sort_order }).eq('id', swapCat.id),
    ]);
    await fetchCategories();
  };

  const handleDeleteClick = async (cat: MenuCategoryRow) => {
    setDeleteTarget(cat);
    setDeleteInfo({ itemCount: 0, loading: true });
    const { count } = await supabase
      .from('menu_items')
      .select('*', { count: 'exact', head: true })
      .eq('category_id', cat.id);
    setDeleteInfo({ itemCount: count ?? 0, loading: false });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    const { error } = await supabase.from('menu_categories').delete().eq('id', deleteTarget.id);
    if (error) {
      setError(error.message);
    } else {
      setDeleteTarget(null);
      setDeleteInfo(null);
      await fetchCategories();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-[hsl(348_58%_28%)] animate-spin" />
      </div>
    );
  }

  return (
    <div dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[hsl(348_58%_28%)]">الفئات</h1>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-[hsl(348_58%_28%)] hover:bg-[hsl(348_65%_18%)] text-white font-bold text-sm px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />
          إضافة فئة
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 rounded-xl p-3 mb-4 text-sm font-bold">
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-right p-4 font-bold text-sm text-gray-600">الترتيب</th>
              <th className="text-right p-4 font-bold text-sm text-gray-600">الأيقونة</th>
              <th className="text-right p-4 font-bold text-sm text-gray-600">الاسم</th>
              <th className="text-right p-4 font-bold text-sm text-gray-600">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, index) => (
              <tr key={cat.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="p-4">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleMove(cat, 'up')}
                      disabled={index === 0}
                      className="p-1 rounded hover:bg-gray-200 disabled:opacity-30 transition-colors"
                    >
                      <ArrowUp className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleMove(cat, 'down')}
                      disabled={index === categories.length - 1}
                      className="p-1 rounded hover:bg-gray-200 disabled:opacity-30 transition-colors"
                    >
                      <ArrowDown className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </td>
                <td className="p-4 text-2xl">{cat.icon}</td>
                <td className="p-4 font-bold text-gray-800">{cat.name}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(cat)}
                      className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(cat)}
                      className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setShowForm(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg text-gray-800">
                {editingId ? 'تعديل الفئة' : 'إضافة فئة جديدة'}
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
                  placeholder="اسم الفئة"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[hsl(348_58%_28%)] focus:ring-1 focus:ring-[hsl(348_58%_28%)] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">الأيقونة (إيموجي)</label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="🌯"
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

      {/* Delete Confirmation Modal */}
      {deleteTarget && deleteInfo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => { setDeleteTarget(null); setDeleteInfo(null); }}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {deleteInfo.loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 text-[hsl(348_58%_28%)] animate-spin" />
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-500" />
                  </div>
                  <h2 className="font-bold text-lg text-gray-800">تأكيد الحذف</h2>
                </div>
                {deleteInfo.itemCount > 0 ? (
                  <div className="bg-red-50 rounded-xl p-4 mb-4">
                    <p className="text-red-700 font-bold text-sm mb-1">
                      لا يمكن حذف هذه الفئة لأنها تحتوي على {deleteInfo.itemCount} صنف.
                    </p>
                    <p className="text-red-600 text-xs">
                      يجب نقل أو حذف الأصناف المرتبطة بهذه الفئة أولاً من صفحة الأصناف.
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-600 mb-4">
                    هل أنت متأكد من حذف فئة "{deleteTarget.name}"؟ لا يمكن التراجع عن هذا الإجراء.
                  </p>
                )}
                <div className="flex gap-3">
                  {deleteInfo.itemCount === 0 && (
                    <button
                      onClick={handleDeleteConfirm}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 rounded-xl transition-colors"
                    >
                      حذف
                    </button>
                  )}
                  <button
                    onClick={() => { setDeleteTarget(null); setDeleteInfo(null); }}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 rounded-xl transition-colors"
                  >
                    إلغاء
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
