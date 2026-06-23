import React from "react";
import { Routes, Route } from 'react-router-dom'
import Header from "./components/header";
import MenuGrid from "./components/menu-grid";
import Footer from "./components/footer";
import ChatbotPage from "./Pages/chatbot-page";
import InformacionNutricional from "./Pages/informacion-nutricional-page";
import Configuracion from "./Pages/configuracion-page";
import ServiciosDelEstado from "./Pages/servicios-estado-page";
import QaliWarmaPage from "./Pages/qali-warma-page";
import PlanAnemiaPage from "./Pages/plan-anemia-page";
import CunaMasPage from "./Pages/cuna-mas-page";
import GuiaPlatillosPage from "./Pages/guia-platillos-page";
import BibliotecaPage from "./Pages/biblioteca-page";
import DocumentViewerPage from "./Pages/document-viewer-page";
import PrivacidadViewerPage from "./Pages/privacidad-viewer-page";
import LoginPage from "./Pages/login-page";
import RegisterPage from "./Pages/register-page";
import MiPerfilPage from "./Pages/mi-perfil-page";
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/mi-perfil" element={<MiPerfilPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
