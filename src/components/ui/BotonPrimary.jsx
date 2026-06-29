import React from 'react'

const variants = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90 border-transparent',
  outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  ghost: 'hover:bg-accent hover:text-accent-foreground border-transparent',
  google: 'border border-input bg-background text-foreground hover:bg-accent',
  colorido: 'font-medium text-foreground border-transparent',
  eliminar: 'border border-destructive/30 bg-background text-destructive hover:bg-destructive/10',
  gris: 'bg-muted text-muted-foreground hover:bg-muted/80 border-transparent',
}

export const BotonPrimary = ({
  type = 'button',
  style = 'default',
  action,
  children,
  icono,
  className = '',
}) => {

  return (
    <button
      type={type}
      onClick={action}

      className={`
        inline-flex items-center justify-center gap-2 w-full
        rounded-lg px-4 py-2 text-sm font-medium
        border transition-all duration-150
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
        disabled:pointer-events-none disabled:opacity-50
        active:scale-[0.98] cursor-pointer
        ${variants[style] ?? variants.default}
        ${className}
      `}
    >
      {icono && (
        <img src={icono} alt="" aria-hidden="true" className="w-4 h-4" />
      )}
      {children}
    </button>
  )
}
