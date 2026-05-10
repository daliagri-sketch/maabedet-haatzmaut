import { redirect } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

import { createClient as createSSRClient } from '@/lib/supabase/server'

import { MorningAdmin, type MorningMessage } from './morning-admin'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'משפטי בוקר · Admin',
}

export default async function AdminMorningPage() {
  const ssr = await createSSRClient()
  const {
    data: { user },
  } = await ssr.auth.getUser()
  if (!user) {
    redirect('/login?next=/admin/morning')
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SECRET_KEY
  if (!url || !key) {
    throw new Error(
      'AdminMorning: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY must be set'
    )
  }
  const supabase = createClient(url, key, { auth: { persistSession: false } })

  const { data, error } = await supabase
    .from('admin_morning_messages')
    .select('id, text, category, age_tag, is_active, created_at')
    .order('created_at', { ascending: false })
    .returns<MorningMessage[]>()

  if (error) {
    throw new Error(`Failed to load morning messages: ${error.message}`)
  }

  return (
    <MorningAdmin
      initialMessages={data ?? []}
      userEmail={user.email ?? null}
    />
  )
}
