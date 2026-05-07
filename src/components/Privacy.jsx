import React from 'react';

const Privacy = ({ onBack }) => {
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
        Privacy <span className="text-editorial">Policy</span>
      </h1>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 'var(--spacing-lg)', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
        Last updated: May 2026
      </p>

      <div style={sectionStyle}>
        <h3 style={h3Style}>1. Information We Collect</h3>
        <p style={pStyle}>TrueCost AI collects the following types of information:</p>
        <ul style={ulStyle}>
          <li><strong>Account Information:</strong> Name, email address, and encrypted password when you register.</li>
          <li><strong>Analysis Data:</strong> Loan parameters, college selections, and financial assumptions you input during analysis.</li>
          <li><strong>Usage Data:</strong> Pages viewed, features used, and interaction patterns to improve our service.</li>
        </ul>
      </div>

      <div style={sectionStyle}>
        <h3 style={h3Style}>2. How We Use Your Information</h3>
        <p style={pStyle}>We use collected information to:</p>
        <ul style={ulStyle}>
          <li>Provide personalized financial analysis and cost calculations</li>
          <li>Save and manage your analysis history in your profile</li>
          <li>Improve our algorithms and user experience</li>
          <li>Send important account-related communications</li>
        </ul>
      </div>

      <div style={sectionStyle}>
        <h3 style={h3Style}>3. Data Storage & Security</h3>
        <p style={pStyle}>
          Your data is stored securely in MongoDB databases. Passwords are hashed using bcrypt with salt rounds. 
          Authentication is managed via JSON Web Tokens (JWT). We implement industry-standard security measures 
          to protect your personal information from unauthorized access, alteration, or destruction.
        </p>
      </div>

      <div style={sectionStyle}>
        <h3 style={h3Style}>4. Data Sharing</h3>
        <p style={pStyle}>
          TrueCost AI does <strong>not</strong> sell, rent, or share your personal data with third parties. 
          Your analysis data remains private to your account. Shared analysis links contain only loan parameters 
          encoded in the URL — no personal information is transmitted.
        </p>
      </div>

      <div style={sectionStyle}>
        <h3 style={h3Style}>5. Cookies & Local Storage</h3>
        <p style={pStyle}>
          We use browser localStorage to persist your authentication token, theme preference (dark/light mode), 
          and session data. No third-party tracking cookies are used.
        </p>
      </div>

      <div style={sectionStyle}>
        <h3 style={h3Style}>6. Your Rights</h3>
        <ul style={ulStyle}>
          <li>Access and download your saved analyses at any time</li>
          <li>Update or delete your account information from your profile</li>
          <li>Delete individual saved analyses</li>
          <li>Request complete account deletion by contacting us</li>
        </ul>
      </div>

      <div style={{ ...sectionStyle, background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '4px', padding: '1.2rem' }}>
        <h3 style={{ ...h3Style, fontSize: '1rem' }}>Contact Us</h3>
        <p style={{ ...pStyle, marginBottom: 0 }}>
          For any privacy-related questions or requests, please reach out to us at{' '}
          <strong style={{ color: 'var(--accent-earth)' }}>privacy@truecost.ai</strong>
        </p>
      </div>
    </div>
  );
};

export default Privacy;
