# 🙏 आषाढी एकादशी शुभेच्छा | Ashadhi Ekadashi Wishes

A beautiful, animated web greeting card built to celebrate **Ashadhi Ekadashi** — the sacred day dedicated to Lord Vitthal (Panduranga) of Pandharpur. Share heartfelt wishes with family and friends through this immersive, devotional experience.

🌐 **Live Site:** [shesh.vercel.app](https://shesh.vercel.app)

---

## ✨ Features

- **🎨 Stunning Visuals** — Full-screen hero with a devotional background, golden glow effects, floating petals, and light rays
- **🔔 Interactive Temple Bell** — Click to ring a realistic temple bell with Web Audio API–generated sound
- **🌗 Dark/Light Mode** — Toggle between a warm saffron theme and a mystical purple night theme with firefly effects
- **📜 Sant Vachan** — Curated quotes from revered saints — Dnyaneshwar, Tukaram, Namdev, and Eknath
- **🎶 Scrolling Abhangs** — Auto-scrolling marquee of famous Vitthal abhangs
- **🖼️ Bhakti Gallery** — Photo gallery with lightbox viewer showcasing devotional imagery
- **💬 Wish Board** — Visitors can write and share their own Ekadashi wishes
- **📱 Share Integration** — One-tap sharing via WhatsApp, Facebook, native share, or link copy
- **🙏 Blessing Cards** — Animated blessing cards for Sukh, Samruddhi, Shanti, Arogya, Yash, and Anand
- **📊 Visitor Counter** — Animated counter tracking page visits
- **🎭 Loading Animation** — Temple door opening sequence with Om symbol reveal
- **📱 Fully Responsive** — Optimized for mobile, tablet, and desktop

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [React](https://react.dev) | UI framework |
| [Vite](https://vite.dev) | Build tool & dev server |
| [TypeScript](https://typescriptlang.org) | Type safety |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first styling |
| [Motion (Framer Motion)](https://motion.dev) | Animations & transitions |
| [Lucide React](https://lucide.dev) | Icon library |
| [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) | Temple bell sound synthesis |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [pnpm](https://pnpm.io/) (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/Ekadashi.git
cd Ekadashi

# Install dependencies
pnpm install
```

### Development

```bash
# Start the dev server
pnpm dev
```

The app will be available at `http://localhost:5173`

### Production Build

```bash
# Build for production
pnpm build

# Preview the production build
pnpm preview
```

---

## 📁 Project Structure

```
Ekadashi/
├── index.html                  # Entry HTML with viewport & base styles
├── vite.config.ts              # Vite configuration
├── package.json                # Dependencies & scripts
├── backgroung_image.webp       # Hero background image
├── src/
│   ├── main.tsx                # React entry point
│   ├── app/
│   │   ├── App.tsx             # Main application (all sections)
│   │   └── components/         # Reusable components
│   └── styles/
│       ├── index.css           # Style entry (imports all CSS)
│       ├── tailwind.css        # Tailwind directives
│       ├── theme.css           # Design tokens & color themes
│       ├── fonts.css           # Font imports
│       └── globals.css         # Global overrides
└── dist/                       # Production build output
```

---

## 🎨 Theming

The app supports two themes controlled via a toggle in the navbar:

| Theme | Background | Accent | Mood |
|---|---|---|---|
| **Light (Default)** | Deep saffron `#0d0400` | Golden `#FFD700` / Orange `#FF8C00` | Warm, devotional |
| **Dark** | Deep purple `#020009` | Violet `#9B59B6` / Indigo `#8A2BE2` | Mystical, serene |

Theme variables are defined in [`src/styles/theme.css`](src/styles/theme.css).

---

## 🌐 Deployment

The site is deployed on [Vercel](https://vercel.com). To deploy your own:

1. Push the repo to GitHub
2. Import the project on [vercel.com](https://vercel.com/new)
3. Vercel auto-detects Vite — no configuration needed
4. Your site will be live at `your-project.vercel.app`

---

## 📝 Sections Overview

| # | Section | Description |
|---|---|---|
| 1 | **Loading Screen** | Temple doors open to reveal ॐ symbol |
| 2 | **Hero** | Full-screen greeting with animated title, bell, and marquee |
| 3 | **Wishes From** | Personal greeting card from the sender |
| 4 | **Message Card** | Extended devotional blessing message |
| 5 | **Daily Thought** | Auto-rotating Vitthal-themed thoughts |
| 6 | **Sant Vachan** | Quotes from four great saints |
| 7 | **Bhakti Gallery** | 8-image grid with lightbox |
| 8 | **Abhangs** | Dual-row scrolling abhang marquee |
| 9 | **Blessings** | Six animated blessing cards |
| 10 | **Wish Board** | User-submitted wishes with form |
| 11 | **Share** | Social sharing buttons |
| 12 | **Footer** | Closing prayer, visitor counter, credits |

---

## 🙏 Credits

- **Background Image** — Wari/Pandharpur pilgrimage photography
- **Gallery Images** — [Unsplash](https://unsplash.com)
- **Font** — [Noto Serif Devanagari](https://fonts.google.com/noto/specimen/Noto+Serif+Devanagari) by Google Fonts
- **Icons** — [Lucide](https://lucide.dev)

---

## 📄 License

This project is open source and available for personal and educational use.

---

<div align="center">

**जय हरी विठ्ठल! ज्ञानोबा माऊली तुकाराम!** 🙏

*Built with ❤️ and भक्ती*
