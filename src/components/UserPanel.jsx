import React, { useState, useEffect } from 'react';
import { colleges } from '../data/colleges';
import {
  calculateEMI,
  calculateTotalRepayment,
  calculateStressIndex
} from '../logic/financial';

const UserPanel = ({ user, onLogout, setUser }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email, password: '' });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    
    const token = localStorage.getItem('token');
    
    try {
      const res = await fetch('/api/auth/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.msg || 'Update failed');
      
      setMessage('Profile updated successfully');
      setUser(data);
      setFormData({ ...formData, password: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteAnalysis = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`/api/auth/analysis/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const savedAnalyses = await res.json();
        setUser({ ...user, savedAnalyses });
      } else {
        alert('Failed to delete analysis');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting analysis');
    }
  };

  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'analyses', label: 'Saved Analyses', icon: '📊' },
    { id: 'account', label: 'Account', icon: '⚙️' },
  ];

  // Styles
  const styles = {
    wrapper: {
      display: 'flex',
      maxWidth: '1100px',
      margin: '0 auto',
      padding: '0 1.5rem',
      gap: '0',
      minHeight: 'calc(100vh - 200px)',
      animation: 'fadeIn 0.8s ease-out',
    },
    sidebar: {
      width: '260px',
      flexShrink: 0,
      background: 'var(--bg-card)',
      borderRight: '1px solid var(--border-light)',
      padding: '2rem 0',
      display: 'flex',
      flexDirection: 'column',
    },
    sidebarHeader: {
      padding: '0 1.5rem 1.5rem',
      borderBottom: '1px solid var(--border-light)',
      marginBottom: '0.5rem',
    },
    avatar: {
      width: '56px',
      height: '56px',
      borderRadius: '50%',
      background: 'var(--accent-earth)',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.2rem',
      fontWeight: '600',
      fontFamily: 'Inter, sans-serif',
      marginBottom: '12px',
      letterSpacing: '0.02em',
    },
    userName: {
      fontSize: '1.1rem',
      fontWeight: '600',
      color: 'var(--text-main)',
      marginBottom: '2px',
    },
    userEmail: {
      fontSize: '0.8rem',
      color: 'var(--text-muted)',
    },
    navList: {
      listStyle: 'none',
      padding: '0.5rem 0',
      margin: 0,
      flex: 1,
    },
    navItem: (isActive) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '0.75rem 1.5rem',
      cursor: 'pointer',
      fontSize: '0.88rem',
      fontWeight: isActive ? '600' : '400',
      color: isActive ? 'var(--accent-earth)' : 'var(--text-muted)',
      background: isActive ? 'rgba(95, 109, 91, 0.08)' : 'transparent',
      borderLeft: isActive ? '3px solid var(--accent-earth)' : '3px solid transparent',
      transition: 'all 0.25s ease',
      userSelect: 'none',
    }),
    logoutBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '0.75rem 1.5rem',
      cursor: 'pointer',
      fontSize: '0.85rem',
      color: 'var(--danger)',
      background: 'transparent',
      border: 'none',
      borderLeft: '3px solid transparent',
      width: '100%',
      textAlign: 'left',
      fontFamily: 'Inter, sans-serif',
      transition: 'all 0.25s ease',
      marginTop: 'auto',
      borderTop: '1px solid var(--border-light)',
      paddingTop: '1rem',
    },
    content: {
      flex: 1,
      padding: '2rem 2.5rem',
      background: 'var(--bg-natural)',
      overflowY: 'auto',
    },
    pageTitle: {
      fontSize: '1.8rem',
      fontFamily: 'Instrument Serif, serif',
      fontWeight: '400',
      marginBottom: '0.3rem',
      color: 'var(--text-main)',
    },
    pageSubtitle: {
      fontSize: '0.85rem',
      color: 'var(--text-muted)',
      marginBottom: '2rem',
      lineHeight: '1.5',
    },
    fieldGroup: {
      marginBottom: '1.5rem',
    },
    label: {
      display: 'block',
      marginBottom: '6px',
      fontSize: '0.78rem',
      fontWeight: '600',
      color: 'var(--text-muted)',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
    },
    input: {
      width: '100%',
      padding: '10px 14px',
      background: 'var(--bg-card)',
      border: '1px solid var(--border-light)',
      borderRadius: '4px',
      fontSize: '0.95rem',
      color: 'var(--text-main)',
      outline: 'none',
      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      fontFamily: 'Inter, sans-serif',
      boxSizing: 'border-box',
    },
    card: {
      background: 'var(--bg-card)',
      border: '1px solid var(--border-light)',
      borderRadius: '6px',
      padding: '1.5rem',
      marginBottom: '1rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
    },
    badge: (color) => ({
      display: 'inline-block',
      padding: '2px 8px',
      borderRadius: '10px',
      fontSize: '0.7rem',
      fontWeight: '600',
      letterSpacing: '0.03em',
      background: color === 'danger' ? 'rgba(158, 67, 58, 0.1)' : color === 'warning' ? 'rgba(194, 149, 69, 0.12)' : 'rgba(74, 93, 78, 0.1)',
      color: color === 'danger' ? 'var(--danger)' : color === 'warning' ? 'var(--warning)' : 'var(--safe)',
    }),
    alertSuccess: {
      color: 'var(--safe)',
      marginBottom: '1rem',
      padding: '0.7rem 1rem',
      background: 'rgba(74, 93, 78, 0.08)',
      borderRadius: '4px',
      fontSize: '0.88rem',
      borderLeft: '3px solid var(--safe)',
    },
    alertError: {
      color: 'var(--danger)',
      marginBottom: '1rem',
      padding: '0.7rem 1rem',
      background: 'rgba(158, 67, 58, 0.08)',
      borderRadius: '4px',
      fontSize: '0.88rem',
      borderLeft: '3px solid var(--danger)',
    },
    statRow: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '1rem',
      marginBottom: '2rem',
    },
    statCard: {
      background: 'var(--bg-card)',
      border: '1px solid var(--border-light)',
      borderRadius: '6px',
      padding: '1rem 1.2rem',
      textAlign: 'center',
    },
    statValue: {
      fontSize: '1.6rem',
      fontFamily: 'Instrument Serif, serif',
      color: 'var(--text-main)',
      lineHeight: 1.1,
    },
    statLabel: {
      fontSize: '0.7rem',
      fontWeight: '600',
      color: 'var(--text-muted)',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      marginTop: '4px',
    },
    emptyState: {
      textAlign: 'center',
      padding: '3rem 1rem',
      color: 'var(--text-muted)',
    },
    emptyIcon: {
      fontSize: '2.5rem',
      marginBottom: '0.8rem',
      opacity: 0.5,
    },
  };

  const analysisCount = user?.savedAnalyses?.length || 0;

  // ---- RENDER TABS ----

  const renderProfile = () => (
    <div>
      <h2 style={styles.pageTitle}>Profile <span className="text-editorial">Settings</span></h2>
      <p style={styles.pageSubtitle}>Manage your personal information and keep your profile up to date.</p>

      {message && <div style={styles.alertSuccess}>✓ {message}</div>}
      {error && <div style={styles.alertError}>✕ {error}</div>}

      <div style={styles.card}>
        <form onSubmit={handleUpdate}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Full Name</label>
              <input
                type="text"
                name="name"
                style={styles.input}
                value={formData.name}
                onChange={handleChange}
                onFocus={(e) => { e.target.style.borderColor = 'var(--accent-earth)'; e.target.style.boxShadow = '0 0 0 3px rgba(95,109,91,0.1)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--border-light)'; e.target.style.boxShadow = 'none'; }}
                required
              />
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                name="email"
                style={styles.input}
                value={formData.email}
                onChange={handleChange}
                onFocus={(e) => { e.target.style.borderColor = 'var(--accent-earth)'; e.target.style.boxShadow = '0 0 0 3px rgba(95,109,91,0.1)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--border-light)'; e.target.style.boxShadow = 'none'; }}
                required
              />
            </div>
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>New Password</label>
            <input
              type="password"
              name="password"
              style={{ ...styles.input, maxWidth: '360px' }}
              value={formData.password}
              onChange={handleChange}
              placeholder="Leave blank to keep current"
              onFocus={(e) => { e.target.style.borderColor = 'var(--accent-earth)'; e.target.style.boxShadow = '0 0 0 3px rgba(95,109,91,0.1)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'var(--border-light)'; e.target.style.boxShadow = 'none'; }}
            />
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '0.5rem' }}>
            <button type="submit" className="btn-natural" style={{ padding: '0.65rem 1.8rem', fontSize: '0.85rem' }}>
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setFormData({ name: user.name, email: user.email, password: '' })}
              style={{ padding: '0.65rem 1.4rem', fontSize: '0.85rem', background: 'transparent', border: '1px solid var(--border-light)', borderRadius: '2px', cursor: 'pointer', color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderAnalyses = () => (
    <div>
      <h2 style={styles.pageTitle}>Saved <span className="text-editorial">Analyses</span></h2>
      <p style={styles.pageSubtitle}>Review and manage your previously saved financial truth audits.</p>

      {analysisCount > 0 && (
        <div style={styles.statRow}>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{analysisCount}</div>
            <div style={styles.statLabel}>Total Reports</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>
              {formatCurrency(
                user.savedAnalyses.reduce((sum, a) => sum + (a.loanAmount || 0), 0) / analysisCount
              )}
            </div>
            <div style={styles.statLabel}>Avg. Loan Amount</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>
              {(user.savedAnalyses.reduce((sum, a) => sum + (a.tenure || 0), 0) / analysisCount).toFixed(1)} yr
            </div>
            <div style={styles.statLabel}>Avg. Tenure</div>
          </div>
        </div>
      )}

      {analysisCount === 0 ? (
        <div style={{ ...styles.card, ...styles.emptyState }}>
          <div style={styles.emptyIcon}>📂</div>
          <h3 style={{ fontFamily: 'Instrument Serif', fontWeight: '400', fontSize: '1.3rem', marginBottom: '0.5rem' }}>No Analyses Yet</h3>
          <p style={{ fontSize: '0.9rem', maxWidth: '320px', margin: '0 auto' }}>Run a cost analysis from the dashboard and save it to see it appear here.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {user.savedAnalyses.map((analysis) => {
            const college = colleges.find(c => c.id === parseInt(analysis.collegeId));
            const emi = calculateEMI(analysis.loanAmount, analysis.interestRate, analysis.tenure);
            const totalRepayment = calculateTotalRepayment(emi, analysis.tenure);
            const stress = calculateStressIndex(emi, college?.median_salary);
            const stressLevel = stress > 60 ? 'danger' : stress > 30 ? 'warning' : 'safe';
            const stressText = stress > 60 ? 'High Risk' : stress > 30 ? 'Moderate' : 'Healthy';

            return (
              <div key={analysis._id} style={styles.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '600' }}>
                        {college ? college.name : 'Unknown College'}
                      </h4>
                      <span style={styles.badge(stressLevel)}>{stressText}</span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', gap: '1.2rem', flexWrap: 'wrap', lineHeight: '1.8' }}>
                      <span>💰 Loan: <strong style={{ color: 'var(--text-main)' }}>{formatCurrency(analysis.loanAmount)}</strong></span>
                      <span>📅 Tenure: <strong style={{ color: 'var(--text-main)' }}>{analysis.tenure} yrs</strong></span>
                      <span>📈 Rate: <strong style={{ color: 'var(--text-main)' }}>{analysis.interestRate}%</strong></span>
                      <span>🧾 EMI: <strong style={{ color: 'var(--text-main)' }}>{formatCurrency(emi)}</strong></span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Total Repayment: <strong style={{ color: 'var(--accent-earth)' }}>{formatCurrency(totalRepayment)}</strong>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteAnalysis(analysis._id)}
                    style={{
                      background: 'transparent',
                      border: '1px solid var(--border-light)',
                      color: 'var(--text-muted)',
                      padding: '0.4rem 0.9rem',
                      fontSize: '0.78rem',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      transition: 'all 0.2s ease',
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => { e.target.style.borderColor = 'var(--danger)'; e.target.style.color = 'var(--danger)'; }}
                    onMouseLeave={(e) => { e.target.style.borderColor = 'var(--border-light)'; e.target.style.color = 'var(--text-muted)'; }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderAccount = () => (
    <div>
      <h2 style={styles.pageTitle}>Account <span className="text-editorial">Settings</span></h2>
      <p style={styles.pageSubtitle}>Manage your account preferences and security settings.</p>

      <div style={styles.card}>
        <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '1rem' }}>Account Information</h4>
        <div style={{ display: 'grid', gap: '0.8rem', fontSize: '0.88rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid var(--border-light)' }}>
            <span style={{ color: 'var(--text-muted)' }}>Full Name</span>
            <span style={{ fontWeight: '500' }}>{user?.name}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid var(--border-light)' }}>
            <span style={{ color: 'var(--text-muted)' }}>Email</span>
            <span style={{ fontWeight: '500' }}>{user?.email}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid var(--border-light)' }}>
            <span style={{ color: 'var(--text-muted)' }}>Saved Reports</span>
            <span style={{ fontWeight: '500' }}>{analysisCount}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0' }}>
            <span style={{ color: 'var(--text-muted)' }}>Member Since</span>
            <span style={{ fontWeight: '500' }}>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : 'N/A'}</span>
          </div>
        </div>
      </div>

      <div style={{ ...styles.card, borderColor: 'rgba(158, 67, 58, 0.2)' }}>
        <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--danger)', marginBottom: '0.5rem' }}>Danger Zone</h4>
        <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.6' }}>
          Logging out will clear your session. You can log back in anytime with your credentials.
        </p>
        <button
          onClick={onLogout}
          style={{
            padding: '0.55rem 1.5rem',
            fontSize: '0.83rem',
            background: 'transparent',
            border: '1px solid var(--danger)',
            color: 'var(--danger)',
            borderRadius: '3px',
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '500',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => { e.target.style.background = 'var(--danger)'; e.target.style.color = '#fff'; }}
          onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--danger)'; }}
        >
          Log Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="container" style={{ padding: 0 }}>
      <div style={styles.wrapper}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <div style={styles.sidebarHeader}>
            <div style={styles.avatar}>{getInitials(user?.name)}</div>
            <div style={styles.userName}>{user?.name}</div>
            <div style={styles.userEmail}>{user?.email}</div>
          </div>

          <ul style={styles.navList}>
            {tabs.map(tab => (
              <li
                key={tab.id}
                style={styles.navItem(activeTab === tab.id)}
                onClick={() => setActiveTab(tab.id)}
                onMouseEnter={(e) => { if (activeTab !== tab.id) e.currentTarget.style.background = 'rgba(95,109,91,0.04)'; }}
                onMouseLeave={(e) => { if (activeTab !== tab.id) e.currentTarget.style.background = 'transparent'; }}
              >
                <span style={{ fontSize: '1.05rem' }}>{tab.icon}</span>
                <span>{tab.label}</span>
                {tab.id === 'analyses' && analysisCount > 0 && (
                  <span style={{
                    marginLeft: 'auto',
                    background: 'var(--accent-earth)',
                    color: '#fff',
                    fontSize: '0.65rem',
                    fontWeight: '700',
                    padding: '1px 7px',
                    borderRadius: '8px',
                  }}>{analysisCount}</span>
                )}
              </li>
            ))}
          </ul>

          <button
            style={styles.logoutBtn}
            onClick={onLogout}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(158,67,58,0.05)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <span style={{ fontSize: '1.05rem' }}>🚪</span>
            <span>Log Out</span>
          </button>
        </aside>

        {/* Main Content */}
        <main style={styles.content}>
          {activeTab === 'profile' && renderProfile()}
          {activeTab === 'analyses' && renderAnalyses()}
          {activeTab === 'account' && renderAccount()}
        </main>
      </div>
    </div>
  );
};

export default UserPanel;
