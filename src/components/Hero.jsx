import React from 'react';

const Hero = ({ onStart }) => {
  return (
    <div className="hero-container" style={{ 
      textAlign: 'center', 
      padding: 'var(--spacing-xl) var(--spacing-md)',
      maxWidth: '1000px',
      margin: '0 auto',
      animation: 'fadeIn 1.2s ease-out'
    }}>
      <header style={{ marginBottom: 'var(--spacing-lg)' }}>
        <p style={{ 
          fontSize: '0.85rem', 
          letterSpacing: '0.2em', 
          textTransform: 'uppercase', 
          color: 'var(--accent-muted)',
          marginBottom: 'var(--spacing-md)'
        }}>
          A Radical Decision Engine
        </p>
        
        <h1 style={{ 
          fontSize: 'clamp(3rem, 8vw, 6rem)', 
          lineHeight: '0.9',
          marginBottom: 'var(--spacing-md)'
        }}>
          Decision logic for the <span className="text-editorial">truth seekers.</span>
        </h1>
        
        <p style={{ 
          fontSize: '1.25rem', 
          maxWidth: '600px', 
          margin: '0 auto',
          color: 'var(--text-muted)',
          lineHeight: '1.6'
        }}>
          Education loans are not just EMIs. They are life trajectories mapped in debt. 
          We reveal the unvarnished cost of your degree.
        </p>
      </header>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: 'var(--spacing-xl)' }}>
        <button className="btn-natural" onClick={onStart}>
          Begin Analysis
        </button>
      </div>

      <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: 'var(--spacing-md)' }}>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
          "The most honest thing a financial product has ever shown a student." — Pre-Seed Beta Review
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Hero;
