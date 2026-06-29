import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import PageMeta from "@/components/page-meta"
import BreadcrumbBar from "@/components/breadcrumb-bar"
import { ArrowLeft, ExternalLink, ShieldCheck, Target, Pill, HeartPulse, Apple, Droplets } from "lucide-react"

export default function PlanAnemiaPage() {
  return (
    <>
      <PageMeta title="Plan Nacional contra la Anemia" description="Estrategia multisectorial del MINSA para la prevención y reducción de la anemia materno infantil en el Perú 2024-2030" />
      <div className="flex flex-col px-4 py-6">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" aria-label="Volver a servicios del estado" nativeButton={false} render={<Link to="/servicios-estado" />}>
            <ArrowLeft />
          </Button>
          <div className="flex flex-col gap-1">
            <BreadcrumbBar items={[
              { label: "Servicios del Estado", to: "/servicios-estado" },
              { label: "Plan Nacional contra la Anemia" }
            ]} />
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              Plan Nacional contra la Anemia y la DCI
            </h1>
          </div>
        </div>

        {/* Introducción */}
        <Card>
          <CardContent className="p-6 flex flex-col gap-4">
            <h2 className="font-heading text-xl font-bold text-card-foreground">2.1. Introducción</h2>
            <p className="text-muted-foreground leading-relaxed">
              El <strong>Plan Nacional contra la Anemia</strong> es la principal estrategia
              multisectorial del país para enfrentar la anemia y la desnutrición crónica infantil.
              Está liderado por el <strong>Ministerio de Salud (MINSA)</strong> y cuenta con la participación
              del MIDIS, MINEDU, Ministerio de Vivienda, así como los gobiernos regionales y locales.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Su propósito es definir objetivos, indicadores y las <strong>intervenciones clave</strong> que
              todas estas entidades deben ejecutar de manera coordinada.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              El plan vigente es el <strong>Plan Multisectorial para la Prevención y Reducción de la
              Anemia Materno Infantil en el Perú 2024-2030</strong>.
            </p>
            <div className="w-full rounded-xl overflow-hidden shadow-md">
              <img
                src="https://pbs.twimg.com/media/DrfZsvLW4AA7iM5.jpg"
                alt="Plan Nacional contra la Anemia"
                loading="lazy"
                className="w-full h-48 md:h-64 object-cover"
              />
            </div>
          </CardContent>
        </Card>

        {/* Objetivo */}
        <Card>
          <CardContent className="p-6 flex flex-col gap-4">
            <span className="bg-secondary/10 text-secondary p-3 rounded-xl w-fit">
              <Target className="size-8" />
            </span>
            <h2 className="font-heading text-xl font-bold text-card-foreground">2.2. Objetivo Principal</h2>
            <p className="text-muted-foreground leading-relaxed">
              Reducir la prevalencia de la anemia en niños menores de 36 meses
              (especialmente durante el primer año de vida) y en gestantes, así como
              disminuir la desnutrición crónica infantil.
            </p>
          </CardContent>
        </Card>

        {/* Intervenciones Clave */}
        <Card>
          <CardContent className="p-6 flex flex-col gap-4">
            <h2 className="font-heading text-xl font-bold text-card-foreground">2.3. Intervenciones Clave</h2>
            <p className="text-muted-foreground">
              Estas son las principales acciones definidas por el Plan, que se ejecutan desde los
              centros de salud y programas sociales, especialmente para bebés de 6 a 12 meses:
            </p>
            {[
              { icon: Pill, title: "Suplementación preventiva", desc: "entrega gratuita de suplementos de hierro (gotas o Nutri-Hierro) desde los 6 meses, o desde los 4 meses si el bebé es prematuro.", color: "border-primary" },
              { icon: HeartPulse, title: "Tamizaje (despistaje)", desc: "examen de hemoglobina mediante pinchazo en el dedo. El control más importante es el de los 6 meses.", color: "border-primary" },
              { icon: ShieldCheck, title: "Tratamiento oportuno", desc: "entrega de jarabe de sulfato ferroso u otro tratamiento para los niños diagnosticados con anemia.", color: "border-primary" },
              { icon: Apple, title: "Consejería nutricional", desc: "el personal de salud debe brindar orientación activa durante el CRED, promoviendo lactancia materna exclusiva hasta los 6 meses, correcta alimentación complementaria y consumo frecuente de alimentos ricos en hierro.", color: "border-secondary" },
              { icon: Droplets, title: "Agua segura y saneamiento", desc: "fomentar el consumo de agua clorada y el lavado de manos para prevenir enfermedades que pueden causar anemia.", color: "border-secondary" }
            ].map((item, i) => (
              <div key={i} className={`bg-muted border-l-4 ${item.color} p-4 rounded-xl flex items-start gap-3`}>
                <item.icon className="size-5 mt-0.5 shrink-0 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Más información */}
        <Card>
          <CardContent className="p-6 flex flex-col gap-4">
            <h2 className="font-heading text-xl font-bold text-card-foreground">Más información</h2>
            <p className="text-muted-foreground">Recursos oficiales y documentos útiles sobre la prevención de la anemia:</p>
            <ul className="flex flex-col gap-3">
              <li className="bg-muted p-4 rounded-lg border-l-4 border-primary">
                <a href="https://www.gob.pe/institucion/minsa/normas-legales/5093832-002-2024-sa" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline flex items-center gap-2">
                  <ExternalLink className="size-4" />
                  Plan Multisectorial contra la Anemia 2024–2030 (PDF oficial)
                </a>
                <p className="text-sm text-muted-foreground mt-1">Documento del MINSA con estrategias nacionales de prevención y reducción de anemia infantil.</p>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button variant="link" nativeButton={false} render={<Link to="/servicios-estado" />}>
            <ArrowLeft data-icon="inline-start" />
            Volver a Servicios del Estado
          </Button>
        </div>
      </div>
    </div>
    </>
  )
}
