#!/usr/bin/env node
// One-shot helper: replace the seed contents of admin_morning_messages with
// the locked content-bank selection. Reads the PAT from .mcp.json.
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const mcp = JSON.parse(readFileSync(join(root, '.mcp.json'), 'utf8'))
const TOKEN = mcp.mcpServers.supabase.headers.Authorization.replace(
  /^Bearer\s+/i,
  ''
)
const PROJECT = 'pbpvxkzuhjdfzeotbuqs'
const API = `https://api.supabase.com/v1/projects/${PROJECT}/database/query`

async function runSQL(query) {
  const res = await fetch(API, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })
  const text = await res.text()
  let body
  try {
    body = JSON.parse(text)
  } catch {
    body = text
  }
  return { status: res.status, ok: res.ok, body }
}

function dump(label, r) {
  console.log(`--- ${label} → HTTP ${r.status} ---`)
  console.log(JSON.stringify(r.body, null, 2))
  console.log()
}

// 8 messages: 2 per pattern, mixing arenas, all age_tag='all'.
// Source: morning_messages_v1_0.md (LOCKED).
const seed = [
  // loop (הלופ)
  {
    text: 'הבוקר מתחיל.\nפעם אחת — ולתת לשקט לעבוד.',
    category: 'loop',
  },
  {
    text: 'השיעורים מתקרבים.\nלקרוא — ולא לחזור.',
    category: 'loop',
  },
  // quiet_giveup (ויתור שקט)
  {
    text: 'לא להלביש במקומו.\nלעמוד ליד — ולא להיכנס.',
    category: 'quiet_giveup',
  },
  {
    text: 'לא להישאר בחדר.\nלצאת — ולהישאר בחוץ.',
    category: 'quiet_giveup',
  },
  // zero_to_hundred (מ-0 ל-100)
  {
    text: 'לפני שזה עולה.\nנשימה אחת — ולא להגיע ל-100.',
    category: 'zero_to_hundred',
  },
  {
    text: 'לפני שהקול עולה.\nצעד אחורה — ולא ליפול פנימה.',
    category: 'zero_to_hundred',
  },
  // just_this_once (רק הפעם)
  {
    text: 'לא "רק הפעם".\nהכלל — והוא נשאר.',
    category: 'just_this_once',
  },
  {
    text: 'לא "עוד רמה אחת".\nהזמן — ולא לתת עוד.',
    category: 'just_this_once',
  },
]

function pgEscape(s) {
  // single-quote → doubled single-quote; PostgreSQL handles literal newlines fine.
  return s.replace(/'/g, "''")
}

const valuesSQL = seed
  .map(
    (r) =>
      `('${pgEscape(r.text)}', '${pgEscape(r.category)}', 'all', true)`
  )
  .join(',\n  ')

const replaceSQL = `
delete from public.admin_morning_messages;
insert into public.admin_morning_messages (text, category, age_tag, is_active) values
  ${valuesSQL};
`

console.log('SQL to be executed (preview):')
console.log(replaceSQL)
console.log('---')

const r = await runSQL(replaceSQL)
dump('replace', r)
if (!r.ok) {
  console.log('FAILED. Aborting.')
  process.exit(1)
}

const reload = await runSQL(`notify pgrst, 'reload schema'`)
dump('notify pgrst', reload)

const verify = await runSQL(
  `select count(*)::int as n,
          array_agg(category order by category) as categories
   from public.admin_morning_messages`
)
dump('verify', verify)

console.log('Done.')
