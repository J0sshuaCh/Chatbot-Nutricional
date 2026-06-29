// src/App.jsx

import React from "react";
import { Routes, Route, Outlet } from 'react-router-dom'
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
import './App.css'
import { Login } from "./Pages/Login";
import { PublicRoute } from "./context/auth/PublicRoute";
import { ProtectedRoute } from "./context/auth/ProtectedRoute";
import { BabyManagerPage } from "./Pages/BabyManagerPage";
import { Layout } from "./components/template/Layout";
import { BabiesPage } from "./Pages/BabiesPage";
import { MedicalHistoryPage } from "./Pages/MedicalHistoryPage";
import { AllergiesPage } from "./Pages/AllergiesPage";
import { RecipesPage } from "./Pages/RecipesPage";


// 1. Creamos el Layout para la App Principal (con Header y Footer)
function AppLayout() {
  return (
    <div className=" px-4 sm:px-6 lg:px-8 min-h-screen w-full flex flex-col overflow-x-hidden bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)]">
      <Header />
      {/* Outlet renderizará la página hija correspondiente */}
      <Outlet />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* RUTA PADRE: Envuelve a todas las páginas que usan Header y Footer */}

      <Route element={<PublicRoute redirectTo="/manager-baby" />}>
        <Route element={<AppLayout />}>
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
        </Route>

        {/* RUTA INDEPENDIENTE: El Login está afuera, por lo que cargará limpio y solo */}
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<ProtectedRoute redirectTo="/" />}>
        <Route element={<Layout />}>

          <Route path="/manager-baby" element={<BabyManagerPage />} />
          <Route path="/babies" element={<BabiesPage />} />
          <Route path="/medical-history" element={<MedicalHistoryPage />} />
          <Route path="/allergies" element={<AllergiesPage />} />
          <Route path="/recipes" element={<RecipesPage />} />
        </Route>
      </Route>


    </Routes>
  );
}

export default App;