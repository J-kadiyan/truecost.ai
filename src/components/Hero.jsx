import React from 'react';

const Hero = ({ onStart, onCompare }) => {
  return (
    <div className="hero-container container" style={{ 
      textAlign: 'center', 
      padding: 'var(--spacing-xl) 1.5rem',
      maxWidth: '1000px',
      margin: '0 auto',
      animation: 'fadeIn 1.2s ease-out'
    }}>
      <header style={{ marginBottom: 'var(--spacing-lg)' }}>
        <p style={{ 
          fontSize: '0.75rem', 
          letterSpacing: '0.15em', 
          textTransform: 'uppercase', 
          color: 'var(--accent-muted)',
          marginBottom: 'var(--spacing-md)'
        }}>
          A Radical Decision Engine
        </p>
        
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 10vw, 5.5rem)', 
          lineHeight: '1.0',
          marginBottom: 'var(--spacing-md)'
        }}>
          Decision logic for the <span className="text-editorial">truth seekers.</span>
        </h1>
        
        <p style={{ 
          fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', 
          maxWidth: '600px', 
          margin: '0 auto',
          color: 'var(--text-muted)',
          lineHeight: '1.6'
        }}>
          Education loans are not just EMIs. They are life trajectories mapped in debt. 
          We reveal the unvarnished cost of your degree.
        </p>
      </header>
      
      <div className="hero-actions" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '12px', 
        marginBottom: 'var(--spacing-xl)',
        flexWrap: 'wrap'
      }}>
        <button className="btn-natural" onClick={onStart} style={{ width: 'min(100%, 220px)' }}>
          Begin Analysis
        </button>
        <button 
          onClick={onCompare}
          style={{ 
            width: 'min(100%, 220px)',
            padding: '1rem 2rem',
            background: 'transparent',
            border: '1px solid var(--border-light)',
            borderRadius: '2px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '500',
            color: 'var(--text-muted)',
            transition: 'var(--transition-organic)',
          }}
          onMouseEnter={e => { e.target.style.borderColor = 'var(--accent-earth)'; e.target.style.color = 'var(--accent-earth)'; }}
          onMouseLeave={e => { e.target.style.borderColor = 'var(--border-light)'; e.target.style.color = 'var(--text-muted)'; }}
        >
          Compare Colleges
        </button>
      </div>

      <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: 'var(--spacing-md)' }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic', maxWidth: '400px', margin: '0 auto' }}>
          "The most honest thing a financial product has ever shown a student."
        </p>
      </div>
    </div>
  );
};

export default Hero;
