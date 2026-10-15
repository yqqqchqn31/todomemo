import type { Task } from '../../models/task.ts'
import { TitleField } from './TitleField.tsx'

type TaskSheetProps = {
  task: Task
  onRename: (title: string) => void
}

export const TaskSheet = ({ task, onRename }: TaskSheetProps) => (
  <div className="flex flex-col gap-4 pb-2">
    <TitleField title={task.title} onRename={onRename} />
    <p className="text-right text-xs text-content-muted">変更は自動で保存</p>
  </div>
)
