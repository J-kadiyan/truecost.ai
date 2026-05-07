import React from 'react';

const Footer = ({ onNavigate }) => {
  const linkStyle = { 
    color: 'var(--text-muted)', 
    textDecoration: 'none', 
    cursor: 'pointer',
    transition: 'color 0.2s ease',
  };

  const handleClick = (view) => (e) => {
    e.preventDefault();
    if (onNavigate) onNavigate(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ 
      borderTop: '1px solid var(--border-light)', 
      marginTop: 'var(--spacing-xl)',
      padding: 'var(--spacing-lg) 0',
      background: 'var(--bg-card)' 
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
          <a href="#" onClick={handleClick('privacy')} style={linkStyle}
            onMouseEnter={e => e.target.style.color = 'var(--accent-earth)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
          >Privacy</a>
          <a href="#" onClick={handleClick('terms')} style={linkStyle}
            onMouseEnter={e => e.target.style.color = 'var(--accent-earth)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
          >Terms</a>
          <a href="#" onClick={handleClick('methodology')} style={linkStyle}
            onMouseEnter={e => e.target.style.color = 'var(--accent-earth)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
          >Methodology</a>
        </div>

        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', opacity: 0.5, marginTop: '10px' }}>
          &copy; {new Date().getFullYear()} TrueCost AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
