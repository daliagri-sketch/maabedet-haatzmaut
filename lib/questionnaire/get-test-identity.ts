import { createClient } from '@supabase/supabase-js'

// MVP helper: resolves the test parent + child for the questionnaire flow
// while real onboarding / auth is not yet wired.
// Replace with the authenticated user's identity once auth is in place.

const TEST_PARENT_EMAIL = 'test-blindspot@example.com'

export async function getTestIdentity(): Promise<{
  parentId: string
  childId: string
}> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SECRET_KEY
  if (!url || !key) {
    throw new Error(
      'getTestIdentity: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY must be set'
    )
  }
  const supabase = createClient(url, key, { auth: { persistSession: false } })

  const { data: parent, error: pErr } = await supabase
    .from('parents')
    .select('id')
    .eq('email', TEST_PARENT_EMAIL)
    .maybeSingle()
  if (pErr) throw new Error(`getTestIdentity parent lookup: ${pErr.message}`)
  if (!parent) {
    throw new Error(
      'Test parent not found. Run `npx tsx scripts/test-save-questionnaire-result.ts` once to seed it.'
    )
  }

  const { data: child, error: cErr } = await supabase
    .from('children')
    .select('id')
    .eq('parent_id', parent.id as string)
    .order('created_at', { ascending: true })
    .limit(1)
    .maybeSingle()
  if (cErr) throw new Error(`getTestIdentity child lookup: ${cErr.message}`)
  if (!child) {
    throw new Error(
      'Test child not found. Run `npx tsx scripts/test-save-questionnaire-result.ts` once to seed it.'
    )
  }

  return { parentId: parent.id as string, childId: child.id as string }
}
