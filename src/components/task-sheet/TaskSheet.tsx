import { getPlacement, toISODateString, type Destination, type Task } from '../../models/task.ts'
import { DueDateField } from './DueDateField.tsx'
import { MoreDetails } from './MoreDetails.tsx'
import { PlanDateField } from './PlanDateField.tsx'
import { QuickActions } from './QuickActions.tsx'
import { TitleField } from './TitleField.tsx'

type TaskSheetProps = {
  task: Task
  onRename: (title: string) => void
  onToggleHighlight: () => void
  onMove: (destination: Destination) => void
  onSchedule: (date: Date) => void
  onChangeDueDate: (dueDate: string | null) => void
  onDelete: () => void
}

export const TaskSheet = ({
  task,
  onRename,
  onToggleHighlight,
  onMove,
  onSchedule,
  onChangeDueDate,
  onDelete,
}: TaskSheetProps) => (
  <div className="flex flex-col gap-4 pb-2">
    <TitleField title={task.title} onRename={onRename} />
    <QuickActions
      isHighlighted={task.isHighlighted}
      placement={getPlacement(task, toISODateString(new Date()))}
      onToggleHighlight={onToggleHighlight}
      onMove={onMove}
    />
    <PlanDateField plannedDate={task.plannedDate} onSchedule={onSchedule} />
    <MoreDetails isInitiallyOpen={task.dueDate != null}>
      <DueDateField dueDate={task.dueDate} onChangeDueDate={onChangeDueDate} />
    </MoreDetails>
    <div className="flex items-center justify-between">
      <button type="button" onClick={onDelete} className="h-11 text-sm text-danger">
        削除
      </button>
      <p className="text-xs text-content-muted">変更は自動で保存</p>
    </div>
  </div>
)
