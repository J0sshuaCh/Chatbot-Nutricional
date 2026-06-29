import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { AuthContext } from './AuthContext'

export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)

    const user = session?.user ?? null

    useEffect(() => {
        // Limpia el hash/query de la URL solo cuando ya hay sesión
        if (session) {
            const cleanUrl = window.location.pathname
            window.history.replaceState({}, document.title, cleanUrl)
        }
    }, [session])

    useEffect(() => {
        // onAuthStateChange se dispara INMEDIATAMENTE al montarse con el evento
        // "INITIAL_SESSION", procesando correctamente el token de Google si existe
        // en la URL. No necesitas getSession() por separado.
        const { data: listener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                setSession(session)
                setLoading(false) // 👈 ahora SOLO esta fuente decide cuándo dejar de cargar
            }
        )

        return () => {
            listener.subscription.unsubscribe()
        }
    }, [])

    return (
        <AuthContext.Provider value={{ session, user, loading }}>
            {children}
        </AuthContext.Provider>
    )
}