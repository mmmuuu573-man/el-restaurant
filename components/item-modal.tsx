'use client';

import { useState, useEffect } from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/components/cart-provider';

export default function ItemModal() {
  const { activeItem, closeItemModal, addItem, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (activeItem) setQuantity(1);
  }, [activeItem]);

  if (!activeItem) return null;

  const handleAddToCart = () => {
    addItem(activeItem, quantity);
    closeItemModal();
    openCart();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      onClick={closeItemModal}
    >
      <div className="absolute inset-0 bg-charcoal/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md bg-cream rounded-2xl shadow-2xl overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={activeItem.image}
            alt={activeItem.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-burgundy-dark/50 to-transparent" />
          <button
            onClick={closeItemModal}
            className="absolute top-4 left-4 w-9 h-9 rounded-full bg-cream/90 backdrop-blur-sm flex items-center justify-center text-charcoal hover:bg-cream transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-heading font-bold text-xl text-charcoal mb-2">
            {activeItem.name}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            {activeItem.description}
          </p>
          <p className="text-burgundy font-heading font-bold text-2xl mb-6">
            {activeItem.priceValue} ج.م
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between mb-6">
            <span className="font-heading font-bold text-charcoal">الكمية</span>
            <div className="flex items-center gap-3 bg-white rounded-full border border-cream-dark p-1">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-9 h-9 rounded-full bg-burgundy/10 hover:bg-burgundy/20 flex items-center justify-center text-burgundy transition-colors"
                aria-label="تقليل"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-heading font-bold text-lg text-charcoal w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-9 h-9 rounded-full bg-burgundy/10 hover:bg-burgundy/20 flex items-center justify-center text-burgundy transition-colors"
                aria-label="زيادة"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 bg-burgundy hover:bg-burgundy-dark text-cream font-heading font-bold text-lg py-3.5 rounded-full transition-all duration-300 hover:shadow-lg"
          >
            <ShoppingBag className="w-5 h-5" />
            أضف للسلة — {activeItem.priceValue * quantity} ج.م
          </button>
        </div>
      </div>
    </div>
  );
}
