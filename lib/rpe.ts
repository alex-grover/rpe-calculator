/**
 * RTS (Reactive Training Systems) RPE chart, % of 1RM by RPE (rows) and reps 1–12 (columns).
 * Transcribed verbatim from the published chart at https://trackmy1rm.com/rpe-chart,
 * which matches the standard RTS values for RPE 6.5–10 and extends them to RPE 5.
 */
const RPE_CHART: Record<string, readonly number[]> = {
  '10': [100, 95.5, 92.2, 89.2, 86.3, 83.7, 81.1, 78.6, 76.2, 73.9, 70.7, 68],
  '9.5': [97.8, 93.9, 90.7, 87.8, 85, 82.4, 79.9, 77.4, 75.1, 72.3, 69.4, 66.7],
  '9': [95.5, 92.2, 89.2, 86.3, 83.7, 81.1, 78.6, 76.2, 73.9, 70.7, 68, 65.3],
  '8.5': [93.9, 90.7, 87.8, 85, 82.4, 79.9, 77.4, 75.1, 72.3, 69.4, 66.7, 64],
  '8': [92.2, 89.2, 86.3, 83.7, 81.1, 78.6, 76.2, 73.9, 70.7, 68, 65.3, 62.6],
  '7.5': [90.7, 87.8, 85, 82.4, 79.9, 77.4, 75.1, 72.3, 69.4, 66.7, 64, 61.3],
  '7': [89.2, 86.3, 83.7, 81.1, 78.6, 76.2, 73.9, 70.7, 68, 65.3, 62.6, 59.9],
  '6.5': [87.8, 85, 82.4, 79.9, 77.4, 75.1, 72.3, 69.4, 66.7, 64, 61.3, 58.6],
  '6': [86.3, 83.7, 81.1, 78.6, 76.2, 73.9, 70.7, 68, 65.3, 62.6, 59.9, 57.2],
  '5.5': [85, 82.4, 79.9, 77.4, 75.1, 72.3, 69.4, 66.7, 64, 61.3, 58.6, 55.9],
  '5': [83.7, 81.1, 78.6, 76.2, 73.9, 70.7, 68, 65.3, 62.6, 59.9, 57.2, 54.5],
}

export const MAX_CHART_REPS = 12
export const REP_OPTIONS = Array.from({ length: MAX_CHART_REPS }, (_, i) => i + 1)
export const RPE_OPTIONS = Array.from({ length: 11 }, (_, i) => 10 - i * 0.5)
export const BACKDOWN_RPES = [8, 7, 6] as const

/** Chart percentage (0–1) for a rep count and RPE that are on the chart. */
export function percentOfMax(reps: number, rpe: number): number {
  return RPE_CHART[String(rpe)][reps - 1] / 100
}

export function estimateOneRepMax(load: number, reps: number, rpe: number): number {
  return load / percentOfMax(reps, rpe)
}

export type RepEstimate =
  | { kind: 'reps'; reps: number }
  | { kind: 'aboveChart' }
  | { kind: 'beyondChart' }

/** Most reps on the chart whose percentage at `rpe` is at least `percent` (0–1). */
export function repsAtPercent(percent: number, rpe: number): RepEstimate {
  const row = RPE_CHART[String(rpe)]
  const target = percent * 100 - 1e-9
  if (row[0] < target) return { kind: 'aboveChart' }
  if (row[MAX_CHART_REPS - 1] >= target) return { kind: 'beyondChart' }
  return { kind: 'reps', reps: row.filter((value) => value >= target).length }
}

export function formatWeight(value: number): string {
  const rounded = Math.round(value * 10) / 10
  return Number.isInteger(rounded) ? rounded.toString() : rounded.toFixed(1)
}

export function formatRpe(rpe: number): string {
  return Number.isInteger(rpe) ? rpe.toString() : rpe.toFixed(1)
}
