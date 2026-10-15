import { parseISO } from 'date-fns'
import { formatShortDate } from '../../models/dateFormat.ts'
import { toISODateString } from '../../models/task.ts'
import { DateChoiceButton, DateInputButton } from './DateButtons.tsx'

type DueDateFieldProps = {
  dueDate: string | null
  onChangeDueDate: (dueDate: string | null) => void
}

const dueDateLabel = (dueDate: string | null) => {
  if (dueDate === null) return '日付…'
  return `${formatShortDate(parseISO(dueDate))}まで`
}

export const DueDateField = ({ dueDate, onChangeDueDate }: DueDateFieldProps) => (
  <section>
    <h2 className="mb-2 text-xs text-content-muted">期限</h2>
    <div className="flex flex-wrap gap-2">
      <DateChoiceButton label="なし" isSelected={dueDate === null} onClick={() => onChangeDueDate(null)} />
      <DateInputButton
        label={dueDateLabel(dueDate)}
        isSelected={dueDate !== null}
        min={toISODateString(new Date())}
        value={dueDate}
        onPick={(date) => onChangeDueDate(toISODateString(date))}
      />
    </div>
  </section>
)
