import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod'
import { BotonPrimary } from "../ui/BotonPrimary"
import { Input } from "../ui/Input";
import Select from "../ui/Select";
import Swal from "sweetalert2";
import { useCreateAllergy } from "../../hook/useAllergiesQuery";

const allergieSchema = z.object({
    descrip_alergia: z.string().min(2, { message: "La descripción debe tener al menos 2 caracteres" }),
    // Si tu select guarda el objeto de la categoría completo: { id: string, label: string, icon: string }
    categoria: z.object({
        id: z.string(),
        label: z.string(),
        icon: z.string()
    }, { message: "Categoría obligatoria" })
})

export default function AllergiesRegister(props) {
    const { mutate: insertar, isPending: isCreando } = useCreateAllergy()

    // 2. Inicializamos useForm con el resolver de Zod
    const {
        control,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm({
        resolver: zodResolver(allergieSchema),
        defaultValues: {
            descrip_alergia: '',
            categoria: null,
        }
    })

    const isCargando = isSubmitting || isCreando;

    const onSubmit = (data) => {
        // Formateamos la estructura exacta que tu backend/Supabase espera
        const dataFinal = {
            descrip_alergia: data.descrip_alergia,
            categoria: typeof data.categoria === "object" ? data.categoria.id : data.categoria,
            idUsuario: props.authUser?.id // Enviado como idUsuario tal como lo mapea la mutationFn
        };

        // 2. Ejecutamos la mutación
        insertar(dataFinal, {
            onSuccess: () => {
                // Alerta de Éxito
                Swal.fire({
                    title: "¡Creado con éxito!",
                    text: `La alergia "${dataFinal.descrip_alergia}" ha sido registrada de forma personalizada.`,
                    icon: "success",
                    confirmButtonColor: "#3B82F6", // Color azul para combinar con tu tema
                });

                // Limpia el formulario a sus valores por defecto
                reset({ descrip_alergia: '', categoria: null });
            },
            onError: (error) => {
                // Alerta de Error
                Swal.fire({
                    title: "Error al registrar",
                    text: error?.message || "Hubo un problema al intentar guardar la alergia. Inténtalo de nuevo.",
                    icon: "error",
                    confirmButtonColor: "#EF4444",
                });
            }
        });
    };

    return (
        <div className=" mx-auto p-6 rounded-xl shadow-md border border-blue-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-5">
                Crear Alergia Personalizada
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                {/* Selector de Bebés */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs  lg:text-sm  font-semibold text-zinc-500 px-1">
                        Descripción Alergia
                    </label>
                    <Input
                        id="name"
                        placeholder="Polvo..."
                        {...register('descrip_alergia')}
                    />
                    {errors.descrip_alergia && <span className='text-xs text-red-500 px-1'>{errors.descrip_alergia.message}</span>}
                </div>

                {/* Selector de Alergias */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs lg:text-sm font-semibold text-zinc-500 px-1">
                        Seleccionar categoría
                    </label>
                    <Controller
                        name="categoria"
                        control={control}
                        render={({ field }) => (
                            <Select
                                items={props.categorias}
                                labelKey="label"
                                valueKey="id"
                                placeholder="Seleccione categoría..."
                                badge={(item) => item.icon}
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    {errors.categoria && (
                        <span className="text-xs text-red-500 mt-1">{errors.categoria.message}</span>
                    )}
                </div>


                {/* Botón Vincular */}
                <BotonPrimary
                    type="submit"
                    style="colorido"
                    claseColor="bg-baby-mint"
                    claseHover="hover:bg-baby-mint-hover"
                    disabled={isCargando}
                >
                    {isSubmitting ? 'Guardando...' :  '+ Crear Alergia en Catálogo'}
                </BotonPrimary>

            </form>
        </div>
    );
}