import { createClient, type SupabaseClient } from '@supabase/supabase-js'

import {
  scoreQuestionnaire,
  type AnswerLetter,
  type Pattern,
  type ResultType,
} from './score-questionnaire'

export type QuestionnaireSelection = {
  questionId: string
  selectedAnswer: AnswerLetter
}

export type SaveQuestionnaireResultInput = {
  parentId: string
  childId: string
  answers: QuestionnaireSelection[]
}

export type SavedQuestionnaireResult = {
  id: string
  parentId: string
  childId: string
  primaryPattern: Pattern
  secondaryPattern: Pattern
  scores: Record<Pattern, number>
  resultType: ResultType
  createdAt: string
}

type Row = {
  id: string
  parent_id: string
  child_id: string
  primary_pattern: Pattern
  secondary_pattern: Pattern
  scores_json: Record<Pattern, number>
  result_type: ResultType
  created_at: string
}

let cachedClient: SupabaseClient | null = null

function getClient(): SupabaseClient {
  if (cachedClient) return cachedClient
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SECRET_KEY
  if (!url || !key) {
    throw new Error(
      'saveQuestionnaireResult: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY must be set'
    )
  }
  cachedClient = createClient(url, key, { auth: { persistSession: false } })
  return cachedClient
}

export async function saveQuestionnaireResult(
  input: SaveQuestionnaireResultInput
): Promise<SavedQuestionnaireResult> {
  const letters: AnswerLetter[] = input.answers.map((a) => a.selectedAnswer)
  const { primaryPattern, secondaryPattern, scores, resultType } =
    scoreQuestionnaire(letters)

  const supabase = getClient()

  const { data, error } = await supabase
    .from('user_pattern_results')
    .insert({
      parent_id: input.parentId,
      child_id: input.childId,
      primary_pattern: primaryPattern,
      secondary_pattern: secondaryPattern,
      scores_json: scores,
      result_type: resultType,
    })
    .select()
    .single()

  if (error) {
    throw new Error(`saveQuestionnaireResult insert failed: ${error.message}`)
  }

  const row = data as Row
  return {
    id: row.id,
    parentId: row.parent_id,
    childId: row.child_id,
    primaryPattern: row.primary_pattern,
    secondaryPattern: row.secondary_pattern,
    scores: row.scores_json,
    resultType: row.result_type,
    createdAt: row.created_at,
  }
}
