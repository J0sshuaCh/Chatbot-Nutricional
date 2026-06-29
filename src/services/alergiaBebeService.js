import { supabase } from "../supabase/client";
//archivo service

export const obtenerAlergiasBebe = async (id_bebe) => {
    const { data, error } = await supabase
        .rpc('obtener_alergias_bebe', { id_bebe_param: id_bebe });

    if (error) {
        throw new Error(error.message);
    }

    return data; // Retorna el array de objetos con las alergias
};


export const obtenerTopTresAlergiasBebes = async () => {
    const { data, error } = await supabase
        .from('Bebe')
        .select(`
            id_bebe,
            name,
            AlergiaBebe (
                id_alergia_bebe,
                Alergia (
                    id_alergia,
                    descrip_alergia,
                    categoria
                )
            )
        `)
        .order('name', { ascending: true })
        .limit(3); // 🌟 Limitamos el resultado a los 3 primeros bebés

    if (error) {
        throw new Error(error.message);
    }

    // Mapeamos los datos para dejar la estructura limpia
    return data.map(bebe => ({
        id_bebe: bebe.id_bebe,
        nombre_bebe: bebe.name,
        alergias: (bebe.AlergiaBebe || [])
            .map(ab => ab.Alergia)
            .filter(alergia => alergia !== null)
    }));
};

/**
 * Vincula una alergia a un bebé específico
 */
export const asociarAlergia = async ({ id_bebe, id_alergia }) => {
    const { data, error } = await supabase
        .from('AlergiaBebe')
        .insert([{ id_bebe, id_alergia }])
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data;
};

/**
 * Elimina la relación entre una alergia y un bebé
 */
export const eliminarAlergiaBebe = async ({ id_bebe, id_alergia }) => {
    const { data, error } = await supabase
        .from('AlergiaBebe')
        .delete()
        .eq('id_bebe', id_bebe)
        .eq('id_alergia', id_alergia)
        .select(); // Opcional: para retornar el registro eliminado

    if (error) throw new Error(error.message);
    return data;
};