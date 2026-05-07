import React, { useState } from 'react';

const Login = ({ onLoginSuccess, switchToRegister }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      // Save token to localStorage
      localStorage.setItem('token', data.token);
      onLoginSuccess(data.user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 style={{ marginBottom: '0.5rem', fontFamily: 'Instrument Serif', fontSize: '2.2rem', textAlign: 'center' }}>Welcome Back</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>Enter your details to access your account.</p>
        
        {error && <div style={{ color: 'var(--danger)', marginBottom: '1.5rem', padding: '0.8rem', background: 'rgba(158, 67, 58, 0.1)', borderRadius: '4px', fontSize: '0.85rem', textAlign: 'center', borderLeft: '3px solid var(--danger)' }}>{error}</div>}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email Address</label>
            <input 
              type="email" 
              name="email" 
              placeholder="you@example.com" 
              className="input-field" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="••••••••" 
              className="input-field" 
              value={formData.password} 
              onChange={handleChange} 
              required 
            />
          </div>
          <button type="submit" className="btn-natural" style={{ marginTop: '0.5rem', width: '100%', padding: '1rem', fontSize: '0.95rem' }}>Log In</button>
        </form>
        
        <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Don't have an account? <span onClick={switchToRegister} style={{ color: 'var(--text-main)', borderBottom: '1px solid var(--text-main)', cursor: 'pointer', fontWeight: '500', transition: 'all 0.2s ease', paddingBottom: '2px' }}>Register here</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
