import Link from 'next/link'
import { redirect } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/server'

import { signInAction } from './actions'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'התחברות' }

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{
    error?: string
    notice?: string
    next?: string
  }>
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (user) {
    redirect('/admin/morning')
  }

  const { error, notice, next } = await searchParams
  const safeNext = next?.startsWith('/') ? next : '/admin/morning'

  return (
    <main
      dir="rtl"
      lang="he"
      className="flex min-h-svh items-center justify-center bg-background px-4 py-10"
    >
      <div className="flex w-full max-w-sm flex-col gap-6">
        <header className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">התחברות</h1>
          <p className="text-sm text-muted-foreground">
            כניסה למערכת ניהול התוכן.
          </p>
        </header>

        {notice && (
          <p
            className="rounded-md border border-foreground/15 bg-muted/50 px-3 py-2 text-sm"
            role="status"
          >
            {notice}
          </p>
        )}

        <form action={signInAction} className="flex flex-col gap-4">
          <input type="hidden" name="next" value={safeNext} />

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">אימייל</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              dir="ltr"
              placeholder="name@example.com"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">סיסמה</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              dir="ltr"
              minLength={6}
            />
          </div>

          {error && (
            <p
              className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
              role="alert"
            >
              {error}
            </p>
          )}

          <Button type="submit" className="w-full">
            התחברות
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          אין לך חשבון?{' '}
          <Link
            href="/signup"
            className="text-foreground underline underline-offset-4"
          >
            הרשמה
          </Link>
        </p>
      </div>
    </main>
  )
}
