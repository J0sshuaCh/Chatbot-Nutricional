import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import ReactMarkdown from 'react-markdown'
import { useAuth } from "../lib/AuthContext"
import { supabase } from "../lib/supabaseClient"
import { useBabySelectStore } from "../store/BabySelectStore"
import { cn } from "@/lib/utils"
import PageMeta from "@/components/page-meta"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/Input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User, ArrowLeft, ChevronDown } from "lucide-react"
import { BabyNino } from "@/components/icon/BabyNino"
import { BabyNina } from "@/components/icon/BabyNina"
import { calculateAge } from "@/utils/calculateAge"

export default function ChatbotPage() {
  const { session } = useAuth()
  const { babySelect, setBabySelect } = useBabySelectStore()
  const idBebe = babySelect?.id_bebe
  const [bebes, setBebes] = useState([])
  const [loadingBebes, setLoadingBebes] = useState(true)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const [prompt, setPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "¡Hola! 👋 Soy tu Asistente de Nutrición Materno Infantil (ANMI). ¿En qué puedo ayudarte hoy?",
      sender: "bot"
    }
  ])
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (!session?.user?.id) return
    setLoadingBebes(true)
    supabase
      .from('Bebe')
      .select('id_bebe, name, fecha_nacimiento, genero')
      .eq('id_usuario', session.user.id)
      .order('fecha_nacimiento', { ascending: false })
      .then(({ data }) => {
        setBebes(data ?? [])
        setLoadingBebes(false)
      })
  }, [session])

  useEffect(() => {
    if (!dropdownOpen) return
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [dropdownOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!prompt.trim()) return

    const userMessage = { id: Date.now(), text: prompt, sender: "user" }
    setMessages((prev) => [...prev, userMessage])
    const inputPrompt = prompt
    setPrompt("")
    setIsLoading(true)

    // --- Ensamblar contexto del bebé desde Supabase ---
    let promptTxt = inputPrompt
    if (idBebe) {
      try {
        const { data: bebe } = await supabase
          .from('Bebe')
          .select('name, fecha_nacimiento')
          .eq('id_bebe', idBebe)
          .single()

        const { data: analisis } = await supabase
          .from('Analisis')
          .select('peso, talla, fecha_control')
          .eq('id_bebe', idBebe)
          .order('fecha_control', { ascending: false })
          .limit(1)
          .maybeSingle()

        const { data: alergiasRows } = await supabase
          .from('AlergiaBebe')
          .select('Alergia(descrip_alergia)')
          .eq('id_bebe', idBebe)

        const alergiasTxt = (alergiasRows ?? [])
          .map(x => `- ${x.Alergia?.descrip_alergia ?? ''}`)
          .join('\n')

        promptTxt = [
          'BEBE SELECCIONADO',
          `- nombre: ${bebe?.name ?? ''}`,
          `- fecha_nacimiento: ${bebe?.fecha_nacimiento ?? ''}`,
          '',
          'ANALISIS (último control)',
          `- peso: ${analisis?.peso ?? ''} kg`,
          `- talla: ${analisis?.talla ?? ''} cm`,
          `- fecha: ${analisis?.fecha_control ?? ''}`,
          '',
          'ALERGIAS',
          alergiasTxt || '(sin alergias registradas)',
          '',
          'MENSAJE DEL USUARIO:',
          inputPrompt,
        ].join('\n')
      } catch (e) {
        console.warn('No se pudo obtener contexto del bebé:', e)
      }
    }
    // --- Fin contexto ---

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptTxt,
          userId: session?.user?.id || null,
        }),
      })

      if (!res.ok) {
        throw new Error('La respuesta de la red no fue OK')
      }

      const data = await res.json()
      const botMessage = { id: Date.now() + 1, text: data.text, sender: "bot" }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) => [...prev, { id: Date.now(), text: "Lo siento, hubo un error de conexión.", sender: "bot" }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <PageMeta title="Chatbot" description="Consulta con el asistente nutricional ANMI sobre alimentación y prevención de anemia infantil" />
      <div className="flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-3xl flex flex-col gap-4">
        {/* Sticky back + title */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Volver al inicio"
            nativeButton={false} render={<Link to="/" />}
          >
            <ArrowLeft />
          </Button>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            Chatbot ANMI
          </h1>
        </div>

        {/* Baby selector */}
        {bebes.length > 0 && (
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm hover:bg-accent transition-colors"
            >
              {babySelect?.id_bebe ? (
                <>
                  {babySelect.genero === 'F'
                    ? <BabyNina size={24} className="shrink-0" />
                    : <BabyNino size={24} className="shrink-0" />
                  }
                  <span className="flex-1 text-left font-medium">{babySelect.name}</span>
                  <span className="text-muted-foreground text-xs">{calculateAge(babySelect.fecha_nacimiento)}</span>
                </>
              ) : (
                <span className="flex-1 text-left text-muted-foreground">Seleccionar bebé para contexto</span>
              )}
              <ChevronDown className={`size-4 text-muted-foreground transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {dropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 z-50 rounded-lg border bg-popover shadow-lg overflow-hidden">
                {bebes.map(babe => (
                  <button
                    key={babe.id_bebe}
                    type="button"
                    onClick={() => {
                      setBabySelect(babe)
                      setDropdownOpen(false)
                    }}
                    className={`flex items-center gap-2 w-full px-3 py-2.5 text-sm hover:bg-accent transition-colors ${
                      babySelect?.id_bebe === babe.id_bebe ? 'bg-accent font-medium' : ''
                    }`}
                  >
                    {babe.genero === 'F'
                      ? <BabyNina size={24} className="shrink-0" />
                      : <BabyNino size={24} className="shrink-0" />
                    }
                    <span className="flex-1 text-left">{babe.name}</span>
                    <span className="text-muted-foreground text-xs">{calculateAge(babe.fecha_nacimiento)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Chat card */}
        <Card className="flex flex-col h-[calc(100dvh-280px)] min-h-[400px] md:min-h-[500px]">
          <CardHeader className="border-b">
            <div className="flex items-center gap-2">
              <Bot className="size-5 text-primary" aria-hidden="true" />
              <CardTitle>Asistente Virtual</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col min-h-0 p-0">
            <div className="flex-1 overflow-y-auto min-h-0 px-4 py-4">
              <div className="flex flex-col gap-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex gap-3",
                      msg.sender === "user" && "flex-row-reverse"
                    )}
                  >
                    <Avatar className="size-8 mt-0.5 shrink-0">
                      <AvatarFallback className={cn(
                        msg.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      )}>
                        {msg.sender === "user" ? <User className="size-4" /> : <Bot className="size-4" />}
                      </AvatarFallback>
                    </Avatar>
                    <div className={cn(
                      "rounded-xl px-4 py-3 max-w-[85%] md:max-w-[75%] text-sm leading-relaxed",
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    )}>
                      <ReactMarkdown
                        components={{
                          strong: ({ ...props }) => <span className="font-bold" {...props} />,
                          ul: ({ ...props }) => (
                            <ul className="list-none pl-0 flex flex-col gap-1 [&_ul]:list-disc [&_ul]:pl-5" {...props} />
                          ),
                          ol: ({ ...props }) => <ol className="list-decimal pl-5 flex flex-col gap-1" {...props} />,
                          li: ({ ...props }) => <li className="pl-1" {...props} />,
                          p: ({ ...props }) => <p className="mb-2 last:mb-0" {...props} />
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input form */}
            <form onSubmit={handleSubmit} className="flex gap-2 border-t p-4">
              <Input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Escribe tu pregunta..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !prompt.trim()}>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Enviando
                  </span>
                ) : (
                  <>
                    <Send data-icon="inline-start" />
                    Enviar
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button variant="link" nativeButton={false} render={<Link to="/" />}>
            Volver al Menú Principal
          </Button>
        </div>
      </div>
    </div>
    </>
  )
}
