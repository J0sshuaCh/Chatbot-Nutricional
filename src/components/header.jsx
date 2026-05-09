import React from "react";

export default function Header() {
  return (
    <header>
      <h1>🍼 ANMI</h1>
      <p className="subtitle">Asistente Nutricional Materno Infantil</p>
      <div className="disclaimer">
        ⚠️ <strong>Importante:</strong> Esta es una herramienta informativa y educativa. 
        La información proporcionada NO sustituye la consulta con un profesional de la salud.
      </div>
    </header>
  );
}
