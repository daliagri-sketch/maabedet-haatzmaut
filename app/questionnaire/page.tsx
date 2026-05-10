import { createClient } from '@supabase/supabase-js'

import {
  QuestionnaireFlow,
  type QuestionnaireQuestion,
} from './questionnaire-flow'

// MVP: age group is fixed to 6-8 until we ask the parent.
const AGE_GROUP = '6-8'

export const dynamic = 'force-dynamic'

export default async function QuestionnairePage() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SECRET_KEY
  if (!url || !key) {
    throw new Error(
      'Questionnaire: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY must be set'
    )
  }
  const supabase = createClient(url, key, { auth: { persistSession: false } })

  const { data, error } = await supabase
    .from('questionnaire_questions')
    .select(
      'id, sort_order, question_text, answer_a, answer_b, answer_c, answer_d'
    )
    .eq('age_group', AGE_GROUP)
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .returns<QuestionnaireQuestion[]>()

  if (error) {
    throw new Error(`Failed to load questionnaire: ${error.message}`)
  }

  if (!data || data.length === 0) {
    return (
      <div
        dir="rtl"
        className="lab-paper flex min-h-svh items-center justify-center p-6 text-center"
      >
        <p className="lab-body lab-body-mute">אין שאלות זמינות כרגע.</p>
      </div>
    )
  }

  return <QuestionnaireFlow questions={data} />
}
