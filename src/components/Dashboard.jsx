import React, { useState } from 'react';
import { 
  calculateEMI, 
  calculateTotalRepayment, 
  calculateInflationAdjustedCost, 
  calculateOpportunityCost, 
  calculateTaxSavings80E, 
  calculateStressIndex,
  getNetTrueCost
} from '../logic/financial';
import { colleges } from '../data/colleges';
import { jsPDF } from 'jspdf';
import Timeline from './Timeline';
import ScenarioModal from './ScenarioModal';

const Dashboard = ({ data, onBack }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const selectedCollege = colleges.find(c => c.id === parseInt(data.collegeId));
  
  const emi = calculateEMI(data.loanAmount, data.interestRate, data.tenure);
  const totalRepayment = calculateTotalRepayment(emi, data.tenure);
  const totalInterest = totalRepayment - data.loanAmount;
  const inflationAdjusted = calculateInflationAdjustedCost(totalRepayment, data.tenure, data.inflationRate);
  const opportunityCost = calculateOpportunityCost(emi, data.tenure, data.marketReturn);
  const taxSavings = calculateTaxSavings80E(totalInterest);
  const netTrueCost = getNetTrueCost(totalRepayment, taxSavings);
  const stressIndex = calculateStressIndex(emi, selectedCollege?.median_salary);

  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  const handleDownloadReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('TrueCost AI — Financial Decision Report', 20, 30);
    doc.setFontSize(12);
    doc.text('Generated on: ' + new Date().toLocaleDateString(), 20, 40);
    
    doc.text('COLLEGE: ' + selectedCollege.name, 20, 60);
    doc.text('LOAN AMOUNT: ' + formatCurrency(data.loanAmount), 20, 70);
    doc.text('TOTAL REPAYMENT: ' + formatCurrency(totalRepayment), 20, 80);
    doc.text('TOTAL INTEREST: ' + formatCurrency(totalInterest), 20, 90);
    doc.text('MONTHLY EMI: ' + formatCurrency(emi), 20, 100);
    
    doc.setFontSize(16);
    doc.text('OPPORTUNITY COST: ' + formatCurrency(opportunityCost), 20, 120);
    doc.setFontSize(12);
    doc.text('This is the wealth foregone by not investing the EMI amount.', 20, 130);
    
    doc.text('STRESS INDEX: ' + Math.round(stressIndex) + '/100', 20, 150);
    doc.text('A score above 60 indicates high financial danger.', 20, 160);
    
    doc.save('TrueCost_Report.pdf');
  };

  const getIndicatorColor = (idx) => {
    if (idx < 30) return 'var(--safe)';
    if (idx < 60) return 'var(--warning)';
    return 'var(--danger)';
  };

  return (
    <div className="dashboard-wrapper" style={{ animation: 'fadeIn 0.8s ease-out' }}>
      <header style={{ marginBottom: 'var(--spacing-lg)', borderBottom: '1px solid var(--border-light)', paddingBottom: 'var(--spacing-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '3rem' }}>The <span className="text-editorial">True Cost</span> Report</h1>
          <p style={{ color: 'var(--text-muted)' }}>Analysis for {selectedCollege?.name}</p>
        </div>
        <button className="btn-natural" onClick={onBack} style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>New Analysis</button>
      </header>

      <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: 'var(--spacing-lg)' }}>
        <div className="main-content">
          <div className="editorial-card" style={{ marginBottom: 'var(--spacing-lg)', borderTop: `4px solid ${getIndicatorColor(stressIndex)}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '8px' }}>Financial Stress Index</h3>
                <div style={{ fontSize: '4rem', fontFamily: 'Instrument Serif', color: getIndicatorColor(stressIndex) }}>
                  {Math.round(stressIndex)}<span style={{ fontSize: '1.5rem', opacity: 0.5 }}>/100</span>
                </div>
              </div>
              <div style={{ maxWidth: '300px', textAlign: 'right' }}>
                <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>
                  {stressIndex > 60 ? 'High Risk' : stressIndex > 30 ? 'Moderate Caution' : 'Healthly Alignment'}
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  {stressIndex > 60 ? 'The loan burden significantly exceeds verified median income for this program.' : 
                   stressIndex > 30 ? 'Debt service will limit your financial flexibility for approximately 10 years.' : 
                   'Your expected income comfortably services the debt obligation.'}
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-lg)' }}>
            <div className="editorial-card">
              <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>CUMULATIVE REPAYMENT</h4>
              <div style={{ fontSize: '2rem', fontFamily: 'Instrument Serif' }}>{formatCurrency(totalRepayment)}</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--danger)', marginTop: '8px' }}>
                Interest Burden: {formatCurrency(totalInterest)}
              </div>
            </div>
            <div className="editorial-card">
              <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>REAL COST (NPV)</h4>
              <div style={{ fontSize: '2rem', fontFamily: 'Instrument Serif' }}>{formatCurrency(inflationAdjusted)}</div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                Adjusted for {data.inflationRate}% annual inflation.
              </p>
            </div>
          </div>

          <div className="editorial-card" style={{ backgroundColor: 'var(--bg-natural)', borderStyle: 'dashed' }}>
            <h4 style={{ fontSize: '0.8rem', color: 'var(--accent-earth)', marginBottom: '12px', fontWeight: '700' }}>THE OPPORTUNITY COST</h4>
            <div style={{ fontSize: '3rem', fontFamily: 'Instrument Serif', marginBottom: '12px' }}>{formatCurrency(opportunityCost)}</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              By choosing the loan over investing the monthly EMI (₹{Math.round(emi)}) into a diversified market fund 
              at {data.marketReturn}% CAGR, this is the total wealth you are opting to forego.
            </p>
          </div>

          <Timeline data={data} emi={emi} />
        </div>

        <div className="sidebar">
          <div className="editorial-card" style={{ position: 'sticky', top: 'var(--spacing-md)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-md)' }}>Decision Specs</h3>
            <div style={{ fontSize: '0.9rem' }}>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>INSTITUTION</div>
                <div style={{ fontWeight: '600' }}>{selectedCollege?.name}</div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>QUALIFICATION</div>
                <div style={{ fontWeight: '600' }}>{selectedCollege?.degree}</div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>EXPECTED INCOME</div>
                <div style={{ fontWeight: '600' }}>{formatCurrency(selectedCollege?.median_salary / 12)} / month</div>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <div style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>MONTHLY OBLIGATION</div>
                <div style={{ fontWeight: '700', fontSize: '1.4rem' }}>{formatCurrency(emi)}</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button 
                onClick={() => setModalOpen(true)}
                style={{ 
                  width: '100%', 
                  background: 'transparent', 
                  border: '1px solid var(--danger)', 
                  color: 'var(--danger)', 
                  padding: '12px', 
                  borderRadius: '2px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.9rem'
                }}
              >
                Stress Test Failure
              </button>
              <button className="btn-natural" onClick={handleDownloadReport} style={{ width: '100%' }}>
                Download Archive (PDF)
              </button>
            </div>
          </div>
        </div>
      </div>

      <ScenarioModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        data={data} 
        emi={emi} 
      />
    </div>
  );
};

export default Dashboard;
