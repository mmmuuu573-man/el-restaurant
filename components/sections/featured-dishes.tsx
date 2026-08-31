'use client';

import { ArrowLeft, Plus } from 'lucide-react';
import { useCart } from '@/components/cart-provider';
import { useFeaturedDishes } from '@/hooks/use-featured-dishes';

export default function FeaturedDishes() {
  const { openItemModal } = useCart();
  const { dishes: featuredDishes } = useFeaturedDishes();

  return (
    <section className="py-20 bg-cream relative overflow-hidden">
      <div className="absolute inset-0 pattern-bg opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-block w-16 h-1 bg-gold rounded-full mb-4" />
          <h2 className="font-heading font-black text-4xl sm:text-5xl text-burgundy mb-3">
            أشهر أطباقنا
          </h2>
          <p className="text-muted-foreground text-lg">اختيارات بتحب ترجع لها كل مرة</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDishes.map((dish, index) => (
            <div
              key={dish.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-cream-dark hover:border-gold/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Price badge */}
                <div className="absolute top-4 left-4 bg-cream/95 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-md">
                  <span className="text-burgundy font-heading font-bold text-sm">
                    {dish.priceValue} ج.م
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-heading font-bold text-xl text-charcoal mb-2 group-hover:text-burgundy transition-colors">
                  {dish.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 min-h-[40px]">
                  {dish.description}
                </p>
                <button
                  onClick={() => openItemModal(dish)}
                  className="w-full flex items-center justify-center gap-2 bg-burgundy/10 hover:bg-burgundy text-burgundy hover:text-cream font-heading font-bold py-2.5 rounded-xl transition-all duration-300 group-hover:shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  أضف للسلة
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View full menu link */}
        <div className="text-center mt-12">
          <a
            href="#menu"
            className="inline-flex items-center gap-2 text-burgundy hover:text-burgundy-dark font-heading font-bold text-lg group transition-colors"
          >
            شاهد المنيو كاملاً
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
