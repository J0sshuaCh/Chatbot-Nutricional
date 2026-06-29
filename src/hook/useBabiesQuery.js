// src/hooks/useBabiesQuery.js
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { getBebes, insertBebe, updateBebe, deleteBebe } from "../services/babiesServices";

// 1. HOOK EXCLUSIVO PARA LEER (QUERY)
export const useBebes = () => {
    const { user: authUser } = useAuth();

    return useQuery({
        queryKey: ['bebe', authUser?.id],
        queryFn: () => getBebes(authUser.id),
        enabled: !!authUser?.id, // Solo si el ID real existe
        staleTime: 1000 * 60 * 5, // Evita llamadas repetidas por 5 minutos
    });
};

// 2. HOOK EXCLUSIVO PARA INSERTAR
export const useInsertBebe = () => {
    const queryClient = useQueryClient();
    const { user: authUser } = useAuth();

    return useMutation({
        mutationFn: insertBebe, // Recibe el objeto del nuevo bebé directamente
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bebe', authUser?.id] });
        }
    });
};

// 3. HOOK EXCLUSIVO PARA ACTUALIZAR
export const useUpdateBebe = () => {
    const queryClient = useQueryClient();
    const { user: authUser } = useAuth();

    return useMutation({
        mutationFn: ({ idBebe, data }) => updateBebe(idBebe, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bebe', authUser?.id] });
        }
    });
};

// 4. HOOK EXCLUSIVO PARA ELIMINAR
export const useDeleteBebe = () => {
    const queryClient = useQueryClient();
    const { user: authUser } = useAuth();

    return useMutation({
        mutationFn: deleteBebe, // Recibe el idBebe directamente
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bebe', authUser?.id] });
        }
    });
};
