import React from 'react';

const Verdict = ({ verdictData }) => {
  if (!verdictData) return null;

  const { score, verdict, verdictColor, verdictDescription, factors, recommendations } = verdictData;

  const colorMap = {
    safe: { bg: 'rgba(74, 93, 78, 0.06)', border: 'var(--safe)', text: 'var(--safe)', icon: '✅' },
    warning: { bg: 'rgba(194, 149, 69, 0.06)', border: 'var(--warning)', text: 'var(--warning)', icon: '⚠️' },
    danger: { bg: 'rgba(158, 67, 58, 0.06)', border: 'var(--danger)', text: 'var(--danger)', icon: '🚫' },
  };

  const colors = colorMap[verdictColor] || colorMap.warning;

  const statusDot = (status) => ({
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: status === 'good' ? 'var(--safe)' : status === 'warning' ? 'var(--warning)' : 'var(--danger)',
    flexShrink: 0,
  });

  return (
    <div className="editorial-card" style={{
      background: colors.bg,
      borderLeft: `4px solid ${colors.border}`,
      padding: 'var(--spacing-md)',
      marginBottom: 'var(--spacing-lg)',
    }}>
      {/* Verdict header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <span style={{ fontSize: '1.5rem' }}>{colors.icon}</span>
        <div>
          <div style={{
            fontSize: '0.65rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--text-muted)',
            marginBottom: '2px',
          }}>
            AI VERDICT
          </div>
          <div style={{
            fontSize: '1.6rem',
            fontFamily: 'Instrument Serif, serif',
            fontWeight: '400',
            color: colors.text,
            lineHeight: 1.1,
          }}>
            {verdict}
          </div>
        </div>
        <div style={{
          marginLeft: 'auto',
          background: colors.border,
          color: '#fff',
          borderRadius: '50%',
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1rem',
          fontWeight: '700',
          fontFamily: 'Inter, sans-serif',
          flexShrink: 0,
        }}>
          {score}
        </div>
      </div>

      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '16px' }}>
        {verdictDescription}
      </p>

      {/* Factors */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '8px',
        marginBottom: '16px',
      }}>
        {factors.map((f, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
            background: 'var(--bg-card)',
            padding: '10px 12px',
            borderRadius: '4px',
            border: '1px solid var(--border-light)',
          }}>
            <div style={statusDot(f.status)} />
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: '600', marginBottom: '2px' }}>{f.label}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>{f.detail}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div>
          <div style={{
            fontSize: '0.7rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--text-muted)',
            marginBottom: '8px',
          }}>
            RECOMMENDATIONS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {recommendations.map((rec, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: '8px',
                fontSize: '0.83rem',
                color: 'var(--text-main)',
                lineHeight: '1.5',
                alignItems: 'baseline',
              }}>
                <span style={{ color: colors.text, fontWeight: '700', flexShrink: 0 }}>→</span>
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Verdict;
