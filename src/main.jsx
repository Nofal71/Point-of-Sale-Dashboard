import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { HOC } from './HOC.jsx';

createRoot(document.getElementById('root')).render(
  <>
    <HOC>
      <App />
    </HOC>
  </>
);
