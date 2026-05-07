import React from 'react';

const Navbar = ({ onReset, user, onLoginClick, onProfileClick, onCompareClick, theme, onToggleTheme }) => {
  return (
    <nav style={{ 
      borderBottom: '1px solid var(--border-light)', 
      background: theme === 'dark' ? 'rgba(19, 22, 20, 0.85)' : 'rgba(252, 251, 249, 0.8)',
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
        
        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
          <button 
            className="theme-toggle"
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <button 
            onClick={onCompareClick}
            style={{ 
              padding: '0.5rem 0.9rem', 
              fontSize: '0.78rem', 
              background: 'transparent', 
              border: '1px solid var(--border-light)', 
              borderRadius: '2px', 
              cursor: 'pointer', 
              color: 'var(--text-muted)', 
              fontFamily: 'Inter, sans-serif',
              transition: 'var(--transition-organic)',
            }}
            onMouseEnter={e => { e.target.style.borderColor = 'var(--accent-earth)'; e.target.style.color = 'var(--accent-earth)'; }}
            onMouseLeave={e => { e.target.style.borderColor = 'var(--border-light)'; e.target.style.color = 'var(--text-muted)'; }}
          >
            Compare
          </button>

          <button 
            className="btn-natural" 
            onClick={onReset}
            style={{ padding: '0.5rem 1rem', fontSize: '0.78rem' }}
          >
            New Analysis
          </button>
          
          {user ? (
            <button 
              className="btn-natural" 
              onClick={onProfileClick}
              style={{ padding: '0.5rem 1rem', fontSize: '0.78rem' }}
            >
              Profile
            </button>
          ) : (
            <button 
              className="btn-natural" 
              onClick={onLoginClick}
              style={{ padding: '0.5rem 1rem', fontSize: '0.78rem' }}
            >
              Login
            </button>
          )}
        </div>
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
