import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'TB Værktøj - Professionelt B2B Værktøj',
  description:
    'TB Værktøj A/S - Kvalitetsprodukter til professionelle håndværkere og virksomheder. Stort udvalg af håndværktøj, elværktøj, måleudstyr og sikkerhedsudstyr.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da">
      <body className="font-sans antialiased">
        <CartProvider>
          <Header />
          <main className="min-h-screen bg-gray-50">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
