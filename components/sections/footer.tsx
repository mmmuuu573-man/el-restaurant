'use client';

import { Phone, MapPin, Facebook, Instagram, Music2 } from 'lucide-react';
import { restaurantInfo, navLinks } from '@/lib/restaurant-data';

export default function Footer() {
  const socials = [
    { icon: Facebook, url: restaurantInfo.social.facebook, label: 'Facebook' },
    { icon: Instagram, url: restaurantInfo.social.instagram, label: 'Instagram' },
    { icon: Music2, url: restaurantInfo.social.tiktok, label: 'TikTok' },
  ].filter((s) => s.url);

  return (
    <footer className="bg-charcoal text-cream relative overflow-hidden">
      <div className="absolute inset-0 pattern-bg-gold opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="text-right">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-12 rounded-full bg-burgundy flex items-center justify-center">
                <span className="text-gold font-heading font-bold text-xl">د</span>
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-cream">{restaurantInfo.name}</h3>
                <p className="text-gold text-xs">مطعم شاورما سوري</p>
              </div>
            </div>
            <p className="text-cream/60 text-sm leading-relaxed mb-4">
              {restaurantInfo.tagline}
            </p>
            <p className="text-cream/50 text-sm leading-relaxed">
              {restaurantInfo.description}
            </p>
          </div>

          {/* Links */}
          <div className="text-right">
            <h4 className="font-heading font-bold text-lg text-gold mb-5">روابط سريعة</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-cream/70 hover:text-gold text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-right">
            <h4 className="font-heading font-bold text-lg text-gold mb-5">تواصل معنا</h4>
            <div className="space-y-4">
              <a
                href={`tel:${restaurantInfo.phone}`}
                className="flex items-center gap-3 text-cream/70 hover:text-gold transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-burgundy/30 flex items-center justify-center group-hover:bg-burgundy transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <span dir="ltr" className="text-sm font-medium">{restaurantInfo.phoneDisplay}</span>
              </a>
              <div className="flex items-start gap-3 text-cream/70">
                <div className="w-10 h-10 rounded-xl bg-burgundy/30 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-sm">
                  <p>{restaurantInfo.address}</p>
                  <p>{restaurantInfo.addressLine2}</p>
                </div>
              </div>
            </div>

            {/* Social */}
            {socials.length > 0 ? (
              <div className="flex items-center gap-3 mt-6">
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-10 h-10 rounded-xl bg-burgundy/30 hover:bg-burgundy flex items-center justify-center transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            ) : (
              <p className="text-cream/40 text-xs mt-6">
                سيتم إضافة روابط التواصل الاجتماعي قريباً
              </p>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-6 border-t border-cream/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-cream/40 text-sm">
              © {new Date().getFullYear()} {restaurantInfo.name}. جميع الحقوق محفوظة.
            </p>
            <p className="text-cream/40 text-sm">
              صُنع بحب في العبور، القليوبية
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
