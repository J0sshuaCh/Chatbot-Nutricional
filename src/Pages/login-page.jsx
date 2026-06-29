import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import PageMeta from "@/components/page-meta"
import { LogIn, ArrowLeft } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
      navigate('/mi-perfil')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PageMeta title="Iniciar Sesión" description="Accede a tu cuenta en ANMI para gestionar tu perfil, bebés y alergias" />
      <div className="flex flex-col items-center justify-start min-h-[calc(100dvh-120px)] px-4 py-2 md:py-4">
        <div className="w-full max-w-md flex flex-col gap-6">
          <div className="text-center flex flex-col items-center gap-3">
            <div className="size-16 rounded-xl bg-primary/10 flex items-center justify-center">
              <LogIn className="size-8 text-primary" />
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold text-foreground">Iniciar Sesión</h1>
              <p className="text-sm text-muted-foreground mt-1">Ingresa con tu cuenta para acceder a tu perfil</p>
            </div>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-6 flex flex-col gap-4">
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Entrando...
                    </span>
                  ) : (
                    <>
                      <LogIn data-icon="inline-start" />
                      Entrar
                    </>
                  )}
                </Button>
              </form>

              <div className="flex flex-col items-center gap-3 pt-2 border-t">
                <p className="text-sm text-muted-foreground">
                  ¿No tienes cuenta?{' '}
                  <Link to="/register" className="text-primary hover:text-primary/80 font-medium">
                    Registrarse
                  </Link>
                </p>
                <Button variant="link" nativeButton={false} render={<Link to="/" />}>
                  <ArrowLeft data-icon="inline-start" />
                  Volver al Menú Principal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
