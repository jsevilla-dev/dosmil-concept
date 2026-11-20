# DOSMIL 2000 — Philippine Streetwear Concept Redesign

[![React 19](https://img.shields.io/badge/React-19.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite 8](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Status](https://img.shields.io/badge/Build-Passing-brightgreen)]()
[![License](https://img.shields.io/badge/License-MIT-black)](LICENSE)

An independent e-commerce redesign & engineering case study for **DOSMIL** ([dosmil2000.com](https://www.dosmil2000.com/)), the autonomous Philippine streetwear label and home of the Twoface community (Est. 2020, Manila, PH).

> **Disclaimer**: This project is an independent portfolio redesign concept and is not the official brand website of DOSMIL. All trademarks, logos, video assets, and product photography remain the property of DOSMIL.

---

## ⚡ Key Highlights & Architecture

- **Brutalist Underground Aesthetic**: Custom typographic hierarchy (`Anton`, `Space Grotesk`, `Space Mono`, `Syne`), tactile 2px brutalist borders, film grain textures, and high-contrast street art layout.
- **Authentic Brand Integration**: Official brand header logo, Twoface mask mark, and high-definition looping hero video directly referenced from DOSMIL's brand media.
- **Complete Product Catalog**: 29 live DOSMIL items across drops (Halloween Drop, Milligans, Utility Shorts, Heavy Fleece Hoodies, 220 GSM Tees) with multi-angle photo previews.
- **Interactive Product Modal**: Sized 400px contained views with interactive size selection (S to 2XL), responsive bottom thumbnail strip, and size chart modal.
- **Streetwear Size Chart**: Heavyweight 220 GSM and 420 GSM boxy-fit measurement guides.
- **Twoface Story Archive**: Curated video cards streaming official campaign BTS and anniversary documentaries directly with real thumbnail overlays.
- **Fast Cash on Delivery (COD) Checkout**: Frictionless nationwide checkout form tailored for Philippine buyers with simulated order confirmation & reference receipt.
- **Twoface Run Club RSVP**: Interactive community run club registration for Thursday Eastwood sessions.

---

## 📁 Project Structure

```text
dosmil-concept/
├── public/
│   └── favicon.svg           # Custom Twoface SVG favicon
├── src/
│   ├── assets/               # High-res brand logos and poster fallbacks
│   │   ├── dosmil_logo.png   # Official DOSMIL wordmark logo
│   │   ├── logo_enter.png    # Official Twoface mask insignia
│   │   └── hero.png          # Fallback hero visual
│   ├── App.css               # Brutalist design tokens & responsive styles
│   ├── App.jsx               # Main SPA application with subviews & modals
│   ├── index.css             # Base resets & interactive outlines
│   ├── main.jsx              # React 19 entry point
│   └── products.js           # Full 29-product catalog data & CDN links
├── index.html                # HTML5 template with Google Web Fonts
├── vite.config.js            # Vite bundler configuration
└── package.json              # Project scripts and dependencies
```

---

## 🛠️ Tech Stack

- **Framework**: React 19
- **Bundler**: Vite 8
- **Styling**: Vanilla CSS (Modular design tokens, brutalist streetwear grid system)
- **Fonts**: Anton, Space Grotesk, Space Mono, Syne (via Google Fonts)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/jsevilla-dev/dosmil-concept.git

# Navigate to project directory
cd dosmil-concept

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Building for Production

```bash
npm run build
```

The compiled output will be generated inside the `dist/` directory, optimized for deployment to **Vercel**, **Netlify**, or **Cloudflare Pages**.

---

## 👤 Author

**jsevilla-dev**  
- GitHub: [@jsevilla-dev](https://github.com/jsevilla-dev)

---

## 📄 License

MIT Portfolio Concept Study. Brand assets and product media belong to DOSMIL Manila.
