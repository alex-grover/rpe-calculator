'use client'

import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import { BACKDOWN_RPES, MAX_CHART_REPS, type RepEstimate, formatWeight, repsAtPercent } from '@/lib/rpe'

const STEP = 2.5

function formatPercent(value: number) {
  return String(Math.round(value * 10) / 10)
}

function describeReps(estimate: RepEstimate) {
  if (estimate.kind === 'aboveChart') return '—'
  if (estimate.kind === 'beyondChart') return `${MAX_CHART_REPS}+`
  return String(estimate.reps)
}

export function BackdownPanel({ e1rm }: { e1rm: number | null }) {
  const [percentInput, setPercentInput] = useState('75')
  const parsed = Number.parseFloat(percentInput)
  const percent = Number.isFinite(parsed) && parsed > 0 ? parsed : null

  const step = (direction: 1 | -1) => {
    const base = percent ?? 75
    setPercentInput(formatPercent(Math.min(100, Math.max(STEP, base + direction * STEP))))
  }

  const backdownLoad = e1rm !== null && percent !== null ? (e1rm * percent) / 100 : null

  return (
    <section aria-label="Backdown sets" className="flex flex-col gap-3 rounded-2xl bg-card p-4 text-card-foreground">
      <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Backdown</h2>

      <div className="flex items-center gap-2">
        <StepButton label="Decrease by 2.5%" onClick={() => step(-1)}>
          <Minus className="size-5" aria-hidden />
        </StepButton>
        <label className="relative flex-1">
          <span className="sr-only">Backdown percentage</span>
          <input
            type="number"
            inputMode="decimal"
            enterKeyHint="done"
            value={percentInput}
            onChange={(event) => setPercentInput(event.target.value)}
            className="h-14 w-full rounded-xl bg-background pr-9 text-center font-mono text-2xl font-semibold tabular-nums outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <span aria-hidden className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 font-mono text-lg text-muted-foreground">
            %
          </span>
        </label>
        <StepButton label="Increase by 2.5%" onClick={() => step(1)}>
          <Plus className="size-5" aria-hidden />
        </StepButton>
      </div>

      <div aria-live="polite" className="flex items-baseline justify-between border-b border-border pb-3">
        <span className="text-sm text-muted-foreground">Load</span>
        <span className="font-mono text-4xl font-semibold tabular-nums">
          {backdownLoad === null ? '—' : formatWeight(backdownLoad)}
        </span>
      </div>

      <ul className="flex flex-col">
        {BACKDOWN_RPES.map((rpe) => (
          <li key={rpe} className="flex items-baseline justify-between border-b border-border py-2.5 last:border-b-0">
            <span className="text-sm text-muted-foreground">@ RPE {rpe}</span>
            <span className="font-mono text-xl font-semibold tabular-nums">
              {percent === null ? '—' : describeReps(repsAtPercent(percent / 100, rpe))}
              <span className="ml-1.5 text-sm font-normal text-muted-foreground">reps</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function StepButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform active:scale-95"
    >
      {children}
    </button>
  )
}
