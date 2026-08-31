'use client';

import { MapPin, Phone, Navigation, Clock, ShoppingBag } from 'lucide-react';
import { restaurantInfo } from '@/lib/restaurant-data';
import { useCart } from '@/components/cart-provider';

export default function Location() {
  const { openCart } = useCart();

  return (
    <section id="location" className="py-20 bg-cream-dark relative overflow-hidden">
      <div className="absolute inset-0 pattern-bg opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-block w-16 h-1 bg-gold rounded-full mb-4" />
          <h2 className="font-heading font-black text-4xl sm:text-5xl text-burgundy mb-3">
            زورنا في دلعين الدمشقي
          </h2>
          <p className="text-muted-foreground text-lg">نستنىكم في العبور</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Info Card */}
          <div className="space-y-6">
            {/* Address */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-cream-dark hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-burgundy/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-burgundy" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-lg text-charcoal mb-2">العنوان</h3>
                  <p className="text-muted-foreground">{restaurantInfo.address}</p>
                  <p className="text-muted-foreground">{restaurantInfo.addressLine2}</p>
                  <a
                    href={restaurantInfo.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 bg-burgundy/10 hover:bg-burgundy text-burgundy hover:text-cream font-heading font-bold text-sm px-5 py-2.5 rounded-full transition-all duration-300"
                  >
                    <Navigation className="w-4 h-4" />
                    احصل على الاتجاهات
                  </a>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-cream-dark hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-burgundy/10 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-burgundy" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-lg text-charcoal mb-2">الهاتف</h3>
                  <p className="text-muted-foreground text-lg font-bold" dir="ltr">
                    {restaurantInfo.phoneDisplay}
                  </p>
                  <a
                    href={`tel:${restaurantInfo.phone}`}
                    className="inline-flex items-center gap-2 mt-4 bg-burgundy/10 hover:bg-burgundy text-burgundy hover:text-cream font-heading font-bold text-sm px-5 py-2.5 rounded-full transition-all duration-300"
                  >
                    <Phone className="w-4 h-4" />
                    اتصل الآن
                  </a>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-cream-dark hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-burgundy/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-burgundy" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-lg text-charcoal mb-2">مواعيد العمل</h3>
                  <p className="text-muted-foreground">يومياً</p>
                  <p className="text-charcoal font-bold text-lg mt-1">{restaurantInfo.openingHours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl min-h-[400px] border border-cream-dark">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=31.1%2C30.2%2C31.3%2C30.3&layer=mapnik&marker=30.25%2C31.2"
              className="w-full h-full absolute inset-0"
              style={{ border: 0, minHeight: '400px' }}
              loading="lazy"
              title="موقع دلعين الدمشقي"
            />
          </div>
        </div>

        {/* Order CTA */}
        <div className="text-center mt-10">
          <a
            href="#menu"
            className="inline-flex items-center gap-2 bg-burgundy hover:bg-burgundy-dark text-cream font-heading font-bold text-lg px-10 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105 glow-burgundy"
          >
            <ShoppingBag className="w-5 h-5" />
            اطلب الآن
          </a>
        </div>
      </div>
    </section>
  );
}
