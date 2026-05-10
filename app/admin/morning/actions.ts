'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

import { createClient as createSSRClient } from '@/lib/supabase/server'

const ADMIN_PATH = '/admin/morning'

export type MorningMessageInput = {
  text: string
  category: string
  age_tag: string
  is_active: boolean
}

let cachedClient: SupabaseClient | null = null

function getClient(): SupabaseClient {
  if (cachedClient) return cachedClient
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SECRET_KEY
  if (!url || !key) {
    throw new Error(
      'admin/morning actions: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY must be set'
    )
  }
  cachedClient = createClient(url, key, { auth: { persistSession: false } })
  return cachedClient
}

function normalize(input: MorningMessageInput): MorningMessageInput {
  return {
    text: input.text.trim(),
    category: input.category.trim() || 'general',
    age_tag: input.age_tag,
    is_active: input.is_active,
  }
}

export async function createMessage(input: MorningMessageInput) {
  const payload = normalize(input)
  if (payload.text.length === 0) {
    throw new Error('createMessage: text must not be empty')
  }
  const supabase = getClient()
  const { error } = await supabase
    .from('admin_morning_messages')
    .insert(payload)
  if (error) throw new Error(`createMessage failed: ${error.message}`)
  revalidatePath(ADMIN_PATH)
}

export async function updateMessage(id: string, input: MorningMessageInput) {
  const payload = normalize(input)
  if (payload.text.length === 0) {
    throw new Error('updateMessage: text must not be empty')
  }
  const supabase = getClient()
  const { error } = await supabase
    .from('admin_morning_messages')
    .update(payload)
    .eq('id', id)
  if (error) throw new Error(`updateMessage failed: ${error.message}`)
  revalidatePath(ADMIN_PATH)
}

export async function deleteMessage(id: string) {
  const supabase = getClient()
  const { error } = await supabase
    .from('admin_morning_messages')
    .delete()
    .eq('id', id)
  if (error) throw new Error(`deleteMessage failed: ${error.message}`)
  revalidatePath(ADMIN_PATH)
}

export async function signOutAction() {
  const supabase = await createSSRClient()
  await supabase.auth.signOut()
  redirect('/login')
}
