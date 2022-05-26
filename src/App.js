import { useEffect } from 'react';
import './App.css';
import { keepTheme } from './helpers/theme';

// Components
import Dashboard from './components/Dashboard';

function App() {

  useEffect(() => {
      keepTheme();
  })

  return (
    <Dashboard />
  );
}

export default App;
