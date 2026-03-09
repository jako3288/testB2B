'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

type Step = 1 | 2 | 3;

interface FormData {
  companyName: string;
  cvr: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  deliveryNote: string;
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<Step>(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [form, setForm] = useState<FormData>({
    companyName: '',
    cvr: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    deliveryNote: '',
  });

  const vat = Math.round(subtotal * 0.25);
  const total = subtotal + vat;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors([]);
  }

  function validateStep1(): boolean {
    const missing: string[] = [];
    if (!form.companyName.trim()) missing.push('Virksomhedsnavn');
    if (!form.cvr.trim()) missing.push('CVR-nummer');
    if (!form.contactPerson.trim()) missing.push('Kontaktperson');
    if (!form.email.trim()) missing.push('E-mail');
    if (!form.phone.trim()) missing.push('Telefon');
    setErrors(missing);
    return missing.length === 0;
  }

  function validateStep2(): boolean {
    const missing: string[] = [];
    if (!form.address.trim()) missing.push('Adresse');
    if (!form.zip.trim()) missing.push('Postnummer');
    if (!form.city.trim()) missing.push('By');
    setErrors(missing);
    return missing.length === 0;
  }

  function handleConfirm() {
    setOrderPlaced(true);
    clearCart();
  }

  function handleStep1Next() {
    if (validateStep1()) setStep(2);
  }

  function handleStep2Next() {
    if (validateStep2()) setStep(3);
  }

  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-3xl font-bold text-green-600 mb-3">Ordre bekræftet!</h1>
        <p className="text-gray-600 mb-2">Tak for din ordre, {form.companyName}.</p>
        <p className="text-gray-500 mb-6">
          En ordrebekræftelse er sendt til {form.email}. Vi behandler din ordre hurtigst muligt.
        </p>
        <Link
          href="/"
          className="bg-[#003B8E] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0056C7]"
        >
          Tilbage til produkter
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Din kurv er tom</h1>
        <Link href="/" className="text-[#003B8E] hover:underline">
          ← Gå til produkter
        </Link>
      </div>
    );
  }

  const steps = [
    { n: 1, label: 'Virksomhedsinfo' },
    { n: 2, label: 'Levering' },
    { n: 3, label: 'Bekræft' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={s.n} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= s.n ? 'bg-[#003B8E] text-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step > s.n ? '✓' : s.n}
            </div>
            <span
              className={`text-sm font-medium ${step === s.n ? 'text-[#003B8E]' : 'text-gray-500'}`}
            >
              {s.label}
            </span>
            {i < steps.length - 1 && (
              <div
                className={`h-0.5 mx-2 ${step > s.n ? 'bg-[#003B8E]' : 'bg-gray-200'}`}
                style={{ width: '40px' }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {step === 1 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4">Virksomhedsoplysninger</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Virksomhedsnavn *
                  </label>
                  <input
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#003B8E]"
                    placeholder="Firma ApS"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVR-nummer *
                  </label>
                  <input
                    name="cvr"
                    value={form.cvr}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#003B8E]"
                    placeholder="12345678"
                    maxLength={8}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kontaktperson *
                  </label>
                  <input
                    name="contactPerson"
                    value={form.contactPerson}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#003B8E]"
                    placeholder="Jens Jensen"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-mail *</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#003B8E]"
                    placeholder="kontakt@firma.dk"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefon *</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#003B8E]"
                    placeholder="+45 70 00 00 00"
                  />
                </div>
              </div>
              <button
                onClick={handleStep1Next}
                className="mt-6 bg-[#003B8E] hover:bg-[#0056C7] text-white px-6 py-3 rounded-lg font-semibold"
              >
                Næste: Levering →
              </button>
              {errors.length > 0 && (
                <p className="mt-3 text-sm text-red-600">Udfyld venligst: {errors.join(', ')}</p>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4">Leveringsadresse</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adresse *
                  </label>
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#003B8E]"
                    placeholder="Vejnavn 1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postnummer *
                  </label>
                  <input
                    name="zip"
                    value={form.zip}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#003B8E]"
                    placeholder="5000"
                    maxLength={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">By *</label>
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#003B8E]"
                    placeholder="Odense"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Leveringsnote
                  </label>
                  <textarea
                    name="deliveryNote"
                    value={form.deliveryNote}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#003B8E]"
                    rows={3}
                    placeholder="Eventuelle bemærkninger til leveringen..."
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50"
                >
                  ← Tilbage
                </button>
                <button
                  onClick={handleStep2Next}
                  className="bg-[#003B8E] hover:bg-[#0056C7] text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Næste: Bekræft →
                </button>
              </div>
              {errors.length > 0 && (
                <p className="mt-3 text-sm text-red-600">Udfyld venligst: {errors.join(', ')}</p>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4">Bekræft ordre</h2>
              <div className="space-y-4 text-sm mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-700 mb-2">Virksomhed</h3>
                  <p>
                    {form.companyName} · CVR: {form.cvr}
                  </p>
                  <p>
                    {form.contactPerson} · {form.email} · {form.phone}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-700 mb-2">Leveringsadresse</h3>
                  <p>
                    {form.address}, {form.zip} {form.city}
                  </p>
                  {form.deliveryNote && (
                    <p className="text-gray-500 mt-1">Note: {form.deliveryNote}</p>
                  )}
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Bestilte varer ({items.length} linjer)
                  </h3>
                  {items.map(item => (
                    <div key={item.productId} className="flex justify-between">
                      <span>
                        {item.qty}x {item.name}
                      </span>
                      <span>{item.lineTotal.toLocaleString('da-DK')} kr.</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50"
                >
                  ← Tilbage
                </button>
                <button
                  onClick={handleConfirm}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Bekræft ordre ✓
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order summary sidebar */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 h-fit">
          <h2 className="text-lg font-bold mb-4">Ordreoversigt</h2>
          <div className="space-y-2 text-sm mb-4">
            {items.map(item => (
              <div key={item.productId} className="flex justify-between">
                <span className="text-gray-600">
                  {item.qty}x {item.name}
                </span>
                <span>{item.lineTotal.toLocaleString('da-DK')} kr.</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-3 space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal (ekskl. moms)</span>
              <span>{subtotal.toLocaleString('da-DK')} kr.</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Moms (25%)</span>
              <span>{vat.toLocaleString('da-DK')} kr.</span>
            </div>
            <div className="flex justify-between font-bold text-base pt-1 border-t">
              <span>Total</span>
              <span className="text-[#003B8E]">{total.toLocaleString('da-DK')} kr.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
