import { isCompleted, type Task } from '../models/task.ts'
import { TaskItem } from './TaskItem.tsx'

type TaskListProps = {
  tasks: Task[]
  onToggleCompleted: (task: Task) => void
}

export const TaskList = ({ tasks, onToggleCompleted }: TaskListProps) => {
  if (tasks.length === 0) {
    return <p className="text-sm text-content-muted">まだ何もありません。下の欄に書いてみてください。</p>
  }

  const openTasks = tasks.filter((task) => !isCompleted(task))
  const completedTasks = tasks.filter(isCompleted)

  return (
    <ul>
      {[...openTasks, ...completedTasks].map((task) => (
        <TaskItem key={task.id} task={task} onToggleCompleted={onToggleCompleted} />
      ))}
    </ul>
  )
}
