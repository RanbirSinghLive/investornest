# 🧾 Product Requirements Document (PRD)
**Product:** InvestOrNest  
**Version:** 0.0 MVP  
**Owner:** Ranbir Singh  
**Date:** November 2025  

## 1. 🎯 Product Vision
**InvestOrNest** helps homeowners answer one deceptively simple but emotionally charged question:

> “Should I pay off my mortgage faster, or invest the extra money?”

The app delivers instant, intuitive, and credible answers — using transparent assumptions, clean visuals, and simple language — empowering users to make confident, data-driven financial choices.

## 2. 💡 Goals and Success Criteria

| Goal | KPI / Success Metric |
|------|----------------------|
| Deliver a working, public web calculator | App deployed at **investornest.ca** and functional on desktop/mobile |
| Build trust through clarity & transparency | 90%+ of beta testers report “I understand the results” |
| Validate user interest | ≥ 500 unique visitors within first 30 days; ≥ 10 beta feedback responses |
| Collect no personal data (privacy-first) | App stores zero PII, no login, all compute client-side |
| Create foundation for v0.1 monetization | Codebase ready to add scenario saving, report export |

## 3. 🧭 Target Audience

1. **Primary:** Canadian homeowners aged 30–55 with active mortgages who are financially curious or pursuing FIRE.  
2. **Secondary:** Financial coaches, planners, and bloggers seeking a clean “mortgage vs invest” visualization tool.  
3. **Tone:** Educational, trustworthy, friendly, not advisor-ish.

## 4. 🔍 Problem Statement

Most “pay-off debt or invest” calculators online are outdated, US-centric, and opaque.  
Users want:
- A **Canadian-friendly**, transparent simulator.
- **Visual clarity** (not just numbers).
- **Privacy by default** — no data collection or signup.
- **Plain-English narrative** summarizing trade-offs.

## 5. ⚙️ Scope – Version 0.0 Features

### ✅ Must-Have (MVP) - Canadian-Focused Features

