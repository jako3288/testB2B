'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import Logo from './Logo';
import { useState } from 'react';

export default function Header() {
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-[#003B8E] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <Logo white />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="hover:text-orange-400 transition-colors font-medium">
              Produkter
            </Link>
            <Link href="/support" className="hover:text-orange-400 transition-colors font-medium">
              Support
            </Link>
            <Link
              href="/cart"
              className="relative flex items-center gap-1 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-10H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Indkøbskurv
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>
          </nav>

          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-3">
            <Link
              href="/"
              className="hover:text-orange-400 font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Produkter
            </Link>
            <Link
              href="/support"
              className="hover:text-orange-400 font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Support
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg font-medium w-fit"
              onClick={() => setMobileOpen(false)}
            >
              Indkøbskurv {totalItems > 0 && `(${totalItems})`}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
