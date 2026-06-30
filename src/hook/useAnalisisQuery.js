import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAnalisisPorBebe, crearAnalisis, eliminarAnalisis, getTresUltimosAnalisisUsuario } from '../services/analisisService';

// 1. Hook para obtener la lista de análisis del bebé elegido
export const useAnalisisBebe = (idBebe) => {
    return useQuery({
        queryKey: ['analisis_bebe', idBebe],
        queryFn: () => getAnalisisPorBebe(idBebe),
        enabled: !!idBebe, // No ejecuta la consulta si no hay un idBebe válido
        staleTime: 1000 * 60 * 5, // 5 minutos de caché antes de considerarse obsoleta
    });
};

// Hook para obtener el top 3 de controles más recientes de cada bebé del usuario
export const useTresUltimosAnalisisGlobales = () => {
    return useQuery({
        queryKey: ['tres_ultimos_analisis_usuario'], // Clave única para la caché de TanStack
        queryFn: getTresUltimosAnalisisUsuario,      // La función que creamos para el RPC
        staleTime: 1000 * 60 * 5,                    // 5 minutos de datos frescos en caché
    });
};

// 2. Hook para crear un nuevo registro de análisis
export const useCrearAnalisisBebe = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (variables) => crearAnalisis(variables),

        onSuccess: (data) => {
            // Invalidamos la caché usando el id_bebe devuelto por el registro creado
            queryClient.invalidateQueries({ queryKey: ['analisis_bebe', data.id_bebe] });
            console.log('¡Análisis guardado con éxito!', data);
        },
        onError: (error) => {
            console.error('Error de Supabase (RLS o Constraints):', error.message);
        },
    });
};

// 3. Hook para eliminar un registro de análisis
export const useEliminarAnalisisBebe = () => {
    const queryClient = useQueryClient();

    return useMutation({
        // Aquí asumimos que pasas un objeto como { id_analisis, id_bebe } para poder invalidar la caché correctamente
        mutationFn: (variables) => eliminarAnalisis(variables.id_analisis),

        onSuccess: () => {
            // Invalidamos la caché usando el id_bebe que venía en los parámetros enviados a la mutación
            queryClient.invalidateQueries({ queryKey: ['analisis_bebe'] });
            console.log('¡Análisis eliminado con éxito!');
        },
        onError: (error) => {
            console.error('Error al eliminar el análisis (RLS o inexistente):', error.message);
        },
    });
};