| Feature | Description | Acceptance Criteria |
|----------|-------------|---------------------|
| **Input panel** | Loan balance (CAD), interest % (annual), years + months remaining, regular payment (monthly CAD), optional extra payment (CAD) with frequency selector (monthly/annual/one-time), expected investment return % (annual), comparison horizon (years). All inputs with Canadian currency formatting ($CAD). | • All input fields functional with validation<br>• Years (0-50) + months (0-11) for remaining mortgage term<br>• Extra payment frequency: monthly, annual (once per year), or one-time (first month only)<br>• Currency displays in CAD format ($1,234.56)<br>• Sliders + numeric inputs for all fields<br>• Real-time validation (e.g., rates 0-20%, months 0-11)<br>• Inputs persist in localStorage (optional) |
| **Computation engine** | Local TypeScript functions computing Canadian mortgage amortization (semi-annual compounding), investment growth, net worth under both strategies. Supports years + months remaining, and extra payment frequencies (monthly/annual/one-time). All calculations client-side, no API calls. | • Accurate mortgage calculations matching Canadian bank standards<br>• Handles years + months for remaining mortgage term<br>• Supports monthly, annual, and one-time extra payments<br>• Investment growth with compound interest (supports all payment frequencies)<br>• Net worth = (home equity + investment balance - mortgage balance)<br>• Calculations complete in < 100ms<br>• Handles edge cases (zero payments, zero returns) |
| **Results summary** | Key metrics displayed in summary cards: total wealth under each strategy, net difference (CAD), "break-even return" (the investment return % where strategies are equal), mortgage-free date for each strategy. | • 3-4 summary cards visible above chart<br>• Clear winner indication (Invest vs Prepay)<br>• All values formatted in CAD currency<br>• Break-even return calculated and displayed<br>• Mortgage-free dates shown for both strategies |
| **Charts** | Interactive line chart showing net-worth trajectories over time for both strategies (Invest vs Prepay). Chart updates in real-time as inputs change. | • Line chart with 2 series (Invest strategy, Prepay strategy)<br>• X-axis: time (years/months), Y-axis: net worth (CAD)<br>• Chart library loads and renders correctly<br>• Responsive sizing (mobile/desktop)<br>• Tooltips showing exact values on hover |
| **Plain-English output** | Deterministic paragraph summarizing outcome in Canadian context: "Investing wins by $X after Y years, but mortgage lasts N years longer. Based on Canadian mortgage rates and investment returns." | • Narrative generated from calculation results<br>• Mentions specific dollar amounts and timeframes<br>• Mentions Canadian context (optional)<br>• Clear, jargon-free language<br>• Updates when inputs change |
| **Assumptions section** | Clear static text listing default assumptions visible on main page or About page: constant rates, semi-annual mortgage compounding (Canadian standard), annual investment compounding, pre-tax returns, no tax considerations, no inflation adjustment. | • Assumptions clearly listed and visible<br>• Mentions Canadian mortgage compounding standard<br>• Explains limitations (no tax, no inflation)<br>• Accessible from main page or About page<br>• Plain language, not technical jargon |
| **Mobile-friendly UI** | Fully responsive layout that works on mobile devices (iOS Safari, Android Chrome). Inputs stack vertically, charts resize, touch-friendly controls. | • Responsive breakpoints: mobile (< 768px), tablet (768-1024px), desktop (> 1024px)<br>• Touch-friendly input controls (sliders, buttons)<br>• Charts readable on mobile screens<br>• No horizontal scrolling<br>• Tested on iOS Safari and Android Chrome |
| **Privacy disclaimer** | Clear disclaimer visible on main page: "Educational tool — not financial advice; all data stays local; no personal information collected." Links to privacy policy (PIPEDA compliant). | • Disclaimer visible on main calculator page<br>• Mentions data stays local<br>• Mentions not financial advice<br>• Links to privacy policy page<br>• PIPEDA compliance mentioned |
| **Canadian localization** | All currency, date formats, and language tailored for Canadian users. Default assumptions reflect Canadian mortgage standards (semi-annual compounding). | • Currency: CAD ($) format throughout<br>• Dates: Canadian format (DD/MM/YYYY or Month DD, YYYY)<br>• Mortgage calculations use Canadian compounding standard<br>• Language: Canadian English spelling (e.g., "colour" if applicable) |

### 🚀 Nice-to-Have (v0.1+)
- Scenario saving (localStorage).  
- PDF / image export of results.  
- AI-generated narrative summary.  
- Tax / inflation fields.  
- “Share your result” card generator.  

## 6. 🧮 Core Formulae (Logic Outline)

**Canadian Mortgage Amortization:**
```
Monthly Payment = P * [r(1+r)^n] / [(1+r)^n – 1]
```
Where:
- P = Principal (loan balance)
- r = Monthly interest rate (annual rate / 2, then divided by 6 for semi-annual compounding converted to monthly)
- n = Total number of monthly payments

**Canadian Mortgage Compounding:**
- Canadian mortgages use **semi-annual compounding** (not monthly)
- Annual rate must be converted: `monthly_rate = (1 + annual_rate/2)^(1/6) - 1`
- Remaining term: Calculated as `(years * 12) + months` for total months remaining
- Prepay scenario: Extra payments reduce principal immediately → recalculate remaining amortization timeline
- **Extra Payment Frequencies:**
  - **Monthly**: Extra payment applied every month
  - **Annual**: Extra payment applied once per year (at end of year: month 12, 24, 36, etc.)
  - **One-time**: Extra payment applied only in the first month

**Investment Growth (Future Value of Annuity):**
```
FV = PMT * [((1+r)^n – 1) / r]  (for monthly contributions)
```
Where:
- PMT = Investment contribution amount
- r = Monthly return rate (annual return / 12)
- n = Number of months
- **Payment Frequencies Supported:**
  - **Monthly**: Contribution applied every month
  - **Annual**: Contribution applied once per year (at end of year: month 12, 24, 36, etc.)
  - **One-time**: Contribution applied only in the first month
