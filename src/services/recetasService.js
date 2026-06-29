import { supabase } from "../supabase/client";


export const getRecetasConIngredientes = async () => {
    const { data, error } = await supabase
        .from('Receta')
        .select(`
      id_receta,
      titulo,
      descrip,
      rango_meses,
      tipo_comida,
      isPredeterminada,
      ingredientes:Receta_ingrediente (
        cantidad,
        detalle:Ingrediente (
          id_ingrediente,
          nombre
        )
      )
    `);

    if (error) {
        throw new Error(error.message);
    }

    // Opcional: Mapeamos la respuesta para que la estructura del JSON sea más amigable en tu Frontend
    return data.map(receta => ({
        id: receta.id_receta,
        titulo: receta.titulo,
        descripcion: receta.descrip,
        rangoMeses: receta.rango_meses,
        tipoComida: receta.tipo_comida,
        isPredeterminada: receta.isPredeterminada,
        ingredientes: receta.ingredientes.map(ri => ({
            cantidad: ri.cantidad,
            id_ingrediente: ri.detalle?.id_ingrediente,
            nombre: ri.detalle?.nombre
        }))
    }));
};
