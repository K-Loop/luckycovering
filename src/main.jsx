import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Restore direct deep-link routes (e.g. /wishlist, /cart, /admin) on static hosts
try {
  const spaRedirect = sessionStorage.getItem('lc_spa_redirect');
  if (spaRedirect) {
    sessionStorage.removeItem('lc_spa_redirect');
    window.history.replaceState(null, '', spaRedirect);
  }
} catch {
  // ignore
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
