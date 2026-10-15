import { isCompleted, sortByHighlight, type Task } from '../models/task.ts'
import { TaskItem } from './TaskItem.tsx'

type TaskListProps = {
  tasks: Task[]
  onToggleCompleted: (task: Task) => void
  onOpen: (task: Task) => void
}

export const TaskList = ({ tasks, onToggleCompleted, onOpen }: TaskListProps) => {
  const openTasks = sortByHighlight(tasks.filter((task) => !isCompleted(task)))
  const completedTasks = tasks.filter(isCompleted)

  return (
    <ul>
      {[...openTasks, ...completedTasks].map((task) => (
        <TaskItem key={task.id} task={task} onToggleCompleted={onToggleCompleted} onOpen={onOpen} />
      ))}
    </ul>
  )
}
