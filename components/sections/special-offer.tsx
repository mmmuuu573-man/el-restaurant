'use client';

import { ArrowLeft, Flame, ShoppingBag } from 'lucide-react';
import { useCart } from '@/components/cart-provider';

export default function SpecialOffer() {
  const { openCart } = useCart();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-burgundy-dark shadow-2xl">
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/18177327/pexels-photo-18177327.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              alt="أطباق سورية"
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-burgundy-dark via-burgundy-dark/85 to-burgundy-dark/60" />
          </div>

          {/* Pattern overlay */}
          <div className="absolute inset-0 pattern-bg-gold opacity-40" />

          {/* Content */}
          <div className="relative z-10 px-6 sm:px-12 py-12 sm:py-16 text-right">
            <div className="max-w-lg">
              <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/40 rounded-full px-4 py-1.5 mb-5">
                <Flame className="w-4 h-4 text-gold" />
                <span className="text-gold font-bold text-sm">عرض خاص</span>
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-cream mb-4 leading-tight">
                جوعان؟ دلعين هو الحل!
              </h2>
              <p className="text-cream/80 text-lg sm:text-xl mb-8 leading-relaxed">
                اطلب وجبتك المفضلة واستمتع بطعم الشاورما السورية الأصيلة.
              </p>
              <a
                href="#menu"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-charcoal font-heading font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <ShoppingBag className="w-5 h-5" />
                اطلب الآن
                <ArrowLeft className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
