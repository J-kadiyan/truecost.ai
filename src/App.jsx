import React, { useState } from 'react'
import Hero from './components/Hero'
import InputFlow from './components/InputFlow'
import Dashboard from './components/Dashboard'

function App() {
  const [view, setView] = useState('landing'); // landing, input, dashboard
  const [analysisData, setAnalysisData] = useState(null);

  const handleStartAnalysis = (data) => {
    setAnalysisData(data);
    setView('dashboard');
  };

  return (
    <div className="min-h-screen">
      {view === 'landing' && (
        <Hero onStart={() => setView('input')} />
      )}

      {view === 'input' && (
        <main style={{ padding: 'var(--spacing-xl) var(--spacing-lg)', maxWidth: '1200px', margin: '0 auto' }}>
          <InputFlow onAnalyze={handleStartAnalysis} />
        </main>
      )}

      {view === 'dashboard' && analysisData && (
        <main style={{ padding: 'var(--spacing-xl) var(--spacing-lg)', maxWidth: '1200px', margin: '0 auto' }}>
          <Dashboard data={analysisData} onBack={() => setView('landing')} />
        </main>
      )}

      <footer style={{ textAlign: 'center', padding: 'var(--spacing-xl)', color: 'var(--text-secondary)', opacity: 0.6 }}>
        &copy; 2026 TrueCost AI — Radical Transparency for Education.
      </footer>
    </div>
  )
}

export default App
