import { addDays, nextMonday, parseISO } from 'date-fns'
import { formatShortDate } from '../../models/dateFormat.ts'
import { toISODateString } from '../../models/task.ts'
import { DateChoiceButton, DateInputButton } from './DateButtons.tsx'

type PlanDateFieldProps = {
  plannedDate: string | null
  onSchedule: (date: Date) => void
}

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
          <DateChoiceButton
            key={label}
            label={label}
            subLabel={formatShortDate(date)}
            isSelected={toISODateString(date) === plannedDate}
            onClick={() => onSchedule(date)}
          />
        ))}
        <DateInputButton
          label={customDateLabel(customDate)}
          isSelected={customDate !== null}
          min={todayString}
          value={customDate}
          onPick={onSchedule}
        />
      </div>
    </section>
  )
}
