import { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  step: 'hero',
  inputData: null,
  recommendations: [],
  diagnostics: null,
  loading: false,
  error: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'START':
      return { ...state, step: 'input', error: null };
    case 'SUBMIT':
      return { ...state, loading: true, error: null, inputData: action.payload || state.inputData };
    case 'SUCCESS':
      return {
        ...state,
        step: 'results',
        recommendations: action.payload,
        diagnostics: action.diagnostics || null,
        loading: false
      };
    case 'ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
