import React from "react";
import { Link } from "react-router-dom";

export default function MenuItem({ icon, title, description, type }) {

  const mostrarSeccion = () => {
    alert(
      `Sección "${title}" en desarrollo.\n\nEsta funcionalidad estará disponible en las próximas semanas del proyecto.`
    );
  };

  // 1. Verificamos el título (asegúrate de que coincida exacto)
  if (title === "Chatbot ANMI") {
    
    // 2. Retornamos el item envuelto en un <Link>
    //    Usamos las clases CSS de tu primer archivo
    //    Nota: El <Link> REEMPLAZA al <div> exterior
    return (
      <Link to="/chatbot" className={`menu-item ${type}`}>
        <div className="icon">{icon}</div>
        <h2>{title}</h2>
        <p>{description}</p>
        {/* No ponemos el span "En desarrollo" porque este SÍ funciona */}
      </Link>
    );

  } else {
    
    // 3. Para todos los demás items, retornamos el código original
    //    SIN 'onClick', para que no haga nada.
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