'use client';

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { restaurantInfo } from '@/lib/restaurant-data';

export default function OpeningHours() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkOpen = () => {
      const now = new Date();
      const hour = now.getHours();
      // Open 7 AM to 2 AM (next day)
      // So open if hour >= 7 OR hour < 2
      setIsOpen(hour >= restaurantInfo.openHour || hour < (restaurantInfo.closeHour % 24));
    };
    checkOpen();
    const interval = setInterval(checkOpen, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="contact" className="py-16 bg-burgundy-dark relative overflow-hidden">
      <div className="absolute inset-0 pattern-bg-gold opacity-40" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-cream/5 backdrop-blur-md border border-gold/20 rounded-3xl p-8 sm:p-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gold/20 mb-5">
            <Clock className="w-8 h-8 text-gold" />
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-cream mb-2">
            مواعيد العمل
          </h2>
          <p className="text-cream/60 text-sm mb-6">نخدمكم طوال أيام الأسبوع</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            <div>
              <p className="text-cream/70 text-sm mb-1">يومياً</p>
              <p className="font-heading font-bold text-2xl text-gold">{restaurantInfo.openingHours}</p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-cream/20" />
            <div className="flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-full ${
                  mounted && isOpen ? 'bg-green-400 animate-pulse' : 'bg-red-400'
                }`}
              />
              <span className="font-heading font-bold text-xl text-cream">
                {mounted ? (isOpen ? 'مفتوح الآن' : 'مغلق الآن') : '...'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
