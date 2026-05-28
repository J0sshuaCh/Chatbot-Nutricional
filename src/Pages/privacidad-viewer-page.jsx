// src/pages/privacidad-viewer-page.jsx (NUEVO ARCHIVO)

import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";

const document = {
  slug: "manifiesto-privacidad",
  title: "Manifiesto de Privacidad ANMI",
  pdfPath: "/documentos/manifiesto-privacidad.pdf", // <-- RUTA DE TU PDF DE PRIVACIDAD
  source: "Proyecto ANMI",
  date: "Noviembre 2025 (Prototipo)",
  description: "Este documento detalla cómo la aplicación ANMI maneja los datos, la privacidad de las consultas al chatbot y los términos de uso de la plataforma educativa."
};

export default function PrivacidadViewerPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-50 rounded-b-3xl">
        <div className="max-w-5xl mx-auto flex items-center gap-4 p-4">
          <Link to="/configuracion" className="p-2 hover:bg-gray-200 rounded-full transition">
            <ArrowLeft size={22} />
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            {document.title}
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 mt-6">
        <section className="bg-white p-6 md:p-8 rounded-3xl shadow-lg mb-8">
          <p className="text-gray-700 leading-relaxed">
            {document.description}
          </p>
        
        <div className="text-sm text-gray-500 mt-2 mb-4">
                Fuente: {document.source} | Publicación: {document.date}
                </div>

        </section>
        
        {/* Contenedor del PDF (Object para visualización) */}
        <div className="w-full h-[70vh] bg-gray-100 rounded-xl overflow-hidden shadow-xl mb-6">
          <object 
            data={document.pdfPath} 
            type="application/pdf"
            className="w-full h-full"
            aria-label={`Visualizador de ${document.title}`}
          >
            <p className="p-4 text-center text-gray-700">
              Tu navegador no soporta la visualización de PDFs incrustados. 
              Por favor, usa el botón de descarga o intenta abrirlo en otra pestaña.
            </p>
          </object>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-center flex-wrap gap-4">
          <a
            href={document.pdfPath}
            download={document.slug + ".pdf"}
            className="flex items-center bg-red-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-red-700 hover:text-white transition"
          >
            <Download size={20} className="mr-2" />
            Descargar Documento
          </a>
          <a
            href={document.pdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-gray-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-gray-600 hover:text-white transition"
          >
            <ExternalLink size={20} className="mr-2" />
            Abrir en nueva pestaña
          </a>
        </div>

{/* 🔘 Botón Volver */}
        <div className="flex justify-center mt-8">
            <Link
            to="/configuracion"
            className="inline-block border-2 border-white text-white hover:bg-white hover:text-indigo-700 font-semibold py-2 px-6 rounded-full shadow-md transition-all duration-300"
            >
            ← Volver a Configuración
            </Link>
        </div>  
      </div>
    </div>
  );
}