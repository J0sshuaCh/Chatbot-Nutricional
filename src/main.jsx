import { StrictMode } from 'react'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom' 
import { createRoot } from 'react-dom/client'

// 2. Obtenemos el "root"
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// 3. ¡ARREGLO AQUÍ! Llama a root.render()
root.render(
  <StrictMode>
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </StrictMode>
);