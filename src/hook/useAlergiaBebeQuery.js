import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { asociarAlergia, eliminarAlergiaBebe, obtenerAlergiasBebe, obtenerTopTresAlergiasBebes } from '../services/alergiaBebeService';

//archivo hook
export const useAlergiasBebe = (idBebe) => {
    return useQuery({
        queryKey: ['alergias_bebe', idBebe],
        queryFn: () => obtenerAlergiasBebe(idBebe),
        enabled: !!idBebe, // No ejecuta la consulta si no hay un idBebe válido
        staleTime: 1000 * 60 * 5, // 5 minutos de caché antes de considerarse obsoleta
    });
};



export const useTresTopAlergiasBebe = () => {
    return useQuery({
        queryKey: ['alergias_dashboard_top3'],
        queryFn: obtenerTopTresAlergiasBebes,
        staleTime: 1000 * 60 * 5, // 5 minutos de caché
    });
};

export const useAsociarAlergiaBebe = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (variables) => asociarAlergia(variables),

        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['alergias_bebe', data.id_bebe] });
            console.log('¡Vínculo guardado con éxito!', data);
        },
        onError: (error) => {
            console.error('Error de Supabase (RLS o Constraints):', error.message);
        },
    });
};

export const useEliminarAlergiaBebe = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (variables) => eliminarAlergiaBebe(variables),

        onSuccess: (data, variables) => {
            // Invalidamos la caché usando el id_bebe que venía en los parámetros de la función
            queryClient.invalidateQueries({ queryKey: ['alergias_bebe', variables.id_bebe] });
            console.log('¡Alergia desasociada con éxito!');
        },
        onError: (error) => {
            console.error('Error al eliminar la alergia (RLS o inexistente):', error.message);
        },
    });
};