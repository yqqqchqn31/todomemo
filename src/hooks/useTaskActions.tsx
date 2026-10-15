import { toast } from 'sonner'
import { TaskToastMessage } from '../components/TaskToastMessage.tsx'
import { isCompleted, type Task } from '../models/task.ts'
import { useTasks } from './useTasks.ts'

const showTaskToast = (task: Task, result: string, undo: () => void) => {
  toast(<TaskToastMessage title={task.title} result={result} />, {
    action: { label: '元に戻す', onClick: undo },
  })
}

export const useTaskActions = () => {
  const { tasks, addTask, updateTask, completeTask, reopenTask } = useTasks()

  const toggleCompleted = (task: Task) => {
    if (isCompleted(task)) {
      reopenTask(task.id)
      return
    }

    completeTask(task.id)
    showTaskToast(task, 'を完了しました', () => reopenTask(task.id))
  }

  const renameTask = (task: Task, title: string) => updateTask(task.id, { title })
  const toggleHighlight = (task: Task) => updateTask(task.id, { isHighlighted: !task.isHighlighted })

  return { tasks, addTask, toggleCompleted, renameTask, toggleHighlight }
}
