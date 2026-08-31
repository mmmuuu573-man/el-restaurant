'use client';

import { Star, ArrowLeft, BookOpen, ShoppingBag } from 'lucide-react';
import { restaurantInfo } from '@/lib/restaurant-data';
import { useCart } from '@/components/cart-provider';

export default function Hero() {
  const { openCart } = useCart();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-burgundy-dark"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/5779876/pexels-photo-5779876.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600"
          alt="شاورما سورية"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-burgundy-dark/80 via-burgundy-dark/70 to-burgundy-dark/90" />
      </div>

      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 pattern-bg-gold opacity-50" />

      {/* Gold accent lines */}
      <div className="absolute top-20 right-0 left-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute bottom-20 right-0 left-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pt-20 pb-12">
        {/* Rating badge */}
        <div className="inline-flex items-center gap-2 bg-cream/10 backdrop-blur-sm border border-gold/30 rounded-full px-5 py-2 mb-8 animate-fade-in">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i <= Math.round(restaurantInfo.rating)
                    ? 'text-gold fill-gold'
                    : 'text-cream/30'
                }`}
              />
            ))}
          </div>
          <span className="text-cream font-bold text-sm">{restaurantInfo.rating}</span>
          <span className="text-cream/60 text-sm">أكثر من 4,500 تقييم</span>
        </div>

        {/* Title */}
        <h1 className="font-heading font-black text-5xl sm:text-6xl lg:text-7xl text-cream mb-4 animate-fade-up">
          {restaurantInfo.name}
        </h1>

        {/* Tagline */}
        <p className="text-gradient-gold font-heading font-bold text-2xl sm:text-3xl mb-6 animate-fade-up delay-100">
          {restaurantInfo.tagline}
        </p>

        {/* Description */}
        <p className="text-cream/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up delay-200">
          {restaurantInfo.description}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-300">
          <a
            href="#menu"
            className="w-full sm:w-auto bg-gold hover:bg-gold-dark text-charcoal font-heading font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-5 h-5" />
            اطلب الآن
            <ArrowLeft className="w-5 h-5" />
          </a>
          <a
            href="#menu"
            className="w-full sm:w-auto bg-transparent border-2 border-cream/40 hover:border-gold text-cream font-heading font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 hover:bg-cream/10 flex items-center justify-center gap-2"
          >
            <BookOpen className="w-5 h-5" />
            شاهد المنيو
          </a>
        </div>

        {/* Services */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-12 animate-fade-up delay-400">
          {restaurantInfo.services.map((service) => (
            <span
              key={service}
              className="bg-cream/10 backdrop-blur-sm border border-cream/20 text-cream/90 text-sm px-4 py-1.5 rounded-full"
            >
              {service}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-cream/40 rounded-full flex items-start justify-center p-1.5">
          <div className="w-1 h-2 bg-gold rounded-full" />
        </div>
      </div>
    </section>
  );
}
