import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { createClient, type SupabaseClient } from '@supabase/supabase-js'

import { saveQuestionnaireResult } from '../lib/questionnaire/save-questionnaire-result'
import type { AnswerLetter } from '../lib/questionnaire/score-questionnaire'

// Load .env.local into process.env before any DB access.
const envText = readFileSync(resolve(process.cwd(), '.env.local'), 'utf8')
for (const line of envText.split('\n')) {
  const t = line.trim()
  if (!t || t.startsWith('#')) continue
  const eq = t.indexOf('=')
  if (eq === -1) continue
  const k = t.slice(0, eq).trim()
  const v = t
    .slice(eq + 1)
    .split('#')[0]
    .trim()
  if (!(k in process.env)) process.env[k] = v
}

const TEST_PARENT_EMAIL = 'test-blindspot@example.com'
const TEST_CHILD_NAME = 'TEST Blindspot Child'

async function ensureTestParent(supabase: SupabaseClient): Promise<string> {
  // Check if an auth user with this email already exists.
  const { data: list, error: lErr } = await supabase.auth.admin.listUsers({
    perPage: 200,
  })
  if (lErr) throw new Error(`listUsers: ${lErr.message}`)
  const existing = list.users.find((u) => u.email === TEST_PARENT_EMAIL)

  let userId: string
  if (existing) {
    userId = existing.id
  } else {
    const { data: created, error } = await supabase.auth.admin.createUser({
      email: TEST_PARENT_EMAIL,
      password: 'Test-' + Math.random().toString(36).slice(2) + '!',
      email_confirm: true,
    })
    if (error || !created?.user)
      throw new Error(`createUser: ${error?.message ?? 'no user returned'}`)
    userId = created.user.id
  }

  // Ensure matching parents row.
  const { data: pRow } = await supabase
    .from('parents')
    .select('id')
    .eq('id', userId)
    .maybeSingle()

  if (!pRow) {
    const { error } = await supabase.from('parents').insert({
      id: userId,
      email: TEST_PARENT_EMAIL,
      full_name: 'Test Blindspot Parent',
    })
    if (error) throw new Error(`insert parent: ${error.message}`)
  }
  return userId
}

async function ensureTestChild(
  supabase: SupabaseClient,
  parentId: string
): Promise<string> {
  const { data: existing } = await supabase
    .from('children')
    .select('id')
    .eq('parent_id', parentId)
    .eq('name', TEST_CHILD_NAME)
    .maybeSingle()
  if (existing) return existing.id as string

  const { data: created, error } = await supabase
    .from('children')
    .insert({
      parent_id: parentId,
      name: TEST_CHILD_NAME,
      birthdate: '2018-01-01',
      gender: 'prefer_not_to_say',
    })
    .select('id')
    .single()
  if (error || !created)
    throw new Error(`insert child: ${error?.message ?? 'no row returned'}`)
  return created.id as string
}

async function main() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    { auth: { persistSession: false } }
  )

  const parentId = await ensureTestParent(supabase)
  console.log('test parent:', parentId)

  const childId = await ensureTestChild(supabase, parentId)
  console.log('test child :', childId)

  // Clear any prior result for this test parent so we only see this run.
  await supabase.from('user_pattern_results').delete().eq('parent_id', parentId)

  // Fetch the 12 questions for age 6-8.
  const { data: questions, error: qErr } = await supabase
    .from('questionnaire_questions')
    .select('id, sort_order')
    .eq('age_group', '6-8')
    .order('sort_order', { ascending: true })
  if (qErr) throw new Error(`fetch questions: ${qErr.message}`)
  if (!questions || questions.length !== 12) {
    throw new Error(`expected 12 questions for 6-8, got ${questions?.length ?? 0}`)
  }
  console.log(`fetched ${questions.length} questions for age 6-8`)

  // Mostly A → loop dominant (10 × A + 1 × B + 1 × C).
  const letters: AnswerLetter[] = [
    'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'B', 'C',
  ]
  const answers = questions.map((q, i) => ({
    questionId: q.id as string,
    selectedAnswer: letters[i],
  }))

  const saved = await saveQuestionnaireResult({ parentId, childId, answers })

  console.log('\n=== returned by saveQuestionnaireResult ===')
  console.log(JSON.stringify(saved, null, 2))

  // Read the row back from the DB to prove it was persisted.
  const { data: row, error: rErr } = await supabase
    .from('user_pattern_results')
    .select(
      'id, parent_id, child_id, primary_pattern, secondary_pattern, scores_json, result_type, created_at'
    )
    .eq('id', saved.id)
    .single()
  if (rErr) throw new Error(`fetch saved row: ${rErr.message}`)

  console.log('\n=== row from user_pattern_results ===')
  console.log(JSON.stringify(row, null, 2))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