- All contributions use monthly compounding

**Comparison Metrics:**
- **Net Worth (Prepay)** = Home Equity + Investment Balance - Remaining Mortgage Balance
- **Net Worth (Invest)** = Home Equity + Investment Balance - Remaining Mortgage Balance
- **ΔNetWorth** = Net Worth (Invest) - Net Worth (Prepay)
- **Break-Even Return**: The investment return % where ΔNetWorth ≈ 0 (solved numerically using binary search or similar)

**Additional Canadian Considerations:**
- All calculations in CAD currency
- No tax considerations in v0.0 (pre-tax returns assumed)
- No inflation adjustment in v0.0
- Home value assumed constant (no appreciation/depreciation)

## 7. 🧱 Technical Architecture

### 7.1 Technology Stack

| Layer | Technology | Version / Notes |
|-------|-------------|-----------------|
| **Frontend Framework** | **Next.js** | 14.x+ (App Router), React 18+, TypeScript 5.x |
| **Styling** | Tailwind CSS | 3.x with custom theme configuration |
| **Charts** | Recharts | 2.x (preferred) or Chart.js 4.x as fallback |
| **State Management** | React hooks (useState, useMemo, useCallback) | No external state library for MVP |
| **Computation** | Pure TypeScript functions | All calculations client-side, no server calls |
| **Form Handling** | React controlled components | Input validation with TypeScript |
| **Backend** | None (static app) | Fully static export via `next export` |
| **Hosting** | Vercel | CDN + SSL, automatic deployments from main branch |
| **Analytics** | Plausible Analytics | Privacy-friendly, GDPR/PIPEDA compliant |
| **Version Control** | GitHub | MIT license, public or private repo |
| **Package Manager** | npm or pnpm | Lock file committed |
| **Linting/Formatting** | ESLint + Prettier | TypeScript strict mode enabled |

### 7.2 Project Structure

```
investornest/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Main calculator page
│   ├── about/
│   │   └── page.tsx             # About / Assumptions page
│   └── globals.css              # Global styles + Tailwind imports
├── components/
│   ├── ui/                      # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Slider.tsx
│   │   └── Card.tsx
│   ├── calculator/
│   │   ├── InputPanel.tsx       # Left panel with all inputs
│   │   ├── ResultsPanel.tsx     # Right panel with results
│   │   ├── SummaryCards.tsx     # Winner, Δ Net Worth, Mortgage-Free Date
│   │   ├── Chart.tsx            # Net worth trajectory chart
│   │   └── NarrativeOutput.tsx  # Plain-English explanation
│   └── layout/
│       ├── Navbar.tsx
│       └── Footer.tsx
├── lib/
│   ├── calculations/
│   │   ├── mortgage.ts          # Mortgage amortization functions
│   │   ├── investment.ts        # Investment growth functions
│   │   ├── comparison.ts        # Net worth comparison logic
│   │   └── breakEven.ts         # Break-even return calculation
│   ├── utils/
│   │   ├── formatters.ts        # Currency, percentage, date formatters
│   │   ├── validators.ts        # Input validation functions
│   │   └── storage.ts           # localStorage helpers (optional)
│   └── types/
│       └── index.ts             # TypeScript interfaces/types
├── public/
│   ├── favicon.ico
│   └── logo.svg                 # InvestOrNest logo
├── __tests__/                   # Test files
│   ├── calculations/
│   │   ├── mortgage.test.ts
│   │   ├── investment.test.ts
│   │   └── comparison.test.ts
│   └── components/
│       └── InputPanel.test.tsx
├── .eslintrc.json
├── .prettierrc
├── tailwind.config.js
├── tsconfig.json                # TypeScript strict mode
├── next.config.js               # Next.js configuration
├── package.json
├── README.md
└── LICENSE
```

### 7.3 Data Models & Types

