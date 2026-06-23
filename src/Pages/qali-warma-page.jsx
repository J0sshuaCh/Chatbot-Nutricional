import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import PageMeta from "@/components/page-meta"
import BreadcrumbBar from "@/components/breadcrumb-bar"
import { ArrowLeft, ExternalLink } from "lucide-react"

export default function QaliWarmaPage() {
  return (
    <>
      <PageMeta title="Programa Qali Warma" description="Información sobre el programa social de alimentación escolar del MIDIS para niños en instituciones públicas" />
      <div className="flex flex-col px-4 py-6">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" aria-label="Volver a servicios del estado" nativeButton={false} render={<Link to="/servicios-estado" />}>
            <ArrowLeft />
          </Button>
          <div className="flex flex-col gap-1">
            <BreadcrumbBar items={[
              { label: "Servicios del Estado", to: "/servicios-estado" },
              { label: "Qali Warma" }
            ]} />
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              Programa Qali Warma
            </h1>
          </div>
        </div>

        {/* Introducción */}
        <Card>
          <CardContent className="p-6 flex flex-col gap-4">
            <h2 className="font-heading text-xl font-bold text-card-foreground">1. Introducción</h2>
            <p className="text-muted-foreground leading-relaxed">
              <strong>Qali Warma</strong> ("niño vigoroso" en quechua) es uno de los programas
              sociales más grandes del Estado peruano. Administrado por el Ministerio de Desarrollo
              e Inclusión Social (<strong>MIDIS</strong>).
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Su objetivo principal es <strong>garantizar un servicio alimentario de calidad</strong>
              durante el año escolar en instituciones públicas.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Con una alimentación adecuada, se mejora la atención, asistencia escolar, permanencia
              y los hábitos alimentarios saludables.
            </p>
            <div className="w-full rounded-xl overflow-hidden shadow-md">
              <img
                src="https://e-an.americatv.com.pe/actualidad-midis-estimara-impacto-desayunos-escolares-distribuidos-qali-warma-n323069-938x528-470666.png"
                alt="Qali Warma"
                loading="lazy"
                className="w-full h-48 md:h-64 object-cover"
              />
            </div>
          </CardContent>
        </Card>

        {/* Objetivos */}
        <Card>
          <CardContent className="p-6 flex flex-col gap-4">
            <h2 className="font-heading text-xl font-bold text-card-foreground">1.2. Objetivos Específicos</h2>
            <ul className="flex flex-col gap-3">
              {[
                "Garantizar el servicio alimentario complementario (desayunos y/o almuerzos).",
                "Mejorar la atención y asistencia escolar.",
                "Promover hábitos alimentarios saludables.",
                "Impulsar la economía local con compras regionales."
              ].map((item, i) => (
                <li key={i} className="bg-muted border-l-4 border-primary p-4 rounded-xl text-sm text-muted-foreground shadow-sm">
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Población */}
        <Card>
          <CardContent className="p-6 flex flex-col gap-4">
            <h2 className="font-heading text-xl font-bold text-card-foreground">1.3. Población Objetivo</h2>
            <p className="text-muted-foreground">Qali Warma atiende estudiantes de instituciones educativas públicas.</p>
            <div className="flex flex-col gap-3">
              {[
                { t: "Nivel Inicial", d: "Niños de 3 a 5 años." },
                { t: "Nivel Primaria", d: "Estudiantes de 1° a 6° grado." },
                { t: "Nivel Secundaria", d: "Principalmente en comunidades indígenas amazónicas y zonas vulnerables." }
              ].map((item, i) => (
                <div key={i} className="bg-secondary/10 p-4 rounded-xl">
                  <p className="font-semibold text-foreground">{item.t}</p>
                  <p className="text-sm text-muted-foreground">{item.d}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground italic">
              Nota: El programa no atiende a bebés de 6 a 12 meses.
            </p>
          </CardContent>
        </Card>

        {/* Más información */}
        <Card>
          <CardContent className="p-6 flex flex-col gap-4">
            <h2 className="font-heading text-xl font-bold text-card-foreground">Más información</h2>
            <p className="text-muted-foreground">Si deseas profundizar más sobre el programa Qali Warma, aquí tienes enlaces útiles:</p>
            <ul className="flex flex-col gap-3">
              <li className="bg-muted p-4 rounded-lg border-l-4 border-primary">
                <a href="https://youtu.be/cpedJ5PlEVA?si=-sI6N8I-nsYtRDsV" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline flex items-center gap-2">
                  <ExternalLink className="size-4" />
                  Video informativo sobre Qali Warma (YouTube)
                </a>
              </li>
              <li className="bg-muted p-4 rounded-lg border-l-4 border-primary">
                <a href="https://info.qaliwarma.gob.pe/como-lo-hacemos/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline flex items-center gap-2">
                  <ExternalLink className="size-4" />
                  ¿Cómo funciona Qali Warma? (Página oficial)
                </a>
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
