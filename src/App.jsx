import React, { useState, useEffect } from 'react'
import Hero from './components/Hero'
import InputFlow from './components/InputFlow'
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import UserPanel from './components/UserPanel'
import CompareColleges from './components/CompareColleges'
import Privacy from './components/Privacy'
import Terms from './components/Terms'
import Methodology from './components/Methodology'

function ErrorFallback({ error }) {
  return (
    <div className="container" style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
      <h2 style={{ color: 'var(--danger)' }}>Something went wrong.</h2>
      <p style={{ color: 'var(--text-muted)' }}>{error.message}</p>
      <button className="btn-natural" onClick={() => window.location.reload()}>Reload Platform</button>
    </div>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) return <ErrorFallback error={this.state.error} />;
    return this.props.children;
  }
}

function App() {
  const [view, setView] = useState('landing');
  const [analysisData, setAnalysisData] = useState(null);
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('truecost-theme') || 'light');

  // Apply theme on mount and change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('truecost-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  // Parse URL params for shared analysis links
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('la') && params.has('c')) {
      const sharedData = {
        loanAmount: parseFloat(params.get('la')) || 1500000,
        interestRate: parseFloat(params.get('ir')) || 10.5,
        tenure: parseFloat(params.get('t')) || 10,
        collegeId: params.get('c') || '1',
        inflationRate: parseFloat(params.get('inf')) || 6,
        marketReturn: parseFloat(params.get('mr')) || 12,
      };
      setAnalysisData(sharedData);
      setView('dashboard');
      // Clean the URL without reload
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  // Check logged in user
  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await fetch('/api/auth/me', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            setUser(data);
          } else {
            localStorage.removeItem('token');
          }
        } catch (err) {
          console.error(err);
        }
      }
    };
    checkUser();
  }, []);

  const handleStartAnalysis = (data) => {
    setAnalysisData(data);
    setView('dashboard');
  };

  const resetToLanding = () => {
    setView('landing');
    setAnalysisData(null);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setView('profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setView('landing');
  };

  return (
    <ErrorBoundary>
      <div className="app-shell" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar 
          onReset={resetToLanding} 
          user={user} 
          onLoginClick={() => setView('login')} 
          onProfileClick={() => setView('profile')}
          onCompareClick={() => setView('compare')}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
        
        <main style={{ flex: 1, padding: 'var(--spacing-lg) 0' }}>
          {view === 'landing' && (
            <Hero onStart={() => setView('input')} onCompare={() => setView('compare')} />
          )}

          {view === 'input' && (
            <div className="container">
              <InputFlow onAnalyze={handleStartAnalysis} />
            </div>
          )}

          {view === 'dashboard' && analysisData && (
            <Dashboard data={analysisData} onBack={resetToLanding} user={user} />
          )}

          {view === 'compare' && (
            <CompareColleges onBack={resetToLanding} />
          )}

          {view === 'login' && (
            <Login 
              onLoginSuccess={handleLoginSuccess} 
              switchToRegister={() => setView('register')} 
            />
          )}

          {view === 'register' && (
            <Register 
              onRegisterSuccess={handleLoginSuccess} 
              switchToLogin={() => setView('login')} 
            />
          )}

          {view === 'profile' && user && (
            <UserPanel 
              user={user} 
              setUser={setUser} 
              onLogout={handleLogout}
              onLoadAnalysis={(analysisData) => {
                setAnalysisData(analysisData);
                setView('dashboard');
              }}
            />
          )}

          {view === 'privacy' && <Privacy onBack={resetToLanding} />}
          {view === 'terms' && <Terms onBack={resetToLanding} />}
          {view === 'methodology' && <Methodology onBack={resetToLanding} />}
        </main>

        <Footer onNavigate={setView} />
      </div>
    </ErrorBoundary>
  )
}

export default App
