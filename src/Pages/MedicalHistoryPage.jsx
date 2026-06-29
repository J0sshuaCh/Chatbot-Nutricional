import React, { useEffect, useState } from 'react'
import { useBabySelectStore } from '../store/BabySelectStore';
import { BabyCardList } from '../components/card/BabyCardList';
import { useBebes } from '../hook/useBabiesQuery';
import { BotonPrimary } from '../components/ui/BotonPrimary';
import { AnalisisRegister } from '../components/formulario/AnalisisRegister';
import Swal from 'sweetalert2';
import { useAnalisisBebe, useCrearAnalisisBebe, useEliminarAnalisisBebe } from '../hook/useAnalisisQuery';
import { AlertCircle } from 'lucide-react';
import { ControlCard } from '../components/card/ControlCard';
import { ContainerGraficas } from '../components/graficos/ContainerGraficas';
import { Loading } from '../components/ui/Loading';

export const MedicalHistoryPage = () => {
    const { babySelect, setBabySelect } = useBabySelectStore()
    const [modalAddOpen, setModalAddOpen] = useState(false);

    const { mutate: crearAnalisis, } = useCrearAnalisisBebe()
    const { mutate: eliminarAnalisis } = useEliminarAnalisisBebe()
    const { data: controlesBebe, isLoading: loadingControles } = useAnalisisBebe(babySelect.id_bebe)

    const { data: babies, isLoading: loadingBebe } = useBebes()

    useEffect(() => {
        return () => {
            setBabySelect({});
        };
    }, [setBabySelect]);


    const accionRegistrar = () => {
        if (babySelect && Object.keys(babySelect).length > 0) {
            setModalAddOpen(true);
        } else {
            Swal.fire({
                title: '¡Atención!',
                text: 'Por favor, selecciona un bebé primero.',
                icon: 'warning',
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#3085d6'
            });
        }
    };

    return (
        //contenedor principal
        <>
            <div className=" flex flex-col gap-6 py-6 ">

                {/* card de bebes registrados */}
                {loadingBebe ? (
                    <Loading />
                ) : (
                    <BabyCardList babies={babies} />
                )}


                <div className='bg-white p-3 rounded-2xl border-2 border-gray-200 shadow-lg transition-all w-full min-w-0 overflow-hidden'>

                    <h2 className="text-2xl font-bold text-black mb-6">
                        Resumen Actual
                    </h2>

                    {/* grafico de linear */}
                    {loadingControles ? (
                        <Loading />
                    ) : (
                        <ContainerGraficas controlesBebe={controlesBebe || []} />
                    )}
                </div>

                <div>
                    <h1 className='text-xl font-bold  mb-4'>Historial de Controles</h1>

                    <div className=''>

                        {/* CASO 1: No hay bebé seleccionado */}
                        {!babySelect || Object.keys(babySelect).length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-8 text-center gap-2">
                                <AlertCircle className="w-8 h-8 text-zinc-400" />
                                <p className="text-sm font-medium text-zinc-500">Selecciona un bebé arriba para visualizar sus registros.</p>
                            </div>
                        ) : loadingControles ? (
                            /* Loader de carga interna de controles */
                            <Loading />
                        ) : controlesBebe && controlesBebe.length > 0 ? (
                            /* CASO 2: Tiene controles registrados */
                            <div className="@container flex flex-col gap-1">
                                {controlesBebe.map((control) => (
                                    <ControlCard
                                        key={control.id_analisis}
                                        control={control}
                                        onEliminar={eliminarAnalisis}
                                    />
                                ))}
                            </div>
                        ) : (
                            /* CASO 3: Bebé seleccionado sin registros aún */
                            <div className="flex flex-col items-center justify-center py-10 text-center gap-1">
                                <p className="text-sm font-semibold text-zinc-600">No hay controles médicos guardados</p>
                                <p className="text-xs text-zinc-400">Haz clic en el botón inferior para registrar el primero.</p>
                            </div>
                        )}

                    </div>
                </div>

                <div className='fixed bottom-7 right-7'>

                    <BotonPrimary
                        style='colorido'
                        claseColor='bg-baby-mint'
                        claseHover='hover:bg-baby-mint-hover'
                        action={() => accionRegistrar()}
                    >
                        + Nuevo Control
                    </BotonPrimary>
                </div>
            </div>

            {
                modalAddOpen &&
                <AnalisisRegister
                    onClose={() => setModalAddOpen(false)}
                    babySelect={babySelect}
                    insertar={crearAnalisis}
                />
            }
        </>
    )
}
