import React from 'react';

/**
 * SVG Donut Chart — Interest vs Principal breakdown
 */
export const DonutChart = ({ principal, interest, size = 180 }) => {
  const total = principal + interest;
  const principalPercent = (principal / total) * 100;
  const interestPercent = (interest / total) * 100;
  const radius = 65;
  const circumference = 2 * Math.PI * radius;
  const principalDash = (principalPercent / 100) * circumference;
  const interestDash = (interestPercent / 100) * circumference;

  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="editorial-card" style={{ padding: 'var(--spacing-md)' }}>
      <h4 style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        PAYMENT BREAKDOWN
      </h4>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <svg width={size} height={size} viewBox="0 0 200 200" style={{ transform: 'rotate(-90deg)' }}>
          {/* Background circle */}
          <circle cx="100" cy="100" r={radius} fill="none" stroke="var(--border-light)" strokeWidth="28" />
          {/* Principal segment */}
          <circle
            cx="100" cy="100" r={radius}
            fill="none"
            stroke="var(--accent-earth)"
            strokeWidth="28"
            strokeDasharray={`${principalDash} ${circumference}`}
            strokeDashoffset="0"
            style={{ transition: 'stroke-dasharray 1s ease' }}
          />
          {/* Interest segment */}
          <circle
            cx="100" cy="100" r={radius}
            fill="none"
            stroke="var(--warning)"
            strokeWidth="28"
            strokeDasharray={`${interestDash} ${circumference}`}
            strokeDashoffset={`-${principalDash}`}
            style={{ transition: 'stroke-dasharray 1s ease' }}
          />
          {/* Center text */}
          <text x="100" y="95" textAnchor="middle" fill="var(--text-main)" fontSize="22" fontWeight="700" fontFamily="Inter" style={{ transform: 'rotate(90deg)', transformOrigin: '100px 100px' }}>
            {interestPercent.toFixed(0)}%
          </text>
          <text x="100" y="115" textAnchor="middle" fill="var(--text-muted)" fontSize="10" fontFamily="Inter" style={{ transform: 'rotate(90deg)', transformOrigin: '100px 100px' }}>
            is interest
          </text>
        </svg>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: 'var(--accent-earth)', flexShrink: 0 }} />
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>PRINCIPAL</div>
              <div style={{ fontWeight: '600' }}>{formatCurrency(principal)}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: 'var(--warning)', flexShrink: 0 }} />
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>INTEREST</div>
              <div style={{ fontWeight: '600' }}>{formatCurrency(interest)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * SVG Bar Chart — Year-by-year amortization
 */
export const AmortizationBarChart = ({ schedule }) => {
  if (!schedule || schedule.length === 0) return null;

  const maxPayment = Math.max(...schedule.map(s => s.annualPayment));
  const barHeight = 22;
  const gap = 6;
  const chartHeight = schedule.length * (barHeight + gap);
  const labelWidth = 55;
  const chartWidth = 300;

  return (
    <div className="editorial-card" style={{ padding: 'var(--spacing-md)', overflowX: 'auto' }}>
      <h4 style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        YEAR-BY-YEAR AMORTIZATION
      </h4>
      <div style={{ display: 'flex', gap: '10px', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '10px', height: '10px', background: 'var(--accent-earth)', borderRadius: '2px', display: 'inline-block' }} /> Principal
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '10px', height: '10px', background: 'var(--warning)', borderRadius: '2px', display: 'inline-block' }} /> Interest
        </span>
      </div>
      <svg width="100%" viewBox={`0 0 ${labelWidth + chartWidth + 10} ${chartHeight + 10}`} style={{ maxWidth: '500px' }}>
        {schedule.map((item, i) => {
          const y = i * (barHeight + gap);
          const principalWidth = (item.principalPaid / maxPayment) * chartWidth;
          const interestWidth = (item.interestPaid / maxPayment) * chartWidth;

          return (
            <g key={i}>
              <text x="0" y={y + barHeight / 2 + 4} fontSize="10" fill="var(--text-muted)" fontFamily="Inter">
                Yr {item.year}
              </text>
              <rect x={labelWidth} y={y} width={principalWidth} height={barHeight} fill="var(--accent-earth)" rx="2">
                <animate attributeName="width" from="0" to={principalWidth} dur="0.6s" fill="freeze" begin={`${i * 0.05}s`} />
              </rect>
              <rect x={labelWidth + principalWidth} y={y} width={interestWidth} height={barHeight} fill="var(--warning)" rx="2" opacity="0.8">
                <animate attributeName="width" from="0" to={interestWidth} dur="0.6s" fill="freeze" begin={`${i * 0.05}s`} />
              </rect>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/**
 * SVG Semicircle Gauge — Stress Index visualization
 */
export const StressGauge = ({ value, maxValue = 100 }) => {
  const percent = Math.min(Math.max(value / maxValue, 0), 1);
  const radius = 70;
  const circumference = Math.PI * radius; // semicircle
  const filledDash = percent * circumference;

  const getColor = (v) => {
    if (v < 30) return 'var(--safe)';
    if (v < 60) return 'var(--warning)';
    return 'var(--danger)';
  };

  const getLabel = (v) => {
    if (v < 30) return 'Healthy';
    if (v < 60) return 'Moderate';
    return 'High Risk';
  };

  return (
    <div className="editorial-card" style={{ padding: 'var(--spacing-md)', textAlign: 'center' }}>
      <h4 style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        FINANCIAL STRESS INDEX
      </h4>
      <svg width="200" height="120" viewBox="0 0 200 120">
        {/* Background arc */}
        <path
          d="M 20 100 A 70 70 0 0 1 180 100"
          fill="none"
          stroke="var(--border-light)"
          strokeWidth="16"
          strokeLinecap="round"
        />
        {/* Filled arc */}
        <path
          d="M 20 100 A 70 70 0 0 1 180 100"
          fill="none"
          stroke={getColor(value)}
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={`${filledDash} ${circumference}`}
          style={{ transition: 'stroke-dasharray 1.2s ease, stroke 0.5s ease' }}
        />
        {/* Value text */}
        <text x="100" y="88" textAnchor="middle" fontSize="32" fontWeight="700" fontFamily="'Instrument Serif', serif" fill={getColor(value)}>
          {Math.round(value)}
        </text>
        <text x="100" y="106" textAnchor="middle" fontSize="11" fill="var(--text-muted)" fontFamily="Inter">
          {getLabel(value)}
        </text>
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', padding: '0 10px', marginTop: '-4px' }}>
        <span>0</span>
        <span>50</span>
        <span>100</span>
      </div>
    </div>
  );
};

export default { DonutChart, AmortizationBarChart, StressGauge };
