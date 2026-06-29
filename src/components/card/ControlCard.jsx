import { Calendar, CheckCircle2, Trash2 } from "lucide-react";
import { BotonIcon } from "../ui/BotonIcon";
import Swal from "sweetalert2";

export const ControlCard = ({ control, onEliminar, showBabyContext = false }) => {
    const formatFecha = (fechaStr) => {
        if (!fechaStr) return '';
        const fecha = new Date(fechaStr + 'T00:00:00');
        const dia = fecha.getDate();
        const mes = fecha.toLocaleDateString('es-ES', { month: 'short' });
        const anio = fecha.getFullYear();
        const mesCapitalizado = mes.charAt(0).toUpperCase() + mes.slice(1).replace('.', '');
        return { diaMes: `${dia} ${mesCapitalizado}`, anio };
    };

    const { diaMes, anio } = formatFecha(control.fecha_control);

    const handleDeleteConfirm = (id) => {
        if (!id) return;

        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            background: '#ffffff',
            customClass: { popup: 'rounded-2xl font-sans' }
        }).then((result) => {
            if (result.isConfirmed) {
                onEliminar(
                    { id_analisis: id, id_bebe: control.id_bebe },
                    {
                        onSuccess: () => {
                            Swal.fire({
                                title: '¡Eliminado!',
                                text: 'El análisis ha sido borrado con éxito.',
                                icon: 'success',
                                timer: 1500,
                                showConfirmButton: false
                            });
                        },
                        onError: (error) => {
                            Swal.fire({
                                title: 'Error',
                                text: error?.message || 'No se pudo eliminar.',
                                icon: 'error'
                            });
                        }
                    }
                );
            }
        });
    };

    return (
        /* Si quieres que el card dependa del espacio que le da su padre, 
          asegúrate de que el componente que renderiza a <ControlCard /> tenga la clase '@container'.
          
          Aquí cambiamos los prefijos tradicionales por prefijos de contenedor (@lg:, @sm:)
        */
        <div className="flex flex-col @md:flex-row justify-between p-4 bg-white rounded-2xl border border-gray-200 shadow-md transition-all gap-4 mb-3 last:mb-0">

            {/* Sección de Datos Izquierda */}
            <div className="flex items-start  gap-3 @sm:gap-4 flex-1">
                {/* Icono de Calendario Circular */}
                {showBabyContext === false && (
                    <div className="hidden @sm:flex p-3 bg-blue-50 text-blue-500 rounded-full items-center justify-center shrink-0">
                        <Calendar className="w-5 h-5" />
                    </div>
                )}

                {/* Bloque de Fecha y Contenido agrupados */}
                <div className="flex flex-col @sm:flex-row @sm:items-center gap-2 @sm:gap-4 flex-1">
                    {/* Bloque de Fecha */}
                    {showBabyContext && control.edad_meses_en_control !== undefined ? (
                        <>
                            <div>
                                <span className="font-semibold text-bg-primary mr-5">{control.edad_meses_en_control} meses</span>
                                <span className="text-zinc-300 hidden @sm:inline">|</span>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-row @sm:flex-col gap-1.5 @sm:gap-0 text-xs @sm:text-sm font-semibold text-zinc-500 leading-tight @sm:min-w-[75px]">
                            <span>{diaMes}</span>
                            <span className="@sm:before:content-none before:content-['•'] before:mr-1.5 before:text-zinc-300">{anio}</span>
                        </div>
                    )}

                    {/* Bloque de Información del Control */}
                    <div className="flex flex-col gap-0.5">
                        <h3 className="font-bold text-zinc-800 @sm:text-base balance">
                            {control.descrip || 'Control Médico'}
                        </h3>
                        <p className="text-xs @sm:text-sm text-zinc-500 ">
                            Peso: <span className="font-semibold text-zinc-700">{control.peso} kg</span>
                            <span className="mx-2 text-zinc-300">|</span>
                            Talla: <span className="font-semibold text-zinc-700">{control.talla} cm</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Sección de Estados y Acciones Derecha */}
            <div className="flex items-center justify-between @md:justify-end gap-4 border-t border-zinc-50  @sm:pt-0 @sm:border-none">
                {showBabyContext ? (
                    <div className="flex items-center gap-2 bg-zinc-100 px-3 py-1.5 rounded-xl border border-zinc-200 ">
                        <span className="font-semibold text-zinc-400 @md:hidden">Bebé:</span>
                        <span className="font-bold text-zinc-700">{control.nombre_bebe || 'Bebé'}</span>
                    </div>
                    
                ) : (
                    <>
                        <div className="flex items-center gap-2 @sm:pr-1">
                            <span className="text-xs font-semibold text-zinc-400 @md:hidden">Estado:</span>
                            {control.estado ? (
                                <CheckCircle2 className="w-6 h-6 text-teal-400 fill-teal-50/50" />
                            ) : (
                                <div className="w-6 h-6 rounded-full border-2 border-zinc-200" />
                            )}
                        </div>
                        {/* Botón Eliminar */}
                        <div className="flex items-center">
                            <BotonIcon
                                variant="delete"
                                icon={Trash2}
                                onAction={() => handleDeleteConfirm(control.id_analisis)}
                                style="bg-baby-pink hover:bg-baby-pink-hover text-black p-2.5 rounded-full transition-colors flex items-center justify-center"
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};