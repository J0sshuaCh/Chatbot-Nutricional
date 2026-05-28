// src/App.jsx

import React from "react";
import { Routes, Route } from 'react-router-dom'
import Header from "./components/header";
import MenuGrid from "./components/menu-grid";
import Footer from "./components/footer";
import ChatbotPage from "./Pages/chatbot-page";
import InformacionNutricional from "./Pages/informacion-nutricional-page";
import Configuracion from "./pages/configuracion-page";
import ServiciosDelEstado from "./pages/servicios-estado-page";
import QaliWarmaPage from "./pages/qali-warma-page";
import PlanAnemiaPage from "./pages/plan-anemia-page";
import CunaMasPage from "./pages/cuna-mas-page";
import GuiaPlatillosPage from "./pages/guia-platillos-page";
import BibliotecaPage from "./pages/biblioteca-page";
import DocumentViewerPage from "./pages/document-viewer-page";
import PrivacidadViewerPage from "./pages/privacidad-viewer-page";
import './App.css'


function App() {
  return (

    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<MenuGrid />} /> 
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/informacion-nutricional" element={<InformacionNutricional />} />
        <Route path="/servicios-estado" element={<ServiciosDelEstado />} />
        <Route path="/configuracion" element={<Configuracion />} />
        <Route path="/servicios-estado/qali-warma" element={<QaliWarmaPage />} />
        <Route path="/servicios-estado/plan-anemia" element={<PlanAnemiaPage />} />
        <Route path="/servicios-estado/cuna-mas" element={<CunaMasPage />} />
        <Route path="/guia-platillos" element={<GuiaPlatillosPage />} />
        <Route path="/biblioteca" element={<BibliotecaPage />} />
        <Route path="/biblioteca/:slug" element={<DocumentViewerPage />} /> 
        <Route path="/privacidad-viewer" element={<PrivacidadViewerPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
