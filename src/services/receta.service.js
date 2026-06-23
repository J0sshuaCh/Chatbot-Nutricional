import { supabase } from '../lib/supabaseClient'

export async function getRecetas(edad) {
  let query = supabase.from('Receta').select('*')
  if (edad) {
    query = query.lte('edad_minima_meses', parseInt(edad))
  }
  const { data, error } = await query.order('name', { ascending: true })
  if (error) throw new Error(error.message)
  return data || []
}

export async function getRecetaById(id) {
  const { data, error } = await supabase
    .from('Receta')
    .select('*')
    .eq('id_receta', id)
    .single()
  if (error) throw new Error(error.message)
  return data
}

export async function getFavoritas(bebeId) {
  const { data, error } = await supabase
    .from('RecetaFavorita')
    .select('id_favorito, id_receta, Receta(*)')
    .eq('id_bebe', bebeId)
  if (error) throw new Error(error.message)
  return data || []
}

export async function toggleFavorita(bebeId, recetaId) {
  const { data: existing } = await supabase
    .from('RecetaFavorita')
    .select('id_favorito')
    .eq('id_bebe', bebeId)
    .eq('id_receta', recetaId)
    .single()

  if (existing) {
    const { error } = await supabase
      .from('RecetaFavorita')
      .delete()
      .eq('id_favorito', existing.id_favorito)
    if (error) throw new Error(error.message)
    return { favorita: false }
  }

  const { error } = await supabase
    .from('RecetaFavorita')
    .insert([{ id_bebe: bebeId, id_receta: recetaId }])
  if (error) throw new Error(error.message)
  return { favorita: true }
}
