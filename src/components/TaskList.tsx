import type { Label } from '../models/label.ts'
import { isCompleted, sortByHighlight, type Task } from '../models/task.ts'
import { TaskItem } from './TaskItem.tsx'

type TaskListProps = {
  tasks: Task[]
  labels: Label[]
  onToggleCompleted: (task: Task) => void
  onOpen: (task: Task) => void
}

export const TaskList = ({ tasks, labels, onToggleCompleted, onOpen }: TaskListProps) => {
  const openTasks = sortByHighlight(tasks.filter((task) => !isCompleted(task)))
  const completedTasks = tasks.filter(isCompleted)

  return (
    <ul>
      {[...openTasks, ...completedTasks].map((task) => (
        <TaskItem key={task.id} task={task} labels={labels} onToggleCompleted={onToggleCompleted} onOpen={onOpen} />
      ))}
    </ul>
  )
}
