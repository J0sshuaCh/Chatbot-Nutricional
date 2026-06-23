import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import PageMeta from "@/components/page-meta"
import { ArrowLeft, Download, ExternalLink, FileText } from "lucide-react"

const document = {
  slug: "manifiesto-privacidad",
  title: "Manifiesto de Privacidad ANMI",
  pdfPath: "/documentos/manifiesto-privacidad.pdf",
  source: "Proyecto ANMI",
  date: "Noviembre 2025 (Prototipo)",
  description: "Este documento detalla cómo la aplicación ANMI maneja los datos, la privacidad de las consultas al chatbot y los términos de uso de la plataforma educativa."
}

export default function PrivacidadViewerPage() {
  return (
    <>
      <PageMeta title={document.title} description={document.description} />
      <div className="flex flex-col px-4 py-6">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" aria-label="Volver a configuración" nativeButton={false} render={<Link to="/configuracion" />}>
            <ArrowLeft />
          </Button>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            {document.title}
          </h1>
        </div>

        <Card>
          <CardContent className="p-6 flex flex-col gap-3">
            <span className="bg-primary/10 text-primary p-3 rounded-xl w-fit">
              <FileText className="size-8" />
            </span>
            <p className="text-muted-foreground leading-relaxed">
              {document.description}
            </p>
            <div className="text-sm text-muted-foreground/70">
              Fuente: {document.source} | Publicación: {document.date}
            </div>
          </CardContent>
        </Card>

        <Card className="p-0 overflow-hidden">
          <object
            data={document.pdfPath}
            type="application/pdf"
            className="w-full h-[70vh]"
            aria-label={`Visualizador de ${document.title}`}
          >
            <div className="p-6 text-center text-muted-foreground">
              Tu navegador no soporta la visualización de PDFs incrustados.
              Por favor, usa el botón de descarga o intenta abrirlo en otra pestaña.
            </div>
          </object>
        </Card>

        <div className="flex justify-center flex-wrap gap-3">
          <a
            href={document.pdfPath}
            download={document.slug + ".pdf"}
          >
            <Button>
              <Download />
              Descargar Documento
            </Button>
          </a>
          <a
            href={document.pdfPath}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary">
              <ExternalLink />
              Abrir en nueva pestaña
            </Button>
          </a>
        </div>

        <div className="flex justify-center">
          <Button variant="link" nativeButton={false} render={<Link to="/configuracion" />}>
            <ArrowLeft data-icon="inline-start" />
            Volver a Configuración
          </Button>
        </div>
      </div>
    </div>
    </>
  )
}
