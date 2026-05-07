import React from 'react';

const Methodology = ({ onBack }) => {
  const sectionStyle = { marginBottom: '2.5rem' };
  const h3Style = { fontSize: '1.3rem', marginBottom: '0.8rem' };
  const pStyle = { fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '0.8rem' };

  const formulaCard = (title, formula, explanation) => (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '4px', padding: '1.2rem', marginBottom: '1rem' }}>
      <div style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-earth)', marginBottom: '6px' }}>{title}</div>
      <div style={{ fontFamily: 'monospace', fontSize: '0.95rem', color: 'var(--text-main)', background: 'var(--bg-natural)', padding: '10px 14px', borderRadius: '3px', marginBottom: '8px', overflowX: 'auto' }}>{formula}</div>
      <div style={{ fontSize: '0.83rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{explanation}</div>
    </div>
  );

  return (
    <div className="container" style={{ maxWidth: '780px', animation: 'fadeIn 0.8s ease-out', padding: 'var(--spacing-lg) 1.5rem' }}>
      <button onClick={onBack} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--accent-earth)', fontSize: '0.85rem', fontFamily: 'Inter, sans-serif', marginBottom: '1rem', padding: 0 }}>
        ← Back to Home
      </button>

      <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '0.5rem' }}>
        Our <span className="text-editorial">Methodology</span>
      </h1>
      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: 'var(--spacing-lg)', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem', lineHeight: '1.7' }}>
        Transparency is our core principle. Here's exactly how every number in your TrueCost report is calculated — 
        no black boxes, no hidden assumptions.
      </p>

      <div style={sectionStyle}>
        <h3 style={h3Style}>1. EMI Calculation</h3>
        <p style={pStyle}>
          We use the standard <strong>reducing balance method</strong>, the same formula used by all major banks in India.
        </p>
        {formulaCard(
          'EQUATED MONTHLY INSTALLMENT',
          'EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)',
          'Where P = Principal amount, r = Monthly interest rate (annual rate / 12 / 100), n = Total months (years × 12)'
        )}
      </div>

      <div style={sectionStyle}>
        <h3 style={h3Style}>2. Total Repayment & Interest</h3>
        {formulaCard(
          'TOTAL REPAYMENT',
          'Total = EMI × n (number of months)',
          'The cumulative amount you pay over the entire loan tenure.'
        )}
        {formulaCard(
          'TOTAL INTEREST',
          'Interest = Total Repayment - Principal',
          'The pure cost of borrowing — the bank\'s profit from your loan.'
        )}
      </div>

      <div style={sectionStyle}>
        <h3 style={h3Style}>3. Inflation-Adjusted Cost (NPV)</h3>
        <p style={pStyle}>
          Money today is worth more than money tomorrow. We calculate the Net Present Value to show 
          what your total repayment is worth in today's rupees.
        </p>
        {formulaCard(
          'REAL COST (NPV)',
          'NPV = Total Repayment / (1 + inflation_rate)^years',
          'Default inflation rate: 6% p.a. This shows the "real" burden of the loan after accounting for inflation eroding the value of future payments.'
        )}
      </div>

      <div style={sectionStyle}>
        <h3 style={h3Style}>4. Opportunity Cost</h3>
        <p style={pStyle}>
          What if you invested the EMI amount instead? We calculate the Future Value of a Systematic Investment Plan (SIP) 
          to show the wealth you're choosing to forego.
        </p>
        {formulaCard(
          'OPPORTUNITY COST (SIP FUTURE VALUE)',
          'FV = EMI × ((1 + r)^n - 1) / r × (1 + r)',
          'Where r = Monthly market return rate, n = Total months. Default expected market return: 12% p.a. (historical Nifty 50 CAGR). This is the compounded wealth from monthly investing.'
        )}
      </div>

      <div style={sectionStyle}>
        <h3 style={h3Style}>5. Tax Savings (Section 80E)</h3>
        <p style={pStyle}>
          Under Section 80E of the Income Tax Act, interest paid on education loans is fully deductible 
          for up to 8 years from the year repayment begins.
        </p>
        {formulaCard(
          'TAX SAVINGS',
          'Savings = Total Interest × Marginal Tax Rate',
          'Default marginal tax rate: 20%. This is a simplified estimate — actual savings depend on your tax slab and the 8-year deduction window.'
        )}
      </div>

      <div style={sectionStyle}>
        <h3 style={h3Style}>6. Financial Stress Index</h3>
        <p style={pStyle}>
          Our stress index measures how much of your expected monthly income goes toward the EMI — 
          a key indicator of financial health.
        </p>
        {formulaCard(
          'STRESS INDEX',
          'Score = (EMI / Monthly Salary) × 100, capped at 0-100',
          'Below 30: Healthy — EMI is manageable. 30-60: Moderate — limits discretionary spending. Above 60: High Risk — debt burden exceeds safe thresholds.'
        )}
      </div>

      <div style={sectionStyle}>
        <h3 style={h3Style}>7. AI Verdict Scoring</h3>
        <p style={pStyle}>Our verdict engine evaluates your loan across 4 weighted factors:</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '1rem' }}>
          {[
            { label: 'Stress Index', weight: '35%', desc: 'EMI vs income capacity' },
            { label: 'Interest Burden', weight: '25%', desc: 'Interest-to-principal ratio' },
            { label: 'Loan Tenure', weight: '20%', desc: 'Duration appropriateness' },
            { label: 'ROI Potential', weight: '20%', desc: 'Salary vs loan obligations' },
          ].map((f, i) => (
            <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '4px', padding: '12px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: '600', marginBottom: '2px' }}>{f.label}</div>
              <div style={{ fontSize: '1.1rem', fontFamily: 'Instrument Serif, serif', color: 'var(--accent-earth)' }}>{f.weight}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{f.desc}</div>
            </div>
          ))}
        </div>
        <p style={pStyle}>
          <strong>70+</strong> = PROCEED &nbsp;|&nbsp; <strong>45-69</strong> = PROCEED WITH CAUTION &nbsp;|&nbsp; <strong>Below 45</strong> = RECONSIDER
        </p>
      </div>

      <div style={sectionStyle}>
        <h3 style={h3Style}>8. Data Sources</h3>
        <p style={pStyle}>
          Median salary and fee data is sourced from publicly reported placement statistics published 
          by institutions, NIRF rankings, and verified alumni surveys. Data is indicative and may not 
          reflect the most current placement cycle.
        </p>
      </div>

      <div style={{ background: 'rgba(95, 109, 91, 0.06)', border: '1px solid rgba(95, 109, 91, 0.15)', borderRadius: '4px', padding: '1.2rem' }}>
        <p style={{ ...pStyle, marginBottom: 0, fontSize: '0.88rem' }}>
          💡 <strong>Open Methodology:</strong> Every formula and assumption used by TrueCost AI is documented above. 
          We believe financial tools should be fully transparent. If you find any inaccuracies or have suggestions 
          for improvement, contact us at <strong style={{ color: 'var(--accent-earth)' }}>methodology@truecost.ai</strong>
        </p>
      </div>
    </div>
  );
};

export default Methodology;
