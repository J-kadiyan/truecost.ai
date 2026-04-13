import React from 'react';

const Footer = () => {
  return (
    <footer style={{ 
      borderTop: '1px solid var(--border-light)', 
      marginTop: 'var(--spacing-xl)',
      padding: 'var(--spacing-lg) 0',
      background: '#fff' 
    }}>
      <div className="container" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '20px',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <div style={{ fontFamily: 'Instrument Serif', fontSize: '1.2rem' }}>
          TrueCost <span className="text-editorial">AI</span>
        </div>
        
        <p style={{ 
          fontSize: '0.85rem', 
          color: 'var(--text-muted)', 
          maxWidth: '400px',
          lineHeight: '1.6'
        }}>
          Mapping the long-term economic and psychological impact of education debt. 
          Radical transparency for the next generation.
        </p>

        <div style={{ display: 'flex', gap: '20px', fontSize: '0.8rem' }}>
          <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy</a>
          <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Terms</a>
          <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Methodology</a>
        </div>

        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', opacity: 0.5, marginTop: '10px' }}>
          &copy; {new Date().getFullYear()} TrueCost AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
