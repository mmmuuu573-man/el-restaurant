'use client';

import { Star, Quote } from 'lucide-react';
import { reviews, restaurantInfo } from '@/lib/restaurant-data';

export default function Reviews() {
  return (
    <section id="reviews" className="py-20 bg-cream relative overflow-hidden">
      <div className="absolute inset-0 pattern-bg opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-block w-16 h-1 bg-gold rounded-full mb-4" />
          <h2 className="font-heading font-black text-4xl sm:text-5xl text-burgundy mb-3">
            آراء العملاء
          </h2>
          <p className="text-muted-foreground text-lg">ماذا قالوا عنّا</p>
        </div>

        {/* Rating Summary */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 bg-white rounded-3xl p-6 shadow-md border border-cream-dark max-w-2xl mx-auto">
          <div className="text-center">
            <p className="font-heading font-black text-5xl text-burgundy">{restaurantInfo.rating}</p>
            <p className="text-muted-foreground text-sm mt-1">من 5</p>
          </div>
          <div className="hidden sm:block w-px h-16 bg-cream-dark" />
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i <= Math.round(restaurantInfo.rating)
                      ? 'text-gold fill-gold'
                      : 'text-cream-dark'
                  }`}
                />
              ))}
            </div>
            <p className="text-muted-foreground text-sm">
              أكثر من {restaurantInfo.reviewCount.toLocaleString('ar-EG')}+ تقييم
            </p>
          </div>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-cream-dark hover:border-gold/40 relative"
            >
              <Quote className="absolute top-4 left-4 w-8 h-8 text-gold/20" />
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i <= review.rating ? 'text-gold fill-gold' : 'text-cream-dark'
                    }`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 min-h-[80px]">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-cream-dark">
                <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center">
                  <span className="text-burgundy font-heading font-bold">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-heading font-bold text-charcoal text-sm">{review.name}</p>
                  <p className="text-muted-foreground text-xs">{review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-muted-foreground text-xs mt-8">
          * الآراء المعروضة هي آراء عملاء المطعم وتُعرض لأغراض العرض التوضيحي.
        </p>
      </div>
    </section>
  );
}
