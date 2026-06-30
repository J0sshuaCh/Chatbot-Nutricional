// src/hooks/useAllergies.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllergies, createCustomAllergy, deleteCustomAllergy } from '../services/allergiesService';


// Agregamos 'onlyCustom' con valor por defecto false para no romper los lugares donde ya lo uses
export function useAllergies(idUsuario, onlyCustom = false) {
    return useQuery({
        // Incluimos onlyCustom en la key para que se refresque automáticamente si cambia el filtro
        queryKey: ['allergies', idUsuario, { onlyCustom }],
        queryFn: () => getAllergies(idUsuario, onlyCustom),
        enabled: !!idUsuario,
        staleTime: 1000 * 60 * 5,
    });
}

export const useAlergiasAlimentarias = (idUsuario, onlyCustom = false) => {
    return useQuery({
        queryKey: ['alergias', idUsuario, onlyCustom],
        queryFn: () => getAllergies(idUsuario, onlyCustom),
        // Habilitado solo si ya tienes el idUsuario
        enabled: Boolean(idUsuario),
        // Filtrado mágico en el frontend usando TanStack Query
        select: (todasLasAlergias) => {
            return todasLasAlergias.filter(
                (alergia) => alergia.categoria === 'ALIMENTARIA'
            );
        },
    });
};


export function useCreateAllergy() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createCustomAllergy,
        onSuccess: (data) => {
            // Invalidamos la caché usando el id_usuario retornado por la base de datos
            // Esto fuerza a useAllergies a traer los datos actualizados de Supabase
            queryClient.invalidateQueries({ queryKey: ['allergies', data.id_usuario] });
        },
    });
}


export function useDeleteAllergy() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteCustomAllergy,
        onSuccess: (data) => {
            // Invalidamos las consultas de alergias de este usuario para refrescar la tabla automáticamente
            queryClient.invalidateQueries({ queryKey: ['allergies', data.id_usuario] });
        },
    });
}