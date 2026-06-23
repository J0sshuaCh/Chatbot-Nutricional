import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import { getBebes, createBebe, deleteBebe } from '../services/bebe.service'
import { getAlergias, createAlergia, deleteAlergia } from '../services/alergia.service'

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
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Mi Perfil</h1>
          <p className="text-gray-600 mb-6">Inicia sesión para ver tu perfil.</p>
          <Link
            to="/login"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all"
          >
            Iniciar Sesión
          </Link>
          <br />
          <Link to="/" className="inline-block mt-4 text-indigo-600 hover:text-indigo-800">
            Volver al Menú Principal
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Mi Perfil</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <div className="mb-6">
            <p className="text-gray-700">
              <span className="font-medium">Email:</span> {user?.email}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all"
          >
            Cerrar Sesión
          </button>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Mis Bebés</h2>

          {bebes.length === 0 ? (
            <p className="text-gray-500 mb-4">No hay bebés registrados.</p>
          ) : (
            <ul className="space-y-2 mb-4">
              {bebes.map((b) => (
                <li key={b.id_bebe} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div>
                    <span className="font-medium">{b.name}</span>
                    <span className="text-gray-500 text-sm ml-2">
                      Nac: {b.fecha_nacimiento}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteBebe(b.id_bebe)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}

          <form onSubmit={handleAddBebe} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={newBebeName}
              onChange={(e) => setNewBebeName(e.target.value)}
              placeholder="Nombre del bebé"
              className="flex-1 p-2 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-indigo-500"
              required
            />
            <input
              type="date"
              value={newBebeDate}
              onChange={(e) => setNewBebeDate(e.target.value)}
              className="p-2 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-indigo-500"
              required
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all"
            >
              Agregar
            </button>
          </form>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Mis Alergias</h2>

          {alergias.length === 0 ? (
            <p className="text-gray-500 mb-4">No hay alergias registradas.</p>
          ) : (
            <ul className="space-y-2 mb-4">
              {alergias.map((a) => (
                <li key={a.id_alergia} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <span className="font-medium">{a.descrip_alergia}</span>
                  <button
                    onClick={() => handleDeleteAlergia(a.id_alergia)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}

          <form onSubmit={handleAddAlergia} className="flex gap-2">
            <input
              type="text"
              value={newAlergia}
              onChange={(e) => setNewAlergia(e.target.value)}
              placeholder="Ej: Lactosa, gluten..."
              className="flex-1 p-2 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-indigo-500"
              required
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all"
            >
              Agregar
            </button>
          </form>
        </div>

        <div className="text-center">
          <Link to="/" className="text-indigo-600 hover:text-indigo-800">
            Volver al Menú Principal
          </Link>
        </div>
      </div>
    </div>
  )
}
