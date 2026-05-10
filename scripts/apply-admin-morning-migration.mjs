#!/usr/bin/env node
// One-shot helper: apply the admin_morning_messages migration via the
// Supabase Management API. Reads the PAT from .mcp.json. Idempotent:
// if the table is already there it skips CREATE and only seeds if empty.
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const mcp = JSON.parse(readFileSync(join(root, '.mcp.json'), 'utf8'))
const auth = mcp.mcpServers.supabase.headers.Authorization
const TOKEN = auth.replace(/^Bearer\s+/i, '')
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

const migrationPath = join(
  root,
  'supabase',
  'migrations',
  '20260502000000_admin_morning_messages.sql'
)
const migrationSQL = readFileSync(migrationPath, 'utf8')

// Probe — does the table exist?
const probe = await runSQL(
  `select to_regclass('public.admin_morning_messages')::text as table_oid`
)
dump('probe', probe)

const tableExists =
  Array.isArray(probe.body) &&
  probe.body[0] &&
  probe.body[0].table_oid !== null

if (!tableExists) {
  console.log('Table missing — running full migration…\n')
  const r = await runSQL(migrationSQL)
  dump('migration', r)
  if (!r.ok) {
    console.log('Migration FAILED. Aborting.')
    process.exit(1)
  }
} else {
  console.log('Table already exists — skipping CREATE.\n')
  const cnt = await runSQL(`select count(*)::int as n from public.admin_morning_messages`)
  dump('existing rowcount', cnt)
  const n = cnt.body?.[0]?.n ?? 0
  if (n === 0) {
    console.log('Table is empty — extracting INSERT block from migration and running it…\n')
    const insertMatch = migrationSQL.match(/insert into[\s\S]+/i)
    if (insertMatch) {
      const r = await runSQL(insertMatch[0])
      dump('seed insert', r)
    }
  }
}

// Force PostgREST to refresh its schema cache.
const reload = await runSQL(`notify pgrst, 'reload schema'`)
dump('notify pgrst', reload)

// Final verification.
const verify = await runSQL(
  `select count(*)::int as n from public.admin_morning_messages`
)
dump('verify count', verify)

console.log('Done.')
