import React from 'react';

const Timeline = ({ data, emi }) => {
  const currentYear = new Date().getFullYear();
  const loanTenure = data.tenure;
  
  const milestones = [
    { year: currentYear, label: 'Origin', desc: 'EMI begins at ' + Math.round(emi) },
    { year: currentYear + Math.round(loanTenure / 2), label: 'Equilibrium', desc: '50% Principal amortization' },
    { year: currentYear + loanTenure, label: 'Absolution', desc: 'Debt cleared. Cashflow reclaimed.' },
    { year: currentYear + loanTenure + 5, label: 'Legacy', desc: 'Wealth compounding accelerates' }
  ];

  return (
    <div className="timeline-container editorial-card" style={{ marginTop: 'var(--spacing-lg)', borderStyle: 'dotted' }}>
      <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-lg)' }}>Journey <span className="text-editorial">to Liquidity</span></h3>
      <div style={{ position: 'relative', padding: '0 10px', overflowX: 'auto' }}>
        <div style={{ 
          height: '1px', 
          background: 'var(--border-light)', 
          width: '100%', 
          position: 'absolute', 
          top: '12px', 
          left: 0, 
          zIndex: 0 
        }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', minWidth: '700px', position: 'relative', zIndex: 1 }}>
          {milestones.map((m, i) => (
            <div key={i} style={{ width: '120px', textAlign: 'center' }}>
              <div style={{ 
                width: '10px', 
                height: '10px', 
                background: i <= 2 ? 'var(--text-main)' : 'var(--accent-earth)', 
                borderRadius: '50%', 
                margin: '0 auto 16px',
                border: '4px solid var(--bg-card)',
              }} />
              <div style={{ fontFamily: 'Instrument Serif', fontSize: '1.4rem', fontWeight: '400' }}>{m.year}</div>
              <div style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>{m.label}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '8px', lineHeight: '1.4', fontStyle: 'italic' }}>{m.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
