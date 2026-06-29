import { supabase } from '../lib/supabaseClient'

export async function getAlergias() {
  const { data, error } = await supabase
    .from('Alergia')
    .select('*')
    .order('descrip_alergia', { ascending: true })
  if (error) throw new Error(error.message)
  return data || []
}

export async function getAlergiasByBebe(bebeId) {
  const { data, error } = await supabase
    .from('AlergiaBebe')
    .select('id_alergia_bebe, id_bebe, Alergia(*)')
    .eq('id_bebe', bebeId)
  if (error) throw new Error(error.message)
  return data || []
}

export async function createAlergia({ descrip_alergia }) {
  const { data, error } = await supabase
    .from('Alergia')
    .insert([{ descrip_alergia }])
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data
}

export async function asignarAlergiaABebe(bebeId, alergiaId) {
  const { data, error } = await supabase
    .from('AlergiaBebe')
    .insert([{ id_bebe: bebeId, id_alergia: alergiaId }])
    .select()
    .single()
  if (error && error.code === '23505') {
    return { message: 'La alergía ya está asignada a este bebé' }
  }
  if (error) throw new Error(error.message)
  return data
}

export async function desasignarAlergiaDeBebe(alergiaBebeId) {
  const { error } = await supabase
    .from('AlergiaBebe')
    .delete()
    .eq('id_alergia_bebe', alergiaBebeId)
  if (error) throw new Error(error.message)
  return true
}

export async function deleteAlergia(alergiaId) {
  const { error } = await supabase
    .from('Alergia')
    .delete()
    .eq('id_alergia', alergiaId)
  if (error) throw new Error(error.message)
  return true
}
