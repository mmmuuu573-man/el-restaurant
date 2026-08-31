'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth-provider';
import { Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const { session, signIn, loading: authLoading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && session) {
      router.replace('/admin');
    }
  }, [session, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) {
      setError(error);
    } else {
      router.replace('/admin');
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[hsl(348_58%_18%)]">
        <Loader2 className="w-8 h-8 text-[hsl(43_74%_56%)] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(348_58%_18%)] px-4" dir="rtl">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[hsl(43_74%_56%)] mb-4">
            <span className="text-[hsl(348_58%_28%)] font-bold text-2xl">د</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">دلعين الدمشقي</h1>
          <p className="text-white/50 text-sm">لوحة تحكم الإدارة</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-2xl p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-bold text-[hsl(348_58%_28%)] mb-1.5">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              dir="ltr"
              className="w-full bg-[hsl(42_33%_96%)] border border-[hsl(42_15%_85%)] rounded-xl px-4 py-2.5 text-[hsl(30_10%_12%)] focus:outline-none focus:border-[hsl(348_58%_28%)] focus:ring-1 focus:ring-[hsl(348_58%_28%)] transition-colors text-right"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-[hsl(348_58%_28%)] mb-1.5">
              كلمة المرور
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-[hsl(42_33%_96%)] border border-[hsl(42_15%_85%)] rounded-xl px-4 py-2.5 text-[hsl(30_10%_12%)] focus:outline-none focus:border-[hsl(348_58%_28%)] focus:ring-1 focus:ring-[hsl(348_58%_28%)] transition-colors"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm font-bold text-center bg-red-50 rounded-lg py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[hsl(348_58%_28%)] hover:bg-[hsl(348_65%_18%)] text-white font-bold text-lg py-3 rounded-full transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                جاري الدخول...
              </>
            ) : (
              'تسجيل الدخول'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
