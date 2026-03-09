'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { products, categories } from '@/data/products';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Alle');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchCat = selectedCategory === 'Alle' || p.category === selectedCategory;
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#003B8E] to-[#0056C7] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Professionelt Værktøj til Erhverv
          </h1>
          <p className="text-xl text-blue-200 mb-6 max-w-2xl">
            Kvalitetsværktøj fra de bedste mærker. Mængderabatter fra 5 stk. Levering 1-2 hverdage.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
              ✓ Ekskl. moms priser
            </span>
            <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium">
              ✓ Mængderabatter
            </span>
            <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium">
              ✓ Faktura betaling
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Søg efter produkt, mærke..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full md:w-96 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003B8E]"
          />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['Alle', ...categories].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#003B8E] text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-[#003B8E] hover:text-[#003B8E]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-gray-500 mb-4 text-sm">{filtered.length} produkter</p>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group"
            >
              <div className="bg-gray-50 h-40 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform">
                {product.image}
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">
                  {product.brand}
                </p>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                <div className="flex items-end justify-between mt-3">
                  <div>
                    <span className="text-lg font-bold text-[#003B8E]">
                      {product.basePrice.toLocaleString('da-DK')} kr.
                    </span>
                    <span className="text-xs text-gray-400 block">ekskl. moms</span>
                  </div>
                  {product.volumePricing.length > 1 && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-medium">
                      Mængderabat
                    </span>
                  )}
                </div>
                <Link
                  href={`/products/${product.id}`}
                  className="mt-3 block w-full text-center bg-[#003B8E] hover:bg-[#0056C7] text-white py-2 rounded-lg font-medium transition-colors"
                >
                  Se produkt
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg">Ingen produkter fundet</p>
          </div>
        )}
      </div>
    </div>
  );
}
