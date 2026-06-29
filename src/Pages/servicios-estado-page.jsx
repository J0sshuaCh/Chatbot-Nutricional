import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import PageMeta from "@/components/page-meta"
import { ArrowLeft, Building2 } from "lucide-react"

const servicios = [
  {
    id: "qali-warma",
    nombre: "Programa Qali Warma",
    descripcion: "Servicio alimentario escolar para niños y niñas de instituciones públicas.",
    logo: "https://ugeltarma-junin.gob.pe/wp-content/uploads/2020/04/logo-solo-01-01.png",
  },
  {
    id: "plan-anemia",
    nombre: "Plan Nacional Contra la Anemia",
    descripcion: "Estrategia multisectorial del MINSA para prevenir y reducir la anemia infantil.",
    logo: "https://www.diariomedico.pe/wp-content/uploads/2024/03/anemia-777x437.jpg",
  },
  {
    id: "cuna-mas",
    nombre: "Programa Nacional Cuna Más",
    descripcion: "Atención integral y desarrollo infantil temprano para niños de 0 a 36 meses.",
    logo: "https://cdn.www.gob.pe/uploads/document/file/2728785/standard_cuna%20mas.jpg.jpg",
  }
]

export default function ServiciosEstado() {
  return (
    <>
      <PageMeta title="Servicios del Estado" description="Información sobre programas sociales del Perú relacionados con nutrición infantil: Qali Warma, Cuna Más y Plan contra la Anemia" />
      <div className="flex flex-col px-4 py-6">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" aria-label="Volver al inicio" nativeButton={false} render={<Link to="/" />}>
            <ArrowLeft />
          </Button>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            Servicios del Estado
          </h1>
        </div>

        {/* Intro card */}
        <Card>
          <CardContent className="p-6 flex flex-col gap-2">
            <h2 className="font-heading text-xl font-bold text-card-foreground">
              Programas oficiales de apoyo
            </h2>
            <p className="text-muted-foreground">
              Programas oficiales que apoyan la nutrición, el desarrollo y la salud
              de los niños y familias en el Perú.
            </p>
          </CardContent>
        </Card>

        {/* Service grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicios.map((servicio) => (
            <Link
              key={servicio.id}
              to={`/servicios-estado/${servicio.id}`}
              className="block group"
            >
              <Card className="overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1 h-full">
                <div className="h-48 overflow-hidden bg-muted">
                  <img
                    src={servicio.logo}
                    alt={servicio.nombre}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6 flex flex-col gap-2">
                  <h3 className="font-heading text-xl font-bold text-card-foreground">
                    {servicio.nombre}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {servicio.descripcion}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="flex justify-center">
          <Button variant="link" nativeButton={false} render={<Link to="/" />}>
            <ArrowLeft data-icon="inline-start" />
            Volver al Menú Principal
          </Button>
        </div>
      </div>
    </div>
    </>
  )
}
