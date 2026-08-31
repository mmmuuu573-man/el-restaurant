'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import type { MenuItem, FeaturedDish } from '@/lib/restaurant-data';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  totalQuantity: number;
  subtotal: number;
  addItem: (item: MenuItem | FeaturedDish, quantity?: number) => void;
  removeItem: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
  openItemModal: (item: MenuItem | FeaturedDish) => void;
  openCart: () => void;
  closeCart: () => void;
  isCartOpen: boolean;
  activeItem: MenuItem | FeaturedDish | null;
  closeItemModal: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<MenuItem | FeaturedDish | null>(null);

  const addItem = useCallback((item: MenuItem | FeaturedDish, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: item.priceValue,
          image: item.image,
          quantity,
        },
      ];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const increaseQuantity = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
    );
  }, []);

  const decreaseQuantity = useCallback((id: string) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const openItemModal = useCallback((item: MenuItem | FeaturedDish) => {
    setActiveItem(item);
  }, []);

  const closeItemModal = useCallback(() => setActiveItem(null), []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const totalQuantity = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );

  const value: CartContextType = {
    items,
    totalQuantity,
    subtotal,
    addItem,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    openItemModal,
    openCart,
    closeCart,
    isCartOpen,
    activeItem,
    closeItemModal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
