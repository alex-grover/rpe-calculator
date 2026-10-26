'use client'

import { useState } from 'react'
import { BackdownPanel } from '@/components/backdown-panel'
import { SetInputs } from '@/components/set-inputs'
import { estimateOneRepMax, formatWeight } from '@/lib/rpe'

export function RpeCalculator() {
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState(1)
  const [rpe, setRpe] = useState(8)

  const loadValue = Number.parseFloat(load)
  const e1rm = Number.isFinite(loadValue) && loadValue > 0 ? estimateOneRepMax(loadValue, reps, rpe) : null

  return (
    <main className="mx-auto flex h-dvh max-w-md flex-col gap-4 px-5 pt-[max(env(safe-area-inset-top),1rem)] pb-[max(env(safe-area-inset-bottom),1rem)]">
      <header className="flex items-baseline justify-between pt-2">
        <h1 className="text-lg font-semibold tracking-tight">RPE Calculator</h1>
      </header>

      <SetInputs load={load} reps={reps} rpe={rpe} onLoadChange={setLoad} onRepsChange={setReps} onRpeChange={setRpe} />

      <section aria-live="polite" className="flex flex-col items-center gap-1 rounded-2xl bg-primary px-4 py-5 text-primary-foreground">
        <h2 className="text-xs font-medium uppercase tracking-widest opacity-80">Estimated 1RM</h2>
        <p className="font-mono text-6xl font-semibold tabular-nums tracking-tight">
          {e1rm === null ? '—' : formatWeight(e1rm)}
        </p>
      </section>

      <BackdownPanel e1rm={e1rm} />
    </main>
  )
}
