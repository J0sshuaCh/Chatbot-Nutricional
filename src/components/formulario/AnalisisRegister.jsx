import React, { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Swal from 'sweetalert2'
import { Input } from '../ui/Input' // Ajusta la ruta a tu Input
import { BotonPrimary } from '../ui/BotonPrimary' // Ajusta la ruta a tu BotonPrimary

export const AnalisisRegister = ({
    onClose,
    babySelect, // Objeto del bebé seleccionado: { id_bebe: ..., nombre: ..., fecha_nacimiento: 'YYYY-MM-DD' }
    insertar,   // Función mutate de tu hook
}) => {

    // 1. Definimos el esquema de validación dinámico con Zod
    const analisisSchema = z.object({
        descrip: z.string().min(3, { message: "La descripción debe tener al menos 3 caracteres" }),
        fecha_control: z.string()
            .min(1, { message: "La fecha de control es obligatoria" })
            .refine((fechaControlString) => {
                // Si no hay bebé seleccionado o no tiene fecha de nacimiento, omitimos esta validación temporalmente
                if (!babySelect?.fecha_nacimiento) return true;

                const fControl = new Date(fechaControlString);
                const fNacimiento = new Date(babySelect.fecha_nacimiento);
                // Validamos que la fecha de control sea mayor o igual a la de nacimiento
                return fControl >= fNacimiento;
            }, {
                message: `La fecha no puede ser menor al nacimiento (${babySelect?.fecha_nacimiento || ''})`
            }),
        peso: z.string()
            .min(1, { message: "El peso es obligatorio" })
            .refine((val) => !isNaN(Number(val)) && Number(val) > 0, { message: "Debe ser un número mayor a 0" }),
        talla: z.string()
            .min(1, { message: "La talla es obligatoria" })
            .refine((val) => !isNaN(Number(val)) && Number(val) > 0, { message: "Debe ser un número mayor a 0" }),
        estado: z.boolean()
    })

    // 2. Inicializamos useForm
    const {
        register,
        handleSubmit,
        control, // Necesario para manejar el componente controlado Switch
        formState: { errors, isSubmitting },
        reset
    } = useForm({
        resolver: zodResolver(analisisSchema),
        defaultValues: {
            descrip: '',
            fecha_control: new Date().toISOString().split('T')[0],
            peso: '',
            talla: '',
            estado: true // Por defecto true (Realizado)
        }
    })

    // 3. Resetea el formulario si cambia el bebé o se abre la modal
    useEffect(() => {
        reset({
            descrip: '',
            fecha_control: new Date().toISOString().split('T')[0],
            peso: '',
            talla: '',
            estado: true
        });
    }, [babySelect, reset]);

    console.log(babySelect)
    // 4. Función de envío del formulario
    const onSubmit = async (data) => {
        
        const dataFinal = {
            id_bebe: Number(babySelect.id_bebe),
            descrip: data.descrip,
            fecha_control: data.fecha_control,
            peso: Number(data.peso),
            talla: Number(data.talla),
            estado: data.estado
        };

        insertar(dataFinal, {
            onSuccess: () => {
                Swal.fire('¡Guardado!', 'El control médico ha sido registrado con éxito.', 'success');
                reset();
                onClose();
            },
            onError: (err) => {
                Swal.fire('Error', err?.message || 'No se pudo guardar el control', 'error');
            }
        });
    };

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
            {/* Fondo oscuro con desenfoque */}
            <div className='absolute inset-0 bg-black/40 backdrop-blur-xs' onClick={onClose}></div>

            {/* Tarjeta del Formulario */}
            <div className='relative z-10 w-full max-w-md p-6 bg-white rounded-3xl shadow-xl border border-zinc-100 flex flex-col gap-4'>

                <div>
                    <h2 className='text-xl font-bold text-zinc-800'>
                        Registrar Control Médico
                    </h2>
                    <p className='text-xs text-zinc-400 mt-1'>Ingresa las métricas correspondientes al control actual.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>

                    {/* SECCIÓN: FECHA DE CONTROL Y SWITCH DE ESTADO */}
                    <div className='grid grid-cols-5 gap-4 items-end'>
                        {/* CAMPO: FECHA DE CONTROL */}
                        <div className='flex flex-col gap-1.5 col-span-3'>
                            <label htmlFor='fecha_control' className='text-xs lg:text-sm font-semibold text-zinc-500 px-1'>Fecha del Control</label>
                            <Input
                                id='fecha_control'
                                type="date"
                                min={babySelect?.fecha_nacimiento} // Restringe a nivel nativo en navegadores modernos
                                {...register('fecha_control')}
                            />
                        </div>

                        {/* CAMPO: ESTADO (SWITCH ESTILO MATERIAL DESIGN) */}
                        <div className='flex flex-col gap-1.5 col-span-2 items-center pb-2'>
                            <label className='text-xs lg:text-sm font-semibold text-zinc-500 px-1 select-none'>¿Realizado?</label>
                            <Controller
                                name="estado"
                                control={control}
                                render={({ field }) => (
                                    <label className="relative inline-flex items-center cursor-pointer select-none mt-1">
                                        <input
                                            type="checkbox"
                                            checked={field.value}
                                            onChange={(e) => field.onChange(e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        {/* Cuerpo del Switch */}
                                        <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-baby-mint"></div>
                                    </label>
                                )}
                            />
                        </div>
                    </div>
                    {/* Alerta de error de fecha debajo de ambos controles si aplica */}
                    {errors.fecha_control && <span className='text-xs text-red-500 px-1 -mt-2'>{errors.fecha_control.message}</span>}

                    {/* CAMPOS EN FILA: PESO Y TALLA */}
                    <div className='grid grid-cols-2 gap-4'>
                        {/* CAMPO: PESO */}
                        <div className='flex flex-col gap-1.5'>
                            <label htmlFor='peso' className='text-xs lg:text-sm font-semibold text-zinc-500 px-1'>Peso (kg)</label>
                            <Input
                                id="peso"
                                type="number"
                                step="0.01"
                                placeholder="Ej. 6.45"
                                {...register('peso')}
                            />
                            {errors.peso && <span className='text-xs text-red-500 px-1'>{errors.peso.message}</span>}
                        </div>

                        {/* CAMPO: TALLA */}
                        <div className='flex flex-col gap-1.5'>
                            <label htmlFor='talla' className='text-xs lg:text-sm font-semibold text-zinc-500 px-1'>Talla (cm)</label>
                            <Input
                                id="talla"
                                type="number"
                                step="0.1"
                                placeholder="Ej. 62.5"
                                {...register('talla')}
                            />
                            {errors.talla && <span className='text-xs text-red-500 px-1'>{errors.talla.message}</span>}
                        </div>
                    </div>

                    {/* CAMPO: DESCRIPCIÓN */}
                    <div className='flex flex-col gap-1.5'>
                        <label htmlFor='descrip' className='text-xs lg:text-sm font-semibold text-zinc-500 px-1'>Descripción / Notas</label>
                        <textarea
                            id="descrip"
                            placeholder="Ej. Control de los 3 meses, vacunas al día."
                            rows={3}
                            {...register('descrip')}
                            className='w-full px-3 py-2 text-sm text-zinc-700 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-200 transition-all resize-none'
                        />
                        {errors.descrip && <span className='text-xs text-red-500 px-1'>{errors.descrip.message}</span>}
                    </div>

                    {/* BOTONES DE ACCIÓN */}
                    <div className='flex items-center gap-3 mt-2 w-full'>
                        <div className="flex-1">
                            <BotonPrimary
                                type="submit"
                                style="colorido"
                                claseColor="bg-baby-mint"
                                claseHover="hover:bg-baby-mint-hover"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Guardando...' : 'Registrar'}
                            </BotonPrimary>
                        </div>

                        <div className="flex-1">
                            <BotonPrimary
                                style="gris"
                                claseColor="bg-zinc-200"
                                claseHover="hover:bg-zinc-300"
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