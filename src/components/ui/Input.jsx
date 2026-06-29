import React from 'react'

// Usamos React.forwardRef para que React Hook Form pueda capturar la referencia física del input
export const Input = React.forwardRef(({
    type = "text",       // Valor por defecto por si no se envía
    placeholder,
    disabled = false,
    className = "",      // Permitimos fusionar clases extras si las mandas desde fuera
    ...props             // Agrupa automáticamente onChange, onBlur, name, value, etc.
}, ref) => {
    return (
        <input
            ref={ref}          // 👈 ¡Esto es vital para React Hook Form!
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            {...props}         // 👈 Copia todas las demás propiedades automáticamente
            className={`
              w-full px-5 py-3 
              bg-bg-gray text-zinc-900 placeholder-zinc-400
              text-sm font-normal rounded-full
              border border-transparent
              outline-none transition-all duration-150
              focus:ring-2 focus:ring-zinc-950/5
              disabled:opacity-50 disabled:pointer-events-none
              ${className}
            `}
        />
    )
})

Input.displayName = 'Input' // Buenas prácticas para identificar el componente en React DevTools
