import React from "react";
import { Routes, Route } from 'react-router-dom'
import Header from "./components/header";
import MenuGrid from "./components/menu-grid";
import Footer from "./components/footer";
import ChatbotPage from "./pages/chatbot-page";
import InformacionNutricional from "./pages/informacion-nutricional-page";

import './App.css'

function App() {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<MenuGrid />} /> 
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/informacion-nutricional" element={<InformacionNutricional />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;