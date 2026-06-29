import { StrictMode } from 'react'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/auth/AuthProvider.jsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './queryClient.js'

// 2. Obtenemos el "root"
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// 3. ¡ARREGLO AQUÍ! Llama a root.render()
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider >
          <App />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);