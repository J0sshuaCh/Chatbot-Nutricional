import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../hook/useAuth'

import {
    LayoutDashboard,
    Baby,
    LogOut,
} from "lucide-react"
import { useAuthStore } from '../store/AuthStore'
import { Link } from 'react-router-dom'

const options = [
    { id: 1, name: "Dashboard", path: "/manager-baby", icon: LayoutDashboard },
    { id: 2, name: "Bebes", path: "/babies", icon: Baby },
]

export const Encabezado = () => {
    const { user } = useAuth()
    const { signOut } = useAuthStore()
    const [menuAbierto, setMenuAbierto] = useState(false)
    const dropdownRef = useRef(null)

    if (!user) return null
    // Supabase con Google Auth guarda todo en user_metadata
    const nombre = user.user_metadata.full_name ?? 'Usuario'
    const email = user.user_metadata.email
    const avatar = user.user_metadata.avatar_url

    // Iniciales como fallback si no carga el avatar
    const iniciales = nombre
        .split(' ')
        .slice(0, 2)
        .map(n => n[0])
        .join('')
        .toUpperCase()

    // Cerrar menú al hacer clic fuera
    useEffect(() => {
        const clickAfuera = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setMenuAbierto(false)
            }
        }
        document.addEventListener('mousedown', clickAfuera)
        return () => document.removeEventListener('mousedown', clickAfuera)
    }, [])


    const AvatarImg = ({ size = 'sm' }) => {
        const sizeClass = size === 'sm' ? 'w-9 h-9 text-xs' : 'w-10 h-10 text-sm'
        return avatar ? (
            <img
                src={avatar}
                alt={nombre}
                referrerPolicy="no-referrer"
                className={`${sizeClass} rounded-full object-cover ring-2 ring-white shadow-sm`}
            />
        ) : (
            <div className={`${sizeClass} rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center ring-2 ring-white shadow-sm`}>
                <span className="text-white font-bold tracking-wide">{iniciales}</span>
            </div>
        )
    }

    return (
        <header className="w-full flex items-center justify-end relative z-40">

            <div className="relative " ref={dropdownRef}>

                {/* ── Botón del perfil ── */}
                <button
                    onClick={() => setMenuAbierto(prev => !prev)}
                    aria-expanded={menuAbierto}
                    aria-haspopup="true"
                    className="flex items-center gap-3 shadow-md rounded-xl p-3 bg-white hover:bg-bg-gray focus:outline-none  transition-colors group"
                >
                    {/* Nombre y email (solo escritorio) */}
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-zinc-800 leading-tight group-hover:text-zinc-600 transition-colors">
                            {nombre}
                        </p>
                        <p className="text-xs text-zinc-400 leading-tight mt-0.5">
                            {email}
                        </p>
                    </div>

                    {/* Avatar + punto online */}
                    <div className="relative">
                        <div className="group-hover:ring-2 group-hover:ring-violet-300 rounded-full transition-all duration-200">
                            <AvatarImg size="sm" />
                        </div>
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full" />
                    </div>

                    {/* Chevron */}
                    <svg
                        className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 hidden sm:block ${menuAbierto ? 'rotate-180' : ''}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {/* ── Dropdown ── */}
                {menuAbierto && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-zinc-100 shadow-xl shadow-zinc-200/60 py-1.5 origin-top-right animate-in fade-in zoom-in-95 duration-150">

                        {/* Cabecera con avatar + datos */}
                        <div className="px-4 py-3 border-b border-zinc-50">
                            <div className="flex items-center gap-3">
                                <AvatarImg size="md" />
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-zinc-800 truncate">{nombre}</p>
                                    <p className="text-xs text-zinc-400 truncate">{email}</p>
                                </div>
                            </div>
                        </div>

                        {/* Opciones */}
                        <div className="py-1">
                            {options.map((option) => {
                                // Guardamos el componente del icono en una variable con mayúscula
                                const Icono = option.icon;

                                return (
                                    <Link
                                        key={option.id}
                                        to={option.path}
                                        /* Al hacer click, cierra el menú para una mejor UX si lo requieres */
                                        onClick={() => setMenuAbierto(false)}
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors group"
                                    >
                                        <span className="w-7 h-7 rounded-lg bg-zinc-100 group-hover:bg-violet-100 flex items-center justify-center transition-colors">
                                            <Icono className="w-4 h-4 text-zinc-500 group-hover:text-violet-600 transition-colors" />
                                        </span>
                                        {option.name}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Cerrar sesión */}
                        <div className="border-t border-zinc-100 py-1">
                            <button
                                onClick={async () => await signOut()}
                                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors cursor-pointer group"
                            >
                                <span className="w-7 h-7 rounded-lg bg-red-50 group-hover:bg-red-100 flex items-center justify-center transition-colors">
                                    {/* Reemplaza 'LogOut' por el nombre del componente de icono que importaste */}
                                    <LogOut className="w-4 h-4 text-red-500 group-hover:text-red-600 transition-colors" />
                                </span>
                                Cerrar Sesión
                            </button>
                        </div>

                    </div>
                )}
            </div>
        </header>
    )
}