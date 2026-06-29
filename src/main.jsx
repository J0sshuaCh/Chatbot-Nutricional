import { StrictMode } from 'react'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
<<<<<<< HEAD
import { AuthProvider } from './context/auth/AuthProvider.jsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './queryClient.js'
=======
import { AuthProvider } from './lib/AuthContext'
>>>>>>> 8386b878b1dd62165feb50b47f962ba77c0c109b

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
<<<<<<< HEAD
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider >
          <App />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
=======
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
>>>>>>> 8386b878b1dd62165feb50b47f962ba77c0c109b
  </StrictMode>
);