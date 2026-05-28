// src/pages/configuracion-page.jsx

import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Aseguramos importar 'Link'

export default function Configuracion() {
  const navigate = useNavigate();

  const [installPrompt, setInstallPrompt] = useState(null);

  // ================================
  // Capturar beforeinstallprompt
  // ================================
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      window._anmiInstallPrompt = e;
      setInstallPrompt(e);
    };

    // Si ya se disparó antes, recuperar
    if (window._anmiInstallPrompt) {
      setInstallPrompt(window._anmiInstallPrompt);
    }

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  // ================================
  // Forzar instalación si es posible
  // ================================
  const handleInstall = async () => {
    // 1. Si tenemos el evento real de instalación
    if (installPrompt) {
      installPrompt.prompt();
      await installPrompt.userChoice;
      window._anmiInstallPrompt = null;
      setInstallPrompt(null);
      return;
    }

    // 2. Si ya está instalada (standalone)
    if (window.matchMedia("(display-mode: standalone)").matches) {
      alert("La aplicación ya está instalada en tu dispositivo.");
      return;
    }

    // 3. Intento extra para algunos Android
    if (navigator.standalone) {
      alert("La aplicación ya está instalada.");
      return;
    }

    // 4. Si no se puede instalar
    alert(
      "Tu dispositivo no permite solicitar la instalación automáticamente. " +
      "Puedes instalarla manualmente desde el menú del navegador (⋮ > Instalar aplicación)."
    );
  };

  // ====================
  // Limpiar caché (Versión mejorada)
  // ====================
  const handleClearCache = async () => {
    try {
      const names = await caches.keys(); 
      const deletionPromises = names.map(name => caches.delete(name));
      await Promise.all(deletionPromises); 

      alert("La caché ha sido eliminada completamente.");
    } catch (error) {
      console.error("Error al eliminar la caché:", error);
      alert("Error: No se pudo eliminar la caché.");
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            ⚙️ Configuración
          </h1>
          <p className="text-gray-600 text-lg">Ajustes de tu aplicación ANMI</p>
          <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
            <p className="text-sm text-gray-700">
              ⚠️ <strong>Importante:</strong> Configura opciones del sistema o instala
              la app en tu dispositivo.
            </p>
          </div>
        </div>
      </div>

      {/* Opciones */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Instalar App (siempre disponible) */}
        <div
          onClick={handleInstall}
          className="bg-white rounded-2xl shadow-lg overflow-hidden p-6 cursor-pointer
                     transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            📲 Instalar App
          </h2>
          <p className="text-gray-600">
            Añade ANMI a tu dispositivo para acceso rápido y sin navegador.
          </p>
        </div>

        {/* Eliminar caché */}
        <div
          onClick={handleClearCache}
          className="bg-white rounded-2xl shadow-lg overflow-hidden p-6 cursor-pointer 
                     transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            🗑️ Eliminar caché
          </h2>
          <p className="text-gray-600">
            Borra datos guardados y fuerza una actualización completa.
          </p>
        </div>

        {/* Privacidad */}
        <div
          onClick={() => navigate("/privacidad-viewer")}
          className="bg-white rounded-2xl shadow-lg overflow-hidden p-6 cursor-pointer
                     transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            🔐 Manifesto de Privacidad
          </h2>
          <p className="text-gray-600">
            Aprende cómo protegemos tus datos y cómo funciona la información.
          </p>
        </div>

      </div>

      {/* 🔘 Botón Volver */} {/* <--- CÓDIGO AÑADIDO AQUÍ */}
      <div className="flex justify-center mt-8">
        <Link
          to="/"
          className="inline-block border-2 border-white text-white hover:bg-white hover:text-indigo-700 font-semibold py-2 px-6 rounded-full shadow-md transition-all duration-300"
        >
          Volver al Menú Principal
        </Link>
      </div> 

    </div>
  );
}