**Core Input Types:**
```typescript
type ExtraPaymentFrequency = 'monthly' | 'annual' | 'one-time'

interface CalculatorInputs {
  loanBalance: number;           // Current mortgage balance (CAD)
  interestRate: number;           // Annual interest rate (%)
  yearsRemaining: number;         // Years left on mortgage (0-50)
  monthsRemaining: number;         // Additional months left on mortgage (0-11)
  regularPayment: number;         // Monthly payment amount (CAD)
  extraPayment: number;           // Extra payment amount (CAD)
  extraPaymentFrequency: ExtraPaymentFrequency; // Frequency: monthly, annual, or one-time
  expectedReturn: number;         // Expected annual investment return (%)
  comparisonHorizon: number;      // Years to compare (e.g., 10, 20, 30)
}
```

**Calculation Results:**
```typescript
interface CalculationResults {
  prepayStrategy: {
    netWorth: number;
    mortgageBalance: number;
    investmentBalance: number;
    mortgageFreeDate: Date;
    totalInterestPaid: number;
    monthlyBreakdown: MonthlyData[];
  };
  investStrategy: {
    netWorth: number;
    mortgageBalance: number;
    investmentBalance: number;
    mortgageFreeDate: Date;
    totalInterestPaid: number;
    monthlyBreakdown: MonthlyData[];
  };
  comparison: {
    netWorthDifference: number;
    winner: 'prepay' | 'invest' | 'tie';
    breakEvenReturn: number;      // Return % where strategies are equal
    narrative: string;             // Plain-English summary
  };
}

interface MonthlyData {
  month: number;
  mortgageBalance: number;
  investmentBalance: number;
  netWorth: number;
}
```

### 7.4 Component Architecture

**InputPanel Component:**
- Manages all user inputs via controlled components
- Real-time validation (e.g., interest rate 0-20%, years > 0)
- Sliders for visual input + numeric fields for precision
- Canadian currency formatting ($CAD)
- Triggers calculation on input change (debounced)

**ResultsPanel Component:**
- Displays SummaryCards, Chart, and NarrativeOutput
- Receives calculation results as props
- Handles loading/error states
- Responsive grid layout (stacks on mobile)

**Calculation Engine:**
- Pure functions in `lib/calculations/`
- No side effects, deterministic outputs
- Handles edge cases (zero extra payment, zero return, etc.)
- Validates inputs before computation
- Returns structured results matching TypeScript interfaces

### 7.5 State Management Pattern

**Local Component State:**
- Main page component (`app/page.tsx`) holds `CalculatorInputs` state
- Uses `useState` for inputs, `useMemo` for expensive calculations
- `useCallback` for event handlers to prevent unnecessary re-renders

**Calculation Flow:**
1. User updates input → state updates
2. `useMemo` triggers recalculation when inputs change
3. Results passed as props to ResultsPanel
4. Chart and summary components re-render with new data

**Optional localStorage:**
- Save user preferences (last used interest rate, horizon)
- Load on mount, save on change
- No PII stored, only numeric preferences

### 7.6 Performance Requirements

**Load Time:**
- First Contentful Paint (FCP): < 1.0s
- Time to Interactive (TTI): < 1.5s
- Lighthouse Performance Score: ≥ 90

**Optimization Strategies:**
- Code splitting: Lazy load chart library
- Image optimization: Next.js Image component
- Font optimization: Self-hosted or system fonts
- Bundle size: Target < 200KB gzipped for initial load
- Memoization: Use `useMemo` for calculations, `React.memo` for components

**Calculation Performance:**
- Calculations must complete in < 100ms for typical inputs
- Support up to 30-year horizons without lag
- Debounce input changes (300ms) to prevent excessive recalculations

### 7.7 Browser Compatibility

**Supported Browsers (last 2 versions):**
- Chrome/Edge (Chromium)
- Safari (macOS/iOS)
- Firefox
- Mobile Safari (iOS)
- Chrome Mobile (Android)

**Polyfills:**
- Next.js handles most modern JS features
- Ensure `Intl.NumberFormat` support for currency formatting (Canadian locale)

### 7.8 Error Handling

