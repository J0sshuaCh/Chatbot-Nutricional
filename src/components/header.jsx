import React from "react";

export default function Header() {
  return (
    <header className="flex flex-col items-center text-center mt-6  text-white mb-10 p-[30px_20px] bg-white/10 rounded-[20px] backdrop-blur-md
">
      <h1 >🍼 ANMI</h1>

      <p className="subtitle ">
        Asistente Nutricional Materno Infantil
      </p>

      {/* Imagen debajo del subtítulo */}
      <img
        src="/android-chrome-512x512.png"
        alt="ANMI Logo"
        className="w-28 h-28 mt-3 shadow-[0_12px_30px_rgba(0,0,0,0.01)] rounded-xl"
      />

      <div className="disclaimer mt-3 text-sm px-4">
        ⚠️ <strong>Importante:</strong> Esta es una herramienta informativa y educativa.
        La información proporcionada NO sustituye la consulta con un profesional de la salud.
      </div>
    </header>
  );
}
