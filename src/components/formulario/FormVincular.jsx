import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod'
import SearchableSelect from "../ui/SeachableSelect";
import { BotonPrimary } from "../ui/BotonPrimary"
import Swal from "sweetalert2";

const linkedFormSchema = z.object({
    // Permite cualquier objeto, pero exige que no sea null
    alergia: z
        .any()
        .nullable()
        .refine((val) => val !== null, { message: "Debe seleccionar una alergia" }),

    bebe: z
        .any()
        .nullable()
        .refine((val) => val !== null, { message: "Debe seleccionar un bebé" }),
});

export default function FormVincular(props) {
    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: zodResolver(linkedFormSchema),
        defaultValues: {
            alergia: null,
            bebe: null,
        },
    });

    const onSubmit = (data) => {
        // Estructura limpia para enviar a Supabase
        const payload = {
            id_alergia: Number(data.alergia.id_alergia), // Forzamos número por si viene como string
            id_bebe: Number(data.bebe.id_bebe),
        };

        console.log("Insertando en la tabla AlergiaBebe:", payload);

        // Llamamos a la mutación que viene por props
        props.asociarAlergiaBebe(payload, {
            onSuccess: () => {
                Swal.fire('¡Vinculado!', 'La alergia ha sido asignada al bebé con éxito.', 'success');
                reset(); // Mantenlo aquí adentro para limpiar SOLO si todo sale bien
            },
            onError: (err) => {
                Swal.fire('Error', err?.message || 'No se pudo vincular la alergia', 'error');
            }
        });
    };

    return (
        <div className=" mx-auto mt-10 p-6 rounded-xl shadow-sm border-border">
            <h2 className="text-xl font-semibold text-foreground mb-5">
                Vincular Alergia a Bebé
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                {/* Selector de Bebés */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs  lg:text-sm  font-semibold text-muted-foreground px-1">
                        Seleccionar Bebé
                    </label>
                    <Controller
                        name="bebe"
                        control={control}
                        render={({ field }) => (
                            <SearchableSelect
                                items={props.bebes}
                                labelKey="name"
                                valueKey="id_bebe"
                                placeholder="Busca un bebé..."
                                badge={(item) => item.fecha_nacimiento}
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    {errors.bebe && (
                        <p className="text-xs text-red-500 mt-1">{errors.bebe.message}</p>
                    )}
                </div>

                {/* Selector de Alergias */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs lg:text-sm font-semibold text-muted-foreground px-1">
                        Seleccionar Alergia
                    </label>
                    <Controller
                        name="alergia"
                        control={control}
                        render={({ field }) => (
                            <SearchableSelect
                                items={props.alergias}
                                labelKey="descrip_alergia"
                                valueKey="id_alergia"
                                placeholder="Busca una alergia..."
                                badge={(item) => item.categoria}
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    {errors.alergia && (
                        <p className="text-xs text-red-500 mt-1">{errors.alergia.message}</p>
                    )}
                </div>


                {/* Botón Vincular */}
                <BotonPrimary
                    type="submit"
                    disabled={isSubmitting}
                    style="default"
                >
                    {isSubmitting ? "Vinculando..." : "Vincular"}
                </BotonPrimary>

            </form>
        </div>
    );
}