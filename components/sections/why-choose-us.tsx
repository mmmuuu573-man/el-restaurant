'use client';

import { Flame, Leaf, UtensilsCrossed, MapPin } from 'lucide-react';
import { features } from '@/lib/restaurant-data';

const iconMap: Record<string, typeof Flame> = {
  Flame,
  Leaf,
  UtensilsCrossed,
  MapPin,
};

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-cream-dark relative overflow-hidden">
      <div className="absolute inset-0 pattern-bg opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-block w-16 h-1 bg-gold rounded-full mb-4" />
          <h2 className="font-heading font-black text-4xl sm:text-5xl text-burgundy mb-3">
            ليه دلعين الدمشقي؟
          </h2>
          <p className="text-muted-foreground text-lg">مميزات تخليك تختارنا كل مرة</p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Flame;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 border border-cream-dark hover:border-gold/40 hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-burgundy/10 group-hover:bg-burgundy transition-colors duration-300 mb-5">
                  <Icon className="w-8 h-8 text-burgundy group-hover:text-cream transition-colors duration-300" />
                </div>
                <h3 className="font-heading font-bold text-lg text-charcoal mb-2 group-hover:text-burgundy transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
