# InvestOrNest

A Canadian mortgage vs investment calculator that helps homeowners answer: "Should I pay off my mortgage faster, or invest the extra money?"

## Features

- 🇨🇦 **Canadian-focused**: Uses semi-annual mortgage compounding (Canadian standard)
- 🔒 **Privacy-first**: All calculations performed client-side, no data collection
- 📊 **Visual comparisons**: Interactive charts showing net worth over time
- 📱 **Mobile-friendly**: Fully responsive design
- 💬 **Plain-English summaries**: Easy-to-understand results

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Deployment**: Vercel (static export)

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x+ or pnpm 8.x+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

This creates a static export in the `out/` directory.

### Lint

```bash
npm run lint
```

## Project Structure

```
investornest/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main calculator page
│   ├── about/              # About page
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── calculator/         # Calculator-specific components
│   └── layout/             # Layout components
├── lib/
│   ├── calculations/       # Financial calculation functions
│   ├── utils/              # Utility functions
│   └── types/              # TypeScript types
└── public/                 # Static assets
```

## Key Calculations

### Canadian Mortgage Amortization
- Uses semi-annual compounding (Canadian standard)
- Converts annual rate to monthly: `(1 + annual_rate/2)^(1/6) - 1`

### Investment Growth
- Monthly contributions with monthly compounding
- Future value of annuity formula

### Net Worth
- Net Worth = (Home Value - Mortgage Balance) + Investment Balance

## License

MIT

## Author

Ranbir Singh

