import { supabase } from '../lib/supabaseClient'

export async function getAnalisisByBebe(bebeId) {
  const { data, error } = await supabase
    .from('Analisis')
    .select('*')
    .eq('id_bebe', bebeId)
    .order('fecha_control', { ascending: false })
  if (error) throw new Error(error.message)
  return data || []
}

export async function getUltimoAnalisis(bebeId) {
  const { data, error } = await supabase
    .from('Analisis')
    .select('*')
    .eq('id_bebe', bebeId)
    .order('fecha_control', { ascending: false })
    .limit(1)
    .single()
  if (error && error.code === 'PGRST116') return null
  if (error) throw new Error(error.message)
  return data
}

export async function createAnalisis({ id_bebe, descrip, fecha_control, peso, talla }) {
  const { data, error } = await supabase
    .from('Analisis')
    .insert([{ id_bebe, descrip, fecha_control, peso, talla }])
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data
}

export async function updateAnalisis(analisisId, updates) {
  const { data, error } = await supabase
    .from('Analisis')
    .update(updates)
    .eq('id_analisis', analisisId)
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data
}

export async function deleteAnalisis(analisisId) {
  const { error } = await supabase
    .from('Analisis')
    .delete()
    .eq('id_analisis', analisisId)
  if (error) throw new Error(error.message)
  return true
}

export function evaluarEstadoNutricional(peso, talla, edadMeses) {
  const tallaM = talla / 100
  const imc = peso / (tallaM * tallaM)

  let diagnostico
  if (edadMeses < 24) {
    if (imc < 14) diagnostico = 'riesgo_de_desnutricion'
    else if (imc > 18) diagnostico = 'sobrepeso'
    else diagnostico = 'normal'
  } else {
    if (imc < 15) diagnostico = 'riesgo_de_desnutricion'
    else if (imc > 20) diagnostico = 'sobrepeso'
    else diagnostico = 'normal'
  }

  return {
    imc: Math.round(imc * 100) / 100,
    diagnostico,
    requiere_atencion: diagnostico !== 'normal',
  }
}
