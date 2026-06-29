import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../lib/AuthContext"
import { useTheme } from "../lib/ThemeContext"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Moon, Sun, ChevronDown, ChevronUp } from "lucide-react"

export default function Header() {
  const { session } = useAuth()
  const { dark, toggle } = useTheme()
  const [showWarning, setShowWarning] = useState(false)

  return (
    <header className="flex flex-col items-center text-center pt-2 pb-2 px-4">
      <div className="w-full max-w-5xl flex items-center justify-between mb-2">
        <Button
          variant="outline"
          size="sm"
          aria-label={dark ? "Activar modo claro" : "Activar modo oscuro"}
          onClick={toggle}
          className="gap-2"
        >
          {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          <span className="text-xs">{dark ? "Claro" : "Oscuro"}</span>
        </Button>
        <Link
          to={session ? "/mi-perfil" : "/login"}
          className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          {session && (
            <Avatar className="size-7">
              <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                {session.user?.email?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          )}
          {session ? "Mi Perfil" : "Iniciar Sesión"}
        </Link>
      </div>

      <Link to="/" className="flex flex-col items-center">
        <img
          src="/android-chrome-192x192.png"
          alt="ANMI Logo"
          className="size-20 mb-2"
        />
        <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
          ANMI
        </h1>
      </Link>

      <p className="text-base md:text-lg text-muted-foreground max-w-md mt-1">
        Asistente Nutricional Materno Infantil
      </p>

      <button
        onClick={() => setShowWarning(!showWarning)}
        className="mt-2 bg-muted border-l-4 border-accent rounded-r-lg px-4 py-3 max-w-lg w-full text-left text-xs md:text-sm text-muted-foreground hover:bg-muted/80 transition-colors cursor-pointer"
        aria-expanded={showWarning}
      >
        <div className="flex items-center justify-between gap-2">
          <strong className="text-foreground">Importante</strong>
          {showWarning ? <ChevronUp className="size-4 shrink-0" /> : <ChevronDown className="size-4 shrink-0" />}
        </div>
        {showWarning && (
          <p className="mt-2 leading-relaxed">
            Esta es una herramienta informativa y educativa.
            La información proporcionada NO sustituye la consulta con un profesional de la salud.
          </p>
        )}
      </button>
    </header>
  )
}
