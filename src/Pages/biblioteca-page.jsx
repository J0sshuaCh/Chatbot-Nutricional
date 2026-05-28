// src/pages/biblioteca-page.jsx

import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// --- Base de Datos Centralizada de Documentos ---
// Nota: La ruta del PDF ahora usa el nombre de archivo exacto con espacios y caracteres.
const documents = [
  {
    slug: "recetario-nutritivo-2014",
    title: "Recetario Nutritivo para Niñas y Niños de 6 a 23 Meses (2014)",
    pdfPath: "/documentos/Recetario Nutritivo para Niñas y Niños de 6 a 23 Meses (2014).pdf",
    description: "Recetario con 30 recetas (purés, mazamorras, segundos) ricas en hierro, clasificadas por edad (6 a 8, 9 a 11 y 12 a 23 meses), del Instituto Nacional de Salud (INS), para la alimentación complementaria y la prevención de la anemia.",
    source: "INS/CENAN",
    date: "2014",
    previewImg: "/previews/1.png",
  },
  {
    slug: "guias-alimentarias-2021",
    title: "Guías Alimentarias para Niñas y Niños Menores de 2 Años de Edad (2021)",
    pdfPath: "/documentos/Guías Alimentarias para Niñas y Niños Menores de 2 Años de Edad (2021).pdf",
    description: "Documento que establece principios y 13 recomendaciones clave para una alimentación saludable en niños de 0 a 23 meses, enfatizando la lactancia materna exclusiva, la alimentación complementaria oportuna y la suplementación con hierro.",
    source: "MINSA/INS",
    date: "2021",
    previewImg: "/previews/2.png",
  },
  {
    slug: "norma-tecnica-anemia-2024",
    title: "Norma Técnica de Salud: Prevención y Control de la Anemia por Deficiencia de Hierro (2024)",
    pdfPath: "/documentos/Norma Técnica de Salud Prevención y Control de la Anemia por Deficiencia de Hierro (2024).pdf",
    description: "Norma técnica que establece las disposiciones para la prevención, diagnóstico, tratamiento y control de la anemia por deficiencia de hierro en niños, adolescentes, mujeres en edad fértil, gestantes y puérperas.",
    source: "MINSA",
    date: "2024",
    previewImg: "/previews/3.png",
  },
  {
    slug: "guias-poblacion-2019",
    title: "Guías Alimentarias para la Población Peruana (2019)",
    pdfPath: "/documentos/Guías Alimentarias para la Población Peruana (2019).pdf",
    description: "Guías que ofrecen 12 mensajes clave para fomentar hábitos de alimentación y estilos de vida saludables en la población peruana mayor de dos años, promoviendo alimentos naturales y reduciendo el consumo de ultra-procesados.",
    source: "INS/CENAN",
    date: "2019",
    previewImg: "/previews/4.png",
  },
  {
    slug: "norma-tecnica-anemia-2017",
    title: "Norma Técnica - Manejo Terapéutico y Preventivo de la Anemia (2017)",
    pdfPath: "/documentos/Norma Técnica - Manejo Terapéutico y Preventivo de la Anemia (2017).pdf",
    description: "Versión anterior de la norma técnica (aprobada en 2017 y modificada), que cubre el manejo terapéutico y preventivo de la anemia en niños, adolescentes, mujeres gestantes y puérperas.",
    source: "MINSA",
    date: "2017",
    previewImg: "/previews/5.png",
  },
  {
    slug: "rotafolio-suplementacion-hierro",
    title: "Rotafolio: Suplementación con Hierro (Adolescentes)",
    pdfPath: "/documentos/Rotafolio: Suplementación con Hierro (Adolescentes).pdf",
    description: "Material educativo (rotafolio) diseñado para adolescentes mujeres, explicando la importancia del hierro, cómo diagnosticar la anemia y los esquemas de suplementación (prevención y tratamiento) con Sulfato Ferroso.",
    source: "MINSA/INS",
    date: "N/A",
    previewImg: "/previews/6.png",
  },
  {
    slug: "recetario-reyes-hierro",
    title: "Recetario: Los Reyes del Hierro (Sangrecita y Bazo)",
    pdfPath: "/documentos/Recetario: Los Reyes del Hierro (Sangrecita y Bazo).pdf",
    description: "Recetario enfocado en la lucha contra la anemia, promoviendo el consumo de 'La Reina del Hierro: Sangrecita' y 'El Rey del Hierro: Bazo' a través de recetas dulces y saladas como Mousse de Sangrecita y Torrejita de Bazo.",
    source: "INS/CENAN",
    date: "N/A",
    previewImg: "/previews/7.png",
  },
  {
    slug: "recetario-quinua-2012",
    title: "Recetario de la Quinua (2012)",
    pdfPath: "/documentos/Recetario de la Quinua (2012).pdf",
    description: "Recetario con 30 preparaciones (entradas y platos de fondo) a base de quinua, destacando su alto valor nutritivo por su aporte de proteínas, aminoácidos y minerales. Las recetas están formuladas para 4 raciones.",
    source: "INS/CENAN",
    date: "2012",
    previewImg: "/previews/8.png",
  },
  {
    slug: "recetario-almuerzos-lima-callao",
    title: "Recetario: Almuerzos Familiares Saludables - Lima y Callao (2024)",
    pdfPath: "/documentos/Recetario: Almuerzos Familiares Saludables - Lima y Callao (2024).pdf",
    description: "Colección de 25 almuerzos familiares diseñados para 4 miembros, que consisten en un plato principal (con las tres combinaciones básicas), una ensalada de verduras, una fruta y un refresco, con el detalle de su aporte nutricional.",
    source: "INS/CENAN",
    date: "2024",
    previewImg: "/previews/9.png",
  },
  {
    slug: "recetario-diversidad-costena",
    title: "Recetario: Diversidad Biológica Costeña (Rico en Hierro) (2021)",
    pdfPath: "/documentos/Recetario: Diversidad Biológica Costeña (Rico en Hierro) (2021).pdf",
    description: "Recetario que promueve el consumo de pescado y mariscos de la costa peruana, como anchoveta, bonito y pota, para una alimentación rica en hierro y omega 3. Incluye 34 recetas (para 4 raciones) y consejos de salubridad y conservación.",
    source: "INS/CENAN",
    date: "2021",
    previewImg: "/previews/10.png",
  },
  {
    slug: "guia-ops-nino-pequeno",
    title: "Alimentación y Nutrición del Niño Pequeño: Guía para la Capacitación",
    pdfPath: "/documentos/Alimentación y Nutrición del Niño Pequeño: Guía para la Capacitación.pdf",
    description: "Guía de la Organización Panamericana de la Salud (OPS) enfocada en la capacitación de profesionales de la salud sobre la alimentación y nutrición del niño pequeño. Aborda temas como la lactancia materna, la alimentación complementaria, el crecimiento infantil, la prevención de la anemia, y el manejo de enfermedades comunes.",
    source: "OPS",
    date: "N/A",
    previewImg: "/previews/11.png",
  },
  {
    slug: "estrategia-oms-unicef",
    title: "Estrategia Mundial para la Alimentación del Lactante y del Niño Pequeño (OMS/UNICEF)",
    pdfPath: "/documentos/Estrategia Mundial para la Alimentación del Lactante y del Niño Pequeño (OMS/UNICEF).pdf",
    description: "Documento clave de la Organización Mundial de la Salud (OMS) y UNICEF que presenta una estrategia mundial para mejorar las prácticas de alimentación en el mundo, estableciendo como meta la lactancia materna exclusiva durante los primeros seis meses de vida, seguida de la introducción de alimentos complementarios nutritivos hasta los dos años o más.",
    source: "OMS/UNICEF",
    date: "N/A",
    previewImg: "/previews/12.png",
  },
  {
    slug: "informe-seminario-anemia",
    title: "Informe del Seminario: La Anemia Infantil en el Perú",
    pdfPath: "/documentos/Informe del Seminario: La Anemia Infantil en el Perú.pdf",
    description: "Documento que resume las discusiones y conclusiones de un seminario sobre la situación de la anemia infantil en Perú, analizando la magnitud del problema, las intervenciones de prevención y control implementadas en el país, y formulando recomendaciones para un abordaje multisectorial efectivo.",
    source: "N/A",
    date: "N/A",
    previewImg: "/previews/13.png",
  },
];
// ------------------------------------------------------------------------

