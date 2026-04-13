# TrueCost AI — Radical Transparency for Education Loans

**TrueCost AI** is a financial decision intelligence platform designed to reveal the full economic, psychological, and life-trajectory costs of student loans. Built with an editorial "Natural Premium" aesthetic, it moves beyond simple EMI calculations to show students the truth about their financial futures.

## Key Features
- **Sophisticated Truth Engine**: Calculates NPV, inflation-adjusted costs, and opportunity costs (foregone wealth).
- **Proprietary Stress Index**: A visual gauge of financial danger relative to verified median salary data.
- **Life Journey Timeline**: Projecting liquidity milestones and compounding legacy dates.
- **Fail-State Simulation**: Stress-testing outcomes for unemployment, under-employment, or program exits.
- **Professional PDF Export**: High-fidelity "Truth Audit" reports for family review.

## Tech Stack
- **Core**: React 19 (Vite)
- **Styling**: Vanilla CSS (Custom Editorial Design System)
- **Financial Logic**: Pure JS implementation of loan amortization and NPV math.
- **Export**: `jspdf` for document generation.

## Getting Started

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
```

## Deployment
This project is an SPA (Single Page Application). It can be deployed effortlessly to:
- **Vercel**: `vercel deploy` (Auto-configured with Vite)
- **Netlify**: `netlify deploy --dir=dist`
- **GitHub Pages**: Use the `dist` folder.

## Methodology
The Stress Index is calculated as:
`Index = (Monthly EMI / (Median Monthly Salary / 12)) * 100`
*Scores above 60 are marked as High Risk.*

---
&copy; 2026 TrueCost AI — Logic for the Truth Seekers.
