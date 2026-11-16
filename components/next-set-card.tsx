'use client'

import { useId, useState } from 'react'
import { BackdownPanel } from '@/components/backdown-panel'
import { TargetPanel } from '@/components/target-panel'

const MODES = [
  { id: 'backdown', label: 'Backdown %' },
  { id: 'target', label: 'Target RPE' },
] as const

type Mode = (typeof MODES)[number]['id']

export function NextSetCard({ e1rm }: { e1rm: number | null }) {
  const [mode, setMode] = useState<Mode>('backdown')
  const baseId = useId()

  return (
    <section aria-label="Next set" className="flex flex-col gap-4 rounded-2xl bg-card p-4 text-card-foreground">
      <div role="tablist" aria-label="Calculator mode" className="grid grid-cols-2 gap-1 rounded-(--track-radius) bg-background p-(--track-padding) [--track-padding:--spacing(1)] [--track-radius:--spacing(4)]">
        {MODES.map((option) => {
          const selected = option.id === mode
          return (
            <button
              key={option.id}
              type="button"
              role="tab"
              id={`${baseId}-tab-${option.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              onClick={() => setMode(option.id)}
              className={`h-11 rounded-[max(0px,calc(var(--track-radius)-var(--track-padding)))] text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                selected ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
              }`}
            >
              {option.label}
            </button>
          )
        })}
      </div>

      <div role="tabpanel" id={`${baseId}-panel`} aria-labelledby={`${baseId}-tab-${mode}`}>
        {mode === 'backdown' ? <BackdownPanel e1rm={e1rm} /> : <TargetPanel e1rm={e1rm} />}
      </div>
    </section>
  )
}
