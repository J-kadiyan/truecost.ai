import React, { useState, useMemo } from 'react';
import { calculatePrepaymentSavings, calculateEMI } from '../logic/financial';

const PrepaymentSimulator = ({ data }) => {
  const [extraMonthly, setExtraMonthly] = useState(0);
  const maxExtra = Math.round(calculateEMI(data.loanAmount, data.interestRate, data.tenure) * 2);

  const savings = useMemo(() => {
    return calculatePrepaymentSavings(data.loanAmount, data.interestRate, data.tenure, extraMonthly);
  }, [data.loanAmount, data.interestRate, data.tenure, extraMonthly]);

  const fmt = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  const yearsFromMonths = (m) => {
    const y = Math.floor(m / 12);
    const mo = m % 12;
    if (y === 0) return `${mo} months`;
    if (mo === 0) return `${y} years`;
    return `${y}y ${mo}m`;
  };

  const pct = savings.originalTotalInterest > 0 ? ((savings.interestSaved / savings.originalTotalInterest) * 100).toFixed(1) : 0;

  const resultBox = { background: 'rgba(74,93,78,0.06)', borderRadius: '6px', padding: '12px', textAlign: 'center' };
  const resultVal = { fontSize: '1.4rem', fontFamily: 'Instrument Serif, serif', color: 'var(--safe)', lineHeight: 1.1 };
  const resultLbl = { fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', marginTop: '4px' };

  return (
    <div className="editorial-card" style={{ padding: 'var(--spacing-md)', borderStyle: 'dashed', borderColor: 'var(--accent-earth)' }}>
      <h4 style={{ fontSize: '0.75rem', color: 'var(--accent-earth)', marginBottom: '4px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        PREPAYMENT SIMULATOR
      </h4>
      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
        See how extra monthly payments reduce your loan tenure and total interest.
      </p>

      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
          <label style={{ fontSize: '0.78rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Extra Monthly Payment
          </label>
          <span style={{ fontSize: '1.2rem', fontWeight: '700', fontFamily: 'Instrument Serif, serif', color: extraMonthly > 0 ? 'var(--accent-earth)' : 'var(--text-muted)' }}>
            {fmt(extraMonthly)}
          </span>
        </div>
        <input
          type="range" min="0" max={maxExtra} step={500} value={extraMonthly}
          onChange={(e) => setExtraMonthly(parseInt(e.target.value))}
          className="prepay-slider"
          style={{
            width: '100%', height: '6px', appearance: 'none', WebkitAppearance: 'none',
            background: `linear-gradient(to right, var(--accent-earth) ${(extraMonthly / maxExtra) * 100}%, var(--border-light) ${(extraMonthly / maxExtra) * 100}%)`,
            borderRadius: '4px', outline: 'none', cursor: 'pointer',
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
          <span>₹0</span><span>{fmt(maxExtra)}</span>
        </div>
      </div>

      {extraMonthly > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
          <div style={resultBox}><div style={resultVal}>{yearsFromMonths(savings.timeSavedMonths)}</div><div style={resultLbl}>TIME SAVED</div></div>
          <div style={resultBox}><div style={resultVal}>{fmt(savings.interestSaved)}</div><div style={resultLbl}>INTEREST SAVED</div></div>
          <div style={resultBox}><div style={resultVal}>{pct}%</div><div style={resultLbl}>INTEREST REDUCED</div></div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '12px', color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>
          Move the slider to see how prepayments impact your loan ↑
        </div>
      )}
    </div>
  );
};

export default PrepaymentSimulator;
