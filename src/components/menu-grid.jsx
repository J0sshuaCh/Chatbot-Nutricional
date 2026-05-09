import React from "react";
import MenuItem from "./menu-item";

const items = [
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
    <div className="menu-grid">
      {items.map((item, index) => (
        <MenuItem key={index} {...item} />
      ))}
    </div>
  );
}
