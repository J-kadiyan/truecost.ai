import React, { useState } from 'react';
import { colleges } from '../data/colleges';

const InputFlow = ({ onAnalyze }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    loanAmount: 1500000,
    interestRate: 10.5,
    tenure: 10,
    collegeId: colleges[0].id,
    inflationRate: 6,
    marketReturn: 12
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) || value }));
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const selectedCollege = colleges.find(c => c.id === parseInt(formData.collegeId));

  const labelStyle = { 
    display: 'block', 
    marginBottom: '8px', 
    fontSize: '0.85rem', 
    fontWeight: '600',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  };

  const inputStyle = { 
    width: '100%', 
    padding: '12px 0', 
    background: 'transparent', 
    border: 'none', 
    borderBottom: '1px solid var(--border-light)', 
    fontSize: '1.2rem',
    color: 'var(--text-main)',
    marginBottom: 'var(--spacing-md)',
    outline: 'none',
    transition: 'border-color 0.3s ease'
  };

  return (
    <div className="input-flow-container" style={{ maxWidth: '500px', margin: '0 auto', animation: 'fadeIn 0.8s ease-out' }}>
      <div className="step-count" style={{ marginBottom: 'var(--spacing-md)', fontSize: '0.9rem', color: 'var(--accent-earth)' }}>
        Phase 0{step} <span style={{ color: 'var(--border-light)', margin: '0 8px' }}>/</span> 03
      </div>

      <div className="editorial-card" style={{ padding: 'var(--spacing-lg)' }}>
        {step === 1 && (
          <div className="step-content">
            <h2 style={{ fontSize: '2rem', marginBottom: 'var(--spacing-lg)' }}>Loan Particulars</h2>
            <div className="form-group">
              <label style={labelStyle}>Principal Amount (₹)</label>
              <input 
                type="number" 
                name="loanAmount" 
                value={formData.loanAmount} 
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-earth)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
              />
            </div>
            <div className="form-group">
              <label style={labelStyle}>Annual Interest Rate (%)</label>
              <input 
                type="number" 
                name="interestRate" 
                value={formData.interestRate} 
                onChange={handleChange}
                step="0.1"
                style={inputStyle}
              />
            </div>
            <div className="form-group">
              <label style={labelStyle}>Repayment Tenure (Years)</label>
              <input 
                type="number" 
                name="tenure" 
                value={formData.tenure} 
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <button className="btn-natural" onClick={nextStep} style={{ width: '100%', marginTop: 'var(--spacing-md)' }}>Continue</button>
          </div>
        )}

        {step === 2 && (
          <div className="step-content">
            <h2 style={{ fontSize: '2rem', marginBottom: 'var(--spacing-lg)' }}>College <span className="text-editorial">&</span> Outcome</h2>
            <div className="form-group">
              <label style={labelStyle}>Select Institution</label>
              <select 
                name="collegeId" 
                value={formData.collegeId} 
                onChange={handleChange}
                style={{ ...inputStyle, borderBottom: '1px solid var(--border-light)', cursor: 'pointer' }}
              >
                {colleges.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            {selectedCollege && (
              <p style={{ fontSize: '0.9rem', color: 'var(--accent-earth)', marginBottom: 'var(--spacing-lg)' }}>
                Verified median outcome for this degree: <strong>₹{(selectedCollege.median_salary / 100000).toFixed(1)} LPA</strong>
              </p>
            )}
            <div style={{ display: 'flex', gap: '20px' }}>
              <button onClick={prevStep} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>Back</button>
              <button className="btn-natural" onClick={nextStep} style={{ flex: 1 }}>Continue</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-content">
            <h2 style={{ fontSize: '2rem', marginBottom: 'var(--spacing-lg)' }}>Assumptions</h2>
            <div className="form-group">
              <label style={labelStyle}>Inflation Rate (%)</label>
              <input 
                type="number" 
                name="inflationRate" 
                value={formData.inflationRate} 
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div className="form-group">
              <label style={labelStyle}>Expected Market Returns (%)</label>
              <input 
                type="number" 
                name="marketReturn" 
                value={formData.marketReturn} 
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div style={{ display: 'flex', gap: '20px', marginTop: 'var(--spacing-md)' }}>
              <button onClick={prevStep} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>Back</button>
              <button className="btn-natural" onClick={() => onAnalyze(formData)} style={{ flex: 1 }}>Reveal Truth</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputFlow;
