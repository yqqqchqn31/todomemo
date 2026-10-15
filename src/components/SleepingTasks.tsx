import type { Label } from '../models/label.ts'
import { SLEEP_AFTER_DAYS, type Task } from '../models/task.ts'
import { TaskList } from './TaskList.tsx'

type SleepingTasksProps = {
  tasks: Task[]
  labels: Label[]
  onToggleCompleted: (task: Task) => void
  onOpen: (task: Task) => void
  onRelease: () => void
}

export const SleepingTasks = ({ tasks, labels, onToggleCompleted, onOpen, onRelease }: SleepingTasksProps) => {
  if (tasks.length === 0) return null

  return (
    <details className="group mt-6 text-content-muted">
      <summary className="flex min-h-11 cursor-pointer items-center gap-1 text-sm [&::-webkit-details-marker]:hidden">
        眠っているもの {tasks.length}こ
        <span aria-hidden="true" className="group-open:rotate-90 motion-safe:transition-transform">
          ›
        </span>
      </summary>
      <p className="text-xs">{SLEEP_AFTER_DAYS}日そのままのものは、ここでそっと休ませています</p>
      <TaskList tasks={tasks} labels={labels} onToggleCompleted={onToggleCompleted} onOpen={onOpen} />
      <button
        type="button"
        onClick={onRelease}
        className="mt-3 min-h-11 rounded-full border border-border bg-surface-raised px-4 text-sm text-content"
      >
        まとめて手放す
      </button>
    </details>
  )
}
