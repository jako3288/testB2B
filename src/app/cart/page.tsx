'use client';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { items, removeFromCart, updateQty, subtotal, clearCart } = useCart();
  const router = useRouter();
  const vat = Math.round(subtotal * 0.25);
  const total = subtotal + vat;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-2xl font-bold mb-2">Din indkøbskurv er tom</h1>
        <p className="text-gray-500 mb-6">Tilføj produkter fra vores katalog</p>
        <Link
          href="/"
          className="bg-[#003B8E] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0056C7]"
        >
          Gå til produkter
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Indkøbskurv</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => {
            const product = products.find(p => p.id === item.productId);
            return (
              <div
                key={item.productId}
                className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4"
              >
                <div className="text-4xl w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  {product?.image || '📦'}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    {item.unitPrice.toLocaleString('da-DK')} kr./stk. (ekskl. moms)
                  </p>
                  {product && product.volumePricing.length > 1 && (
                    <p className="text-xs text-green-600">✓ Mængdepris aktiv</p>
                  )}
                </div>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => updateQty(item.productId, item.qty - 1)}
                    className="px-2 py-1 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="px-3 py-1 border-x border-gray-300 min-w-[40px] text-center">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => updateQty(item.productId, item.qty + 1)}
                    className="px-2 py-1 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <div className="text-right min-w-[80px]">
                  <p className="font-semibold">{item.lineTotal.toLocaleString('da-DK')} kr.</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="text-red-400 hover:text-red-600 ml-2"
                >
                  ✕
                </button>
              </div>
            );
          })}
          <button onClick={clearCart} className="text-sm text-red-500 hover:underline">
            Tøm kurv
          </button>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 h-fit">
          <h2 className="text-xl font-bold mb-4">Ordreoversigt</h2>
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal (ekskl. moms)</span>
              <span className="font-medium">{subtotal.toLocaleString('da-DK')} kr.</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Moms (25%)</span>
              <span className="font-medium">{vat.toLocaleString('da-DK')} kr.</span>
            </div>
            <div className="flex justify-between text-base font-bold border-t pt-2 mt-2">
              <span>Total (inkl. moms)</span>
              <span className="text-[#003B8E]">{total.toLocaleString('da-DK')} kr.</span>
            </div>
          </div>
          <button
            onClick={() => router.push('/checkout')}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Gå til checkout →
          </button>
          <Link
            href="/"
            className="block text-center text-sm text-[#003B8E] hover:underline mt-3"
          >
            ← Fortsæt handel
          </Link>
        </div>
      </div>
    </div>
  );
}
