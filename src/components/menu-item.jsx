import React from "react";
import { Link } from "react-router-dom";

export default function MenuItem({ icon, title, description, type }) {

  const mostrarSeccion = () => {
    alert(
      `Sección "${title}" en desarrollo.\n\nEsta funcionalidad estará disponible en las próximas semanas del proyecto.`
    );
  };

  if (title === "Chatbot ANMI") {
    
    return (
      <Link to="/chatbot" className={`menu-item ${type}`}>
        <div className="icon">{icon}</div>
        <h2>{title}</h2>
        <p>{description}</p>
      </Link>
    );

  } else {
    
    return (
      <div className={`menu-item ${type}`} onClick={mostrarSeccion}>
        <div className="icon">{icon}</div>
        <h2>{title}</h2>
        <p>{description}</p>
        <span className="status desarrollo">En desarrollo</span>
      </div>
    );
  }
}