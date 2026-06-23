import { supabase } from '../lib/supabaseClient'

export async function getChatHistory() {
  const { data, error } = await supabase
    .from('Chats')
    .select('*')
    .order('fecha', { ascending: true })
  if (error) throw new Error(error.message)
  return data || []
}

export async function saveChatMessage(role, content) {
  const { data, error } = await supabase
    .from('Chats')
    .insert([{ role, content }])
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data
}

export async function clearChatHistory() {
  const { error } = await supabase
    .from('Chats')
    .delete()
    .neq('id_chat', 0)
  if (error) throw new Error(error.message)
  return true
}
