import { addDays, nextMonday } from 'date-fns'
import { formatShortDate } from '../../models/dateFormat.ts'
import { toDateKey } from '../../models/task.ts'

type PlanDateFieldProps = {
  plannedDate: string | null
  onSchedule: (date: Date) => void
}

const PILL =
  'flex min-h-11 items-center gap-1.5 rounded-full border border-border bg-surface-raised px-4 text-sm aria-pressed:border-content aria-pressed:bg-surface'

export const PlanDateField = ({ plannedDate, onSchedule }: PlanDateFieldProps) => {
  const today = new Date()
  const choices = [
    { label: '明日', date: addDays(today, 1) },
    { label: '来週', date: nextMonday(today) },
  ]

  return (
    <section>
      <h2 className="mb-2 text-xs text-content-muted">いつやる?</h2>
      <div className="flex flex-wrap gap-2">
        {choices.map(({ label, date }) => (
          <button
            key={label}
            type="button"
            aria-pressed={toDateKey(date) === plannedDate}
            onClick={() => onSchedule(date)}
            className={PILL}
          >
            {label}
            <small className="text-xs text-content-muted">{formatShortDate(date)}</small>
          </button>
        ))}
      </div>
    </section>
  )
}
