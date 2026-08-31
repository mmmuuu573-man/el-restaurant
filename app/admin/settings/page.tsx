'use client';

import { useState, useEffect } from 'react';
import { Loader2, Save, CheckCircle } from 'lucide-react';
import { supabase, type RestaurantSettingsRow } from '@/lib/supabase';

type SettingsForm = {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  whatsapp: string;
  address: string;
  address_line2: string;
  google_maps_url: string;
  opening_hours: string;
};

const emptyForm: SettingsForm = {
  name: '',
  tagline: '',
  description: '',
  phone: '',
  whatsapp: '',
  address: '',
  address_line2: '',
  google_maps_url: '',
  opening_hours: '',
};

export default function AdminSettingsPage() {
  const [form, setForm] = useState<SettingsForm>(emptyForm);
  const [settingsId, setSettingsId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchSettings() {
      const { data, error } = await supabase
        .from('restaurant_settings')
        .select('*')
        .maybeSingle();

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      if (data) {
        const row = data as RestaurantSettingsRow;
        setSettingsId(row.id);
        setForm({
          name: row.name,
          tagline: row.tagline,
          description: row.description,
          phone: row.phone,
          whatsapp: row.whatsapp,
          address: row.address,
          address_line2: row.address_line2,
          google_maps_url: row.google_maps_url,
          opening_hours: row.opening_hours,
        });
      }
      setLoading(false);
    }
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSaved(false);

    try {
      if (settingsId) {
        const { error } = await supabase
          .from('restaurant_settings')
          .update(form)
          .eq('id', settingsId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('restaurant_settings')
          .insert(form)
          .select()
          .single();
        if (error) throw error;
        if (data) setSettingsId((data as RestaurantSettingsRow).id);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ');
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-[hsl(348_58%_28%)] animate-spin" />
      </div>
    );
  }

  const fields: { key: keyof SettingsForm; label: string; type?: string; textarea?: boolean }[] = [
    { key: 'name', label: 'اسم المطعم' },
    { key: 'tagline', label: 'الشعار' },
    { key: 'description', label: 'الوصف', textarea: true },
    { key: 'phone', label: 'رقم الهاتف' },
    { key: 'whatsapp', label: 'رقم واتساب' },
    { key: 'address', label: 'العنوان' },
    { key: 'address_line2', label: 'العنوان (سطر ثاني)' },
    { key: 'google_maps_url', label: 'رابط خرائط جوجل' },
    { key: 'opening_hours', label: 'ساعات العمل' },
  ];

  return (
    <div dir="rtl">
      <h1 className="text-2xl font-bold text-[hsl(348_58%_28%)] mb-6">إعدادات المطعم</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">{field.label}</label>
            {field.textarea ? (
              <textarea
                value={form[field.key]}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                rows={2}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[hsl(348_58%_28%)] focus:ring-1 focus:ring-[hsl(348_58%_28%)] transition-colors resize-none"
              />
            ) : (
              <input
                type={field.type ?? 'text'}
                value={form[field.key]}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                dir={field.key === 'phone' || field.key === 'whatsapp' || field.key === 'google_maps_url' ? 'ltr' : 'rtl'}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[hsl(348_58%_28%)] focus:ring-1 focus:ring-[hsl(348_58%_28%)] transition-colors text-right"
              />
            )}
          </div>
        ))}

        {error && (
          <div className="bg-red-50 text-red-600 rounded-xl p-3 text-sm font-bold">
            {error}
          </div>
        )}

        {saved && (
          <div className="bg-green-50 text-green-600 rounded-xl p-3 text-sm font-bold flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            تم حفظ الإعدادات بنجاح
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 bg-[hsl(348_58%_28%)] hover:bg-[hsl(348_65%_18%)] text-white font-bold px-6 py-3 rounded-xl transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          حفظ الإعدادات
        </button>
      </form>
    </div>
  );
}
