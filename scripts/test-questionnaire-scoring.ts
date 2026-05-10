import {
  scoreQuestionnaire,
  type AnswerLetter,
} from '../lib/questionnaire/score-questionnaire'

type Case = {
  label: string
  answers: AnswerLetter[]
  expect: { primary: string; resultType: string }
}

// Each case uses exactly 12 answers (one per question in an age group).
const cases: Case[] = [
  {
    label: '1. clear loop result',
    answers: ['A','A','A','A','A','A','A','A','A','A','B','C'],
    expect: { primary: 'loop', resultType: 'dominant' },
  },
  {
    label: '2. clear quiet_giveup result',
    answers: ['B','B','B','B','B','B','B','B','B','B','A','D'],
    expect: { primary: 'quiet_giveup', resultType: 'dominant' },
  },
  {
    label: '3. clear zero_to_hundred result',
    answers: ['C','C','C','C','C','C','C','C','C','C','A','B'],
    expect: { primary: 'zero_to_hundred', resultType: 'dominant' },
  },
  {
    label: '4. clear just_this_once result',
    answers: ['D','D','D','D','D','D','D','D','D','D','B','C'],
    expect: { primary: 'just_this_once', resultType: 'dominant' },
  },
  {
    label: '5. close result with two patterns (loop 5 / quiet_giveup 4)',
    answers: ['A','A','A','A','A','B','B','B','B','C','C','D'],
    expect: { primary: 'loop', resultType: 'two_patterns' },
  },
]

let failed = 0

for (const c of cases) {
  const r = scoreQuestionnaire(c.answers)
  const ok =
    r.primaryPattern === c.expect.primary && r.resultType === c.expect.resultType
  if (!ok) failed++

  console.log('\n=== ' + c.label + ' ===')
  console.log('scores         ', r.scores)
  console.log('primary        ', r.primaryPattern)
  console.log('secondary      ', r.secondaryPattern)
  console.log('resultType     ', r.resultType)
  console.log('expectation    ', c.expect)
  console.log('verdict        ', ok ? 'PASS' : 'FAIL')
}

console.log('\n---')
console.log(failed === 0 ? 'ALL CASES PASS' : `${failed} CASE(S) FAILED`)
process.exit(failed === 0 ? 0 : 1)
