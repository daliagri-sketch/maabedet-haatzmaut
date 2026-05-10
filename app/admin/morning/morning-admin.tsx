'use client'

import { useMemo, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, Pencil, Plus, Search, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'

import {
  createMessage,
  deleteMessage,
  signOutAction,
  updateMessage,
  type MorningMessageInput,
} from './actions'

export type MorningMessage = {
  id: string
  text: string
  category: string
  age_tag: string
  is_active: boolean
  created_at: string
}

const CATEGORIES = [
  'loop',
  'quiet_giveup',
  'zero_to_hundred',
  'just_this_once',
] as const
type Category = (typeof CATEGORIES)[number]

const AGE_TAGS = ['all', '3-5', '6-8', '9-10'] as const
type AgeTag = (typeof AGE_TAGS)[number]

const AGE_TAG_LABEL: Record<AgeTag, string> = {
  all: 'כל הגילאים',
  '3-5': '3–5',
  '6-8': '6–8',
  '9-10': '9–10',
}

const EMPTY_INPUT: MorningMessageInput = {
  text: '',
  category: 'loop',
  age_tag: 'all',
  is_active: true,
}

type EditorMode = 'create' | 'edit'

export function MorningAdmin({
  initialMessages,
  userEmail,
}: {
  initialMessages: MorningMessage[]
  userEmail: string | null
}) {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [editorMode, setEditorMode] = useState<EditorMode | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState<MorningMessageInput>(EMPTY_INPUT)
  const [busyRowId, setBusyRowId] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return initialMessages
    return initialMessages.filter((m) => m.text.toLowerCase().includes(q))
  }, [initialMessages, search])

  function openCreate() {
    setEditingId(null)
    setDraft(EMPTY_INPUT)
    setEditorMode('create')
    setErrorMessage(null)
  }

  function openEdit(m: MorningMessage) {
    setEditingId(m.id)
    setDraft({
      text: m.text,
      category: m.category,
      age_tag: m.age_tag,
      is_active: m.is_active,
    })
    setEditorMode('edit')
    setErrorMessage(null)
  }

  function closeEditor() {
    setEditorMode(null)
    setEditingId(null)
    setDraft(EMPTY_INPUT)
    setErrorMessage(null)
  }

  function submitDraft() {
    if (draft.text.trim().length === 0) {
      setErrorMessage('יש להזין טקסט.')
      return
    }
    const id = editingId
    startTransition(async () => {
      try {
        if (id) {
          await updateMessage(id, draft)
        } else {
          await createMessage(draft)
        }
        closeEditor()
        router.refresh()
      } catch (err) {
        setErrorMessage(
          err instanceof Error ? err.message : 'שגיאה לא צפויה.'
        )
      }
    })
  }

  function handleDelete(m: MorningMessage) {
    const ok = window.confirm(`למחוק את המשפט?\n\n"${m.text}"`)
    if (!ok) return
    setBusyRowId(m.id)
    startTransition(async () => {
      try {
        await deleteMessage(m.id)
        if (editingId === m.id) closeEditor()
        router.refresh()
      } catch (err) {
        setErrorMessage(
          err instanceof Error ? err.message : 'שגיאה לא צפויה.'
        )
      } finally {
        setBusyRowId(null)
      }
    })
  }

  function handleToggleActive(m: MorningMessage, next: boolean) {
    setBusyRowId(m.id)
    startTransition(async () => {
      try {
        await updateMessage(m.id, {
          text: m.text,
          category: m.category,
          age_tag: m.age_tag,
          is_active: next,
        })
        router.refresh()
      } catch (err) {
        setErrorMessage(
          err instanceof Error ? err.message : 'שגיאה לא צפויה.'
        )
      } finally {
        setBusyRowId(null)
      }
    })
  }

  return (
    <main
      dir="rtl"
      lang="he"
      className="min-h-svh bg-background px-4 py-8 sm:px-6 lg:px-10"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight">
              משפטי בוקר
            </h1>
            <p className="text-sm text-muted-foreground">
              ניהול הספרייה: הוספה, עריכה, מחיקה.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              onClick={openCreate}
              disabled={isPending || editorMode !== null}
            >
              <Plus className="size-4" />
              הוסף משפט
            </Button>
            {userEmail && (
              <span
                dir="ltr"
                className="hidden font-mono text-xs text-muted-foreground sm:inline"
              >
                {userEmail}
              </span>
            )}
            <form action={signOutAction}>
              <Button type="submit" variant="ghost" size="sm">
                <LogOut className="size-4" />
                יציאה
              </Button>
            </form>
          </div>
        </header>

        <div className="relative">
          <Search
            aria-hidden
            className="pointer-events-none absolute top-1/2 end-3 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="search"
            placeholder="חיפוש בטקסט…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pe-9"
          />
        </div>

        {errorMessage && (
          <p
            className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
            role="alert"
          >
            {errorMessage}
          </p>
        )}

        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[280px]">טקסט</TableHead>
                <TableHead className="w-[140px]">קטגוריה</TableHead>
                <TableHead className="w-[110px]">גיל</TableHead>
                <TableHead className="w-[80px]">פעיל</TableHead>
                <TableHead className="w-[140px] text-end">פעולות</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="py-10 text-center text-sm text-muted-foreground"
                  >
                    {initialMessages.length === 0
                      ? 'הספרייה ריקה. לחצי "הוסף משפט" כדי להתחיל.'
                      : 'לא נמצאו משפטים תואמים לחיפוש.'}
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((m) => {
                  const rowBusy = busyRowId === m.id
                  return (
                    <TableRow key={m.id} data-row-busy={rowBusy || undefined}>
                      <TableCell className="whitespace-normal text-sm leading-relaxed">
                        {m.text}
                      </TableCell>
                      <TableCell
                        dir="ltr"
                        className="font-mono text-xs text-muted-foreground"
                      >
                        {m.category}
                      </TableCell>
                      <TableCell className="text-sm">
                        {AGE_TAG_LABEL[m.age_tag as AgeTag] ?? m.age_tag}
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={m.is_active}
                          disabled={rowBusy || isPending}
                          onCheckedChange={(checked) =>
                            handleToggleActive(m, checked)
                          }
                          aria-label={
                            m.is_active ? 'משפט פעיל' : 'משפט מושהה'
                          }
                        />
                      </TableCell>
                      <TableCell className="text-end">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => openEdit(m)}
                            disabled={isPending}
                            aria-label="עריכה"
                          >
                            <Pencil className="size-4" />
                            עריכה
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(m)}
                            disabled={isPending}
                            aria-label="מחיקה"
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="size-4" />
                            מחיקה
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </Card>

        <p className="text-xs text-muted-foreground">
          מציג{' '}
          <span dir="ltr" className="font-mono">
            {filtered.length}
          </span>{' '}
          מתוך{' '}
          <span dir="ltr" className="font-mono">
            {initialMessages.length}
          </span>{' '}
          משפטים
        </p>
      </div>

      <EditorDialog
        mode={editorMode}
        draft={draft}
        isPending={isPending}
        onChange={setDraft}
        onClose={closeEditor}
        onSubmit={submitDraft}
      />
    </main>
  )
}

