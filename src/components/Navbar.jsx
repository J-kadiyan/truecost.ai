import React from 'react';

const Navbar = ({ onReset }) => {
  return (
    <nav style={{ 
      borderBottom: '1px solid var(--border-light)', 
      background: 'rgba(252, 251, 249, 0.8)',
      backdropFilter: 'blur(10px)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      animation: 'slideDown 0.6s ease-out'
    }}>
      <div className="container" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        height: '70px' 
      }}>
        <div 
          onClick={onReset}
          style={{ 
            fontFamily: 'Instrument Serif', 
            fontSize: '1.5rem', 
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          TrueCost <span className="text-editorial">AI</span>
        </div>
        
        <button 
          className="btn-natural" 
          onClick={onReset}
          style={{ padding: '0.6rem 1.2rem', fontSize: '0.8rem' }}
        >
          New Analysis
        </button>
      </div>

      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
