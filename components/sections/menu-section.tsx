'use client';

import { useState, useMemo, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useCart } from '@/components/cart-provider';
import { useMenuData } from '@/hooks/use-menu-data';

export default function MenuSection() {
  const { categories: menuCategories, items: menuItems } = useMenuData();
  const [activeCategory, setActiveCategory] = useState('');
  const { openItemModal } = useCart();

  useEffect(() => {
    if (menuCategories.length > 0 && !activeCategory) {
      setActiveCategory(menuCategories[0].id);
    }
  }, [menuCategories, activeCategory]);

  const filteredItems = useMemo(
    () => menuItems.filter((item) => item.category === activeCategory),
    [activeCategory, menuItems]
  );

  return (
    <section id="menu" className="py-20 bg-cream-dark relative overflow-hidden">
      <div className="absolute inset-0 pattern-bg opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block w-16 h-1 bg-gold rounded-full mb-4" />
          <h2 className="font-heading font-black text-4xl sm:text-5xl text-burgundy mb-3">
            المنيو
          </h2>
          <p className="text-muted-foreground text-lg">تصفح أطباقنا اللذيذة حسب الفئة</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full font-heading font-bold text-sm sm:text-base transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-burgundy text-cream shadow-lg scale-105'
                  : 'bg-white text-charcoal hover:bg-burgundy/10 border border-cream-dark'
              }`}
            >
              <span className="text-base">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div
          key={activeCategory}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-cream-dark hover:border-gold/40 animate-scale-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex flex-col sm:flex-row">
                {/* Image */}
                <div className="relative sm:w-2/5 h-48 sm:h-auto overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-charcoal mb-1 group-hover:text-burgundy transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed mb-3">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-burgundy font-heading font-bold text-base">
                      {item.priceValue} ج.م
                    </span>
                    <button
                      onClick={() => openItemModal(item)}
                      className="flex items-center gap-1.5 bg-burgundy/10 hover:bg-burgundy text-burgundy hover:text-cream font-heading font-bold text-sm px-4 py-2 rounded-lg transition-all duration-300"
                    >
                      <Plus className="w-4 h-4" />
                      إضافة للطلب
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-muted-foreground text-sm mt-10">
          الأسعار تقريبية وقابلة للتغيير. يرجى الاتصال للتأكد من السعر الحالي.
        </p>
      </div>
    </section>
  );
}
