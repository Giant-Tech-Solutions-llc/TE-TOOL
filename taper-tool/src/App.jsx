import { AppProvider, useApp } from './context/AppContext';
import ThemeToggle from './components/ThemeToggle';
import ApiKeyButton, { ApiKeyBanner } from './components/ApiKeySetup';
import Hero from './pages/Hero';
import ToolInterface from './pages/ToolInterface';
import Results from './pages/Results';
import { getRecommendations } from './utils/api';

function AppContent() {
  const { state, dispatch } = useApp();

  const handleStart = () => dispatch({ type: 'START' });

  const handleSubmit = async (inputData) => {
    dispatch({ type: 'SUBMIT', payload: inputData });
    try {
      const result = await getRecommendations(inputData);
      if (result.validationError) {
        dispatch({
          type: 'VALIDATION_ERROR',
          payload: result.validationError.message
        });
        return;
      }
      dispatch({
        type: 'SUCCESS',
        payload: result.recommendations,
        diagnostics: result.diagnostics
      });
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error && error.message ? error.message : 'Something went wrong.' });
    }
  };

  const handleReset = () => dispatch({ type: 'RESET' });

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <ApiKeyBanner />
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 'var(--space-4) var(--space-6)',
        maxWidth: '1280px',
        margin: '0 auto'
      }}>
        <button
          type="button"
          onClick={handleReset}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-primary)',
            fontSize: 'var(--text-base)',
            fontWeight: 'var(--font-bold)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            cursor: 'pointer'
          }}
        >
          Taper Empire
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <ApiKeyButton />
          <ThemeToggle />
        </div>
      </header>

      <main>
        {state.step === 'hero' && <Hero onStart={handleStart} />}
        {state.step === 'input' && (
          <ToolInterface
            onSubmit={handleSubmit}
            loading={state.loading}
            error={state.error}
          />
        )}
        {state.step === 'results' && (
          <Results
            recommendations={state.recommendations}
            diagnostics={state.diagnostics}
            onReset={handleReset}
          />
        )}
      </main>

      {state.error && (
        <div
          role="alert"
          style={{
            position: 'fixed',
            bottom: 'var(--space-6)',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: 'var(--space-3) var(--space-6)',
            background: 'var(--error)',
            color: '#fff',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            fontSize: 'var(--text-sm)'
          }}
        >
          {state.error}
        </div>
      )}

      <footer style={{
        textAlign: 'center',
        padding: 'var(--space-8) var(--space-4)',
        color: 'var(--text-tertiary)',
        fontSize: 'var(--text-xs)'
      }}>
        © {new Date().getFullYear()} Taper Empire. All rights reserved.
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
