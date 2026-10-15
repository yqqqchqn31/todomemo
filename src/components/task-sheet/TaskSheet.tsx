import { getDestination, type Destination, type Task } from '../../models/task.ts'
import { QuickActions } from './QuickActions.tsx'
import { TitleField } from './TitleField.tsx'

type TaskSheetProps = {
  task: Task
  onRename: (title: string) => void
  onToggleHighlight: () => void
  onMove: (destination: Destination) => void
  onDelete: () => void
}

export const TaskSheet = ({ task, onRename, onToggleHighlight, onMove, onDelete }: TaskSheetProps) => (
  <div className="flex flex-col gap-4 pb-2">
    <TitleField title={task.title} onRename={onRename} />
    <QuickActions
      isHighlighted={task.isHighlighted}
      destination={getDestination(task)}
      onToggleHighlight={onToggleHighlight}
      onMove={onMove}
    />
    <div className="flex items-center justify-between">
      <button type="button" onClick={onDelete} className="h-11 text-sm text-danger">
        削除
      </button>
      <p className="text-xs text-content-muted">変更は自動で保存</p>
    </div>
  </div>
)
