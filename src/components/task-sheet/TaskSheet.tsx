import type { Task } from '../../models/task.ts'
import { QuickActions } from './QuickActions.tsx'
import { TitleField } from './TitleField.tsx'

type TaskSheetProps = {
  task: Task
  onRename: (title: string) => void
  onToggleHighlight: () => void
}

export const TaskSheet = ({ task, onRename, onToggleHighlight }: TaskSheetProps) => (
  <div className="flex flex-col gap-4 pb-2">
    <TitleField title={task.title} onRename={onRename} />
    <QuickActions isHighlighted={task.isHighlighted} onToggleHighlight={onToggleHighlight} />
    <p className="text-right text-xs text-content-muted">変更は自動で保存</p>
  </div>
)
