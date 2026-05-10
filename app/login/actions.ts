'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

function translateAuthError(message: string): string {
  const m = message.toLowerCase()
  if (m.includes('invalid login credentials')) return 'אימייל או סיסמה שגויים.'
  if (m.includes('email not confirmed'))
    return 'האימייל עדיין לא אומת. בדקי את תיבת הדואר.'
  if (m.includes('rate limit')) return 'נסיונות רבים מדי. נסי שוב בעוד דקה.'
  return message
}

export async function signInAction(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')
  const next = String(formData.get('next') ?? '/admin/morning')

  if (!email || !password) {
    redirect(
      `/login?error=${encodeURIComponent('יש להזין אימייל וסיסמה.')}` +
        `&next=${encodeURIComponent(next)}`
    )
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    redirect(
      `/login?error=${encodeURIComponent(translateAuthError(error.message))}` +
        `&next=${encodeURIComponent(next)}`
    )
  }

  const safeNext = next.startsWith('/') ? next : '/admin/morning'
  redirect(safeNext)
}