export default function BibliotecaPage() {
  // ... (resto del código JSX del componente BibliotecaPage)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-50 rounded-b-3xl">
        <div className="max-w-5xl mx-auto flex items-center gap-4 p-4">
          <button
            onClick={() => (window.location.href = "/")}
            className="p-2 hover:bg-gray-200 rounded-full transition"
          >
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            📖 Biblioteca de Documentos
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 mt-6 ">

         <section className="bg-white p-6 md:p-8 rounded-3xl shadow-lg mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Documentos y guías oficiales del Instituto Nacional de Salud (INS) y el Ministerio de Salud (MINSA).
          </h2>
        
        </section>

        {/* Grid de Documentos - Responsive (1 columna en móvil, 2 en desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {documents.map((doc) => (
            <Link
              key={doc.slug}
              to={`/biblioteca/${doc.slug}`}
              className="bg-white rounded-2xl shadow-lg overflow-hidden 
                         transition-all duration-300 transform 
                         hover:shadow-xl hover:scale-[1.02] group cursor-pointer"
            >
              {/* Contenido de la Tarjeta */}
              <div className="flex flex-col h-full">
                
                {/* Preview Image */}
                <div className="h-40 overflow-hidden bg-gray-200 flex items-center justify-center">
                  <img
                    src={doc.previewImg} 
                    alt={`Preview de ${doc.title}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = "https://via.placeholder.com/600x400?text=PDF+Preview"; // Fallback por si la imagen no existe
                    }}
                  />
                </div>
                
                {/* Texto */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {doc.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {doc.description}
                    </p>
                  </div>
                  <span className="mt-4 text-sm font-semibold text-blue-600 group-hover:text-blue-800">
                    Ver documento →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

    {/* 🔘 Botón Volver */}
        <div className="flex justify-center mt-8">
        <Link
            to="/"
            className="inline-block border-2 border-white text-white hover:bg-white hover:text-indigo-700 font-semibold py-2 px-6 rounded-full shadow-md transition-all duration-300"
        >
            Volver al Menú Principal
        </Link>
        </div>  
      </div>
    </div>
  );
}