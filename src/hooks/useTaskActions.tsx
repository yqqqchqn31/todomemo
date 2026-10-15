import { toast } from 'sonner'
import { TaskToastMessage } from '../components/TaskToastMessage.tsx'
import { fieldsForDestination, isCompleted, toDateKey, type Destination, type Task } from '../models/task.ts'
import { useTasks } from './useTasks.ts'

const MOVED_RESULT: Record<Destination, string> = {
  today: 'を今日に移しました',
  someday: 'をいつかに移しました',
  unsorted: 'を未整理に戻しました',
}

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

  const moveTask = (task: Task, destination: Destination) => {
    const previousFields = { plannedDate: task.plannedDate, isSomeday: task.isSomeday }
    updateTask(task.id, fieldsForDestination(destination, toDateKey(new Date())))
    showTaskToast(task, MOVED_RESULT[destination], () => updateTask(task.id, previousFields))
  }

  return { tasks, addTask, toggleCompleted, renameTask, toggleHighlight, moveTask }
}
