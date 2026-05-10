'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

function translateAuthError(message: string): string {
  const m = message.toLowerCase()
  if (m.includes('user already registered')) return 'כתובת האימייל כבר רשומה.'
  if (m.includes('password should be at least'))
    return 'הסיסמה קצרה מדי (לפחות 6 תווים).'
  if (m.includes('rate limit')) return 'נסיונות רבים מדי. נסי שוב בעוד דקה.'
  return message
}

export async function signUpAction(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')

  if (!email || !password) {
    redirect(`/signup?error=${encodeURIComponent('יש להזין אימייל וסיסמה.')}`)
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({ email, password })

  if (error) {
    redirect(
      `/signup?error=${encodeURIComponent(translateAuthError(error.message))}`
    )
  }

  // If email confirmation is enabled, no session is returned — user must
  // confirm via email before they can sign in.
  if (!data.session) {
    redirect(
      `/login?notice=${encodeURIComponent(
        'נשלח אליך אימייל לאישור. לאחר האישור תוכלי להתחבר.'
      )}`
    )
  }

  redirect('/admin/morning')
}
