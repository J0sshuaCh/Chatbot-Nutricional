import { supabase } from "../supabase/client";

// 1. CREAR (Insertar un nuevo bebé)
export const insertBebe = async (newBebe) => {
    const { data, error } = await supabase
        .from("Bebe")
        .insert(newBebe) // El objeto debe traer: id_usuario, name, fecha_nacimiento, icono, genero
        .select()
        .single();

    if (error) throw error;
    return data;
};

// 2. LEER (Obtener todos los bebés de un usuario específico)
export const getBebes = async (userId) => {
    const { data, error } = await supabase
        .from("Bebe")
        .select('*')
        .eq("id_usuario", userId)
        .order("id_bebe", { ascending: false }); // Ordena del más nuevo al más viejo

    if (error) throw error;
    return data;
};

// 3. ACTUALIZAR (Modificar datos de un bebé por su id_bebe)
export const updateBebe = async (idBebe, newData) => {
    const { data, error } = await supabase
        .from("Bebe")
        .update(newData)
        .eq("id_bebe", idBebe) // Filtramos por la clave primaria exacta
        .select()
        .single();

    if (error) throw error;
    return data;
};

// 4. ELIMINAR (Borrar un bebé de la base de datos)
export const deleteBebe = async (idBebe) => {
    const { data, error } = await supabase
        .from("Bebe")
        .delete()
        .eq("id_bebe", idBebe); // Filtramos por la clave primaria exacta

    if (error) throw error;
    return data;
};
