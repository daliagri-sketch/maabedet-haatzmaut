import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Page() {
  return (
    <div dir="rtl" className="lab-paper relative flex min-h-svh flex-col">
      <header className="flex items-center justify-between p-6">
        <span className="font-mono text-sm text-muted-foreground">
          maabedet-haatzmaut
        </span>
        <ThemeToggle />
      </header>

      <main className="flex flex-1 items-center justify-center px-6">
        <div className="flex max-w-2xl flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            מעבדת העצמאות
          </h1>
          <p className="text-lg text-muted-foreground sm:text-xl">
            הפרויקט שלך מוכן. Supabase מחובר, הסביבה מוגדרת, והכול מחכה לך
            להתחיל לבנות.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" nativeButton={false} render={<Link href="/login" />}>
              בואו נתחיל
              <ArrowLeft className="size-4" />
            </Button>
          </div>
        </div>
      </main>

      <footer className="p-6 text-center font-mono text-xs text-muted-foreground">
        לחצו <kbd className="rounded border px-1.5 py-0.5">d</kbd> למעבר בין מצבים
      </footer>
    </div>
  )
}
