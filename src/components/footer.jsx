import { Separator } from "@/components/ui/separator"

export default function Footer() {
  return (
    <footer className="mt-12 px-4 pb-6">
      <Separator className="max-w-5xl mx-auto mb-4" />
      <div className="max-w-5xl mx-auto text-center text-xs md:text-sm text-muted-foreground flex flex-col gap-1">
        <p><strong className="text-foreground">Proyecto de ayuda social</strong></p>
        <p>Versión Prototipo 0.1 — Mayo 2026</p>
        <p>Desarrollado con base en las normativas del MINSA y principios de privacidad de datos</p>
      </div>
    </footer>
  )
}
