import React from "react";
import { Link } from "react-router-dom";

export default function MenuItem({ icon, title, description, type }) {

  const mostrarSeccion = () => {
    alert(
      `Sección "${title}" en desarrollo.\n\nEsta funcionalidad estará disponible en las próximas semanas del proyecto.`
    );
  };

  // Determinar si el título tiene una ruta activa
  const rutasActivas = {
    "Chatbot ANMI": "/chatbot",
    "Información Nutricional": "/informacion-nutricional",
    "Servicios del Estado": "/servicios-estado",
    "Configuración y Privacidad": "/configuracion",
    "Guía de Platillos Nutritivos": "/guia-platillos", // <--- AGREGADO
    "Biblioteca de Documentos": "/biblioteca",         // <--- AGREGADO
  };

  // Si el título está en rutas activas, se muestra como Link
  if (rutasActivas[title]) {
    return (
      <Link to={rutasActivas[title]} className={`menu-item ${type}`}>
        <div className="icon">{icon}</div>
        <h2 className="font-bold ">{title}</h2>
        <p>{description}</p>
      </Link>
    );
  }

  // Si no está en rutas activas, se muestra como "En desarrollo"
  return (
    <div className={`menu-item ${type}`} onClick={mostrarSeccion}>
      <div className="icon">{icon}</div>
      <h2 className="font-bold ">{title}</h2>
      <p>{description}</p>
      <span className="status desarrollo">En desarrollo</span>
    </div>
  );
}