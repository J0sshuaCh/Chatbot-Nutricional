import { supabase } from "../lib/supabaseClient";

export const getAllergies = async (idUsuario, onlyCustom = false) => {
    let query = supabase
        .from('Alergia')
        .select('id_alergia, descrip_alergia, categoria, id_usuario');

    if (idUsuario) {
        if (onlyCustom) {
            // Trae UNICAMENTE las alergias creadas por este usuario específico
            query = query.eq('id_usuario', idUsuario);
        } else {
            // Trae las alergias del sistema (is null) O las que pertenezcan al usuario logueado
            query = query.or(`id_usuario.is.null,id_usuario.eq.${idUsuario}`);
        }
    } else {
        // Si por alguna razón el idUsuario no ha cargado, trae SOLO las del sistema para no romper la app
        query = query.is('id_usuario', null);
    }

    const { data, error } = await query.order('descrip_alergia', { ascending: true });

    if (error) {
        console.error("Error detallado de Supabase:", error);
        throw new Error(error.message);
    }

    return data;
};



// 2. Insertar una alergia personalizada del usuario
export const createCustomAllergy = async ({ descrip_alergia, categoria, idUsuario }) => {
    const { data, error } = await supabase
        .from('Alergia')
        .insert([
            {
                descrip_alergia,
                categoria,
                id_usuario: idUsuario // Se vincula para que solo la vea este usuario
            }
        ])
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data;
};

// 3. Eliminar una alergia personalizada del usuario
export const deleteCustomAllergy = async (idAlergia) => {
    const { data, error } = await supabase
        .from('Alergia')
        .delete()
        .eq('id_alergia', idAlergia)
        .select()
        .single(); // El select().single() nos devolverá el objeto eliminado para saber a qué usuario pertenecía

    if (error) {
        console.error("Error al eliminar la alergia en Supabase:", error);
        throw new Error(error.message);
    }
    return data;
};