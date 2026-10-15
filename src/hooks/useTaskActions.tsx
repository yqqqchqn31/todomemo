import { toast } from 'sonner'
import { TaskToastMessage } from '../components/TaskToastMessage.tsx'
import { formatShortDate } from '../models/dateFormat.ts'
import {
  fieldsForDate,
  fieldsForDestination,
  isCompleted,
  toISODateString,
  type Destination,
  type Task,
} from '../models/task.ts'
import { useTasks } from './useTasks.ts'

const MOVED_RESULT: Record<Destination, string> = {
  today: 'を今日に移しました',
  someday: 'をいつかに移しました',
  unsorted: 'をとりあえずに戻しました',
}

const showTaskToast = (task: Task, result: string, undo: () => void) => {
  toast(<TaskToastMessage title={task.title} result={result} />, {
    action: { label: '元に戻す', onClick: undo },
  })
}

export const useTaskActions = () => {
  const { tasks, addTask, updateTaskById, removeTaskById, restoreTask, completeTaskById, reopenTaskById } = useTasks()

  const toggleCompleted = (task: Task) => {
    if (isCompleted(task)) {
      reopenTaskById(task.id)
      return
    }

    completeTaskById(task.id)
    showTaskToast(task, 'を完了しました', () => reopenTaskById(task.id))
  }

  const renameTask = (task: Task, title: string) => updateTaskById(task.id, { title })
  const toggleHighlight = (task: Task) => updateTaskById(task.id, { isHighlighted: !task.isHighlighted })

  const changeDueDate = (task: Task, dueDate: string | null) => updateTaskById(task.id, { dueDate })

  const relocateTask = (task: Task, fields: Partial<Task>, result: string) => {
    const previousFields = { plannedDate: task.plannedDate, isSomeday: task.isSomeday }
    updateTaskById(task.id, fields)
    showTaskToast(task, result, () => updateTaskById(task.id, previousFields))
  }

  const moveTask = (task: Task, destination: Destination) =>
    relocateTask(task, fieldsForDestination(destination, toISODateString(new Date())), MOVED_RESULT[destination])

  const scheduleTask = (task: Task, date: Date) =>
    relocateTask(task, fieldsForDate(toISODateString(date)), `を${formatShortDate(date)}に移しました`)

  const deleteTask = (task: Task) => {
    const index = tasks.findIndex(({ id }) => id === task.id)
    removeTaskById(task.id)
    showTaskToast(task, 'を削除しました', () => restoreTask(task, index))
  }

  return {
    tasks,
    addTask,
    toggleCompleted,
    renameTask,
    toggleHighlight,
    changeDueDate,
    moveTask,
    scheduleTask,
    deleteTask,
  }
}
