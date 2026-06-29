import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import PageMeta from "@/components/page-meta"
import BreadcrumbBar from "@/components/breadcrumb-bar"
import { ArrowLeft, ExternalLink, Baby, Target, Users, Stethoscope, House, BrainCircuit, Video } from "lucide-react"

export default function CunaMasPage() {
  return (
    <>
      <PageMeta title="Programa Nacional Cuna Más" description="Programa del MIDIS para el desarrollo infantil temprano de niños menores de 3 años en situación de pobreza" />
      <div className="flex flex-col px-4 py-6">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" aria-label="Volver a servicios del estado" nativeButton={false} render={<Link to="/servicios-estado" />}>
            <ArrowLeft />
          </Button>
          <div className="flex flex-col gap-1">
            <BreadcrumbBar items={[
              { label: "Servicios del Estado", to: "/servicios-estado" },
              { label: "Cuna Más" }
            ]} />
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              Programa Nacional Cuna Más
            </h1>
          </div>
        </div>

        {/* Resumen Ejecutivo */}
        <Card>
          <CardContent className="p-6 flex flex-col gap-4">
            <h2 className="font-heading text-xl font-bold text-card-foreground">3.1. Resumen Ejecutivo</h2>
            <p className="text-muted-foreground leading-relaxed">
              El <strong>Programa Nacional Cuna Más (PNCM)</strong> es una iniciativa del
              Ministerio de Desarrollo e Inclusión Social (<strong>MIDIS</strong>) cuyo objetivo
              principal es mejorar el desarrollo infantil (cognitivo, social, físico y emocional)
              de niñas y niños menores de 36 meses (0 a 3 años) que viven en condiciones de
              pobreza y pobreza extrema.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              A diferencia de programas escolares como Qali Warma, Cuna Más atiende la
              <strong> primera infancia</strong>, un período crítico donde la nutrición y la prevención
              de la anemia son fundamentales. El servicio se entrega mediante dos modalidades:
              <em> cuidado diurno</em> y <em>visitas domiciliarias</em>.
            </p>
            <div className="w-full rounded-xl overflow-hidden shadow-sm">
              <img
                src="https://scontent.flim2-6.fna.fbcdn.net/v/t39.30808-6/476367111_921491863507836_6620660717608242723_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHVpCV7ya6GNbB4nmWRt5HseSpv4ZBJhMV5Km_hkEmExTCgEBGEYj4pnh0QY8c1qTPBxgeIXBRj5_E6GoxmvZ1O&_nc_ohc=Ql7JBsaOVUYQ7kNvwG2oVok&_nc_oc=AdlDL0NAow52W2XHx161pKaQHLhGZsklbG_WvdSqtrNxM6drBkzhFh97Wectpq_aL9U4Yfx2plgketzZBlRWotge&_nc_zt=23&_nc_ht=scontent.flim2-6.fna&_nc_gid=6fQz48PC4xA2Kyteczscjg&oh=00_Afg9smCtxVO61FShb5UBmoBP6qYGFeDvtTHKx6PaoblvaA&oe=691E9710"
                alt="Programa Cuna Más"
                loading="lazy"
                className="w-full h-48 md:h-64 object-cover"
              />
            </div>
          </CardContent>
        </Card>

        {/* Población Objetivo */}
        <Card>
          <CardContent className="p-6 flex flex-col gap-4">
            <span className="bg-secondary/10 text-secondary p-3 rounded-xl w-fit">
              <Users className="size-8" />
            </span>
            <h2 className="font-heading text-xl font-bold text-card-foreground">3.2. Población Objetivo</h2>
            <div className="flex flex-col gap-3">
              <div className="bg-muted border-l-4 border-primary p-4 rounded-xl">
                <p className="font-semibold text-foreground">Niñas y niños menores de 36 meses (0 a 3 años)</p>
                <p className="text-sm text-muted-foreground">En condición de pobreza y pobreza extrema.</p>
              </div>
              <div className="bg-muted border-l-4 border-secondary p-4 rounded-xl">
                <p className="font-semibold text-foreground">Gestantes</p>
                <p className="text-sm text-muted-foreground">Incluidas en el Servicio de Acompañamiento a Familias (SAF) para promover cuidado prenatal y preparación para la llegada del bebé.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Objetivos */}
        <Card>
          <CardContent className="p-6 flex flex-col gap-4">
            <span className="bg-primary/10 text-primary p-3 rounded-xl w-fit">
              <Target className="size-8" />
            </span>
            <h2 className="font-heading text-xl font-bold text-card-foreground">3.3. Objetivos Específicos</h2>
            {[
              "Superar brechas en el desarrollo cognitivo, social, físico y emocional.",
              "Mejorar conocimientos y prácticas familiares para el cuidado y aprendizaje.",
              "Brindar atención integral (nutrición, salud y aprendizaje) en coordinación intersectorial.",
              "Contribuir a la reducción de la Desnutrición Crónica Infantil (DCI) y la Anemia."
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-muted p-4 rounded-xl">
                <span className="bg-primary/20 text-primary size-6 rounded-full flex items-center justify-center shrink-0 text-sm font-bold">{i + 1}</span>
                <p className="text-muted-foreground">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Modalidades */}
        <Card>
          <CardContent className="p-6 flex flex-col gap-6">
            <h2 className="font-heading text-xl font-bold text-card-foreground">3.4. Modalidades de Intervención</h2>
            <p className="text-muted-foreground">
              Cuna Más opera con dos modalidades que se adaptan al contexto local:
              <strong> Servicio de Cuidado Diurno (SCD)</strong> y <strong>Servicio de Acompañamiento a Familias (SAF)</strong>.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {/* SCD */}
              <Card>
                <CardContent className="p-5 flex flex-col gap-3">
                  <span className="bg-primary/10 text-primary p-2 rounded-lg w-fit">
                    <Baby className="size-6" />
                  </span>
                  <h3 className="font-heading text-lg font-bold text-card-foreground">a) Servicio de Cuidado Diurno (SCD)</h3>
                  <p className="text-sm text-muted-foreground">Modelo similar a una guardería pública: centros infantiles (CIAI) que atienden de lunes a viernes, 8 horas al día.</p>
                  <div className="text-sm text-muted-foreground flex flex-col gap-1">
                    <p><strong>¿Cómo funciona?</strong> Asistencia diaria en Centros Infantiles de Atención Integral (CIAI).</p>
                    <p><strong>¿Quién cuida?</strong> Madres Cuidadoras —actoras comunales voluntarias—, capacitadas y supervisadas por personal técnico del PNCM.</p>
                  </div>
                  <div className="bg-muted border-l-4 border-primary p-4 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2 text-foreground">Componente Anemia / Nutrición (Directo)</h4>
                    <ul className="list-disc pl-4 text-sm text-muted-foreground flex flex-col gap-1">
                      <li><strong>Alimentación completa:</strong> tres comidas al día (refrigerio mañana, almuerzo, refrigerio tarde).</li>
                      <li><strong>Rico en hierro:</strong> comidas diseñadas para cubrir ~70% de necesidades calóricas y nutrientes, priorizando alimentos ricos en hierro (sangrecita, hígado, pescado, carnes).</li>
                      <li><strong>Seguimiento:</strong> monitoreo de peso, talla y hemoglobina en coordinación con el centro de salud local.</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* SAF */}
              <Card>
                <CardContent className="p-5 flex flex-col gap-3">
                  <span className="bg-secondary/10 text-secondary p-2 rounded-lg w-fit">
                    <House className="size-6" />
                  </span>
                  <h3 className="font-heading text-lg font-bold text-card-foreground">b) Servicio de Acompañamiento a Familias (SAF)</h3>
                  <p className="text-sm text-muted-foreground">Modalidad basada en visitas domiciliarias y sesiones grupales —muy útil en zonas rurales o dispersas—.</p>
                  <div className="text-sm text-muted-foreground flex flex-col gap-1">
                    <p><strong>¿Cómo funciona?</strong> Facilitadores visitan el hogar del niño y la familia para ofrecer consejería práctica.</p>
                    <p><strong>Frecuencia:</strong> visita semanal (~1 hora) y sesiones grupales mensuales para socialización y aprendizaje colectivo.</p>
                  </div>
                  <div className="bg-muted border-l-4 border-secondary p-4 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2 text-foreground">Componente Anemia / Nutrición (Consejería)</h4>
                    <ul className="list-disc pl-4 text-sm text-muted-foreground flex flex-col gap-1">
                      <li><strong>Consejería directa:</strong> demostraciones prácticas de preparación de comidas ricas en hierro.</li>
                      <li><strong>Suplementación:</strong> importancia de micronutrientes (gotas, Nutri-Hierro) y cuándo administrarlos.</li>
                      <li><strong>Identificación de signos:</strong> enseñar a reconocer señales de alarma para búsqueda de atención.</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Temas SAF */}
            <div className="bg-secondary/5 border border-secondary/20 p-4 rounded-xl flex flex-col gap-2">
              <span className="flex items-center gap-2 font-semibold text-foreground">
                <Stethoscope className="size-5 text-secondary" />
                Temas clave en SAF
              </span>
              <ul className="list-disc pl-5 text-sm text-muted-foreground flex flex-col gap-1">
                <li><strong>Nutrición y anemia:</strong> recetas ricas en hierro, demostraciones y suplementación.</li>
                <li><strong>Higiene:</strong> lavado de manos, consumo de agua segura para prevenir diarreas y parasitosis.</li>
                <li><strong>Salud:</strong> cumplimiento del calendario de vacunas y asistencia al CRED para tamizaje y tratamiento.</li>
                <li><strong>Aprendizaje:</strong> actividades de estimulación con materiales locales, juego y comunicación para desarrollo cerebral.</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Relevancia y Sinergias */}
        <Card>
          <CardContent className="p-6 flex flex-col gap-4">
            <span className="bg-primary/10 text-primary p-3 rounded-xl w-fit">
              <BrainCircuit className="size-8" />
            </span>
            <h2 className="font-heading text-xl font-bold text-card-foreground">3.5. Relevancia y Sinergias</h2>
            <p className="text-muted-foreground">
              El estudio del PNCM, y en particular del SAF, es crucial para diseñar tu app porque:
            </p>
            {[
              ["Contenido validado", "el SAF ya tiene un paquete de consejería estructurado y validado por el Estado —tu app puede digitalizar y reforzar este contenido sin \"inventar\" mensajes nuevos."],
              ["Modelo de entrega", "las visitas semanales permiten que la app actúe como un \"facilitador digital\" entre visitas, reforzando mensajes y alcanzando familias no cubiertas."],
              ["Enfoque en la práctica", "SAF enfatiza \"cómo hacerlo\" (demostraciones culinarias). La app puede usar videos cortos, pasos ilustrados y checklists para replicar esas demostraciones."],
              ["Articulación con salud", "Cuna Más complementa al centro de salud; la app debe siempre dirigir al usuario al CRED para diagnóstico y tratamiento médico."],
              ["Población coincidente", "la app y SAF compiten por la atención del mismo usuario: padres/cuidadores de bebés 6–12 meses en situación vulnerable; por eso la información debe ser clara, práctica y accesible."]
            ].map(([title, desc], i) => (
              <div key={i} className="flex items-start gap-3 bg-muted p-4 rounded-xl">
                <span className="bg-primary/20 text-primary size-6 rounded-full flex items-center justify-center shrink-0 text-sm font-bold">{i + 1}</span>
                <div>
                  <p className="font-semibold text-foreground">{title}</p>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
            <div className="w-full rounded-xl overflow-hidden shadow-sm mt-2">
              <iframe
                className="w-full h-64 md:h-96 rounded-xl"
                src="https://www.youtube.com/embed/aXjIVtZX9Ls"
                title="Video Cuna Más"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <Video className="size-4" />
              Video institucional del Programa Nacional Cuna Más
            </p>
          </CardContent>
        </Card>

        {/* Más información */}
        <Card>
          <CardContent className="p-6 flex flex-col gap-4">
            <h2 className="font-heading text-xl font-bold text-card-foreground">Más información</h2>
            <ul className="flex flex-col gap-3">
              {[
                { href: "https://www.facebook.com/MidisCunaMas/", title: "Página oficial de Cuna Más (Facebook)", desc: "Publicaciones, campañas e información oficial del programa." },
                { href: "https://www.gob.pe/cunamas", title: "Portal del Programa Nacional Cuna Más (Gob.pe)", desc: "Documentos normativos, servicios, lineamientos y noticias del PNCM." },
                { href: "https://www.congreso.gob.pe/Docs/comisiones2021/CEM-proteccion-infancia-emergencia-/files/sed-13-exposici%C3%93n-03-minsa-05-12-2023.pdf", title: "Documento técnico MINSA sobre infancia (PDF)", desc: "Presentación oficial del MINSA sobre protección infantil y lineamientos recientes." }
              ].map((item, i) => (
                <li key={i} className="bg-muted p-4 rounded-lg border-l-4 border-primary">
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline flex items-center gap-2">
                    <ExternalLink className="size-4" />
                    {item.title}
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                </li>
              ))}
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
