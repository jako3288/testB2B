'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, products as allProducts } from '@/data/products';

export interface CartItem {
  productId: string;
  name: string;
  qty: number;
  unitPrice: number;
  lineTotal: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, qty: number) => void;
  removeFromCart: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  getVolumePrice: (product: Product, qty: number) => number;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('tb-cart');
      if (saved) setItems(JSON.parse(saved));
    } catch {
      localStorage.removeItem('tb-cart');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tb-cart', JSON.stringify(items));
  }, [items]);

  function getVolumePrice(product: Product, qty: number): number {
    const tiers = [...product.volumePricing].sort((a, b) => b.minQty - a.minQty);
    for (const tier of tiers) {
      if (qty >= tier.minQty) return tier.price;
    }
    return product.basePrice;
  }

  function addToCart(product: Product, qty: number) {
    setItems(prev => {
      const existing = prev.find(i => i.productId === product.id);
      if (existing) {
        const newQty = existing.qty + qty;
        const unitPrice = getVolumePrice(product, newQty);
        return prev.map(i =>
          i.productId === product.id
            ? { ...i, qty: newQty, unitPrice, lineTotal: newQty * unitPrice }
            : i
        );
      }
      const unitPrice = getVolumePrice(product, qty);
      return [
        ...prev,
        { productId: product.id, name: product.name, qty, unitPrice, lineTotal: qty * unitPrice },
      ];
    });
  }

  function removeFromCart(productId: string) {
    setItems(prev => prev.filter(i => i.productId !== productId));
  }

  function updateQty(productId: string, qty: number) {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(prev =>
      prev.map(i => {
        if (i.productId !== productId) return i;
        const product = allProducts.find(p => p.id === productId);
        const unitPrice = product ? getVolumePrice(product, qty) : i.unitPrice;
        return { ...i, qty, unitPrice, lineTotal: qty * unitPrice };
      })
    );
  }

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = Math.round(items.reduce((sum, i) => sum + i.lineTotal, 0));

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart: () => setItems([]),
        getVolumePrice,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
