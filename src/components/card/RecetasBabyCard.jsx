import React, { useMemo } from 'react'
import { useRecetas } from '../../hook/useRecetasQuery'
import { Loading } from '../ui/Loading'
import { LibroReceta } from '../icon/LibroReceta'

export const RecetasBabyCard = () => {
    const { data: recetas, isLoading } = useRecetas()

    const getBadgeStyle = (rango) => {
        if (rango?.includes('6-8')) return 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
        if (rango?.includes('9')) return 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
    }

    //de las recetas quiero extraer 3 , pero esos 3 ; 1 debe ser si el rango es igual a "6-8 meses"; otro , "9-11 meses"  y otro, "12+ meses"
    //esas 3 recetas las vboy a mostrar en mi interfaz 
    // Filtrar para obtener exactamente 1 receta por cada rango de edad requerido
    const recetasFiltradas = useMemo(() => {
        if (!recetas || recetas.length === 0) return []

        const rangosBuscados = ["6-8 meses", "9-11 meses", "12+ meses"]

        return rangosBuscados
            .map(rango => recetas.find(receta => receta.rangoMeses === rango))
            .filter(Boolean) // Elimina valores undefined si un rango no tiene recetas disponibles
    }, [recetas])
    return (
        <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
                Recetas
            </h2>

            {
                isLoading ? (
                    <Loading />
                ) : (
                    <>
                        {recetasFiltradas.length === 0 ? (
                            <p className="text-muted-foreground text-center py-10">No se encontraron recetas para los rangos de edad seleccionados.</p>
                        ) : (
                            /* Definimos el contenedor principal como el contexto de la query con @container */
                            <div className="@container w-full">
                                <div className="flex flex-wrap gap-6 justify-start items-stretch">
                                    {recetasFiltradas.map((receta) => (
                                        <div
                                            key={receta.id}
                                            className="flex-1 min-w-[230px] bg-card border-border rounded-xl p-5 shadow-sm hover:shadow-sm transition-shadow duration-300 flex flex-col justify-between"
                                        >
                                            <div>
                                                {/* Fila superior: Icono y Rango de meses */}
                                                <div className="flex justify-between items-center mb-4">
                                                    <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300">
                                                        {/* Icono representativo (Cubiertos / Cocina) */}
                                                        <LibroReceta />
                                                    </div>
                                                    <span className={`flex items-center text-xs font-semibold px-2.5 pt-2 pb-1 rounded-full border ${getBadgeStyle(receta.rangoMeses)}`}>
                                                        {receta.rangoMeses}
                                                    </span>
                                                </div>

                                                {/* Título de la receta */}
                                                <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
                                                    {receta.titulo}
                                                </h3>

                                                {/* ESTE ES EL P DONDE ME DICE Tu valor de LCP local de 16,13 s es deficiente. */}
                                                {/* Descripción corta */}
                                                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                                                    {receta.descripcion}
                                                </p>
                                            </div>

                                            {/* Tipo de comida (Pie de la tarjeta) */}
                                            <div className="border-t border-border pt-3 mt-auto flex items-center justify-between">

                                                <span className="text-sm font-medium text-foreground bg-muted px-2.5 py-0.5 rounded-md">
                                                    {receta.tipoComida}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )
            }
        </div>
    )
}
