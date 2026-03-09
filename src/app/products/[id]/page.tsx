'use client';
import { useParams } from 'next/navigation';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import Link from 'next/link';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { addToCart, getVolumePrice } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-4">😕</div>
        <h1 className="text-2xl font-bold mb-4">Produkt ikke fundet</h1>
        <Link href="/" className="text-[#003B8E] hover:underline">
          ← Tilbage til katalog
        </Link>
      </div>
    );
  }

  const currentPrice = getVolumePrice(product, qty);
  const lineTotal = currentPrice * qty;

  function handleAddToCart() {
    if (!product) return;
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link href="/" className="text-[#003B8E] hover:underline text-sm mb-6 block">
        ← Tilbage til katalog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image */}
        <div className="bg-gray-50 rounded-2xl h-80 flex items-center justify-center text-9xl border border-gray-200">
          {product.image}
        </div>

        {/* Details */}
        <div>
          <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">{product.brand}</p>
          <h1 className="text-3xl font-bold text-gray-900 mt-1 mb-2">{product.name}</h1>
          <p className="text-sm text-gray-400 mb-4">SKU: {product.sku}</p>

          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Features */}
          <ul className="space-y-1 mb-6">
            {product.features.map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-green-500 font-bold">✓</span> {f}
              </li>
            ))}
          </ul>

          {/* Volume pricing table */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-[#003B8E] mb-3">Mængdepriser (ekskl. moms)</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 text-xs uppercase">
                  <th className="text-left pb-2">Antal</th>
                  <th className="text-right pb-2">Pris/stk.</th>
                  <th className="text-right pb-2">Besparelse</th>
                </tr>
              </thead>
              <tbody>
                {product.volumePricing.map((tier, i) => {
                  const isActive =
                    qty >= tier.minQty &&
                    (i === product.volumePricing.length - 1 ||
                      qty < product.volumePricing[i + 1].minQty);
                  const savings = product.basePrice - tier.price;
                  return (
                    <tr
                      key={i}
                      className={`border-t border-blue-100 ${isActive ? 'bg-blue-100 font-semibold' : ''}`}
                    >
                      <td className="py-1.5">
                        {i < product.volumePricing.length - 1
                          ? `${tier.minQty} - ${product.volumePricing[i + 1].minQty - 1} stk.`
                          : `${tier.minQty}+ stk.`}
                      </td>
                      <td className="text-right py-1.5">{tier.price.toLocaleString('da-DK')} kr.</td>
                      <td className="text-right py-1.5 text-green-600">
                        {savings > 0 ? `-${savings.toLocaleString('da-DK')} kr.` : '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Price & qty */}
          <div className="flex items-center gap-4 mb-4">
            <div>
              <span className="text-3xl font-bold text-[#003B8E]">
                {currentPrice.toLocaleString('da-DK')} kr.
              </span>
              <span className="text-gray-400 text-sm ml-1">/ {product.unit}</span>
              <span className="text-gray-400 text-xs block">ekskl. moms</span>
            </div>
            {qty > 1 && (
              <div className="text-sm text-gray-500">
                Total:{' '}
                <span className="font-semibold">{lineTotal.toLocaleString('da-DK')} kr.</span>
              </div>
            )}
          </div>

          {/* Qty selector */}
          <div className="flex items-center gap-3 mb-4">
            <label className="text-sm font-medium text-gray-700">Antal:</label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                className="px-3 py-2 hover:bg-gray-100 font-bold text-lg"
              >
                −
              </button>
              <input
                type="number"
                min="1"
                value={qty}
                onChange={e => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center py-2 border-x border-gray-300 focus:outline-none"
              />
              <button
                onClick={() => setQty(q => q + 1)}
                className="px-3 py-2 hover:bg-gray-100 font-bold text-lg"
              >
                +
              </button>
            </div>
            <span className="text-sm text-gray-500">{product.unit}</span>
          </div>

          {/* Stock indicator */}
          <p
            className={`text-sm mb-4 ${
              product.stock > 10
                ? 'text-green-600'
                : product.stock > 0
                ? 'text-orange-500'
                : 'text-red-500'
            }`}
          >
            {product.stock > 10
              ? `✓ På lager (${product.stock} stk.)`
              : product.stock > 0
              ? `⚠ Kun ${product.stock} stk. tilbage`
              : '✗ Udsolgt'}
          </p>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-3 rounded-xl font-semibold text-lg transition-colors ${
              added
                ? 'bg-green-500 text-white'
                : 'bg-[#003B8E] hover:bg-[#0056C7] text-white'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {added ? '✓ Tilføjet til kurv!' : 'Tilføj til kurv'}
          </button>
        </div>
      </div>
    </div>
  );
}
