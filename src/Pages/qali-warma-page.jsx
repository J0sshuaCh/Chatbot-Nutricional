import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function QaliWarmaPage() {
  return (
    <div className="min-h-screen ">

      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-50 rounded-b-3xl">
        <div className="max-w-5xl mx-auto flex items-center gap-4 p-4">
          <button
            onClick={() => window.history.back()}
            className="p-2 hover:bg-gray-200 rounded-full transition"
          >
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Programa Qali Warma
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 mt-6">

        {/* Introducción */}
        <section className="bg-white p-6 md:p-8 rounded-3xl shadow-lg mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">1. Introducción</h2>

          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Qali Warma</strong> (“niño vigoroso” en quechua) es uno de los programas
            sociales más grandes del Estado peruano. Administrado por el 
            Ministerio de Desarrollo e Inclusión Social (<strong>MIDIS</strong>).
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            Su objetivo principal es <strong>garantizar un servicio alimentario de calidad </strong> 
            durante el año escolar en instituciones públicas.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Con una alimentación adecuada, se mejora la atención, asistencia escolar, permanencia 
            y los hábitos alimentarios saludables.
          </p>

          {/* Imagen debajo de introducción */}
          <div className="w-full rounded-2xl overflow-hidden shadow-md mt-4">
            <img
              src="https://e-an.americatv.com.pe/actualidad-midis-estimara-impacto-desayunos-escolares-distribuidos-qali-warma-n323069-938x528-470666.png"
              alt="Qali Warma"
              className="w-full h-64 object-cover"
            />
          </div>
        </section>

        {/* Objetivos Específicos */}
        <section className="bg-white p-6 md:p-8 rounded-3xl shadow-lg mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">1.2. Objetivos Específicos</h2>

          <ul className="space-y-5">
            {[
              "Garantizar el servicio alimentario complementario (desayunos y/o almuerzos).",
              "Mejorar la atención y asistencia escolar.",
              "Promover hábitos alimentarios saludables.",
              "Impulsar la economía local con compras regionales."
            ].map((item, i) => (
              <li
                key={i}
                className="bg-gray-50 border-l-4 border-red-400 p-4 rounded-xl text-gray-700 shadow-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Población Objetivo */}
        <section className="bg-white p-6 md:p-8 rounded-3xl shadow-lg mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">1.3. Población Objetivo</h2>

          <p className="text-gray-700 mb-4">
            Qali Warma atiende estudiantes de instituciones educativas públicas.
          </p>

          <div className="space-y-4">
            {[
              { t: "Nivel Inicial", d: "Niños de 3 a 5 años." },
              { t: "Nivel Primaria", d: "Estudiantes de 1° a 6° grado." },
              {
                t: "Nivel Secundaria",
                d: "Principalmente en comunidades indígenas amazónicas y zonas vulnerables."
              }
            ].map((item, i) => (
              <div key={i} className="bg-blue-50 p-4 rounded-xl shadow-sm">
                <p className="font-semibold text-gray-800">{item.t}</p>
                <p className="text-gray-700">{item.d}</p>
              </div>
            ))}
          </div>

          <p className="text-gray-700 mt-6 italic">
            ⚠️ Nota: El programa no atiende a bebés de 6 a 12 meses.
          </p>
        </section>

        {/* === NUEVA SECCIÓN - MÁS INFORMACIÓN === */}
        <section className="bg-white p-6 md:p-8 rounded-3xl shadow-lg mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Más información</h2>

          <p className="text-gray-700 mb-4">
            Si deseas profundizar más sobre el programa Qali Warma, aquí tienes enlaces útiles:
          </p>

          <ul className="space-y-4">
            <li>
              <a
                href="https://youtu.be/cpedJ5PlEVA?si=-sI6N8I-nsYtRDsV"
                target="_blank"
                className="text-blue-600 underline hover:text-blue-800"
              >
                🎥 Video informativo sobre Qali Warma (YouTube)
              </a>
            </li>

            <li>
              <a
                href="https://info.qaliwarma.gob.pe/como-lo-hacemos/"
                target="_blank"
                className="text-blue-600 underline hover:text-blue-800"
              >
                🌐 ¿Cómo funciona Qali Warma? (Página oficial)
              </a>
            </li>
          </ul>
        </section>

        {/* Botón volver */}
        <div className="text-center mt-10 pb-10">
          <Link
            to="/servicios-estado"
            className="inline-block bg-red-500 text-white px-6 py-3 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1"
          >
            ← Volver a Servicios del Estado
          </Link>
        </div>

      </div>
    </div>
  );
}