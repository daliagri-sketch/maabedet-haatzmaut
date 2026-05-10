import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { getContent, type GetContentParams } from '../lib/content/get-content'

// Load .env.local into process.env so getContent() can pick up credentials.
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

const tests: { label: string; params: GetContentParams }[] = [
  {
    label: '1. reminder + loop',
    params: { contentType: 'reminder', pattern: 'loop', limit: 5 },
  },
  {
    label: '2. routine_task + quiet_giveup',
    params: { contentType: 'routine_task', pattern: 'quiet_giveup', limit: 5 },
  },
  {
    label: '3. sos_body + burning',
    params: { contentType: 'sos_body', emotionalState: 'burning', limit: 5 },
  },
  {
    label: '4. sos_anchor + zero_to_hundred + stuck',
    params: {
      contentType: 'sos_anchor',
      pattern: 'zero_to_hundred',
      emotionalState: 'stuck',
      limit: 5,
    },
  },
  {
    label: '5. sos_action + just_this_once + empty',
    params: {
      contentType: 'sos_action',
      pattern: 'just_this_once',
      emotionalState: 'empty',
      limit: 5,
    },
  },
]

async function main() {
  for (const t of tests) {
    console.log('\n=== ' + t.label + ' ===')
    const results = await getContent(t.params)
    console.log(`returned ${results.length} row(s)`)
    for (const r of results) {
      const parts = [r.contentType, r.emotionalState ?? '—', r.patternSlug ?? 'all']
      console.log(`  [${parts.join(' / ')}]  ${r.body}`)
    }
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
