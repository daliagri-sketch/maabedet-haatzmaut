'use server'

import { redirect } from 'next/navigation'

import { saveQuestionnaireResult } from '@/lib/questionnaire/save-questionnaire-result'
import type { AnswerLetter } from '@/lib/questionnaire/score-questionnaire'
import { getTestIdentity } from '@/lib/questionnaire/get-test-identity'

export type SubmitAnswer = {
  questionId: string
  selectedAnswer: AnswerLetter
}

export async function submitQuestionnaire(answers: SubmitAnswer[]) {
  const { parentId, childId } = await getTestIdentity()
  const result = await saveQuestionnaireResult({
    parentId,
    childId,
    answers,
  })
  redirect(`/result?id=${result.id}`)
}
