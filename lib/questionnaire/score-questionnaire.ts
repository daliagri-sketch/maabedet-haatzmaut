export type Pattern = 'loop' | 'quiet_giveup' | 'zero_to_hundred' | 'just_this_once'

export type AnswerLetter = 'A' | 'B' | 'C' | 'D'

export type ResultType = 'dominant' | 'two_patterns'

export type ScoreResult = {
  primaryPattern: Pattern
  secondaryPattern: Pattern
  scores: Record<Pattern, number>
  resultType: ResultType
}

const ANSWER_TO_PATTERN: Record<AnswerLetter, Pattern> = {
  A: 'loop',
  B: 'quiet_giveup',
  C: 'zero_to_hundred',
  D: 'just_this_once',
}

// Fixed order for deterministic tiebreak: earlier entries win on equal scores.
const PATTERN_ORDER: Pattern[] = [
  'loop',
  'quiet_giveup',
  'zero_to_hundred',
  'just_this_once',
]

export function scoreQuestionnaire(answers: AnswerLetter[]): ScoreResult {
  const scores: Record<Pattern, number> = {
    loop: 0,
    quiet_giveup: 0,
    zero_to_hundred: 0,
    just_this_once: 0,
  }

  for (const a of answers) {
    scores[ANSWER_TO_PATTERN[a]]++
  }

  const ranked = PATTERN_ORDER.map((p) => ({ pattern: p, n: scores[p] })).sort(
    (a, b) => b.n - a.n
  )

  const primaryPattern = ranked[0].pattern
  const secondaryPattern = ranked[1].pattern
  const gap = ranked[0].n - ranked[1].n
  const resultType: ResultType = gap <= 2 ? 'two_patterns' : 'dominant'

  return { primaryPattern, secondaryPattern, scores, resultType }
}
