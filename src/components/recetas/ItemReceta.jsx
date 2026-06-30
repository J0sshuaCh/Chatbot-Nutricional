import React from 'react'
import Cochecito from '../icon/Cochecito'

export const ItemReceta = ({ receta }) => {
    // Función auxiliar para dar color a las píldoras de edad
    const getBadgeStyle = (rango) => {
        if (rango?.includes('6-8')) return 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
        if (rango?.includes('9')) return 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
    }

    const getColorCoche = (rango) => {
        if (rango?.includes('6-8')) return '#c2410c'
        if (rango?.includes('9')) return '#b45309'
        return '#047857'
    }

    return (
        // Cambiamos "w-full" por "flex-1 min-w-[300px]"
        <div className="group relative flex-1 min-w-[250px] h-80 bg-card rounded-xl shadow-lg border-border p-5 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-sm hover:border-violet-200 dark:hover:border-violet-700">

            {/* VISTA PRINCIPAL (Contenido base de la receta) */}
            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-start gap-2">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide px-3 py-1 rounded-full ${getBadgeStyle(receta.rangoMeses)}`}>
                        <Cochecito color={`${getColorCoche(receta.rangoMeses)}`} />
                        <span className='pt-1'>
                            {receta.rangoMeses || 'Cualquier edad'}
                        </span>
                    </span>
                </div>


                <h3 className="font-bold text-foreground text-lg leading-snug line-clamp-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    {receta.titulo}
                </h3>

                <p className="text-muted-foreground text-sm line-clamp-4 leading-relaxed">
                    {receta.descripcion || 'Sin descripción disponible.'}
                </p>

                <div className='w-full flex justify-end'>
                    <span className=" font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
                        🍽️ {receta.tipoComida || 'General'}
                    </span>
                </div>
            </div>

            <div className="border-t border-border pt-3 flex justify-between items-center transition-opacity duration-200 group-hover:opacity-0">
                <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1.5">
                    {receta.isPredeterminada ? (
                        <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5z" /></svg>
                            Recomendada por expertos
                        </>
                    ) : (
                        'Receta propia'
                    )}
                </span>
            </div>
            <div className="absolute inset-0 bg-violet-950/95 p-5 flex flex-col opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto z-10">
                <h4 className="text-white font-bold text-base border-b border-violet-800 pb-2 mb-3 flex items-center gap-2">
                    Ingredientes Necesarios
                </h4>

                {/* Lista con scroll interno si hay demasiados ingredientes */}
                {/* Lista con scroll interno estilizado */}
                <div className="flex-1 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-violet-950/20 [&::-webkit-scrollbar-thumb]:bg-violet-700 [&::-webkit-scrollbar-thumb]:rounded-full [scrollbar-width:thin] [scrollbar-color:#6d28d9_transparent]">
                    {!receta.ingredientes || receta.ingredientes.length === 0 ? (
                        <p className="text-violet-300 text-sm italic">No hay ingredientes registrados.</p>
                    ) : (
                        <ul className="space-y-2.5">
                            {receta.ingredientes.map((ing, idx) => (
                                <li key={idx} className="text-violet-100 text-sm flex items-start gap-2">
                                    <span className="text-violet-400 mt-0.5">•</span>
                                    <span>
                                        <strong className="text-white font-semibold">{ing.cantidad}</strong> de {ing.nombre}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <p className="text-violet-400 text-xs text-center mt-3 pt-2 border-t border-violet-900 italic">
                    Pasa el cursor fuera para regresar
                </p>
            </div>
        </div>
    )
}
