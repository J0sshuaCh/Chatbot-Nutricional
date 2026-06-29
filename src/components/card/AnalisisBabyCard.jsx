import React from 'react'
import { useTresUltimosAnalisisGlobales } from '../../hook/useAnalisisQuery'
import { Loading } from '../ui/Loading';
import { ControlCard } from './ControlCard';

export const AnalisisBabyCard = () => {
    const { data: tresUltimosAnalisis, isLoading } = useTresUltimosAnalisisGlobales();

    // Función simulada por si tienes el prop onEliminar
    const eliminarAnalisis = (id) => {
        console.log("Eliminar análisis", id);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
                Historias Médicas
            </h2>

            {isLoading ? (
                /* Loader de carga interna de controles */
                <Loading />
            ) : (
                /* Renderizado de las tarjetas si existen datos */
                tresUltimosAnalisis && tresUltimosAnalisis.length > 0 ? (
                    <div className="@container flex flex-col gap-1">
                        {tresUltimosAnalisis.map((control) => (
                            <ControlCard
                                key={control.id_analisis}
                                control={control}
                                onEliminar={eliminarAnalisis}
                                showBabyContext={true}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground">No se encontraron controles.</p>
                )
            )}
        </div>
    );
};
