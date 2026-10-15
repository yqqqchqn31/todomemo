import { addDays, nextMonday, parseISO } from 'date-fns'
import { formatShortDate } from '../../models/dateFormat.ts'
import { toISODateString } from '../../models/task.ts'

type PlanDateFieldProps = {
  plannedDate: string | null
  onSchedule: (date: Date) => void
}

const DATE_BUTTON =
  'relative flex min-h-11 items-center gap-1.5 rounded-full border border-border bg-surface-raised px-4 text-sm aria-pressed:border-content aria-pressed:bg-surface'

const findCustomDate = (plannedDate: string | null, todayString: string, choiceDateStrings: string[]) => {
  if (plannedDate === null || plannedDate <= todayString || choiceDateStrings.includes(plannedDate)) return null
  return plannedDate
}

const customDateLabel = (customDate: string | null) => {
  if (customDate === null) return '日付…'
  return formatShortDate(parseISO(customDate))
}

export const PlanDateField = ({ plannedDate, onSchedule }: PlanDateFieldProps) => {
  const today = new Date()
  const todayString = toISODateString(today)
  const choices = [
    { label: '明日', date: addDays(today, 1) },
    { label: '来週', date: nextMonday(today) },
  ]
  const customDate = findCustomDate(
    plannedDate,
    todayString,
    choices.map(({ date }) => toISODateString(date)),
  )

  return (
    <section>
      <h2 className="mb-2 text-xs text-content-muted">いつやる?</h2>
      <div className="flex flex-wrap gap-2">
        {choices.map(({ label, date }) => (
          <button
            key={label}
            type="button"
            aria-pressed={toISODateString(date) === plannedDate}
            onClick={() => onSchedule(date)}
            className={DATE_BUTTON}
          >
            {label}
            <small className="text-xs text-content-muted">{formatShortDate(date)}</small>
          </button>
        ))}
        <label
          data-selected={customDate !== null}
          className={`${DATE_BUTTON} data-[selected=true]:border-content data-[selected=true]:bg-surface`}
        >
          {customDateLabel(customDate)}
          <input
            type="date"
            min={todayString}
            value={customDate ?? ''}
            onClick={(event) => event.currentTarget.showPicker()}
            onChange={(event) => {
              if (event.target.value === '') return
              onSchedule(parseISO(event.target.value))
            }}
            className="absolute inset-0 opacity-0"
          />
        </label>
      </div>
    </section>
  )
}
