import React, { useState } from 'react'
import Hero from './components/Hero'
import InputFlow from './components/InputFlow'
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

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
  const [view, setView] = useState('landing'); // landing, input, dashboard
  const [analysisData, setAnalysisData] = useState(null);

  const handleStartAnalysis = (data) => {
    setAnalysisData(data);
    setView('dashboard');
  };

  const resetToLanding = () => {
    setView('landing');
    setAnalysisData(null);
  };

  return (
    <ErrorBoundary>
      <div className="app-shell" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar onReset={resetToLanding} />
        
        <main style={{ flex: 1, padding: 'var(--spacing-lg) 0' }}>
          {view === 'landing' && (
            <Hero onStart={() => setView('input')} />
          )}

          {view === 'input' && (
            <div className="container">
              <InputFlow onAnalyze={handleStartAnalysis} />
            </div>
          )}

          {view === 'dashboard' && analysisData && (
            <Dashboard data={analysisData} onBack={resetToLanding} />
          )}
        </main>

        <Footer />
      </div>
    </ErrorBoundary>
  )
}

export default App
