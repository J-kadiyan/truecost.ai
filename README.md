# TrueCost AI — Radical Transparency for Education Loans

**TrueCost AI** is a financial decision intelligence platform designed to reveal the full economic, psychological, and life-trajectory costs of student loans. Built with an editorial "Natural Premium" aesthetic, it moves beyond simple EMI calculations to show students the truth about their financial futures.

## Key Features
- **Sophisticated Truth Engine**: Calculates NPV, inflation-adjusted costs, and opportunity costs (foregone wealth).
- **Advanced Dashboard**: Features interactive Recharts, college comparisons, and prepayment simulators.
- **Proprietary Stress Index**: A visual gauge of financial danger relative to verified median salary data.
- **Life Journey Timeline**: Projecting liquidity milestones and compounding legacy dates.
- **Fail-State Simulation**: Stress-testing outcomes for unemployment, under-employment, or program exits.
- **Secure User Accounts**: Full MERN stack implementation for user registration, login, and saving financial audits.
- **Professional PDF Export**: High-fidelity "Truth Audit" reports for family review.

## Tech Stack
- **Frontend**: React 19 (Vite), Tailwind CSS, Recharts
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **Financial Logic**: Pure JS implementation of loan amortization and NPV math.
- **Export**: `jspdf` for document generation.

## Project Structure
```text
truecost.ai/
├── server/                 # Express backend
│   ├── middleware/         # Custom Express middleware (e.g., authMiddleware.js)
│   ├── models/             # Mongoose schemas (e.g., User.js)
│   ├── routes/             # API routes (e.g., auth.js)
│   ├── server.js           # Main Express server entry point
│   ├── .env.example        # Example environment variables
│   └── package.json        # Backend dependencies
├── src/                    # React frontend (Vite)
│   ├── components/         # React components
│   │   ├── Auth/           # Login and Register components
│   │   ├── Charts.jsx      # Recharts visualizations
│   │   ├── Dashboard.jsx   # Main application dashboard
│   │   ├── CompareColleges.jsx
│   │   ├── PrepaymentSimulator.jsx
│   │   ├── UserPanel.jsx
│   │   └── ...             # Other UI components
│   ├── logic/              # Pure JS business/financial logic
│   │   └── financial.js
│   ├── data/               # Static data assets
│   │   └── colleges.js
│   ├── App.jsx             # Main React application component
│   ├── main.jsx            # React DOM entry point
│   └── index.css           # Global custom styles
├── index.html              # Vite entry HTML
├── package.json            # Frontend dependencies
├── vite.config.js          # Vite configuration
└── README.md               # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### Backend Setup
```bash
cd server
npm install
# Rename .env.example to .env and configure your variables
npm start
```

### Frontend Setup (Development)
```bash
# From the root directory
npm install
npm run dev
```

### Production Build
```bash
npm run build
```

## Deployment
This project features a decoupled architecture:
- **Frontend**: Can be deployed to Vercel, Netlify, or GitHub Pages using the `dist` folder.
- **Backend**: Can be deployed to Render, Heroku, or any Node.js hosting service.

## Methodology
The Stress Index is calculated as:
`Index = (Monthly EMI / (Median Monthly Salary / 12)) * 100`
*Scores above 60 are marked as High Risk.*

---
&copy; 2026 TrueCost AI — Logic for the Truth Seekers.
