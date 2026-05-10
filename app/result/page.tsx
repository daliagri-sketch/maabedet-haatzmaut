import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

type Pattern = 'loop' | 'quiet_giveup' | 'zero_to_hundred' | 'just_this_once'

// Content per pattern. Texts for loop / quiet_giveup / zero_to_hundred follow
// the Claude Design file's screens-result.jsx (PATTERN_CONTENT). Texts for
// just_this_once reuse user-approved copy from the existing seed since the
// design file does not include it.
const PATTERN_CONTENT: Record<
  Pattern,
  {
    label: string
    softLabel: string
    reflection: string
    childLearn: string
    action: string
  }
> = {
  loop: {
    label: 'הלופ',
    softLabel: 'זה נראה כמו לופ',
    reflection: 'את מבקשת —\nואז חוזרת שוב.',
    childLearn: 'כשהבקשה חוזרת — הוא/היא לומד/ת לחכות.',
    action: 'בקשה אחת.\nואז שקט.',
  },
  quiet_giveup: {
    label: 'ויתור שקט',
    softLabel: 'זה נראה כמו ויתור שקט',
    reflection: 'הדרישה יורדת\nלפני שנבדקה באמת.',
    childLearn: 'מספיק קצת קושי — ומישהו נכנס במקומו/ה.',
    action: 'לעצור שנייה.\nלא לנוע לפני שהוא/היא זז/ה.',
  },
  zero_to_hundred: {
    label: 'מ-0 ל-100',
    softLabel: 'זה נראה כמו מ-0 ל-100',
    reflection: 'זה מתחיל שקט —\nואז הכול מתפוצץ.',
    childLearn: 'הוא/היא מחכה לפיצוץ.\nאז יודע/ת שזה סופי.',
    action: 'לזהות את הרגע לפני ה-100.\nלעצור שם.',
  },
  just_this_once: {
    label: 'רק הפעם',
    softLabel: 'זה נראה כמו רק הפעם',
    reflection: 'הגבול זז קצת\nבשם "רק הפעם".',
    childLearn: 'הילד לומד שחריג אחד משנה את הכללים של מחר.',
    action: 'הגבול נשאר.\nגם כשיש סיבה טובה.',
  },
}

export const dynamic = 'force-dynamic'

export default async function ResultPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>
}) {
  const { id } = await searchParams
  if (!id) return <NotFoundScreen />

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SECRET_KEY
  if (!url || !key) {
    throw new Error(
      'Result: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY must be set'
    )
  }
  const supabase = createClient(url, key, { auth: { persistSession: false } })

  const { data, error } = await supabase
    .from('user_pattern_results')
    .select('primary_pattern, secondary_pattern')
    .eq('id', id)
    .maybeSingle()

  if (error || !data) return <NotFoundScreen />

  const row = data as { primary_pattern: Pattern; secondary_pattern: Pattern }
  const p = PATTERN_CONTENT[row.primary_pattern]
  const sec = PATTERN_CONTENT[row.secondary_pattern]

  return (
    <main dir="rtl" className="lab-paper min-h-svh">
      <div
        className="relative mx-auto flex min-h-svh flex-col"
        style={{ maxWidth: 390 }}
      >
        {/* Decorative background numeral */}
        <span aria-hidden className="lab-bg-num">
          05
        </span>

        {/* Top — divider + soft prelude line */}
        <div className="relative z-10 px-7 pt-[58px]">
          <div className="lab-hr" />
          <h2
            className="lab-body mt-6"
            style={{ color: 'var(--lab-muted-2)', lineHeight: 1.5 }}
          >
            נראה שזה קורה לך הרבה
          </h2>
        </div>

        {/* Body */}
        <div className="relative z-10 flex-1 px-7 pt-5 pb-6">
          {/* Pattern name + soft descriptor */}
          <h1
            className="lab-title-l"
            style={{ color: 'var(--lab-terra-deep)' }}
          >
            {p.label}
          </h1>
          <p className="lab-body lab-body-mute mt-1">{p.softLabel}</p>

          {/* Secondary pattern */}
          <p
            className="lab-body mt-1"
            style={{ color: 'var(--lab-muted-2)' }}
          >
            ולפעמים גם —{' '}
            <span
              style={{
                fontWeight: 600,
                color: 'var(--lab-ink-deep)',
              }}
            >
              {sec.label}
            </span>
          </p>

          {/* Divider */}
          <div className="lab-hr mt-8" />

          {/* Reflection */}
          <p
            className="lab-body mt-7"
            style={{
              lineHeight: 1.9,
              whiteSpace: 'pre-line',
              fontSize: 17,
              fontWeight: 500,
              color: 'var(--lab-ink-deep)',
            }}
          >
            {p.reflection}
          </p>

          {/* Divider */}
          <div className="lab-hr mt-7" />

          {/* What this means for the child */}
          <div className="mt-7">
            <div className="lab-eyebrow mb-3">מה זה אומר לו/ה</div>
            <p
              className="lab-body"
              style={{ lineHeight: 1.8, color: 'var(--lab-muted-3)' }}
            >
              {p.childLearn}
            </p>
          </div>

          {/* Divider */}
          <div className="lab-hr mt-7" />

          {/* One small action */}
          <div className="mt-7">
            <div className="lab-eyebrow lab-accent mb-3">צעד אחד קטן</div>
            <p
              className="lab-body"
              style={{
                lineHeight: 1.9,
                fontWeight: 600,
                whiteSpace: 'pre-line',
                fontSize: 16,
              }}
            >
              {p.action}
            </p>
          </div>

          {/* Closing */}
          <p
            className="lab-body lab-body-mute mt-9"
            style={{ lineHeight: 1.7, whiteSpace: 'pre-line' }}
          >
            {'את לא מתחילה מאפס.\nאפשר להמשיך מכאן.'}
          </p>
        </div>

        {/* CTA */}
        <div className="relative z-10 px-7 pt-3 pb-8">
          <Link href="/" className="lab-cta">
            <span>נכנסים לבית</span>
          </Link>
        </div>
      </div>
    </main>
  )
}

function NotFoundScreen() {
  return (
    <main
      dir="rtl"
      className="lab-paper flex min-h-svh items-center justify-center px-6"
    >
      <div className="text-center">
        <p className="lab-body lab-body-mute">תוצאה לא נמצאה.</p>
        <Link
          href="/questionnaire"
          className="lab-body mt-4 inline-block underline underline-offset-4"
          style={{ color: 'var(--lab-terra)' }}
        >
          חזרה לשאלון
        </Link>
      </div>
    </main>
  )
}
