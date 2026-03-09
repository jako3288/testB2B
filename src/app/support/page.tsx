'use client';
import { useState } from 'react';

const faqs = [
  {
    q: 'Hvad er minimumsordre?',
    a: 'Vi har ingen minimumsordre for eksisterende kunder. For nye kunder er minimumsordren 500 kr. ekskl. moms.',
  },
  {
    q: 'Hvornår kan jeg forvente levering?',
    a: 'Vi leverer normalt inden for 1-2 hverdage til adresser i Danmark. Ordrer afgivet inden kl. 14:00 på hverdage sendes samme dag.',
  },
  {
    q: 'Kan jeg få faktura med 30 dages betalingsfrist?',
    a: 'Ja, godkendte kunder kan få faktura med 30 dages betalingsfrist. Kontakt os for at ansøge om kreditmaksimum.',
  },
  {
    q: 'Tilbyder I mængderabatter?',
    a: 'Ja, vi tilbyder mængderabatter på alle produkter. Rabatterne fremgår på produktsiderne. Kontakt os for specielle aftaler ved større ordrer.',
  },
  {
    q: 'Hvad er jeres returpolitik?',
    a: 'Vi accepterer returnering inden for 14 dage ved fejl fra vores side. Produkter skal returneres i original emballage og ubenyttet stand.',
  },
  {
    q: 'Kan I levere til byggeplads?',
    a: 'Ja, vi kan levere direkte til byggepladser. Angiv blot leveringsadressen og eventuelle bemærkninger ved checkout.',
  },
];

export default function SupportPage() {
  const [form, setForm] = useState({
    company: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Kundeservice &amp; Support</h1>
      <p className="text-gray-500 mb-10">
        Vi er klar til at hjælpe dig med alle spørgsmål om produkter, ordrer og levering.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Contact info */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-bold text-lg mb-4 text-[#003B8E]">Kontaktoplysninger</h2>
            <address className="not-italic space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-xl">🏢</span>
                <div>
                  <p className="font-semibold">TB Værktøj A/S</p>
                  <p className="text-gray-600">Ørbækvej 100</p>
                  <p className="text-gray-600">5220 Odense SØ</p>
                  <p className="text-gray-500 text-xs">CVR: 12345678</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">📞</span>
                <div>
                  <a
                    href="tel:+4570203040"
                    className="font-semibold text-[#003B8E] hover:underline"
                  >
                    +45 70 20 30 40
                  </a>
                  <p className="text-gray-500 text-xs">Man-fre 8:00-17:00</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">✉️</span>
                <div>
                  <a
                    href="mailto:info@tbvaerktoej.dk"
                    className="font-semibold text-[#003B8E] hover:underline"
                  >
                    info@tbvaerktoej.dk
                  </a>
                  <p className="text-gray-500 text-xs">Svar inden for 4 timer</p>
                </div>
              </div>
            </address>
          </div>

          <div className="bg-[#003B8E] text-white rounded-xl p-6">
            <h3 className="font-bold mb-3">Åbningstider</h3>
            <table className="text-sm w-full">
              <tbody>
                {[
                  ['Mandag - fredag', '08:00 - 17:00'],
                  ['Lørdag', '09:00 - 13:00'],
                  ['Søndag', 'Lukket'],
                ].map(([day, hours]) => (
                  <tr key={day} className="border-b border-blue-700 last:border-0">
                    <td className="py-1.5 text-blue-200">{day}</td>
                    <td className="py-1.5 text-right font-medium">{hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Map placeholder */}
          <div className="bg-gray-100 rounded-xl h-48 flex items-center justify-center border border-gray-200">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-2">📍</div>
              <p className="font-medium">Ørbækvej 100</p>
              <p className="text-sm">5220 Odense SØ</p>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="lg:col-span-2">
          {sent ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
              <div className="text-5xl mb-3">✅</div>
              <h3 className="text-xl font-bold text-green-700 mb-2">Besked sendt!</h3>
              <p className="text-gray-600">
                Tak for din henvendelse. Vi vender tilbage hurtigst muligt, senest inden for 4 timer
                på hverdage.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-4 text-[#003B8E] hover:underline text-sm"
              >
                Send ny besked
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-bold text-lg mb-4">Send os en besked</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Virksomhed *
                    </label>
                    <input
                      required
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#003B8E]"
                      placeholder="Firma ApS"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      E-mail *
                    </label>
                    <input
                      required
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#003B8E]"
                      placeholder="kontakt@firma.dk"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#003B8E]"
                      placeholder="+45 70 00 00 00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Emne *</label>
                    <select
                      required
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#003B8E] bg-white"
                    >
                      <option value="">Vælg emne...</option>
                      <option value="ordre">Spørgsmål om ordre</option>
                      <option value="levering">Levering</option>
                      <option value="produkt">Produktspørgsmål</option>
                      <option value="faktura">Faktura &amp; betaling</option>
                      <option value="reklamation">Reklamation</option>
                      <option value="andet">Andet</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Besked *</label>
                  <textarea
                    required
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#003B8E]"
                    placeholder="Beskriv dit spørgsmål eller problem..."
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#003B8E] hover:bg-[#0056C7] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Send besked →
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl">
        <h2 className="text-2xl font-bold mb-6">Ofte stillede spørgsmål</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full px-5 py-4 text-left flex items-center justify-between font-medium hover:bg-gray-50"
              >
                <span>{faq.q}</span>
                <span className="text-[#003B8E] ml-4">{openFaq === i ? '▲' : '▼'}</span>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 text-gray-600 text-sm border-t border-gray-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
