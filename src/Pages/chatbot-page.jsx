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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, ArrowLeft, ChevronDown, Plus, Trash2, MessageSquare, X } from "lucide-react"
import { BabyNino } from "@/components/icon/BabyNino"
import { BabyNina } from "@/components/icon/BabyNina"
import { calculateAge } from "@/utils/calculateAge"
import {
  createSession,
  getSessions,
  renameSession,
  deleteSession,
  getMessages,
  saveMessage,
} from "../services/chat.service"

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
  const [sessions, setSessions] = useState([])
  const [activeSessionId, setActiveSessionId] = useState(null)
  const [showSessions, setShowSessions] = useState(false)
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

  useEffect(() => {
    if (!session?.user?.id) {
      setSessions([])
      setActiveSessionId(null)
      return
    }

    let cancelled = false

    async function loadSessions() {
      const userSessions = await getSessions(session.user.id)
      if (cancelled) return

      if (userSessions.length > 0) {
        setSessions(userSessions)
        setActiveSessionId(userSessions[0].id_session)
        const msgs = await getMessages(userSessions[0].id_session)
        if (!cancelled && msgs.length > 0) {
          setMessages(msgs.map(m => ({
            id: m.id_chat,
            text: m.content,
            sender: m.role,
          })))
        }
      } else {
        const newSession = await createSession(session.user.id)
        if (!cancelled) {
          setSessions([newSession])
          setActiveSessionId(newSession.id_session)
        }
      }
    }

    loadSessions()
    return () => { cancelled = true }
  }, [session?.user?.id])

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

      if (session?.user?.id && activeSessionId) {
        await saveMessage(activeSessionId, session.user.id, 'user', inputPrompt)
        await saveMessage(activeSessionId, session.user.id, 'assistant', data.text)

        const currentSession = sessions.find(s => s.id_session === activeSessionId)
        if (currentSession?.title === 'Nueva conversación') {
          const newTitle = inputPrompt.slice(0, 60) + (inputPrompt.length > 60 ? '...' : '')
          const updated = await renameSession(activeSessionId, newTitle)
          if (updated) {
            setSessions(prev => prev.map(s => s.id_session === activeSessionId ? updated : s))
          }
        }
      }
    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) => [...prev, { id: Date.now(), text: "Lo siento, hubo un error de conexión.", sender: "bot" }])
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSessionSelect(sessionId) {
    setActiveSessionId(sessionId)
    const msgs = await getMessages(sessionId)
    if (msgs.length > 0) {
      setMessages(msgs.map(m => ({
        id: m.id_chat,
        text: m.content,
        sender: m.role,
      })))
    } else {
      setMessages([{ id: 1, text: "¡Hola! 👋 Soy tu Asistente de Nutrición Materno Infantil (ANMI). ¿En qué puedo ayudarte hoy?", sender: "bot" }])
    }
    if (window.innerWidth < 768) {
      setShowSessions(false)
    }
  }

  async function handleNewSession() {
    if (!session?.user?.id) return
    const newSession = await createSession(session.user.id)
    setSessions(prev => [newSession, ...prev])
    setActiveSessionId(newSession.id_session)
    setMessages([{ id: 1, text: "¡Hola! 👋 Soy tu Asistente de Nutrición Materno Infantil (ANMI). ¿En qué puedo ayudarte hoy?", sender: "bot" }])
    if (window.innerWidth < 768) {
      setShowSessions(false)
    }
  }

  async function handleDeleteSession(sessionId) {
    if (!confirm('¿Eliminar esta conversación?')) return
    await deleteSession(sessionId)
    setSessions(prev => prev.filter(s => s.id_session !== sessionId))
    if (activeSessionId === sessionId) {
      const remaining = sessions.filter(s => s.id_session !== sessionId)
      if (remaining.length > 0) {
        handleSessionSelect(remaining[0].id_session)
      } else if (session?.user?.id) {
        handleNewSession()
      } else {
        setActiveSessionId(null)
        setMessages([{ id: 1, text: "¡Hola! 👋 Soy tu Asistente de Nutrición Materno Infantil (ANMI). ¿En qué puedo ayudarte hoy?", sender: "bot" }])
      }
    }
  }

  return (
    <>
      <PageMeta title="Chatbot" description="Consulta con el asistente nutricional ANMI sobre alimentación y prevención de anemia infantil" />

      {/* Mobile sessions overlay */}
      {session?.user?.id && showSessions && (
        <div className="fixed inset-0 z-50 bg-background flex flex-col md:hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="font-semibold">Conversaciones</h2>
            <Button variant="ghost" size="icon" onClick={() => setShowSessions(false)}>
              <X className="size-5" />
            </Button>
          </div>
          <div className="p-3">
            <Button variant="outline" className="w-full justify-start gap-2" onClick={handleNewSession}>
              <Plus className="size-4" />
              Nueva conversación
            </Button>
          </div>
          <ScrollArea className="flex-1">
            <div className="flex flex-col gap-1 p-2">
              {sessions.map(s => (
                <div
                  key={s.id_session}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-colors group",
                    s.id_session === activeSessionId
                      ? "bg-accent font-medium"
                      : "hover:bg-accent/50"
                  )}
                  onClick={() => handleSessionSelect(s.id_session)}
                >
                  <MessageSquare className="size-4 shrink-0 text-muted-foreground" />
                  <span className="flex-1 truncate">{s.title}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDeleteSession(s.id_session) }}
                    className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity"
                    aria-label="Eliminar conversación"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      <div className="flex flex-col items-center px-4 py-6">
      <div className={cn("w-full flex flex-col gap-4 transition-all", showSessions && session?.user?.id ? "max-w-5xl" : "max-w-3xl")}>
        {/* Sticky back + title + sessions toggle */}
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
          {session?.user?.id && (
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto"
              onClick={() => setShowSessions(!showSessions)}
              aria-label="Conversaciones"
            >
              <MessageSquare className="size-5" />
            </Button>
          )}
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

        {/* Chat area with optional desktop sidebar */}
        <div className="flex gap-4">
          {session?.user?.id && showSessions && (
            <div className="hidden md:flex w-72 shrink-0 flex-col rounded-lg border bg-card">
              <div className="flex items-center justify-between p-3 border-b">
                <h2 className="font-semibold text-sm">Conversaciones</h2>
              </div>
              <div className="p-2">
                <Button variant="ghost" className="w-full justify-start gap-2 text-sm" onClick={handleNewSession}>
                  <Plus className="size-4" />
                  Nueva conversación
                </Button>
              </div>
              <ScrollArea className="flex-1">
                <div className="flex flex-col gap-1 p-2 pt-0">
                  {sessions.map(s => (
                    <div
                      key={s.id_session}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md text-sm cursor-pointer transition-colors group",
                        s.id_session === activeSessionId
                          ? "bg-accent font-medium"
                          : "hover:bg-accent/50"
                      )}
                      onClick={() => handleSessionSelect(s.id_session)}
                    >
                      <MessageSquare className="size-4 shrink-0 text-muted-foreground" />
                      <span className="flex-1 truncate">{s.title}</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDeleteSession(s.id_session) }}
                        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity"
                        aria-label="Eliminar conversación"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

        {/* Chat card */}
        <Card className="flex-1 flex flex-col h-[calc(100dvh-280px)] min-h-[400px] md:min-h-[500px]">
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
        </div>

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
