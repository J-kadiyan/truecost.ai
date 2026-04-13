import React, { useState } from 'react';

const ScenarioModal = ({ isOpen, onClose, data, emi }) => {
  const [failScenario, setFailScenario] = useState('jobless');

  if (!isOpen) return null;

  const scenarios = {
    jobless: {
      title: 'Gap in Employment (12 Months)',
      impact: 'Immediate Obligation: ₹' + Math.round(emi * 12).toLocaleString('en-IN'),
      warning: 'Your co-signers face primary legal liability. Credit health will deteriorate rapidly if unmanaged.',
      action: 'Apply for an immediate grace period extension with the lender.'
    },
    low_salary: {
      title: 'Under-Employment Outcome',
      impact: 'Stress Score: 88/100',
      warning: 'Disposable income will reach zero after EMI and essential living costs.',
      action: 'Seek debt consolidation or restructuring based on actual cashflow.'
    },
    dropout: {
      title: 'Premature Program Exit',
      impact: 'Total Debt Recall: ₹' + Math.round(data.loanAmount).toLocaleString('en-IN'),
      warning: 'The debt remains without the income-generating asset (the degree). This is the highest risk state.',
      action: 'Negotiate a private settlement or long-term restructuring.'
    }
  };

  const s = scenarios[failScenario];

  return (
    <div style={{ 
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
      background: 'rgba(26,26,26,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
      backdropFilter: 'blur(4px)'
    }}>
      <div className="editorial-card" style={{ maxWidth: '500px', width: '90%', background: 'white' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: 'var(--spacing-md)' }}>Stress Testing <span className="text-editorial">Failure</span></h2>
        
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-light)', marginBottom: 'var(--spacing-lg)' }}>
          {Object.keys(scenarios).map(key => (
            <button 
              key={key} 
              onClick={() => setFailScenario(key)}
              style={{ 
                flex: 1, padding: '12px 0', cursor: 'pointer',
                background: 'transparent',
                color: failScenario === key ? 'var(--text-main)' : 'var(--text-muted)',
                border: 'none',
                borderBottom: failScenario === key ? '2px solid var(--text-main)' : 'none',
                fontWeight: failScenario === key ? '700' : '400',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              {key.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div style={{ padding: 'var(--spacing-md)', border: '1px solid var(--border-light)', marginBottom: 'var(--spacing-lg)' }}>
          <h4 style={{ color: 'var(--danger)', marginBottom: '8px', fontSize: '1.2rem', fontFamily: 'Instrument Serif' }}>{s.title}</h4>
          <div style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '12px', fontFamily: 'Instrument Serif' }}>{s.impact}</div>
          <p style={{ fontSize: '0.95rem', marginBottom: '16px', color: 'var(--text-muted)' }}>{s.warning}</p>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', borderTop: '1px solid var(--border-light)', paddingTop: '12px' }}>
            <span style={{ fontWeight: '700' }}>ADVISORY:</span> {s.action}
          </div>
        </div>

        <button className="btn-natural" onClick={onClose} style={{ width: '100%' }}>
          Return to Analysis
        </button>
      </div>
    </div>
  );
};

export default ScenarioModal;
