import React from "react";
import MenuItem from "./menu-item";

const itemBebe = {
  icon: "👶",
  title: "Gestión de mi Bebé",
  description: "Registra y haz seguimiento al crecimiento, peso, talla y control de anemia de tu bebé.",
  type: "bebe",
};

const itemsPublicos = [

  {
    icon: "🤖",
    title: "Chatbot ANMI",
    description:
      "Conversa con nuestro asistente virtual sobre nutrición infantil y prevención de anemia para bebés de 6 a 12 meses.",
    type: "chatbot",
  },
  {
    icon: "📚",
    title: "Información Nutricional",
    description:
      "Guías sobre alimentos ricos en hierro, vitaminas y nutrientes esenciales para el desarrollo infantil.",
    type: "info",
  },
  {
    icon: "🏥",
    title: "Servicios del Estado",
    description:
      "Información sobre programas gubernamentales de apoyo alimentario y servicios de salud disponibles.",
    type: "servicios",
  },
  {
    icon: "🍽️",
    title: "Guía de Platillos Nutritivos",
    description:
      "Recetas saludables y fáciles de preparar, adaptadas a las diferentes etapas del desarrollo del bebé.",
    type: "recetas",
  },
  {
    icon: "📖",
    title: "Biblioteca de Documentos",
    description:
      "Acceso a documentos oficiales del MINSA, OMS y otras fuentes verificadas sobre salud materno-infantil.",
    type: "biblioteca",
  },
  {
    icon: "⚙️",
    title: "Configuración y Privacidad",
    description:
      "Gestiona tus datos personales, revisa nuestra política de privacidad y términos de uso.",
    type: "config",
  },
];

export default function MenuGrid() {
  return (

    <div className=" mx-auto p-4 space-y-6">
      <div className="seccion-privada">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">Mi Espacio Personal</h3>
        <MenuItem {...itemBebe} />
      </div>

      <hr className="border-gray-200" />
      <div className="menu-grid">
        {itemsPublicos.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
      </div>
    </div>

  );
}
