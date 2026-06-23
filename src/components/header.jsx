import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";

export default function Header() {
  const { session } = useAuth();

  return (
    <header className="flex flex-col items-center text-center mt-6">
      <div className="w-full max-w-4xl flex justify-end px-4 mb-2">
        {session ? (
          <Link
            to="/mi-perfil"
            className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center gap-1"
          >
            <span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
              {session.user?.email?.charAt(0).toUpperCase() || 'U'}
            </span>
            Mi Perfil
          </Link>
        ) : (
          <Link
            to="/login"
            className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
          >
            Iniciar Sesión
          </Link>
        )}
      </div>

      <h1>🍼 ANMI</h1>

      <p className="subtitle">
        Asistente Nutricional Materno Infantil
      </p>

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
