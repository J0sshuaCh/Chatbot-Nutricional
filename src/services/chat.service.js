import { supabase } from '../lib/supabaseClient'

export async function createSession(userId, title = 'Nueva conversación') {
  const { data, error } = await supabase
    .from('ChatSession')
    .insert([{ id_usuario: userId, title }])
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data
}

export async function getSessions(userId) {
  const { data, error } = await supabase
    .from('ChatSession')
    .select('*')
    .eq('id_usuario', userId)
    .order('updated_at', { ascending: false })
  if (error) throw new Error(error.message)
  return data || []
}

export async function renameSession(sessionId, title) {
  const { data, error } = await supabase
    .from('ChatSession')
    .update({ title })
    .eq('id_session', sessionId)
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data
}

export async function deleteSession(sessionId) {
  const { error } = await supabase
    .from('ChatSession')
    .delete()
    .eq('id_session', sessionId)
  if (error) throw new Error(error.message)
  return true
}

export async function getMessages(sessionId) {
  const { data, error } = await supabase
    .from('Chats')
    .select('*')
    .eq('id_session', sessionId)
    .order('fecha', { ascending: true })
  if (error) throw new Error(error.message)
  return data || []
}

export async function saveMessage(sessionId, userId, role, content) {
  const { data, error } = await supabase
    .from('Chats')
    .insert([{ id_session: sessionId, id_usuario: userId, role, content }])
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data
}
