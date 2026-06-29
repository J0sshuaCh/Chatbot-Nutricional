import React from 'react'

const variants = {
  default: 'bg-zinc-900 text-white hover:bg-zinc-700 border-transparent',
  outline: 'border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50',
  ghost: 'bg-transparent text-zinc-700 hover:bg-zinc-100 border-transparent',
  google: 'border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-200',
  // Dejamos la variante limpia, las clases de color se inyectan abajo
  colorido: 'text-black border-transparent',
  eliminar: 'border border-red-300 bg-white text-red-600 hover:bg-red-50',
  gris: 'bg-gray-300 hover:bg-gray-300/90 text-gray-700 border-transparent',
}

export const BotonPrimary = ({
  type = 'button',
  style = 'default',
  action,
  children,
  icono,

  // 1. Agregamos estas dos nuevas propiedades con valores por defecto
  claseColor = '',
  claseHover = ''
}) => {

  // 2. Si la variante es 'colorido', aplicamos tus clases personalizadas
  const clasesColoridas = style === 'colorido' ? `${claseColor} ${claseHover}` : '';

  return (
    <button
      type={type}
      onClick={action}

      className={`
        inline-flex items-center justify-center gap-2 w-full
        rounded-full px-4 py-2.5 text-sm md:text-lg font-medium
        border transition-all duration-150
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2
        disabled:pointer-events-none disabled:opacity-50
        active:scale-[0.98] cursor-pointer
        ${variants[style] ?? variants.default}
        ${clasesColoridas} /* 3. Inyectamos las clases aquí */
      `}
    >
      {icono && (
        <img src={icono} alt="" aria-hidden="true" className="w-4 h-4" />
      )}
      {children}
    </button>
  )
}
