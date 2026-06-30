import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/badge"
import PageMeta from "@/components/page-meta"
import { ArrowLeft, Search, FileText, ExternalLink } from "lucide-react"

const documents = [
  {
    slug: "recetario-nutritivo-2014",
    title: "Recetario Nutritivo para Niñas y Niños de 6 a 23 Meses (2014)",
    pdfPath: "/documentos/Recetario Nutritivo para Niñas y Niños de 6 a 23 Meses (2014).pdf",
    description: "Recetario con 30 recetas (purés, mazamorras, segundos) ricas en hierro, clasificadas por edad (6 a 8, 9 a 11 y 12 a 23 meses), del Instituto Nacional de Salud (INS), para la alimentación complementaria y la prevención de la anemia.",
    source: "INS/CENAN",
    date: "2014",
    previewImg: "/previews/1.png",
  },
  {
    slug: "guias-alimentarias-2021",
    title: "Guías Alimentarias para Niñas y Niños Menores de 2 Años de Edad (2021)",
    pdfPath: "/documentos/Guías Alimentarias para Niñas y Niños Menores de 2 Años de Edad (2021).pdf",
    description: "Documento que establece principios y 13 recomendaciones clave para una alimentación saludable en niños de 0 a 23 meses, enfatizando la lactancia materna exclusiva, la alimentación complementaria oportuna y la suplementación con hierro.",
    source: "MINSA/INS",
    date: "2021",
    previewImg: "/previews/2.png",
  },
  {
    slug: "norma-tecnica-anemia-2024",
    title: "Norma Técnica de Salud: Prevención y Control de la Anemia por Deficiencia de Hierro (2024)",
    pdfPath: "/documentos/Norma Técnica de Salud Prevención y Control de la Anemia por Deficiencia de Hierro (2024).pdf",
    description: "Norma técnica que establece las disposiciones para la prevención, diagnóstico, tratamiento y control de la anemia por deficiencia de hierro en niños, adolescentes, mujeres en edad fértil, gestantes y puérperas.",
    source: "MINSA",
    date: "2024",
    previewImg: "/previews/3.png",
  },
  {
    slug: "guias-poblacion-2019",
    title: "Guías Alimentarias para la Población Peruana (2019)",
    pdfPath: "/documentos/Guías Alimentarias para la Población Peruana (2019).pdf",
    description: "Guías que ofrecen 12 mensajes clave para fomentar hábitos de alimentación y estilos de vida saludables en la población peruana mayor de dos años, promoviendo alimentos naturales y reduciendo el consumo de ultra-procesados.",
    source: "INS/CENAN",
    date: "2019",
    previewImg: "/previews/4.png",
  },
  {
    slug: "norma-tecnica-anemia-2017",
    title: "Norma Técnica - Manejo Terapéutico y Preventivo de la Anemia (2017)",
    pdfPath: "/documentos/Norma Técnica - Manejo Terapéutico y Preventivo de la Anemia (2017).pdf",
    description: "Versión anterior de la norma técnica (aprobada en 2017 y modificada), que cubre el manejo terapéutico y preventivo de la anemia en niños, adolescentes, mujeres gestantes y puérperas.",
    source: "MINSA",
    date: "2017",
    previewImg: "/previews/5.png",
  },
  {
    slug: "rotafolio-suplementacion-hierro",
    title: "Rotafolio: Suplementación con Hierro (Adolescentes)",
    pdfPath: "/documentos/Rotafolio: Suplementación con Hierro (Adolescentes).pdf",
    description: "Material educativo (rotafolio) diseñado para adolescentes mujeres, explicando la importancia del hierro, cómo diagnosticar la anemia y los esquemas de suplementación (prevención y tratamiento) con Sulfato Ferroso.",
    source: "MINSA/INS",
    date: "N/A",
    previewImg: "/previews/6.png",
  },
  {
    slug: "recetario-reyes-hierro",
    title: "Recetario: Los Reyes del Hierro (Sangrecita y Bazo)",
    pdfPath: "/documentos/Recetario: Los Reyes del Hierro (Sangrecita y Bazo).pdf",
    description: "Recetario enfocado en la lucha contra la anemia, promoviendo el consumo de 'La Reina del Hierro: Sangrecita' y 'El Rey del Hierro: Bazo' a través de recetas dulces y saladas como Mousse de Sangrecita y Torrejita de Bazo.",
    source: "INS/CENAN",
    date: "N/A",
    previewImg: "/previews/7.png",
  },
  {
    slug: "recetario-quinua-2012",
    title: "Recetario de la Quinua (2012)",
    pdfPath: "/documentos/Recetario de la Quinua (2012).pdf",
    description: "Recetario con 30 preparaciones (entradas y platos de fondo) a base de quinua, destacando su alto valor nutritivo por su aporte de proteínas, aminoácidos y minerales. Las recetas están formuladas para 4 raciones.",
    source: "INS/CENAN",
    date: "2012",
    previewImg: "/previews/8.png",
  },
  {
    slug: "recetario-almuerzos-lima-callao",
    title: "Recetario: Almuerzos Familiares Saludables - Lima y Callao (2024)",
    pdfPath: "/documentos/Recetario: Almuerzos Familiares Saludables - Lima y Callao (2024).pdf",
    description: "Colección de 25 almuerzos familiares diseñados para 4 miembros, que consisten en un plato principal (con las tres combinaciones básicas), una ensalada de verduras, una fruta y un refresco, con el detalle de su aporte nutricional.",
    source: "INS/CENAN",
    date: "2024",
    previewImg: "/previews/9.png",
  },
  {
    slug: "recetario-diversidad-costena",
    title: "Recetario: Diversidad Biológica Costeña (Rico en Hierro) (2021)",
    pdfPath: "/documentos/Recetario: Diversidad Biológica Costeña (Rico en Hierro) (2021).pdf",
    description: "Recetario que promueve el consumo de pescado y mariscos de la costa peruana, como anchoveta, bonito y pota, para una alimentación rica en hierro y omega 3. Incluye 34 recetas (para 4 raciones) y consejos de salubridad y conservación.",
    source: "INS/CENAN",
    date: "2021",
    previewImg: "/previews/10.png",
  },
  {
    slug: "guia-ops-nino-pequeno",
    title: "Alimentación y Nutrición del Niño Pequeño: Guía para la Capacitación",
    pdfPath: "/documentos/Alimentación y Nutrición del Niño Pequeño: Guía para la Capacitación.pdf",
    description: "Guía de la Organización Panamericana de la Salud (OPS) enfocada en la capacitación de profesionales de la salud sobre la alimentación y nutrición del niño pequeño. Aborda temas como la lactancia materna, la alimentación complementaria, el crecimiento infantil, la prevención de la anemia, y el manejo de enfermedades comunes.",
    source: "OPS",
    date: "N/A",
    previewImg: "/previews/11.png",
  },
  {
    slug: "estrategia-oms-unicef",
    title: "Estrategia Mundial para la Alimentación del Lactante y del Niño Pequeño (OMS/UNICEF)",
    pdfPath: "/documentos/Estrategia Mundial para la Alimentación del Lactante y del Niño Pequeño (OMS/UNICEF).pdf",
    description: "Documento clave de la Organización Mundial de la Salud (OMS) y UNICEF que presenta una estrategia mundial para mejorar las prácticas de alimentación en el mundo, estableciendo como meta la lactancia materna exclusiva durante los primeros seis meses de vida, seguida de la introducción de alimentos complementarios nutritivos hasta los dos años o más.",
    source: "OMS/UNICEF",
    date: "N/A",
    previewImg: "/previews/12.png",
  },
  {
    slug: "informe-seminario-anemia",
    title: "Informe del Seminario: La Anemia Infantil en el Perú",
    pdfPath: "/documentos/Informe del Seminario: La Anemia Infantil en el Perú.pdf",
    description: "Documento que resume las discusiones y conclusiones de un seminario sobre la situación de la anemia infantil en Perú, analizando la magnitud del problema, las intervenciones de prevención y control implementadas en el país, y formulando recomendaciones para un abordaje multisectorial efectivo.",
    source: "N/A",
    date: "N/A",
    previewImg: "/previews/13.png",
  },
]

