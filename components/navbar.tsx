'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Phone, ShoppingBag } from 'lucide-react';
import { navLinks, restaurantInfo } from '@/lib/restaurant-data';
import { useCart } from '@/components/cart-provider';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openCart, totalQuantity } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream/95 backdrop-blur-md shadow-lg py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-burgundy flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-gold font-heading font-bold text-lg">د</span>
            </div>
            <div className="flex flex-col">
              <span className={`font-heading font-bold text-lg leading-tight ${scrolled ? 'text-burgundy' : 'text-burgundy'}`}>
                دلعين الدمشقي
              </span>
              <span className={`text-xs leading-tight ${scrolled ? 'text-gold-dark' : 'text-gold'}`}>
                مطعم شاورما سوري
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-charcoal hover:text-burgundy font-medium text-sm transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gold group-hover:w-3/4 transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Cart + Order Button (Desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${restaurantInfo.phone}`}
              className="flex items-center gap-2 text-charcoal hover:text-burgundy transition-colors text-sm font-medium"
            >
              <Phone className="w-4 h-4" />
              {restaurantInfo.phoneDisplay}
            </a>
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 bg-cream/80 hover:bg-cream text-burgundy border border-burgundy/20 font-heading font-bold px-4 py-2.5 rounded-full transition-all duration-300 hover:shadow-md"
              aria-label="السلة"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-gold text-charcoal text-xs font-bold flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
              <span className="hidden xl:inline">السلة</span>
            </button>
            <a
              href="#menu"
              className="bg-burgundy hover:bg-burgundy-dark text-cream font-heading font-bold px-6 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 glow-burgundy"
            >
              اطلب الآن
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={openCart}
              className="relative p-2 text-burgundy"
              aria-label="السلة"
            >
              <ShoppingBag className="w-6 h-6" />
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-gold text-charcoal text-xs font-bold flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-burgundy"
              aria-label="القائمة"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-cream shadow-xl border-t border-cream-dark animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-charcoal hover:bg-burgundy/5 hover:text-burgundy rounded-lg font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#menu"
              onClick={() => setMobileOpen(false)}
              className="block w-full mt-2 bg-burgundy text-cream font-heading font-bold py-3 rounded-full transition-colors hover:bg-burgundy-dark text-center"
            >
              اطلب الآن
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
