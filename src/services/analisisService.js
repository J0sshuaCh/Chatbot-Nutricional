import { supabase } from "../supabase/client";

// Obtener todos los análisis de un bebé específico
export const getAnalisisPorBebe = async (targetIdBebe) => {
    const { data, error } = await supabase
        .rpc('get_analisis_por_bebe', { target_id_bebe: targetIdBebe });

    if (error) {
        throw new Error(error.message);
    }

    return data || [];
};

export const getTresUltimosAnalisisUsuario = async () => {
    const { data, error } = await supabase
        .rpc('get_tres_ultimos_analisis_usuario'); // Paréntesis totalmente vacíos

    if (error) {
        console.error("Detalle del error de Supabase:", error);
        throw new Error(error.message);
    }

    return data || [];
};


// Crear un nuevo registro de análisis
export const crearAnalisis = async (nuevoAnalisis) => {
    const { data, error } = await supabase
        .from('Analisis')
        .insert([nuevoAnalisis])
        .select()
        .single(); // Devuelve directamente el objeto creado en lugar de un array

    if (error) {
        throw new Error(error.message);
    }

    return data;
};


// Eliminar un análisis por su ID
export const eliminarAnalisis = async (idAnalisis) => {
    const { error } = await supabase
        .from('Analisis')
        .delete()
        .eq('id_analisis', idAnalisis);

    if (error) {
        throw new Error(error.message);
    }

    return true; // Retorna true si la eliminación fue exitosa
};
