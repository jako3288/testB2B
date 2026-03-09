# TB Værktøj — B2B Wholesale Webshop

A professional B2B wholesale webshop for tools and equipment, built with Next.js, TypeScript, and Tailwind CSS.

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **System fonts** (no external font dependencies)

## Features

- 🛒 **Shopping cart** with localStorage persistence and volume pricing
- 📦 **25 products** across 5 categories (Håndværktøj, Elværktøj, Måleudstyr, Sikkerhedsudstyr, Lagring og organisering)
- 🔍 **Search & filter** by category and keyword
- 💰 **Volume pricing tiers** — discounts applied automatically as quantity increases
- 🧾 **3-step checkout** — company info → delivery address → order confirmation
- 📞 **Support page** with contact form and FAQ accordion
- 📱 **Responsive** — works on mobile and desktop
- 🇩🇰 **Danish language** — all prices shown ex. VAT (B2B convention)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── cart/          # Shopping cart page
│   ├── checkout/      # 3-step checkout
│   ├── products/[id]/ # Product detail page
│   ├── support/       # Customer support & FAQ
│   ├── layout.tsx     # Root layout with Header/Footer
│   └── page.tsx       # Product catalog (home)
├── components/
│   ├── Footer.tsx
│   ├── Header.tsx
│   └── Logo.tsx
├── context/
│   └── CartContext.tsx # Cart state with volume pricing
└── data/
    └── products.ts    # 25 products + categories export
```
