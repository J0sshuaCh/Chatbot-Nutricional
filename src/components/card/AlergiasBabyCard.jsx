import React from 'react'
import { useTresTopAlergiasBebe } from '../../hook/useAlergiaBebeQuery'
import { Loading } from '../ui/Loading'
import { ShieldAlert, Baby, Tag } from 'lucide-react'

export const AlergiasBabyCard = () => {
    const { data: tresUltimosAlergiasBebes, isLoading } = useTresTopAlergiasBebe()

    // Filtramos e iteramos solo sobre los bebés que sí tienen alergias asignadas
    const bebesConAlergias = tresUltimosAlergiasBebes?.filter(bebe => bebe.alergias.length > 0) || []


    const getCategoryStyles = (category) => {
        const cat = category?.toLowerCase();
        if (cat?.includes('alimentaria')) return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
        if (cat?.includes('medicamento')) return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
        if (cat?.includes('respiratoria')) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
        if (cat?.includes('dermatologica')) return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
        if (cat?.includes('insecto')) return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300';
        return 'bg-muted text-foreground';
    };

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold text-foreground mb-6">
                Alergias Recientes
            </h2>

            {isLoading ? (
                <Loading />
            ) : bebesConAlergias.length > 0 ? (
                // 🌟 Activamos el contenedor de referencia aquí
                <div className="@container flex flex-col gap-3">
                    {bebesConAlergias.map((bebe) =>
                        bebe.alergias.map((alergia) => (
                            <div
                                key={`${bebe.id_bebe}-${alergia.id_alergia}`}
                                // El diseño pasa de apilado (flex-col) a fila (@md:flex-row) según el contenedor padre
                                className="flex flex-col @md:flex-row @md:items-center justify-between p-4 bg-card rounded-xl border-border shadow-sm gap-3 transition-all hover:shadow-sm"
                            >
                                {/* Bloque Izquierdo: Icono + Nombre Alergia */}
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-red-50 text-red-500 dark:bg-red-900/30 dark:text-red-400 rounded-xl shrink-0">
                                        <ShieldAlert className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-foreground @sm:text-base balance">
                                            {alergia.descrip_alergia}
                                        </h4>
                                        {/* Categoría visible en móvil/contenedor pequeño bajo el título */}
                                        <span className="inline-flex @md:hidden text-[11px] font-medium uppercase tracking-wider text-muted-foreground mt-0.5">
                                            {alergia.categoria || 'General'}
                                        </span>
                                    </div>
                                </div>

                                {/* Bloque Derecho: Badges (Categoría + Bebé) */}
                                <div className="flex items-center gap-2 pt-2 @md:pt-0 border-t border-border @md:border-none justify-between @md:justify-end">

                                    {/* Categoría (Oculta en contenedores pequeños, se muestra a la derecha en amplios) */}
                                    <span className={`hidden @md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${getCategoryStyles(alergia.categoria)}`}>
                                        <Tag className="w-3.5 h-3.5" />
                                        {alergia.categoria || 'General'}
                                    </span>

                                    {/* Badge del Bebé Vinculado */}
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl  font-bold bg-primary/10 text-primary border border-primary/20">
                                        <Baby className="w-3.5 h-3.5" />
                                        <span className="truncate max-w-[80px] @sm:max-w-none">
                                            {bebe.nombre_bebe}
                                        </span>
                                    </span>
                                </div>

                            </div>
                        ))
                    )}
                </div>
            ) : (
                <div className="p-6 text-center bg-muted rounded-xl border border-dashed border-border">
                    <p className="text-sm text-muted-foreground">Ninguno de tus bebés tiene alergias registradas.</p>
                </div>
            )}
        </div>
    )
}