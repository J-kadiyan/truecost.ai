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
    // ... (Keep existing professional PDF audit logic) ...
    const doc = new jsPDF();
    const primaryColor = [95, 109, 91]; // Sage Green
    const textColor = [26, 26, 26];

    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.text('TRUECOST AI', 20, 25);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('FINANCIAL TRUTH AUDIT // ' + new Date().toLocaleDateString(), 140, 25);

    doc.setTextColor(...textColor);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('1. Institutional Analysis', 20, 55);
    doc.setDrawColor(229, 226, 223);
    doc.line(20, 58, 190, 58);
    // ... (Continue original PDF logic) ...
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text('Institution:', 20, 68);
    doc.setFont('helvetica', 'bold');
    doc.text(selectedCollege?.name || 'N/A', 60, 68);
    doc.save(`TrueCost_Report_${new Date().getTime()}.pdf`);
  };

  const getIndicatorColor = (idx) => {
    if (idx < 30) return 'var(--safe)';
    if (idx < 60) return 'var(--warning)';
    return 'var(--danger)';
  };

  return (
    <div className="dashboard-wrapper container" style={{ animation: 'fadeIn 0.8s ease-out' }}>
      <header style={{ 
        marginBottom: 'var(--spacing-lg)', 
        borderBottom: '1px solid var(--border-light)', 
        paddingBottom: 'var(--spacing-md)', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>The <span className="text-editorial">True Cost</span> Report</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Analysis for {selectedCollege?.name}</p>
        </div>
        <button className="btn-natural" onClick={onBack} style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>New Analysis</button>
      </header>

      <div className="dashboard-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: 'var(--spacing-lg)' 
      }}>
        <div className="main-content">
          <div className="editorial-card" style={{ marginBottom: 'var(--spacing-lg)', borderTop: `4px solid ${getIndicatorColor(stressIndex)}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <h3 style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '8px' }}>Financial Stress Index</h3>
                <div style={{ fontSize: '3.5rem', fontFamily: 'Instrument Serif', color: getIndicatorColor(stressIndex), lineHeight: 1 }}>
                  {Math.round(stressIndex)}<span style={{ fontSize: '1.2rem', opacity: 0.5 }}>/100</span>
                </div>
              </div>
              <div style={{ maxWidth: '300px' }}>
                <p style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '4px' }}>
                  {stressIndex > 60 ? 'High Risk' : stressIndex > 30 ? 'Moderate Caution' : 'Healthy Alignment'}
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  {stressIndex > 60 ? 'Loan burden exceeds verified income thresholds.' : 'Repayment is manageable but limits flexibility.'}
                </p>
              </div>
            </div>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: 'var(--spacing-md)', 
            marginBottom: 'var(--spacing-lg)' 
          }}>
            <div className="editorial-card">
              <h4 style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>CUMULATIVE REPAYMENT</h4>
              <div style={{ fontSize: '1.8rem', fontFamily: 'Instrument Serif' }}>{formatCurrency(totalRepayment)}</div>
            </div>
            <div className="editorial-card">
              <h4 style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>REAL COST (NPV)</h4>
              <div style={{ fontSize: '1.8rem', fontFamily: 'Instrument Serif' }}>{formatCurrency(inflationAdjusted)}</div>
            </div>
          </div>

          <div className="editorial-card" style={{ backgroundColor: 'var(--bg-natural)', borderStyle: 'dashed' }}>
            <h4 style={{ fontSize: '0.75rem', color: 'var(--accent-earth)', marginBottom: '12px', fontWeight: '700' }}>THE OPPORTUNITY COST</h4>
            <div style={{ fontSize: '2.5rem', fontFamily: 'Instrument Serif', marginBottom: '12px', lineHeight: 1 }}>{formatCurrency(opportunityCost)}</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              By choosing the loan over investing the monthly EMI, this is the total wealth you are opting to forego.
            </p>
          </div>

          <Timeline data={data} emi={emi} />
        </div>

        <div className="sidebar">
          <div className="editorial-card" style={{ position: 'sticky', top: 'var(--spacing-md)' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: 'var(--spacing-md)' }}>Decision Specs</h3>
            <div style={{ fontSize: '0.85rem', display: 'grid', gap: '12px' }}>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>INSTITUTION</div>
                <div style={{ fontWeight: '600' }}>{selectedCollege?.name}</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>EXPECTED INCOME</div>
                <div style={{ fontWeight: '600' }}>{formatCurrency(selectedCollege?.median_salary / 12)} / month</div>
              </div>
              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '10px' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>MONTHLY OBLIGATION</div>
                <div style={{ fontWeight: '700', fontSize: '1.2rem' }}>{formatCurrency(emi)}</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
              <button onClick={() => setModalOpen(true)} className="btn-stress-test" style={{ padding: '10px', background: 'transparent', border: '1px solid var(--danger)', color: 'var(--danger)', borderRadius: '2px', cursor: 'pointer', fontSize: '0.85rem' }}>
                Stress Test Failure
              </button>
              <button className="btn-natural" onClick={handleDownloadReport} style={{ width: '100%', fontSize: '0.85rem' }}>
                Download Archive (PDF)
              </button>
            </div>
          </div>
        </div>
      </div>

      <ScenarioModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} data={data} emi={emi} />
    </div>
  );
};

export default Dashboard;
