import { Bot, BookOpen, Building2, UtensilsCrossed, Library, Settings } from "lucide-react"
import MenuItem from "./menu-item"

const itemBebe = {
  icon: "👶",
  title: "Gestión de mi Bebé",
  description: "Registra y haz seguimiento al crecimiento, peso, talla y control de anemia de tu bebé.",
  type: "bebe",
};

const itemsPublicos = [

  {
    icon: Bot,
    title: "Chatbot ANMI",
    description:
      "Conversa con nuestro asistente virtual sobre nutrición infantil y prevención de anemia para bebés de 6 a 12 meses.",
    route: "/chatbot",
  },
  {
    icon: BookOpen,
    title: "Información Nutricional",
    description:
      "Guías sobre alimentos ricos en hierro, vitaminas y nutrientes esenciales para el desarrollo infantil.",
    route: "/informacion-nutricional",
  },
  {
    icon: Building2,
    title: "Servicios del Estado",
    description:
      "Información sobre programas gubernamentales de apoyo alimentario y servicios de salud disponibles.",
    route: "/servicios-estado",
  },
  {
    icon: UtensilsCrossed,
    title: "Guía de Platillos Nutritivos",
    description:
      "Recetas saludables y fáciles de preparar, adaptadas a las diferentes etapas del desarrollo del bebé.",
    route: "/guia-platillos",
  },
  {
    icon: Library,
    title: "Biblioteca de Documentos",
    description:
      "Acceso a documentos oficiales del MINSA, OMS y otras fuentes verificadas sobre salud materno-infantil.",
    route: "/biblioteca",
  },
  {
    icon: Settings,
    title: "Configuración y Privacidad",
    description:
      "Gestiona tus datos personales, revisa nuestra política de privacidad y términos de uso.",
    route: "/configuracion",
  },
]

export default function MenuGrid() {
  return (
    <div className="max-w-5xl mx-auto px-4 mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {itemsPublicos.map((item, index) => (
        <MenuItem key={index} {...item} />
      ))}
    </div>
  )
}
