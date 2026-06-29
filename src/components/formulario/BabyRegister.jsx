import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Swal from 'sweetalert2'
import { Input } from '../ui/Input' // Ajusta la ruta a tu Input
import { BotonPrimary } from '../ui/BotonPrimary' // Ajusta la ruta a tu BotonPrimary
import { useAuth } from '../../lib/AuthContext'

// 1. Definimos el esquema de validación con Zod
const babySchema = z.object({
    name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
    fecha_nacimiento: z.string().min(1, { message: "La fecha de nacimiento es obligatoria" }),
    genero: z.string().min(1, { message: "Selecciona un género" }),
    icono: z.string().optional()
})

export const BabyRegister = ({
    onClose,
    accion = 'Registrar', // 'Registrar' o 'Editar'
    dataSelect,           // Datos del bebé si la acción es 'Editar'
    insertar,             // Funciónmutate del hook useBabyQuery
    editar                // Función mutate del hook useBabyQuery
}) => {
    const { user: authUser } = useAuth();

    // 2. Inicializamos useForm con el resolver de Zod
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm({
        resolver: zodResolver(babySchema),
        defaultValues: {
            name: '',
            fecha_nacimiento: new Date().toISOString().split('T')[0],
            genero: 'M',
            icono: '👶'
        }
    })

    // 3. Efecto para cargar los datos en caso de edición
    useEffect(() => {
        if (accion === 'Editar' && dataSelect) {
            reset({
                name: dataSelect.name || '',
                fecha_nacimiento: dataSelect.fecha_nacimiento || '',
                genero: dataSelect.genero || 'M',
                icono: dataSelect.icono || '👶'
            });
        }
    }, [accion, dataSelect, reset]);

    // 4. Función de envío del formulario
    const onSubmit = async (data) => {
        // Estructuramos la data mapeándola a las columnas exactas de tu BD
        const dataFinal = {
            name: data.name,
            fecha_nacimiento: data.fecha_nacimiento,
            genero: data.genero,
            icono: data.icono,
            id_usuario: authUser?.id // Incluimos el ID del usuario logueado
        };
        if (accion === 'Editar') {
            editar({ idBebe: dataSelect.id_bebe, data: dataFinal }, {
                onSuccess: () => {
                    Swal.fire('¡Editado!', 'Los datos del bebé se modificaron con éxito.', 'success');
                    onClose();
                },
                onError: (err) => {
                    Swal.fire('Error', err?.message || 'No se pudo actualizar', 'error');
                }
            });
        } else {
            insertar(dataFinal, {
                onSuccess: () => {
                    Swal.fire('¡Guardado!', 'El bebé ha sido registrado con éxito.', 'success');
                    reset();
                    onClose();
                },
                onError: (err) => {
                    Swal.fire('Error', err?.message || 'No se pudo guardar', 'error');
                }
            });
        }

    };

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
            {/* Fondo oscuro con desenfoque */}
            <div className='absolute inset-0 bg-black/40 backdrop-blur-xs' onClick={onClose}></div>

            {/* Tarjeta del Formulario */}
            <div className='relative z-10 w-full max-w-md p-6 bg-card rounded-xl shadow-lg border-border flex flex-col gap-4'>

                <div>
                    <h2 className='text-xl font-bold text-foreground'>
                        {accion === 'Editar' ? 'Editar datos de' : 'Registrar nuevo'} bebé
                    </h2>
                    <p className='text-xs text-muted-foreground mt-1'>Ingresa los datos básicos para las pruebas.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>

                    {/* CAMPO: NOMBRE (Usa tu Input) */}
                    <div className='flex flex-col gap-1.5'>
                        <label htmlFor='name' className='text-xs lg:text-sm font-semibold text-muted-foreground px-1'>Nombre completo</label>
                        <Input
                            id="name"
                            placeholder="Ej. Sofía"
                            {...register('name')}
                        />
                        {errors.name && <span className='text-xs text-red-500 dark:text-red-400 px-1'>{errors.name.message}</span>}
                    </div>

                    {/* CAMPO: FECHA DE NACIMIENTO */}
                    <div className='flex flex-col gap-1.5'>
                        <label htmlFor='fecha' className='text-xs lg:text-sm font-semibold text-muted-foreground px-1'>Fecha de nacimiento</label>
                        <Input
                            id='fecha'
                            type="date"

                            {...register('fecha_nacimiento')}
                        />
                        {errors.fecha_nacimiento && <span className='text-xs text-red-500 dark:text-red-400 px-1'>{errors.fecha_nacimiento.message}</span>}
                    </div>

                    {/* CAMPO: GÉNERO */}
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-xs font-semibold text-muted-foreground px-1'>Género</label>

                        <div className='flex gap-6 items-center px-1 py-1.5'>
                            {/* OPCIÓN: MASCULINO (Azul Bebé) */}
                            <label className='flex items-center gap-2 cursor-pointer text-sm text-foreground font-medium select-none'>
                                <input
                                    type="radio"
                                    value="M"
                                    {...register('genero')}
                                    className="w-4 h-4 cursor-pointer appearance-none rounded-full border-2 border-zinc-300 checked:border-[#a8d1ff] checked:bg-[#d0e7ff] dark:border-zinc-600 dark:checked:border-blue-400 dark:checked:bg-blue-900/40 transition-all"
                                />
                                <span>Niño</span>
                            </label>

                            {/* OPCIÓN: FEMENINO (Rosado Bebé) */}
                            <label className='flex items-center gap-2 cursor-pointer text-sm text-foreground font-medium select-none'>
                                <input
                                    type="radio"
                                    value="F"
                                    {...register('genero')}
                                    className="w-4 h-4 cursor-pointer appearance-none rounded-full border-2 border-zinc-300 checked:border-[#ffb3d1] checked:bg-[#ffd6e8] dark:border-zinc-600 dark:checked:border-pink-400 dark:checked:bg-pink-900/40 transition-all"
                                />
                                <span>Niña</span>
                            </label>
                        </div>

                        {/* Mensaje de error de Zod */}
                        {errors.genero && <span className='text-xs text-red-500 dark:text-red-400 px-1'>{errors.genero.message}</span>}
                    </div>


                    {/* BOTONES DE ACCIÓN */}
                    <div className='flex items-center gap-3 mt-2 w-full '>

                        <div className="flex-1">
                            <BotonPrimary
                                type="submit"
                                style="default"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Guardando...' : (accion === 'Editar' ? 'Actualizar' : 'Registrar')}
                            </BotonPrimary>
                        </div>

                        <div className="flex-1">
                            <BotonPrimary
                                style="gris"
                                action={onClose}
                            >
                                Cancelar
                            </BotonPrimary>
                        </div>


                    </div>

                </form>
            </div>
        </div>
    )
}
