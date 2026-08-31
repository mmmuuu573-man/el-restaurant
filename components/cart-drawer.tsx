'use client';

import { useState, useEffect } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  Phone,
  Store,
  Bike,
  Check,
} from 'lucide-react';
import { useCart } from '@/components/cart-provider';
import { restaurantInfo, ORDER_WHATSAPP_NUMBER } from '@/lib/restaurant-data';

type CheckoutStep = 'cart' | 'checkout' | 'success';
type OrderMethod = 'pickup' | 'delivery';

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    subtotal,
    totalQuantity,
    clearCart,
  } = useCart();

  const [step, setStep] = useState<CheckoutStep>('cart');
  const [orderMethod, setOrderMethod] = useState<OrderMethod>('pickup');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (!isCartOpen) {
      const timer = setTimeout(() => setStep('cart'), 300);
      return () => clearTimeout(timer);
    }
  }, [isCartOpen]);

  useEffect(() => {
    if (items.length === 0 && step !== 'success') {
      setStep('cart');
    }
  }, [items.length, step]);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    if (items.length === 0) return;
    setStep('checkout');
    setFormError('');
  };

  const handleSubmitOrder = () => {
    setFormError('');

    if (!customerName.trim()) {
      setFormError('الرجاء إدخال الاسم');
      return;
    }
    if (!customerPhone.trim()) {
      setFormError('الرجاء إدخال رقم الهاتف');
      return;
    }
    if (orderMethod === 'delivery' && !address.trim()) {
      setFormError('الرجاء إدخال عنوان التوصيل');
      return;
    }

    const message = buildWhatsAppMessage({
      customerName,
      customerPhone,
      items,
      subtotal,
      orderMethod,
      address,
      notes,
    });

    const whatsappNumber = ORDER_WHATSAPP_NUMBER.replace(/\D/g, '');
    const fullNumber = whatsappNumber.startsWith('0')
      ? '2' + whatsappNumber
      : whatsappNumber;

    window.open(
      `https://wa.me/${fullNumber}?text=${encodeURIComponent(message)}`,
      '_blank'
    );

    clearCart();
    setCustomerName('');
    setCustomerPhone('');
    setAddress('');
    setNotes('');
    setStep('success');
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex" onClick={closeCart}>
      <div className="absolute inset-0 bg-charcoal/70 backdrop-blur-sm animate-fade-in" />
      <div
        className="relative mr-auto w-full max-w-md h-full bg-cream shadow-2xl flex flex-col animate-slide-in-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-burgundy px-5 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            {step === 'checkout' && (
              <button
                onClick={() => setStep('cart')}
                className="text-cream/80 hover:text-cream transition-colors"
                aria-label="رجوع"
              >
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </button>
            )}
            <h3 className="text-xl font-heading font-bold text-cream">
              {step === 'cart' && 'سلة الطلبات'}
              {step === 'checkout' && 'إتمام الطلب'}
              {step === 'success' && 'تم الطلب!'}
            </h3>
          </div>
          <button
            onClick={closeCart}
            className="text-cream/80 hover:text-cream transition-colors p-1 rounded-lg hover:bg-burgundy-dark"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Step */}
        {step === 'cart' && (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-20">
                  <div className="w-20 h-20 rounded-full bg-burgundy/10 flex items-center justify-center mb-4">
                    <ShoppingBag className="w-10 h-10 text-burgundy/40" />
                  </div>
                  <p className="font-heading font-bold text-lg text-charcoal mb-1">
                    السلة فارغة
                  </p>
                  <p className="text-muted-foreground text-sm">
                    أضف بعض الأطباق اللذيذة لتبدأ طلبك
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 bg-white rounded-xl p-3 border border-cream-dark"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-heading font-bold text-sm text-charcoal mb-1 truncate">
                          {item.name}
                        </h4>
                        <p className="text-burgundy font-bold text-sm">
                          {item.price} ج.م
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 bg-cream rounded-full p-0.5">
                            <button
                              onClick={() => decreaseQuantity(item.id)}
                              className="w-7 h-7 rounded-full bg-burgundy/10 hover:bg-burgundy/20 flex items-center justify-center text-burgundy transition-colors"
                              aria-label="تقليل"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="font-heading font-bold text-sm text-charcoal w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => increaseQuantity(item.id)}
                              className="w-7 h-7 rounded-full bg-burgundy/10 hover:bg-burgundy/20 flex items-center justify-center text-burgundy transition-colors"
                              aria-label="زيادة"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="w-7 h-7 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-500 transition-colors"
                            aria-label="حذف"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <span className="font-heading font-bold text-sm text-charcoal">
                          {item.price * item.quantity} ج.م
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-cream-dark bg-white p-4 flex-shrink-0 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">الإجمالي ({totalQuantity} صنف)</span>
                  <span className="font-heading font-bold text-xl text-burgundy">
                    {subtotal} ج.م
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-burgundy hover:bg-burgundy-dark text-cream font-heading font-bold text-lg py-3 rounded-full transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
                >
                  إتمام الطلب
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}

        {/* Checkout Step */}
        {step === 'checkout' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            {/* Order Method */}
            <div>
              <h4 className="font-heading font-bold text-charcoal mb-3">طريقة الطلب</h4>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setOrderMethod('pickup')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${
                    orderMethod === 'pickup'
                      ? 'border-burgundy bg-burgundy/5'
                      : 'border-cream-dark bg-white'
                  }`}
                >
                  <Store
                    className={`w-7 h-7 ${
                      orderMethod === 'pickup' ? 'text-burgundy' : 'text-muted-foreground'
                    }`}
                  />
                  <span
                    className={`font-heading font-bold text-sm ${
                      orderMethod === 'pickup' ? 'text-burgundy' : 'text-charcoal'
                    }`}
                  >
                    استلام من المطعم
                  </span>
                </button>
                <button
                  onClick={() => setOrderMethod('delivery')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${
                    orderMethod === 'delivery'
                      ? 'border-burgundy bg-burgundy/5'
                      : 'border-cream-dark bg-white'
                  }`}
                >
                  <Bike
                    className={`w-7 h-7 ${
                      orderMethod === 'delivery' ? 'text-burgundy' : 'text-muted-foreground'
                    }`}
                  />
                  <span
                    className={`font-heading font-bold text-sm ${
                      orderMethod === 'delivery' ? 'text-burgundy' : 'text-charcoal'
                    }`}
                  >
                    توصيل
                  </span>
                </button>
              </div>
            </div>

            {/* Customer Info */}
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-heading font-bold text-charcoal mb-1.5">
                  الاسم
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="اكتب اسمك"
                  className="w-full bg-white border border-cream-dark rounded-xl px-4 py-2.5 text-charcoal placeholder:text-muted-foreground/50 focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-heading font-bold text-charcoal mb-1.5">
                  رقم الهاتف
                </label>
                <div className="relative">
                  <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="01xxxxxxxxx"
                    dir="ltr"
                    className="w-full bg-white border border-cream-dark rounded-xl px-4 py-2.5 pr-10 text-charcoal placeholder:text-muted-foreground/50 focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy transition-colors text-right"
                  />
                </div>
              </div>
              {orderMethod === 'delivery' && (
                <div>
                  <label className="block text-sm font-heading font-bold text-charcoal mb-1.5">
                    عنوان التوصيل
                  </label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="اكتب عنوانك بالتفصيل"
                    rows={2}
                    className="w-full bg-white border border-cream-dark rounded-xl px-4 py-2.5 text-charcoal placeholder:text-muted-foreground/50 focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy transition-colors resize-none"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-heading font-bold text-charcoal mb-1.5">
                  ملاحظات (اختياري)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="أي ملاحظات على طلبك"
                  rows={2}
                  className="w-full bg-white border border-cream-dark rounded-xl px-4 py-2.5 text-charcoal placeholder:text-muted-foreground/50 focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy transition-colors resize-none"
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-xl border border-cream-dark p-4">
              <h4 className="font-heading font-bold text-charcoal mb-3">ملخص الطلب</h4>
              <div className="space-y-2 mb-3">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.quantity} × {item.name}
                    </span>
                    <span className="font-bold text-charcoal">
                      {item.price * item.quantity} ج.م
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-cream-dark pt-2 flex items-center justify-between">
                <span className="font-heading font-bold text-charcoal">الإجمالي</span>
                <span className="font-heading font-bold text-lg text-burgundy">
                  {subtotal} ج.م
                </span>
              </div>
            </div>

            {formError && (
              <p className="text-red-500 text-sm font-bold text-center">{formError}</p>
            )}
          </div>
        )}

        {/* Checkout Footer */}
        {step === 'checkout' && (
          <div className="border-t border-cream-dark bg-white p-4 flex-shrink-0 space-y-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-muted-foreground">الإجمالي ({totalQuantity} صنف)</span>
              <span className="font-heading font-bold text-xl text-burgundy">
                {subtotal} ج.م
              </span>
            </div>
            <button
              onClick={handleSubmitOrder}
              className="w-full bg-burgundy hover:bg-burgundy-dark text-cream font-heading font-bold text-lg py-3 rounded-full transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
            >
              إرسال الطلب عبر واتساب
            </button>
            <div className="flex items-center justify-center gap-2">
              <a
                href={`tel:${restaurantInfo.phone}`}
                className="flex items-center gap-1.5 text-burgundy hover:text-burgundy-dark font-bold text-sm transition-colors"
              >
                <Phone className="w-4 h-4" />
                أو اتصل بنا: {restaurantInfo.phoneDisplay}
              </a>
            </div>
          </div>
        )}

        {/* Success Step */}
        {step === 'success' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-5">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="font-heading font-black text-2xl text-charcoal mb-2">
              تم إرسال طلبك!
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              تم فتح واتساب برسالة طلبك جاهزة للإرسال. أرسل الرسالة لتأكيد طلبك.
            </p>
            <button
              onClick={closeCart}
              className="bg-burgundy hover:bg-burgundy-dark text-cream font-heading font-bold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg"
            >
              متابعة التصفح
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function buildWhatsAppMessage(params: {
  customerName: string;
  customerPhone: string;
  items: { id: string; name: string; price: number; quantity: number }[];
  subtotal: number;
  orderMethod: OrderMethod;
  address: string;
  notes: string;
}): string {
  const { customerName, customerPhone, items, subtotal, orderMethod, address, notes } = params;

  const lines: string[] = [];
  lines.push(`🛒 *طلب جديد من ${restaurantInfo.name}*`);
  lines.push('');
  lines.push(`👤 الاسم: ${customerName}`);
  lines.push(`📞 الهاتف: ${customerPhone}`);
  lines.push('');
  lines.push('📋 *الطلب:*');
  for (const item of items) {
    lines.push(`${item.quantity} × ${item.name} — ${item.price * item.quantity} ج.م`);
  }
  lines.push('');
  lines.push(`💰 *الإجمالي: ${subtotal} ج.م*`);
  lines.push('');
  lines.push(`📦 طريقة الطلب: ${orderMethod === 'pickup' ? 'استلام من المطعم' : 'توصيل'}`);
  if (orderMethod === 'delivery' && address.trim()) {
    lines.push(`📍 العنوان: ${address}`);
  }
  if (notes.trim()) {
    lines.push(`📝 ملاحظات: ${notes}`);
  }

  return lines.join('\n');
}