function EditorDialog({
  mode,
  draft,
  isPending,
  onChange,
  onClose,
  onSubmit,
}: {
  mode: EditorMode | null
  draft: MorningMessageInput
  isPending: boolean
  onChange: (next: MorningMessageInput) => void
  onClose: () => void
  onSubmit: () => void
}) {
  const open = mode !== null
  const isEdit = mode === 'edit'
  const title = isEdit ? 'עריכת משפט' : 'משפט חדש'
  const description = isEdit
    ? 'עדכון פרטי המשפט הקיים.'
    : 'הוספת משפט בוקר חדש לספרייה.'
  const submitLabel = isPending ? 'שומר…' : isEdit ? 'עדכן' : 'שמור'

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next && !isPending) onClose()
      }}
    >
      <DialogContent
        dir="rtl"
        lang="he"
        className="sm:max-w-md"
      >
        <div className="flex flex-col gap-1.5 pe-8">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit()
          }}
        >
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="morning-text">טקסט</Label>
            <Textarea
              id="morning-text"
              value={draft.text}
              onChange={(e) =>
                onChange({ ...draft, text: e.target.value })
              }
              placeholder="כתבי כאן את המשפט…"
              rows={3}
              dir="rtl"
              lang="he"
              autoFocus
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="morning-category">קטגוריה</Label>
              <NativeSelect
                id="morning-category"
                className="w-full"
                value={draft.category}
                onChange={(e) =>
                  onChange({
                    ...draft,
                    category: e.target.value as Category,
                  })
                }
              >
                {CATEGORIES.map((c) => (
                  <NativeSelectOption key={c} value={c}>
                    {c}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="morning-age">קבוצת גיל</Label>
              <NativeSelect
                id="morning-age"
                className="w-full"
                value={draft.age_tag}
                onChange={(e) =>
                  onChange({
                    ...draft,
                    age_tag: e.target.value as AgeTag,
                  })
                }
              >
                {AGE_TAGS.map((t) => (
                  <NativeSelectOption key={t} value={t}>
                    {AGE_TAG_LABEL[t]}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </div>
          </div>

          <label
            htmlFor="morning-active"
            className="flex items-center justify-between gap-3 rounded-lg border border-input px-3 py-2 cursor-pointer"
          >
            <span className="flex flex-col gap-0.5">
              <span className="text-sm font-medium leading-none">פעיל</span>
              <span className="text-xs text-muted-foreground">
                {draft.is_active
                  ? 'המשפט יוצג למשתמשים'
                  : 'המשפט מושהה ולא יוצג'}
              </span>
            </span>
            <Switch
              id="morning-active"
              checked={draft.is_active}
              onCheckedChange={(checked) =>
                onChange({ ...draft, is_active: checked })
              }
            />
          </label>

          <div className="-mx-4 -mb-4 flex flex-row-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4">
            <Button type="submit" disabled={isPending}>
              {submitLabel}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending}
            >
              ביטול
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
