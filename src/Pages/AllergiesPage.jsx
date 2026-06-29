import React, { useEffect } from 'react'
import { Calendar, Weight, Droplet, AlertTriangle, X } from 'lucide-react'
import { BabyProfileCard } from '../components/card/BabyProfileCard'
import { useAllergies, useDeleteAllergy } from '../hook/useAllergiesQuery'
import { useAuth } from '../lib/AuthContext'
import { useBebes } from '../hook/useBabiesQuery'
import FormVincular from '../components/formulario/FormVincular'
import { useBabySelectStore } from '../store/BabySelectStore'
import { ALLERGY_CATEGORIES_LIST } from '../constant/categoriaAlergias'
import AllergiesRegister from '../components/formulario/AllergiesRegister'
import AllergiesTabla from '../components/tabla/AllergiesTabla'
import { useAlergiasBebe, useAsociarAlergiaBebe, useEliminarAlergiaBebe } from '../hook/useAlergiaBebeQuery'
import Swal from 'sweetalert2'
import { Loading } from '../components/ui/Loading'


export const AllergiesPage = () => {
    const { user: authUser } = useAuth();
    const { babySelect, setBabySelect } = useBabySelectStore()

    // alergias personalizadas solo el usuario auth
    const { data: myCustomAllergies, isLoading: isLoadingCustom } = useAllergies(authUser?.id, true); // <--- Pasamos true

    //alergias totales el usuarios auth (predeterminadas + personalizadas) para el select
    const { data: alergias, isLoading: isLoadingAlergias } = useAllergies(authUser?.id, false)
    const { mutate: eliminar } = useDeleteAllergy();

    //alergias vinculas al bebe elegidos useAlergiaBebeQuery
    const { data: alergiasBebe, isLoading: isLoadingAlergiasBebes } = useAlergiasBebe(babySelect.id_bebe)
    const { mutate: asociarAlergiaBebe } = useAsociarAlergiaBebe()
    const { mutate: eliminarAlergiaBebe } = useEliminarAlergiaBebe()

    //los bebes para el select useBebeQuery
    const { data: bebes, isLoading: isLoadingBebes } = useBebes()


    useEffect(() => {
        return () => {
            setBabySelect({});
        };
    }, [setBabySelect]);


    // 2. Creas la función que maneja la confirmación y el disparo
    const handleEliminarClick = (idAlergia, descripAlergia) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: `Vas a desasociar la alergia "${descripAlergia}" de este bebé.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444', // Color rojo Tailwind (bg-red-500)
            cancelButtonColor: '#6b7280',  // Color gris Tailwind (bg-gray-500)
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Ejecutamos la mutación pasando los dos identificadores requeridos
                eliminarAlergiaBebe({
                    id_bebe: babySelect.id_bebe, // Asegúrate de que esta variable 'idBebe' exista en tu componente
                    id_alergia: idAlergia
                }, {
                    onSuccess: () => {
                        Swal.fire('¡Eliminado!', 'La alergia se ha retirado con éxito.', 'success');
                    },
                    onError: (err) => {
                        Swal.fire('Error', err?.message || 'No se pudo eliminar la relación.', 'error');
                    }
                });
            }
        });
    };
    return (
        // Contenedor principal: Se apila en móvil (flex-col) y va lado a lado en escritorio (md:flex-row)
        <div className="flex flex-col lg:flex-row gap-6 py-6   ">
        
            {/* COLUMNA IZQUIERDA: Tarjeta del Bebé (Fija al hacer scroll) */}
            <div className="w-full lg:w-80 lg:sticky lg:top-6 self-start">
                <BabyProfileCard
                    babySelect={babySelect}
                />
            </div>

            {/* COLUMNA DERECHA: Gestión de Alergias (Crece y hace scroll) */}
            <div className="flex-1 w-full space-y-6">

                <div className="bg-card p-3 sm:p-6 rounded-xl shadow-sm border border-border">
                    <h1 className="text-xl font-bold text-foreground mb-6">Gestión de Alergias</h1>
                    {/* Aquí van tus secciones de añadir, crear y listar alergias */}
                    <div className="space-y-4">
                        <FormVincular
                            alergias={alergias}
                            bebes={bebes}
                            asociarAlergiaBebe={asociarAlergiaBebe}
                        />
                        {/* Contenido largo simulado para probar el scroll */}
                        <div className=" p-4  rounded-xl border border-accent/10 shadow-sm">
                            <h2 className="text-xl font-semibold text-foreground mb-5">
                                Alergias Actuales de {babySelect.name || "[Nombre del Bebe]"}
                            </h2>

                            <div className='flex flex-row gap-3 flex-wrap'>

                                {isLoadingAlergiasBebes ? (
                                    <Loading />
                                ) : (
                                    <>
                                        {alergiasBebe && alergiasBebe.length > 0 ? (
                                            alergiasBebe.map((ab, index) => (
                                                <div key={index}
                                                    className="flex items-center  gap-1.5 pl-2 pr-4 py-1 bg-red-50 border border-red-400 rounded-full w-fit text-sm font-medium text-red-500 dark:bg-red-900/30 dark:border-red-600 dark:text-red-400"
                                                >
                                                    <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center shrink-0 dark:bg-orange-900/30">
                                                        <AlertTriangle className="w-5 h-5 text-orange-400 dark:text-orange-300" />
                                                    </div>
                                                    <span>{ab.descrip_alergia}</span>
                                                    <button
                                                        type="button"
                                                        className="ml-1 text-red-400 hover:text-red-700 dark:text-red-300 dark:hover:text-red-300 transition-colors cursor-pointer"
                                                        onClick={() => { handleEliminarClick(ab.id_alergia, ab.descrip_alergia) }}
                                                    >
                                                        <X className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-muted-foreground text-center py-4 font-medium w-full">
                                                No tiene alergias
                                            </p>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>

                        <AllergiesRegister
                            categorias={ALLERGY_CATEGORIES_LIST}
                            authUser={authUser}
                        />

                        <AllergiesTabla
                            allergies={myCustomAllergies}
                            isLoading={isLoadingCustom}
                            onDelete={eliminar}
                        />
                    </div>
                </div>

            </div>

        </div>
    )
}
