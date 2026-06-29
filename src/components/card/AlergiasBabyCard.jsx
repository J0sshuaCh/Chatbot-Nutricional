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
        if (cat?.includes('alimentaria')) return 'bg-amber-100 text-amber-800';
        if (cat?.includes('medicamento')) return 'bg-red-100 text-red-800';
        if (cat?.includes('respiratoria')) return 'bg-blue-100 text-blue-800';
        if (cat?.includes('dermatologica')) return 'bg-purple-100 text-purple-800';
        if (cat?.includes('insecto')) return 'bg-indigo-100 text-indigo-800';
        return 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold text-black mb-6">
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
                                className="flex flex-col @md:flex-row @md:items-center justify-between p-4 bg-white rounded-2xl border border-gray-200 shadow-md gap-3 transition-all hover:shadow-md"
                            >
                                {/* Bloque Izquierdo: Icono + Nombre Alergia */}
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-red-50 text-red-500 rounded-xl shrink-0">
                                        <ShieldAlert className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-zinc-800 @sm:text-base balance">
                                            {alergia.descrip_alergia}
                                        </h4>
                                        {/* Categoría visible en móvil/contenedor pequeño bajo el título */}
                                        <span className="inline-flex @md:hidden text-[11px] font-medium uppercase tracking-wider text-zinc-400 mt-0.5">
                                            {alergia.categoria || 'General'}
                                        </span>
                                    </div>
                                </div>

                                {/* Bloque Derecho: Badges (Categoría + Bebé) */}
                                <div className="flex items-center gap-2 pt-2 @md:pt-0 border-t border-zinc-50 @md:border-none justify-between @md:justify-end">

                                    {/* Categoría (Oculta en contenedores pequeños, se muestra a la derecha en amplios) */}
                                    <span className={`hidden @md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${getCategoryStyles(alergia.categoria)}`}>
                                        <Tag className="w-3.5 h-3.5" />
                                        {alergia.categoria || 'General'}
                                    </span>

                                    {/* Badge del Bebé Vinculado */}
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl  font-bold bg-bg-primary/10 text-bg-primary border border-blue-50">
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
                <div className="p-6 text-center bg-zinc-50 rounded-2xl border border-dashed border-zinc-200">
                    <p className="text-sm text-zinc-500">Ninguno de tus bebés tiene alergias registradas.</p>
                </div>
            )}
        </div>
    )
}