import React from 'react';
import { BotonIcon } from '../ui/BotonIcon';
import { Edit2, Trash2, AlertTriangle } from 'lucide-react'; // Añadí AlertTriangle por si quieres un icono general
import Swal from 'sweetalert2';
import { Loading } from '../ui/Loading';

export default function AllergiesTabla({
    allergies,
    isLoading,
    onDelete,
}) {

    const handleDeleteConfirm = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444', // Rojo Tailwind
            cancelButtonColor: '#6b7280',  // Gris Tailwind
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            background: '#ffffff',
            customClass: {
                popup: 'rounded-2xl font-sans',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                onDelete(id);

                // Toast de éxito
                Swal.fire({
                    title: '¡Eliminado!',
                    text: 'La alergia ha sido borrada.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    };

    // Función opcional para dar un color dinámico al badge según la categoría
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
        // Reduje ligeramente el padding en móvil (p-4) y se agranda en escritorio (md:p-8)
        <div className="bg-white rounded-2xl p-5 md:p-8 shadow-md border border-gray-100 w-full overflow-hidden">

            <h2 className="text-xl md:text-2xl font-bold text-black mb-6">
                Tabla de Alergias Personalizadas
            </h2>

            <div className="flex flex-col gap-4 md:gap-5">
                {isLoading ? (
                    <Loading />
                ) : (
                    <>
                        {allergies && allergies.map((allergy) => (
                            <div
                                key={allergy.id_alergia || allergy.id}
                                // flex-col para móvil y flex-row para escritorio. Ajuste de alineación y bordes.
                                className="flex flex-row sm:items-center justify-between gap-4 py-4 sm:py-3 border-b border-gray-100 last:border-b-0"
                            >
                                {/* Contenedor Izquierdo: Icono + Nombre + Badge */}
                                <div className="flex items-center gap-4 min-w-0 flex-1">


                                    {/* Ajuste para que el nombre y el badge no se rompan feo */}
                                    <div className="flex flex-col md:flex-row items-center gap-1.5 md:gap-3 md:flex-1 min-w-0">
                                        <h3 className="font-bold text-base text-black truncate capitalize">
                                            {allergy.descrip_alergia}
                                        </h3>
                                        {/* Badge visible al lado o abajo del texto en móvil */}
                                        <div className='md:flex-1 flex justify-center '>
                                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] md:text-xs  font-semibold uppercase tracking-wider w-max ${getCategoryStyles(allergy.categoria)}`}>
                                                {allergy.categoria || 'General'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Acciones: Se alinean a la derecha en escritorio o al fondo a la derecha en móvil */}
                                <div className=" flex items-center justify-center md:justify-end gap-3 shrink-0 self-end sm:self-center">
                                    <BotonIcon
                                        variant="delete"
                                        icon={Trash2}
                                        onAction={() => handleDeleteConfirm(allergy.id_alergia || allergy.id)}
                                        style="bg-baby-pink hover:bg-baby-pink-hover text-black p-3 rounded-full transition-colors"
                                    />
                                </div>
                            </div>
                        ))}
                    </>
                )}


                {(!allergies || allergies.length === 0) && (
                    <p className="text-gray-400 text-center py-4 font-medium">No hay alergias registradas.</p>
                )}
            </div>
        </div>
    );
}