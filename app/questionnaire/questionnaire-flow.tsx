'use client'

import { useState, useTransition } from 'react'

import type { AnswerLetter } from '@/lib/questionnaire/score-questionnaire'

import { submitQuestionnaire, type SubmitAnswer } from './actions'

export type QuestionnaireQuestion = {
  id: string
  sort_order: number
  question_text: string
  answer_a: string
  answer_b: string
  answer_c: string
  answer_d: string
}

type Props = {
  questions: QuestionnaireQuestion[]
}

export function QuestionnaireFlow({ questions }: Props) {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<SubmitAnswer[]>([])
  const [submitting, startTransition] = useTransition()

  const current = questions[index]
  const isLast = index === questions.length - 1

  const select = (letter: AnswerLetter) => {
    if (submitting) return
    const next: SubmitAnswer[] = [
      ...answers,
      { questionId: current.id, selectedAnswer: letter },
    ]
    setAnswers(next)

    if (isLast) {
      startTransition(async () => {
        await submitQuestionnaire(next)
      })
    } else {
      setIndex(index + 1)
    }
  }

  const options: Array<{ letter: AnswerLetter; text: string }> = [
    { letter: 'A', text: current.answer_a },
    { letter: 'B', text: current.answer_b },
    { letter: 'C', text: current.answer_c },
    { letter: 'D', text: current.answer_d },
  ]

  return (
    <div dir="rtl" className="lab-paper min-h-svh">
      <div
        className="relative mx-auto flex min-h-svh flex-col"
        style={{ maxWidth: 390 }}
      >
        <div className="relative z-10 px-7 pt-[58px]">
          <div className="lab-hr" />
          <div className="mt-6 flex items-center justify-between">
            <span
              className="lab-eyebrow"
              style={{ letterSpacing: '0.18em' }}
            >
              שאלון · {index + 1}/{questions.length}
            </span>
            <div className="flex items-center gap-1.5">
              {questions.map((_, i) => (
                <span
                  key={i}
                  className={`lab-step-dot ${i === index ? 'lab-active' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 flex-1 px-7 pt-8 pb-6">
          <h1
            className="lab-title-m"
            style={{
              color: 'var(--lab-ink-deep)',
              lineHeight: 1.3,
            }}
          >
            {current.question_text}
          </h1>

          <div className="mt-8 flex flex-col gap-3">
            {options.map((opt) => (
              <button
                key={opt.letter}
                type="button"
                disabled={submitting}
                onClick={() => select(opt.letter)}
                className="lab-card lab-press text-start"
                style={{
                  padding: '16px 18px',
                  fontFamily: "'Assistant', sans-serif",
                  fontSize: 15,
                  lineHeight: 1.55,
                  color: 'var(--lab-ink)',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  opacity: submitting ? 0.5 : 1,
                }}
              >
                {opt.text}
              </button>
            ))}
          </div>

          {submitting && (
            <p
              className="lab-body lab-body-mute mt-6 text-center"
              style={{ fontSize: 13 }}
            >
              שומר תוצאה…
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
