import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export type ContentType =
  | 'reminder'
  | 'routine_task'
  | 'small_action'
  | 'child_learning'
  | 'sos_body'
  | 'sos_anchor'
  | 'sos_action'

export type Pattern = 'loop' | 'quiet_giveup' | 'zero_to_hundred' | 'just_this_once'

export type AgeGroup = '3-5' | '6-8' | '9-10' | 'all'

export type Arena =
  | 'morning'
  | 'screens'
  | 'food'
  | 'shower'
  | 'homework'
  | 'sleep'
  | 'siblings'
  | 'transitions'
  | 'all'

export type EmotionalState = 'burning' | 'stuck' | 'empty'

export type GetContentParams = {
  contentType: ContentType
  pattern?: Pattern
  ageGroup?: AgeGroup
  arena?: Arena
  emotionalState?: EmotionalState
  limit: number
}

export type ContentItem = {
  id: string
  title: string
  body: string
  contentType: ContentType
  patternSlug: Pattern | null
  ageGroup: AgeGroup
  arena: Arena
  emotionalState: EmotionalState | null
  sortOrder: number
}

type Row = {
  id: string
  title: string
  body: string
  content_type: ContentType
  age_group: AgeGroup
  arena: Arena
  emotional_state: EmotionalState | null
  sort_order: number
  patterns: { slug: Pattern } | { slug: Pattern }[] | null
}

let cachedClient: SupabaseClient | null = null

function getClient(): SupabaseClient {
  if (cachedClient) return cachedClient
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SECRET_KEY
  if (!url || !key) {
    throw new Error(
      'getContent: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY must be set'
    )
  }
  cachedClient = createClient(url, key, { auth: { persistSession: false } })
  return cachedClient
}

function extractSlug(row: Row): Pattern | null {
  const p = row.patterns
  if (!p) return null
  if (Array.isArray(p)) return p[0]?.slug ?? null
  return p.slug
}

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

export async function getContent(params: GetContentParams): Promise<ContentItem[]> {
  const supabase = getClient()

  const { data, error } = await supabase
    .from('content_bank')
    .select(
      'id, title, body, content_type, age_group, arena, emotional_state, sort_order, patterns(slug)'
    )
    .eq('content_type', params.contentType)
    .eq('is_published', true)
    .returns<Row[]>()

  if (error) throw new Error(`getContent query failed: ${error.message}`)
  if (!data || data.length === 0) return []

  // Keep rows compatible with the provided filters (exact match OR fallback value).
  // Rows that specifically disagree with a filter are excluded.
  const candidates = data.filter((row) => {
    if (params.pattern !== undefined) {
      const slug = extractSlug(row)
      if (slug !== null && slug !== params.pattern) return false
    }
    if (params.ageGroup !== undefined) {
      if (row.age_group !== params.ageGroup && row.age_group !== 'all') return false
    }
    if (params.arena !== undefined) {
      if (row.arena !== params.arena && row.arena !== 'all') return false
    }
    if (params.emotionalState !== undefined) {
      if (row.emotional_state !== null && row.emotional_state !== params.emotionalState)
        return false
    }
    return true
  })

  // Score each candidate: +1 for every exact match (fallbacks score 0).
  const scored = candidates.map((row) => {
    let score = 0
    if (params.pattern !== undefined && extractSlug(row) === params.pattern) score++
    if (params.ageGroup !== undefined && row.age_group === params.ageGroup) score++
    if (params.arena !== undefined && row.arena === params.arena) score++
    if (params.emotionalState !== undefined && row.emotional_state === params.emotionalState)
      score++
    return { row, score }
  })

  // Sort by score desc, shuffle within each tier, flatten, slice to limit.
  const byScore = new Map<number, typeof scored>()
  for (const s of scored) {
    const bucket = byScore.get(s.score) ?? []
    bucket.push(s)
    byScore.set(s.score, bucket)
  }
  const ordered: typeof scored = []
  for (const score of [...byScore.keys()].sort((a, b) => b - a)) {
    ordered.push(...shuffle(byScore.get(score)!))
  }

  return ordered.slice(0, params.limit).map(({ row }) => ({
    id: row.id,
    title: row.title,
    body: row.body,
    contentType: row.content_type,
    patternSlug: extractSlug(row),
    ageGroup: row.age_group,
    arena: row.arena,
    emotionalState: row.emotional_state,
    sortOrder: row.sort_order,
  }))
}
