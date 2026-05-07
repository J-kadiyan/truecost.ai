import React, { useState } from 'react';
import { colleges } from '../data/colleges';
import { calculateEMI, calculateTotalRepayment, calculateOpportunityCost, calculateStressIndex } from '../logic/financial';

const CompareColleges = ({ onBack }) => {
  const [collegeA, setCollegeA] = useState(colleges[0].id);
  const [collegeB, setCollegeB] = useState(colleges[1].id);
  const [loanAmount, setLoanAmount] = useState(1500000);
  const [interestRate, setInterestRate] = useState(10.5);
  const [tenure, setTenure] = useState(10);

  const fmt = (v) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);

  const analyze = (id) => {
    const c = colleges.find(cl => cl.id === id);
    if (!c) return null;
    const emi = calculateEMI(loanAmount, interestRate, tenure);
    const total = calculateTotalRepayment(emi, tenure);
    const interest = total - loanAmount;
    const opp = calculateOpportunityCost(emi, tenure, 12);
    const stress = calculateStressIndex(emi, c.median_salary);
    const emiToIncome = c.median_salary ? ((emi / (c.median_salary / 12)) * 100) : 0;
    return { college: c, emi, total, interest, opp, stress, emiToIncome };
  };

  const a = analyze(collegeA);
  const b = analyze(collegeB);

  const betterStyle = { color: 'var(--safe)', fontWeight: '700' };
  const worseStyle = { color: 'var(--danger)', fontWeight: '600' };

  const compRow = (label, valA, valB, lowerBetter = true) => {
    const aNum = typeof valA === 'number' ? valA : parseFloat(valA);
    const bNum = typeof valB === 'number' ? valB : parseFloat(valB);
    const aWins = lowerBetter ? aNum <= bNum : aNum >= bNum;
    return (
      <tr key={label}>
        <td style={{ padding: '10px 12px', fontSize: '0.83rem', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-light)' }}>{label}</td>
        <td style={{ padding: '10px 12px', fontSize: '0.9rem', borderBottom: '1px solid var(--border-light)', textAlign: 'right', ...(aWins ? betterStyle : worseStyle) }}>
          {typeof valA === 'number' ? fmt(valA) : valA}
        </td>
        <td style={{ padding: '10px 12px', fontSize: '0.9rem', borderBottom: '1px solid var(--border-light)', textAlign: 'right', ...(!aWins ? betterStyle : worseStyle) }}>
          {typeof valB === 'number' ? fmt(valB) : valB}
        </td>
      </tr>
    );
  };

  const inputSt = { padding: '8px 12px', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '4px', fontSize: '0.9rem', color: 'var(--text-main)', outline: 'none', fontFamily: 'Inter, sans-serif', width: '100%', boxSizing: 'border-box' };
  const lblSt = { fontSize: '0.7rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px', display: 'block' };

  return (
    <div className="container" style={{ maxWidth: '900px', animation: 'fadeIn 0.8s ease-out' }}>
      <header style={{ marginBottom: 'var(--spacing-lg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>College <span className="text-editorial">Comparison</span></h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Side-by-side financial analysis</p>
        </div>
        <button className="btn-natural" onClick={onBack} style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Back</button>
      </header>

      {/* Loan parameters */}
      <div className="editorial-card" style={{ marginBottom: 'var(--spacing-lg)', padding: 'var(--spacing-md)' }}>
        <h4 style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>LOAN PARAMETERS (SHARED)</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
          <div><label style={lblSt}>Loan Amount (₹)</label><input type="number" value={loanAmount} onChange={e => setLoanAmount(+e.target.value)} style={inputSt} /></div>
          <div><label style={lblSt}>Interest Rate (%)</label><input type="number" step="0.1" value={interestRate} onChange={e => setInterestRate(+e.target.value)} style={inputSt} /></div>
          <div><label style={lblSt}>Tenure (Years)</label><input type="number" value={tenure} onChange={e => setTenure(+e.target.value)} style={inputSt} /></div>
        </div>
      </div>

      {/* College selectors */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: 'var(--spacing-lg)' }}>
        <div>
          <label style={lblSt}>College A</label>
          <select value={collegeA} onChange={e => setCollegeA(+e.target.value)} style={{ ...inputSt, cursor: 'pointer' }}>
            {colleges.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label style={lblSt}>College B</label>
          <select value={collegeB} onChange={e => setCollegeB(+e.target.value)} style={{ ...inputSt, cursor: 'pointer' }}>
            {colleges.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </div>

      {/* Comparison table */}
      {a && b && (
        <div className="editorial-card" style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--accent-earth)' }}>
                <th style={{ padding: '12px', color: '#fff', fontSize: '0.78rem', textAlign: 'left', fontWeight: '600' }}>Metric</th>
                <th style={{ padding: '12px', color: '#fff', fontSize: '0.78rem', textAlign: 'right', fontWeight: '600' }}>{a.college.name.split('(')[0].trim()}</th>
                <th style={{ padding: '12px', color: '#fff', fontSize: '0.78rem', textAlign: 'right', fontWeight: '600' }}>{b.college.name.split('(')[0].trim()}</th>
              </tr>
            </thead>
            <tbody>
              {compRow('Approx. Fees', a.college.fees_approx, b.college.fees_approx, true)}
              {compRow('Median Salary', a.college.median_salary, b.college.median_salary, false)}
              {compRow('Monthly EMI', a.emi, b.emi, true)}
              {compRow('Total Repayment', a.total, b.total, true)}
              {compRow('Total Interest', a.interest, b.interest, true)}
              {compRow('Opportunity Cost', a.opp, b.opp, true)}
              <tr>
                <td style={{ padding: '10px 12px', fontSize: '0.83rem', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-light)' }}>Stress Index</td>
                <td style={{ padding: '10px 12px', fontSize: '0.9rem', borderBottom: '1px solid var(--border-light)', textAlign: 'right', ...(a.stress <= b.stress ? betterStyle : worseStyle) }}>{a.stress.toFixed(1)}/100</td>
                <td style={{ padding: '10px 12px', fontSize: '0.9rem', borderBottom: '1px solid var(--border-light)', textAlign: 'right', ...(b.stress <= a.stress ? betterStyle : worseStyle) }}>{b.stress.toFixed(1)}/100</td>
              </tr>
              <tr>
                <td style={{ padding: '10px 12px', fontSize: '0.83rem', color: 'var(--text-muted)' }}>EMI-to-Income</td>
                <td style={{ padding: '10px 12px', fontSize: '0.9rem', textAlign: 'right', ...(a.emiToIncome <= b.emiToIncome ? betterStyle : worseStyle) }}>{a.emiToIncome.toFixed(1)}%</td>
                <td style={{ padding: '10px 12px', fontSize: '0.9rem', textAlign: 'right', ...(b.emiToIncome <= a.emiToIncome ? betterStyle : worseStyle) }}>{b.emiToIncome.toFixed(1)}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CompareColleges;
