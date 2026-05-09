import React from "react";

export default function MenuItem({ icon, title, description, type }) {
  const mostrarSeccion = () => {
    alert(
      `Sección "${title.toUpperCase()}" en desarrollo.\n\nEsta funcionalidad estará disponible en las próximas semanas del proyecto.`
    );
  };

  return (
    <div className={`menu-item ${type}`} onClick={mostrarSeccion}>
      <div className="icon">{icon}</div>
      <h2>{title}</h2>
      <p>{description}</p>
      <span className="status desarrollo">En desarrollo</span>
    </div>
  );
}
