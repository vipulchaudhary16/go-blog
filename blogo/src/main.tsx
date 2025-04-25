import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { UserProvider } from './contexts/UserContext.tsx';
import { HeaderProvider } from './contexts/HeaderContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <HeaderProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </HeaderProvider>
    </BrowserRouter>
  </StrictMode>
);
