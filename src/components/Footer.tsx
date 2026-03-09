import Logo from './Logo';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Trust signals bar */}
      <div className="bg-[#003B8E] py-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🚚</span>
            <div>
              <div className="font-bold text-white">Hurtig levering</div>
              <div className="text-blue-200 text-sm">Levering 1-2 hverdage</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎧</span>
            <div>
              <div className="font-bold text-white">Kundeservice</div>
              <div className="text-blue-200 text-sm">Man-fre 8:00-17:00</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-3xl">🔒</span>
            <div>
              <div className="font-bold text-white">Sikker betaling</div>
              <div className="text-blue-200 text-sm">Krypteret &amp; sikker</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Logo white className="mb-4" />
          <p className="text-sm text-gray-400">
            Professionelt B2B-værktøj til håndværkere og virksomheder siden 1998.
            Kvalitetsprodukter til konkurrencedygtige priser.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-white mb-3">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Produktkatalog
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-white transition-colors">
                Indkøbskurv
              </Link>
            </li>
            <li>
              <Link href="/support" className="hover:text-white transition-colors">
                Kundeservice
              </Link>
            </li>
            <li>
              <Link href="/checkout" className="hover:text-white transition-colors">
                Checkout
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-white mb-3">Kontakt</h3>
          <address className="text-sm not-italic space-y-1 text-gray-400">
            <p className="font-semibold text-gray-200">TB Værktøj A/S</p>
            <p>Ørbækvej 100</p>
            <p>5220 Odense SØ</p>
            <p>CVR: 12345678</p>
            <p className="mt-2">
              <a href="tel:+4570203040" className="hover:text-white">
                📞 +45 70 20 30 40
              </a>
            </p>
            <p>
              <a href="mailto:info@tbvaerktoej.dk" className="hover:text-white">
                ✉️ info@tbvaerktoej.dk
              </a>
            </p>
            <p className="text-xs text-gray-500 mt-2">Åbningstider: Man-fre 8:00-17:00</p>
          </address>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} TB Værktøj A/S · Alle priser er ekskl. moms · CVR: 12345678
      </div>
    </footer>
  );
}
