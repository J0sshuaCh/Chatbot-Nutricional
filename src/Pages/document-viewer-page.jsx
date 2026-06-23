import { useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import PageMeta from "@/components/page-meta"
import { ArrowLeft, Download, ExternalLink, FileText } from "lucide-react"

const documents = [
  {
    slug: "recetario-nutritivo-2014",
    title: "Recetario Nutritivo para Niñas y Niños de 6 a 23 Meses (2014)",
    pdfPath: "/documentos/Recetario Nutritivo para Niñas y Niños de 6 a 23 Meses (2014).pdf",
    description: "Recetario con 30 recetas (purés, mazamorras, segundos) ricas en hierro, clasificadas por edad (6 a 8, 9 a 11 y 12 a 23 meses), del Instituto Nacional de Salud (INS), para la alimentación complementaria y la prevención de la anemia.",
    source: "INS/CENAN",
    date: "2014",
  },
  {
    slug: "guias-alimentarias-2021",
    title: "Guías Alimentarias para Niñas y Niños Menores de 2 Años de Edad (2021)",
    pdfPath: "/documentos/Guías Alimentarias para Niñas y Niños Menores de 2 Años de Edad (2021).pdf",
    description: "Documento que establece principios y 13 recomendaciones clave para una alimentación saludable en niños de 0 a 23 meses, enfatizando la lactancia materna exclusiva, la alimentación complementaria oportuna y la suplementación con hierro.",
    source: "MINSA/INS",
    date: "2021",
  },
  {
    slug: "norma-tecnica-anemia-2024",
    title: "Norma Técnica de Salud: Prevención y Control de la Anemia por Deficiencia de Hierro (2024)",
    pdfPath: "/documentos/Norma Técnica de Salud Prevención y Control de la Anemia por Deficiencia de Hierro (2024).pdf",
    description: "Norma técnica que establece las disposiciones para la prevención, diagnóstico, tratamiento y control de la anemia por deficiencia de hierro en niños, adolescentes, mujeres en edad fértil, gestantes y puérperas.",
    source: "MINSA",
    date: "2024",
  },
  {
    slug: "guias-poblacion-2019",
    title: "Guías Alimentarias para la Población Peruana (2019)",
    pdfPath: "/documentos/Guías Alimentarias para la Población Peruana (2019).pdf",
    description: "Guías que ofrecen 12 mensajes clave para fomentar hábitos de alimentación y estilos de vida saludables en la población peruana mayor de dos años, promoviendo alimentos naturales y reduciendo el consumo de ultra-procesados.",
    source: "INS/CENAN",
    date: "2019",
  },
  {
    slug: "norma-tecnica-anemia-2017",
    title: "Norma Técnica - Manejo Terapéutico y Preventivo de la Anemia (2017)",
    pdfPath: "/documentos/Norma Técnica - Manejo Terapéutico y Preventivo de la Anemia (2017).pdf",
    description: "Versión anterior de la norma técnica (aprobada en 2017 y modificada), que cubre el manejo terapéutico y preventivo de la anemia en niños, adolescentes, mujeres gestantes y puérperas.",
    source: "MINSA",
    date: "2017",
  },
  {
    slug: "rotafolio-suplementacion-hierro",
    title: "Rotafolio: Suplementación con Hierro (Adolescentes)",
    pdfPath: "/documentos/Rotafolio Suplementación con Hierro (Adolescentes).pdf",
    description: "Material educativo (rotafolio) diseñado para adolescentes mujeres, explicando la importancia del hierro, cómo diagnosticar la anemia y los esquemas de suplementación (prevención y tratamiento) con Sulfato Ferroso.",
    source: "MINSA/INS",
    date: "N/A",
  },
  {
    slug: "recetario-reyes-hierro",
    title: "Recetario: Los Reyes del Hierro (Sangrecita y Bazo)",
    pdfPath: "/documentos/Recetario Los Reyes del Hierro (Sangrecita y Bazo).pdf",
    description: "Recetario enfocado en la lucha contra la anemia, promoviendo el consumo de 'La Reina del Hierro: Sangrecita' y 'El Rey del Hierro: Bazo' a través de recetas dulces y saladas como Mousse de Sangrecita y Torrejita de Bazo.",
    source: "INS/CENAN",
    date: "N/A",
  },
  {
    slug: "recetario-quinua-2012",
    title: "Recetario de la Quinua (2012)",
    pdfPath: "/documentos/Recetario de la Quinua (2012).pdf",
    description: "Recetario con 30 preparaciones (entradas y platos de fondo) a base de quinua, destacando su alto valor nutritivo por su aporte de proteínas, aminoácidos y minerales. Las recetas están formuladas para 4 raciones.",
    source: "INS/CENAN",
    date: "2012",
  },
  {
    slug: "recetario-almuerzos-lima-callao",
    title: "Recetario: Almuerzos Familiares Saludables - Lima y Callao (2024)",
    pdfPath: "/documentos/Recetario Almuerzos Familiares Saludables - Lima y Callao (2024).pdf",
    description: "Colección de 25 almuerzos familiares diseñados para 4 miembros, que consisten en un plato principal (con las tres combinaciones básicas), una ensalada de verduras, una fruta y un refresco, con el detalle de su aporte nutricional.",
    source: "INS/CENAN",
    date: "2024",
  },
  {
    slug: "recetario-diversidad-costena",
    title: "Recetario: Diversidad Biológica Costeña (Rico en Hierro) (2021)",
    pdfPath: "/documentos/Recetario Diversidad Biológica Costeña (Rico en Hierro) (2021).pdf",
    description: "Recetario que promueve el consumo de pescado y mariscos de la costa peruana, como anchoveta, bonito y pota, para una alimentación rica en hierro y omega 3.",
    source: "INS/CENAN",
    date: "2021",
  },
  {
    slug: "guia-ops-nino-pequeno",
    title: "Alimentación y Nutrición del Niño Pequeño: Guía para la Capacitación",
    pdfPath: "/documentos/Alimentación y Nutrición del Niño Pequeño Guía para la Capacitación.pdf",
    description: "Guía de la OPS enfocada en la capacitación de profesionales de la salud sobre la alimentación y nutrición del niño pequeño.",
    source: "OPS",
    date: "N/A",
  },
  {
    slug: "estrategia-oms-unicef",
    title: "Estrategia Mundial para la Alimentación del Lactante y del Niño Pequeño (OMS/UNICEF)",
    pdfPath: "/documentos/Estrategia Mundial para la Alimentación del Lactante y del Niño Pequeño (OMSUNICEF).pdf",
    description: "Documento clave de la OMS y UNICEF para mejorar las prácticas de alimentación en el mundo.",
    source: "OMS/UNICEF",
    date: "N/A",
  },
  {
    slug: "informe-seminario-anemia",
    title: "Informe del Seminario: La Anemia Infantil en el Perú",
    pdfPath: "/documentos/Informe del Seminario La Anemia Infantil en el Perú.pdf",
    description: "Documento que resume las discusiones y conclusiones de un seminario sobre la situación de la anemia infantil en Perú.",
    source: "N/A",
    date: "N/A",
  },
]

export default function DocumentViewerPage() {
  const { slug } = useParams()
  const document = documents.find(doc => doc.slug === slug)

  if (!document) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8 flex flex-col gap-4">
            <h1 className="font-heading text-2xl font-bold text-destructive">Documento no encontrado</h1>
            <p className="text-muted-foreground">El recurso solicitado no existe o fue eliminado.</p>
            <Button nativeButton={false} render={<Link to="/biblioteca" />}>
              <ArrowLeft data-icon="inline-start" />
              Volver a la Biblioteca
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <>
      <PageMeta title={document?.title || "Documento"} description={document?.description || "Visualizador de documentos ANMI"} />
      <div className="flex flex-col px-4 py-6">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" aria-label="Volver a biblioteca" nativeButton={false} render={<Link to="/biblioteca" />}>
            <ArrowLeft />
          </Button>
          <h1 className="font-heading text-xl md:text-2xl font-bold text-foreground line-clamp-2">
            {document.title}
          </h1>
        </div>

        {/* Info card */}
        <Card>
          <CardContent className="p-6 flex flex-col gap-3">
            <p className="text-muted-foreground leading-relaxed">{document.description}</p>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{document.source}</Badge>
              <span className="text-xs text-muted-foreground">Publicación: {document.date}</span>
            </div>
          </CardContent>
        </Card>

        {/* PDF viewer */}
        <div className="w-full h-[60dvh] md:h-[70dvh] bg-muted rounded-xl overflow-hidden shadow-lg">
          <object
            data={document.pdfPath}
            type="application/pdf"
            className="w-full h-full"
            aria-label={`Visualizador de ${document.title}`}
          >
            <div className="flex items-center justify-center h-full p-8">
              <p className="text-muted-foreground text-center">
                Tu navegador no soporta la visualización de PDFs incrustados.
                Por favor, usa el botón de descarga o intenta abrirlo en otra pestaña.
              </p>
            </div>
          </object>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center flex-wrap gap-4">
          <a href={document.pdfPath} download={document.slug + ".pdf"}>
            <Button variant="default">
              <Download data-icon="inline-start" />
              Descargar Documento
            </Button>
          </a>
          <a href={document.pdfPath} target="_blank" rel="noopener noreferrer">
            <Button variant="outline">
              <ExternalLink data-icon="inline-start" />
              Abrir en nueva pestaña
            </Button>
          </a>
        </div>

        <div className="flex justify-center">
          <Button variant="link" nativeButton={false} render={<Link to="/biblioteca" />}>
            <ArrowLeft data-icon="inline-start" />
            Volver a la lista
          </Button>
        </div>
      </div>
    </div>
    </>
  )
}
