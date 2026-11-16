'use client'

import { useState } from 'react'
import { SelectField } from '@/components/set-inputs'
import { REP_OPTIONS, RPE_OPTIONS, formatRpe, formatWeight, percentOfMax } from '@/lib/rpe'

export function TargetPanel({ e1rm }: { e1rm: number | null }) {
  const [reps, setReps] = useState(1)
  const [rpe, setRpe] = useState(7)

  const percent = percentOfMax(reps, rpe)
  const targetLoad = e1rm === null ? null : e1rm * percent

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-2">
        <SelectField label="Reps" value={reps} onChange={setReps} options={REP_OPTIONS} format={String} surface="background" />
        <SelectField label="RPE" value={rpe} onChange={setRpe} options={RPE_OPTIONS} format={formatRpe} surface="background" />
      </div>

      <div aria-live="polite" className="flex items-baseline justify-between border-b border-border pb-3">
        <span className="text-sm text-muted-foreground">
          Load for {reps}@{formatRpe(rpe)}
        </span>
        <span className="font-mono text-4xl font-semibold tabular-nums">
          {targetLoad === null ? '—' : formatWeight(targetLoad)}
        </span>
      </div>

      <div className="flex items-baseline justify-between">
        <span className="text-sm text-muted-foreground">% of e1RM</span>
        <span className="font-mono text-xl font-semibold tabular-nums">
          {formatWeight(percent * 100)}
          <span className="ml-0.5 text-sm font-normal text-muted-foreground">%</span>
        </span>
      </div>
    </div>
  )
}
