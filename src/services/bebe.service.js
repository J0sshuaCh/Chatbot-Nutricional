import { supabase } from '../lib/supabaseClient'

export async function getBebes() {
  const { data, error } = await supabase
    .from('Bebe')
    .select('*')
    .order('fecha_nacimiento', { ascending: false })
  if (error) throw new Error(error.message)
  return data || []
}

export async function getBebeById(bebeId) {
  const { data, error } = await supabase
    .from('Bebe')
    .select('*')
    .eq('id_bebe', bebeId)
    .single()
  if (error) throw new Error(error.message)
  return data
}

export async function createBebe({ name, fecha_nacimiento }) {
  const { data, error } = await supabase
    .from('Bebe')
    .insert([{ name, fecha_nacimiento }])
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data
}

export async function updateBebe(bebeId, updates) {
  const { data, error } = await supabase
    .from('Bebe')
    .update(updates)
    .eq('id_bebe', bebeId)
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data
}

export async function deleteBebe(bebeId) {
  const { error } = await supabase
    .from('Bebe')
    .delete()
    .eq('id_bebe', bebeId)
  if (error) throw new Error(error.message)
  return true
}

export function calcularEdadMeses(fechaNacimiento) {
  const nacimiento = new Date(fechaNacimiento)
  const hoy = new Date()
  const meses = (hoy.getFullYear() - nacimiento.getFullYear()) * 12
    + (hoy.getMonth() - nacimiento.getMonth())
  return Math.max(0, meses)
}
