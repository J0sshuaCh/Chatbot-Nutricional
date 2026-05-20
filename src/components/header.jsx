import React from "react";

export default function Header() {
  return (
    <header>
      <h1>👶ASISTENTE NUTRICIONAL</h1>
      <p className="subtitle">asistente nutricional orientado a infantes</p>
      <div className="disclaimer">
        ⚠️ <strong>Importante:</strong> Esta es una herramienta informativa y educativa. 
        La información proporcionada NO sustituye la consulta con un profesional de la salud.
      </div>
    </header>
  );
}