**Input Validation:**
- Client-side validation before calculation
- Clear error messages for invalid inputs
- Prevent calculation with invalid data

**Calculation Errors:**
- Handle edge cases (division by zero, negative values)
- Display user-friendly error messages
- Fallback to default values if needed

**Runtime Errors:**
- Error boundaries for React component errors
- Console logging for debugging (removed in production)
- Graceful degradation if chart library fails to load

### 7.9 Security & Privacy

**Data Handling:**
- No external API calls except analytics (Plausible)
- All calculations performed client-side
- No data sent to servers
- No cookies except analytics (if required)

**Privacy Compliance:**
- PIPEDA compliant (Canadian privacy law)
- No personal data collection
- Clear privacy disclaimer in footer
- Analytics: IP anonymization enabled

**Content Security:**
- Static site, no server-side vulnerabilities
- HTTPS only (enforced by Vercel)
- No user-generated content or file uploads

### 7.10 Build & Deployment

**Build Process:**
```bash
npm run build        # Next.js static export
npm run export       # Generate static files in 'out/' directory
```

**Deployment:**
- Vercel: Automatic deployment on push to `main` branch
- Custom domain: `investornest.ca` (DNS configured)
- SSL certificate: Automatic via Vercel
- Environment variables: None required for MVP

**CI/CD (Optional):**
- GitHub Actions: Run tests and linting on PR
- Pre-commit hooks: ESLint + Prettier checks

### 7.11 Development Environment

**Required Tools:**
- Node.js 18.x or higher
- npm 9.x+ or pnpm 8.x+
- Git
- VS Code (recommended) with ESLint/Prettier extensions

**Local Development:**
```bash
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run test         # Run unit tests
npm run lint         # Run ESLint
```

**Environment Setup:**
- `.env.local` for local analytics (optional)
- No database or external services required

## 8. 🎨 UX / UI Requirements

### Layout
- **Top Navbar:** Logo + link to “About / Assumptions.”  
- **Left Panel:** Inputs with sliders & numeric fields.  
- **Right Panel:**  
  - Summary cards (“Winner”, “Δ Net Worth”, “Mortgage-Free Date”).  
  - Charts (line + bar).  
  - Narrative explanation.  

### Visual Design
- Clean, modern, trust-oriented palette (light blues/greens).  
- Minimal text; emphasis on clarity & readability.  
- Mobile: stacked layout, collapsible inputs.

## 9. 📈 Analytics & Metrics (v0.0)

- Page views, unique users, device type.  
- Clicks on “Calculate” and “Reset.”  
- Average session duration.  
*(No user identifiers stored.)*

## 10. 💵 Monetization Placeholder

*(for v0.1+ planning)*  
- **Pro report export** – $9 one-time.  
- **Pro tier unlock** – $5/mo for advanced assumptions.  
- **Affiliate links** (RateHub, Questrade, Wealthsimple).  

## 11. ⚠️ Non-Goals (v0.0)

- No login or account system.  
- No cloud data sync.  
- No tax or after-tax modeling.  
- No dynamic bank integrations (Plaid/MX).  
- No AI API calls (deterministic only).

## 12. 🧪 Testing & QA

| Type | Description |
|------|-------------|
| **Unit Tests** | Validate financial formulas (mortgage vs investment outputs). |
| **Smoke Tests** | Validate all input fields, chart renders, and summary logic. |
| **Responsiveness** | Check across mobile, tablet, desktop. |
| **Cross-browser** | Chrome, Safari, Edge, Firefox. |
| **Performance** | < 1.5 s load on first visit. |

## 13. 📄 Legal / Compliance

- Clear disclaimer: *“Educational simulation only; not financial advice.”*  
- No personal data collected or stored.  
- Hosted in Canada or privacy-compliant CDN.  
- Review PIPEDA & provincial laws; privacy policy link required.

## 14. ✅ Deliverables Summary

- Deployed web app (Next.js static build)  
- Public landing page + calculator  
- “About / Assumptions” page  
- GitHub repo with README, MIT license  
- Short launch blog post  