export default function BibliotecaPage() {
  const [search, setSearch] = useState("")

  const filtered = documents.filter((doc) =>
    doc.title.toLowerCase().includes(search.toLowerCase()) ||
    doc.description.toLowerCase().includes(search.toLowerCase()) ||
    doc.source.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <PageMeta title="Biblioteca" description="Documentos y guías oficiales sobre nutrición infantil, anemia y alimentación complementaria en el Perú" />
      <div className="flex flex-col px-4 py-6">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" aria-label="Volver al inicio" nativeButton={false} render={<Link to="/" />}>
            <ArrowLeft />
          </Button>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            Biblioteca de Documentos
          </h1>
        </div>

        {/* Intro card */}
        <Card>
          <CardContent className="p-6 flex flex-col gap-3">
            <p className="text-muted-foreground">
              Documentos y guías oficiales del Instituto Nacional de Salud (INS) y el Ministerio de Salud (MINSA).
            </p>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar documentos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardContent>
        </Card>

        {/* Document grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((doc) => (
            <Link key={doc.slug} to={`/biblioteca/${doc.slug}`} className="block group">
              <Card className="overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1 h-full">
                <div className="h-40 overflow-hidden bg-muted">
                  <img
                    src={doc.previewImg}
                    alt={`Preview de ${doc.title}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = "https://via.placeholder.com/600x400?text=PDF+Preview"
                    }}
                  />
                </div>
                <CardContent className="p-5 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <FileText className="size-4 text-primary shrink-0" />
                    <Badge variant="secondary" className="text-xs">{doc.source}</Badge>
                    <span className="text-xs text-muted-foreground">{doc.date}</span>
                  </div>
                  <h3 className="font-heading font-bold text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {doc.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {doc.description}
                  </p>
                  <span className="text-sm font-semibold text-primary group-hover:text-primary/80 flex items-center gap-1 mt-auto pt-2">
                    Ver documento <ExternalLink className="size-3" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-16 text-muted-foreground">
            <Search className="size-12 text-muted-foreground/30" />
            <p className="text-lg font-medium">Sin resultados</p>
            <p className="text-sm">No se encontraron documentos con ese criterio de búsqueda.</p>
          </div>
        )}

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
