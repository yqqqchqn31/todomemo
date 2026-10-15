import { formatDayLabel } from '../models/dateFormat.ts'
import { groupByPlannedDate, type Task } from '../models/task.ts'
import { TaskItem } from './TaskItem.tsx'

type UpcomingTasksProps = {
  tasks: Task[]
  onToggleCompleted: (task: Task) => void
  onOpen: (task: Task) => void
}

export const UpcomingTasks = ({ tasks, onToggleCompleted, onOpen }: UpcomingTasksProps) => {
  if (tasks.length === 0) return null

  return (
    <details className="group mt-4 text-content-muted">
      <summary className="flex min-h-11 cursor-pointer items-center gap-1 text-sm">
        明日以降 {tasks.length}件
        <span aria-hidden="true" className="group-open:rotate-90 motion-safe:transition-transform">
          ›
        </span>
      </summary>
      {groupByPlannedDate(tasks).map((group) => (
        <section key={group.dateString}>
          <h2 className="mt-3 text-xs">{formatDayLabel(group.dateString)}</h2>
          <ul>
            {group.tasks.map((task) => (
              <TaskItem key={task.id} task={task} onToggleCompleted={onToggleCompleted} onOpen={onOpen} />
            ))}
          </ul>
        </section>
      ))}
    </details>
  )
}
