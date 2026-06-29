import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import { getBebes, createBebe, deleteBebe } from '../services/bebe.service'
import { getAlergias, createAlergia, deleteAlergia } from '../services/alergia.service'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import PageMeta from "@/components/page-meta"
import { User, Baby, AlertTriangle, LogOut, ArrowLeft, Plus, Trash2 } from 'lucide-react'

export default function MiPerfilPage() {
  const { user, session, signOut } = useAuth()
  const navigate = useNavigate()

  const [bebes, setBebes] = useState([])
  const [alergias, setAlergias] = useState([])
  const [newBebeName, setNewBebeName] = useState('')
  const [newBebeDate, setNewBebeDate] = useState('')
  const [newAlergia, setNewAlergia] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!session) return
    loadData()
  }, [session])

  const loadData = async () => {
    try {
      const [bebesData, alergiasData] = await Promise.all([
        getBebes(),
        getAlergias(),
      ])
      setBebes(bebesData)
      setAlergias(alergiasData)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleAddBebe = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await createBebe({ name: newBebeName, fecha_nacimiento: newBebeDate })
      setNewBebeName('')
      setNewBebeDate('')
      loadData()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDeleteBebe = async (id) => {
    if (!confirm('¿Eliminar este bebé y todos sus datos?')) return
    try {
      await deleteBebe(id)
      loadData()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleAddAlergia = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await createAlergia({ descrip_alergia: newAlergia })
      setNewAlergia('')
      loadData()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDeleteAlergia = async (id) => {
    try {
      await deleteAlergia(id)
      loadData()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleLogout = async () => {
    await signOut()
    navigate('/')
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <User className="size-12 mx-auto text-muted-foreground" />
            <CardTitle className="font-heading text-2xl">Mi Perfil</CardTitle>
            <CardDescription>Inicia sesión para ver tu perfil.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Button nativeButton={false} render={<Link to="/login" />}>
              Iniciar Sesión
            </Button>
            <Button variant="link" nativeButton={false} render={<Link to="/" />}>
              <ArrowLeft data-icon="inline-start" />
              Volver al Menú Principal
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <>
      <PageMeta title="Mi Perfil" description="Gestiona tu perfil, bebés registrados y alergias alimentarias en ANMI" />
      <div className="flex flex-col px-4 py-6">
      <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
        {/* Back + title */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" aria-label="Volver al inicio" nativeButton={false} render={<Link to="/" />}>
            <ArrowLeft />
          </Button>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            Mi Perfil
          </h1>
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Profile card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="size-14">
                <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                  {user?.email?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="font-heading">Mi Cuenta</CardTitle>
                <CardDescription>{user?.email}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut data-icon="inline-start" />
              Cerrar Sesión
            </Button>
          </CardContent>
        </Card>

        {/* Babies card */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading flex items-center gap-2">
              <Baby className="size-5 text-primary" />
              Mis Bebés
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {bebes.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-8 text-muted-foreground">
                <Baby className="size-10 text-muted-foreground/30" />
                <p className="font-medium">No hay bebés registrados</p>
                <p className="text-xs">Agrega un bebé para recibir recomendaciones personalizadas.</p>
              </div>
            ) : (
              <ul className="flex flex-col gap-2">
                {bebes.map((b) => (
                  <li key={b.id_bebe} className="flex items-center justify-between bg-muted p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Baby className="size-4 text-primary" />
                      <span className="font-medium text-sm">{b.name}</span>
                      <span className="text-muted-foreground text-xs">
                        Nac: {b.fecha_nacimiento}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Eliminar bebé ${b.nombre_bebe}`}
                      onClick={() => handleDeleteBebe(b.id_bebe)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}

            <form onSubmit={handleAddBebe} className="flex flex-col sm:flex-row gap-2">
              <Input
                type="text"
                value={newBebeName}
                onChange={(e) => setNewBebeName(e.target.value)}
                placeholder="Nombre del bebé"
                required
                className="flex-1"
              />
              <Input
                type="date"
                value={newBebeDate}
                onChange={(e) => setNewBebeDate(e.target.value)}
                required
              />
              <Button type="submit">
                <Plus data-icon="inline-start" />
                Agregar
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Allergies card */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading flex items-center gap-2">
              <AlertTriangle className="size-5 text-secondary" />
              Mis Alergias
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {alergias.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-8 text-muted-foreground">
                <AlertTriangle className="size-10 text-muted-foreground/30" />
                <p className="font-medium">No hay alergias registradas</p>
                <p className="text-xs">Agrega las alergias de tu bebé para recibir alertas.</p>
              </div>
            ) : (
              <ul className="flex flex-col gap-2">
                {alergias.map((a) => (
                  <li key={a.id_alergia} className="flex items-center justify-between bg-muted p-3 rounded-lg">
                    <span className="font-medium text-sm">{a.descrip_alergia}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Eliminar alergia ${a.descrip_alergia}`}
                      onClick={() => handleDeleteAlergia(a.id_alergia)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}

            <form onSubmit={handleAddAlergia} className="flex gap-2">
              <Input
                type="text"
                value={newAlergia}
                onChange={(e) => setNewAlergia(e.target.value)}
                placeholder="Ej: Lactosa, gluten..."
                required
                className="flex-1"
              />
              <Button type="submit">
                <Plus data-icon="inline-start" />
                Agregar
              </Button>
            </form>
          </CardContent>
        </Card>

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
