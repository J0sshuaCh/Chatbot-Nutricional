import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import PageMeta from "@/components/page-meta"
import { useTheme } from "../lib/ThemeContext"
import { ArrowLeft, Download, Trash2, Shield, Smartphone, SunMoon, Sun, Moon } from "lucide-react"

export default function Configuracion() {
  const { dark, toggle } = useTheme()
  const [installPrompt, setInstallPrompt] = useState(null)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      window._anmiInstallPrompt = e
      setInstallPrompt(e)
    }

    if (window._anmiInstallPrompt) {
      setInstallPrompt(window._anmiInstallPrompt)
    }

    window.addEventListener("beforeinstallprompt", handler)
    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const handleInstall = async () => {
    if (installPrompt) {
      installPrompt.prompt()
      await installPrompt.userChoice
      window._anmiInstallPrompt = null
      setInstallPrompt(null)
      return
    }

    if (window.matchMedia("(display-mode: standalone)").matches) {
      alert("La aplicación ya está instalada en tu dispositivo.")
      return
    }

    if (navigator.standalone) {
      alert("La aplicación ya está instalada.")
      return
    }

    alert(
      "Tu dispositivo no permite solicitar la instalación automáticamente. " +
      "Puedes instalarla manualmente desde el menú del navegador (⋮ > Instalar aplicación)."
    )
  }

  const handleClearCache = async () => {
    try {
      const names = await caches.keys()
      await Promise.all(names.map(name => caches.delete(name)))
      alert("La caché ha sido eliminada completamente.")
    } catch (error) {
      console.error("Error al eliminar la caché:", error)
      alert("Error: No se pudo eliminar la caché.")
    }
  }

  const settings = [
    {
      icon: Smartphone,
      title: "Instalar App",
      description: "Añade ANMI a tu dispositivo para acceso rápido y sin navegador.",
      onClick: handleInstall,
    },
    {
      icon: Trash2,
      title: "Eliminar caché",
      description: "Borra datos guardados y fuerza una actualización completa.",
      onClick: handleClearCache,
    },
    {
      icon: Shield,
      title: "Manifiesto de Privacidad",
      description: "Aprende cómo protegemos tus datos y cómo funciona la información.",
      onClick: null,
      to: "/privacidad-viewer",
    },
  ]

  return (
    <>
      <PageMeta title="Configuración" description="Personaliza la aplicación ANMI, administra datos y privacidad" />
      <div className="flex flex-col px-4 py-6">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" aria-label="Volver al inicio" nativeButton={false} render={<Link to="/" />}>
            <ArrowLeft />
          </Button>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            Configuración
          </h1>
        </div>

        {/* Intro card */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-xl">Configuración y Privacidad</CardTitle>
            <CardDescription>
              Ajustes de tu aplicación ANMI — configura opciones del sistema o instala la app en tu dispositivo.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Theme selector */}
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SunMoon className="size-8 text-primary" />
              <div>
                <CardTitle className="font-heading">Apariencia</CardTitle>
                <CardDescription>
                  {dark ? "Modo oscuro activado" : "Modo claro activado"}
                </CardDescription>
              </div>
            </div>
            <Button
              variant={dark ? "default" : "outline"}
              size="sm"
              onClick={toggle}
              className="gap-2 min-w-[120px]"
            >
              {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
              {dark ? "Modo claro" : "Modo oscuro"}
            </Button>
          </CardContent>
        </Card>

        {/* Options grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {settings.map((item, idx) => (
            item.to ? (
              <Link key={idx} to={item.to} className="block group">
                <Card className="transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1 cursor-pointer h-full">
                  <CardContent className="p-6 flex flex-col gap-3">
                    <item.icon className="size-8 text-primary" />
                    <CardTitle className="font-heading">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ) : (
              <Card
                key={idx}
                className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                onClick={item.onClick}
              >
                <CardContent className="p-6 flex flex-col gap-3">
                  <item.icon className="size-8 text-primary" />
                  <CardTitle className="font-heading">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
              </Card>
            )
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
