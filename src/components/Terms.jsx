import React from 'react';

const Terms = ({ onBack }) => {
  const sectionStyle = { marginBottom: '2rem' };
  const h3Style = { fontSize: '1.3rem', marginBottom: '0.8rem' };
  const pStyle = { fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '0.8rem' };
  const ulStyle = { paddingLeft: '1.2rem', fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '2' };

  return (
    <div className="container" style={{ maxWidth: '780px', animation: 'fadeIn 0.8s ease-out', padding: 'var(--spacing-lg) 1.5rem' }}>
      <button onClick={onBack} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--accent-earth)', fontSize: '0.85rem', fontFamily: 'Inter, sans-serif', marginBottom: '1rem', padding: 0 }}>
        ← Back to Home
      </button>

      <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '0.5rem' }}>
        Terms of <span className="text-editorial">Service</span>
      </h1>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 'var(--spacing-lg)', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
        Effective: May 2026
      </p>

      <div style={sectionStyle}>
        <h3 style={h3Style}>1. Acceptance of Terms</h3>
        <p style={pStyle}>
          By accessing or using TrueCost AI, you agree to be bound by these Terms of Service. 
          If you do not agree to these terms, you may not use the platform. These terms apply to all 
          visitors, users, and others who access or use the service.
        </p>
      </div>

      <div style={sectionStyle}>
        <h3 style={h3Style}>2. Description of Service</h3>
        <p style={pStyle}>
          TrueCost AI is an educational financial analysis tool that helps students and families understand 
          the long-term cost implications of education loans. The platform provides:
        </p>
        <ul style={ulStyle}>
          <li>EMI and total repayment calculations</li>
          <li>Opportunity cost and inflation-adjusted cost analysis</li>
          <li>Financial stress index assessment</li>
          <li>College comparison tools</li>
          <li>Prepayment simulation and tax savings estimates</li>
          <li>Downloadable PDF audit reports</li>
        </ul>
      </div>

      <div style={sectionStyle}>
        <h3 style={h3Style}>3. Not Financial Advice</h3>
        <div style={{ background: 'rgba(194, 149, 69, 0.08)', border: '1px solid rgba(194, 149, 69, 0.2)', borderRadius: '4px', padding: '1rem', marginBottom: '1rem' }}>
          <p style={{ ...pStyle, color: 'var(--warning)', fontWeight: '600', marginBottom: '0.4rem', fontSize: '0.88rem' }}>
            ⚠️ Important Disclaimer
          </p>
          <p style={{ ...pStyle, marginBottom: 0, fontSize: '0.88rem' }}>
            TrueCost AI is for <strong>educational and informational purposes only</strong>. 
            It does not constitute financial, investment, or legal advice. All calculations are approximations 
            based on user inputs and publicly available data. Always consult a certified financial advisor 
            before making financial decisions.
          </p>
        </div>
      </div>

      <div style={sectionStyle}>
        <h3 style={h3Style}>4. User Accounts</h3>
        <ul style={ulStyle}>
          <li>You must provide accurate and complete registration information</li>
          <li>You are responsible for maintaining the security of your account credentials</li>
          <li>You must notify us immediately of any unauthorized use of your account</li>
          <li>We reserve the right to suspend accounts that violate these terms</li>
        </ul>
      </div>

      <div style={sectionStyle}>
        <h3 style={h3Style}>5. Data Accuracy</h3>
        <p style={pStyle}>
          While we strive to use accurate and up-to-date college placement data, median salary figures, 
          and fee structures, TrueCost AI makes <strong>no warranty</strong> regarding the accuracy, 
          completeness, or timeliness of this data. Institution-specific data is sourced from publicly 
          reported placement statistics and may not reflect current conditions.
        </p>
      </div>

      <div style={sectionStyle}>
        <h3 style={h3Style}>6. Intellectual Property</h3>
        <p style={pStyle}>
          The TrueCost AI platform, including its algorithms, design, content, and branding, is protected 
          by intellectual property rights. Users may not reproduce, distribute, or create derivative works 
          without explicit written permission.
        </p>
      </div>

      <div style={sectionStyle}>
        <h3 style={h3Style}>7. Limitation of Liability</h3>
        <p style={pStyle}>
          TrueCost AI shall not be liable for any indirect, incidental, special, consequential, or punitive 
          damages resulting from your use of or inability to use the service. This includes but is not limited 
          to financial losses arising from decisions made based on information provided by the platform.
        </p>
      </div>

      <div style={sectionStyle}>
        <h3 style={h3Style}>8. Modifications</h3>
        <p style={pStyle}>
          We reserve the right to modify these terms at any time. Changes will be effective immediately upon 
          posting to the platform. Continued use of the service after modifications constitutes acceptance of 
          the updated terms.
        </p>
      </div>

      <div style={{ ...sectionStyle, background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '4px', padding: '1.2rem' }}>
        <h3 style={{ ...h3Style, fontSize: '1rem' }}>Questions?</h3>
        <p style={{ ...pStyle, marginBottom: 0 }}>
          Contact us at <strong style={{ color: 'var(--accent-earth)' }}>legal@truecost.ai</strong> for any questions about these terms.
        </p>
      </div>
    </div>
  );
};

export default Terms;
