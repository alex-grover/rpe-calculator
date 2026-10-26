import { ChevronDown } from 'lucide-react'
import { REP_OPTIONS, RPE_OPTIONS, formatRpe } from '@/lib/rpe'

type SetInputsProps = {
  load: string
  reps: number
  rpe: number
  onLoadChange: (value: string) => void
  onRepsChange: (value: number) => void
  onRpeChange: (value: number) => void
}

const fieldClass =
  'h-14 w-full rounded-xl bg-card px-3 font-mono text-2xl font-semibold tabular-nums text-card-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring'

export function SetInputs({ load, reps, rpe, onLoadChange, onRepsChange, onRpeChange }: SetInputsProps) {
  return (
    <section className="grid grid-cols-[1.4fr_1fr_1fr] gap-2" aria-label="Top set">
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-muted-foreground">Load</span>
        <input
          type="number"
          inputMode="decimal"
          enterKeyHint="done"
          placeholder="0"
          min={0}
          value={load}
          onChange={(event) => onLoadChange(event.target.value)}
          className={`${fieldClass} placeholder:text-muted-foreground/50`}
        />
      </label>
      <SelectField label="Reps" value={reps} onChange={onRepsChange} options={REP_OPTIONS} format={String} />
      <SelectField label="RPE" value={rpe} onChange={onRpeChange} options={RPE_OPTIONS} format={formatRpe} />
    </section>
  )
}

type SelectFieldProps = {
  label: string
  value: number
  options: number[]
  format: (value: number) => string
  onChange: (value: number) => void
}

function SelectField({ label, value, options, format, onChange }: SelectFieldProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <span className="relative">
        <select
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className={`${fieldClass} appearance-none pr-8`}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {format(option)}
            </option>
          ))}
        </select>
        <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
      </span>
    </label>
  )
}
