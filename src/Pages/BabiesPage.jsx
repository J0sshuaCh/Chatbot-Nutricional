import React, { useEffect, useState } from 'react'
import { useBebes, useDeleteBebe, useInsertBebe, useUpdateBebe } from '../hook/useBabiesQuery';
import { BotonPrimary } from '../components/ui/BotonPrimary';
import { BotonIcon } from '../components/ui/BotonIcon';
import { Plus } from 'lucide-react';
import { BabyRegister } from '../components/formulario/BabyRegister';
import BabiesTabla from '../components/tabla/BabiesTabla';
import { useBabySelectStore } from '../store/BabySelectStore';

export const BabiesPage = () => {
    const [modalAddOpen, setModalAddOpen] = useState(false);
    const [modalEditOpen, setModalEditOpen] = useState(false);
    const { babySelect, setBabySelect } = useBabySelectStore()

    const { data: bebes, isLoading } = useBebes();
    const { mutate: insertar, isPending: isInserting } = useInsertBebe();
    const { mutate: actualizar, isPending: isUpdating } = useUpdateBebe();
    const { mutate: eliminar, isPending: isDeleting } = useDeleteBebe();

    useEffect(() => {
        return () => {
            setBabySelect({});
        };
    }, [setBabySelect]);

    return (
        <>

            <div>
                <h1 className="text-4xl font-bold text-black px-2 py-10">
                    Gestionar Perfil Bebés
                </h1>

                <div className=' relative'>
                    <div className='w-42 absolute -top-5 right-5 md:right-15'>
                        <BotonPrimary
                            style='colorido'
                            claseColor='bg-baby-mint'
                            claseHover='hover:bg-baby-mint-hover'
                            action={() => { setModalAddOpen(true); }}
                        >
                            + Añadir bebé
                        </BotonPrimary>
                    </div>
                    <BabiesTabla
                        babies={bebes}
                        isLoading={isLoading}
                        setBabySelect={setBabySelect}
                        action={() => { setModalEditOpen(true); }}
                        onDelete={eliminar}
                    />

                </div>

            </div>

            {modalAddOpen &&
                <BabyRegister
                    onClose={() => setModalAddOpen(false)}
                    accion='Registrar'
                    insertar={insertar}
                />
            }

            {modalEditOpen &&
                <BabyRegister
                    onClose={() => setModalEditOpen(false)}
                    accion='Editar'
                    editar={actualizar}
                    dataSelect={babySelect}
                />
            }

        </>
    )
}
