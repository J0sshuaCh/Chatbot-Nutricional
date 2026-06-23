// =============================================
// Cliente Supabase para el Frontend (React)
// =============================================
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '⚠️ Supabase: Variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY no configuradas. ' +
    'Crea un archivo .env en la raíz del proyecto con esos valores.'
  )
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)

/**
 * Obtiene la sesión actual del usuario.
 */
export async function getCurrentSession() {
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error) {
    console.error('Error obteniendo sesión:', error.message)
    return null
  }
  return session
}

/**
 * Obtiene el token de acceso para incluirlo en headers de API calls.
 */
export async function getAuthToken() {
  const session = await getCurrentSession()
  return session?.access_token || null
}

/**
 * Helper para llamar a las API protegidas del backend.
 */
export async function apiFetch(endpoint, options = {}) {
  const token = await getAuthToken()
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const response = await fetch(endpoint, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Error de conexión' }))
    throw new Error(error.error || `HTTP ${response.status}`)
  }

  return response.json()
}
