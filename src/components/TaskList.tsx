import type { Task } from '../tasks.ts'

type TaskListProps = {
  tasks: Task[]
}

export const TaskList = ({ tasks }: TaskListProps) => {
  if (tasks.length === 0) {
    return <p className="text-sm text-content-muted">まだ何もありません。下の欄に書いてみてください。</p>
  }

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} className="flex min-h-13 items-center border-b border-border py-3 text-lg">
          <span className="min-w-0 break-words">{task.title}</span>
        </li>
      ))}
    </ul>
  )
}
