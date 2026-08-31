'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AuthProvider, useAuth } from '@/components/auth-provider';
import { LogOut, UtensilsCrossed, Settings, Tag, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

function AdminLayoutContent({ children }: { children: ReactNode }) {
  const { session, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !session && pathname !== '/admin/login') {
      router.replace('/admin/login');
    }
  }, [session, loading, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[hsl(42_33%_96%)]">
        <div className="text-[hsl(348_58%_28%)] font-bold text-lg">جاري التحميل...</div>
      </div>
    );
  }

  if (!session && pathname !== '/admin/login') {
    return null;
  }

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navItems = [
    { href: '/admin', label: 'لوحة التحكم', icon: ShoppingBag },
    { href: '/admin/categories', label: 'الفئات', icon: Tag },
    { href: '/admin/items', label: 'الأصناف', icon: UtensilsCrossed },
    { href: '/admin/settings', label: 'إعدادات المطعم', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[hsl(42_33%_96%)] flex" dir="rtl">
      <aside className="w-64 bg-[hsl(348_58%_28%)] text-white flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[hsl(43_74%_56%)] flex items-center justify-center">
              <span className="text-[hsl(348_58%_28%)] font-bold text-lg">د</span>
            </div>
            <div>
              <p className="font-bold text-sm">دلعين الدمشقي</p>
              <p className="text-xs text-white/60">لوحة التحكم</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-colors ${
                  isActive
                    ? 'bg-[hsl(43_74%_56%)] text-[hsl(348_58%_28%)]'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors px-4 py-2"
          >
            <ArrowRight className="w-4 h-4" />
            العودة للموقع
          </Link>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors px-4 py-2 w-full"
          >
            <LogOut className="w-4 h-4" />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-6 sm:p-8">{children}</main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthProvider>
  );
}
